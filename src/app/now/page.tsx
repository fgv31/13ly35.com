"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NowPage() {
  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24 flex items-center justify-center">
        <div className="mx-auto max-w-2xl px-6 text-center">
          {/* Header */}
          <header className="mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-beige/40 mb-4">05 / Now</p>
            <h1 className="text-4xl md:text-6xl font-light text-beige mb-6">
              In Progress
            </h1>
          </header>

          {/* Status indicator */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red"></span>
              </span>
              <span className="text-sm uppercase tracking-[0.15em] text-beige/60">Building</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-beige/60 leading-relaxed mb-12 max-w-md mx-auto">
            Weekly moodboard — my routine, mood, and thoughts on the world.
            Updated from my personal knowledge base.
          </p>

          {/* Minimal divider */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-12 h-px bg-beige/10"></div>
            <div className="w-2 h-2 bg-red rounded-full"></div>
            <div className="w-12 h-px bg-beige/10"></div>
          </div>

          {/* Coming soon note */}
          <p className="text-sm text-beige/40">
            Connecting to Obsidian...
          </p>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}
