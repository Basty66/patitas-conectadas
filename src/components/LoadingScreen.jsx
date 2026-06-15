import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 rounded-full border-[3px] border-white/10 border-t-orange-400"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2C7.58 2 4 5.58 4 10c0 4.42 4.5 9.5 8 12 3.5-2.5 8-7.58 8-12 0-4.42-3.58-8-8-8zm0 11.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" fill="currentColor" opacity="0.3"/>
                <circle cx="12" cy="10" r="3.5" fill="currentColor"/>
              </svg>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/40 text-sm font-medium whitespace-nowrap"
            >
              Patitas <span className="text-orange-300">Conectadas</span>
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
