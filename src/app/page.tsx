"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const navigationCards = [
  {
    title: "JOURNEY",
    href: "/about",
    description: "From Verona to Berlin — the places and what happened there",
    number: "01",
    icon: "journey",
  },
  {
    title: "TASTE",
    href: "/taste",
    description: "Curated recommendations across media and objects",
    number: "02",
    icon: "taste",
  },
  {
    title: "PROJECTS",
    href: "/projects",
    description: "Ideas built, building, and imagined",
    number: "03",
    icon: "projects",
  },
  {
    title: "NOW",
    href: "/now",
    description: "Current focus and weekly reflections",
    number: "04",
    icon: "now",
  },
];

function CyberIcon({ type }: { type: string }) {
  switch (type) {
    case "journey":
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-12 sm:h-12 cyber-icon">
          {/* Globe with orbit ring */}
          <circle cx="24" cy="24" r="10" fill="none" stroke="var(--accent-cyan)" strokeWidth="1" opacity="0.6" />
          <ellipse cx="24" cy="24" rx="16" ry="6" fill="none" stroke="var(--accent-cyan)" strokeWidth="0.8" opacity="0.4" className="orbit-ring" />
          <circle cx="24" cy="24" r="2" fill="var(--accent-cyan)" opacity="0.8" />
          {/* Blinking dot on orbit */}
          <circle cx="8" cy="24" r="1.5" fill="var(--accent-cyan)" className="orbit-dot" />
          {/* Lat lines */}
          <line x1="14" y1="24" x2="34" y2="24" stroke="var(--accent-cyan)" strokeWidth="0.5" opacity="0.3" />
          <line x1="24" y1="14" x2="24" y2="34" stroke="var(--accent-cyan)" strokeWidth="0.5" opacity="0.3" />
        </svg>
      );
    case "taste":
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-12 sm:h-12 cyber-icon">
          {/* Equalizer bars */}
          <rect x="8" y="28" width="4" height="12" fill="var(--accent-magenta)" opacity="0.7" className="eq-bar-1" />
          <rect x="15" y="18" width="4" height="22" fill="var(--accent-cyan)" opacity="0.7" className="eq-bar-2" />
          <rect x="22" y="12" width="4" height="28" fill="var(--accent-magenta)" opacity="0.7" className="eq-bar-3" />
          <rect x="29" y="22" width="4" height="18" fill="var(--accent-cyan)" opacity="0.7" className="eq-bar-4" />
          <rect x="36" y="16" width="4" height="24" fill="var(--accent-magenta)" opacity="0.7" className="eq-bar-5" />
          {/* Scan line */}
          <line x1="6" y1="8" x2="42" y2="8" stroke="var(--accent-cyan)" strokeWidth="0.5" opacity="0.3" />
          <line x1="6" y1="42" x2="42" y2="42" stroke="var(--accent-cyan)" strokeWidth="0.5" opacity="0.3" />
        </svg>
      );
    case "projects":
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-12 sm:h-12 cyber-icon">
          {/* Terminal window */}
          <rect x="8" y="10" width="32" height="28" rx="2" fill="none" stroke="var(--accent-cyan)" strokeWidth="1" opacity="0.5" />
          <line x1="8" y1="16" x2="40" y2="16" stroke="var(--accent-cyan)" strokeWidth="0.8" opacity="0.3" />
          {/* Window dots */}
          <circle cx="12" cy="13" r="1" fill="var(--accent-magenta)" opacity="0.7" />
          <circle cx="16" cy="13" r="1" fill="var(--accent-yellow)" opacity="0.7" />
          <circle cx="20" cy="13" r="1" fill="var(--accent-cyan)" opacity="0.7" />
          {/* Code lines */}
          <line x1="12" y1="22" x2="24" y2="22" stroke="var(--accent-cyan)" strokeWidth="1.5" opacity="0.6" className="code-line-1" />
          <line x1="12" y1="27" x2="30" y2="27" stroke="var(--accent-magenta)" strokeWidth="1.5" opacity="0.4" className="code-line-2" />
          <line x1="12" y1="32" x2="20" y2="32" stroke="var(--accent-cyan)" strokeWidth="1.5" opacity="0.6" className="code-line-3" />
          {/* Cursor blink */}
          <rect x="22" y="30" width="2" height="5" fill="var(--accent-cyan)" className="terminal-cursor" />
        </svg>
      );
    case "now":
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-12 sm:h-12 cyber-icon">
          {/* Signal pulse */}
          <circle cx="24" cy="24" r="4" fill="var(--accent-cyan)" opacity="0.8" className="pulse-core" />
          <circle cx="24" cy="24" r="10" fill="none" stroke="var(--accent-cyan)" strokeWidth="0.8" opacity="0.4" className="pulse-ring-1" />
          <circle cx="24" cy="24" r="16" fill="none" stroke="var(--accent-cyan)" strokeWidth="0.6" opacity="0.2" className="pulse-ring-2" />
          <circle cx="24" cy="24" r="22" fill="none" stroke="var(--accent-cyan)" strokeWidth="0.4" opacity="0.1" className="pulse-ring-3" />
          {/* Crosshairs */}
          <line x1="24" y1="2" x2="24" y2="10" stroke="var(--accent-cyan)" strokeWidth="0.5" opacity="0.3" />
          <line x1="24" y1="38" x2="24" y2="46" stroke="var(--accent-cyan)" strokeWidth="0.5" opacity="0.3" />
          <line x1="2" y1="24" x2="10" y2="24" stroke="var(--accent-cyan)" strokeWidth="0.5" opacity="0.3" />
          <line x1="38" y1="24" x2="46" y2="24" stroke="var(--accent-cyan)" strokeWidth="0.5" opacity="0.3" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-dark cyber-grid scanlines">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="px-6 py-32 md:py-48">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              {/* Terminal intro */}
              <p className="font-mono text-sm text-cyan/60 mb-6">
                &gt; INITIALIZING SYSTEM...
              </p>

              {/* Main Title */}
              <h1 className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-tight">
                <span className="text-white">CREATIVE</span>
                <br />
                <span className="gradient-text">EXPRESSION</span>
              </h1>

              {/* Tagline */}
              <p className="mt-12 max-w-lg text-lg text-white/50 leading-relaxed font-mono">
                <span className="text-magenta">&gt;</span> Building digital experiences, exploring the world, and documenting the journey.
              </p>

              {/* CTA */}
              <div className="mt-12 flex items-center gap-8">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 font-mono text-sm font-medium text-cyan border border-cyan/50 px-6 py-3 hover:bg-cyan/10 hover:border-cyan transition-all duration-300 box-glow-cyan"
                >
                  <span>EXPLORE_SYSTEM</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Cards Grid — 2 per row */}
        <section className="px-6 py-24 border-t border-white/10">
          <div className="mx-auto max-w-7xl">
            <p className="font-mono text-xs text-magenta mb-8">// NAVIGATION_MODULES</p>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              {navigationCards.map((card, index) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group relative p-8 bg-muted/50 border border-cyan/10 hover:border-cyan/50 hover:bg-muted transition-all duration-300 glitch-hover"
                  style={{
                    opacity: 0,
                    animation: `fadeIn 0.6s ease-out ${index * 0.1}s forwards`,
                  }}
                >
                  {/* Icon + Number row */}
                  <div className="flex items-start justify-between mb-6">
                    <CyberIcon type={card.icon} />
                    <span className="font-mono text-xs text-cyan/30 group-hover:text-cyan transition-colors duration-300">
                      [{card.number}]
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-mono text-xl font-bold text-white group-hover:text-cyan transition-colors duration-300">
                    {card.title}
                  </h2>

                  {/* Description */}
                  <p className="mt-3 text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300">
                    {card.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center gap-2">
                    <span className="font-mono text-xs text-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      ENTER &gt;
                    </span>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cyan/20 group-hover:border-cyan/50 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-cyan/20 group-hover:border-cyan/50 transition-colors duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="px-6 py-32">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 p-12 border border-magenta/20 bg-muted/30">
              <div>
                <p className="font-mono text-xs text-magenta mb-4">// ESTABLISH_CONNECTION</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  LET&apos;S <span className="text-magenta">CONNECT</span>
                </h2>
                <p className="mt-4 text-white/40 max-w-md font-mono text-sm">
                  Open to conversations, collaborations, and new opportunities.
                </p>
              </div>
              <a
                href="mailto:hello@13ly35.com"
                className="inline-flex items-center gap-3 font-mono text-sm font-medium text-magenta border border-magenta/50 px-6 py-3 hover:bg-magenta/10 hover:border-magenta transition-all duration-300 box-glow-magenta"
              >
                hello@13ly35.com
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
