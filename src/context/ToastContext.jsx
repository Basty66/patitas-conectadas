import { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info } from 'lucide-react'

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random()
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(toast => toast.id !== id)), duration)
  }, [])

  const icons = { success: CheckCircle, error: XCircle, info: Info }
  const colors = { success: 'bg-emerald-500', error: 'bg-red-500', info: 'bg-blue-500' }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(t => {
            const Icon = icons[t.type] || Info
            return (
              <motion.div key={t.id}
                initial={{ opacity: 0, x: 80, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`pointer-events-auto flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-2xl text-sm font-medium text-white ${colors[t.type] || colors.info} backdrop-blur-sm`}
              >
                <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                {t.message}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
