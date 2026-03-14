"use client";

import { useEffect, useRef, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Timeline, { TimelineHandle } from "@/components/ui/Timeline";
import { journeyData, JourneyEntry } from "@/data/mock/cv";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "YOUR_MAPBOX_TOKEN";

const categoryMarkerColors: Record<string, string> = {
  live: "#00ff66",
  archived: "#ff8800",
  queued: "#555555",
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
    strokeColor: entry.category === "queued" ? "#333333" : "#000000",
  },
}));

export default function AboutPage() {
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
              color: entry.category === "live" ? "#00ff66" : entry.category === "queued" ? "#555555" : "#ff8800",
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
          // Background — pure black
          {
            id: "background",
            type: "background",
            paint: { "background-color": "#000000" },
          },
          // Ocean/sea only (no lakes/rivers)
          {
            id: "water",
            type: "fill",
            source: "mapbox-streets",
            "source-layer": "water",
            filter: ["!", ["coalesce", ["get", "class"], false]],
            paint: { "fill-color": "transparent" },
          },
          // Coastlines (ocean only)
          {
            id: "water-outline",
            type: "line",
            source: "mapbox-streets",
            "source-layer": "water",
            filter: ["!", ["coalesce", ["get", "class"], false]],
            paint: {
              "line-color": "#ffffff",
              "line-width": 0.6,
              "line-opacity": 0.2,
              "line-dasharray": [4, 3],
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
              "line-color": "#ffffff",
              "line-width": 0.7,
              "line-opacity": 0.2,
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
              "line-color": "#ffffff",
              "line-width": 0.3,
              "line-opacity": 0.1,
              "line-dasharray": [3, 3],
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
              "circle-stroke-color": ["coalesce", ["get", "color"], "#00ff66"],
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
              "circle-stroke-color": ["coalesce", ["get", "color"], "#00ff66"],
              "circle-stroke-opacity": 0.3,
            },
          },
        ],
      },
      center: [10, 45],
      zoom: 3,
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
        duration: 2000,
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
      {/* Fixed map background — covers entire viewport */}
      <div className="fixed inset-0 z-0">
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
                THE <span className="text-cyan">JOURNEY</span>
              </h1>
              <p className="text-lg text-white/50 max-w-2xl leading-relaxed font-mono mb-4">
                <span className="text-cyan">&gt;</span> From Verona to Frankfurt to London to Berlin — through central banking, startups, and ambulances.
              </p>

              {/* Legend */}
              <div className="flex gap-6 font-mono text-xs journey-fade" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan rounded-full shadow-[0_0_10px_#00ff66] live-blink"></div>
                  <span className="text-white/50">LIVE</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-magenta rounded-full shadow-[0_0_10px_#ff8800]"></div>
                  <span className="text-white/50">ARCHIVED</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-white/20 rounded-full border border-white/10"></div>
                  <span className="text-white/30">QUEUED</span>
                </div>
              </div>
            </header>

            {/* Timeline */}
            <div className="md:w-2/3 lg:w-1/2 journey-fade" style={{ animationDelay: "0.6s" }}>
              <p className="font-mono text-xs text-magenta mb-6">// CLICK A LOCATION TO EXPLORE</p>
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
