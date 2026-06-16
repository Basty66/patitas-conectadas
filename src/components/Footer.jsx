import { Link } from 'react-router-dom'
import { Heart, Mail, MapPin, FileText } from 'lucide-react'
import PawIcon from './icons/PawIcon.jsx'
import { useState } from 'react'

export default function Footer() {
  const [clickCount, setClickCount] = useState(0)
  const [showSecret, setShowSecret] = useState(false)

  const handleHeartClick = () => {
    const next = clickCount + 1
    setClickCount(next)
    if (next >= 5) setShowSecret(true)
  }
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 mt-auto border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                <PawIcon size={20} className="text-white" />
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight">Sanos</span>
                <span className="font-light text-lg text-orange-300">Conectadas</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Plataforma centralizada para la recuperación de mascotas perdidas. Uniendo tecnología, comunidad e instituciones en Chile.
            </p>
            <div className="flex items-center gap-1 mt-4 text-slate-500 text-xs">
              <button onClick={handleHeartClick} className="hover:scale-110 transition-transform"><Heart className={`w-3 h-3 transition-colors ${showSecret ? 'text-pink-400' : 'text-red-400'}`} /></button>
              <span>Hecho con amor para las mascotas</span>
              {showSecret && (
                <Link to="/presentacion" className="ml-2 px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-medium hover:bg-pink-500/30 transition-colors animate-pulse">
                  🎬 Presentación
                </Link>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Plataforma</h4>
            <div className="space-y-2.5 text-sm text-slate-400">
              <Link to="/reportar-perdido" className="block hover:text-orange-300 transition-colors">Reportar perdida</Link>
              <Link to="/reportar-encontrado" className="block hover:text-orange-300 transition-colors">Reportar encontrada</Link>
              <Link to="/galeria" className="block hover:text-orange-300 transition-colors">Galería de reportes</Link>
              <Link to="/blog" className="block hover:text-orange-300 transition-colors">Blog comunitario</Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Proyecto</h4>
            <div className="space-y-2.5 text-sm text-slate-400">
              <Link to="/dashboard" className="block hover:text-orange-300 transition-colors">Dashboard económico</Link>
              <Link to="/informe" className="block hover:text-orange-300 transition-colors">Informe económico</Link>
              <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" className="block hover:text-orange-300 transition-colors">Documentación</a>
              <span className="block text-slate-500">GPY1101 — Duoc UC</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contacto</h4>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400" />
                <span>contacto@sanosysalvos.cl</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>Santiago, Chile</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-600 text-xs">
          <span>&copy; {new Date().getFullYear()} Sanos y Salvos — Todos los derechos reservados</span>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-slate-400 transition-colors">Inicio</Link>
            <Link to="/galeria" className="hover:text-slate-400 transition-colors">Galería</Link>
            <Link to="/informe" className="hover:text-slate-400 transition-colors">Informe</Link>
            <Link to="/dashboard" className="hover:text-slate-400 transition-colors">Dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
