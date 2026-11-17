import type { ComponentType, LazyExoticComponent } from 'react'

/** A single unit.`factor` = how many base units one of this unit equals. */
export interface UnitDefinition {
  id: string
  name: string
  symbol: string
  factor: number
}

/** Everything the shared <UnitConverter /> needs. Add a new category by providing one of these. */
export interface ConverterConfig {
  id: string
  title: string
  description: string
  units: readonly UnitDefinition[]
  defaultFromUnit: string
  defaultToUnit: string
  /** Pure conversion function; kept outside the UI. */
  convert: (value: number, fromUnitId: string, toUnitId: string) => number
  /** Whether negative inputs are meaningful (default true). */
  allowNegative?: boolean
  /** Reject an input before converting (e.g. zero); return the message to show, or null if it is fine. */
  validate?: (value: number, fromUnitId: string) => string | null
  /** Significant digits shown in results (default 12). */
  displayDigits?: number
  /** Use searchable From/To pickers instead of plain selects (for long unit lists). */
  searchableUnits?: boolean
  /** When set, Copy yields the displayed result plus this unit label (e.g. "45 seconds"); otherwise just the number. */
  copyUnit?: (unit: UnitDefinition) => string
}

export type CategoryStatus = 'available' | 'coming-soon'

export interface CategoryConfig {
  id: string
  name: string
  groupId: string
  description: string
  status: CategoryStatus
  /**
   * Lazy-loaded converter view (React.lazy around a dynamic import). Only 'available' categories provide one;
   * it is fetched and mounted when the category is opened and unmounted when the modal closes.
   */
  component?: LazyExoticComponent<ComponentType>
}

export interface CategoryGroup {
  id: string
  name: string
}
