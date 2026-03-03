export function Hero() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-20 bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-white">
         <span className="text-blue-500">Stefanos Michelakis</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Frontend Software Engineer focused on React and React Native technologies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors border border-gray-700"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}
