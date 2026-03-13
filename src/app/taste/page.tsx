"use client";

import { useState } from "react";
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
    <div className="min-h-screen bg-beige p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="font-pixel text-2xl md:text-4xl text-black mb-4">
            Taste
          </h1>
          <p className="font-sans text-base md:text-lg text-black/70 max-w-2xl">
            Things I love and recommend. Curated with care.
          </p>
        </header>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`
                font-pixel text-xs px-4 py-3 border-2 border-black
                pixel-hover transition-all
                ${
                  selectedCategory === category.value
                    ? "bg-red text-beige"
                    : "bg-white text-black hover:bg-black hover:text-beige"
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredRecommendations.length === 0 && (
          <div className="text-center py-12">
            <p className="font-pixel text-sm text-black/50">
              No recommendations found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
