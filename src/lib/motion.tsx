"use client"

import React, { Fragment, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useQualityTier } from "@/lib/quality"

let registered = false

function ensureScrollTriggerRegistered() {
	if (registered || typeof window === "undefined") return
	gsap.registerPlugin(ScrollTrigger)
	registered = true
}

// register at module evaluation, not in an effect: child (page) effects run before
// GsapProvider's effect, so effect-time registration loses the race on hard loads
ensureScrollTriggerRegistered()

export function GsapProvider(props: { children: React.ReactNode }) {
	useEffect(() => {
		ensureScrollTriggerRegistered()
	}, [])

	return <Fragment>{props.children}</Fragment>
}

export function useMagnetic<T extends HTMLElement>(strength = 12): React.RefObject<T> {
	const ref = useRef<T>(null)
	const tier = useQualityTier()

	useEffect(() => {
		const el = ref.current
		if (!el) return
		if (tier !== "high") return
		if (typeof window === "undefined") return
		if (!window.matchMedia("(pointer: fine)").matches) return
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

		const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" })
		const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" })

		function handleMouseMove(event: MouseEvent) {
			const rect = el!.getBoundingClientRect()
			const relX = event.clientX - rect.left - rect.width / 2
			const relY = event.clientY - rect.top - rect.height / 2
			xTo((relX / (rect.width / 2)) * strength)
			yTo((relY / (rect.height / 2)) * strength)
		}

		function handleMouseLeave() {
			gsap.to(el!, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" })
		}

		el.addEventListener("mouseenter", handleMouseMove)
		el.addEventListener("mousemove", handleMouseMove)
		el.addEventListener("mouseleave", handleMouseLeave)

		return () => {
			el.removeEventListener("mouseenter", handleMouseMove)
			el.removeEventListener("mousemove", handleMouseMove)
			el.removeEventListener("mouseleave", handleMouseLeave)
			gsap.killTweensOf(el)
		}
	}, [tier, strength])

	return ref as React.RefObject<T>
}
