import { FileDown } from 'lucide-react';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';

const SKILL_GROUPS = [
  { category: 'Languages',    skills: ['JavaScript (ES6+)', 'TypeScript'] },
  { category: 'Frontend',     skills: ['React', 'Angular', 'Tailwind CSS'] },
  { category: 'Mobile',       skills: ['React Native'] },
  { category: 'State & Data', skills: ['React Query', 'Context API', 'NgRx'] },
  { category: 'Tooling',      skills: ['Node.js', 'Git / GitHub', 'Figma'] },
];

export function About() {
  const headingRef = useScrollFadeIn();
  const bioRef     = useScrollFadeIn(0.05);
  const skillsRef  = useScrollFadeIn(0.05);

  return (
    <section
      id="about"
      className="relative py-28 lg:py-36 overflow-hidden"
      style={{ background: 'rgba(2,73,80,0.14)' }}
    >
      {/* Subtle dot grid — echoes the Hero */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #0FA4AF 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-16 xl:px-20">
        <h2
          ref={headingRef as React.RefObject<HTMLHeadingElement>}
          className="opacity-0 mb-16 lg:mb-20"
          style={{
            fontFamily: '"Bricolage Grotesque", sans-serif',
            fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: '#AFDDE5',
            textWrap: 'balance',
          }}
        >
          A bit about me<span style={{ color: '#964734' }}>.</span>
        </h2>

        <div className="grid lg:grid-cols-[1fr_340px] gap-16 xl:gap-24 items-start">

          {/* Bio */}
          <div
            ref={bioRef as React.RefObject<HTMLDivElement>}
            className="opacity-0 space-y-6"
          >
            <p
              className="text-xl leading-relaxed"
              style={{
                color: 'rgba(175,221,229,0.85)',
                fontFamily: '"Figtree", sans-serif',
                maxWidth: '62ch',
              }}
            >
              Five years building web and mobile products that ship to real users. My focus is React and React Native — from architecture through deployment, with a particular interest in good UX practices and the performance details that some times get deprioritized in our field.
            </p>
            <p
              className="text-lg leading-relaxed"
              style={{
                color: 'rgba(175,221,229,0.65)',
                fontFamily: '"Figtree", sans-serif',
                maxWidth: '62ch',
              }}
            >
              I started my software development career shortly before graduating and have been building across client products and personal projects ever since. I care about maintainable code and polished interfaces in equal measure.
            </p>
            <p
              className="leading-relaxed"
              style={{
                color: 'rgba(175,221,229,0.45)',
                fontFamily: '"Figtree", sans-serif',
                maxWidth: '62ch',
              }}
            >
              Based in Thessaloniki, Greece. Available for remote work.
            </p>
            <div className="pt-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm font-semibold transition-colors duration-200"
                style={{ color: '#0FA4AF', fontFamily: '"Figtree", sans-serif' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#AFDDE5'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#0FA4AF'; }}
              >
                <span className="h-px w-8 rounded-full bg-current" aria-hidden />
                Download resume
                <FileDown size={15} aria-hidden />
              </a>
            </div>
          </div>

          {/* Skills — categorized bordered list */}
          <div
            ref={skillsRef as React.RefObject<HTMLDivElement>}
            className="opacity-0"
            style={{ borderTop: '1px solid rgba(2,73,80,0.7)' }}
          >
            {SKILL_GROUPS.map(({ category, skills }) => (
              <div
                key={category}
                className="py-5"
                style={{ borderBottom: '1px solid rgba(2,73,80,0.7)' }}
              >
                <p
                  className="text-xs font-medium mb-3"
                  style={{
                    color: 'rgba(175,221,229,0.35)',
                    fontFamily: '"Figtree", sans-serif',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm px-3 py-1.5 rounded-lg"
                      style={{
                        background: 'rgba(2,73,80,0.5)',
                        color: 'rgba(175,221,229,0.82)',
                        fontFamily: '"Figtree", sans-serif',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
