import { useEffect, useRef } from 'react';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';

const SKILLS = [
  'JavaScript (ES6+)', 'TypeScript', 'React', 'React Native',
  'React Query', 'Context API', 'Node.js', 'Tailwind CSS',
  'Git / GitHub', 'Figma', 'Angular', 'NgRx',
];

export function About() {
  const headingRef = useScrollFadeIn();
  const subtitleRef = useScrollFadeIn();
  const bioRef = useScrollFadeIn(0.1);
  const skillsRef = useScrollFadeIn(0.1);
  const bannerRef = useScrollFadeIn(0.1);
  const skillsListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ul = skillsListRef.current;
    if (!ul) return;
    const items = Array.from(ul.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const idx = items.indexOf(el);
            el.style.animationDelay = `${idx * 60}ms`;
            el.classList.remove('opacity-0');
            el.classList.add('animate-fade-in-up');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="pt-24 bg-gray-800/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2
          ref={headingRef as React.RefObject<HTMLHeadingElement>}
          className="opacity-0 text-3xl md:text-4xl font-bold mb-12 text-center text-white"
        >
          Who am I?
        </h2>
        <p
          ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
          className="opacity-0 text-center text-gray-300 mb-12 text-xl md:text-2xl"
        >
          I'm a young and passionate <strong>Software Engineer</strong>.
        </p>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div
            ref={bioRef as React.RefObject<HTMLDivElement>}
            className="opacity-0 space-y-6"
          >
            <p className="text-gray-300 text-xl leading-relaxed">
              With almost 5 years of experience as a front end and full stack software engineer...
            </p>
            <p className="text-gray-300 text-md leading-relaxed">
              Shortly before graduating, I started my journey as a developer...
            </p>
            <p className="text-gray-300 text-xl leading-relaxed">
              Lately I've been focusing on building React Native apps with&nbsp;
              <strong>offline-first UX</strong>, <strong>fast performance</strong>
              and <strong className='italic'>scalable coding practices</strong>.
            </p>
          </div>
          <div
            ref={skillsRef as React.RefObject<HTMLDivElement>}
            className="opacity-0 bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-6 text-white border-b border-gray-800 pb-4">
              Technologies I've been working with:
            </h3>
            <ul ref={skillsListRef} className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {SKILLS.map((skill, index) => (
                <li key={index} className="opacity-0 flex items-center text-gray-300">
                  <span className="text-blue-500 mr-3 text-sm">▹</span>
                  <span className="font-medium">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div
        ref={bannerRef as React.RefObject<HTMLDivElement>}
        className="opacity-0 mt-24 bg-gray-800 flex items-center justify-center py-12 w-full max-md:px-4"
      >
        <p className="text-gray-100 text-center text-2xl">
          Always on the look for new projects and opportunities to grow from
        </p>
      </div>
    </section>
  );
}
