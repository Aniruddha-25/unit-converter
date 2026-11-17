import UnitConverter from '../../../components/shared/UnitConverter/UnitConverter.tsx'
import { fuelEconomyConverter } from './fuelEconomy.ts'

export default function FuelEconomyConverter() {
  return <UnitConverter config={fuelEconomyConverter} />
}
