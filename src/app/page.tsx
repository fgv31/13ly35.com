"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const navigationCards = [
  {
    title: "About",
    href: "/about",
    description: "History, experiences, and the journey so far",
    number: "01",
  },
  {
    title: "Map",
    href: "/map",
    description: "Places explored and destinations ahead",
    number: "02",
  },
  {
    title: "Taste",
    href: "/taste",
    description: "Curated recommendations across media and objects",
    number: "03",
  },
  {
    title: "Projects",
    href: "/projects",
    description: "Ideas built, building, and imagined",
    number: "04",
  },
  {
    title: "Now",
    href: "/now",
    description: "Current focus and weekly reflections",
    number: "05",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-beige">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="px-6 py-32 md:py-48">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              {/* Main Title */}
              <h1 className="text-[clamp(3rem,10vw,8rem)] font-light leading-[0.9] tracking-tight text-black">
                Creative
                <br />
                <span className="text-red">Expression</span>
              </h1>

              {/* Tagline */}
              <p className="mt-12 max-w-lg text-lg text-black/60 leading-relaxed">
                Building digital experiences, exploring the world, and documenting the journey along the way.
              </p>

              {/* CTA */}
              <div className="mt-12 flex items-center gap-8">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 text-sm font-medium text-black"
                >
                  <span>Explore</span>
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
        <section className="px-6 py-24 border-t border-black/5">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-px bg-black/5 sm:grid-cols-2 lg:grid-cols-3">
              {navigationCards.map((card, index) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group relative bg-beige p-10 transition-colors duration-500 hover:bg-black"
                  style={{
                    opacity: 0,
                    animation: `fadeIn 0.6s ease-out ${index * 0.1}s forwards`,
                  }}
                >
                  {/* Number */}
                  <span className="text-xs text-black/20 group-hover:text-white/30 transition-colors duration-500">
                    {card.number}
                  </span>

                  {/* Title */}
                  <h2 className="mt-8 text-2xl font-light text-black group-hover:text-white transition-colors duration-500">
                    {card.title}
                  </h2>

                  {/* Description */}
                  <p className="mt-3 text-sm text-black/50 group-hover:text-white/60 transition-colors duration-500">
                    {card.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-8 flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-red opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="px-6 py-32">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-light text-black">
                  Let&apos;s connect
                </h2>
                <p className="mt-4 text-black/50 max-w-md">
                  Open to conversations, collaborations, and new opportunities.
                </p>
              </div>
              <a
                href="mailto:hello@13ly35.com"
                className="inline-flex items-center gap-3 text-sm font-medium text-black border-b border-black pb-1 hover:text-red hover:border-red transition-colors duration-300"
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
