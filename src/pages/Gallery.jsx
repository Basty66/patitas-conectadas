import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles, X, RotateCcw, PawPrint, Dog, Cat } from 'lucide-react'
import PetCard from '../components/PetCard'
import DogIcon from '../components/icons/DogIcon.jsx'
import CatIcon from '../components/icons/CatIcon.jsx'
import PawIcon from '../components/icons/PawIcon.jsx'

const filterOptions = [
  { key: 'all', label: 'Todas', icon: PawPrint },
  { key: 'lost', label: 'Perdidas', icon: Dog },
  { key: 'found', label: 'Encontradas', icon: Cat },
]

export default function Gallery() {
  const [pets, setPets] = useState([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [matchModal, setMatchModal] = useState(null)
  const [matches, setMatches] = useState([])
  const [matchLoading, setMatchLoading] = useState(false)

  useEffect(() => {
    fetch('/api/pets').then(r => r.json()).then(d => { setPets(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const openMatches = async (pet) => {
    setMatchModal(pet)
    setMatchLoading(true)
    try {
      const r = await fetch(`/api/pets/${pet.id}/matches`)
      const d = await r.json()
      setMatches(d.matches)
    } catch { setMatches([]) }
    setMatchLoading(false)
  }

  const filtered = pets.filter(p => {
    if (filter !== 'all' && p.type !== filter) return false
    if (!search) return true
    const q = search.toLowerCase()
    return (p.name && p.name.toLowerCase().includes(q)) ||
           (p.breed && p.breed.toLowerCase().includes(q)) ||
           (p.description && p.description.toLowerCase().includes(q)) ||
           (p.color && p.color.toLowerCase().includes(q))
  })

  const lostCount = pets.filter(p => p.type === 'lost').length
  const foundCount = pets.filter(p => p.type === 'found').length
  const resolvedCount = pets.filter(p => p.status === 'resolved').length

  return (
    <div className="min-h-screen pt-20 pb-10 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-black text-slate-800 dark:text-white">Galería</h1>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">{pets.length} reportes en total</p>
          </div>
          <div className="flex gap-2">
            {[
              { label: `Perdidas ${lostCount}`, color: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400' },
              { label: `Encontradas ${foundCount}`, color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' },
              { label: `Resueltas ${resolvedCount}`, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.08 }} className={`px-3 py-1.5 ${s.color} rounded-xl text-xs font-bold`}>
                {s.label}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-3 mb-8 sticky top-16 z-30">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="flex gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-xl w-full sm:w-auto">
              {filterOptions.map(f => {
                const Icon = f.icon
                const isActive = filter === f.key
                return (
                  <button key={f.key} onClick={() => setFilter(f.key)} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-white shadow-md' : 'text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-700 dark:text-slate-300' : ''}`} />{f.label}
                  </button>
                )
              })}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Buscar por nombre, raza, color..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all" />
              {search && (
                <RotateCcw className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600 dark:hover:text-slate-300" onClick={() => setSearch('')} />
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="h-44 bg-slate-100 dark:bg-slate-700 animate-shimmer" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-slate-100 dark:bg-slate-700 rounded-lg w-2/3 animate-shimmer" />
                  <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded-lg w-1/2 animate-shimmer" />
                  <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded-lg w-3/4 animate-shimmer" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <PawIcon size={36} className="text-slate-400 dark:text-slate-500" />
            </motion.div>
            <p className="text-slate-500 dark:text-slate-300 font-medium text-lg">No hay reportes {filter !== 'all' ? `de ${filter === 'lost' ? 'perdidas' : 'encontradas'}` : ''}</p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Sé el primero en reportar una mascota</p>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((pet, i) => (
              <motion.div key={pet.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="flex flex-col">
                <PetCard pet={pet} index={i} />
                {pet.type === 'found' && pet.status === 'active' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => openMatches(pet)}
                    className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-xs font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Buscar coincidencias IA
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {matchModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setMatchModal(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md"><Sparkles className="w-5 h-5 text-white" /></div>
                  <div>
                    <h2 className="font-bold text-slate-800 dark:text-white">Coincidencias con IA</h2>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Basado en foto y características</p>
                  </div>
                </div>
                <button onClick={() => setMatchModal(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              <div className="p-6">
                {matchLoading ? (
                  <div className="text-center py-12">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="w-12 h-12 border-[3px] border-purple-200 dark:border-purple-800 border-t-purple-600 rounded-full mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-300 font-medium">Analizando imagen con IA...</p>
                    <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Extrayendo colores y características</p>
                  </div>
                ) : matches.length === 0 ? (
                  <div className="text-center py-12">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <PawIcon size={28} className="text-slate-400 dark:text-slate-500" />
                    </motion.div>
                    <p className="text-slate-600 dark:text-slate-300 font-medium">Sin coincidencias por ahora</p>
                    <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">No se encontraron mascotas perdidas que coincidan con este reporte</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      Se encontraron <strong className="text-slate-700 dark:text-slate-300">{matches.length}</strong> posibles coincidencias
                    </div>
                    {matches.map((m, i) => (
                      <motion.div key={m.pet.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-700/50 dark:to-slate-800 rounded-xl p-4 border border-gray-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {m.pet.species === 'dog' ? <DogIcon size={24} className="text-orange-500" /> : <CatIcon size={24} className="text-blue-500" />}
                            <div>
                              <span className="font-bold text-slate-800 dark:text-white">{m.pet.name || 'Sin nombre'}</span>
                              {m.pet.breed && <span className="text-xs text-slate-400 dark:text-slate-500 ml-2">{m.pet.breed}</span>}
                            </div>
                          </div>
                          <div className={`text-sm font-bold px-3 py-1 rounded-full ${m.score >= 70 ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400' : m.score >= 50 ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                            {m.score}%
                          </div>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${m.score}%` }} className={`h-full rounded-full ${m.score >= 70 ? 'bg-emerald-500' : m.score >= 50 ? 'bg-amber-500' : 'bg-slate-400'}`} transition={{ duration: 1, delay: i * 0.15 }} />
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {m.details.map((d, di) => (
                            <span key={di} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-lg">{d}</span>
                          ))}
                        </div>
                        {m.pet.contact_name && (
                          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                            <span>{m.pet.contact_name}</span>
                            {m.pet.phone && <span>{m.pet.phone}</span>}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
