import { lazy } from 'react'
import type { CategoryConfig, CategoryGroup } from '../types/converter.ts'

export const categoryGroups: readonly CategoryGroup[] = [
  { id: 'basic', name: 'Basic Measurements' },
  { id: 'geometry', name: 'Geometry & Mathematics' },
  { id: 'motion', name: 'Motion & Mechanics' },
  { id: 'energy', name: 'Energy & Electrical' },
  { id: 'datetime', name: 'Date & Time' },
  { id: 'digital', name: 'Digital & Computing' },
  { id: 'finance', name: 'Finance' },
  { id: 'lifestyle', name: 'Everyday & Lifestyle' },
]

type Soon = Omit<CategoryConfig, 'status' | 'component' | 'description'> & { description?: string }

const soon = (c: Soon): CategoryConfig => ({
  ...c,
  description: c.description ?? `${c.name} conversion is on the way.`,
  status: 'coming-soon',
})

/**
 * To make a category functional: set status 'available' and attach a lazy `component`.
 * Each `import()` becomes its own chunk, fetched only when that category is first opened.
 * Keep this file free of static imports from src/converters/ so nothing converter-specific lands in the main bundle.
 */
export const categories: readonly CategoryConfig[] = [
  // Basic Measurements
  soon({ id: 'length', name: 'Length', groupId: 'basic' }),
  soon({ id: 'area', name: 'Area', groupId: 'basic' }),
  soon({ id: 'volume', name: 'Volume', groupId: 'basic' }),
  soon({ id: 'mass', name: 'Mass / Weight', groupId: 'basic' }),
  soon({ id: 'temperature', name: 'Temperature', groupId: 'basic' }),
  // Geometry & Mathematics
  soon({ id: 'angle', name: 'Angle', groupId: 'geometry' }),
  soon({ id: 'density', name: 'Density', groupId: 'geometry' }),
  // Motion & Mechanics
  soon({ id: 'speed', name: 'Speed', groupId: 'motion' }),
  soon({ id: 'force', name: 'Force', groupId: 'motion' }),
  soon({ id: 'pressure', name: 'Pressure', groupId: 'motion' }),
  {
    id: 'fuel-economy',
    name: 'Fuel Economy Converter',
    groupId: 'motion',
    description: 'Convert between km/L, L/100 km, and US and UK miles per gallon.',
    status: 'available',
    component: lazy(() => import('../converters/motion-mechanics/fuel-economy/FuelEconomyConverter.tsx')),
  },
  // Energy & Electrical
  soon({ id: 'energy', name: 'Energy', groupId: 'energy' }),
  soon({ id: 'power', name: 'Power', groupId: 'energy' }),
  soon({ id: 'frequency', name: 'Frequency', groupId: 'energy' }),
  // Date & Time
  {
    id: 'time',
    name: 'Time',
    groupId: 'datetime',
    description: 'Convert between units of time, from nanoseconds to years.',
    status: 'available',
    component: lazy(() => import('../converters/date-time/time/TimeConverter.tsx')),
  },
  soon({ id: 'time-duration', name: 'Time Duration', groupId: 'datetime' }),
  {
    id: 'time-zone',
    name: 'Time Zone',
    groupId: 'datetime',
    description: 'Convert a date and time between IANA time zones, with daylight saving handled.',
    status: 'available',
    component: lazy(() => import('../converters/date-time/time-zone/TimeZoneConverter.tsx')),
  },
  soon({ id: 'date-difference', name: 'Date Difference', groupId: 'datetime', description: 'Date difference calculation is a future feature.' }),
  // Digital & Computing
  {
    id: 'data-storage',
    name: 'Data Storage',
    groupId: 'digital',
    description: 'Convert between bits and bytes, from b and B up to Yb and YB (base 1,024).',
    status: 'available',
    component: lazy(() => import('../converters/digital-computing/data-storage/DataStorageConverter.tsx')),
  },
  {
    id: 'data-rate',
    name: 'Data Transfer Rate',
    groupId: 'digital',
    description: 'Convert bit and byte transfer rates per second, minute or hour (base 1024).',
    status: 'available',
    component: lazy(() => import('../converters/digital-computing/data-rate/DataRateConverter.tsx')),
  },
  // Finance
  {
    id: 'currency',
    name: 'Currency',
    groupId: 'finance',
    description: 'Convert between world currencies using the latest exchange rates.',
    status: 'available',
    component: lazy(() => import('../converters/finance/currency/CurrencyConverter.tsx')),
  },
  {
    id: 'gold',
    name: 'Gold Converter',
    groupId: 'finance',
    description: 'Live gold rates, plus pure gold and alloy content by weight and purity.',
    status: 'available',
    component: lazy(() => import('../converters/finance/gold/GoldConverter.tsx')),
  },
  // Everyday & Lifestyle
  {
    id: 'fuel-cost',
    name: 'Fuel Cost Calculator',
    groupId: 'lifestyle',
    description: 'Estimate the fuel needed and the total cost of a journey, including round trips.',
    status: 'available',
    component: lazy(() => import('../converters/everyday-lifestyle/fuel-cost/FuelCostCalculator.tsx')),
  },
  soon({ id: 'cooking', name: 'Cooking Measurements', groupId: 'lifestyle' }),
  soon({ id: 'shoe-size', name: 'Shoe Size', groupId: 'lifestyle', description: 'Shoe size conversion is a future feature.' }),
]
