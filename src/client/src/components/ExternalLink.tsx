import type { ComponentPropsWithoutRef } from 'react'

type ExternalLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'rel' | 'target'>

export const ExternalLink = ({ children, className, ...props }: ExternalLinkProps) => {
  const suppliedLabel = props['aria-label']
  const accessibleLabel = suppliedLabel === undefined
    ? undefined
    : `${suppliedLabel} (opens in a new tab)`

  return (
    <a
      {...props}
      aria-label={accessibleLabel}
      className={['external-link', className].filter(Boolean).join(' ')}
      rel="noreferrer noopener"
      target="_blank"
    >
      {children}
      <svg className="external-link__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M9.25 2.25h4.5v4.5M13.5 2.5l-6.25 6.25M12.75 9v3.25a1.5 1.5 0 0 1-1.5 1.5h-7.5a1.5 1.5 0 0 1-1.5-1.5v-7.5a1.5 1.5 0 0 1 1.5-1.5H7" />
      </svg>
      {suppliedLabel === undefined ? <>{' '}<span className="visually-hidden">(opens in a new tab)</span></> : null}
    </a>
  )
}
