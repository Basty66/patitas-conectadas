import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'

export default function ThemeToggle() {
  const { dark, toggle, mounted } = useTheme()
  if (!mounted) return <div className="w-9 h-9" />

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={toggle}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors bg-white/10 hover:bg-white/20 text-white"
      aria-label={dark ? 'Activar modo claro' : 'Activar modo oscuro'}
    >
      <motion.div
        key={dark ? 'moon' : 'sun'}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {dark ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
      </motion.div>
    </motion.button>
  )
}
