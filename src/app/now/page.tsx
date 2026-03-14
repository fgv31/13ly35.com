"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CyberLoader from "@/components/ui/CyberLoader";

export default function NowPage() {
  return (
    <div className="min-h-screen bg-dark cyber-grid flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <header className="mb-16">
            <div className="mb-4">
              <p className="font-mono text-xs text-magenta">[04] // FEED_MODULE</p>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
              LIVE <span className="text-cyan">FEED</span>
            </h1>
            <p className="text-lg text-white/50 max-w-2xl leading-relaxed font-mono">
              <span className="text-cyan">&gt;</span> Weekly moodboard — my routine, mood, and thoughts on the world.
            </p>
          </header>

          {/* Loader + terminal */}
          <div className="max-w-xl">
            <CyberLoader label="NOW_MODULE_SYNC" />

            <div className="border border-cyan/20 bg-dark/80 p-6 font-mono text-sm mt-8">
              <p className="text-cyan/60">$ now --sync --source obsidian</p>
              <p className="text-white/40 mt-2">Establishing secure connection...</p>
              <p className="text-magenta mt-1">× Pipeline interrupted — module under development</p>
              <p className="text-white/20 mt-2 cursor-blink">Retry scheduled</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
