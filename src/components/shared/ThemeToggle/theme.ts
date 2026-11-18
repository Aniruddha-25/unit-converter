export type Theme = 'light' | 'dark'

const ANIMATION_MS = 300
const LIGHT_START_HOUR = 6 
const DARK_START_HOUR = 18 

const root = document.documentElement
const listeners = new Set<() => void>()

const isTheme = (value: unknown): value is Theme => value === 'light' || value === 'dark'

/** The theme for the user's local clock. Keep in sync with the inline script in index.html. */
const timeTheme = (date = new Date()): Theme => {
  const hour = date.getHours()
  return hour >= LIGHT_START_HOUR && hour < DARK_START_HOUR ? 'light' : 'dark'
}

let current: Theme = isTheme(root.dataset.theme) ? root.dataset.theme : timeTheme()
/** Set once the user picks a theme; from then on the clock no longer changes it. Not persisted, so a reload resets it. */
let manual = false
let animationTimer: ReturnType<typeof setTimeout> | undefined
let boundaryTimer: ReturnType<typeof setTimeout> | undefined

/** Sets data-theme on <html>; every colour in the app comes from the CSS variables that attribute selects. */
function apply(next: Theme, animate: boolean) {
  if (animate && next !== current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('theme-anim') // a short colour transition while switching
    clearTimeout(animationTimer)
    animationTimer = setTimeout(() => root.classList.remove('theme-anim'), ANIMATION_MS)
  }
  root.dataset.theme = next
  if (next === current) return
  current = next
  listeners.forEach((notify) => notify())
}

/** One timer, set for the next 06:00 / 18:00 (local time) instead of polling. */
function scheduleBoundary() {
  clearTimeout(boundaryTimer)
  if (manual) return
  const now = new Date()
  const next = new Date(now)
  const hour = now.getHours()
  next.setHours(hour < LIGHT_START_HOUR ? LIGHT_START_HOUR : hour < DARK_START_HOUR ? DARK_START_HOUR : LIGHT_START_HOUR + 24, 0, 0, 0)
  boundaryTimer = setTimeout(syncWithClock, next.getTime() - now.getTime())
}

function syncWithClock() {
  if (manual) return
  apply(timeTheme(), true)
  scheduleBoundary()
}

apply(current, false)
scheduleBoundary()

/** The user's choice: applied now and kept for this visit only. */
export function setTheme(next: Theme): void {
  manual = true
  clearTimeout(boundaryTimer)
  apply(next, true)
}

export const getTheme = (): Theme => current

export function subscribeTheme(notify: () => void): () => void {
  listeners.add(notify)
  return () => {
    listeners.delete(notify)
  }
}

// Timers can be delayed while the tab is hidden or the device sleeps; re-check the clock when the tab comes back.
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) syncWithClock()
})
