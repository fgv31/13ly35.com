"use client";

import { useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Timeline, { TimelineHandle } from "@/components/ui/Timeline";
import { journeyData, JourneyEntry } from "@/data/mock/cv";

const HeroScene = dynamic(() => import("@/components/gl/HeroScene"), { ssr: false });

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "YOUR_MAPBOX_TOKEN";

const categoryMarkerColors: Record<string, string> = {
	live: "#2E6BFF",
	archived: "#FF3DDB",
	queued: "#8A85A3",
};

// Sort: queued first, then the rest (chronological — live will be near top)
const sortedEntries = (() => {
	const queued = journeyData.filter((e) => e.category === "queued");
	const rest = journeyData.filter((e) => e.category !== "queued");
	return [...queued, ...rest];
})();

// Build GeoJSON features from entries
const markerFeatures: GeoJSON.Feature[] = sortedEntries.map((entry, index) => ({
	type: "Feature",
	geometry: { type: "Point", coordinates: entry.coordinates },
	properties: {
		index,
		category: entry.category,
		color: categoryMarkerColors[entry.category],
		radius: entry.category === "live" ? 7 : entry.category === "queued" ? 4 : 5,
		glowRadius: entry.category === "live" ? 16 : entry.category === "queued" ? 8 : 12,
		strokeColor: entry.category === "queued" ? "#3A3550" : "#050308",
	},
}));

export default function JourneyClient() {
	const mapContainer = useRef<HTMLDivElement>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const timelineRef = useRef<TimelineHandle>(null);
	const reticleAnim = useRef<number | null>(null);

	const startReticleAnimation = useCallback(() => {
		if (reticleAnim.current) cancelAnimationFrame(reticleAnim.current);
		const start = performance.now();
		const animate = (now: number) => {
			if (!map.current) return;
			const t = ((now - start) % 2000) / 2000; // 2s cycle
			const pulse = Math.sin(t * Math.PI * 2) * 0.5 + 0.5; // 0→1→0
			const outerR = 20 + pulse * 8;
			const innerR = 12 + pulse * 6;
			try {
				map.current.setPaintProperty("reticle-ring", "circle-radius", outerR);
				map.current.setPaintProperty("reticle-ring", "circle-stroke-opacity", 0.3 + pulse * 0.4);
				map.current.setPaintProperty("reticle-ring-inner", "circle-radius", innerR);
				map.current.setPaintProperty("reticle-ring-inner", "circle-stroke-opacity", 0.15 + pulse * 0.25);
			} catch { /* map may be removed */ }
			reticleAnim.current = requestAnimationFrame(animate);
		};
		reticleAnim.current = requestAnimationFrame(animate);
	}, []);

	const showLocationIndicator = useCallback((entry: typeof sortedEntries[number]) => {
		if (!map.current) return;
		const setReticle = () => {
			const src = map.current?.getSource("reticle") as mapboxgl.GeoJSONSource | undefined;
			if (src) {
				src.setData({
					type: "FeatureCollection",
					features: [{
						type: "Feature",
						geometry: { type: "Point", coordinates: entry.coordinates },
						properties: {
							color: categoryMarkerColors[entry.category],
						},
					}],
				});
				startReticleAnimation();
			}
		};
		if (map.current.isStyleLoaded()) {
			setReticle();
		} else {
			map.current.once("load", setReticle);
		}
	}, [startReticleAnimation]);

	useEffect(() => {
		if (!mapContainer.current || map.current) return;

		mapboxgl.accessToken = MAPBOX_TOKEN;

		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: {
				version: 8,
				glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
				sources: {
					"mapbox-streets": {
						type: "vector",
						url: "mapbox://mapbox.mapbox-streets-v8",
					},
					land: {
						type: "geojson",
						data: "/data/land-mask.geojson",
					},
					rivers: {
						type: "geojson",
						data: "/data/rivers.geojson",
					},
					urban: {
						type: "geojson",
						data: "/data/urban.geojson",
					},
					cities: {
						type: "geojson",
						data: "/data/cities.geojson",
					},
					graticule: {
						type: "geojson",
						data: "/data/graticule.geojson",
					},
					markers: {
						type: "geojson",
						data: { type: "FeatureCollection", features: markerFeatures },
					},
					reticle: {
						type: "geojson",
						data: { type: "FeatureCollection", features: [] },
					},
				},
				layers: [
					// Land mask — opaque over land; sea and lakes stay transparent
					// so the particle field behind the map shows through
					{
						id: "land",
						type: "fill",
						source: "land",
						paint: { "fill-color": "#050308" },
					},
					// Urban areas — faint gray glow, night-side city footprints
					{
						id: "urban-areas",
						type: "fill",
						source: "urban",
						paint: {
							"fill-color": "#8A85A3",
							"fill-opacity": 0.15,
						},
					},
					// Graticule — faint lat/lon grid, tactical-display texture
					{
						id: "graticule",
						type: "line",
						source: "graticule",
						paint: {
							"line-color": "#7FB0FF",
							"line-width": 0.5,
							"line-opacity": 0.07,
						},
					},
					// Coastlines + lake shores (same geometry as the mask, so they align)
					{
						id: "coastline",
						type: "line",
						source: "land",
						paint: {
							"line-color": "#7FB0FF",
							"line-width": 0.8,
							"line-opacity": 0.5,
							"line-dasharray": [4, 3],
						},
					},
					// Rivers — inland water lines over the land mask
					{
						id: "rivers",
						type: "line",
						source: "rivers",
						paint: {
							"line-color": "#7FB0FF",
							"line-width": ["interpolate", ["linear"], ["zoom"], 3, 0.7, 6, 1.4],
							"line-opacity": 0.55,
						},
					},
					// Country boundaries
					{
						id: "admin-0-boundaries",
						type: "line",
						source: "mapbox-streets",
						"source-layer": "admin",
						filter: ["==", ["get", "admin_level"], 0],
						paint: {
							"line-color": "#B9AEE0",
							"line-width": 0.9,
							"line-opacity": 0.4,
							"line-dasharray": [6, 4],
						},
					},
					// State/province boundaries
					{
						id: "admin-1-boundaries",
						type: "line",
						source: "mapbox-streets",
						"source-layer": "admin",
						filter: ["==", ["get", "admin_level"], 1],
						paint: {
							"line-color": "#B9AEE0",
							"line-width": 0.5,
							"line-opacity": 0.22,
							"line-dasharray": [3, 3],
						},
					},
					// City dots — major populated places
					{
						id: "city-dots",
						type: "circle",
						source: "cities",
						paint: {
							"circle-radius": ["case", ["<=", ["get", "rank"], 1], 1.8, 1.2],
							"circle-color": "#B9AEE0",
							"circle-opacity": 0.55,
						},
					},
					// City labels — appear when zoomed in
					{
						id: "city-labels",
						type: "symbol",
						source: "cities",
						minzoom: 4,
						layout: {
							"text-field": ["get", "name"],
							"text-font": ["DIN Offc Pro Regular"],
							"text-size": 9,
							"text-transform": "uppercase",
							"text-letter-spacing": 0.15,
							"text-anchor": "top",
							"text-offset": [0, 0.6],
						},
						paint: {
							"text-color": "#8A85A3",
							"text-opacity": 0.75,
							"text-halo-color": "#050308",
							"text-halo-width": 1,
						},
					},
					// Marker glow (outer)
					{
						id: "markers-glow",
						type: "circle",
						source: "markers",
						paint: {
							"circle-radius": ["get", "glowRadius"],
							"circle-color": ["get", "color"],
							"circle-opacity": 0.15,
							"circle-blur": 1,
						},
					},
					// Marker dots
					{
						id: "markers-dots",
						type: "circle",
						source: "markers",
						paint: {
							"circle-radius": ["get", "radius"],
							"circle-color": ["get", "color"],
							"circle-stroke-width": 2,
							"circle-stroke-color": ["get", "strokeColor"],
						},
					},
					// Reticle — outer ring
					{
						id: "reticle-ring",
						type: "circle",
						source: "reticle",
						paint: {
							"circle-radius": 24,
							"circle-color": "transparent",
							"circle-stroke-width": 1.5,
							"circle-stroke-color": ["coalesce", ["get", "color"], "#2E6BFF"],
							"circle-stroke-opacity": 0.6,
						},
					},
					// Reticle — inner ring
					{
						id: "reticle-ring-inner",
						type: "circle",
						source: "reticle",
						paint: {
							"circle-radius": 16,
							"circle-color": "transparent",
							"circle-stroke-width": 1,
							"circle-stroke-color": ["coalesce", ["get", "color"], "#2E6BFF"],
							"circle-stroke-opacity": 0.3,
						},
					},
				],
			},
			center: [10, 45],
			zoom: 1.6,
			interactive: false,
		});

		// Click handler for marker dots
		map.current.on("click", "markers-dots", (e) => {
			if (!e.features?.[0]) return;
			const index = e.features[0].properties?.index;
			if (index == null) return;
			const entry = sortedEntries[index];
			timelineRef.current?.scrollToLocation(index);
			map.current?.flyTo({
				center: entry.coordinates,
				zoom: 5,
				duration: 1200,
			});
			showLocationIndicator(entry);
		});

		// Cursor pointer on hover
		map.current.on("mouseenter", "markers-dots", () => {
			if (map.current) map.current.getCanvas().style.cursor = "pointer";
		});
		map.current.on("mouseleave", "markers-dots", () => {
			if (map.current) map.current.getCanvas().style.cursor = "";
		});

		return () => {
			if (reticleAnim.current) cancelAnimationFrame(reticleAnim.current);
			map.current?.remove();
			map.current = null;
		};
	}, [showLocationIndicator]);

	// Auto-scroll to LIVE location on mount
	useEffect(() => {
		const liveIndex = sortedEntries.findIndex((e) => e.category === "live");
		if (liveIndex === -1) return;

		const timer = setTimeout(() => {
			timelineRef.current?.scrollToLocation(liveIndex);
			const liveEntry = sortedEntries[liveIndex];
			map.current?.flyTo({
				center: liveEntry.coordinates,
				zoom: 5,
				duration: 3200,
			});
			showLocationIndicator(liveEntry);
		}, 1800);

		return () => clearTimeout(timer);
	}, [showLocationIndicator]);

	const handleLocationClick = useCallback((entry: JourneyEntry) => {
		map.current?.flyTo({
			center: entry.coordinates,
			zoom: 5,
			duration: 1200,
		});
		showLocationIndicator(entry);
	}, [showLocationIndicator]);

	return (
		<div className="min-h-screen bg-dark flex flex-col">
			{/* Fixed background — particle field behind, map (transparent water) on top */}
			<div className="fixed inset-0 z-0 bg-[#050308]">
				<HeroScene />
				<div className="w-full h-full" ref={mapContainer} />
			</div>

			{/* Everything else scrolls on top */}
			<div className="relative z-10">
				<Header />

				<main className="flex-1 pt-32 pb-24">
					<div className="mx-auto max-w-7xl px-6">
						{/* Header */}
						<header className="mb-16">
							<div className="mb-4">
								<p className="font-mono text-xs text-magenta">[01] // JOURNEY_MODULE</p>
							</div>
							<h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
								THE <span className="text-blue">JOURNEY</span>
							</h1>
							<p className="text-lg text-white/50 max-w-2xl leading-relaxed font-mono mb-4">
								<span className="text-blue">&gt;</span> From Verona to Frankfurt to London to Berlin — through central banking, startups, and ambulances.
							</p>

							{/* Legend */}
							<div className="flex gap-6 font-mono text-xs journey-fade" style={{ animationDelay: "0.3s" }}>
								<div className="flex items-center gap-2">
									<div className="w-3 h-3 bg-blue rounded-full shadow-[0_0_10px_var(--accent-blue)] live-blink"></div>
									<span className="text-white/50">LIVE</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-3 h-3 bg-violet rounded-full shadow-[0_0_10px_var(--accent-violet)]"></div>
									<span className="text-white/50">ARCHIVED</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-2.5 h-2.5 bg-[#8A85A3] rounded-full border border-white/20"></div>
									<span className="text-white/50">QUEUED</span>
								</div>
							</div>
						</header>

						{/* Timeline */}
						<div className="md:w-2/3 lg:w-1/2 journey-fade" style={{ animationDelay: "0.6s" }}>
							<p className="font-mono text-xs text-magenta mb-6">{'// CLICK A LOCATION TO EXPLORE'}</p>
							<Timeline ref={timelineRef} entries={sortedEntries} onLocationClick={handleLocationClick} />
						</div>
					</div>
				</main>

				<Footer />
			</div>

			<style jsx>{`
				@keyframes journeyFadeIn {
					from {
						opacity: 0;
						transform: translateY(12px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.journey-fade {
					opacity: 0;
					animation: journeyFadeIn 0.8s ease-out forwards;
				}
			`}</style>
		</div>
	);
}
