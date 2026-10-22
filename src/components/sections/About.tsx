import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';

const SKILL_GROUPS = [
  { category: 'Mobile',       skills: ['React Native'] },
  { category: 'Frontend',     skills: ['React', 'Angular', 'Tailwind CSS'] },
  { category: 'Languages',    skills: ['TypeScript', 'JavaScript', 'Python'] },
  { category: 'State & Data', skills: ['React Query', 'Context API', 'NgRx'] },
  { category: 'Tooling',      skills: ['Node.js', 'Git / GitHub', 'Figma'] },
];

const EDUCATION = [
  {
    title: 'Computer Engineering',
    detail: 'Technological Educational Institution of Eastern Macedonia and Thrace · Kavala, GR',
  },
  { title: 'Certificate of Proficiency in English', detail: 'Michigan · C2' },
];

export function About() {
  const bioRef    = useScrollFadeIn<HTMLDivElement>(0.05);
  const skillsRef = useScrollFadeIn<HTMLDivElement>(0.05);

  return (
    <section id="about" className="border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6 py-24 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-16">
        <div ref={bioRef} className="opacity-0">
          <h2 className="font-display font-bold text-[clamp(36px,5vw,56px)] tracking-[-0.03em] leading-none">
            About
          </h2>
          <p className="mt-8 text-xl leading-[1.55]">
            5+ years building web and mobile products that ship to real users. My focus is React and
            React Native, from architecture through deployment, with a soft spot for good UX and the
            performance details that often get deprioritized.
          </p>
          <p className="mt-5 text-fg-2">
            I started building software shortly before graduating and have worked across client
            products and personal projects ever since. I care about maintainable code and polished
            interfaces in equal measure.
          </p>
          <a
            href="/stefanos-michelakis-cv-english.pdf"
            download
            className="mt-7 inline-flex items-center min-h-11 font-medium"
          >
            Download resume (PDF) ↓
          </a>

          <div className="mt-12">
            <h3 className="inline-block pb-2 border-b-2 border-accent font-mono font-medium text-[13px] tracking-[0.08em] text-fg">
              EDUCATION
            </h3>
          </div>
          <ul className="mt-6 flex flex-col gap-[18px]">
            {EDUCATION.map(({ title, detail }) => (
              <li key={title}>
                <div className="font-semibold leading-[1.4]">{title}</div>
                <div className="mt-0.5 text-sm text-muted">{detail}</div>
              </li>
            ))}
          </ul>
        </div>

        <div ref={skillsRef} className="opacity-0 grid grid-cols-2 gap-x-6 gap-y-8 content-start">
          {SKILL_GROUPS.map(({ category, skills }) => (
            <div key={category}>
              <div className="font-mono text-xs text-muted tracking-[0.08em] uppercase">{category}</div>
              <ul className="mt-2.5 leading-[1.8]">
                {skills.map(skill => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
