import type { LucideIcon } from 'lucide-react'

/** Decorative Lucide icon with the app's single size/stroke/alignment style (see .app-icon in App.css). */
export default function AppIcon({ icon: Icon }: { icon: LucideIcon | undefined }) {
  if (!Icon) return null
  return <Icon className="app-icon" size="1em" strokeWidth={2} absoluteStrokeWidth={false} aria-hidden="true" />
}
