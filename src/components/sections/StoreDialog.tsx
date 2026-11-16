import { X } from 'lucide-react';
import { Dialog } from '../ui/Dialog';

interface StoreDialogProps {
  gameTitle: string;
  googlePlayUrl: string;
  open: boolean;
  onClose: () => void;
}

const OPTION =
  'w-full min-h-12 px-4 whitespace-nowrap py-[13px] inline-flex items-center justify-center rounded-full border font-medium';

/** Where to get the game: Google Play now, the App Store once it ships. */
export function StoreDialog({ gameTitle, googlePlayUrl, open, onClose }: StoreDialogProps) {
  const titleId = 'store-dialog-title';

  return (
    <Dialog open={open} onClose={onClose} labelledBy={titleId}>
      {/* First in the DOM so it takes the initial focus */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-5 sm:right-5 w-11 h-11 inline-flex items-center justify-center rounded-full border border-line-strong hover:border-dim bg-surface text-fg cursor-pointer"
      >
        <X size={20} strokeWidth={1.8} aria-hidden />
      </button>

      <h2
        id={titleId}
        className="pr-14 font-display font-bold text-[26px] sm:text-[30px] leading-[1.15] tracking-[-0.02em] text-balance"
      >
        Get {gameTitle}
      </h2>

      <div className="mt-6 grid grid-cols-1 min-[360px]:grid-cols-2 items-start gap-3">
        <a
          href={googlePlayUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className={`${OPTION} no-underline border-line-strong hover:border-dim`}
        >
          Google Play ↗<span className="sr-only"> (opens in a new tab)</span>
        </a>

        <div className="flex flex-col items-center gap-1.5">
          <button
            type="button"
            disabled
            aria-describedby="apple-store-note"
            className={`${OPTION} border-line text-dim cursor-not-allowed`}
          >
            Apple Store
          </button>
          <p id="apple-store-note" className="text-sm text-muted">
            Coming Soon
          </p>
        </div>
      </div>
    </Dialog>
  );
}
