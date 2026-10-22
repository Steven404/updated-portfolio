import { useState } from 'react';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';
import { useTheme } from '../../hooks/useTheme';
import { ScreenshotCarousel, type Screenshot } from '../ui/ScreenshotCarousel';

interface ProjectLink {
  label: string;
  href: string;
}

interface ProjectInfo {
  kicker: string;
  title: string;
  description?: string;
  tags: string[];
  links: ProjectLink[];
}

const NOTES_SHOT_ALTS = [
  'Rich-text editor with a grocery list and a formatting toolbar above the keyboard',
  'A saved recipe note with headings and bullet lists',
  'Tasks screen with a checklist, two of four tasks done',
  'Empty notes screen with an illustration and a button to add a note',
];

const NOTES_SHOTS: Record<'light' | 'dark', Screenshot[]> = {
  dark:  NOTES_SHOT_ALTS.map((alt, i) => ({ src: `/images/notes-dark-${i + 1}.webp`, alt })),
  light: NOTES_SHOT_ALTS.map((alt, i) => ({ src: `/images/notes-light-${i + 1}.webp`, alt })),
};

const NOTES_APP: ProjectInfo = {
  kicker: '01 — MOBILE',
  title: 'Offline Notes App',
  description: 'A notes and tasks app built with React Native that works fully offline.',
  tags: ['React Native', 'TypeScript'],
  links: [{ label: 'Source', href: 'https://github.com/Steven404/offline-notes-app' }],
};

const PLATFORMER: ProjectInfo = {
  kicker: '02 — GAME',
  title: '2D Platformer',
  description: 'A complete 2D platformer built in Unity with C#. Every sprite hand-drawn in Photoshop.',
  tags: ['Unity', 'C#', 'Pixel art'],
  links: [{ label: 'Source', href: 'https://github.com/Steven404/2D-Platformer' }],
};

const LANGUAGE_TEACHER: ProjectInfo = {
  kicker: '03 — WEB',
  title: 'Language Teacher Portfolio',
  tags: ['React', 'Next.js', 'Tailwind CSS'],
  description: 'A portfolio website for a language teacher built with Next.js.',
  links: [{ label: 'Source', href: 'https://github.com/Steven404/thalia-portfolio' }],
};

function ProjectDetails({ project, large = false }: { project: ProjectInfo; large?: boolean }) {
  return (
    <div>
      <div className="font-mono text-[13px] text-accent tracking-[0.06em]">{project.kicker}</div>
      <h3
        className={`font-display font-bold tracking-[-0.02em] ${
          large ? 'mt-3.5 text-4xl leading-[1.1]' : 'mt-3 text-[28px] leading-[1.15]'
        }`}
      >
        {project.title}
      </h3>
      {project.description && (
        <p className={`${large ? 'mt-4' : 'mt-3'} text-fg-2`}>{project.description}</p>
      )}
      <ul className={`${large ? 'mt-6' : 'mt-5'} flex flex-wrap gap-2 font-mono text-[13px]`}>
        {project.tags.map(tag => (
          <li key={tag} className="border border-line-strong rounded-full px-3 py-[5px]">
            {tag}
          </li>
        ))}
      </ul>
      <div className={`${large ? 'mt-7' : 'mt-6'} flex flex-wrap gap-6 font-medium`}>
        {project.links.map(({ label, href }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer">
            {label} ↗
          </a>
        ))}
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

        {/* Project 01 */}
        <article
          ref={featuredRef}
          className="opacity-0 mt-16 p-5 sm:p-10 bg-surface border border-line rounded-[20px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-12 items-center"
        >
          <ScreenshotCarousel shots={NOTES_SHOTS[theme]} label="Offline Notes App screenshots" />
          <ProjectDetails project={NOTES_APP} large />
        </article>

        {/* Project 02 + 03 */}
        <div
          ref={gridRef}
          className="opacity-0 mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-6"
        >
          <article className="p-6 sm:p-8 bg-surface border border-line rounded-[20px] flex flex-col gap-6">
            <PlatformerVideo />
            <ProjectDetails project={PLATFORMER} />
          </article>

          <article className="p-6 sm:p-8 bg-surface border border-line rounded-[20px] flex flex-col gap-6">
            <div className="aspect-video rounded-xl bg-surface-2 border border-line flex flex-col overflow-hidden">
              <div className="h-7 shrink-0 border-b border-line flex items-center gap-1.5 px-3" aria-hidden>
                <span className="w-2 h-2 rounded-full bg-line-strong" />
                <span className="w-2 h-2 rounded-full bg-line-strong" />
                <span className="w-2 h-2 rounded-full bg-line-strong" />
              </div>
              <div className="grow min-h-0 bg-[#FEF5EA]">
                <img
                  src="/images/language-teacher.webp"
                  alt="Homepage of the language teacher site: headline “Your English Learning Journey Starts Here.” beside the English Lessons logo"
                  width={1100}
                  height={573}
                  loading="lazy"
                  decoding="async"
                  className="block w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <ProjectDetails project={LANGUAGE_TEACHER} />
          </article>
        </div>
      </div>
    </section>
  );
}
