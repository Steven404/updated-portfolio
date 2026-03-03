const SKILLS = [
  'JavaScript (ES6+)',
  'TypeScript',
  'React',
  'React Native',
  'React Query',
  'Context API',
  'Node.js',
  'Tailwind CSS',
  'Git / GitHub',
  'Figma',
  'Angular',
  'NgRx',
];

export function About() {
  return (
    <section id="about" className="pt-24 bg-gray-800/50">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
          Who am I?
        </h2>

        <p className="text-center text-gray-300 mb-12 text-xl md:text-2xl">
          I'm a young and passionate <strong>Software Engineer</strong>.
        </p>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-6">
            <p className="text-gray-300 text-xl leading-relaxed ">
              With almost 5 years of experience as a front end and full stack software engineer, I specialize in developing fully functional web and mobile applications from start to finish. I strive to create modular and <strong>maintainable</strong> projects that implement cutting edge technologies and practices.
            </p>
            <p className="text-gray-300 text-md leading-relaxed">
              Shortly before graduating, I started my journey as a developer and have been learning and creating ever since.
            </p>
            <p className="text-gray-300 text-xl leading-relaxed ">
               Lately I've been focusing on bulding React Native apps with <strong>offline-first UX</strong>, <strong>fast performance</strong> and <strong className='italic'>scalable coding practices</strong>.
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-sm">
            <h3 className="text-xl font-semibold mb-6 text-white border-b border-gray-800 pb-4">
              Technologies I've been working with:
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {SKILLS.map((skill, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <span className="text-blue-500 mr-3 text-sm">▹</span>
                  <span className="font-medium">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-24 bg-gray-800 flex items-center justify-center py-12 w-full max-md:px-4">
        <p className="text-gray-100 text-center text-2xl">
          Always on the look for new projects and opportunities to grow from
        </p>
      </div>
    </section>
  );
}
