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
					<div
						key={i}
						className={`w-2 h-2 transition-all duration-300 ${
							isFilled
								? "bg-blue shadow-[0_0_6px_var(--accent-blue)]"
								: "bg-white/10"
						}`}
						style={{
							clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
						}}
					/>
				);
			})}
		</div>
	);
}
