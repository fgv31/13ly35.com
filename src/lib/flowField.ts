// Coastal flow field — reads the journey map's canvas (land opaque, water
// transparent), builds a distance-to-land grid, and derives a per-cell flow
// velocity: constant repulsion off the coast plus a tangential stream that
// runs parallel to the land lines. Sampled per particle by HeroScene.

export type FlowField = {
	w: number
	h: number
	// per-cell velocity in NDC units/s, y up — [vx, vy] interleaved
	vel: Float32Array
}

const GRID_W = 192 // field resolution (cells across)
const ALPHA_LAND = 230 // of 255 — only the opaque land fill counts (labels/lines stay below)
const BAND = 22 // cells of water affected by the coast
const REPEL = 0.05 // NDC/s — constant push away from land, strongest at the shore
const STREAM = 0.085 // NDC/s — current running parallel to the coastline
const FAR = 1e6

// reused between updates — no per-call canvas allocation
let scratchCanvas: HTMLCanvasElement | null = null

export function computeFlowField(source: HTMLCanvasElement): FlowField | null {
	if (source.width === 0 || source.height === 0) return null
	const w = GRID_W
	const h = Math.max(16, Math.round((w * source.height) / source.width))

	if (!scratchCanvas) scratchCanvas = document.createElement("canvas")
	if (scratchCanvas.width !== w || scratchCanvas.height !== h) {
		scratchCanvas.width = w
		scratchCanvas.height = h
	}
	const ctx = scratchCanvas.getContext("2d", { willReadFrequently: true })
	if (!ctx) return null
	ctx.clearRect(0, 0, w, h)
	ctx.drawImage(source, 0, 0, w, h)
	const alpha = ctx.getImageData(0, 0, w, h).data

	// distance to land (chamfer transform, cell units)
	const dist = new Float32Array(w * h)
	for (let i = 0; i < w * h; i++) {
		dist[i] = alpha[i * 4 + 3] >= ALPHA_LAND ? 0 : FAR
	}
	// forward pass
	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			const i = y * w + x
			let d = dist[i]
			if (x > 0) d = Math.min(d, dist[i - 1] + 1)
			if (y > 0) {
				d = Math.min(d, dist[i - w] + 1)
				if (x > 0) d = Math.min(d, dist[i - w - 1] + 1.4)
				if (x < w - 1) d = Math.min(d, dist[i - w + 1] + 1.4)
			}
			dist[i] = d
		}
	}
	// backward pass
	for (let y = h - 1; y >= 0; y--) {
		for (let x = w - 1; x >= 0; x--) {
			const i = y * w + x
			let d = dist[i]
			if (x < w - 1) d = Math.min(d, dist[i + 1] + 1)
			if (y < h - 1) {
				d = Math.min(d, dist[i + w] + 1)
				if (x < w - 1) d = Math.min(d, dist[i + w + 1] + 1.4)
				if (x > 0) d = Math.min(d, dist[i + w - 1] + 1.4)
			}
			dist[i] = d
		}
	}

	// per-cell flow: repulsion along the distance gradient (seaward) plus a
	// stream along its perpendicular — space bends around the landmass shapes
	const vel = new Float32Array(w * h * 2)
	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			const i = y * w + x
			const d = dist[i]
			if (d <= 0 || d >= BAND) continue
			const xm = dist[y * w + Math.max(x - 1, 0)]
			const xp = dist[y * w + Math.min(x + 1, w - 1)]
			const ym = dist[Math.max(y - 1, 0) * w + x]
			const yp = dist[Math.min(y + 1, h - 1) * w + x]
			let gx = xp - xm
			let gy = yp - ym
			const gl = Math.hypot(gx, gy)
			if (gl < 1e-3) continue
			gx /= gl
			gy /= gl
			// image y runs down; NDC y runs up
			const nx = gx
			const ny = -gy
			const t = 1 - d / BAND
			const repel = REPEL * t * t
			const stream = STREAM * t
			// tangent = normal rotated -90° — consistent circulation along coasts
			vel[i * 2] = nx * repel + ny * stream
			vel[i * 2 + 1] = ny * repel - nx * stream
		}
	}

	return { w, h, vel }
}

// bilinear sample at an NDC position (x right, y up); writes into `out`
export function sampleFlow(field: FlowField, ndcX: number, ndcY: number, out: { x: number; y: number }): void {
	const { w, h, vel } = field
	let u = ((ndcX + 1) * 0.5) * (w - 1)
	let v = ((1 - ndcY) * 0.5) * (h - 1)
	u = Math.min(Math.max(u, 0), w - 1.001)
	v = Math.min(Math.max(v, 0), h - 1.001)
	const x0 = Math.floor(u)
	const y0 = Math.floor(v)
	const fx = u - x0
	const fy = v - y0
	const i00 = (y0 * w + x0) * 2
	const i10 = i00 + 2
	const i01 = i00 + w * 2
	const i11 = i01 + 2
	const top = vel[i00] * (1 - fx) + vel[i10] * fx
	const bot = vel[i01] * (1 - fx) + vel[i11] * fx
	out.x = top * (1 - fy) + bot * fy
	const topY = vel[i00 + 1] * (1 - fx) + vel[i10 + 1] * fx
	const botY = vel[i01 + 1] * (1 - fx) + vel[i11 + 1] * fx
	out.y = topY * (1 - fy) + botY * fy
}
