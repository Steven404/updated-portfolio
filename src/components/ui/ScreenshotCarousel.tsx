import { useRef, useState, type KeyboardEvent, type ReactNode, type TouchEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Theme } from '../../hooks/useTheme';

/** The same screen captured in each theme */
export interface Screenshot {
  alt: string;
  light: string;
  dark: string;
}

const SWIPE_THRESHOLD = 40;

function ArrowButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="shrink-0 w-11 h-11 inline-flex items-center justify-center rounded-full border border-line-strong hover:border-dim bg-surface text-fg cursor-pointer"
    >
      {children}
    </button>
  );
}

interface ScreenshotCarouselProps {
  shots: Screenshot[];
  theme: Theme;
  label: string;
}

/**
 * Phone-framed screenshot carousel: arrows, dots, swipe and Left/Right keys.
 * Both theme captures stay mounted, light stacked over dark. A theme switch
 * fades only the light layer (`.theme-crossfade` in index.css, which only
 * transitions during the switch), so the screen never dips through two
 * half-transparent images; a slide change fades the whole slide.
 */
export function ScreenshotCarousel({ shots, theme, label }: ScreenshotCarouselProps) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const count = shots.length;
  const go = (index: number) => setCurrent((index + count) % count);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(current - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(current + 1);
    }
  };

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) >= SWIPE_THRESHOLD) go(dx < 0 ? current + 1 : current - 1);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="flex flex-col items-center gap-5 rounded-[14px] py-2 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="flex w-full items-center justify-center gap-3 sm:gap-5">
        <ArrowButton label="Previous screenshot" onClick={() => go(current - 1)}>
          <ChevronLeft size={20} strokeWidth={1.8} aria-hidden />
        </ArrowButton>

        <div
          className="w-full min-w-0 max-w-[240px] aspect-[12/25] rounded-[40px] border border-line-strong bg-surface p-3 touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative h-full rounded-[30px] overflow-hidden bg-screen">
            {shots.map((shot, i) => {
              const isCurrent = i === current;
              return (
                // Slide changes fade the whole slide as one picture, so the
                // dark capture under the light one never shows through
                <div
                  key={shot.dark}
                  aria-hidden={!isCurrent}
                  className={`absolute inset-0 transition-opacity duration-250 ease-out motion-reduce:transition-none ${
                    isCurrent ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {(['dark', 'light'] as const).map(layer => (
                    <img
                      key={layer}
                      src={shot[layer]}
                      // Only the capture for the current theme is announced
                      alt={layer === theme ? shot.alt : ''}
                      aria-hidden={layer !== theme}
                      width={432}
                      height={911}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      draggable={false}
                      className={`absolute inset-0 w-full h-full object-cover object-top select-none ${
                        layer === 'light' ? `theme-crossfade ${theme === 'light' ? 'opacity-100' : 'opacity-0'}` : ''
                      }`}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <ArrowButton label="Next screenshot" onClick={() => go(current + 1)}>
          <ChevronRight size={20} strokeWidth={1.8} aria-hidden />
        </ArrowButton>
      </div>

      <div className="flex items-center gap-0.5">
        {shots.map((shot, i) => (
          <button
            key={shot.dark}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show screenshot ${i + 1} of ${count}`}
            aria-current={i === current}
            className="w-7 h-7 inline-flex items-center justify-center cursor-pointer"
          >
            <span
              className={`block h-2 rounded-full transition-[width,background-color] duration-250 ease-out motion-reduce:transition-none ${
                i === current ? 'w-5 bg-accent' : 'w-2 bg-dim'
              }`}
              aria-hidden
            />
          </button>
        ))}
      </div>
    </div>
  );
}
