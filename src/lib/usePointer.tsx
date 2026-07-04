"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import type { MutableRefObject, ReactNode } from "react";
import { useQualityTier } from "./quality";

export interface PointerState {
	x: number;
	y: number;
	nx: number;
	ny: number;
	lx: number;
	ly: number;
	lnx: number;
	lny: number;
}

const LERP_FACTOR = 0.08;

function createZeroState(): PointerState {
	return { x: 0, y: 0, nx: 0, ny: 0, lx: 0, ly: 0, lnx: 0, lny: 0 };
}

const PointerContext = createContext<MutableRefObject<PointerState> | null>(null);

export function PointerProvider({ children }: { children: ReactNode }) {
	const ref = useRef<PointerState>(createZeroState());
	const tier = useQualityTier();

	useEffect(() => {
		if (tier === "off") return;
		if (window.matchMedia("(pointer: coarse)").matches) return;

		const target = { x: 0, y: 0, nx: 0, ny: 0 };

		const handlePointerMove = (event: PointerEvent) => {
			target.x = event.clientX;
			target.y = event.clientY;
			target.nx = (event.clientX / window.innerWidth) * 2 - 1;
			target.ny = (event.clientY / window.innerHeight) * 2 - 1;
		};

		window.addEventListener("pointermove", handlePointerMove);

		const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

		let rafId = requestAnimationFrame(function tick() {
			const state = ref.current;
			state.x = target.x;
			state.y = target.y;
			state.nx = target.nx;
			state.ny = target.ny;
			state.lx = lerp(state.lx, target.x, LERP_FACTOR);
			state.ly = lerp(state.ly, target.y, LERP_FACTOR);
			state.lnx = lerp(state.lnx, target.nx, LERP_FACTOR);
			state.lny = lerp(state.lny, target.ny, LERP_FACTOR);
			rafId = requestAnimationFrame(tick);
		});

		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			cancelAnimationFrame(rafId);
		};
	}, [tier]);

	return <PointerContext.Provider value={ref}>{children}</PointerContext.Provider>;
}

export function usePointerState(): MutableRefObject<PointerState> {
	const ctx = useContext(PointerContext);
	if (!ctx) throw new Error("usePointerState must be used within a PointerProvider");
	return ctx;
}
