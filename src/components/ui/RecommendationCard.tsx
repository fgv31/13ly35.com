import StarRating from "./StarRating";
import type { Recommendation } from "@/data/mock/recommendations";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const categoryColors: Record<string, string> = {
    movies: "bg-red text-beige",
    music: "bg-black text-beige",
    objects: "bg-beige text-black border-2 border-black",
    places: "bg-red/10 text-black border-2 border-red",
  };

  return (
    <div className="pixel-hover bg-white border-2 border-black p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-pixel text-xs leading-relaxed flex-1">
          {recommendation.title}
        </h3>
        <span
          className={`${
            categoryColors[recommendation.category]
          } px-2 py-1 text-[10px] font-pixel uppercase whitespace-nowrap`}
        >
          {recommendation.category}
        </span>
      </div>

      <StarRating rating={recommendation.rating} />

      <p className="font-sans text-sm text-black/80">
        {recommendation.description}
      </p>
    </div>
  );
}
