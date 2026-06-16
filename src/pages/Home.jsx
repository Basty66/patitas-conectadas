import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Heart, Search, MapPin, Bell, Sparkles, CheckCircle, Smartphone, Users, ChevronRight, Quote, Camera, Dog, Cat, Shield, Globe, Clock, PawPrint } from 'lucide-react'
import DogIcon from '../components/icons/DogIcon.jsx'
import CatIcon from '../components/icons/CatIcon.jsx'
import PawIcon from '../components/icons/PawIcon.jsx'
import BoneIcon from '../components/icons/BoneIcon.jsx'
import HeartPawIcon from '../components/icons/HeartPawIcon.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'

const containerVariants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const childVariants = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }

export default function Home() {
  const [typing, setTyping] = useState('')
  const fullText = 'Recupera a tu compañero de vida'

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      setTyping(fullText.slice(0, i + 1))
      i++
      if (i >= fullText.length) clearInterval(timer)
    }, 80)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="overflow-hidden">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-blob-delayed" />
          <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl animate-aurora" />
          <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-pink-500/5 rounded-full blur-3xl animate-aurora-reverse" />
          {[DogIcon, CatIcon, PawIcon, BoneIcon, HeartPawIcon].map((Icon, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -18, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
              className="absolute"
              style={{ top: `${18 + i * 16}%`, left: `${8 + i * 18}%`, opacity: 0.08 }}
            >
              <Icon size={i % 2 === 0 ? 44 : 34} className="text-white" />
            </motion.div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-40 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              <motion.div variants={childVariants} className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-orange-500/30">
                <HeartPawIcon size={28} className="text-white" />
              </motion.div>

              <motion.h1 variants={childVariants} className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.05] mb-4">
                Sanos{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-orange-400 to-pink-400">
                  y Salvos
                </span>
              </motion.h1>

              <motion.div variants={childVariants} className="h-10 mb-3">
                <span className="text-xl sm:text-2xl text-blue-200/80 font-light">
                  {typing}
                  <span className="inline-block w-0.5 h-6 bg-orange-400 ml-0.5 animate-typewriter-cursor" />
                </span>
              </motion.div>

              <motion.p variants={childVariants} className="text-base sm:text-lg text-blue-200/60 max-w-xl mb-8 leading-relaxed">
                Una plataforma que une tecnología, comunidad e instituciones para que ninguna mascota se pierda para siempre.{' '}
                <strong className="text-white/80">Ayúdanos a reunir familias con sus compañeros de vida.</strong>
              </motion.p>

              <motion.div variants={childVariants} className="flex flex-wrap gap-3">
                <Link to="/reportar-perdido" className="btn-primary flex items-center gap-2 animate-pulse-glow">
                  <Heart className="w-5 h-5" /> Perdí mi Mascota
                </Link>
                <Link to="/reportar-encontrado" className="btn-secondary flex items-center gap-2">
                  <Search className="w-4 h-4" /> Encontré una
                </Link>
                <Link to="/galeria" className="text-white/40 hover:text-white/70 text-sm flex items-center gap-1.5 px-4 py-3 transition-colors">
                  Ver galería <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.4 }} className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-96 h-96 bg-gradient-to-br from-orange-400/10 to-blue-500/10 rounded-full blur-3xl absolute -top-20 -left-20" />
                <div className="relative grid grid-cols-2 gap-5">
                  {[
                    <DogIcon key="d" size={64} className="text-white/80" />,
                    <CatIcon key="c" size={64} className="text-white/80" />,
                    <PawIcon key="p" size={64} className="text-white/80" />,
                    <HeartPawIcon key="h" size={64} className="text-white/80" />,
                  ].map((icon, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + i * 0.12, type: 'spring', stiffness: 150 }}
                      whileHover={{ scale: 1.08, rotate: [0, -5, 5, 0] }}
                      className={`w-36 h-36 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 flex items-center justify-center hover:bg-white/15 hover:border-white/25 transition-all duration-300 shadow-xl ${i % 2 === 0 ? 'mt-10' : ''}`}
                    >
                      {icon}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent" />
      </section>

      {/* ===== ABOUT US ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="w-full aspect-square max-w-md mx-auto bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-slate-800 rounded-3xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-[0.04]">
                  {[DogIcon, CatIcon, PawIcon].map((Icon, i) => (
                    <motion.div key={i} animate={{ y: [0, -10, 0] }} transition={{ duration: 3 + i, repeat: Infinity, delay: i }} className="absolute" style={{ top: `${20 + i * 30}%`, left: `${15 + i * 30}%` }}>
                      <Icon size={48} />
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  animate={{ scale: [1, 1.02, 1], rotate: [0, 1, -1, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 text-center px-8"
                >
                  <HeartPawIcon size={72} className="text-orange-500 mx-auto mb-4" />
                  <p className="text-lg font-bold text-slate-700 dark:text-slate-300">+10.000 mascotas<br/>esperando ser reunidas</p>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Sobre nosotros</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white mt-2 mb-4">
              ¿Qué es Sanos <span className="text-gradient">y Salvos</span>?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              Somos una plataforma tecnológica con propósito social: <strong>reducir drásticamente la tasa de mascotas perdidas que nunca regresan a casa</strong>. En Chile, más del 85% de las mascotas extraviadas no logran reunirse con sus familias. Queremos cambiar esa realidad.
            </p>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              Usamos inteligencia artificial, geolocalización y una red de colaboración con clínicas veterinarias, municipalidades y refugios para crear el sistema de recuperación de mascotas más completo del país.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Misión', value: 'Reunir mascotas perdidas con sus familias usando tecnología innovadora y colaboración comunitaria.' },
                { label: 'Visión', value: 'Ser el puente digital que garantice que ninguna mascota en Chile se pierda para siempre.' },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 col-span-2 sm:col-span-1">
                  <h4 className="font-bold text-sm text-slate-700 dark:text-slate-300 mb-1">{item.label}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Apoyamos la Ley 21.020 — Ley Cholito</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== THE PROBLEM / REALITY ===== */}
      <section className="bg-white dark:bg-slate-800/50 py-20 border-y border-gray-100 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white mb-4">La realidad en <span className="text-gradient">números</span></h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Cada año, miles de mascotas desaparecen en Chile. Detrás de cada número hay una familia esperando.</p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: PawPrint, value: '85%', label: 'de mascotas perdidas', sub: 'nunca regresan a casa', color: 'from-red-400 to-red-600' },
              { icon: Dog, value: '10.000+', label: 'mascotas extraviadas', sub: 'reportadas al año en Chile', color: 'from-orange-400 to-orange-600' },
              { icon: HeartPawIcon, value: '15%', label: 'tasa de reencuentro', sub: 'sin tecnología de apoyo', color: 'from-amber-400 to-amber-600' },
              { icon: Users, value: '60%+', label: 'es nuestra meta', sub: 'gracias a la tecnología y comunidad', color: 'from-emerald-400 to-emerald-600' },
            ].map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 text-center shadow-md hover:shadow-xl border border-gray-100 dark:border-slate-700 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <s.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-black text-slate-800 dark:text-white mb-1">{s.value}</div>
                  <div className="font-semibold text-slate-700 dark:text-slate-300 text-sm">{s.label}</div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{s.sub}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <ScrollReveal className="text-center mb-12">
          <Sparkles className="w-8 h-8 text-orange-500 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white">¿Cómo funciona?</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mxauto">Cuatro pasos simples para que las mascotas vuelvan a casa</p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: 1, icon: Camera, title: 'Reporta', desc: 'Sube una foto y completa los datos. Dile a la comunidad qué mascota buscas o encontraste.', color: 'from-orange-400 to-red-500' },
            { step: 2, icon: Sparkles, title: 'IA Analiza', desc: 'Nuestro sistema examina la foto, extrae colores y características, y busca coincidencias automáticamente.', color: 'from-blue-400 to-indigo-500' },
            { step: 3, icon: Bell, title: 'Notifica', desc: 'Alertas en tiempo real a la comunidad cercana. Si hay match, te avisamos al instante.', color: 'from-purple-400 to-pink-500' },
            { step: 4, icon: HeartPawIcon, title: 'Reencuentra', desc: 'Conecta con la persona que tiene a tu mascota o con el dueño. El reencuentro está a un clic.', color: 'from-emerald-400 to-teal-500' },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <ScrollReveal key={i} delay={i * 0.12}>
                <motion.div whileHover={{ y: -8 }} className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-100 dark:border-slate-700 transition-all duration-300 group h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-sm font-black text-slate-400 dark:text-slate-500">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="bg-white dark:bg-slate-800/30 py-20 border-y border-gray-100 dark:border-slate-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-12">
            <DogIcon size={36} className="text-orange-500 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white">¿Cómo ayudamos?</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto">Tecnología diseñada para maximizar las probabilidades de reencuentro</p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MapPin, title: 'Geoalertas Inteligentes', desc: 'Cuando se reporta una mascota, enviamos notificaciones a todos los usuarios en un radio de 5 km. Entre más gente mire, más rápido aparece.', color: 'from-blue-400 to-blue-600' },
              { icon: Sparkles, title: 'Matching con IA', desc: 'Nuestra inteligencia artificial compara fotos de mascotas perdidas y encontradas analizando colores, razas y tamaños para encontrar coincidencias.', color: 'from-amber-400 to-amber-600' },
              { icon: Smartphone, title: 'Multiplataforma', desc: 'Funciona en cualquier dispositivo. Reporta desde tu celular, recibe notificaciones y actualiza el estado de tu búsqueda en tiempo real.', color: 'from-emerald-400 to-emerald-600' },
              { icon: HeartPawIcon, title: 'Red de Apoyo', desc: 'Clínicas veterinarias, municipalidades y refugios colaboran con nosotros para amplificar cada reporte y llegar a más personas.', color: 'from-rose-400 to-rose-600' },
            ].map((f, i) => {
              const Icon = f.icon
              return (
                <ScrollReveal key={i} delay={i * 0.12}>
                  <motion.div whileHover={{ y: -6 }} className="group bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-100 dark:border-slate-700 transition-all duration-300 h-full">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">{f.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== IMPACT / TESTIMONIALS ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <ScrollReveal className="text-center mb-12">
          <Quote className="w-8 h-8 text-orange-500 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white">El impacto que buscamos</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto">Más que una plataforma, un movimiento para proteger a quienes no tienen voz</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: HeartPawIcon, title: 'Reencuentros Familias', desc: 'Pasar de un 15% a más de un 60% de tasa de hallazgo exitoso. Cada mascota que vuelve a casa es una familia completa de nuevo.', color: 'from-rose-400 to-rose-500' },
            { icon: Shield, title: 'Tenencia Responsable', desc: 'Apoyamos la Ley 21.020 (Ley Cholito) promoviendo la identificación digital de mascotas y la trazabilidad en todo Chile.', color: 'from-blue-400 to-blue-500' },
            { icon: Globe, title: 'Chile más Verde', desc: 'Al digitalizar las búsquedas eliminamos los carteles físicos en las calles. Menos papel, más tecnología, más efectividad.', color: 'from-emerald-400 to-emerald-500' },
          ].map((imp, i) => {
            const Icon = imp.icon
            return (
              <ScrollReveal key={i} delay={i * 0.15}>
                <motion.div whileHover={{ y: -6 }} className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-md hover:shadow-xl border border-gray-100 dark:border-slate-700 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${imp.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-3">{imp.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{imp.desc}</p>
                </motion.div>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/10 rounded-3xl p-8 border border-orange-100 dark:border-orange-800/30">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Quote className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed italic">
                "Cada mascota es un miembro más de la familia. Detrás de cada reporte hay una historia, una preocupación, una esperanza. 
                Estamos aquí para convertir esa esperanza en un reencuentro."
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200">— Equipo Sanos y Salvos</span>
                <span className="text-xs text-slate-400">Proyecto GPY1101 · Duoc UC</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== VALORES ===== */}
      <section className="bg-white dark:bg-slate-800/30 py-16 border-y border-gray-100 dark:border-slate-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[HeartPawIcon, DogIcon, CatIcon].map((Icon, i) => (
                <Icon key={i} size={20} className="text-orange-400" />
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white">Nuestros Valores</h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Compromiso', desc: 'Con las mascotas y sus familias, sin excusas' },
              { title: 'Innovación', desc: 'Tecnología al servicio de una causa noble' },
              { title: 'Comunidad', desc: 'Juntos somos más fuertes que separados' },
              { title: 'Transparencia', desc: 'Cada reporte, cada match, cada reencuentro' },
            ].map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-5 text-center border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-800 dark:text-white">{v.title}</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600" />
        <div className="absolute inset-0 opacity-[0.07]">
          {[DogIcon, CatIcon, PawIcon, BoneIcon, HeartPawIcon].map((Icon, i) => (
            <motion.div key={i} animate={{ y: [0, -15, 0], x: [0, 10, -10, 0] }} transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i }} className="absolute" style={{ top: `${12 + i * 20}%`, left: `${10 + i * 20}%` }}>
              <Icon size={44} className="text-white" />
            </motion.div>
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
          <ScrollReveal>
            <HeartPawIcon size={48} className="text-white/60 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">Cada minuto cuenta</h2>
            <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
              Si perdiste a tu mejor amigo o encontraste una mascota, no esperes más. 
              Entre más rápido reportes, más probabilidades hay de un reencuentro.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/reportar-perdido" className="bg-white text-orange-600 px-8 py-3.5 rounded-xl font-bold hover:bg-orange-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2">
                <Heart className="w-5 h-5" /> Perdí mi Mascota
              </Link>
              <Link to="/reportar-encontrado" className="bg-white/20 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/30 transition-all border border-white/40 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2">
                <Search className="w-4 h-4" /> Encontré una Mascota
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
