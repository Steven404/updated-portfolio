import { X } from 'lucide-react';
import type { Role } from '../../data/experience';
import { Dialog } from '../ui/Dialog';

interface RoleDialogProps {
  role: Role | null;
  open: boolean;
  onClose: () => void;
}

/** What the role involved, opened from its entry in the hero timeline. */
export function RoleDialog({ role, open, onClose }: RoleDialogProps) {
  const titleId = 'role-dialog-title';

  return (
    <Dialog open={open} onClose={onClose} labelledBy={titleId}>
      {role && (
        <>
          {/* First in the DOM so it takes the initial focus */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-11 h-11 inline-flex items-center justify-center rounded-full border border-line-strong hover:border-dim bg-surface text-fg cursor-pointer"
          >
            <X size={20} strokeWidth={1.8} aria-hidden />
          </button>

          <header className="pr-14">
            <div>
              <h2
                id={titleId}
                className="font-display font-bold text-[26px] sm:text-[30px] leading-[1.15] tracking-[-0.02em] text-balance"
              >
                {role.role}
              </h2>
              <a
                href={role.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center min-h-11 -my-2 font-medium underline-offset-4"
              >
                {role.company} ↗<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <p className="mt-1 flex items-center gap-2 text-sm text-fg-2">
                {role.current && (
                  <span className="w-2 h-2 rounded-full bg-accent inline-block" aria-hidden />
                )}
                {role.dates}
              </p>
              <p className="text-sm text-muted">{role.location}</p>
            </div>
          </header>

          <div className="mt-6 pt-6 border-t border-line">
            {role.intro && <p className="text-fg-2 text-pretty">{role.intro}</p>}
            <ul className={`${role.intro ? 'mt-4' : ''} flex flex-col gap-2.5 text-fg-2`}>
              {role.points.map(point => (
                <li
                  key={point}
                  className="relative pl-5 text-pretty before:absolute before:left-0 before:top-[0.68em] before:w-[5px] before:h-[5px] before:rounded-full before:bg-dim"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2 font-mono text-[13px]" aria-label="Tech used">
            {role.stack.map(tech => (
              <li key={tech} className="border border-line-strong rounded-full px-3 py-[5px]">
                {tech}
              </li>
            ))}
          </ul>
        </>
      )}
    </Dialog>
  );
}
