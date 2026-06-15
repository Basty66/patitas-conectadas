import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, CheckCheck, PawPrint, Heart, AlertTriangle } from 'lucide-react'

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([])
  const [unread, setUnread] = useState(0)
  const [open, setOpen] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const fetchNotifs = () => {
      fetch('/api/notifications').then(r => r.json()).then(setNotifications).catch(() => {})
      fetch('/api/notifications/unread').then(r => r.json()).then(d => setUnread(d.count)).catch(() => {})
    }
    fetchNotifs()
    const interval = setInterval(fetchNotifs, 10000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleClick = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const markAllRead = async () => {
    await fetch('/api/notifications/read-all', { method: 'PATCH' })
    setNotifications(notifications.map(n => ({ ...n, read: 1 })))
    setUnread(0)
  }

  const markRead = async (id) => {
    await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' })
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: 1 } : n))
    setUnread(Math.max(0, unread - 1))
  }

  const getIcon = (type) => {
    if (type === 'match') return <PawPrint className="w-4 h-4 text-orange-500" />
    if (type === 'success') return <Heart className="w-4 h-4 text-emerald-500" />
    return <AlertTriangle className="w-4 h-4 text-blue-500" />
  }

  const getBg = (type, read) => {
    if (read) return 'bg-slate-50 dark:bg-slate-700/50'
    if (type === 'match') return 'bg-orange-50 dark:bg-orange-900/20'
    if (type === 'success') return 'bg-emerald-50 dark:bg-emerald-900/20'
    return 'bg-blue-50 dark:bg-blue-900/20'
  }

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="relative p-2 rounded-xl hover:bg-white/10 transition-all duration-200 group">
        <Bell className="w-5 h-5 text-white/70 group-hover:text-white" />
        {unread > 0 && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-br from-orange-400 to-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center shadow-lg">
            {unread > 9 ? '9+' : unread}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.15 }}
            className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden z-50">
            <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2">
                <Bell className="w-4 h-4" /> Notificaciones
              </h3>
              {unread > 0 && (
                <button onClick={markAllRead} className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-1 transition-colors">
                  <CheckCheck className="w-3.5 h-3.5" /> Marcar todas leídas
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-10 text-slate-400 dark:text-slate-500 text-sm">Sin notificaciones</div>
              ) : (
                notifications.map(n => (
                  <div key={n.id} onClick={() => { if (!n.read) markRead(n.id) }} className={`p-4 border-b border-gray-50 dark:border-slate-700/50 cursor-pointer transition-colors ${getBg(n.type, n.read)} hover:bg-opacity-80`}>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center flex-shrink-0">
                        {getIcon(n.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 dark:text-white">{n.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{n.message}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                          {new Date(n.created_at).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {n.match_score && (
                        <div className="flex-shrink-0">
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${n.match_score >= 70 ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400'}`}>
                            {n.match_score}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
