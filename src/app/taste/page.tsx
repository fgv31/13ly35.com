"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TastePage() {
	const router = useRouter();

	useEffect(() => {
		router.replace("/picks");
	}, [router]);

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
			<p style={{ fontFamily: "monospace", textTransform: "uppercase" }}>
				REDIRECTING → /picks
			</p>
			<Link href="/picks">Click here if not redirected</Link>
		</div>
	);
}
