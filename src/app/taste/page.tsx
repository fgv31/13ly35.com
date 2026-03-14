"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RecommendationCard from "@/components/ui/RecommendationCard";
import { recommendations, type Category } from "@/data/mock/recommendations";

export default function TastePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [exactRating, setExactRating] = useState<number>(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories: Array<{ value: Category | "all"; label: string; activeClass: string }> = [
    { value: "all", label: "ALL", activeClass: "bg-cyan text-dark border-cyan" },
    { value: "movies", label: "MOVIES", activeClass: "bg-yellow text-dark border-yellow" },
    { value: "music", label: "MUSIC", activeClass: "bg-yellow text-dark border-yellow" },
    { value: "objects", label: "OBJECTS", activeClass: "bg-yellow text-dark border-yellow" },
    { value: "people", label: "PEOPLE", activeClass: "bg-yellow text-dark border-yellow" },
    { value: "food", label: "FOOD", activeClass: "bg-yellow text-dark border-yellow" },
  ];

  const filteredRecommendations = recommendations.filter((rec) => {
    if (selectedCategory !== "all" && rec.category !== selectedCategory) return false;
    if (exactRating > 0 && rec.rating < exactRating) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-dark cyber-grid flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <header className="mb-16">
            <div className="mb-4">
              <p className="font-mono text-xs text-magenta">[02] // PICKS_MODULE</p>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
              MY <span className="text-cyan">PICKS</span>
            </h1>
            <p className="text-lg text-white/50 max-w-2xl leading-relaxed font-mono">
              <span className="text-cyan">&gt;</span> Things that resonate. Movies, music, objects, and places worth experiencing.
            </p>
          </header>

          {/* Filters */}
          <div className="mb-12 flex flex-wrap items-center gap-6">
            {/* Category */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`font-mono text-xs px-4 py-2 border transition-all duration-300 ${
                    selectedCategory === category.value
                      ? category.activeClass
                      : "bg-transparent text-white/50 border-cyan/20 hover:border-cyan/50 hover:text-cyan"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Star filter */}
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setExactRating(exactRating === star ? 0 : star)}
                  className="transition-all duration-300"
                >
                  <div
                    className={`w-3 h-3 transition-all duration-300 ${
                      exactRating > 0 && star <= exactRating
                        ? "bg-cyan shadow-[0_0_6px_#00ff66]"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                    style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
                  />
                </button>
              ))}
              {exactRating > 0 && (
                <button
                  onClick={() => setExactRating(0)}
                  className="font-mono text-[10px] text-white/30 hover:text-cyan transition-colors ml-1"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecommendations.map((recommendation, index) => (
              <div
                key={recommendation.id}
                className={`transition-all duration-500 ${
                  expandedId === recommendation.id
                    ? "md:col-span-2 lg:col-span-2 md:row-span-2"
                    : ""
                }`}
                style={{
                  opacity: 0,
                  animation: `fadeIn 0.5s ease-out ${index * 0.05}s forwards`,
                }}
              >
                <RecommendationCard
                  recommendation={recommendation}
                  isExpanded={expandedId === recommendation.id}
                  onClick={() => setExpandedId(expandedId === recommendation.id ? null : recommendation.id)}
                />
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
