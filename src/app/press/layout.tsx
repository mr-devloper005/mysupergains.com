import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/press',
    title: `Press | ${SITE_CONFIG.name}`,
    description: `Press kit, brand assets, and media coverage for ${SITE_CONFIG.name}.`,
    openGraphTitle: `Press | ${SITE_CONFIG.name}`,
    openGraphDescription: `Download logos and read recent coverage about ${SITE_CONFIG.name}.`,
  })
}

export default function PressLayout({ children }: { children: ReactNode }) {
  return children
}
