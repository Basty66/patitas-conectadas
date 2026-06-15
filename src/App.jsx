import { useLocation, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import Home from './pages/Home'
import ReportLost from './pages/ReportLost'
import ReportFound from './pages/ReportFound'
import Gallery from './pages/Gallery'
import Blog from './pages/Blog'
import Dashboard from './pages/Dashboard'
import Informe from './pages/Informe'
import Presentacion from './pages/Presentacion'
import NotFound from './pages/NotFound'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <LoadingScreen />

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/reportar-perdido" element={<ReportLost />} />
              <Route path="/reportar-encontrado" element={<ReportFound />} />
              <Route path="/galeria" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/informe" element={<Informe />} />
              <Route path="/presentacion" element={<Presentacion />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
