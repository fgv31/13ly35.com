"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NowPage() {
  return (
    <div className="min-h-screen bg-dark cyber-grid flex flex-col">
      <Header />

      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <header className="mb-16">
            <div className="flex items-start justify-between mb-4">
              <p className="font-mono text-xs text-magenta">[04] // NOW_MODULE</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-mono text-xs text-cyan/50 hover:text-cyan transition-colors duration-300"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                EXIT()
              </Link>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
              <span className="text-cyan">LOADING</span>...
            </h1>
            <p className="text-lg text-white/50 max-w-2xl leading-relaxed font-mono">
              <span className="text-cyan">&gt;</span> Weekly moodboard — my routine, mood, and thoughts on the world.
            </p>
          </header>

          {/* WIP content — centered */}
          <div className="max-w-2xl mx-auto text-center">
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

            {/* Terminal output */}
            <div className="border border-cyan/20 bg-dark/80 p-6 text-left font-mono text-sm">
              <p className="text-cyan/60">$ connecting --to obsidian</p>
              <p className="text-white/40 mt-2">Establishing secure connection...</p>
              <p className="text-yellow mt-1">⚠ Module under development</p>
              <p className="text-white/40 mt-2 cursor-blink">Waiting for data sync</p>
            </div>
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
