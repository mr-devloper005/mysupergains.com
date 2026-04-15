'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import { BrandMarketingPage } from '@/components/marketing/brand-marketing-page'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <BrandMarketingPage
      wide
      eyebrow="Media"
      title="Press & brand resources"
      description="Download approved logos, product imagery, and narrative guidance. Our team answers media requests quickly—reach out if you need a spokesperson, data point, or custom asset."
      actions={
        <>
          <Button asChild className="rounded-full px-6">
            <Link href="/contact" className="inline-flex items-center gap-2">
              Contact press
              <Mail className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="rounded-full border-border px-6">
            <Link href="/about" className="inline-flex items-center gap-2">
              About the company
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <Card className="border-border bg-card shadow-[0_22px_55px_rgba(36,23,17,0.06)]">
          <CardContent className="space-y-5 p-7 sm:p-8">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Press kit downloads</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Use these files for articles, conference decks, and partner announcements. Prefer PNG for digital and SVG where vector clarity matters.
              </p>
            </div>
            <div className="grid gap-3">
              {mockPressAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="rounded-2xl border border-border bg-secondary/35 px-4 py-4 transition-colors hover:bg-secondary/50 sm:px-5"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-medium text-foreground">{asset.title}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{asset.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="rounded-full">
                        {asset.fileType}
                      </Badge>
                      <Button size="sm" variant="outline" className="rounded-full border-border" onClick={() => setActiveAssetId(asset.id)}>
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className="rounded-full"
                        onClick={() =>
                          toast({
                            title: 'Download started',
                            description: `${asset.title} is downloading.`,
                          })
                        }
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Recent coverage</p>
          {mockPressCoverage.map((item) => (
            <Card key={item.id} className="border-border bg-card transition-transform hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(36,23,17,0.06)]">
              <CardContent className="p-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{item.outlet}</div>
                <p className="mt-3 text-base font-medium leading-snug text-foreground">{item.headline}</p>
                <p className="mt-2 text-xs text-muted-foreground">{item.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-muted">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          )}
          <p className="text-sm text-muted-foreground">{activeAsset?.description}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </BrandMarketingPage>
  )
}
