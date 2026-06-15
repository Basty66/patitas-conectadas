import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import PawIcon from '../components/icons/PawIcon.jsx'
import DogIcon from '../components/icons/DogIcon.jsx'
import CatIcon from '../components/icons/CatIcon.jsx'

export default function NotFound() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="text-center max-w-md mx-auto px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="relative w-32 h-32 mx-auto mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full blur-2xl opacity-30" />
          <div className="relative w-full h-full bg-white dark:bg-slate-800 rounded-full shadow-xl flex items-center justify-center border border-gray-100 dark:border-slate-700">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <PawIcon size={56} className="text-orange-500" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-8xl font-black text-slate-200 dark:text-slate-700 mb-2">404</h1>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">¡Esta página no existe!</h2>
          <p className="text-slate-400 dark:text-slate-400 mb-8 leading-relaxed">
            Parece que esta dirección no lleva a ningún lado. ¿Quizás la mascota ya encontró su hogar?
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link to="/" className="btn-primary flex items-center justify-center gap-2">
            <Home className="w-4 h-4" /> Volver al inicio
          </Link>
          <Link to="/galeria" className="btn-secondary dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 flex items-center justify-center gap-2">
            <DogIcon size={16} /> Ver galería
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-center gap-4"
        >
          {[PawIcon, DogIcon, CatIcon].map((Icon, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-slate-300 dark:text-slate-600"
            >
              <Icon size={24} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
