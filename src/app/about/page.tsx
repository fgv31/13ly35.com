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

export default function AboutPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const timelineRef = useRef<TimelineHandle>(null);

  const activeIndicator = useRef<mapboxgl.Marker | null>(null);

  const showLocationIndicator = useCallback((entry: typeof sortedEntries[number]) => {
    activeIndicator.current?.remove();
    if (!map.current) return;

    const color = entry.category === "live" ? "#00ff66" : entry.category === "queued" ? "#555" : "#ff8800";

    const el = document.createElement("div");
    el.className = "cyber-reticle";
    el.innerHTML = `
      <div class="reticle-ring" style="border-color:${color}"></div>
      <div class="reticle-ring reticle-ring-2" style="border-color:${color}"></div>
      <div class="reticle-crosshair" style="background:${color}"></div>
      <div class="reticle-crosshair reticle-crosshair-v" style="background:${color}"></div>
    `;

    activeIndicator.current = new mapboxgl.Marker({ element: el, anchor: "center" })
      .setLngLat(entry.coordinates)
      .addTo(map.current);
  }, []);

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
        ],
      },
      center: [10, 45],
      zoom: 3,
      interactive: false,
    });

    sortedEntries.forEach((entry, index) => {
      const color = categoryMarkerColors[entry.category];
      const isLive = entry.category === "live";
      const isQueued = entry.category === "queued";

      const el = document.createElement("div");
      el.style.cssText = `
        width: ${isLive ? "14px" : isQueued ? "8px" : "10px"};
        height: ${isLive ? "14px" : isQueued ? "8px" : "10px"};
        background: ${color};
        border: 2px solid ${isQueued ? "#333" : "#000"};
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 0 ${isQueued ? "4px" : "8px"} ${color};
        ${isLive ? "animation: livePulse 1.5s ease-in-out infinite;" : ""}
      `;
      el.addEventListener("mouseenter", () => {
        el.style.transform = "scale(1.8)";
        el.style.boxShadow = `0 0 16px ${color}`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "scale(1)";
        el.style.boxShadow = `0 0 ${isQueued ? "4px" : "8px"} ${color}`;
      });
      el.addEventListener("click", () => {
        timelineRef.current?.scrollToLocation(index);
        map.current?.flyTo({
          center: entry.coordinates,
          zoom: 5,
          duration: 1200,
        });
        showLocationIndicator(entry);
      });

      new mapboxgl.Marker(el)
        .setLngLat(entry.coordinates)
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

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
    }, 800);

    return () => clearTimeout(timer);
  }, []);

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
              <div className="flex gap-6 font-mono text-xs">
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
            <div className="md:w-2/3 lg:w-1/2">
              <p className="font-mono text-xs text-magenta mb-6">// CLICK A LOCATION TO EXPLORE</p>
              <Timeline ref={timelineRef} entries={sortedEntries} onLocationClick={handleLocationClick} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
