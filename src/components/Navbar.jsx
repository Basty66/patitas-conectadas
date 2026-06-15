import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, Search, Camera, LayoutDashboard, Newspaper, Info, FileText } from 'lucide-react'
import NotificationBell from './NotificationBell.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import PawIcon from './icons/PawIcon.jsx'

const links = [
  { to: '/', label: 'Inicio', icon: Home },
  { to: '/reportar-perdido', label: 'Perdí mi Mascota', icon: Camera },
  { to: '/reportar-encontrado', label: 'Encontré una', icon: Search },
  { to: '/galeria', label: 'Galería', icon: LayoutDashboard },
  { to: '/blog', label: 'Blog', icon: Newspaper },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/informe', label: 'Informe', icon: FileText },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-dark shadow-lg shadow-black/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div whileHover={{ scale: 1.1, rotate: [0, -8, 8, -4, 0] }} transition={{ duration: 0.4 }}>
              <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                <PawIcon size={20} className="text-white" />
              </div>
            </motion.div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight">Patitas</span>
              <span className="font-light text-lg text-orange-300">Conectadas</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map(l => {
              const active = pathname === l.to
              return (
                <Link key={l.to} to={l.to} className="relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-white/50">
                  {active && (
                    <motion.div layoutId="nav-ind" className="absolute inset-0 bg-white/15 rounded-xl border border-white/10" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                  )}
                  <span className={`relative z-10 flex items-center gap-1.5 ${active ? 'text-white' : 'text-white/60 hover:text-white/90'}`}>
                    <l.icon className="w-4 h-4" />
                    {l.label}
                  </span>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <NotificationBell />
            <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all duration-200 ease-out active:scale-95 focus-visible:ring-2 focus-visible:ring-white/50" aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden overflow-hidden border-t border-white/10">
            <div className="px-4 py-3 space-y-1 bg-slate-900/95 backdrop-blur-xl">
              {links.map(l => {
                const active = pathname === l.to
                return (
                  <Link key={l.to} to={l.to} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ease-out active:scale-95 focus-visible:ring-2 focus-visible:ring-white/50 ${active ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
                    <l.icon className="w-5 h-5" />
                    {l.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
