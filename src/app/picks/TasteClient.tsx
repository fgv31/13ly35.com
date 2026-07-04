"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useFrame } from "@react-three/fiber";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RecommendationCard from "@/components/ui/RecommendationCard";
import SceneCanvas from "@/components/gl/SceneCanvas";
import { useQualityTier } from "@/lib/quality";
import { recommendations, type Category } from "@/data/mock/recommendations";

if (typeof window !== "undefined") {
	gsap.registerPlugin(Flip);
}

const CATEGORIES: Array<{ value: Category | "all"; label: string }> = [
	{ value: "all", label: "ALL" },
	{ value: "movies", label: "MOVIES" },
	{ value: "music", label: "MUSIC" },
	{ value: "objects", label: "OBJECTS" },
	{ value: "people", label: "PEOPLE" },
	{ value: "food", label: "FOOD" },
];

// Low-density ambient particle drift behind the grid — high tier only.
function AmbientParticles() {
	const pointsRef = useRef<THREE.Points>(null);

	const geometry = useMemo(() => {
		// Deterministic pseudo-random scatter (avoids impure Math.random() during render).
		const count = 40;
		const positions = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			positions[i * 3 + 0] = Math.sin(i * 12.9898) * 6;
			positions[i * 3 + 1] = Math.cos(i * 78.233) * 6;
			positions[i * 3 + 2] = Math.sin(i * 37.719) * 2;
		}
		const g = new THREE.BufferGeometry();
		g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
		return g;
	}, []);

	const material = useMemo(
		() =>
			new THREE.PointsMaterial({
				color: "#2E6BFF",
				size: 0.04,
				transparent: true,
				opacity: 0.45,
				sizeAttenuation: true,
				depthWrite: false,
			}),
		[],
	);

	useEffect(() => {
		return () => {
			geometry.dispose();
			material.dispose();
		};
	}, [geometry, material]);

	useFrame((state) => {
		if (pointsRef.current) pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
	});

	return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />;
}

export default function TasteClient() {
	const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
	const [exactRating, setExactRating] = useState<number>(0);
	const [expandedId, setExpandedId] = useState<string | null>(null);

	const tier = useQualityTier();
	const gridRef = useRef<HTMLDivElement>(null);
	const flipStateRef = useRef<Flip.FlipState | null>(null);
	const flipTweenRef = useRef<gsap.core.Timeline | null>(null);

	const filteredRecommendations = recommendations.filter((rec) => {
		if (selectedCategory !== "all" && rec.category !== selectedCategory) return false;
		if (exactRating > 0 && rec.rating < exactRating) return false;
		return true;
	});

	// Stable key so the entrance effect only re-runs when the actual filtered set changes.
	const filterKey = filteredRecommendations.map((rec) => rec.id).join(",");

	// Staggered scroll-triggered entrance for the grid.
	useEffect(() => {
		const grid = gridRef.current;
		if (!grid) return;
		const cards = Array.from(grid.children);
		if (cards.length === 0) return;

		gsap.set(cards, { opacity: 0, y: 24 });
		const triggers = ScrollTrigger.batch(cards, {
			start: "top 90%",
			onEnter: (batch) => {
				gsap.to(batch, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out" });
			},
		});

		return () => {
			triggers.forEach((trigger) => trigger.kill());
			gsap.killTweensOf(cards);
		};
	}, [filterKey]);

	// Flip the grid layout when a card expands/collapses.
	useLayoutEffect(() => {
		if (!flipStateRef.current) return;
		flipTweenRef.current = Flip.from(flipStateRef.current, {
			duration: 0.5,
			ease: "power2.inOut",
			absolute: true,
			nested: true,
		});
		flipStateRef.current = null;
	}, [expandedId]);

	// Kill any in-flight Flip tween on unmount.
	useEffect(() => {
		return () => {
			flipTweenRef.current?.kill();
		};
	}, []);

	function handleCardClick(id: string) {
		if (gridRef.current) {
			flipStateRef.current = Flip.getState(gridRef.current.children);
		}
		setExpandedId((prev) => (prev === id ? null : id));
	}

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
							MY <span className="text-blue">PICKS</span>
						</h1>
						<p className="text-lg text-white/50 max-w-2xl leading-relaxed font-mono">
							<span className="text-blue">&gt;</span> Things that resonate. Movies, music, objects, and places worth experiencing.
						</p>
					</header>

					{/* Filters */}
					<div className="mb-12 flex flex-wrap items-center gap-6">
						{/* Category */}
						<div className="flex flex-wrap gap-2">
							{CATEGORIES.map((category) => (
								<button
									key={category.value}
									onClick={() => setSelectedCategory(category.value)}
									className={`font-mono text-xs px-4 py-2 border transition-all duration-300 ${
										selectedCategory === category.value
											? "bg-blue text-dark border-blue box-glow-blue"
											: "bg-transparent text-white/50 border-blue/20 hover:border-[var(--accent-cyan)]/50 hover:text-[var(--accent-cyan)]"
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
												? "bg-blue shadow-[0_0_6px_var(--accent-blue)]"
												: "bg-white/10 hover:bg-white/20"
										}`}
										style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
									/>
								</button>
							))}
							{exactRating > 0 && (
								<button
									onClick={() => setExactRating(0)}
									className="font-mono text-[10px] text-white/30 hover:text-[var(--accent-cyan)] transition-colors ml-1"
								>
									CLEAR
								</button>
							)}
						</div>
					</div>

					{/* Recommendations Grid */}
					<div className="relative">
						{tier === "high" && (
							<SceneCanvas
								className="absolute inset-0 -z-10 pointer-events-none"
								camera={{ position: [0, 0, 6], fov: 50 }}
							>
								<AmbientParticles />
							</SceneCanvas>
						)}

						<div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{filteredRecommendations.map((recommendation) => (
								<div
									key={recommendation.id}
									className={
										expandedId === recommendation.id
											? "md:col-span-2 lg:col-span-2 md:row-span-2"
											: ""
									}
								>
									<RecommendationCard
										recommendation={recommendation}
										isExpanded={expandedId === recommendation.id}
										onClick={() => handleCardClick(recommendation.id)}
									/>
								</div>
							))}
						</div>
					</div>

					{/* Empty State */}
					{filteredRecommendations.length === 0 && (
						<div className="text-center py-20 border border-blue/10">
							<p className="font-mono text-white/40">NO_DATA_FOUND</p>
						</div>
					)}
				</div>
			</main>

			<Footer />
		</div>
	);
}
