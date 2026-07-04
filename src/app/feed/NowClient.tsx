"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CyberLoader from "@/components/ui/CyberLoader";

const HeroScene = dynamic(() => import("@/components/gl/HeroScene"), { ssr: false });

let textPluginRegistered = false;
function ensureTextPlugin() {
	if (textPluginRegistered || typeof window === "undefined") return;
	gsap.registerPlugin(TextPlugin);
	textPluginRegistered = true;
}

const TERMINAL_LINES = [
	"$ feed --sync --source obsidian",
	"Establishing secure connection...",
	"× Pipeline interrupted — module under development",
	"Retry scheduled",
];

export default function NowClient() {
	const [showTerminal, setShowTerminal] = useState(false);

	const line1Ref = useRef<HTMLParagraphElement>(null);
	const line2Ref = useRef<HTMLParagraphElement>(null);
	const line3Ref = useRef<HTMLParagraphElement>(null);
	const line4Ref = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		if (!showTerminal) return;
		ensureTextPlugin();

		const targets = [line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current];
		const tl = gsap.timeline();

		targets.forEach((el, i) => {
			if (!el) return;
			tl.to(
				el,
				{
					duration: Math.max(0.3, TERMINAL_LINES[i].length * 0.02),
					text: { value: TERMINAL_LINES[i] },
					ease: "none",
				},
				">0.15"
			);
		});

		return () => {
			tl.kill();
		};
	}, [showTerminal]);

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
							<p className="font-mono text-xs text-magenta">[04] // FEED_MODULE</p>
						</div>
						<h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
							LIVE <span className="text-cyan">FEED</span>
						</h1>
						<p className="text-lg text-white/50 max-w-2xl leading-relaxed font-mono">
							<span className="text-cyan">&gt;</span> Weekly moodboard — my routine, mood, and thoughts on the world.
						</p>
					</header>

					{/* Loader + terminal */}
					<div className="max-w-xl relative">
						<div className="relative border border-blue/30 bg-dark/90 box-glow-blue">
							{/* Terminal title bar */}
							<div className="flex items-center gap-2 border-b border-blue/20 bg-blue/5 px-4 py-2">
								<span className="h-2 w-2 rounded-full bg-white/10" />
								<span className="h-2 w-2 rounded-full bg-white/10" />
								<span className="h-2 w-2 rounded-full bg-white/10" />
								<span className="ml-2 font-mono text-[10px] text-blue/70 tracking-widest">
									FEED_MODULE_SYNC
								</span>
							</div>

							<div className="p-6">
								<CyberLoader label="FEED_MODULE_SYNC" onInterrupted={() => setShowTerminal(true)} />

								<div
									className="font-mono text-sm mt-8 transition-opacity duration-500"
									style={{ opacity: showTerminal ? 1 : 0 }}
								>
									<p ref={line1Ref} className="text-blue/70" />
									<p ref={line2Ref} className="text-white/40 mt-2" />
									<p ref={line3Ref} className="text-violet mt-1" />
									<p ref={line4Ref} className="text-white/20 mt-2 cursor-blink" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			<Footer />
			</div>
		</div>
	);
}
