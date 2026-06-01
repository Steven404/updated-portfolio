import { ArrowRight, MapPin } from 'lucide-react';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative h-[calc(100vh-64px)] flex flex-col justify-center overflow-hidden bg-deep" // Adjusted for header height
    >
      {/* Background layer: dot grid + radial glow */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(circle, #0FA4AF 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 80% 50%, rgba(2,73,80,0.55) 0%, transparent 65%)',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-16 xl:px-20 py-10 sm:py-16 lg:py-0 grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center">

        {/* ── Left: text ── */}
        <div className="flex flex-col gap-5 lg:gap-7 max-w-2xl">

          {/* Role + location */}
          <div
            className="animate-reveal-up flex items-center gap-3"
            style={{ animationDelay: '60ms' }}
          >
            <span
              className="h-px w-6 sm:w-8 shrink-0 rounded-full bg-teal"
              aria-hidden
            />
            <span className="text-teal text-sm font-medium tracking-wide flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
              Frontend &amp; React Native Engineer
              <span className="text-sky opacity-40 mx-0.5" aria-hidden>·</span>
              <span className="inline-flex items-center gap-1 opacity-70">
                <MapPin size={12} aria-hidden />
                Thessaloniki, GR
              </span>
            </span>
          </div>

          {/* Name */}
          <h1
            className="animate-reveal-up font-display leading-[0.92] tracking-[-0.04em]"
            style={{
              fontFamily: '"Bricolage Grotesque", sans-serif',
              fontSize: 'clamp(2.75rem, 10vw, 6.5rem)',
              color: '#AFDDE5',
              animationDelay: '140ms',
              overflowWrap: 'break-word',
            }}
          >
            Stefanos
            <br />
            Michelakis
            <span
              className="inline-block ml-1"
              style={{ color: '#964734' }}
              aria-hidden
            >
              .
            </span>
          </h1>

          {/* Description */}
          <p
            className="animate-reveal-up text-base lg:text-lg leading-relaxed max-w-[48ch]"
            style={{
              color: 'rgba(175,221,229,0.75)',
              animationDelay: '260ms',
              fontFamily: '"Figtree", sans-serif',
              textWrap: 'pretty',
            }}
          >
            I build React apps and React Native mobile products that ship to real users — with five years of production experience and a relentless eye for the small details that make the difference.
          </p>

          {/* CTAs */}
          <div
            className="animate-reveal-up flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1"
            style={{ animationDelay: '360ms' }}
          >
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-sm font-semibold transition-all duration-200 bg-teal text-deep hover:brightness-110 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal w-full sm:w-auto"
              style={{ fontFamily: '"Figtree", sans-serif' }}
            >
              See my work
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform duration-200"
                aria-hidden
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-semibold transition-all duration-200 border border-sky/40 text-sky hover:border-sky hover:bg-sky/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky w-full sm:w-auto"
              style={{ fontFamily: '"Figtree", sans-serif' }}
            >
              Get in touch
            </a>
          </div>

        </div>

        {/* ── Right: SM orbit visual ── */}
        <div
          className="hidden lg:flex items-center justify-center animate-fade-in"
          style={{ animationDelay: '500ms' }}
          aria-hidden
        >
          <div className="relative" style={{ width: 380, height: 380 }}>
            <svg
              viewBox="0 0 380 380"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Cross guides */}
              <line x1="0" y1="190" x2="380" y2="190" stroke="#024950" strokeWidth="0.75" />
              <line x1="190" y1="0" x2="190" y2="380" stroke="#024950" strokeWidth="0.75" />

              {/* Outer ring */}
              <circle cx="190" cy="190" r="178" stroke="#024950" strokeWidth="0.75" />

              {/* Second ring */}
              <circle cx="190" cy="190" r="140" stroke="#024950" strokeWidth="1" />

              {/* Orbit path for the accent dot */}
              <circle
                cx="190"
                cy="190"
                r="140"
                stroke="#0FA4AF"
                strokeWidth="1"
                strokeDasharray="6 10"
                opacity="0.35"
              />

              {/* Inner bright ring */}
              <circle cx="190" cy="190" r="96" stroke="#0FA4AF" strokeWidth="1.25" opacity="0.55" />

              {/* Innermost surface */}
              <circle cx="190" cy="190" r="62" fill="#024950" />

              {/* SM monogram */}
              <text
                x="190"
                y="199"
                textAnchor="middle"
                fill="#AFDDE5"
                fontSize="36"
                fontFamily='"Bricolage Grotesque", sans-serif'
                fontWeight="600"
                letterSpacing="-1"
              >
                SM
              </text>

              {/* Orbiting accent dot — rotates via CSS */}
              <g className="animate-spin-slow">
                {/* terracotta dot at top of the 140 orbit */}
                <circle cx="190" cy="50" r="8" fill="#964734" />
                {/* small halo */}
                <circle cx="190" cy="50" r="13" stroke="#964734" strokeWidth="1" opacity="0.25" />
              </g>

              {/* Corner tick marks for precision feel */}
              <line x1="178" y1="12" x2="202" y2="12" stroke="#024950" strokeWidth="1" />
              <line x1="190" y1="0"  x2="190" y2="8"  stroke="#024950" strokeWidth="1" />
              <line x1="178" y1="368" x2="202" y2="368" stroke="#024950" strokeWidth="1" />
              <line x1="190" y1="372" x2="190" y2="380" stroke="#024950" strokeWidth="1" />
              <line x1="368" y1="178" x2="368" y2="202" stroke="#024950" strokeWidth="1" />
              <line x1="372" y1="190" x2="380" y2="190" stroke="#024950" strokeWidth="1" />
              <line x1="12"  y1="178" x2="12"  y2="202" stroke="#024950" strokeWidth="1" />
              <line x1="0"   y1="190" x2="8"   y2="190" stroke="#024950" strokeWidth="1" />
            </svg>
          </div>
        </div>

      </div>

      {/* Scroll indicator — hidden on very small viewports to avoid overlap */}
      <div
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 animate-fade-in"
        style={{ animationDelay: '800ms', color: '#AFDDE5', opacity: 0.45 }}
        aria-hidden
      >
        <span
          className="text-[10px] font-medium tracking-[0.18em] uppercase"
          style={{ fontFamily: '"Figtree", sans-serif' }}
        >
          scroll
        </span>
        <div className="relative w-px h-10 overflow-hidden" style={{ background: 'rgba(175,221,229,0.15)' }}>
          <div
            className="absolute inset-x-0 top-0 h-full animate-scroll-line rounded-full"
            style={{ background: '#0FA4AF' }}
          />
        </div>
      </div>
    </section>
  );
}
