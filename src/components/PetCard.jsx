import { motion } from 'framer-motion'
import { MapPin, Phone, Calendar, AlertTriangle, CheckCircle } from 'lucide-react'
import DogIcon from './icons/DogIcon.jsx'
import CatIcon from './icons/CatIcon.jsx'
import PawIcon from './icons/PawIcon.jsx'

function SpeciesIcon({ species, size = 16 }) {
  if (species === 'cat') return <CatIcon size={size} className="text-slate-600 dark:text-slate-400" />
  if (species === 'dog') return <DogIcon size={size} className="text-slate-600 dark:text-slate-400" />
  return <PawIcon size={size} className="text-slate-600 dark:text-slate-400" />
}

export default function PetCard({ pet, index = 0 }) {
  const isLost = pet.type === 'lost'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden transition-all duration-500"
    >
      <div className="relative h-44 bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700 overflow-hidden">
        {pet.photo ? (
          <img src={pet.photo} alt="Mascota" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <motion.div whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }} transition={{ duration: 0.4 }}>
              <SpeciesIcon species={pet.species} size={64} />
            </motion.div>
          </div>
        )}

        <div className="absolute top-3 left-3 flex gap-2">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${isLost ? 'bg-red-500/90 text-white' : 'bg-emerald-500/90 text-white'}`}>
            {isLost ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
            {isLost ? 'PERDIDO' : 'ENCONTRADO'}
          </div>
          {pet.status === 'resolved' && (
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-800/70 text-white backdrop-blur-sm">
              <CheckCircle className="w-3 h-3" />
              RESUELTO
            </div>
          )}
        </div>

        <div className="absolute bottom-3 right-3">
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 shadow-lg flex items-center gap-1.5">
            <SpeciesIcon species={pet.species} />
            {pet.species === 'dog' ? 'Perro' : pet.species === 'cat' ? 'Gato' : 'Otro'}
            {pet.size && <span className="text-slate-300 dark:text-slate-600">|</span>}
            {pet.size === 'small' && 'Pequeño'}
            {pet.size === 'medium' && 'Mediano'}
            {pet.size === 'large' && 'Grande'}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-slate-800 dark:text-white text-base mb-1">{pet.name || 'Sin nombre'}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
          {[pet.breed, pet.color].filter(Boolean).join(' · ') || 'Sin descripción'}
        </p>

        <div className="space-y-1.5 text-xs text-slate-400 dark:text-slate-500">
          {pet.address && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {pet.address}
            </div>
          )}
          {pet.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              {pet.phone}
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(pet.created_at).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
        </div>

        {pet.description && (
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 italic border-t border-gray-100 dark:border-slate-700 pt-3">
            "{pet.description}"
          </p>
        )}
      </div>
    </motion.div>
  )
}
