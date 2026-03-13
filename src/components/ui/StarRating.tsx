interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

export default function StarRating({ rating, maxRating = 5 }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: maxRating }, (_, i) => {
        const isFilled = i < rating;
        return (
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block"
          >
            {/* Pixel-style star */}
            <path
              d="M7 0H9V2H7V0Z
                 M9 2H11V4H9V2Z
                 M11 4H13V6H11V4Z
                 M13 6H16V9H13V6Z
                 M11 9H13V11H11V9Z
                 M9 11H11V13H9V11Z
                 M7 13H9V16H7V13Z
                 M5 11H7V13H5V11Z
                 M3 9H5V11H3V9Z
                 M0 6H3V9H0V6Z
                 M3 4H5V6H3V4Z
                 M5 2H7V4H5V2Z"
              fill={isFilled ? "#FF1A00" : "none"}
              stroke="#1A1A1A"
              strokeWidth="1"
            />
          </svg>
        );
      })}
    </div>
  );
}
