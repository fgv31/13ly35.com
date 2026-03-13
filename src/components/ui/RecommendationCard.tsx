import StarRating from "./StarRating";
import type { Recommendation } from "@/data/mock/recommendations";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <div className="group p-6 bg-beige/5 hover:bg-beige/10 transition-colors duration-300">
      <div className="flex items-start justify-between gap-4 mb-4">
        <span className="text-xs uppercase tracking-[0.15em] text-beige/40">
          {recommendation.category}
        </span>
        <StarRating rating={recommendation.rating} />
      </div>

      <h3 className="text-lg font-light text-beige group-hover:text-red transition-colors duration-300 mb-2">
        {recommendation.title}
      </h3>

      <p className="text-sm text-beige/50 leading-relaxed">
        {recommendation.description}
      </p>
    </div>
  );
}
