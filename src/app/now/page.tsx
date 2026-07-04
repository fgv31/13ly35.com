"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NowPage() {
	const router = useRouter();

	useEffect(() => {
		router.replace("/feed");
	}, [router]);

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
			<p style={{ fontFamily: "monospace", textTransform: "uppercase" }}>
				REDIRECTING → /feed
			</p>
			<Link href="/feed">Click here if not redirected</Link>
		</div>
	);
}
