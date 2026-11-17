import {
  ArrowLeftRight, AudioWaveform, BatteryCharging, Box, Calendar, CalendarRange, Clock, Cog, CircleStar, Cpu, CircleDollarSign,
  DraftingCompass, Droplets, Expand, Footprints, Fuel, Gauge, Globe, HandFist, Hourglass, House, Layers,
  Plug, Ruler, Save, Scale, Shapes, Shrink, Thermometer, Utensils, Wallet, Weight, Zap,
  type LucideIcon,
} from 'lucide-react'

/** One distinct icon per category id (see categories.ts). */
export const categoryIcons: Readonly<Record<string, LucideIcon>> = {
  length: Ruler,
  area: Expand,
  volume: Box,
  mass: Weight,
  temperature: Thermometer,
  angle: DraftingCompass,
  density: Layers,
  speed: Gauge,
  force: HandFist,
  pressure: Shrink,
  energy: Zap,
  power: Plug,
  frequency: AudioWaveform,
  time: Clock,
  'time-duration': Hourglass,
  'time-zone': Globe,
  'date-difference': CalendarRange,
  'data-storage': Save,
  'data-rate': ArrowLeftRight,
  currency: CircleDollarSign,
  gold: CircleStar,
  'fuel-economy': Droplets,
  'fuel-cost': Fuel,
  cooking: Utensils,
  'shoe-size': Footprints,
}

export const groupIcons: Readonly<Record<string, LucideIcon>> = {
  basic: Scale,
  geometry: Shapes,
  motion: Cog,
  energy: BatteryCharging,
  datetime: Calendar,
  digital: Cpu,
  finance: Wallet,
  lifestyle: House,
}
