'use client'
import { useEffect } from 'react'
import { trackVisit } from '@/components/ui/RecentlyVisited'

export default function TrackVisit({ label, href }: { label: string; href: string }) {
  useEffect(() => { trackVisit(label, href) }, [label, href])
  return null
}
