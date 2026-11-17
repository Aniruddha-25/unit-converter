import UnitConverter from '../../../components/shared/UnitConverter/UnitConverter.tsx'
import { dataRateConverter } from './dataRate.ts'

export default function DataRateConverter() {
  return <UnitConverter config={dataRateConverter} />
}
