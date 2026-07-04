import StarRating from "./StarRating";
import type { Recommendation } from "@/data/mock/recommendations";

interface RecommendationCardProps {
	recommendation: Recommendation;
	isExpanded: boolean;
	onClick: () => void;
}

export default function RecommendationCard({ recommendation, isExpanded, onClick }: RecommendationCardProps) {
	return (
		<button
			onClick={onClick}
			className={`group w-full h-full text-left p-6 bg-muted/50 border transition-all duration-500 relative ${
				isExpanded
					? "border-blue/50 bg-muted/80"
					: "border-blue/30 md:border-blue/10 hover:border-[var(--accent-cyan)]/50"
			}`}
		>
			{/* Corner accents */}
			<div className={`absolute top-0 right-0 w-4 h-4 border-t border-r transition-colors duration-300 ${
				isExpanded ? "border-blue/50" : "border-blue/40 md:border-blue/20 group-hover:border-[var(--accent-cyan)]/50"
			}`} />
			<div className={`absolute bottom-0 left-0 w-4 h-4 border-b border-l transition-colors duration-300 ${
				isExpanded ? "border-blue/50" : "border-blue/40 md:border-blue/20 group-hover:border-[var(--accent-cyan)]/50"
			}`} />

			<div className="flex items-start justify-between gap-4 mb-4">
				<span className="font-mono text-xs text-[var(--accent-cyan)]">
					{'// '}{recommendation.category.toUpperCase()}
				</span>
				<StarRating rating={recommendation.rating} />
			</div>

			<h3 className={`text-lg font-bold transition-colors duration-300 mb-2 ${
				isExpanded ? "text-blue glow-blue" : "text-white group-hover:text-[var(--accent-cyan)]"
			}`}>
				{recommendation.title}
			</h3>

			<p className="text-sm text-white/40 leading-relaxed">
				{recommendation.description}
			</p>

			{/* Expanded content */}
			{isExpanded && (
				<div className="mt-6 pt-6 border-t border-violet/20 animate-fadeIn">
					{recommendation.detail && (
						<p className="text-sm text-white/60 leading-relaxed mb-6 font-mono">
							<span className="text-violet">&gt;</span> {recommendation.detail}
						</p>
					)}

					{recommendation.link && (
						<a
							href={recommendation.link}
							target="_blank"
							rel="noopener noreferrer"
							onClick={(e) => e.stopPropagation()}
							className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2 border border-violet/40 text-violet hover:bg-violet hover:text-dark transition-all duration-300"
						>
							<span>OPEN_{recommendation.linkLabel || "LINK"}</span>
							<svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
							</svg>
						</a>
					)}

					<p className="mt-4 font-mono text-[10px] text-white/20">{'// CLICK TO COLLAPSE'}</p>
				</div>
			)}
		</button>
	);
}
