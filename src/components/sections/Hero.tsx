import { useState } from 'react';
import { EXPERIENCE, type Role } from '../../data/experience';
import { useFullStopJourney } from '../../hooks/useFullStopJourney';
import { ButtonLink } from '../ui/ButtonLink';
import { RoleDialog } from './RoleDialog';

interface ExperienceProps {
  timelineRef: React.Ref<HTMLDivElement>;
  onOpenRole: (role: Role) => void;
}

function Experience({ timelineRef, onOpenRole }: ExperienceProps) {
  return (
    <div ref={timelineRef} className="hero-timeline flex flex-col items-center w-full">
      <h2 className="hero-fade inline-block pb-2 border-b-2 border-accent font-mono font-medium text-[13px] tracking-[0.08em] text-fg">
        WORK EXPERIENCE
      </h2>

      {/* Desktop: horizontal timeline. Phones: vertical, newest on top. The
          lines draw from "now" back to the first role. */}
      <div className="relative w-full mt-7">
        <span
          className="hero-line hidden md:block absolute top-1.5 left-[12.5%] right-[12.5%] h-px bg-line-strong"
          aria-hidden
        />
        <div className="relative w-fit max-w-full mx-auto md:w-full">
          <span className="hero-line-v md:hidden absolute left-0 top-3 bottom-0 w-px bg-line" aria-hidden />
          <ol className="relative flex flex-col-reverse gap-[22px] text-left md:grid md:grid-cols-4 md:gap-x-6 md:gap-y-0 md:text-center">
            {EXPERIENCE.map(({ id, role, company, period, current }, i) => (
              <li
                key={id}
                className="hero-step relative flex flex-col items-start pl-[22px] md:items-center md:pl-0"
              >
                {current ? (
                  <span
                    className="hero-node hero-now absolute -left-[7px] top-[5px] md:relative md:left-0 md:top-0 block w-[13px] h-[13px]"
                    aria-hidden
                  >
                    <span className="hero-ripple absolute inset-0 rounded-full bg-accent" />
                    <span
                      data-now-dot
                      className="relative block w-full h-full rounded-full bg-accent shadow-[0_0_0_5px_var(--ground)]"
                    />
                  </span>
                ) : (
                  <span
                    className="hero-node absolute -left-[6px] top-[7px] md:static md:mt-0.5 block w-[11px] h-[11px] rounded-full bg-ground border border-dim"
                    aria-hidden
                  />
                )}
                {/* The whole entry opens the role details; the dot stays out of
                    it, so the hover scale never moves what the full stop
                    measures */}
                <button
                  type="button"
                  onClick={() => onOpenRole(EXPERIENCE[i])}
                  aria-haspopup="dialog"
                  className="hero-role role-trigger flex flex-col items-start text-left md:items-center md:text-center cursor-pointer"
                >
                  <span
                    className={`role-title block underline decoration-1 underline-offset-[5px] text-balance ${
                      current
                        ? 'md:mt-3.5 font-semibold text-[17px] leading-[1.35] text-fg'
                        : 'md:mt-4 font-medium text-base leading-[1.35] text-fg-2'
                    }`}
                  >
                    {role}
                  </span>
                  <span className={`block mt-1 text-sm ${current ? 'text-fg-2' : 'text-muted'}`}>
                    {company}
                    {/* Period gets its own line in the narrow desktop columns */}
                    <span className="text-muted whitespace-nowrap md:block md:mt-0.5">
                      <span className="md:hidden"> · </span>
                      {period}
                    </span>
                  </span>
                  <span className="sr-only">, details</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { stopRef, timelineRef } = useFullStopJourney();
  // Kept after closing so the dialog's content stays put while it animates out
  const [role, setRole] = useState<Role | null>(null);
  const [roleOpen, setRoleOpen] = useState(false);

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
              Stefanos Michelakis<span ref={stopRef} className="hero-stop text-accent">.</span>
            </span>
          </span>
        </h1>
      </div>

      <p className="animate-reveal-up animate-delay-300 max-w-[820px] text-[19px] sm:text-[22px] leading-[1.55] text-fg">
        I build React apps and React Native mobile products that ship to real users — with 5+ years
        of production experience and a relentless eye for the small details that make the difference.
      </p>

      <div className="w-full">
        <Experience
          timelineRef={timelineRef}
          onOpenRole={entry => {
            setRole(entry);
            setRoleOpen(true);
          }}
        />
      </div>

      <div className="animate-reveal-up animate-delay-800 flex flex-wrap justify-center items-center gap-x-7 gap-y-4">
        <ButtonLink href="#work">See my work →</ButtonLink>
        <a href="#contact" className="inline-flex items-center min-h-11 font-medium underline-offset-[6px]">
          Get in touch
        </a>
      </div>

      <RoleDialog role={role} open={roleOpen} onClose={() => setRoleOpen(false)} />
    </section>
  );
}
