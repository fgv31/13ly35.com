"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProjectsPage() {
	const router = useRouter();

	useEffect(() => {
		router.replace("/paths");
	}, [router]);

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
			<p style={{ fontFamily: "monospace", textTransform: "uppercase" }}>
				REDIRECTING → /paths
			</p>
			<Link href="/paths">Click here if not redirected</Link>
		</div>
	);
}
