"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  itineraries,
  getLocationColor,
  getLocationBadge,
  type Itinerary,
  type DayEntry,
} from "@/data/mock/patagonia";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

// ── Transport icon/label helpers ──
const transportStyles: Record<string, { icon: string; cls: string }> = {
  flight: { icon: "✈", cls: "bg-yellow/10 border-yellow/25 text-yellow" },
  drive: { icon: "🚗", cls: "bg-white/5 border-white/10 text-white/60" },
  bus: { icon: "🚌", cls: "bg-sky-400/10 border-sky-400/20 text-sky-400" },
  boat: { icon: "⛵", cls: "bg-sky-300/10 border-sky-300/20 text-sky-300" },
  trek: { icon: "🥾", cls: "bg-amber-600/10 border-amber-600/20 text-amber-600" },
  local: { icon: "📍", cls: "bg-white/5 border-white/10 text-white/50" },
};

// ── Day Card ──
function DayCard({
  entry,
  itinerary,
  isActive,
  onClick,
}: {
  entry: DayEntry;
  itinerary: Itinerary;
  isActive: boolean;
  onClick: () => void;
}) {
  const badge = getLocationBadge(itinerary, entry.location);
  const color = getLocationColor(itinerary, entry.location);

  return (
    <div
      onClick={onClick}
      className="border border-white/5 hover:border-white/15 bg-white/[0.02] transition-all duration-300 cursor-pointer group"
      style={{ borderLeftColor: color, borderLeftWidth: 3 }}
    >
      {/* Header row */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
        <span className="font-mono text-2xl font-bold text-white/10 leading-none min-w-[2.5rem]">
          {String(entry.day).padStart(2, "0")}
        </span>
        <span className="font-mono text-[10px] text-yellow/80 tracking-wider">
          {entry.date}
        </span>
        <span
          className={`font-mono text-[10px] tracking-wider px-2 py-0.5 border ${badge}`}
        >
          {entry.location.toUpperCase()}
        </span>
        <span className="font-mono text-[9px] text-white/20 ml-auto">
          {entry.meals}
        </span>
      </div>

      {/* Body */}
      <div className="px-4 py-3">
        <h3 className="font-bold text-white/90 text-sm mb-2 group-hover:text-white transition-colors">
          {entry.title}
        </h3>
        <p className="text-white/50 text-xs leading-relaxed">
          {entry.description}
        </p>

        {/* Expanded detail */}
        {isActive && entry.detail && (
          <p className="text-white/40 text-xs leading-relaxed mt-3 pt-3 border-t border-white/5 italic">
            {entry.detail}
          </p>
        )}

        {/* Transport pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {entry.transport.map((t, i) => {
            const style = transportStyles[t.type] || transportStyles.local;
            return (
              <span
                key={i}
                className={`inline-flex items-center gap-1 font-mono text-[10px] tracking-wider px-2 py-0.5 border ${style.cls}`}
              >
                <span className="text-[9px]">{style.icon}</span>
                {t.label}
              </span>
            );
          })}
        </div>

        {/* Tip */}
        {entry.tip && isActive && (
          <p className="font-mono text-[10px] text-yellow/60 mt-2 flex items-start gap-1.5">
            <span className="text-[8px] mt-px">★</span>
            {entry.tip}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Main Component ──
export default function PatagoniaClient() {
  const [activeItinerary, setActiveItinerary] = useState(0);
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const itinerary = itineraries[activeItinerary];

  // ── Map initialization ──
  const updateMapRoute = useCallback(
    (map: mapboxgl.Map, itin: Itinerary) => {
      // Remove old layers/sources
      ["route-flights", "route-ground", "route-stops", "route-labels", "stop-labels"].forEach((id) => {
        if (map.getLayer(id)) map.removeLayer(id);
      });
      ["flights", "ground", "stops", "route-label-points", "stop-label-points"].forEach((id) => {
        if (map.getSource(id)) map.removeSource(id);
      });

      // Flight lines
      const flightSegments = itin.route.filter((r) => r.type === "flight");
      map.addSource("flights", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: flightSegments.map((r) => ({
            type: "Feature" as const,
            geometry: { type: "LineString" as const, coordinates: [r.from, r.to] },
            properties: {},
          })),
        },
      });
      map.addLayer({
        id: "route-flights",
        type: "line",
        source: "flights",
        paint: {
          "line-color": "#d4a847",
          "line-width": 1.5,
          "line-dasharray": [4, 4],
          "line-opacity": 0.6,
        },
      });

      // Ground lines
      const groundSegments = itin.route.filter((r) => r.type === "ground");
      map.addSource("ground", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: groundSegments.map((r) => ({
            type: "Feature" as const,
            geometry: { type: "LineString" as const, coordinates: [r.from, r.to] },
            properties: {},
          })),
        },
      });
      map.addLayer({
        id: "route-ground",
        type: "line",
        source: "ground",
        paint: {
          "line-color": "#d4a847",
          "line-width": 2,
          "line-opacity": 0.8,
        },
      });

      // Distance/time labels on route segments
      const labelFeatures = itin.route
        .filter((r) => r.label)
        .map((r) => ({
          type: "Feature" as const,
          geometry: {
            type: "Point" as const,
            coordinates: [
              (r.from[0] + r.to[0]) / 2,
              (r.from[1] + r.to[1]) / 2,
            ],
          },
          properties: {
            label: r.label!,
            type: r.type,
          },
        }));

      map.addSource("route-label-points", {
        type: "geojson",
        data: { type: "FeatureCollection", features: labelFeatures },
      });
      map.addLayer({
        id: "route-labels",
        type: "symbol",
        source: "route-label-points",
        layout: {
          "text-field": ["get", "label"],
          "text-size": 10,
          "text-font": ["DIN Pro Medium", "Arial Unicode MS Regular"],
          "text-offset": [0, -1],
          "text-allow-overlap": false,
        },
        paint: {
          "text-color": "#d4a847",
          "text-halo-color": "#071520",
          "text-halo-width": 2,
          "text-opacity": 0.85,
        },
      });

      // Stop markers
      const uniqueStops = new Map<string, { coords: [number, number]; color: string; name: string }>();
      itin.days.forEach((day) => {
        const key = `${day.coordinates[0]},${day.coordinates[1]}`;
        if (!uniqueStops.has(key)) {
          uniqueStops.set(key, {
            coords: day.coordinates,
            color: getLocationColor(itin, day.location),
            name: day.location,
          });
        }
      });

      map.addSource("stops", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [...uniqueStops.values()].map((s) => ({
            type: "Feature" as const,
            geometry: { type: "Point" as const, coordinates: s.coords },
            properties: { color: s.color, name: s.name },
          })),
        },
      });
      map.addLayer({
        id: "route-stops",
        type: "circle",
        source: "stops",
        paint: {
          "circle-radius": 6,
          "circle-color": ["get", "color"],
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 2,
          "circle-opacity": 0.9,
        },
      });

      // City name labels
      map.addSource("stop-label-points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [...uniqueStops.values()].map((s) => ({
            type: "Feature" as const,
            geometry: { type: "Point" as const, coordinates: s.coords },
            properties: { name: s.name, color: s.color },
          })),
        },
      });
      map.addLayer({
        id: "stop-labels",
        type: "symbol",
        source: "stop-label-points",
        layout: {
          "text-field": ["get", "name"],
          "text-size": 11,
          "text-font": ["DIN Pro Bold", "Arial Unicode MS Bold"],
          "text-offset": [0, 1.4],
          "text-anchor": "top",
          "text-allow-overlap": false,
        },
        paint: {
          "text-color": "#f0f4f7",
          "text-halo-color": "#071520",
          "text-halo-width": 2,
          "text-opacity": 0.9,
        },
      });

      // Fit bounds
      const allCoords = itin.days.map((d) => d.coordinates);
      const bounds = new mapboxgl.LngLatBounds();
      allCoords.forEach((c) => bounds.extend(c));
      map.fitBounds(bounds, { padding: 60, duration: 1200 });
    },
    []
  );

  useEffect(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return;

    if (mapRef.current) {
      updateMapRoute(mapRef.current, itinerary);
      return;
    }

    mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-68, -48],
      zoom: 3.5,
      attributionControl: false,
      interactive: true,
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

    map.on("load", () => {
      updateMapRoute(map, itinerary);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update route when itinerary changes
  useEffect(() => {
    if (mapRef.current && mapRef.current.isStyleLoaded()) {
      updateMapRoute(mapRef.current, itinerary);
    }
  }, [activeItinerary, itinerary, updateMapRoute]);

  // Fly to day's location when selected
  useEffect(() => {
    if (activeDay === null || !mapRef.current) return;
    const day = itinerary.days[activeDay];
    if (!day) return;
    mapRef.current.flyTo({
      center: day.coordinates,
      zoom: 8,
      duration: 1200,
    });
  }, [activeDay, itinerary]);

  return (
    <div className="min-h-screen bg-dark cyber-grid flex flex-col">
      <Header />

      <main className="flex-1 pt-24">
        {/* ── HERO ── */}
        <section className="relative px-6 pt-12 pb-8 overflow-hidden">
          {/* Mountain silhouette */}
          <svg
            className="absolute bottom-0 left-0 right-0 h-24 opacity-[0.06]"
            viewBox="0 0 1400 100"
            preserveAspectRatio="none"
            fill="white"
          >
            <polygon points="0,100 80,35 160,65 280,10 380,50 500,20 620,55 740,5 880,45 1020,25 1160,60 1300,15 1400,40 1400,100" />
          </svg>

          <div className="mx-auto max-w-7xl relative">
            <p className="font-mono text-[10px] tracking-[0.3em] text-yellow mb-3 uppercase">
              ✦ Itinerario Completo ✦
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-[1.05] mb-1">
              <span className="text-cyan">PATAGONIA</span>
              <br />
              <span className="text-white/80 italic">Argentina</span>
            </h1>
            <p className="font-mono text-xs text-white/40 mt-2 max-w-xl">
              <span className="text-cyan">&gt;</span> Ghiacciai, pinguini, Terra del Fuoco e la fine del mondo.
            </p>
          </div>
        </section>

        {/* ── ITINERARY TOGGLE ── */}
        <section className="px-6 py-4 border-y border-white/5">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row gap-3">
            {itineraries.map((itin, i) => (
              <button
                key={itin.id}
                onClick={() => {
                  setActiveItinerary(i);
                  setActiveDay(null);
                }}
                className={`flex-1 text-left px-4 py-3 border font-mono text-xs transition-all duration-300 ${
                  activeItinerary === i
                    ? "border-cyan/40 bg-cyan/5 text-cyan"
                    : "border-white/10 bg-transparent text-white/40 hover:border-white/20 hover:text-white/60"
                }`}
              >
                <span className="block font-bold text-sm mb-0.5">{itin.title}</span>
                <span className="block text-[10px] tracking-wider text-white/30">
                  {itin.dates}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section className="px-6 py-4 border-b border-white/5 bg-white/[0.01]">
          <div className="mx-auto max-w-7xl flex items-center gap-8 overflow-x-auto">
            {itinerary.stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5 min-w-fit">
                <span className="font-bold text-xl text-yellow leading-none">
                  {s.value}
                </span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── ROUTE BAR ── */}
        <section className="px-6 py-3 border-b border-white/5 overflow-x-auto">
          <div className="mx-auto max-w-7xl flex items-center gap-0 min-w-fit">
            {itinerary.destinations.map((dest, i) => (
              <span key={dest.name} className="flex items-center">
                <span
                  className="font-mono text-[10px] tracking-[0.12em] uppercase whitespace-nowrap"
                  style={{ color: dest.color }}
                >
                  {dest.name}
                </span>
                {i < itinerary.destinations.length - 1 && (
                  <span className="text-white/20 mx-2 text-xs">→</span>
                )}
              </span>
            ))}
          </div>
        </section>

        {/* ── MAP ── */}
        <section className="px-6 py-6">
          <div className="mx-auto max-w-7xl">
            <p className="font-mono text-[10px] tracking-[0.3em] text-cyan/50 uppercase mb-3">
              {'// Mappa del Percorso'}
            </p>
            <div
              ref={mapContainer}
              className="w-full h-[400px] md:h-[500px] border border-white/10 bg-dark"
            />
            {/* Map legend */}
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <span className="font-mono text-[9px] tracking-[0.15em] text-white/30 uppercase">
                Destinazioni →
              </span>
              {itinerary.destinations.map((d) => (
                <div key={d.name} className="flex items-center gap-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: d.color }}
                  />
                  <span className="font-mono text-[10px] text-white/40">{d.name}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 ml-auto">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-0 border-t border-dashed border-yellow/60" />
                  <span className="font-mono text-[10px] text-white/30">Volo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-0 border-t-2 border-yellow/80" />
                  <span className="font-mono text-[10px] text-white/30">Auto/Bus</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DAY-BY-DAY ── */}
        <section className="px-6 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-6">
              <p className="font-mono text-[10px] tracking-[0.3em] text-cyan/50 uppercase">
                {'// Programma Giorno per Giorno'}
              </p>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            <div className="flex flex-col gap-3">
              {itinerary.days.map((day, i) => (
                <DayCard
                  key={`${itinerary.id}-${day.day}`}
                  entry={day}
                  itinerary={itinerary}
                  isActive={activeDay === i}
                  onClick={() => setActiveDay(activeDay === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
