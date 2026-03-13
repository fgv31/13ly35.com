import StarRating from "./StarRating";
import type { Recommendation } from "@/data/mock/recommendations";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <div className="group p-6 bg-muted/50 border border-cyan/10 hover:border-cyan/50 transition-all duration-300 relative">
      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan/20 group-hover:border-cyan/50 transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan/20 group-hover:border-cyan/50 transition-colors duration-300" />

      <div className="flex items-start justify-between gap-4 mb-4">
        <span className="font-mono text-xs text-magenta">
          // {recommendation.category.toUpperCase()}
        </span>
        <StarRating rating={recommendation.rating} />
      </div>

      <h3 className="text-lg font-bold text-white group-hover:text-cyan transition-colors duration-300 mb-2">
        {recommendation.title}
      </h3>

      <p className="text-sm text-white/40 leading-relaxed">
        {recommendation.description}
      </p>
    </div>
  );
}
