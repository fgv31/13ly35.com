"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { projects, type ProjectStatus } from "@/data/mock/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectDetail from "@/components/ui/ProjectDetail";

const HeroScene = dynamic(() => import("@/components/gl/HeroScene"), { ssr: false });

type FilterOption = "all" | ProjectStatus;

export default function ProjectsClient() {
	const [filter, setFilter] = useState<FilterOption>("all");
	const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
	const detailRef = useRef<HTMLDivElement>(null);
	const gridRef = useRef<HTMLDivElement>(null);
	const gsapCtx = useRef<gsap.Context | null>(null);

	const filteredProjects =
		filter === "all"
			? projects
			: projects.filter((project) => project.status === filter);

	const activeProject = activeProjectId
		? projects.find((p) => p.id === activeProjectId) ?? null
		: null;

	// Scroll the detail into view when it opens
	useEffect(() => {
		if (activeProjectId && detailRef.current) {
			// Small delay to let the DOM render the detail
			const timer = setTimeout(() => {
				detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
			}, 50);
			return () => clearTimeout(timer);
		}
	}, [activeProjectId]);

	// ScrollTrigger reveal — animates each grid item in once as it scrolls into view.
	// Already-revealed items (flagged via data-revealed) are skipped so switching
	// filters never re-hides cards that are already visible.
	useEffect(() => {
		if (typeof window === "undefined" || !gridRef.current) return;

		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (!gsapCtx.current) {
			gsap.registerPlugin(ScrollTrigger);
			gsapCtx.current = gsap.context(() => {}, gridRef);
		}

		const cards = gsap.utils.toArray<HTMLElement>(".path-reveal", gridRef.current);

		cards.forEach((card) => {
			if (card.dataset.revealed) return;
			card.dataset.revealed = "true";

			if (reducedMotion) {
				gsap.set(card, { opacity: 1, y: 0 });
				return;
			}

			gsapCtx.current?.add(() => {
				gsap.fromTo(
					card,
					{ opacity: 0, y: 24 },
					{
						opacity: 1,
						y: 0,
						duration: 0.5,
						ease: "power2.out",
						scrollTrigger: {
							trigger: card,
							start: "top 90%",
							toggleActions: "play none none none",
						},
					}
				);
			});
		});
	}, [filteredProjects.length, filter]);

	// Kill all tweens/ScrollTriggers on unmount
	useEffect(() => {
		return () => {
			gsapCtx.current?.revert();
			gsapCtx.current = null;
		};
	}, []);

	const filterOptions: Array<{ value: FilterOption; label: string }> = [
		{ value: "all", label: "ALL" },
		{ value: "built", label: "DEPLOYED" },
		{ value: "ongoing", label: "IN_DEV" },
		{ value: "idea", label: "CONCEPT" },
		{ value: "deleted", label: "INTERRUPTED" },
	];

	const handleCardClick = (projectId: string) => {
		if (activeProjectId === projectId) {
			setActiveProjectId(null);
		} else {
			setActiveProjectId(projectId);
		}
	};

	return (
		<div className="min-h-screen bg-dark cyber-grid flex flex-col">
			{/* Fixed particle background — same gravity-well field as the homepage */}
			<div className="fixed inset-0 z-0" aria-hidden="true">
				<HeroScene />
			</div>

			<div className="relative z-10 flex flex-col flex-1">
			<Header />

			<main className="flex-1 pt-32 pb-24">
				<div className="mx-auto max-w-7xl px-6">
					{/* Header */}
					<header className="mb-16">
						<div className="mb-4">
							<p className="font-mono text-xs text-violet">[03] // PATHS_MODULE</p>
						</div>
						<h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
							<span className="text-blue glow-blue">ALL</span> PATHS
						</h1>
						<p className="text-lg text-white/50 max-w-2xl leading-relaxed font-mono">
							<span className="text-[var(--accent-cyan)]">&gt;</span> Ideas brought to life, works in progress, and concepts waiting to be built.
						</p>
					</header>

					{/* Filter Buttons */}
					<div className="flex flex-wrap gap-2 mb-12">
						{filterOptions.map((option) => (
							<button
								key={option.value}
								onClick={() => {
									setFilter(option.value);
									setActiveProjectId(null);
								}}
								className={`font-mono text-xs px-4 py-2 border transition-all duration-300 ${
									filter === option.value
										? "border-blue text-blue bg-blue/10 glow-blue"
										: "bg-transparent text-white/60 border-white/10 hover:border-[var(--accent-cyan)]/50 hover:text-[var(--accent-cyan)]"
								}`}
							>
								{option.label}
							</button>
						))}
					</div>

					{/* Projects Grid — detail expands inline */}
					<div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{filteredProjects.map((project) => {
							const isActive = activeProjectId === project.id;

							return (
								<div
									key={project.id}
									className={`path-reveal ${isActive ? "md:col-span-2" : ""}`}
									style={{ opacity: 0 }}
								>
									{isActive && activeProject ? (
										<div ref={detailRef}>
											<ProjectDetail
												project={activeProject}
												onClose={() => setActiveProjectId(null)}
											/>
										</div>
									) : (
										<ProjectCard
											project={project}
											onClick={() => handleCardClick(project.id)}
										/>
									)}
								</div>
							);
						})}
					</div>

					{/* Empty State */}
					{filteredProjects.length === 0 && (
						<div className="text-center py-20 border border-blue/10">
							<p className="font-mono text-white/40">NO_PROJECTS_FOUND</p>
						</div>
					)}
				</div>
			</main>

			<Footer />
			</div>
		</div>
	);
}
