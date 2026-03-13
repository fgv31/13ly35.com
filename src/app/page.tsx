"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const navigationCards = [
  {
    title: "About",
    href: "/about",
    description: "Who I am and what I do",
    emoji: "👤",
  },
  {
    title: "Map",
    href: "/map",
    description: "Places I've been and want to go",
    emoji: "🗺️",
  },
  {
    title: "Taste",
    href: "/taste",
    description: "Music, books, and things I love",
    emoji: "✨",
  },
  {
    title: "Projects",
    href: "/projects",
    description: "Things I've built and am building",
    emoji: "🛠️",
  },
  {
    title: "Now",
    href: "/now",
    description: "What I'm up to right now",
    emoji: "📍",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-black/5 bg-beige px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center text-center">
              {/* Main Title */}
              <h1 className="font-pixel text-4xl tracking-wider text-black md:text-6xl lg:text-7xl">
                13LY35
              </h1>

              {/* Tagline */}
              <p className="mt-8 max-w-2xl text-lg text-black/70 md:text-xl">
                Creative expression meets professional presence.
                <br />
                Building digital experiences and exploring the world.
              </p>

              {/* Accent Line */}
              <div className="mt-8 h-1 w-24 bg-red"></div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
            <div className="absolute left-1/4 top-1/4 h-2 w-2 bg-red opacity-20"></div>
            <div className="absolute right-1/3 top-1/3 h-2 w-2 bg-red opacity-20"></div>
            <div className="absolute bottom-1/4 right-1/4 h-2 w-2 bg-red opacity-20"></div>
          </div>
        </section>

        {/* Navigation Cards Grid */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {navigationCards.map((card, index) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="pixel-hover group relative flex flex-col rounded-lg border-2 border-black bg-beige p-8 transition-all"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                    opacity: 0,
                  }}
                >
                  {/* Card Number */}
                  <span className="absolute right-4 top-4 font-pixel text-xs text-black/20">
                    0{index + 1}
                  </span>

                  {/* Emoji */}
                  <span className="mb-4 text-4xl" aria-hidden="true">
                    {card.emoji}
                  </span>

                  {/* Title */}
                  <h2 className="mb-2 font-pixel text-lg tracking-wide text-black">
                    {card.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-black/70">{card.description}</p>

                  {/* Arrow Indicator */}
                  <div className="mt-4 flex items-center gap-2 text-red opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-sm font-medium">Explore</span>
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="border-t border-black/5 bg-beige px-6 py-16">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="font-pixel text-2xl tracking-wide text-black md:text-3xl">
              Let&apos;s Connect
            </h2>
            <p className="mt-4 text-black/70">
              Always open to interesting conversations and collaborations.
            </p>
            <a
              href="mailto:hello@13ly35.com"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border-2 border-black bg-beige px-8 py-4 font-medium text-black transition-all hover:bg-black hover:text-beige"
            >
              Get in Touch
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Keyframes for card animations */}
      <style jsx>{`
        @keyframes fadeInUp {
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
