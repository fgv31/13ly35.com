import { useSyncExternalStore } from "react";

export type QualityTier = "high" | "low" | "off";

export function detectQualityTier(): QualityTier {
	if (typeof window === "undefined") return "off";
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "off";

	const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
	const lowCores = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
	const narrowViewport = window.innerWidth < 768;

	if (coarsePointer || lowCores || narrowViewport) return "low";
	return "high";
}

const subscribe = (): (() => void) => () => {};
const getServerSnapshot = (): QualityTier => "off";

export function useQualityTier(): QualityTier {
	return useSyncExternalStore(subscribe, detectQualityTier, getServerSnapshot);
}
