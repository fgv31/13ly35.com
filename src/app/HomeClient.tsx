"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const navigationCards = [
  {
    title: "JOURNEY",
    href: "/journey",
    description: "From Verona to Berlin — the places and what happened there",
    number: "01",
    icon: "journey",
  },
  {
    title: "PICKS",
    href: "/picks",
    description: "Curated recommendations across media and objects",
    number: "02",
    icon: "taste",
  },
  {
    title: "PATHS",
    href: "/paths",
    description: "Ideas built, building, and imagined",
    number: "03",
    icon: "projects",
  },
  {
    title: "FEED",
    href: "/feed",
    description: "Current focus and weekly reflections",
    number: "04",
    icon: "now",
  },
];

const GLITCH_CHARS = "/<>[]{}|\\#@$%&*^~";
const NAME_FIRST = "FRANCESCO";
const NAME_SECOND = "VILLANI";
const TAGLINE = "> Building stuff, exploring the world, and documenting the journey.";

function CyberIcon({ type }: { type: string }) {
  switch (type) {
    case "journey":
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-12 sm:h-12 cyber-icon">
          <circle cx="24" cy="24" r="10" fill="none" stroke="var(--accent-cyan)" strokeWidth="1" opacity="0.6" />
          <ellipse cx="24" cy="24" rx="16" ry="6" fill="none" stroke="var(--accent-cyan)" strokeWidth="0.8" opacity="0.4">
            <animateTransform attributeName="transform" type="rotate" from="0 24 24" to="360 24 24" dur="6s" repeatCount="indefinite" />
          </ellipse>
          <circle cx="24" cy="24" r="2" fill="var(--accent-cyan)" opacity="0.8" />
          <circle r="1.5" fill="var(--accent-cyan)">
            <animateMotion dur="3s" repeatCount="indefinite" path="M24,24 m-16,0 a16,6 0 1,0 32,0 a16,6 0 1,0 -32,0" />
          </circle>
          <line x1="14" y1="24" x2="34" y2="24" stroke="var(--accent-cyan)" strokeWidth="0.5" opacity="0.3" />
          <line x1="24" y1="14" x2="24" y2="34" stroke="var(--accent-cyan)" strokeWidth="0.5" opacity="0.3" />
        </svg>
      );
    case "taste":
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-12 sm:h-12 cyber-icon">
          {[
            { x: 8, h: 12, y: 28, color: "var(--accent-magenta)", dur: "1.2s" },
            { x: 15, h: 22, y: 18, color: "var(--accent-cyan)", dur: "0.9s" },
            { x: 22, h: 28, y: 12, color: "var(--accent-magenta)", dur: "1.1s" },
            { x: 29, h: 18, y: 22, color: "var(--accent-cyan)", dur: "0.8s" },
            { x: 36, h: 24, y: 16, color: "var(--accent-magenta)", dur: "1.0s" },
          ].map((bar, i) => (
            <rect key={i} x={bar.x} width="4" fill={bar.color} opacity="0.7" y={bar.y} height={bar.h}>
              <animate attributeName="height" values={`${bar.h};${bar.h * 0.3};${bar.h}`} dur={bar.dur} repeatCount="indefinite" />
              <animate attributeName="y" values={`${bar.y};${bar.y + bar.h * 0.7};${bar.y}`} dur={bar.dur} repeatCount="indefinite" />
            </rect>
          ))}
          <line x1="6" y1="8" x2="42" y2="8" stroke="var(--accent-cyan)" strokeWidth="0.5" opacity="0.3" />
          <line x1="6" y1="42" x2="42" y2="42" stroke="var(--accent-cyan)" strokeWidth="0.5" opacity="0.3" />
        </svg>
      );
    case "projects":
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-12 sm:h-12 cyber-icon">
          <rect x="8" y="10" width="32" height="28" rx="2" fill="none" stroke="var(--accent-cyan)" strokeWidth="1" opacity="0.5" />
          <line x1="8" y1="16" x2="40" y2="16" stroke="var(--accent-cyan)" strokeWidth="0.8" opacity="0.3" />
          <circle cx="12" cy="13" r="1" fill="var(--accent-magenta)" opacity="0.7" />
          <circle cx="16" cy="13" r="1" fill="var(--accent-yellow)" opacity="0.7" />
          <circle cx="20" cy="13" r="1" fill="var(--accent-cyan)" opacity="0.7" />
          <line x1="12" y1="22" x2="24" y2="22" stroke="var(--accent-cyan)" strokeWidth="1.5">
            <animate attributeName="opacity" values="0.2;0.8;0.4" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="12" y1="27" x2="30" y2="27" stroke="var(--accent-magenta)" strokeWidth="1.5">
            <animate attributeName="opacity" values="0.2;0.8;0.4" dur="2s" begin="0.3s" repeatCount="indefinite" />
          </line>
          <line x1="12" y1="32" x2="20" y2="32" stroke="var(--accent-cyan)" strokeWidth="1.5">
            <animate attributeName="opacity" values="0.2;0.8;0.4" dur="2s" begin="0.6s" repeatCount="indefinite" />
          </line>
          <rect x="22" y="30" width="2" height="5" fill="var(--accent-cyan)">
            <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
          </rect>
        </svg>
      );
    case "now":
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8 sm:w-12 sm:h-12 cyber-icon">
          <circle cx="24" cy="24" r="4" fill="var(--accent-cyan)">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="24" cy="24" r="10" fill="none" stroke="var(--accent-cyan)" strokeWidth="0.8">
            <animate attributeName="opacity" values="0.5;0.15;0.5" dur="2s" repeatCount="indefinite" />
            <animate attributeName="r" values="9;11;9" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="24" cy="24" r="16" fill="none" stroke="var(--accent-cyan)" strokeWidth="0.6">
            <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" begin="0.4s" repeatCount="indefinite" />
            <animate attributeName="r" values="15;17;15" dur="2s" begin="0.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="24" cy="24" r="22" fill="none" stroke="var(--accent-cyan)" strokeWidth="0.4">
            <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2s" begin="0.8s" repeatCount="indefinite" />
            <animate attributeName="r" values="21;23;21" dur="2s" begin="0.8s" repeatCount="indefinite" />
          </circle>
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

function useBootSequence() {
  const [phase, setPhase] = useState(0);
  // 0: blank, 1: init blinking, 2: glitch→name, 3: typewriter, 4: cta visible
  const [nameFirst, setNameFirst] = useState("");
  const [nameSecond, setNameSecond] = useState("");
  const [tagline, setTagline] = useState("");
  const [initBlinks, setInitBlinks] = useState(0);
  const [initVisible, setInitVisible] = useState(false);

  useEffect(() => {
    // Phase 0 → 1: show init text after 400ms
    const t0 = setTimeout(() => setPhase(1), 400);
    return () => clearTimeout(t0);
  }, []);

  // Phase 1: blink "INITIALIZING SYSTEM..." once
  useEffect(() => {
    if (phase !== 1) return;
    let blink = 0;
    setInitVisible(true);
    const interval = setInterval(() => {
      blink++;
      setInitBlinks(blink);
      if (blink < 2) {
        setInitVisible(blink % 2 === 0);
      } else {
        setInitVisible(true);
        clearInterval(interval);
        setPhase(2);
      }
    }, 350);
    return () => clearInterval(interval);
  }, [phase]);

  // Phase 2: glitch characters → resolve into name
  useEffect(() => {
    if (phase !== 2) return;
    const totalLen = Math.max(NAME_FIRST.length, NAME_SECOND.length);
    let step = 0;
    const totalSteps = totalLen + 6; // extra steps for glitch lead-in

    const interval = setInterval(() => {
      step++;

      // Build first name
      let f = "";
      for (let i = 0; i < NAME_FIRST.length; i++) {
        if (step - 3 > i) {
          f += NAME_FIRST[i];
        } else if (step > i) {
          f += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }
      }
      setNameFirst(f);

      // Build second name (starts 2 steps later)
      let s = "";
      for (let i = 0; i < NAME_SECOND.length; i++) {
        if (step - 5 > i) {
          s += NAME_SECOND[i];
        } else if (step - 2 > i) {
          s += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }
      }
      setNameSecond(s);

      if (step >= totalSteps) {
        clearInterval(interval);
        setNameFirst(NAME_FIRST);
        setNameSecond(NAME_SECOND);
        setPhase(3);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [phase]);

  // Phase 3: typewriter for tagline
  useEffect(() => {
    if (phase !== 3) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTagline(TAGLINE.slice(0, i));
      if (i >= TAGLINE.length) {
        clearInterval(interval);
        setPhase(4);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [phase]);

  return { phase, nameFirst, nameSecond, tagline, initVisible };
}

export default function HomeClient() {
  const { phase, nameFirst, nameSecond, tagline, initVisible } = useBootSequence();
  const navRef = useRef<HTMLDivElement>(null);

  const scrollToNav = () => {
    navRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col bg-dark cyber-grid scanlines">
      <Header />

      <main className="flex-1">
        {/* Hero Section — always full viewport height */}
        <section className="px-6 min-h-screen flex items-center">
          <div className="mx-auto max-w-7xl w-full">
            <div className="max-w-4xl">
              {/* Terminal intro */}
              <p
                className="font-mono text-sm text-cyan/60 mb-6 h-6"
                style={{ opacity: initVisible && phase >= 1 ? 1 : 0 }}
              >
                &gt; INITIALIZING SYSTEM...
              </p>

              {/* Main Title — name is always in DOM for crawlers, revealed by boot animation */}
              <h1 className="text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-tight min-h-[1.8em]">
                {phase >= 2 ? (
                  <>
                    <span className="text-white glitch-text">{nameFirst}</span>
                    <br />
                    <span className="gradient-text glitch-text">{nameSecond}</span>
                  </>
                ) : (
                  <span className="sr-only">FRANCESCO VILLANI</span>
                )}
              </h1>

              {/* Tagline */}
              <p className="mt-12 max-w-lg text-lg text-white/50 leading-relaxed font-mono min-h-[2em]">
                {phase >= 3 && (
                  <>
                    <span className="text-magenta">{tagline.slice(0, 1)}</span>
                    <span>{tagline.slice(1)}</span>
                    {phase === 3 && <span className="inline-block w-2 h-5 bg-cyan/80 ml-0.5 animate-cursor-blink align-middle" />}
                  </>
                )}
              </p>

              {/* CTA */}
              <div className="mt-12 flex items-center gap-8" style={{ opacity: phase >= 4 ? 1 : 0, transition: "opacity 0.5s ease-in" }}>
                <button
                  onClick={scrollToNav}
                  className="group inline-flex items-center gap-3 font-mono text-sm font-medium text-cyan border border-cyan/50 px-6 py-3 hover:bg-cyan/10 hover:border-cyan transition-all duration-300 box-glow-cyan animate-cta-blink"
                >
                  <span>EXPLORE_SYSTEM</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Cards Grid — 2 per row */}
        <section ref={navRef} className="px-6 py-24 border-t border-white/10">
          <div className="mx-auto max-w-7xl">
            <p className="font-mono text-xs text-magenta mb-8">{'// NAVIGATION_MODULES'}</p>
            <div className="grid gap-4 grid-cols-2">
              {navigationCards.map((card, index) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group relative p-6 sm:p-8 bg-muted/50 border border-cyan/30 md:border-cyan/10 hover:border-cyan/50 hover:bg-muted transition-all duration-300 glitch-hover"
                  style={{
                    opacity: 0,
                    animation: `fadeIn 0.6s ease-out ${index * 0.1}s forwards`,
                  }}
                >
                  {/* Top row: icon left, number right */}
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <CyberIcon type={card.icon} />
                    <span className="font-mono text-xs text-cyan/30 group-hover:text-cyan transition-colors duration-300">
                      [{card.number}]
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-mono text-base sm:text-xl font-bold text-white group-hover:text-cyan transition-colors duration-300">
                    {card.title}
                  </h2>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300">
                    {card.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-4 sm:mt-6">
                    <span className="font-mono text-xs text-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      ENTER &gt;
                    </span>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cyan/40 md:border-cyan/20 group-hover:border-cyan/50 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-cyan/40 md:border-cyan/20 group-hover:border-cyan/50 transition-colors duration-300" />
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
                <p className="font-mono text-xs text-magenta mb-4">{'// ESTABLISH_CONNECTION'}</p>
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
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes ctaBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .animate-cursor-blink {
          animation: cursorBlink 0.6s step-end infinite;
        }
        .animate-cta-blink {
          animation: ctaBlink 2s ease-in-out infinite;
        }
        .glitch-text {
          display: inline-block;
        }
      `}</style>
    </div>
  );
}
