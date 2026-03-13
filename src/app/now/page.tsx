"use client";

export default function NowPage() {
  return (
    <div className="min-h-screen bg-beige flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <h1 className="font-pixel text-4xl md:text-5xl text-black mb-12 text-center tracking-wider">
          NOW
        </h1>

        {/* Pixel Art Loading Animation */}
        <div className="flex justify-center mb-12">
          <div className="relative w-32 h-32">
            {/* Animated rotating squares */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-1">
                <div className="bg-red pixel-block"></div>
                <div className="bg-black pixel-block animation-delay-100"></div>
                <div className="bg-red pixel-block animation-delay-200"></div>
                <div className="bg-black pixel-block animation-delay-300"></div>
                <div className="bg-transparent"></div>
                <div className="bg-black pixel-block animation-delay-400"></div>
                <div className="bg-red pixel-block animation-delay-500"></div>
                <div className="bg-black pixel-block animation-delay-600"></div>
                <div className="bg-red pixel-block animation-delay-700"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Message */}
        <div className="text-center space-y-6">
          <h2 className="font-sans text-3xl font-bold text-black">
            Coming Soon
          </h2>

          <p className="font-sans text-lg text-black/80 leading-relaxed max-w-lg mx-auto">
            Weekly moodboard - my routine, mood, and thoughts on the world
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 py-4">
            <div className="w-2 h-2 bg-red"></div>
            <div className="w-2 h-2 bg-red"></div>
            <div className="w-2 h-2 bg-red"></div>
          </div>

          {/* Tech Note */}
          <div className="inline-block px-6 py-3 border-2 border-black bg-beige">
            <p className="font-pixel text-xs text-black">
              CONNECTING TO OBSIDIAN...
            </p>
          </div>
        </div>

        {/* Blinking Cursor Effect */}
        <div className="flex justify-center mt-12">
          <div className="w-4 h-6 bg-black animate-blink"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes blink {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0;
          }
        }

        @keyframes pulse-fade {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        .pixel-block {
          animation: pulse-fade 2s ease-in-out infinite;
        }

        .animation-delay-100 {
          animation-delay: 0.1s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
}
