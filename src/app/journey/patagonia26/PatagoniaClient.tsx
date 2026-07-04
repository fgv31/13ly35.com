"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PatagoniaRouteMap from "@/components/ui/PatagoniaRouteMap";
import {
	itineraries,
	getLocationColor,
	getLocationBadge,
	type Itinerary,
	type DayEntry,
} from "@/data/mock/patagonia";

gsap.registerPlugin(ScrollTrigger);

// ── Transport icon/label helpers ──
const transportStyles: Record<string, { icon: string; cls: string }> = {
	flight: { icon: "✈", cls: "bg-[var(--accent-cyan)]/10 border-[var(--accent-cyan)]/25 text-[var(--accent-cyan)]" },
	drive: { icon: "🚗", cls: "bg-white/5 border-white/10 text-white/60" },
	bus: { icon: "🚌", cls: "bg-sky-400/10 border-sky-400/20 text-sky-400" },
	boat: { icon: "⛵", cls: "bg-sky-300/10 border-sky-300/20 text-sky-300" },
	trek: { icon: "🥾", cls: "bg-amber-600/10 border-amber-600/20 text-amber-600" },
	local: { icon: "📍", cls: "bg-white/5 border-white/10 text-white/50" },
};

// ── Day Card ──
function DayCard({
	entry,
	itinerary,
	isActive,
	onClick,
	cardRef,
}: {
	entry: DayEntry;
	itinerary: Itinerary;
	isActive: boolean;
	onClick: () => void;
	cardRef: (el: HTMLDivElement | null) => void;
}) {
	const badge = getLocationBadge(itinerary, entry.location);
	const color = getLocationColor(itinerary, entry.location);

	return (
		<div
			ref={cardRef}
			onClick={onClick}
			className="day-reveal border border-white/5 hover:border-white/15 bg-white/[0.02] transition-all duration-300 cursor-pointer group"
			style={{ borderLeftColor: color, borderLeftWidth: 3 }}
		>
			{/* Header row */}
			<div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
				<span className="font-mono text-2xl font-bold text-white/10 leading-none min-w-[2.5rem]">
					{String(entry.day).padStart(2, "0")}
				</span>
				<span className="font-mono text-[10px] text-[var(--accent-cyan)]/80 tracking-wider">
					{entry.date}
				</span>
				<span
					className={`font-mono text-[10px] tracking-wider px-2 py-0.5 border ${badge}`}
				>
					{entry.location.toUpperCase()}
				</span>
				<span className="font-mono text-[9px] text-white/20 ml-auto">
					{entry.meals}
				</span>
			</div>

			{/* Body */}
			<div className="px-4 py-3">
				<h3 className="font-bold text-white/90 text-sm mb-2 group-hover:text-white transition-colors">
					{entry.title}
				</h3>
				<p className="text-white/50 text-xs leading-relaxed">
					{entry.description}
				</p>

				{/* Expanded detail */}
				{isActive && entry.detail && (
					<p className="text-white/40 text-xs leading-relaxed mt-3 pt-3 border-t border-white/5 italic">
						{entry.detail}
					</p>
				)}

				{/* Transport pills */}
				<div className="flex flex-wrap gap-1.5 mt-3">
					{entry.transport.map((t, i) => {
						const style = transportStyles[t.type] || transportStyles.local;
						return (
							<span
								key={i}
								className={`inline-flex items-center gap-1 font-mono text-[10px] tracking-wider px-2 py-0.5 border ${style.cls}`}
							>
								<span className="text-[9px]">{style.icon}</span>
								{t.label}
							</span>
						);
					})}
				</div>

				{/* Tip */}
				{entry.tip && isActive && (
					<p className="font-mono text-[10px] text-[var(--accent-cyan)]/60 mt-2 flex items-start gap-1.5">
						<span className="text-[8px] mt-px">★</span>
						{entry.tip}
					</p>
				)}
			</div>
		</div>
	);
}

// ── Main Component ──
export default function PatagoniaClient() {
	const [activeItinerary, setActiveItinerary] = useState(0);
	const [activeDay, setActiveDay] = useState<number | null>(null);
	const daysContainerRef = useRef<HTMLDivElement>(null);
	const dayCardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

	const itinerary = itineraries[activeItinerary];

	// Select/scroll to the day whose location matches a clicked map stop.
	const handleSelectStop = (name: string) => {
		const day = itinerary.days.find((d) => d.location === name);
		if (!day) return;
		setActiveDay((prev) => (prev === day.day ? null : day.day));
		dayCardRefs.current.get(day.day)?.scrollIntoView({ behavior: "smooth", block: "center" });
	};

	// GSAP ScrollTrigger reveal for day cards — re-created whenever the itinerary
	// (and therefore the rendered card list) changes, always killed on cleanup.
	useEffect(() => {
		const container = daysContainerRef.current;
		if (!container) return;
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const ctx = gsap.context(() => {
			const cards = gsap.utils.toArray<HTMLElement>(".day-reveal", container);
			cards.forEach((card) => {
				if (reducedMotion) {
					gsap.set(card, { opacity: 1, y: 0 });
					return;
				}
				gsap.fromTo(
					card,
					{ opacity: 0, y: 24 },
					{
						opacity: 1,
						y: 0,
						duration: 0.5,
						ease: "power2.out",
						scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
					}
				);
			});
		}, container);

		return () => ctx.revert();
	}, [itinerary]);

	return (
		<div className="min-h-screen bg-dark cyber-grid flex flex-col">
			<Header />

			<main className="flex-1 pt-24">
				{/* ── HERO ── */}
				<section className="relative px-6 pt-12 pb-8 overflow-hidden">
					{/* Mountain silhouette */}
					<svg
						className="absolute bottom-0 left-0 right-0 h-24 opacity-[0.06]"
						viewBox="0 0 1400 100"
						preserveAspectRatio="none"
						fill="white"
					>
						<polygon points="0,100 80,35 160,65 280,10 380,50 500,20 620,55 740,5 880,45 1020,25 1160,60 1300,15 1400,40 1400,100" />
					</svg>

					<div className="mx-auto max-w-7xl relative">
						<p className="font-mono text-[10px] tracking-[0.3em] text-[var(--accent-cyan)] mb-3 uppercase">
							✦ Itinerario Completo ✦
						</p>
						<h1 className="text-3xl md:text-5xl font-bold text-white leading-[1.05] mb-1">
							<span className="text-cyan">PATAGONIA</span>
							<br />
							<span className="text-white/80 italic">Argentina</span>
						</h1>
						<p className="font-mono text-xs text-white/40 mt-2 max-w-xl">
							<span className="text-cyan">&gt;</span> Ghiacciai, pinguini, Terra del Fuoco e la fine del mondo.
						</p>
					</div>
				</section>

				{/* ── ITINERARY TOGGLE ── */}
				<section className="px-6 py-4 border-y border-white/5">
					<div className="mx-auto max-w-7xl flex flex-col sm:flex-row gap-3">
						{itineraries.map((itin, i) => (
							<button
								key={itin.id}
								onClick={() => {
									setActiveItinerary(i);
									setActiveDay(null);
								}}
								className={`flex-1 text-left px-4 py-3 border font-mono text-xs transition-all duration-300 ${
									activeItinerary === i
										? "border-cyan/40 bg-cyan/5 text-cyan"
										: "border-white/10 bg-transparent text-white/40 hover:border-white/20 hover:text-white/60"
								}`}
							>
								<span className="block font-bold text-sm mb-0.5">{itin.title}</span>
								<span className="block text-[10px] tracking-wider text-white/30">
									{itin.dates}
								</span>
							</button>
						))}
					</div>
				</section>

				{/* ── STATS BAR ── */}
				<section className="px-6 py-4 border-b border-white/5 bg-white/[0.01]">
					<div className="mx-auto max-w-7xl flex items-center gap-8 overflow-x-auto">
						{itinerary.stats.map((s) => (
							<div key={s.label} className="flex flex-col gap-0.5 min-w-fit">
								<span className="font-bold text-xl text-[var(--accent-cyan)] leading-none">
									{s.value}
								</span>
								<span className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">
									{s.label}
								</span>
							</div>
						))}
					</div>
				</section>

				{/* ── ROUTE BAR ── */}
				<section className="px-6 py-3 border-b border-white/5 overflow-x-auto">
					<div className="mx-auto max-w-7xl flex items-center gap-0 min-w-fit">
						{itinerary.destinations.map((dest, i) => (
							<span key={dest.name} className="flex items-center">
								<span
									className="font-mono text-[10px] tracking-[0.12em] uppercase whitespace-nowrap"
									style={{ color: dest.color }}
								>
									{dest.name}
								</span>
								{i < itinerary.destinations.length - 1 && (
									<span className="text-white/20 mx-2 text-xs">→</span>
								)}
							</span>
						))}
					</div>
				</section>

				{/* ── MAP ── */}
				<section className="px-6 py-6">
					<div className="mx-auto max-w-7xl">
						<p className="font-mono text-[10px] tracking-[0.3em] text-cyan/50 uppercase mb-3">
							{'// Mappa del Percorso'}
						</p>
						<div className="w-full border border-white/10 bg-dark p-4">
							<PatagoniaRouteMap itinerary={itinerary} activeDay={activeDay} onSelectStop={handleSelectStop} />
						</div>
					</div>
				</section>

				{/* ── DAY-BY-DAY ── */}
				<section className="px-6 py-8">
					<div className="mx-auto max-w-7xl">
						<div className="flex items-center gap-4 mb-6">
							<p className="font-mono text-[10px] tracking-[0.3em] text-cyan/50 uppercase">
								{'// Programma Giorno per Giorno'}
							</p>
							<div className="flex-1 h-px bg-white/5" />
						</div>

						<div ref={daysContainerRef} className="flex flex-col gap-3">
							{itinerary.days.map((day) => (
								<DayCard
									key={`${itinerary.id}-${day.day}`}
									entry={day}
									itinerary={itinerary}
									isActive={activeDay === day.day}
									onClick={() => setActiveDay(activeDay === day.day ? null : day.day)}
									cardRef={(el) => {
										if (el) dayCardRefs.current.set(day.day, el);
										else dayCardRefs.current.delete(day.day);
									}}
								/>
							))}
						</div>
					</div>
				</section>

			</main>

			<Footer />
		</div>
	);
}
