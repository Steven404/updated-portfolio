import type { AnchorHTMLAttributes } from 'react';

const VARIANTS = {
  primary:
    'px-[26px] py-3.5 bg-accent text-on-accent font-semibold transition-[filter] hover:brightness-110',
  secondary: 'px-6 py-[13px] border border-line-strong hover:border-dim font-medium',
};

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: keyof typeof VARIANTS;
}

/** A link styled as the site's pill button. */
export function ButtonLink({ variant = 'primary', className = '', ...props }: ButtonLinkProps) {
  return (
    <a
      className={`no-underline inline-flex items-center min-h-12 rounded-full ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}
