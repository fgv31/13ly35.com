"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { places, Place } from "@/data/mock/places";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "YOUR_MAPBOX_TOKEN";

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [filter, setFilter] = useState<"all" | "lived" | "visited" | "bucket-list">("all");

  const filteredPlaces = filter === "all"
    ? places
    : places.filter(p => p.category === filter);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          "osm-tiles": {
            type: "raster",
            tiles: [
              "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
            ],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors",
          },
        },
        layers: [
          {
            id: "osm-tiles",
            type: "raster",
            source: "osm-tiles",
            paint: {
              "raster-saturation": -1,
              "raster-brightness-min": 0,
              "raster-brightness-max": 0.25,
              "raster-contrast": 0.3,
              "raster-hue-rotate": 180,
            },
          },
        ],
      },
      center: [10, 30],
      zoom: 2,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    const existingMarkers = document.querySelectorAll(".custom-marker");
    existingMarkers.forEach(marker => marker.remove());

    filteredPlaces.forEach(place => {
      const el = document.createElement("div");
      el.className = "custom-marker";
      el.style.cssText = `
        width: 12px;
        height: 12px;
        background: ${place.category === "lived" ? "#ff00aa" : place.category === "visited" ? "#00f0ff" : "#666"};
        border: 2px solid #0a0a0f;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 0 10px ${place.category === "lived" ? "#ff00aa" : place.category === "visited" ? "#00f0ff" : "#666"};
      `;
      el.addEventListener("mouseenter", () => {
        el.style.transform = "scale(1.5)";
        el.style.boxShadow = `0 0 20px ${place.category === "lived" ? "#ff00aa" : "#00f0ff"}`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "scale(1)";
        el.style.boxShadow = `0 0 10px ${place.category === "lived" ? "#ff00aa" : place.category === "visited" ? "#00f0ff" : "#666"}`;
      });
      el.addEventListener("click", () => {
        setSelectedPlace(place);
        map.current?.flyTo({
          center: place.coordinates,
          zoom: 5,
          duration: 1500,
        });
      });

      new mapboxgl.Marker(el)
        .setLngLat(place.coordinates)
        .addTo(map.current!);
    });
  }, [filter, filteredPlaces]);

  const categoryColors = {
    lived: "bg-magenta",
    visited: "bg-cyan",
    "bucket-list": "bg-white/30",
  };

  const filterOptions = [
    { value: "all" as const, label: "ALL" },
    { value: "lived" as const, label: "LIVED" },
    { value: "visited" as const, label: "VISITED" },
    { value: "bucket-list" as const, label: "BUCKET_LIST" },
  ];

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <header className="mb-12">
            <p className="font-mono text-xs text-magenta mb-4">[02] // MAP_MODULE</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="text-cyan">GEO</span>_DATA
            </h1>
            <p className="text-lg text-white/50 max-w-2xl leading-relaxed font-mono">
              <span className="text-cyan">&gt;</span> Places I&apos;ve been and where I&apos;m going.
            </p>
          </header>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {filterOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className={`font-mono text-xs px-4 py-2 border transition-all duration-300 ${
                  filter === opt.value
                    ? "bg-cyan text-dark border-cyan"
                    : "bg-transparent text-white/50 border-cyan/20 hover:border-cyan/50 hover:text-cyan"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex gap-6 font-mono text-xs mb-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-magenta rounded-full shadow-[0_0_10px_#ff00aa]"></div>
              <span className="text-white/50">LIVED</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan rounded-full shadow-[0_0_10px_#00f0ff]"></div>
              <span className="text-white/50">VISITED</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white/30 rounded-full"></div>
              <span className="text-white/50">BUCKET_LIST</span>
            </div>
          </div>

          {/* Map container */}
          <div className="relative h-[60vh] mb-16 border border-cyan/20 overflow-hidden">
            <div ref={mapContainer} className="w-full h-full" />

            {/* Scanline overlay on map */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-cyan/5 to-transparent" />

            {/* Selected place card */}
            {selectedPlace && (
              <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-dark/95 border border-cyan/30 p-6 backdrop-blur-sm">
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="absolute top-4 right-4 text-white/30 hover:text-cyan transition-colors duration-300 font-mono text-xs"
                >
                  [X]
                </button>
                <p className={`font-mono text-xs mb-3 ${
                  selectedPlace.category === "lived" ? "text-magenta" :
                  selectedPlace.category === "visited" ? "text-cyan" :
                  "text-white/40"
                }`}>
                  // {selectedPlace.category.toUpperCase()}
                </p>
                <h3 className="text-xl font-bold text-white mb-1">{selectedPlace.name}</h3>
                <p className="font-mono text-xs text-white/40 mb-3">{selectedPlace.country} · {selectedPlace.date}</p>
                <p className="text-sm text-white/60 leading-relaxed">{selectedPlace.description}</p>
              </div>
            )}
          </div>

          {/* Places grid */}
          <div>
            <p className="font-mono text-xs text-magenta mb-6">// ALL_LOCATIONS</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPlaces.map((place, index) => (
                <button
                  key={place.id}
                  onClick={() => {
                    setSelectedPlace(place);
                    map.current?.flyTo({
                      center: place.coordinates,
                      zoom: 5,
                      duration: 1500,
                    });
                  }}
                  className="text-left p-6 bg-muted/50 border border-cyan/10 hover:border-cyan/50 transition-all duration-300 group"
                  style={{
                    opacity: 0,
                    animation: `fadeIn 0.5s ease-out ${index * 0.05}s forwards`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${categoryColors[place.category]}`}></div>
                    <span className="font-mono text-xs text-white/40">{place.category.toUpperCase()}</span>
                  </div>
                  <h3 className="font-bold text-white group-hover:text-cyan transition-colors duration-300">
                    {place.name}, {place.country}
                  </h3>
                  <p className="font-mono text-xs text-white/40 mt-1">{place.date}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
