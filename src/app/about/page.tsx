"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AboutPage() {
	const router = useRouter();

	useEffect(() => {
		router.replace("/journey");
	}, [router]);

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
			<p style={{ fontFamily: "monospace", textTransform: "uppercase" }}>
				REDIRECTING → /journey
			</p>
			<Link href="/journey">Click here if not redirected</Link>
		</div>
	);
}
