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
              "raster-brightness-max": 0.3,
              "raster-contrast": 0.2,
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
        background: ${place.category === "lived" ? "#FF1A00" : place.category === "visited" ? "#F5F2EB" : "#666"};
        border: 2px solid #0A0A0A;
        border-radius: 50%;
        cursor: pointer;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      `;
      el.addEventListener("mouseenter", () => {
        el.style.transform = "scale(1.5)";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "scale(1)";
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
    lived: "bg-red",
    visited: "bg-beige",
    "bucket-list": "bg-beige/30",
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <header className="mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-beige/40 mb-4">02 / Map</p>
            <h1 className="text-4xl md:text-6xl font-light text-beige mb-6">
              Wandering
            </h1>
            <p className="text-lg text-beige/60 max-w-2xl leading-relaxed">
              Places I&apos;ve been and where I&apos;m going.
            </p>
          </header>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {(["all", "lived", "visited", "bucket-list"] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 text-sm capitalize transition-all duration-300 ${
                  filter === cat
                    ? "bg-beige text-dark"
                    : "bg-transparent text-beige/60 hover:text-beige"
                }`}
              >
                {cat === "bucket-list" ? "Bucket List" : cat}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex gap-6 text-sm mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red rounded-full"></div>
              <span className="text-beige/60">Lived</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-beige rounded-full"></div>
              <span className="text-beige/60">Visited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-beige/30 rounded-full"></div>
              <span className="text-beige/60">Bucket List</span>
            </div>
          </div>

          {/* Map container */}
          <div className="relative h-[60vh] mb-16 overflow-hidden border border-beige/10">
            <div ref={mapContainer} className="w-full h-full" />

            {/* Selected place card */}
            {selectedPlace && (
              <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-dark border border-beige/10 p-6">
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="absolute top-4 right-4 text-beige/30 hover:text-red transition-colors duration-300"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
                <span className={`inline-block text-xs uppercase tracking-[0.15em] mb-3 ${
                  selectedPlace.category === "lived" ? "text-red" :
                  selectedPlace.category === "visited" ? "text-beige" :
                  "text-beige/40"
                }`}>
                  {selectedPlace.category}
                </span>
                <h3 className="text-xl font-light text-beige mb-1">{selectedPlace.name}</h3>
                <p className="text-sm text-beige/40 mb-3">{selectedPlace.country} · {selectedPlace.date}</p>
                <p className="text-sm text-beige/60 leading-relaxed">{selectedPlace.description}</p>
              </div>
            )}
          </div>

          {/* Places grid */}
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] text-beige/40 mb-6">All Places</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="text-left p-6 bg-beige/5 hover:bg-beige/10 transition-all duration-300 group"
                  style={{
                    opacity: 0,
                    animation: `fadeIn 0.5s ease-out ${index * 0.05}s forwards`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${categoryColors[place.category]}`}></div>
                    <span className="text-xs uppercase tracking-[0.15em] text-beige/40">{place.category}</span>
                  </div>
                  <h3 className="text-lg font-light text-beige group-hover:text-red transition-colors duration-300">
                    {place.name}, {place.country}
                  </h3>
                  <p className="text-sm text-beige/40">{place.date}</p>
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
