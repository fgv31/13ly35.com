interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

export default function StarRating({ rating, maxRating = 5 }: StarRatingProps) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: maxRating }, (_, i) => {
        const isFilled = i < rating;
        return (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              isFilled ? "bg-red" : "bg-black/20"
            }`}
          />
        );
      })}
    </div>
  );
}
