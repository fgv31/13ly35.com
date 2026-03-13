"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { places, Place } from "@/data/mock/places";

// You'll need to add your Mapbox token
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
              "raster-saturation": -0.8,
              "raster-brightness-min": 0.1,
              "raster-contrast": 0.1,
            },
          },
        ],
      },
      center: [10, 30],
      zoom: 2,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Add/update markers when filter changes
  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers
    const existingMarkers = document.querySelectorAll(".custom-marker");
    existingMarkers.forEach(marker => marker.remove());

    // Add new markers
    filteredPlaces.forEach(place => {
      const el = document.createElement("div");
      el.className = "custom-marker";
      el.style.cssText = `
        width: 16px;
        height: 16px;
        background: ${place.category === "lived" ? "#FF1A00" : place.category === "visited" ? "#1A1A1A" : "#888"};
        border: 2px solid #F5F2EB;
        border-radius: 50%;
        cursor: pointer;
        transition: transform 0.2s;
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
    visited: "bg-black",
    "bucket-list": "bg-gray-400",
  };

  return (
    <main className="min-h-screen bg-beige">
      {/* Header */}
      <div className="p-8">
        <h1 className="font-pixel text-2xl md:text-4xl mb-4">MAP</h1>
        <p className="text-lg text-black/70 mb-6">Places I&apos;ve been and where I&apos;m going</p>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(["all", "lived", "visited", "bucket-list"] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 font-mono text-sm border-2 border-black transition-all ${
                filter === cat
                  ? "bg-black text-beige"
                  : "bg-beige text-black hover:bg-black/10"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red rounded-full border border-beige"></div>
            <span>Lived</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-black rounded-full border border-beige"></div>
            <span>Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full border border-beige"></div>
            <span>Bucket List</span>
          </div>
        </div>
      </div>

      {/* Map container */}
      <div className="relative h-[60vh] mx-8 mb-8 border-2 border-black">
        <div ref={mapContainer} className="w-full h-full" />

        {/* Selected place card */}
        {selectedPlace && (
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-beige border-2 border-black p-4 shadow-[4px_4px_0_#1A1A1A]">
            <button
              onClick={() => setSelectedPlace(null)}
              className="absolute top-2 right-2 text-black/50 hover:text-red"
            >
              ✕
            </button>
            <div className={`inline-block px-2 py-1 text-xs font-mono mb-2 ${
              selectedPlace.category === "lived" ? "bg-red text-beige" :
              selectedPlace.category === "visited" ? "bg-black text-beige" :
              "bg-gray-400 text-black"
            }`}>
              {selectedPlace.category.toUpperCase()}
            </div>
            <h3 className="font-pixel text-lg">{selectedPlace.name}</h3>
            <p className="text-sm text-black/70">{selectedPlace.country} • {selectedPlace.date}</p>
            <p className="mt-2 text-sm">{selectedPlace.description}</p>
          </div>
        )}
      </div>

      {/* Places list */}
      <div className="px-8 pb-8">
        <h2 className="font-pixel text-lg mb-4">ALL PLACES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlaces.map(place => (
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
              className="text-left p-4 border-2 border-black bg-beige hover:shadow-[4px_4px_0_#FF1A00] transition-all"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${categoryColors[place.category]}`}></div>
                <span className="font-mono text-xs text-black/50">{place.category}</span>
              </div>
              <h3 className="font-bold">{place.name}, {place.country}</h3>
              <p className="text-sm text-black/70">{place.date}</p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
