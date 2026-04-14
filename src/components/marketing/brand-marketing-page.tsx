'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

type BrandMarketingPageProps = {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
  /** Wider content column for dense layouts */
  wide?: boolean
}

export function BrandMarketingPage({
  eyebrow,
  title,
  description,
  actions,
  children,
  wide = false,
}: BrandMarketingPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.97_0.012_84)_0%,oklch(0.985_0.006_84)_50%,var(--background)_100%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.4] bg-[radial-gradient(ellipse_75%_55%_at_15%_-15%,rgba(0,114,188,0.14),transparent),radial-gradient(ellipse_55%_45%_at_92%_5%,rgba(0,128,128,0.12),transparent),radial-gradient(ellipse_50%_35%_at_48%_105%,rgba(230,81,0,0.09),transparent)]"
            aria-hidden
          />
          <div className={`relative mx-auto px-4 py-14 sm:px-6 lg:px-8 ${wide ? 'max-w-7xl' : 'max-w-6xl'}`}>
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">{eyebrow}</p>
            ) : null}
            <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <h1 className="text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">{title}</h1>
                {description ? (
                  <p className="mt-5 text-base leading-8 text-muted-foreground">{description}</p>
                ) : null}
              </div>
              {actions ? <div className="flex flex-shrink-0 flex-wrap gap-3">{actions}</div> : null}
            </div>
          </div>
        </section>
        <section className={`mx-auto px-4 py-12 sm:px-6 sm:py-14 lg:px-8 ${wide ? 'max-w-7xl' : 'max-w-6xl'}`}>
          {children}
        </section>
      </main>
      <Footer />
    </div>
  )
}
