"use client"

import React, { useEffect, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { useQualityTier } from "@/lib/quality"

export default function SceneCanvas(props: {
	children: React.ReactNode
	className?: string
	camera?: object
}): React.JSX.Element | null {
	const { children, className, camera } = props
	const tier = useQualityTier()
	const wrapperRef = useRef<HTMLDivElement>(null)
	const [active, setActive] = useState(true)

	useEffect(() => {
		const el = wrapperRef.current
		if (!el) return

		let isIntersecting = true

		const updateActive = () => {
			setActive(isIntersecting && !document.hidden)
		}

		const observer = new IntersectionObserver((entries) => {
			isIntersecting = entries[0]?.isIntersecting ?? true
			updateActive()
		})
		observer.observe(el)

		document.addEventListener("visibilitychange", updateActive)

		return () => {
			observer.disconnect()
			document.removeEventListener("visibilitychange", updateActive)
		}
	}, [])

	if (tier === "off") return null

	return (
		<div ref={wrapperRef} aria-hidden="true" className={className}>
			<Canvas
				dpr={[1, tier === "high" ? 2 : 1.5]}
				frameloop={active ? "always" : "never"}
				gl={{ alpha: true }}
				camera={camera}
			>
				{children}
			</Canvas>
		</div>
	)
}
