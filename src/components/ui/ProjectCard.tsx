"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Project, ProjectStatus } from "@/data/mock/projects";
import { useQualityTier } from "@/lib/quality";
import { useMagnetic } from "@/lib/motion";

const statusStyles: Record<ProjectStatus, { color: string; label: string }> = {
	idea: { color: "text-violet", label: "CONCEPT" },
	built: { color: "text-blue", label: "DEPLOYED" },
	ongoing: { color: "text-[var(--accent-cyan)]", label: "IN_DEV" },
	deleted: { color: "text-[var(--status-queued)]", label: "INTERRUPTED" },
};

interface ProjectCardProps {
	project: Project;
	onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
	const status = statusStyles[project.status];
	const cardRef = useRef<HTMLButtonElement>(null);
	const cornerTR = useMagnetic<HTMLDivElement>(8);
	const cornerBL = useMagnetic<HTMLDivElement>(8);
	const tier = useQualityTier();

	// Hover tilt — GSAP quickTo on rotationX/rotationY, only for high-tier + fine pointer.
	useEffect(() => {
		const el = cardRef.current;
		if (!el) return;
		if (tier !== "high") return;
		if (typeof window === "undefined") return;
		if (!window.matchMedia("(pointer: fine)").matches) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const rotateX = gsap.quickTo(el, "rotationX", { duration: 0.4, ease: "power3" });
		const rotateY = gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power3" });

		function handleMove(event: MouseEvent) {
			const rect = el!.getBoundingClientRect();
			const relX = (event.clientX - rect.left) / rect.width - 0.5;
			const relY = (event.clientY - rect.top) / rect.height - 0.5;
			rotateY(relX * 10);
			rotateX(relY * -10);
		}

		function handleLeave() {
			gsap.to(el!, { rotationX: 0, rotationY: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
		}

		el.addEventListener("mousemove", handleMove);
		el.addEventListener("mouseleave", handleLeave);

		return () => {
			el.removeEventListener("mousemove", handleMove);
			el.removeEventListener("mouseleave", handleLeave);
			gsap.killTweensOf(el);
		};
	}, [tier]);

	return (
		<button
			ref={cardRef}
			onClick={onClick}
			className="group p-8 bg-muted/50 border border-white/10 hover:border-[var(--accent-cyan)]/40 transition-colors duration-300 relative w-full text-left cursor-pointer [transform-style:preserve-3d] [perspective:800px] will-change-transform"
		>
			{/* Corner accents */}
			<div
				ref={cornerTR}
				className="absolute top-0 right-0 w-6 h-6 border-t border-r border-blue/40 group-hover:border-[var(--accent-cyan)]/60 transition-colors duration-300"
			/>
			<div
				ref={cornerBL}
				className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-blue/40 group-hover:border-[var(--accent-cyan)]/60 transition-colors duration-300"
			/>

			<div className="flex items-start justify-between gap-4 mb-4">
				<span className={`font-mono text-xs ${status.color}`}>
					[{status.label}]
				</span>
				{project.year && (
					<span className="font-mono text-xs text-white/25">{project.year}</span>
				)}
			</div>

			<h3 className="text-xl font-bold text-white group-hover:text-[var(--accent-cyan)] transition-colors duration-300 mb-3">
				{project.title}
			</h3>

			<p className="text-sm text-white/50 leading-relaxed mb-6">
				{project.description}
			</p>

			<div className="flex flex-wrap gap-2">
				{project.tags.map((tag) => (
					<span
						key={tag}
						className="font-mono text-xs text-white/50 border border-white/15 group-hover:border-blue/30 px-2 py-1 transition-colors duration-300"
					>
						#{tag}
					</span>
				))}
			</div>
		</button>
	);
}
