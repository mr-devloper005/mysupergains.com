import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Bookmark, Compass, Sparkles, Target, Users } from 'lucide-react'
import { BrandMarketingPage } from '@/components/marketing/brand-marketing-page'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

const pillars = [
  {
    title: 'Clarity over noise',
    body: 'We strip away endless feeds so you can see what matters—curated profiles, trustworthy bookmarks, and surfaces that respect your attention.',
    icon: Compass,
  },
  {
    title: 'Built for real teams',
    body: 'Whether you publish, list, or collect, the same calm system keeps collaborators aligned without forcing everyone into one rigid workflow.',
    icon: Users,
  },
  {
    title: 'Momentum with purpose',
    body: 'Every screen is tuned for the next sensible action: save, share, follow up, or go deeper—without dark patterns or distraction.',
    icon: Target,
  },
]

const milestones = [
  { year: '2022', label: 'First collections shipped', detail: 'Social bookmarking and shelves became the heart of the product.' },
  { year: '2024', label: 'Profiles & trust cues', detail: 'Identity-rich profiles helped communities recognize who stands behind each post.' },
  { year: '2026', label: 'Unified discovery', detail: 'One warm, editorial shell now ties listings, media, and bookmarks together.' },
]

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/about',
    title: `About ${SITE_CONFIG.name}`,
    description: `${SITE_CONFIG.name} helps people discover, save, and share what matters—with a calm, cream-toned experience and room for every kind of creator.`,
    openGraphTitle: `About ${SITE_CONFIG.name}`,
    openGraphDescription: `Learn how ${SITE_CONFIG.name} blends curated discovery with human-centered design.`,
  })
}

export default function AboutPage() {
  return (
    <BrandMarketingPage
      eyebrow="Company"
      title={`The story behind ${SITE_CONFIG.name}`}
      description={`We exist to make discovery feel human again: warm surfaces, honest metadata, and tools that help you grow without burning out. ${SITE_CONFIG.name} is where bookmarking, profiles, and publishing meet in one thoughtful place.`}
      actions={
        <>
          <Button asChild className="rounded-full px-6">
            <Link href="/team" className="inline-flex items-center gap-2">
              Meet the team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-full border-border px-6">
            <Link href="/contact">Talk to us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <Card className="overflow-hidden border-border bg-card shadow-[0_24px_60px_rgba(36,23,17,0.06)]">
          <CardContent className="space-y-6 p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-[#0072BC]" />
              Why we build
            </div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
              A single home for the links, people, and stories your community relies on.
            </h2>
            <p className="text-sm leading-7 text-muted-foreground">
              {SITE_CONFIG.name} started as a reaction to cluttered timelines and anonymous noise. Today we pair editorial calm with practical discovery—so
              visitors can move from inspiration to action in fewer steps, on a canvas that feels as welcoming as a well-lit reading room.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { value: '180k+', label: 'Resources saved' },
                { value: '12k+', label: 'Active curators' },
                { value: '40+', label: 'Focus categories' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border bg-background/80 p-4">
                  <p className="text-2xl font-semibold tracking-tight text-foreground">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <Card key={pillar.title} className="border-border bg-card transition-shadow hover:shadow-[0_18px_48px_rgba(36,23,17,0.07)]">
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,rgba(0,114,188,0.12),rgba(0,128,128,0.1),rgba(255,179,0,0.08))]">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{pillar.body}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="mt-14 rounded-[2rem] border border-border bg-[linear-gradient(120deg,rgba(0,51,102,0.06),rgba(0,128,128,0.05),rgba(255,179,0,0.06))] p-8 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Roadmap highlights</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">Measured progress, shared openly.</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              We ship in public rhythms—small upgrades that compound—so the platform stays fast, accessible, and worthy of the communities that trust us.
            </p>
          </div>
          <Button variant="secondary" asChild className="rounded-full px-6">
            <Link href="/blog" className="inline-flex items-center gap-2">
              Read updates
              <Bookmark className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {milestones.map((m) => (
            <div key={m.year} className="rounded-2xl border border-border/80 bg-card/90 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0072BC]">{m.year}</p>
              <p className="mt-2 font-semibold text-foreground">{m.label}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{m.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </BrandMarketingPage>
  )
}
