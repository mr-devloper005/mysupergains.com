import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Linkedin, Mail, MapPin } from 'lucide-react'
import { BrandMarketingPage } from '@/components/marketing/brand-marketing-page'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

const leaders = [
  {
    name: 'Maya Chen',
    role: 'Chief Executive Officer',
    location: 'Singapore · Remote-friendly',
    bio: 'Former product lead for community platforms; obsessed with calm interfaces and measurable trust.',
    initials: 'MC',
    accent: 'from-[#003366] to-[#0072BC]',
  },
  {
    name: 'Jordan Ellis',
    role: 'Head of Product',
    location: 'Austin, TX',
    bio: 'Connects editorial craft with data-informed roadmaps so every release feels intentional.',
    initials: 'JE',
    accent: 'from-[#008080] to-[#40E0D0]',
  },
  {
    name: 'Priya Nair',
    role: 'VP, Engineering',
    location: 'London',
    bio: 'Builds resilient systems for creators who need speed without sacrificing safety.',
    initials: 'PN',
    accent: 'from-[#E65100] to-[#FFB300]',
  },
  {
    name: 'Sam Okonkwo',
    role: 'Creative Director',
    location: 'Lagos · NYC',
    bio: 'Shapes the visual language that keeps our warm palette feeling modern, not nostalgic.',
    initials: 'SO',
    accent: 'from-[#0072BC] to-[#008080]',
  },
]

const teams = [
  {
    name: 'Discovery & Search',
    focus: 'Ranking, filters, and surfacing the right profile or bookmark at the right moment.',
  },
  {
    name: 'Trust & Safety',
    focus: 'Transparent moderation, abuse resistance, and tools that scale with community growth.',
  },
  {
    name: 'Partner Success',
    focus: 'Onboarding publishers, local businesses, and curators who anchor the network.',
  },
]

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/team',
    title: `Team | ${SITE_CONFIG.name}`,
    description: `Meet the people building ${SITE_CONFIG.name}—a cross-functional crew focused on curated discovery, warm design, and dependable infrastructure.`,
    openGraphTitle: `Team | ${SITE_CONFIG.name}`,
    openGraphDescription: `Leadership and craft teams behind ${SITE_CONFIG.name}.`,
  })
}

export default function TeamPage() {
  return (
    <BrandMarketingPage
      wide
      eyebrow="People"
      title="A small team with a wide footprint"
      description={`We are operators, designers, and engineers who believe the best discovery products feel quiet, honest, and fast. ${SITE_CONFIG.name} is built by people who have lived the problem—too much content, not enough context—and chose to fix it together.`}
      actions={
        <>
          <Button asChild className="rounded-full px-6">
            <Link href="/careers" className="inline-flex items-center gap-2">
              View open roles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-full border-border px-6">
            <Link href="/press">Press kit</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {leaders.map((person) => (
          <Card key={person.name} className="border-border bg-card overflow-hidden shadow-[0_20px_50px_rgba(36,23,17,0.06)]">
            <div className={`h-2 bg-gradient-to-r ${person.accent}`} aria-hidden />
            <CardContent className="space-y-4 p-6">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${person.accent} text-sm font-bold text-white shadow-inner`}
                  aria-hidden
                >
                  {person.initials}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{person.name}</h2>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </div>
              </div>
              <p className="flex items-start gap-2 text-xs text-muted-foreground">
                <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                {person.location}
              </p>
              <p className="text-sm leading-7 text-muted-foreground">{person.bio}</p>
              <div className="flex gap-2 pt-2">
                <Button size="icon" variant="outline" className="h-9 w-9 rounded-full border-border" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on LinkedIn`}>
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="icon" variant="outline" className="h-9 w-9 rounded-full border-border" asChild>
                  <Link href="/contact" aria-label={`Email ${SITE_CONFIG.name}`}>
                    <Mail className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">How we work</p>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">Async-first, deeply collaborative.</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              We document decisions, prototype in the open, and reserve synchronous time for creative collisions. Designers pair with engineers early; community
              feedback shapes the roadmap every quarter.
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#0072BC]" aria-hidden />
                Weekly design critiques with rotating hosts from product, support, and trust.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#008080]" aria-hidden />
                Biweekly research readouts so we never lose touch with real curators and readers.
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#FFB300]" aria-hidden />
                Seasonal offsites for strategy, storytelling, and celebrating shipped work.
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {teams.map((t) => (
            <Card key={t.name} className="border-border bg-card transition-transform hover:-translate-y-0.5">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{t.name}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{t.focus}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </BrandMarketingPage>
  )
}
