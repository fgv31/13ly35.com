"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NowPage() {
  return (
    <div className="min-h-screen bg-dark cyber-grid flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24 flex items-center justify-center">
        <div className="mx-auto max-w-2xl px-6 text-center">
          {/* Header */}
          <header className="mb-16">
            <p className="font-mono text-xs text-magenta mb-4">[05] // NOW_MODULE</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="text-cyan">LOADING</span>...
            </h1>
          </header>

          {/* Status indicator */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 border border-cyan/30 px-6 py-3 bg-muted/50">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan"></span>
              </span>
              <span className="font-mono text-sm text-cyan">SYSTEM_BUILDING</span>
            </div>
          </div>

          {/* Description */}
          <p className="font-mono text-white/50 leading-relaxed mb-12 max-w-md mx-auto">
            <span className="text-magenta">&gt;</span> Weekly moodboard — my routine, mood, and thoughts on the world.
            <br />
            <span className="text-magenta">&gt;</span> Updated from personal knowledge base.
          </p>

          {/* Terminal output */}
          <div className="border border-cyan/20 bg-dark/80 p-6 text-left font-mono text-sm">
            <p className="text-cyan/60">$ connecting --to obsidian</p>
            <p className="text-white/40 mt-2">Establishing secure connection...</p>
            <p className="text-yellow mt-1">⚠ Module under development</p>
            <p className="text-white/40 mt-2 cursor-blink">Waiting for data sync</p>
          </div>
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
