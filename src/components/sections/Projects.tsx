import { useState, useEffect, useRef } from 'react';
import { ExternalLink, AlertCircle, Loader2 } from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

interface PinnedRepoResponse {
  repo: string;
  name: string;
  description: string | null;
}

export function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const pinnedResponse = await fetch('https://pinned.berrysauce.dev/get/Steven404');
        const allReposResponse = await fetch('https://api.github.com/users/Steven404/repos');
        if (!pinnedResponse.ok || !allReposResponse.ok) {
          throw new Error('Failed to fetch pinned repositories');
        }

        const pinnedReposData: PinnedRepoResponse[] = await pinnedResponse.json();
        const allReposData: any[] = await allReposResponse.json();
        console.log(allReposData)
        const pinnedRepos: Repo[] = pinnedReposData.map((repo, index) => ({
          id: index,
          name: repo.name,
          description: repo.description,
          html_url: allReposData.find(r => r.name === repo.name).html_url,
        }));

        setRepos(pinnedRepos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = Array.from(cardsRef.current.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const idx = cards.indexOf(el);
            el.style.animationDelay = `${idx * 100}ms`;
            el.classList.remove('opacity-0');
            el.classList.add('animate-fade-in-up');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [repos]);

  return (
    <section id="projects" className="py-24 bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
          Projects
        </h2>

        <p className="text-center text-gray-300 mb-12 text-xl">
          My pinned projects on GitHub.
        </p>

        {loading && (
          <div className="flex justify-center items-center py-24 text-blue-500">
            <Loader2 size={48} className="animate-spin" />
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-24 text-red-400 gap-4">
            <AlertCircle size={48} />
            <p className="text-lg">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {repos.map((repo) => (
                <div key={repo.id} className="opacity-0 bg-gray-800/40 rounded-xl border border-gray-800 p-8 flex flex-col h-full hover:border-blue-500/50 hover:bg-gray-800/80 transition-all duration-300">
                  <h3 className="text-xl font-bold text-white mb-4 capitalize">
                    {repo.name.replace(/-/g, ' ')}
                  </h3>
                  <p className="text-gray-400 flex-grow mb-8 leading-relaxed">
                    {repo.description || 'No description provided for this repository.'}
                  </p>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors mt-auto w-fit"
                  >
                    View Repository <ExternalLink size={16} />
                  </a>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <a
                href="https://github.com/Steven404"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3.5 border border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:text-blue-300 font-medium rounded-lg transition-colors"
              >
                View Profile on GitHub
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
