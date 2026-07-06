"use client"

import React, { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { useFrame } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import SceneCanvas from "@/components/gl/SceneCanvas"
import { useQualityTier } from "@/lib/quality"
import { usePointerState } from "@/lib/usePointer"
import { sampleFlow, type FlowField } from "@/lib/flowField"

// optional external force field (e.g. the journey map's coastal currents) —
// owned by the page, read every frame; null means no flow
export type FlowFieldRef = React.MutableRefObject<FlowField | null>

// ─── Palette ────────────────────────────────────────────────────────────────
const BLUE = new THREE.Color("#2E6BFF")
const VIOLET = new THREE.Color("#FF3DDB")
const CYAN = new THREE.Color("#00C2FF")

// Field extent (world units) — camera sits at z = 6.
const SPREAD_X = 9
const SPREAD_Y = 5.5
const SPREAD_Z = 3

// ─── Shaders ──────────────────────────────────────────────────────────────
const VERT = /* glsl */ `
	uniform float uTime;
	uniform vec3 uCursor;
	uniform vec3 uRayDir;
	uniform vec2 uCursorNdc;
	uniform float uSize;
	uniform float uDpr;
	attribute float aRnd;
	attribute vec2 aVel;
	attribute vec2 aState; // x: collision glow, y: life (0 = gone)
	attribute vec3 aStar; // x: starlight whiteness, y: size, z: warmth
	varying float vRnd;
	varying float vCore;
	varying float vSpeed;
	varying vec2 vDir;
	varying float vGlow;
	varying float vLife;
	varying float vWhite;
	varying float vWarm;
	varying float vBlade;

	void main() {
		vRnd = aRnd;
		vGlow = aState.x;
		vLife = aState.y;
		vWhite = aStar.x;
		vWarm = aStar.z;
		vec3 p = position;

		// accretion-blade glow: stars flattened onto the horizontal plane
		// through the cursor light up as one continuous line (reach 0.7 —
		// keep in sync with DISC_REACH); a parked cursor (999) disables it.
		// proportioned to the hole like Gargantua: ring ~2.5x the shadow,
		// brightest at the hole, tapering into thin wisps at the tips
		float bx = abs(p.x - uCursor.x) / 0.7;
		float bladeX = pow(max(1.0 - bx, 0.0), 1.6);
		float bladeY = 1.0 - smoothstep(0.03, 0.15, abs(p.y - uCursor.y));
		vBlade = bladeX * bladeY;

		// gentle idle drift so the field never reads as static
		float ph = aRnd * 6.2831853;
		p.x += sin(uTime * 0.006 + ph) * 0.18;
		p.y += cos(uTime * 0.0045 + ph) * 0.18;

		// white-hot core only right at the void's edge (distance measured to
		// the view ray through the cursor); farther out, original colors
		float dist3 = length(cross(p - uCursor, uRayDir));
		vCore = smoothstep(0.3, 0.13, dist3);

		// motion in sprite space (sprite y runs down-screen, so flip world y)
		vSpeed = length(aVel);
		vDir = vSpeed > 1e-4 ? vec2(aVel.x, -aVel.y) / vSpeed : vec2(1.0, 0.0);

		vec4 mv = modelViewMatrix * vec4(p, 1.0);
		gl_Position = projectionMatrix * mv;

		// screen-space event horizon: orbiters at other depths still project
		// into the center, so the empty circle is enforced after projection
		// (NDC radius 0.047 ≈ 21px at a 900px viewport)
		float aspect = projectionMatrix[1][1] / projectionMatrix[0][0];
		vec2 ndc = gl_Position.xy / gl_Position.w;
		vec2 dv = (ndc - uCursorNdc) * vec2(aspect, 1.0);
		float rdd = length(dv);
		if (rdd < 0.047) {
			dv *= 0.047 / max(rdd, 1e-4);
			gl_Position.xy = (uCursorNdc + dv / vec2(aspect, 1.0)) * gl_Position.w;
		}

		// the sprite canvas itself stretches with speed (multiplicative — MUST
		// equal the fragment's stretch factor so the streak fills the sprite
		// lengthwise at constant width, never clipped square)
		// near-camera stars shrink — out-of-focus haze must not bury the scene
		float nearFade = 1.0 - 0.55 * smoothstep(0.5, 3.0, p.z);
		gl_PointSize = uSize * uDpr * (300.0 / -mv.z) * aStar.y * nearFade
			* (1.0 + vCore * 0.8 + vGlow * 1.5 + vBlade * 0.3)
			* (1.0 + min(vSpeed * 1.6, 4.0));
	}
`

const FRAG = /* glsl */ `
	uniform vec3 uBlue;
	uniform vec3 uViolet;
	uniform vec3 uCyan;
	varying float vRnd;
	varying float vCore;
	varying float vSpeed;
	varying vec2 vDir;
	varying float vGlow;
	varying float vLife;
	varying float vWhite;
	varying float vWarm;
	varying float vBlade;

	void main() {
		if (vLife <= 0.01) discard; // burned up in a collision — respawning
		// rotate the sprite into the particle's motion frame, then stretch it
		// along the travel axis — fast particles render as falling-star streaks
		vec2 c = gl_PointCoord - 0.5;
		vec2 perp = vec2(-vDir.y, vDir.x);
		vec2 cr = vec2(dot(c, vDir), dot(c, perp));
		// the shape fills the (already stretched) sprite along the motion axis
		// and thins crosswise — nothing ever exceeds the sprite bounds
		float stretch = 1.0 + min(vSpeed * 1.6, 4.0); // keep in sync with gl_PointSize
		float d = length(vec2(cr.x, cr.y * stretch));
		if (d > 0.5) discard;
		float alpha = smoothstep(0.5, 0.0, d) * 0.75; // damped: additive stacking saturates fast
		// comet anatomy: bright head forward, tail fading out behind
		alpha *= mix(1.0, smoothstep(-0.5, 0.3, cr.x), min(vSpeed * 1.5, 1.0));
		alpha *= vLife;
		// nebula spectrum: deep blue -> indigo -> violet, with per-dot brightness
		vec3 col = mix(uBlue, vec3(0.48, 0.36, 1.0), smoothstep(0.0, 0.5, vRnd));
		col = mix(col, uViolet, smoothstep(0.5, 1.0, vRnd));
		// two brightness tiers: ~1 in 9 dots shines, the rest stay subdued
		col *= 0.5 + 0.65 * step(0.89, fract(vRnd * 7.0));
		col = mix(col, uCyan, step(0.93, vRnd) * 0.7); // sparse cyan accents
		// night sky: most dots lean toward pale starlight; the galactic core
		// and dust-cloud rims glow golden, plus a few lone warm giants
		col = mix(col, vec3(0.88, 0.91, 1.0), vWhite);
		col = mix(col, vec3(1.0, 0.78, 0.5), max(vWarm, step(0.965, fract(vRnd * 13.0)) * 0.85));
		// near-void glow is Gargantua white-gold: dots at the rim burn warm,
		// and streaks brighten while they are close — far away they keep
		// their original blue/violet
		col = mix(col, vec3(1.0, 0.88, 0.66), vCore * 0.7);
		col = mix(col, vec3(1.0, 0.96, 0.86), min(vSpeed * 0.45, 0.7) * vCore);
		col = mix(col, vec3(1.0), vGlow); // collision flash
		// the accretion blade burns as one continuous golden-white line
		col = mix(col, vec3(1.0, 0.9, 0.72), vBlade * 0.65);
		alpha = min(alpha * (1.0 + vGlow + vBlade * 0.35), 1.0);
		gl_FragColor = vec4(col, alpha);
	}
`

// ─── Cursor gravity-well tuning ─────────────────────────────────────────────
const INFLUENCE = 1.7 // gravity-well radius (world units, view-ray cylinder — full depth)
const CAM_Z = 6 // camera distance — anchors the depth-compensation factor
const VOID = 0.127 // event-horizon radius: kept empty around the cursor — keep the shader clamp in sync
const VOID_KICK = 40 // ejection acceleration inside the void
const RING_STIFF = 3.2 // pull toward each particle's own target radius
const RING_SHARE = 0.2 // fraction of captured stars destined for the photon ring; the rest form the disc
const ORBIT_MIN = 0.18 // photon-ring radius — the round line hugging the shadow
const ORBIT_SPAN = 0.05 // photon-ring thickness drawn from the particle's seed
const SWIRL = 1.8 // tangential kick — makes ring particles circulate
const DISC_R_IN = 0.19 // innermost disc orbit, just outside the shadow
const DISC_R_OUT = 0.65 // outermost disc orbit — line span ~2.5x the hole, Gargantua proportions (shader blade glow reaches 0.7)
const DISC_FLAT = 26.0 // squash toward the horizontal plane through the cursor — the disc reads as a thin line
const DISC_SETTLE = 9.0 // vertical velocity damping for disc stars — kills the bounce across the plane
const FAST_SHARE = 0.05 // stars keeping full speed; the rest move at SLOW_FACTOR
const SLOW_FACTOR = 0.42 // terminal-speed multiplier for the lazy majority (orbital force stays full, so they still circulate)
const DISC_SWIRL = 3.4 // circulation around the hole's vertical axis — fast enough to streak-fuse
const SPRING = 2.6 // pull back to the home position
const DAMPING = 3.0 // velocity decay per second
const VMAX = 1.0 // speed cap (world units/s) — infall reads as a smooth dive, never a lunge

// ─── Collision / burn-up tuning ─────────────────────────────────────────────
const CELL = 0.06 // spatial-hash cell size for collision checks
const COLLIDE_DIST = 0.05 // two live captured particles closer than this collide
const COLLIDE_SPEED = 0.3 // minimum speed for a particle to take part in a collision
const MAX_COLLISIONS = 3 // per frame — keeps the disc from evaporating
const GLOW_DECAY = 2.5 // collision flash decay per second
const DIE_TIME = 0.4 // seconds for the burned-up particle to fade out
const DEAD_TIME = 2.5 // seconds it stays gone before respawning at home
const REVIVE_TIME = 0.8 // seconds to fade back in

// ─── Flow advection tuning ──────────────────────────────────────────────────
const FLOW_SMOOTH = 2.5 // home-velocity easing toward the sampled current
const FLOW_WRAP = 1.15 // NDC bound — homes drifting past re-enter opposite side

// ─── Particle field ─────────────────────────────────────────────────────────
function ParticleField(props: { count: number; flow?: FlowFieldRef }): React.JSX.Element {
	const { count, flow } = props
	const pointer = usePointerState()

	const field = useMemo(() => {
		const positions = new Float32Array(count * 3)
		const rnd = new Float32Array(count)
		// star look: x = whiteness (0 = nebula palette, 1 = starlight),
		// y = size, z = warmth (golden core / dust glow)
		const starAttr = new Float32Array(count * 3)
		// deterministic scatter — render must stay pure (no Math.random)
		const hash = (n: number): number => {
			const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
			return s - Math.floor(s)
		}
		// gaussian from two hashes (Box–Muller) — for galactic structure
		const gauss = (a: number, b: number): number =>
			Math.sqrt(-2 * Math.log(Math.max(hash(a), 1e-6))) * Math.cos(6.2831853 * hash(b))
		// the sky's geometry: a diagonal galactic plane built from clumpy star
		// clouds around a golden core, webbed with dark dust filaments — plus a
		// faint even star field and a few tight open clusters
		const CLUSTERS = 3
		const BAND_SLOPE = 0.34
		const CORE_X = 2.8 // galactic-core position along the band (world x)
		// star clouds: pre-placed clumps hugging the band, denser near the core
		const CLUMPS = 70
		const clumps = new Float32Array(CLUMPS * 5) // cx, cy, cz, sigma, warmth
		for (let c = 0; c < CLUMPS; c++) {
			const s = hash(c * 53 + 23) < 0.55
				? CORE_X + gauss(c * 57 + 29, c * 59 + 31) * SPREAD_X * 0.3
				: (hash(c * 61 + 37) - 0.5) * 2.6 * SPREAD_X
			const coreProx = Math.exp(-((s - CORE_X) * (s - CORE_X)) / 14)
			clumps[c * 5 + 0] = s
			clumps[c * 5 + 1] = s * BAND_SLOPE + gauss(c * 67 + 41, c * 71 + 43) * (0.4 + coreProx * 0.85)
			clumps[c * 5 + 2] = (hash(c * 73 + 47) - 0.5) * 2 * SPREAD_Z * 0.7
			clumps[c * 5 + 3] = 0.1 + hash(c * 79 + 53) * 0.3
			clumps[c * 5 + 4] = coreProx * (0.35 + hash(c * 83 + 59) * 0.45)
		}
		// dark dust filaments — deterministic fractal noise over band coordinates
		const dust = (s: number, p: number): number =>
			0.5 +
			0.5 *
				(Math.sin(s * 1.3 + Math.sin(p * 3.1 + s * 0.7) * 1.5) * 0.55 +
					Math.sin(s * 2.9 - p * 4.2 + 1.7) * 0.3 +
					Math.sin((s - p) * 5.3 + 0.6) * 0.15)
		for (let i = 0; i < count; i++) {
			const kind = hash(i * 7 + 5)
			let x: number
			let y: number
			let z = (hash(i * 4 + 2) - 0.5) * 2 * SPREAD_Z
			let white: number
			let warm = 0
			// steep power law: a dust of faint pinpricks, rare bright stars
			let size = 0.35 + Math.pow(hash(i * 7 + 6), 4.5) * 2.4
			if (kind < 0.26) {
				// lone field stars — half even sky, half thinning away from the plane
				x = (hash(i * 4 + 0) - 0.5) * 2 * SPREAD_X
				y = hash(i * 9 + 4) < 0.5
					? (hash(i * 4 + 1) - 0.5) * 2 * SPREAD_Y
					: x * BAND_SLOPE + gauss(i * 9 + 7, i * 9 + 8) * 2.4
				white = 0.4 + hash(i * 7 + 1) * 0.45
			} else if (kind < 0.93) {
				// the milky way — mostly mottled clouds, the rest a diffuse haze
				if (hash(i * 17 + 9) < 0.75) {
					const c = Math.floor(hash(i * 11 + 3) * CLUMPS) * 5
					const sig = clumps[c + 3]
					x = clumps[c] + gauss(i * 13 + 1, i * 13 + 2) * sig * 1.6
					y = clumps[c + 1] + gauss(i * 13 + 3, i * 13 + 4) * sig
					z = clumps[c + 2] + gauss(i * 13 + 5, i * 13 + 6) * 0.25
					warm = clumps[c + 4] * (0.5 + hash(i * 19 + 7) * 0.5)
				} else {
					x = hash(i * 9 + 5) < 0.5
						? CORE_X + gauss(i * 9 + 1, i * 9 + 6) * SPREAD_X * 0.45
						: (hash(i * 4 + 0) - 0.5) * 2.4 * SPREAD_X
					const coreProx = Math.exp(-((x - CORE_X) * (x - CORE_X)) / 18)
					y = x * BAND_SLOPE + gauss(i * 15 + 1, i * 15 + 2) * (0.55 + coreProx * 0.85)
					warm = coreProx * 0.5 * hash(i * 19 + 7)
				}
				white = 0.55 + hash(i * 7 + 2) * 0.45
				size *= 0.55
				// dust lanes carve the band: dim, shrink and push aside
				const p = y - x * BAND_SLOPE
				if (Math.abs(p) < 1.7) {
					const d = dust(x, p)
					if (d > 0.62) {
						size *= 0.4
						white *= 0.5
						warm *= 0.4
						y += (d - 0.62) * (p > -0.1 ? 1.2 : -1.2)
					}
				}
				// the golden bulge: bigger, warmer right at the core
				const glow = Math.exp(-((x - CORE_X) * (x - CORE_X) + p * p * 4) / 10)
				size *= 1 + glow * 0.5
				warm = Math.min(1, warm + glow * 0.45)
			} else {
				// tight open clusters — Pleiades-like knots
				const c = Math.floor(hash(i * 11 + 3) * CLUSTERS)
				const cx = (hash(c * 31 + 7) - 0.5) * 2 * SPREAD_X * 0.9
				const cy = (hash(c * 37 + 11) - 0.5) * 2 * SPREAD_Y * 0.9
				const cz = (hash(c * 41 + 13) - 0.5) * 2 * SPREAD_Z * 0.5
				const ex = 0.12 + hash(c * 43 + 17) * 0.2
				x = cx + gauss(i * 13 + 1, i * 13 + 2) * ex
				y = cy + gauss(i * 13 + 3, i * 13 + 4) * ex * 0.8
				z = cz + gauss(i * 13 + 5, i * 13 + 6) * 0.15
				white = 0.6 + hash(i * 7 + 3) * 0.4
				size *= 0.8
			}
			positions[i * 3 + 0] = x
			positions[i * 3 + 1] = y
			positions[i * 3 + 2] = z
			rnd[i] = hash(i * 4 + 3)
			starAttr[i * 3 + 0] = white
			starAttr[i * 3 + 1] = size
			starAttr[i * 3 + 2] = warm
		}
		const g = new THREE.BufferGeometry()
		const posAttr = new THREE.BufferAttribute(positions, 3)
		posAttr.setUsage(THREE.DynamicDrawUsage)
		g.setAttribute("position", posAttr)
		g.setAttribute("aRnd", new THREE.BufferAttribute(rnd, 1))
		g.setAttribute("aStar", new THREE.BufferAttribute(starAttr, 3))
		const velAttr = new THREE.BufferAttribute(new Float32Array(count * 2), 2)
		velAttr.setUsage(THREE.DynamicDrawUsage)
		g.setAttribute("aVel", velAttr)
		const state = new Float32Array(count * 2)
		for (let i = 0; i < count; i++) state[i * 2 + 1] = 1 // glow 0, life 1
		const stateAttr = new THREE.BufferAttribute(state, 2)
		stateAttr.setUsage(THREE.DynamicDrawUsage)
		g.setAttribute("aState", stateAttr)
		// speed classes: most stars orbit lazily, a few streak at full pace
		const speeds = new Float32Array(count)
		for (let i = 0; i < count; i++) {
			speeds[i] = hash(i * 29 + 17) < FAST_SHARE ? 1 : SLOW_FACTOR
		}
		return {
			geometry: g,
			homes: positions.slice(),
			rnds: rnd,
			speeds,
			// xyz offset + velocity per particle, integrated on the CPU each frame
			offsets: new Float32Array(count * 3),
			velocities: new Float32Array(count * 3),
			// xy drift of the home itself, driven by the external flow field
			homeVels: new Float32Array(count * 2),
			// burn-up cycle: 0 alive, 1 dying, 2 dead, 3 reviving
			phases: new Uint8Array(count),
			timers: new Float32Array(count),
			// collision spatial hash, reused every frame — no per-frame allocation
			grid: new Map<number, number>(),
		}
	}, [count])
	const geometry = field.geometry

	const material = useMemo(
		() =>
			new THREE.ShaderMaterial({
				uniforms: {
					uTime: { value: 0 },
					uCursor: { value: new THREE.Vector3(999, 999, 0) },
					uRayDir: { value: new THREE.Vector3(0, 0, -1) },
					uCursorNdc: { value: new THREE.Vector2(9, 9) },
					uSize: { value: 0.08 },
					uDpr: { value: 1 },
					uBlue: { value: BLUE },
					uViolet: { value: VIOLET },
					uCyan: { value: CYAN },
				},
				vertexShader: VERT,
				fragmentShader: FRAG,
				transparent: true,
				depthWrite: false,
				blending: THREE.AdditiveBlending,
			}),
		[],
	)

	// dispose explicitly on unmount
	useEffect(() => {
		return () => {
			geometry.dispose()
			material.dispose()
		}
	}, [geometry, material])

	// reusable scratch vectors — no per-frame allocation
	const scratch = useMemo(
		() => ({
			ndc: new THREE.Vector3(),
			dir: new THREE.Vector3(),
			hit: new THREE.Vector3(),
			proj: new THREE.Matrix4(),
			flowOut: { x: 0, y: 0 },
		}),
		[],
	)

	// frame-loop writes go through refs — memoized values must not be reassigned directly
	const uniformsRef = useRef<typeof material.uniforms | null>(null)
	const fieldRef = useRef<typeof field | null>(null)
	// fallback well anchor for touch devices / before the first pointer move
	const anchorRef = useRef<HTMLElement | null>(null)
	useEffect(() => {
		uniformsRef.current = material.uniforms
	}, [material])
	useEffect(() => {
		fieldRef.current = field
	}, [field])
	useEffect(() => {
		anchorRef.current = document.getElementById("explore-cta")
	}, [])

	useFrame((state, delta) => {
		const u = uniformsRef.current
		const f = fieldRef.current
		if (!u || !f) return
		const p = pointer.current
		u.uTime.value = state.clock.elapsedTime
		u.uDpr.value = state.gl.getPixelRatio()

		// well position: the pointer once it has moved; before that (and on
		// touch devices, where the pointer stays inert) anchor on the EXPLORE
		// button while it is on screen — otherwise park the well off-field
		let ndcX: number | null = null
		let ndcY: number | null = null
		if (p.x !== 0 || p.y !== 0) {
			ndcX = p.nx
			ndcY = -p.ny
		} else if (anchorRef.current) {
			const rect = anchorRef.current.getBoundingClientRect()
			const w = state.size.width
			const h = state.size.height
			if (rect.bottom > 0 && rect.top < h) {
				ndcX = ((rect.left + rect.width / 2) / w) * 2 - 1
				ndcY = -(((rect.top + rect.height / 2) / h) * 2 - 1)
			}
		}
		let cx = 999
		let cy = 999
		// view-ray direction through the cursor — the well cylinder's axis,
		// always perpendicular to the screen
		let ux = 0
		let uy = 0
		let uz = -1
		if (ndcX !== null && ndcY !== null) {
			// project onto the z = 0 plane to get the world-space well position
			scratch.ndc.set(ndcX, ndcY, 0.5).unproject(state.camera)
			scratch.dir.copy(scratch.ndc).sub(state.camera.position).normalize()
			const t = -state.camera.position.z / scratch.dir.z
			scratch.hit.copy(state.camera.position).addScaledVector(scratch.dir, t)
			cx = scratch.hit.x
			cy = scratch.hit.y
			ux = scratch.dir.x
			uy = scratch.dir.y
			uz = scratch.dir.z
			u.uRayDir.value.copy(scratch.dir)
			u.uCursorNdc.value.set(ndcX, ndcY)
		} else {
			u.uCursorNdc.value.set(9, 9)
		}
		u.uCursor.value.set(cx, cy, 0)

		// gravity-well step: each captured particle is pulled onto its own orbit
		// ring around the cursor point (3D, so capture is a sphere, not a column)
		// and swirled tangentially; a damped spring returns it home afterwards
		const dt = Math.min(delta, 0.05)
		const decay = Math.exp(-DAMPING * dt)
		const glowDecay = Math.exp(-GLOW_DECAY * dt)
		const { homes, rnds, speeds, offsets, velocities, homeVels, phases, timers, grid } = f

		// coastal flow: homes drift with the current sampled at their screen
		// position — particles follow through their spring, so the streams stay
		// soft; zero cost when no flow field is attached
		const fl = flow?.current ?? null
		let projE: ArrayLike<number> | null = null
		let tanHalfFov = 0
		let camAspect = 1
		if (fl) {
			scratch.proj.multiplyMatrices(state.camera.projectionMatrix, state.camera.matrixWorldInverse)
			projE = scratch.proj.elements
			const cam = state.camera as THREE.PerspectiveCamera
			tanHalfFov = Math.tan((cam.fov * Math.PI) / 360)
			camAspect = cam.aspect
		}
		const posAttr = f.geometry.getAttribute("position") as THREE.BufferAttribute
		const arr = posAttr.array as Float32Array
		const velAttr = f.geometry.getAttribute("aVel") as THREE.BufferAttribute
		const velArr = velAttr.array as Float32Array
		const stateAttr = f.geometry.getAttribute("aState") as THREE.BufferAttribute
		const stateArr = stateAttr.array as Float32Array
		grid.clear()
		let collisions = 0
		let moved = false
		for (let i = 0; i < count; i++) {
			if (fl && projE) {
				const hx = homes[i * 3]
				const hy = homes[i * 3 + 1]
				const hz = homes[i * 3 + 2]
				const cw = projE[3] * hx + projE[7] * hy + projE[11] * hz + projE[15]
				if (cw > 1e-4) {
					const hnx = (projE[0] * hx + projE[4] * hy + projE[8] * hz + projE[12]) / cw
					const hny = (projE[1] * hx + projE[5] * hy + projE[9] * hz + projE[13]) / cw
					// NDC → world units at this home's depth
					const halfH = Math.max(state.camera.position.z - hz, 0.5) * tanHalfFov
					const halfW = halfH * camAspect
					sampleFlow(fl, hnx, hny, scratch.flowOut)
					const k = 1 - Math.exp(-FLOW_SMOOTH * dt)
					let hvx = homeVels[i * 2]
					let hvy = homeVels[i * 2 + 1]
					hvx += (scratch.flowOut.x * halfW - hvx) * k
					hvy += (scratch.flowOut.y * halfH - hvy) * k
					homeVels[i * 2] = hvx
					homeVels[i * 2 + 1] = hvy
					homes[i * 3] += hvx * dt
					homes[i * 3 + 1] += hvy * dt
					if (!moved && (Math.abs(hvx) > 1e-4 || Math.abs(hvy) > 1e-4)) moved = true
					// drifted past the screen edge → re-enter on the opposite side
					if (hnx > FLOW_WRAP) homes[i * 3] -= 2 * FLOW_WRAP * halfW
					else if (hnx < -FLOW_WRAP) homes[i * 3] += 2 * FLOW_WRAP * halfW
					if (hny > FLOW_WRAP) homes[i * 3 + 1] -= 2 * FLOW_WRAP * halfH
					else if (hny < -FLOW_WRAP) homes[i * 3 + 1] += 2 * FLOW_WRAP * halfH
				}
			}
			const ox = offsets[i * 3]
			const oy = offsets[i * 3 + 1]
			const oz = offsets[i * 3 + 2]
			let vx = velocities[i * 3]
			let vy = velocities[i * 3 + 1]
			let vz = velocities[i * 3 + 2]
			const px = homes[i * 3] + ox
			const py = homes[i * 3 + 1] + oy
			const pz = homes[i * 3 + 2] + oz
			let ax = -ox * SPRING
			let ay = -oy * SPRING
			let az = -oz * SPRING
			// distance to the view ray through the cursor: the well is a
			// cylinder perpendicular to the screen — the same circle you see,
			// at every depth
			const wx = px - cx
			const wy = py - cy
			const wz = pz
			const along = wx * ux + wy * uy + wz * uz
			const rx = wx - ux * along
			const ry = wy - uy * along
			const rz = wz - uz * along
			const dist = Math.sqrt(rx * rx + ry * ry + rz * rz)
			// depth compensation: far stars get a stronger kick so their projected
			// motion matches the near ones (which would otherwise dominate)
			const db = (CAM_Z - pz) / CAM_Z
			// Gargantua forms out of whatever the hole attracts: every captured
			// star is destined for one of the two shapes — the photon ring (the
			// round line hugging the shadow) or the edge-on accretion disc (the
			// horizontal line). The disc builds up while the hole lingers and
			// dissolves when it moves on — it is never drawn as its own object.
			if (dist < INFLUENCE) {
				const t01 = 1 - dist / INFLUENCE
				const force = t01 * t01 * (3 - 2 * t01) * db // smoothstep falloff
				// captured stars let go of home — otherwise the spring holds them
				// short of their orbit and the disc smears into a fuzzy cloud
				const rel = Math.min(force, 1) * 0.85
				ax += ox * SPRING * rel
				ay += oy * SPRING * rel
				az += oz * SPRING * rel
				const inv = 1 / Math.max(dist, 0.1)
				const nx = rx * inv
				const ny = ry * inv
				const nz = rz * inv
				if (rnds[i] < RING_SHARE) {
					// photon ring: a tight circle around the view ray, swirling
					// face-on — always closed because it lives in screen space
					const ring = ORBIT_MIN + (rnds[i] / RING_SHARE) * ORBIT_SPAN
					const radial = -(dist - ring) * RING_STIFF * force
					ax += nx * radial
					ay += ny * radial
					az += nz * radial
					// swirl around the ray (axis ⊥ n, so axis × n is unit length).
					// Orbital force stays at full strength — the per-star speed cap
					// alone sets the pace, so slow stars still circulate rather than
					// stalling and stacking on the near side.
					const tx = uy * nz - uz * ny
					const ty = uz * nx - ux * nz
					const tz = ux * ny - uy * nx
					ax += tx * SWIRL * force
					ay += ty * SWIRL * force
					az += tz * SWIRL * force
				} else {
					// accretion disc: flatten onto the horizontal plane through
					// the cursor and orbit the hole's vertical axis at an assigned
					// radius — sweeping in front and behind; the far side wraps
					// the rim as a lensing arc. Settle damping bleeds vertical
					// speed so stars stay concentrated on the line.
					ay += (cy - py) * DISC_FLAT * force - vy * DISC_SETTLE * force
					const ddx = px - cx
					const ddz = pz
					const rxz = Math.max(Math.hypot(ddx, ddz), 0.1)
					const dr = (rnds[i] - RING_SHARE) / (1 - RING_SHARE)
					const rt = DISC_R_IN + dr * (DISC_R_OUT - DISC_R_IN)
					const radial = -(rxz - rt) * RING_STIFF * force
					ax += (ddx / rxz) * radial
					az += (ddz / rxz) * radial
					ax += (-ddz / rxz) * DISC_SWIRL * force
					az += (ddx / rxz) * DISC_SWIRL * force
				}
				// event horizon: nothing survives inside the void — eject hard
				if (dist < VOID * 1.3) {
					const eject = (VOID * 1.3 - dist) * VOID_KICK
					ax += nx * eject
					ay += ny * eject
					az += nz * eject
				}
			}
			vx = (vx + ax * dt) * decay
			vy = (vy + ay * dt) * decay
			vz = (vz + az * dt) * decay
			// hard per-star speed cap — fast approaches become smooth dives, never
			// jumps; slow-class stars glide, the fast few streak
			const vcap = VMAX * speeds[i]
			const sp2 = vx * vx + vy * vy + vz * vz
			if (sp2 > vcap * vcap) {
				const s = vcap / Math.sqrt(sp2)
				vx *= s
				vy *= s
				vz *= s
			}
			const nox = ox + vx * dt
			const noy = oy + vy * dt
			const noz = oz + vz * dt
			offsets[i * 3] = nox
			offsets[i * 3 + 1] = noy
			offsets[i * 3 + 2] = noz
			velocities[i * 3] = vx
			velocities[i * 3 + 1] = vy
			velocities[i * 3 + 2] = vz
			arr[i * 3] = homes[i * 3] + nox
			arr[i * 3 + 1] = homes[i * 3 + 1] + noy
			arr[i * 3 + 2] = homes[i * 3 + 2] + noz
			// streak visuals read total motion: swirl velocity + coastal drift
			velArr[i * 2] = vx + homeVels[i * 2]
			velArr[i * 2 + 1] = vy + homeVels[i * 2 + 1]

			// collision flash decays; life follows the dying → dead → reviving cycle
			const glow = stateArr[i * 2] * glowDecay
			let life = stateArr[i * 2 + 1]
			const phase = phases[i]
			if (phase === 1) {
				life -= dt / DIE_TIME
				if (life <= 0) {
					life = 0
					phases[i] = 2
					timers[i] = 0
					// respawn at home, at rest
					offsets[i * 3] = 0
					offsets[i * 3 + 1] = 0
					offsets[i * 3 + 2] = 0
					velocities[i * 3] = 0
					velocities[i * 3 + 1] = 0
					velocities[i * 3 + 2] = 0
				}
			} else if (phase === 2) {
				timers[i] += dt
				if (timers[i] >= DEAD_TIME) phases[i] = 3
			} else if (phase === 3) {
				life += dt / REVIVE_TIME
				if (life >= 1) {
					life = 1
					phases[i] = 0
				}
			}
			stateArr[i * 2] = glow
			stateArr[i * 2 + 1] = life

			// spatial-hash collisions among fast, live, captured particles:
			// the second of two occupants of a cell burns up, the first flares
			if (
				phase === 0 &&
				dist < INFLUENCE &&
				collisions < MAX_COLLISIONS &&
				vx * vx + vy * vy + vz * vz > COLLIDE_SPEED * COLLIDE_SPEED
			) {
				const kx = Math.floor((px - cx) / CELL) + 64
				const ky = Math.floor((py - cy) / CELL) + 64
				const kz = Math.floor(pz / CELL) + 64
				const key = kx | (ky << 8) | (kz << 16)
				const other = grid.get(key)
				if (other === undefined) {
					grid.set(key, i)
				} else if (phases[other] === 0) {
					const ddx = arr[other * 3] - arr[i * 3]
					const ddy = arr[other * 3 + 1] - arr[i * 3 + 1]
					const ddz = arr[other * 3 + 2] - arr[i * 3 + 2]
					if (ddx * ddx + ddy * ddy + ddz * ddz < COLLIDE_DIST * COLLIDE_DIST) {
						collisions++
						phases[i] = 1 // this one burns up
						stateArr[other * 2] = 1 // the survivor flares white-hot…
						const odx = arr[other * 3] - cx
						const ody = arr[other * 3 + 1] - cy
						const oinv = 1 / Math.max(Math.hypot(odx, ody), 0.1)
						velocities[other * 3] += odx * oinv * 1.2 // …and gets flung outward
						velocities[other * 3 + 1] += ody * oinv * 1.2
					}
				}
			}

			if (
				!moved &&
				(Math.abs(vx) > 1e-4 || Math.abs(vy) > 1e-4 || Math.abs(vz) > 1e-4 || phases[i] !== 0 || glow > 1e-3)
			)
				moved = true
		}
		if (moved) {
			posAttr.needsUpdate = true
			velAttr.needsUpdate = true
			stateAttr.needsUpdate = true
		}
	})

	return <points geometry={geometry} material={material} frustumCulled={false} />
}

// ─── Wireframe horizon grid ──────────────────────────────────────────────────
function GridHorizon(): React.JSX.Element {
	const ref = useRef<THREE.GridHelper>(null)
	const grid = useMemo(() => {
		const g = new THREE.GridHelper(60, 60, "#FF3DDB", "#4A3A8A")
		const m = g.material as THREE.LineBasicMaterial
		m.transparent = true
		m.opacity = 0.09
		m.depthWrite = false
		return g
	}, [])

	useEffect(() => {
		return () => {
			grid.geometry.dispose()
			;(grid.material as THREE.LineBasicMaterial).dispose()
		}
	}, [grid])

	return <primitive ref={ref} object={grid} position={[0, -5, -2]} />
}

// ─── Camera parallax driver ──────────────────────────────────────────────────
function CameraParallax(): null {
	const pointer = usePointerState()
	useFrame((state) => {
		const p = pointer.current
		const cam = state.camera
		cam.position.x += (p.lnx * 0.9 - cam.position.x) * 0.06
		cam.position.y += (-p.lny * 0.7 - cam.position.y) * 0.06
		cam.lookAt(0, 0, 0)
	})
	return null
}

// ─── Public component ────────────────────────────────────────────────────────
export default function HeroScene(props: { flow?: FlowFieldRef } = {}): React.JSX.Element | null {
	const { flow } = props
	const tier = useQualityTier()
	if (tier === "off") return null

	const count = tier === "high" ? 44444 : 9000

	return (
		<SceneCanvas
			className="absolute inset-0 h-full w-full"
			camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 100 }}
		>
			{/* opaque scene bg: EffectComposer output composites white over a transparent canvas */}
			<color attach="background" args={["#050308"]} />
			<GridHorizon />
			<ParticleField count={count} flow={flow} />
			<CameraParallax />
			{tier === "high" && (
				<EffectComposer>
					<Bloom
						intensity={0.9}
						luminanceThreshold={0.15}
						luminanceSmoothing={0.9}
						mipmapBlur
					/>
				</EffectComposer>
			)}
		</SceneCanvas>
	)
}
