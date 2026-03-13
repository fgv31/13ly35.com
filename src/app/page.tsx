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
  },
  {
    title: "TASTE",
    href: "/taste",
    description: "Curated recommendations across media and objects",
    number: "02",
  },
  {
    title: "PROJECTS",
    href: "/projects",
    description: "Ideas built, building, and imagined",
    number: "03",
  },
  {
    title: "NOW",
    href: "/now",
    description: "Current focus and weekly reflections",
    number: "04",
  },
];

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

        {/* Navigation Cards Grid */}
        <section className="px-6 py-24 border-t border-white/10">
          <div className="mx-auto max-w-7xl">
            <p className="font-mono text-xs text-magenta mb-8">// NAVIGATION_MODULES</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                  {/* Number */}
                  <span className="font-mono text-xs text-cyan/30 group-hover:text-cyan transition-colors duration-300">
                    [{card.number}]
                  </span>

                  {/* Title */}
                  <h2 className="mt-6 font-mono text-xl font-bold text-white group-hover:text-cyan transition-colors duration-300">
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
