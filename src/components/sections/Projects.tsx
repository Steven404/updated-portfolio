import { useState, useEffect, useRef } from 'react';
import { AlertCircle, ArrowUpRight, Loader2 } from 'lucide-react';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';

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
  const [repos, setRepos]     = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const headingRef = useScrollFadeIn();
  const listRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const pinnedResponse   = await fetch('https://pinned.berrysauce.dev/get/Steven404');
        const allReposResponse = await fetch('https://api.github.com/users/Steven404/repos');
        if (!pinnedResponse.ok || !allReposResponse.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const pinnedReposData: PinnedRepoResponse[] = await pinnedResponse.json();
        const allReposData: { name: string; html_url: string }[] = await allReposResponse.json();

        const pinnedRepos: Repo[] = pinnedReposData.map((repo, index) => ({
          id: index,
          name: repo.name,
          description: repo.description,
          html_url: allReposData.find(r => r.name === repo.name)?.html_url ?? `https://github.com/Steven404/${repo.name}`,
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

  /* Staggered reveal for list rows */
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    const rows = Array.from(container.querySelectorAll<HTMLElement>('[data-project-row]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el  = entry.target as HTMLElement;
            const idx = rows.indexOf(el);
            el.style.animationDelay = `${idx * 75}ms`;
            el.classList.remove('opacity-0');
            el.classList.add('animate-fade-in-up');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.05 }
    );
    rows.forEach(row => observer.observe(row));
    return () => observer.disconnect();
  }, [repos]);

  return (
    <section id="projects" className="relative py-28 lg:py-36 overflow-hidden bg-deep">
      {/* Very subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, #0FA4AF 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-16 xl:px-20">

        {/* Header row */}
        <div className="flex items-end justify-between mb-16 lg:mb-20 gap-6">
          <h2
            ref={headingRef as React.RefObject<HTMLHeadingElement>}
            className="opacity-0"
            style={{
              fontFamily: '"Bricolage Grotesque", sans-serif',
              fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              color: '#AFDDE5',
              textWrap: 'balance',
            }}
          >
            Selected work<span style={{ color: '#964734' }}>.</span>
          </h2>
          <a
            href="https://github.com/Steven404"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 shrink-0 mb-1.5"
            style={{ color: 'rgba(175,221,229,0.45)', fontFamily: '"Figtree", sans-serif' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#AFDDE5'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(175,221,229,0.45)'; }}
          >
            All projects on GitHub
            <ArrowUpRight size={14} aria-hidden />
          </a>
        </div>

        {/* States */}
        {loading && (
          <div className="flex justify-center items-center py-28" style={{ color: '#0FA4AF' }}>
            <Loader2 size={38} className="animate-spin" />
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-28 gap-4" style={{ color: '#964734' }}>
            <AlertCircle size={38} />
            <p className="text-base" style={{ fontFamily: '"Figtree", sans-serif' }}>{error}</p>
          </div>
        )}

        {/* Editorial list */}
        {!loading && !error && (
          <>
            <div
              ref={listRef}
              style={{ borderTop: '1px solid rgba(2,73,80,0.55)' }}
            >
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  data-project-row
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group opacity-0 flex items-start justify-between gap-8 py-8 transition-colors duration-300"
                  style={{ borderBottom: '1px solid rgba(2,73,80,0.55)' }}
                  aria-label={`View ${repo.name.replace(/-/g, ' ')} on GitHub`}
                >
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-2xl font-bold capitalize mb-3 transition-colors duration-200 group-hover:text-teal"
                      style={{
                        fontFamily: '"Bricolage Grotesque", sans-serif',
                        letterSpacing: '-0.03em',
                        color: '#AFDDE5',
                      }}
                    >
                      {repo.name.replace(/-/g, ' ')}
                    </h3>
                    <p
                      className="leading-relaxed"
                      style={{
                        color: 'rgba(175,221,229,0.5)',
                        fontFamily: '"Figtree", sans-serif',
                        maxWidth: '60ch',
                      }}
                    >
                      {repo.description ?? 'No description provided for this repository.'}
                    </p>
                  </div>

                  {/* Arrow affordance */}
                  <div
                    className="shrink-0 mt-1 p-2.5 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                    style={{ background: 'rgba(15,164,175,0.12)', color: '#0FA4AF' }}
                    aria-hidden
                  >
                    <ArrowUpRight size={18} />
                  </div>
                </a>
              ))}
            </div>

            {/* Mobile GitHub link */}
            <div className="sm:hidden text-center mt-12">
              <a
                href="https://github.com/Steven404"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium"
                style={{ color: 'rgba(175,221,229,0.45)', fontFamily: '"Figtree", sans-serif' }}
              >
                All projects on GitHub
                <ArrowUpRight size={14} aria-hidden />
              </a>
            </div>
          </>
        )}

      </div>
    </section>
  );
}
