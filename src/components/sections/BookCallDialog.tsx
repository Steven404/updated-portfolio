import { useEffect, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { X } from 'lucide-react';
import { useTheme, type Theme } from '../../hooks/useTheme';
import { Dialog } from '../ui/Dialog';

const LAYOUT = 'month_view';

// The event types set up on Cal.com, by slug
const LENGTHS = [
  { slug: '15min', label: '15 min' },
  { slug: '30min', label: '30 min' },
] as const;

type Length = (typeof LENGTHS)[number]['slug'];

// Past this, a direct link to Cal.com shows under the spinner
const SLOW_MS = 8000;

// Cal's booking page lives in an iframe that can't see the theme tokens in
// index.css, so it gets their values here
const CAL_VARS = {
  light: {
    'cal-brand': '#1F4E8C', // --accent
    'cal-brand-text': '#FFFFFF', // --on-accent
    'cal-bg': '#FBF9F4', // --surface
    'cal-bg-emphasis': '#E9E4DA', // --surface-2
    'cal-border-booker': '#DAD4C8', // --line
    'cal-border-subtle': '#DAD4C8', // --line
  },
  dark: {
    'cal-brand': '#C6F432', // --accent
    'cal-brand-text': '#141413', // --on-accent
    'cal-bg': '#1E1D1B', // --surface
    'cal-bg-muted': '#1E1D1B', // --surface; Cal's dark booking panel sits on this
    'cal-bg-emphasis': '#3A3934', // --line-strong
    'cal-border-booker': '#2C2B28', // --line
    'cal-border-subtle': '#2C2B28', // --line
  },
};

interface BookCallDialogProps {
  calLink: string;
  open: boolean;
  onClose: () => void;
}

/** Cal.com's booking page for picking a call slot, opened from the contact section. */
export function BookCallDialog({ calLink, open, onClose }: BookCallDialogProps) {
  const titleId = 'book-call-title';
  const { theme } = useTheme();
  const [length, setLength] = useState<Length>('30min');

  // Cal's script loads on the first open, then the pages stay mounted so
  // reopening is instant
  const [started, setStarted] = useState(false);
  if (open && !started) setStarted(true);

  return (
    <Dialog open={open} onClose={onClose} labelledBy={titleId} wide>
      <header className="grid grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto] items-center gap-x-6 gap-y-4">
        {/* First in the DOM so it takes the initial focus */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="col-start-2 md:col-start-3 row-start-1 w-11 h-11 inline-flex items-center justify-center rounded-full border border-line-strong hover:border-dim bg-surface text-fg cursor-pointer"
        >
          <X size={20} strokeWidth={1.8} aria-hidden />
        </button>

        <h2
          id={titleId}
          className="col-start-1 row-start-1 font-display font-bold text-[26px] sm:text-[30px] leading-[1.15] tracking-[-0.02em]"
        >
          Book a call
        </h2>

        <div
          role="radiogroup"
          aria-label="Call length"
          className="col-span-2 md:col-span-1 md:col-start-2 row-start-2 md:row-start-1 justify-self-start relative grid grid-cols-2 p-1 rounded-full border border-line-strong has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-accent"
        >
          <span
            aria-hidden
            className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-fg transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
              length === LENGTHS[1].slug ? 'translate-x-full' : ''
            }`}
          />
          {LENGTHS.map(({ slug, label }) => (
            <label
              key={slug}
              className={`relative min-h-9 px-4 inline-flex items-center justify-center rounded-full text-sm font-medium cursor-pointer transition-colors duration-300 ${
                length === slug ? 'text-ground' : 'text-fg-2 hover:text-fg'
              }`}
            >
              <input
                type="radio"
                name="call-length"
                value={slug}
                checked={length === slug}
                onChange={() => setLength(slug)}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
      </header>

      {/* Both lengths load together and stay mounted, so switching is instant.
          The inactive one sits behind, clipped, so only the active one sets
          the height. 547px is Cal's calendar step at the full dialog width,
          reserved so the dialog doesn't grow as it loads. The negative margin
          takes back the panel padding below the space Cal already leaves
          under its logo. */}
      <div className="relative grid overflow-hidden mt-6 md:[@media(max-height:760px)]:mt-4 -mb-5 min-h-[420px] lg:min-h-[547px]">
        {started &&
          LENGTHS.map(({ slug }) => (
            <BookingPage
              key={`${theme}-${slug}`}
              calLink={`${calLink}/${slug}`}
              namespace={`book-call-${theme}-${slug}`}
              theme={theme}
              active={length === slug}
            />
          ))}
      </div>
    </Dialog>
  );
}

interface BookingPageProps {
  calLink: string;
  namespace: string;
  theme: Theme;
  active: boolean;
}

type Status = 'loading' | 'slow' | 'ready' | 'failed';

/**
 * One Cal.com event's booking page. Cal can't restyle a loaded page, so a
 * theme switch (only possible while the dialog is closed) mounts a fresh one.
 */
function BookingPage({ calLink, namespace, theme, active }: BookingPageProps) {
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    getCalApi({ namespace }).then(cal => {
      cal('ui', { theme, cssVarsPerTheme: CAL_VARS, layout: LAYOUT });
      cal('on', { action: 'linkReady', callback: () => setStatus('ready') });
      cal('on', { action: 'linkFailed', callback: () => setStatus('failed') });
    });
    const timer = setTimeout(() => setStatus(s => (s === 'loading' ? 'slow' : s)), SLOW_MS);
    return () => clearTimeout(timer);
  }, [namespace, theme]);

  const directLink = (
    <a
      href={`https://cal.com/${calLink}`}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium underline-offset-4"
    >
      book on Cal.com ↗<span className="sr-only"> (opens in a new tab)</span>
    </a>
  );

  return (
    <div className={active ? 'relative' : 'invisible absolute inset-x-0 top-0'}>
      <Cal namespace={namespace} calLink={calLink} config={{ theme, layout: LAYOUT }} className="w-full" />

      {status === 'slow' && (
        <p className="absolute inset-x-0 bottom-10 text-center text-sm text-muted">
          Still loading. You can also {directLink}.
        </p>
      )}
      {status === 'failed' && (
        <div className="absolute inset-0 grid place-items-center bg-surface">
          <p className="text-fg-2">The calendar didn’t load. You can still {directLink}.</p>
        </div>
      )}
    </div>
  );
}
