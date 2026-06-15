import DogIcon from './DogIcon.jsx'
import CatIcon from './CatIcon.jsx'
import PawIcon from './PawIcon.jsx'

export default function PetIcon({ species = 'dog', size = 24, className = '' }) {
  if (species === 'cat') return <CatIcon size={size} className={className} />
  if (species === 'dog') return <DogIcon size={size} className={className} />
  return <PawIcon size={size} className={className} />
}
