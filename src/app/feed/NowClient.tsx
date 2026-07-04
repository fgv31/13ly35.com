"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Points as ThreePoints } from "three";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CyberLoader from "@/components/ui/CyberLoader";
import SceneCanvas from "@/components/gl/SceneCanvas";
import { useQualityTier } from "@/lib/quality";

let textPluginRegistered = false;
function ensureTextPlugin() {
	if (textPluginRegistered || typeof window === "undefined") return;
	gsap.registerPlugin(TextPlugin);
	textPluginRegistered = true;
}

const PARTICLE_COUNT = 200;

const TERMINAL_LINES = [
	"$ feed --sync --source obsidian",
	"Establishing secure connection...",
	"× Pipeline interrupted — module under development",
	"Retry scheduled",
];

// Deterministic pseudo-random hash (pure — safe to call during render).
function hash(seed: number) {
	const x = Math.sin(seed * 127.1) * 43758.5453123;
	return x - Math.floor(x);
}

function DriftParticles() {
	const ref = useRef<ThreePoints>(null);

	const positions = useMemo(() => {
		const arr = new Float32Array(PARTICLE_COUNT * 3);
		for (let i = 0; i < PARTICLE_COUNT; i++) {
			arr[i * 3] = (hash(i * 3 + 1) - 0.5) * 4.5;
			arr[i * 3 + 1] = (hash(i * 3 + 2) - 0.5) * 3;
			arr[i * 3 + 2] = (hash(i * 3 + 3) - 0.5) * 2;
		}
		return arr;
	}, []);

	useFrame((_, delta) => {
		if (!ref.current) return;
		ref.current.rotation.y += delta * 0.04;
		ref.current.rotation.x += delta * 0.012;
	});

	return (
		<Points ref={ref} positions={positions} stride={3}>
			<PointMaterial
				transparent
				color="#2E6BFF"
				size={0.03}
				sizeAttenuation
				depthWrite={false}
				opacity={0.5}
			/>
		</Points>
	);
}

export default function NowClient() {
	const [showTerminal, setShowTerminal] = useState(false);
	const tier = useQualityTier();

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
						{tier === "high" && (
							<SceneCanvas
								className="absolute -inset-10 -z-10 pointer-events-none"
								camera={{ position: [0, 0, 3], fov: 50 }}
							>
								<ambientLight intensity={0.6} />
								<DriftParticles />
							</SceneCanvas>
						)}

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
	);
}
