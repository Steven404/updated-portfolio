import { useEffect, useRef, type ReactNode } from 'react';

const CLOSE_MS = 220; // matches the longest exit transition in .dialog

interface DialogProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
}

/**
 * Native modal <dialog> with the site's enter/exit motion. The browser handles
 * the top layer, inert page, focus and Escape; this adds the exit animation
 * (closed only once it has played, in every browser), click-outside to close
 * and the scroll lock (see `.dialog` in index.css).
 */
export function Dialog({ open, onClose, labelledBy, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const pressedBackdrop = useRef(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open) {
      delete dialog.dataset.closing;
      if (!dialog.open) dialog.showModal();
      return;
    }
    if (!dialog.open) return;

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dialog.close();
      return;
    }
    dialog.dataset.closing = '';
    const timer = setTimeout(() => {
      dialog.close();
      delete dialog.dataset.closing;
    }, CLOSE_MS);
    // Reopened mid-exit: the effect re-runs with open=true and keeps it shown
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      className="dialog"
      // Escape: play the exit instead of vanishing
      onCancel={e => {
        e.preventDefault();
        onClose();
      }}
      // Closed by the browser regardless (e.g. a repeated Escape): stay in sync
      onClose={() => {
        if (open) onClose();
      }}
      // The panel fills the dialog box, so a press on the dialog itself is on
      // the backdrop. Both ends must be there, so a text selection dragged out
      // of the panel doesn't close it.
      onPointerDown={e => {
        pressedBackdrop.current = e.target === e.currentTarget;
      }}
      onClick={e => {
        if (pressedBackdrop.current && e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-panel">{children}</div>
    </dialog>
  );
}
