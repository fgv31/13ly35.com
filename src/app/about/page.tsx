import { Metadata } from "next";
import Timeline from "@/components/ui/Timeline";
import { cvData } from "@/data/mock/cv";

export const metadata: Metadata = {
  title: "About | 13ly35",
  description: "Professional timeline and background",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-beige">
      {/* Header */}
      <header className="border-b-2 border-black bg-beige">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="font-pixel text-2xl md:text-3xl text-black mb-2">
            About
          </h1>
          <p className="font-sans text-black/70 text-sm md:text-base max-w-xl">
            A timeline of experiences, milestones, and the journey so far.
          </p>
        </div>
      </header>

      {/* Timeline */}
      <main className="py-12">
        <Timeline entries={cvData} />
      </main>

      {/* Footer navigation */}
      <footer className="border-t-2 border-black bg-beige">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <a
            href="/"
            className="inline-block font-pixel text-xs text-black hover:text-red transition-colors border-2 border-black px-4 py-2 hover:shadow-[2px_2px_0_0_#FF1A00] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all"
          >
            &larr; Home
          </a>
        </div>
      </footer>
    </div>
  );
}
