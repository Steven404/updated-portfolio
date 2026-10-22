import { useEffect, useRef } from 'react';

const EXPERIENCE = [
  { role: 'Full Stack Software Engineer',  company: 'Flarmio',                   period: '2021 – 2023' },
  { role: 'Full Stack Software Engineer',  company: 'Valmore Technologies',      period: '2023' },
  { role: 'Full Stack Software Engineer',  company: 'Kanellis Development Labs', period: '2023 – 2025' },
  { role: 'Senior React Native Developer', company: 'Base Element',              period: '2025 – now', current: true },
];

// When the drawing timeline line reaches each role, after it starts (ms).
// Desktop follows the line's ease-in-out curve across its four evenly spaced
// stops; phones get a plain stagger.
const REACH_MD = [0, 392, 608, 1000];
const REACH_SM_STEP = 110;

// The timeline plays once it is in view (on phones it starts below the fold).
// In view on load it waits for the name and tagline; scrolled to later it
// starts almost at once.
function useTimelinePlay<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mountedAt = performance.now();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (performance.now() - mountedAt > 400) el.style.setProperty('--line-start', '150ms');
        el.classList.add('is-playing');
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function Experience() {
  const timelineRef = useTimelinePlay<HTMLDivElement>();

  return (
    <div ref={timelineRef} className="hero-timeline flex flex-col items-center w-full">
      <h2 className="hero-fade inline-block pb-2 border-b-2 border-accent font-mono font-medium text-[13px] tracking-[0.08em] text-fg">
        WORK EXPERIENCE
      </h2>

      {/* Desktop: horizontal timeline. Phones: vertical, newest on top. */}
      <div className="relative w-full mt-7">
        <span
          className="hero-line hidden md:block absolute top-1.5 left-[12.5%] right-[12.5%] h-px bg-line-strong"
          aria-hidden
        />
        <ol className="relative flex flex-col-reverse gap-[22px] w-fit max-w-full mx-auto border-l border-line text-left md:grid md:grid-cols-4 md:gap-x-6 md:gap-y-0 md:w-full md:border-l-0 md:text-center">
          {EXPERIENCE.map(({ role, company, period, current }, i) => (
            <li
              key={company}
              className="hero-step relative flex flex-col items-start pl-[22px] md:items-center md:pl-0"
              style={
                {
                  '--reach-md': `${REACH_MD[i]}ms`,
                  '--reach-sm': `${i * REACH_SM_STEP}ms`,
                } as React.CSSProperties
              }
            >
              {current ? (
                <span
                  className="hero-node absolute -left-[7px] top-[5px] md:relative md:left-0 md:top-0 block w-[13px] h-[13px]"
                  aria-hidden
                >
                  <span className="hero-ripple absolute inset-0 rounded-full bg-accent" />
                  <span className="relative block w-full h-full rounded-full bg-accent shadow-[0_0_0_5px_var(--ground)]" />
                </span>
              ) : (
                <span
                  className="hero-node absolute -left-[6px] top-[7px] md:static md:mt-0.5 block w-[11px] h-[11px] rounded-full bg-ground border border-dim"
                  aria-hidden
                />
              )}
              <div className="hero-role flex flex-col items-start md:items-center">
                <div
                  className={
                    current
                      ? 'md:mt-3.5 font-semibold text-[17px] leading-[1.35] text-balance text-fg'
                      : 'md:mt-4 font-medium text-base leading-[1.35] text-balance text-fg-2'
                  }
                >
                  {role}
                </div>
                <div className={`mt-1 text-sm ${current ? 'text-fg-2' : 'text-muted'}`}>
                  {company}
                  {/* Period gets its own line in the narrow desktop columns */}
                  <span className="text-muted whitespace-nowrap md:block md:mt-0.5">
                    <span className="md:hidden"> · </span>
                    {period}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="max-w-[1200px] mx-auto px-6 pt-20 pb-[88px] flex flex-col items-center text-center gap-10"
    >
      {/* Role, location + name */}
      <div className="flex flex-col items-center">
        <div className="hero-fade flex flex-wrap justify-center items-center gap-x-6 gap-y-2.5 font-mono text-[13px] text-muted uppercase tracking-[0.06em]">
          <span>Frontend &amp; React Native Engineer</span>
          <span>Thessaloniki, GR</span>
          <span className="inline-flex items-center gap-2 text-fg">
            <span className="w-2 h-2 rounded-full bg-accent inline-block" aria-hidden />
            Open to remote work
          </span>
        </div>
        <h1 className="mt-5 font-display font-bold text-[clamp(44px,7vw,96px)] leading-none tracking-[-0.035em]">
          <span className="hero-name-mask">
            <span className="hero-name">
              Stefanos Michelakis<span className="hero-stop text-accent">.</span>
            </span>
          </span>
        </h1>
      </div>

      <p
        className="animate-reveal-up max-w-[820px] text-[19px] sm:text-[22px] leading-[1.55] text-fg"
        style={{ animationDelay: '300ms' }}
      >
        I build React apps and React Native mobile products that ship to real users — with 5+ years
        of production experience and a relentless eye for the small details that make the difference.
      </p>

      <div className="w-full">
        <Experience />
      </div>

      <div
        className="animate-reveal-up flex flex-wrap justify-center items-center gap-x-7 gap-y-4"
        style={{ animationDelay: '800ms' }}
      >
        <a
          href="#work"
          className="no-underline inline-flex items-center min-h-12 px-[26px] py-3.5 rounded-full bg-accent text-on-accent font-semibold transition-[filter] hover:brightness-110"
        >
          See my work →
        </a>
        <a href="#contact" className="inline-flex items-center min-h-11 font-medium underline-offset-[6px]">
          Get in touch
        </a>
      </div>
    </section>
  );
}
