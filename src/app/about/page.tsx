import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Timeline from "@/components/ui/Timeline";
import { cvData } from "@/data/mock/cv";

export const metadata: Metadata = {
  title: "About | 13ly35",
  description: "Professional timeline and background",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-6">
          {/* Header */}
          <header className="mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-beige/40 mb-4">01 / About</p>
            <h1 className="text-4xl md:text-6xl font-light text-beige mb-6">
              The Journey
            </h1>
            <p className="text-lg text-beige/60 max-w-2xl leading-relaxed">
              A timeline of experiences, milestones, and the moments that shaped the path.
            </p>
          </header>

          {/* Timeline */}
          <Timeline entries={cvData} />

          {/* Back link */}
          <div className="mt-20">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-beige/50 hover:text-beige transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
