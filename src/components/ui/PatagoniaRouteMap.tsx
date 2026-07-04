"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLocationColor, type Itinerary } from "@/data/mock/patagonia";

// Registering again is harmless — the root GsapProvider (src/lib/motion.tsx) already does this.
gsap.registerPlugin(ScrollTrigger);

export interface PatagoniaRouteMapProps {
	itinerary: Itinerary;
	activeDay: number | null;
	onSelectStop?: (name: string) => void;
}

// ─── Layout constants ───────────────────────────────────────────────────────

const VB_W = 720;
const VB_H = 620;
const PAD = 56;
const GREY = "#8A85A3";
const COORD_EPS = 0.01; // ~degrees — treated as "same point" for exact stop/day matching
const NEAR_EPS = 2.5; // degrees — fallback radius used to name stops with no exact day match

// ─── Decorative coastline hint (deterministic, data-independent) ───────────

function buildCoastlinePath(): string {
	const steps = 10;
	const parts: string[] = [];
	for (let i = 0; i <= steps; i++) {
		const t = i / steps;
		const y = t * VB_H;
		const x = 26 + Math.sin(t * Math.PI * 3) * 14;
		parts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
	}
	return parts.join(" ");
}

function buildCoastDots(): { x: number; y: number }[] {
	const dots: { x: number; y: number }[] = [];
	for (let i = 0; i < 36; i++) {
		const fx = Math.sin(i * 12.9898) * 43758.5453;
		const fy = Math.sin(i * 78.233) * 24634.6345;
		dots.push({
			x: (fx - Math.floor(fx)) * VB_W,
			y: (fy - Math.floor(fy)) * VB_H,
		});
	}
	return dots;
}

const COASTLINE_PATH = buildCoastlinePath();
const COAST_DOTS = buildCoastDots();

// ─── Narrow-viewport hook (mirrors useReducedMotion in src/lib/motion.tsx) ──

const NARROW_QUERY = "(max-width: 639px)";

function subscribeNarrow(onChange: () => void): () => void {
	if (typeof window === "undefined" || !window.matchMedia) return () => {};
	const mq = window.matchMedia(NARROW_QUERY);
	mq.addEventListener("change", onChange);
	return () => mq.removeEventListener("change", onChange);
}

function getNarrowSnapshot(): boolean {
	return window.matchMedia(NARROW_QUERY).matches;
}

function getNarrowServerSnapshot(): boolean {
	return false;
}

function useNarrow(): boolean {
	return useSyncExternalStore(subscribeNarrow, getNarrowSnapshot, getNarrowServerSnapshot);
}

// Mirrors the same useSyncExternalStore pattern for prefers-reduced-motion, kept local so this
// component has no dependency on the ai-challenge-scoped GsapProvider.

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void): () => void {
	if (typeof window === "undefined" || !window.matchMedia) return () => {};
	const mq = window.matchMedia(REDUCED_MOTION_QUERY);
	mq.addEventListener("change", onChange);
	return () => mq.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot(): boolean {
	return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot(): boolean {
	return false;
}

function useReducedMotion(): boolean {
	return useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, getReducedMotionServerSnapshot);
}

// ─── Geo helpers ─────────────────────────────────────────────────────────────

function dist(a: [number, number], b: [number, number]): number {
	const dx = a[0] - b[0];
	const dy = a[1] - b[1];
	return Math.sqrt(dx * dx + dy * dy);
}

function coordKey([lng, lat]: [number, number]): string {
	return `${lng.toFixed(3)},${lat.toFixed(3)}`;
}

interface Stop {
	key: string;
	lng: number;
	lat: number;
	name: string;
	isMajor: boolean;
	color: string;
}

export default function PatagoniaRouteMap({ itinerary, activeDay, onSelectStop }: PatagoniaRouteMapProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const pathRefs = useRef<(SVGPathElement | null)[]>([]);
	const ringRef = useRef<SVGCircleElement | null>(null);
	const reducedMotion = useReducedMotion();
	const isNarrow = useNarrow();

	// Unique stops derived from every route segment endpoint. A stop's display name is
	// resolved by matching its coordinates against itinerary.days entries (exact match, within
	// COORD_EPS) — those are "major" stops and get a rendered label. Waypoints with no exact
	// day match (e.g. a transit city on the way to a destination) fall back to the nearest day
	// within NEAR_EPS degrees for naming purposes only, and render as an unlabeled dot.
	const stops = useMemo<Stop[]>(() => {
		const seen = new Map<string, [number, number]>();
		for (const seg of itinerary.route) {
			const fk = coordKey(seg.from);
			if (!seen.has(fk)) seen.set(fk, seg.from);
			const tk = coordKey(seg.to);
			if (!seen.has(tk)) seen.set(tk, seg.to);
		}
		return Array.from(seen.entries()).map(([key, coord]) => {
			const exact = itinerary.days.find((d) => dist(d.coordinates, coord) < COORD_EPS);
			let name = exact?.location ?? null;
			const isMajor = Boolean(exact);
			if (!name) {
				let best: { d: number; loc: string } | null = null;
				for (const day of itinerary.days) {
					const d = dist(day.coordinates, coord);
					if (!best || d < best.d) best = { d, loc: day.location };
				}
				name = best && best.d < NEAR_EPS ? best.loc : "Tappa";
			}
			return { key, lng: coord[0], lat: coord[1], name, isMajor, color: getLocationColor(itinerary, name) };
		});
	}, [itinerary]);

	// activeDay → stop match: resolved by comparing the day's `coordinates` field against every
	// stop's coordinates and picking the nearest one (coordinate match, not name match — a day's
	// location name is free text and not guaranteed to equal a stop's resolved name).
	const activeStopKey = useMemo(() => {
		if (activeDay == null || stops.length === 0) return null;
		const day = itinerary.days.find((d) => d.day === activeDay);
		if (!day) return null;
		let best: { d: number; key: string } | null = null;
		for (const s of stops) {
			const d = dist([s.lng, s.lat], day.coordinates);
			if (!best || d < best.d) best = { d, key: s.key };
		}
		return best?.key ?? null;
	}, [activeDay, itinerary, stops]);

	// Equirectangular projection (x = lng * cos(meanLat), y = -lat) of every route coordinate,
	// fitted uniformly (no distortion) into the viewBox with PAD on every side. Recomputed
	// whenever the itinerary (and therefore its route) changes.
	const project = useMemo(() => {
		const pts: [number, number][] = [];
		for (const seg of itinerary.route) {
			pts.push(seg.from, seg.to);
		}
		const meanLat = pts.reduce((sum, p) => sum + p[1], 0) / pts.length;
		const cosLat = Math.cos((meanLat * Math.PI) / 180);
		const xs = pts.map((p) => p[0] * cosLat);
		const ys = pts.map((p) => -p[1]);
		const minX = Math.min(...xs);
		const minY = Math.min(...ys);
		const dataW = Math.max(Math.max(...xs) - minX, 1e-6);
		const dataH = Math.max(Math.max(...ys) - minY, 1e-6);
		const innerW = VB_W - PAD * 2;
		const innerH = VB_H - PAD * 2;
		const scale = Math.min(innerW / dataW, innerH / dataH);
		const offsetX = PAD + (innerW - dataW * scale) / 2;
		const offsetY = PAD + (innerH - dataH * scale) / 2;
		return (coord: [number, number]): [number, number] => [
			(coord[0] * cosLat - minX) * scale + offsetX,
			(-coord[1] - minY) * scale + offsetY,
		];
	}, [itinerary]);

	const projectedStops = useMemo(
		() => stops.map((s) => ({ ...s, ...(([x, y]) => ({ x, y }))(project([s.lng, s.lat])) })),
		[stops, project]
	);

	const projectedSegments = useMemo(
		() =>
			itinerary.route.map((seg) => {
				const [x1, y1] = project(seg.from);
				const [x2, y2] = project(seg.to);
				return { x1, y1, x2, y2, type: seg.type, label: seg.label };
			}),
		[itinerary, project]
	);

	// Draw-on animation: each segment path animates stroke-dashoffset from its own length to 0
	// when the map scrolls into view. Flight segments start with a single full-length dash (so
	// the reveal looks like a growing solid line) and swap to a real dashed pattern on complete,
	// which — at offset 0 — renders identically to "already drawn dashed". Reduced motion skips
	// the tween entirely and shows the final state immediately.
	useLayoutEffect(() => {
		const container = containerRef.current;
		if (!container) return;
		const ctx = gsap.context(() => {
			pathRefs.current.forEach((path) => {
				if (!path) return;
				const length = path.getTotalLength();
				const isFlight = path.dataset.type === "flight";
				if (reducedMotion) {
					path.setAttribute("stroke-dasharray", isFlight ? "6 4" : "none");
					path.setAttribute("stroke-dashoffset", "0");
					return;
				}
				gsap.set(path, { strokeDasharray: `${length} ${length}`, strokeDashoffset: length });
				gsap.to(path, {
					strokeDashoffset: 0,
					duration: 1.1,
					ease: "power2.out",
					scrollTrigger: { trigger: container, start: "top 85%" },
					onComplete: () => {
						if (isFlight) path.setAttribute("stroke-dasharray", "6 4");
					},
				});
			});
		}, container);
		return () => ctx.revert();
	}, [itinerary, reducedMotion]);

	// Pulsing ring on the active stop. Re-created whenever the active stop or motion preference
	// changes; always killed on cleanup/unmount.
	useEffect(() => {
		const el = ringRef.current;
		if (!el || reducedMotion) return;
		const baseR = parseFloat(el.getAttribute("r") ?? "8");
		const tween = gsap.fromTo(
			el,
			{ attr: { r: baseR }, opacity: 0.9 },
			{ attr: { r: baseR + 6 }, opacity: 0, duration: 1.3, repeat: -1, ease: "power1.out" }
		);
		return () => {
			tween.kill();
		};
	}, [activeStopKey, reducedMotion]);

	return (
		<div ref={containerRef} className="w-full">
			<svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="h-auto w-full" role="img" aria-label={`Mappa del percorso — ${itinerary.subtitle}`}>
				<g aria-hidden="true" opacity={0.18}>
					<path d={COASTLINE_PATH} fill="none" stroke={GREY} strokeWidth={1} />
					{COAST_DOTS.map((d, i) => (
						<circle key={i} cx={d.x} cy={d.y} r={0.8} fill={GREY} />
					))}
				</g>

				{projectedSegments.map((seg, i) => (
					<g key={i}>
						<path
							ref={(el) => {
								pathRefs.current[i] = el;
							}}
							data-type={seg.type}
							d={`M ${seg.x1} ${seg.y1} L ${seg.x2} ${seg.y2}`}
							fill="none"
							stroke={seg.type === "flight" ? "var(--accent-cyan)" : "var(--accent-blue)"}
							strokeWidth={seg.type === "flight" ? 1.6 : 2.4}
							strokeLinecap="round"
						/>
						{seg.label && !isNarrow && (
							<text
								x={(seg.x1 + seg.x2) / 2}
								y={(seg.y1 + seg.y2) / 2 - 6}
								fontSize={9}
								textAnchor="middle"
								fill={GREY}
								className="select-none"
							>
								{seg.label}
							</text>
						)}
					</g>
				))}

				{projectedStops.map((s) => {
					const isActive = s.key === activeStopKey;
					const r = s.isMajor ? 5 : 3;
					return (
						<g
							key={s.key}
							role="button"
							tabIndex={0}
							aria-label={`Tappa: ${s.name}`}
							className="cursor-pointer outline-none"
							onClick={() => onSelectStop?.(s.name)}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") onSelectStop?.(s.name);
							}}
						>
							{isActive && (
								<circle
									ref={ringRef}
									cx={s.x}
									cy={s.y}
									r={r + 4}
									fill="none"
									stroke="var(--accent-blue)"
									strokeWidth={2}
								/>
							)}
							<circle cx={s.x} cy={s.y} r={r} fill={s.color} stroke="#000" strokeWidth={0.5} />
							{s.isMajor && (!isNarrow || isActive) && (
								<text
									x={s.x}
									y={s.y - r - 5}
									fontSize={11}
									fontWeight={isActive ? 700 : 500}
									textAnchor="middle"
									fill="#e0e0e0"
									className="select-none"
								>
									{s.name}
								</text>
							)}
						</g>
					);
				})}
			</svg>

			<div className="mt-3 flex gap-6 text-xs text-white/60">
				<span className="flex items-center gap-2">
					<svg width="24" height="4" aria-hidden="true">
						<line x1="0" y1="2" x2="24" y2="2" stroke="var(--accent-cyan)" strokeWidth={2} strokeDasharray="6 4" />
					</svg>
					Volo
				</span>
				<span className="flex items-center gap-2">
					<svg width="24" height="4" aria-hidden="true">
						<line x1="0" y1="2" x2="24" y2="2" stroke="var(--accent-blue)" strokeWidth={2} />
					</svg>
					Terra
				</span>
			</div>
		</div>
	);
}
