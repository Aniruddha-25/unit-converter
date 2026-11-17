import UnitConverter from '../../../components/shared/UnitConverter/UnitConverter.tsx'
import { dataStorageConverter } from './dataStorage.ts'

export default function DataStorageConverter() {
  return <UnitConverter config={dataStorageConverter} />
}
