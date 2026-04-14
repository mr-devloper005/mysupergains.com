import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, Heart, Laptop, Shield } from 'lucide-react'
import { BrandMarketingPage } from '@/components/marketing/brand-marketing-page'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

const roles = [
  {
    title: 'Senior Product Designer',
    location: 'Remote · EU or US East',
    type: 'Full-time',
    level: 'Senior',
    summary: 'Own end-to-end flows for bookmark collections, profiles, and editorial surfaces in our warm design system.',
  },
  {
    title: 'Staff Frontend Engineer',
    location: 'Hybrid · New York',
    type: 'Full-time',
    level: 'Staff',
    summary: 'Lead performance, accessibility, and component architecture across Next.js and our shared UI kit.',
  },
  {
    title: 'Developer Advocate',
    location: 'Remote',
    type: 'Full-time',
    level: 'Mid',
    summary: `Help partners embed ${SITE_CONFIG.name} patterns, ship sample integrations, and grow a thoughtful builder community.`,
  },
  {
    title: 'Community Programs Lead',
    location: 'Remote · APAC preferred',
    type: 'Full-time',
    level: 'Lead',
    summary: 'Design ambassador programs, curator spotlights, and education series that scale human support.',
  },
]

const perks = [
  { icon: Laptop, title: 'Remote-first stipend', body: 'Home office budget, coworking passes, and ergonomic gear reimbursements.' },
  { icon: Heart, title: 'Care for people', body: 'Medical, dental, vision, and mental health coverage with family-inclusive options.' },
  { icon: Clock, title: 'Sustainable pace', body: 'Minimum vacation, no-meeting Fridays, and explicit focus blocks on the calendar.' },
  { icon: Shield, title: 'Long-term equity', body: 'Meaningful ownership so you share in the upside of calmer discovery.' },
]

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/careers',
    title: `Careers | ${SITE_CONFIG.name}`,
    description: `Join ${SITE_CONFIG.name} and help build curated discovery, warm product craft, and infrastructure creators trust.`,
    openGraphTitle: `Careers | ${SITE_CONFIG.name}`,
    openGraphDescription: `Open roles and benefits at ${SITE_CONFIG.name}.`,
  })
}

export default function CareersPage() {
  return (
    <BrandMarketingPage
      eyebrow="Careers"
      title="Build the calmest discovery network on the open web"
      description={`${SITE_CONFIG.name} is hiring kind, rigorous people who care about typography, latency, and the humans on the other side of the screen. If that sounds like you, we would love to meet.`}
      actions={
        <Button asChild className="rounded-full px-6">
          <Link href="/contact" className="inline-flex items-center gap-2">
            Introduce yourself
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          {roles.map((role) => (
            <Card key={role.title} className="border-border bg-card transition-shadow hover:shadow-[0_20px_50px_rgba(36,23,17,0.07)]">
              <CardContent className="p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    {role.level}
                  </Badge>
                  <Badge variant="outline" className="rounded-full border-border">
                    {role.type}
                  </Badge>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-foreground">{role.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{role.location}</p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{role.summary}</p>
                <Button variant="outline" className="mt-5 rounded-full border-border" asChild>
                  <Link href="/contact">Apply for this role</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Card className="border-border bg-[linear-gradient(180deg,var(--card)_0%,oklch(0.99_0.008_84)_100%)]">
            <CardContent className="space-y-4 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Benefits</p>
              <h3 className="text-xl font-semibold text-foreground">What you can count on</h3>
              <p className="text-sm leading-7 text-muted-foreground">
                We invest in total rewards that respect different life stages—because sustainable teams ship better work.
              </p>
            </CardContent>
          </Card>
          {perks.map((perk) => {
            const Icon = perk.icon
            return (
              <Card key={perk.title} className="border-border bg-card">
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-secondary">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{perk.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{perk.body}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="mt-14 rounded-[2rem] border border-dashed border-border bg-secondary/30 p-8 text-center sm:p-10">
        <p className="text-sm font-medium text-foreground">Do not see the perfect fit?</p>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          Send us a note with work you are proud of—we regularly open roles for exceptional generalists who thrive in small, senior groups.
        </p>
        <Button className="mt-6 rounded-full px-6" asChild>
          <Link href="/contact">Start a conversation</Link>
        </Button>
      </div>
    </BrandMarketingPage>
  )
}
