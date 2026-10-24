import { useState } from 'react';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';
import { useTheme } from '../../hooks/useTheme';
import { ButtonLink } from '../ui/ButtonLink';
import { ScreenshotCarousel, type Screenshot } from '../ui/ScreenshotCarousel';

interface ProjectLink {
  label: string;
  href: string;
  /** The project's main action, shown as a pill */
  primary?: boolean;
}

interface ProjectInfo {
  title: string;
  description?: string;
  links: ProjectLink[];
}

const NOTES_SHOT_ALTS = [
  'Rich-text editor with a grocery list and a formatting toolbar above the keyboard',
  'A saved recipe note with headings and bullet lists',
  'Tasks screen with a checklist, two of four tasks done',
  'Empty notes screen with an illustration and a button to add a note',
];

const NOTES_SHOTS: Screenshot[] = NOTES_SHOT_ALTS.map((alt, i) => ({
  alt,
  dark: `/images/notes-dark-${i + 1}.webp`,
  light: `/images/notes-light-${i + 1}.webp`,
}));

const NOTES_APP: ProjectInfo = {
  title: 'Offline Notes App',
  description:
    'A notes and tasks app I built in React Native and TypeScript that works fully offline. Everything is stored on the device with AsyncStorage, and I used Reanimated to keep the interface smooth.',
  links: [{ label: 'Source on GitHub', href: 'https://github.com/Steven404/offline-notes-app' }],
};

const PLATFORMER: ProjectInfo = {
  title: '2D Platformer',
  description:
    'A complete 2D platformer in Unity and C#. Pixel art made by hand in photoshop.',
  links: [{ label: 'Source on GitHub', href: 'https://github.com/Steven404/2D-Platformer' }],
};

const LANGUAGE_TEACHER: ProjectInfo = {
  title: 'Language Teacher Portfolio',
  links: [
    { label: 'Visit the live site', href: 'https://english-with-thalia.site/', primary: true },
    { label: 'Source on GitHub', href: 'https://github.com/Steven404/thalia-portfolio' },
  ],
};

function ProjectDetails({ project, large = false }: { project: ProjectInfo; large?: boolean }) {
  return (
    <div>
      {/* The hero's accent full stop closes every project title */}
      <h3
        className={`font-display font-bold tracking-[-0.025em] text-balance ${
          large ? 'text-[clamp(32px,4vw,44px)] leading-[1.05]' : 'text-[30px] leading-[1.1]'
        }`}
      >
        {project.title}
        <span className="text-accent">.</span>
      </h3>
      {project.description && (
        <p className={`mt-4 text-fg-2 text-pretty ${large ? 'text-lg max-w-[46ch]' : 'max-w-[52ch]'}`}>
          {project.description}
        </p>
      )}
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        {project.links.map(({ label, href, primary }) => {
          const content = (
            <>
              {label} ↗<span className="sr-only">, {project.title} (opens in a new tab)</span>
            </>
          );
          return primary ? (
            <ButtonLink key={href} href={href} target="_blank" rel="noopener noreferrer" variant="secondary">
              {content}
            </ButtonLink>
          ) : (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-11 font-medium underline-offset-4"
            >
              {content}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function PlatformerVideo() {
  const [reduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  return (
    <video
      src="/images/platformer.mp4"
      poster="/images/platformer-poster.webp"
      aria-label="Gameplay from the 2D platformer: a pixel-art character running and jumping across snow, rain and forest levels while collecting coins"
      autoPlay={!reduceMotion}
      controls={reduceMotion}
      muted
      loop
      playsInline
      preload="metadata"
      width={640}
      height={360}
      className="block w-full h-auto aspect-video object-cover rounded-xl border border-line [image-rendering:pixelated]"
    />
  );
}

export function Projects() {
  const { theme } = useTheme();
  const headingRef = useScrollFadeIn<HTMLDivElement>();
  const featuredRef = useScrollFadeIn<HTMLElement>(0.05);
  const gridRef = useScrollFadeIn<HTMLDivElement>(0.05);

  return (
    <section id="work" className="border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <div ref={headingRef} className="opacity-0 flex flex-wrap justify-between items-baseline gap-4">
          <h2 className="font-display font-bold text-[clamp(36px,5vw,56px)] tracking-[-0.03em] leading-none">
            Selected work
          </h2>
          <a
            href="https://github.com/Steven404"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] text-muted hover:text-accent"
          >
            All projects on GitHub ↗
          </a>
        </div>

        {/* Open layout split by hairline rules, like About and Contact */}
        <article
          ref={featuredRef}
          className="opacity-0 mt-14 pt-12 border-t border-line grid gap-10 md:grid-cols-2 md:gap-16 items-center"
        >
          {/* Phones: say what it is before showing it */}
          <div className="md:order-2">
            <ProjectDetails project={NOTES_APP} large />
          </div>
          <div className="md:order-1">
            <ScreenshotCarousel shots={NOTES_SHOTS} theme={theme} label="Offline Notes App screenshots" />
          </div>
        </article>

        <div ref={gridRef} className="opacity-0 mt-16 grid gap-x-12 gap-y-16 md:grid-cols-2">
          <article className="pt-12 border-t border-line flex flex-col gap-8">
            <PlatformerVideo />
            <ProjectDetails project={PLATFORMER} />
          </article>

          <article className="pt-12 border-t border-line flex flex-col gap-8">
            <img
              src="/images/language-teacher.webp"
              alt="Homepage of the language teacher site: headline “Your English Learning Journey Starts Here.” beside the English Lessons logo"
              width={1100}
              height={573}
              loading="lazy"
              decoding="async"
              className="block w-full aspect-video object-cover object-top rounded-xl border border-line"
            />
            <ProjectDetails project={LANGUAGE_TEACHER} />
          </article>
        </div>
      </div>
    </section>
  );
}
