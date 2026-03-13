"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RecommendationCard from "@/components/ui/RecommendationCard";
import { recommendations, type Category } from "@/data/mock/recommendations";

export default function TastePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");

  const categories: Array<{ value: Category | "all"; label: string }> = [
    { value: "all", label: "ALL" },
    { value: "movies", label: "MOVIES" },
    { value: "music", label: "MUSIC" },
    { value: "objects", label: "OBJECTS" },
    { value: "places", label: "PLACES" },
  ];

  const filteredRecommendations =
    selectedCategory === "all"
      ? recommendations
      : recommendations.filter((rec) => rec.category === selectedCategory);

  return (
    <div className="min-h-screen bg-dark cyber-grid flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <header className="mb-16">
            <p className="font-mono text-xs text-magenta mb-4">[03] // TASTE_MODULE</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="text-cyan">CURATED</span> DATA
            </h1>
            <p className="text-lg text-white/50 max-w-2xl leading-relaxed font-mono">
              <span className="text-cyan">&gt;</span> Things that resonate. Movies, music, objects, and places worth experiencing.
            </p>
          </header>

          {/* Category Filters */}
          <div className="mb-12 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`font-mono text-xs px-4 py-2 border transition-all duration-300 ${
                  selectedCategory === category.value
                    ? "bg-cyan text-dark border-cyan"
                    : "bg-transparent text-white/50 border-cyan/20 hover:border-cyan/50 hover:text-cyan"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <div className="text-center py-20 border border-cyan/10">
              <p className="font-mono text-white/40">NO_DATA_FOUND</p>
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
