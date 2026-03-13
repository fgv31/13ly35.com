"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RecommendationCard from "@/components/ui/RecommendationCard";
import { recommendations, type Category } from "@/data/mock/recommendations";

export default function TastePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");

  const categories: Array<{ value: Category | "all"; label: string }> = [
    { value: "all", label: "All" },
    { value: "movies", label: "Movies" },
    { value: "music", label: "Music" },
    { value: "objects", label: "Objects" },
    { value: "places", label: "Places" },
  ];

  const filteredRecommendations =
    selectedCategory === "all"
      ? recommendations
      : recommendations.filter((rec) => rec.category === selectedCategory);

  return (
    <div className="min-h-screen bg-beige flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <header className="mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-4">03 / Taste</p>
            <h1 className="text-4xl md:text-6xl font-light text-black mb-6">
              Curated
            </h1>
            <p className="text-lg text-black/60 max-w-2xl leading-relaxed">
              Things that resonate. Movies, music, objects, and places worth experiencing.
            </p>
          </header>

          {/* Category Filters */}
          <div className="mb-12 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-5 py-2.5 text-sm transition-all duration-300 ${
                  selectedCategory === category.value
                    ? "bg-black text-beige"
                    : "bg-transparent text-black/60 hover:text-black"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecommendations.map((recommendation, index) => (
              <div
                key={recommendation.id}
                style={{
                  opacity: 0,
                  animation: `fadeIn 0.5s ease-out ${index * 0.05}s forwards`,
                }}
              >
                <RecommendationCard recommendation={recommendation} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredRecommendations.length === 0 && (
            <div className="text-center py-20">
              <p className="text-black/40">No recommendations in this category yet.</p>
            </div>
          )}
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
