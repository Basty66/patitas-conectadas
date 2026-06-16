import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ChevronDown, Maximize2, Minimize2, PawPrint, Heart, DollarSign, BarChart3, Target, CheckCircle, TrendingUp, BookOpen, Lightbulb, ArrowRight, Bell, ClipboardList, X, MessageSquareText, HelpCircle, ZoomIn, Users, User, Cloud, Handshake, Calendar, ClipboardCheck, Monitor, Scale, GraduationCap, Building2, Landmark, Wallet, Building, UserCheck, Hospital, Hourglass, RefreshCw, Shield, TrendingDown, Plus, Check, Star, Coins, Banknote } from 'lucide-react'

/* ── Slide metadata ── */
const slides = [
  { id: 'portada',    gradient: 'from-slate-900 via-blue-900 to-indigo-900 dark:from-black dark:via-blue-950 dark:to-indigo-950', icon: PawPrint },
  { id: 'contexto',   gradient: 'from-rose-900 via-red-800 to-orange-900 dark:from-rose-950 dark:via-red-900 dark:to-orange-950', icon: Heart },
  { id: 'p-evaluacion', gradient: 'from-amber-900 via-yellow-800 to-orange-900 dark:from-amber-950 dark:via-yellow-900 dark:to-orange-950', icon: Scale },
  { id: 'p1-opcion',  gradient: 'from-emerald-900 via-teal-800 to-cyan-900 dark:from-emerald-950 dark:via-teal-900 dark:to-cyan-950', icon: Target },
  { id: 'p2-justificacion', gradient: 'from-blue-900 via-cyan-800 to-sky-900 dark:from-blue-950 dark:via-cyan-900 dark:to-sky-950', icon: BarChart3 },
  { id: 'p-metodos',  gradient: 'from-purple-900 via-violet-800 to-indigo-900 dark:from-purple-950 dark:via-violet-900 dark:to-indigo-950', icon: BookOpen },
  { id: 'p3-resultados',    gradient: 'from-violet-900 via-purple-800 to-fuchsia-900 dark:from-violet-950 dark:via-purple-900 dark:to-fuchsia-950', icon: TrendingUp },
  { id: 'p4-reflexion',     gradient: 'from-cyan-900 via-teal-800 to-emerald-900 dark:from-cyan-950 dark:via-teal-900 dark:to-emerald-950', icon: Lightbulb },
  { id: 'gracias',    gradient: 'from-pink-900 via-rose-800 to-red-900 dark:from-pink-950 dark:via-rose-900 dark:to-red-950', icon: Heart },
]

/* ── Speaker notes for each slide ── */
const speakerNotes = {
  portada: 'Saludo inicial. "Buenos días, somos el equipo de Patitas Conectadas. Hoy presentamos los resultados finales de la evaluación, para el cierre del proyecto. Esta evaluación se realiza en la Sala de Proyectos, semana 16, y corresponde al caso semestral de la asignatura. En esta defensa oral de 15 minutos —70% de la nota— abordaremos 4 preguntas del banco proporcionado por el/la docente: P1 (Indicador 4, 15%): opción de desarrollo a seleccionar con criterios técnicos; P2 (Indicador 5, 20%): justificación del proyecto y problemas que resuelve; P3 (Indicador 6, 20%): resultados y cifras clave; P4 (Indicador 7, 15%): reflexión individual. La calificación es individual según rúbrica — cada integrante responde su pregunta asignada. Comenzamos."',
  contexto: 'CONTEXTO (previo al Indicador 4): El 85% de mascotas perdidas nunca regresan. 10.000+ al año en Chile. Solo 15% se reencuentran. La organización necesita una plataforma que centralice y agilice la recuperación — problema que resuelve Patitas Conectadas.',
  'p-evaluacion': `EVALUACIÓN MULTICRITERIO — Soporte para Indicador 4 y 5.
  
RESPUESTA (2 min):
"Aplicamos una matriz de decisión ponderada con 6 criterios agrupados en 3 dimensiones: Técnicos (Funcionalidad Core 20%, Integración 20%), Administrativos (Capacidad Equipo 15%, Viabilidad Financiera 15%), y Normativos (Privacidad 15%, Propiedad Intelectual 15%). Cada criterio se puntuó de 0 a 20 usando como fuentes: requerimientos del CTO (criterios técnicos), del CFO (criterios administrativos) y marco legal chileno (normativos). Resultados: Opción 1 (MVP Ágil PRO) 85% — FACTIBLE; Opción 2 (Cascada Total) 80% — RIESGO ALTO por TIR negativa; Opción 3 (SaaS Híbrido) 63% — DEFICIENTE por incumplimiento normativo. La Opción 1 destaca en capacidad del equipo (15/15), viabilidad financiera (15/15) y normativo completo (30/30)."`,
  'p1-opcion': `INDICADOR 4 (15%) — Resume de forma atractiva la opción de desarrollo a seleccionar.
  
RESPUESTA (2-3 min):
"Seleccionamos la Opción 1: Desarrollo Incremental Ágil (MVP) basándonos en 4 criterios técnicos:

1. VIABILIDAD ECONÓMICA: VAN +$306M > $0, TIR 178.2% >> 12%, PRI 20.1m < 36m. La Opción 2 tenía VAN negativo, TIR < 12% y PRI > 36m. → DESCARTA

2. FACTIBILIDAD TÉCNICA: MVP en 6 meses con 5 roles (PO, Backend, Mobile, UX, QA). React/Vite + Express/Node.js + PostgreSQL. Opción 2: 18 meses, microservicios, IA avanzada.

3. ESTUDIO DE FACTIBILIDAD: 3 dimensiones viables: técnica (tecnologías probadas), económica (indicadores positivos), operativa (equipo 5-4 roles).

4. NECESIDADES DE LA ORGANIZACIÓN: Solución URGENTE — MVP entrega valor en 6 meses vs 18+ de Opción 2. Matching IA (Sharp.js + distancia euclidiana RGB, 85%+ precisión) + geoalertas."`,
  'p2-justificacion': `INDICADOR 5 (20%) — Justifica la selección del proyecto de software y su vía específica de desarrollo.
   
RESPUESTA (3-4 min):
"Justificamos Patitas Conectadas (Opción 1 MVP) por:

1. PROBLEMA RESUELTO: 85% de mascotas perdidas nunca regresan por falta de plataforma centralizada.

2. VÍA DE DESARROLLO: Desarrollo Incremental Ágil con entregas quincenales — validación temprana con usuarios reales.

3. PARTICULARIDADES DE IMPLEMENTACIÓN:
   - Fase 1 (Meses 1-6): Desarrollo MVP, inversión $46.56M en RRHH
   - Fase 2 (Meses 7-36): Operación con 4 roles
   - Financiamiento: 89% préstamo ($50M, 12% anual) + 11% capital ($6.24M)
   - Ingresos: Freemium (10% conversión, $3.000/mes) + B2B

4. PROBLEMAS ESPECÍFICOS QUE RESUELVE:
   - Matching IA por foto (inexistente en Chile)
   - Notificaciones automáticas de coincidencias
   - Red de apoyo integrada (clínicas, refugios, municipios)
   - Geoalertas por coordenadas

5. CAPACIDAD FINANCIERA: Liquidez 6.7 meses, Cobertura intereses 5.6x, Capacidad pago 117%."`,
  'p-metodos': `HERRAMIENTAS Y MÉTODOS — Soporte técnico a Indicadores 2 y 5.

RESPUESTA (1.5 min):
"Las herramientas colaborativas utilizadas fueron: Ofimática 365 para documentación y tablas; Project Libre para cronograma y asignación de recursos (workbench con WBS y ruta crítica); Git/GitHub para control de versiones y trabajo colaborativo en código; Vercel para despliegue continuo; y Neon (PostgreSQL) para base de datos en la nube.

Los métodos de análisis aplicados: Matriz Multicriterio Ponderada (selección de alternativas con 6 criterios y 3 dimensiones), Análisis Financiero (VAN/TIR/PRI con flujo de caja descontado a 12% anual), Análisis de Capacidad Financiera (4 indicadores), y Benchmark con industria SaaS.

Todo el trabajo se realizó en la Sala de Proyectos, usando pizarra para sesiones de planning semanales y TV para revisiones de sprint."`,
  'p3-resultados': `INDICADOR 6 (20%) — Explica los resultados del proceso de forma clara y persuasiva.
  
RESPUESTA (3-4 min):
"CIFRAS CLAVE PARA PARTES INTERESADAS:
· Inversión: $56.24M → Ingresos 36m: $670M → Balance: +$414M
· VAN: +$305.9M > $0 — Crea valor sobre 12% exigido
· TIR: 178.2% >> 12% — 14.8x superior al costo de capital
· PRI: 20.1 meses < 36 meses — Recuperación rápida
· Punto de equilibrio: Mes 12
· Cada $1 invertido → $7.36 de retorno

CUMPLIMIENTO DE REQUERIMIENTOS INICIALES:
1. MVP operativo en 6 meses con matching IA y geoalertas ✓
2. Modelo Freemium + B2B genera ingresos desde mes 7 ✓
3. Cobertura nacional vía acuerdos municipales ✓
4. Sostenibilidad financiera probada ✓
5. Impacto social: tasa reencuentro 15% → 60%+ ✓

BENCHMARK SaaS: TIR 178.2% vs 25-40% industria (4.5x), PRI 20.1m vs 24-36m, Margen 61.8% vs 10-20% (3x)"`,
  'p4-reflexion': `INDICADOR 7 (15%) — Explica de forma reflexiva su aporte individual.
  
RESPUESTA (2 min):
"MI APORTE INDIVIDUAL: Lideré el modelamiento financiero completo: flujo de caja (2 fases × 36 meses), tabla de amortización (Sistema Francés), VAN/TIR/PRI, estructura de inversión ($50M + $6.24M), y proyección de ingresos Freemium + B2B.

FORTALEZAS: Capacidad analítica para traducir requerimientos de software en variables financieras. Rigor metodológico. Visión integral conectando decisiones técnicas con impacto financiero.

DIFICULTAD: Sobreestimación inicial de ingresos (30% conversión Premium). La superé investigando benchmarks SaaS reales (15-20%) y ajustando al 10% conservador.

LECCIONES: La viabilidad técnica es inútil sin flujo de caja saludable. Aprendí a evaluar inversiones en tecnología con criterio económico, no solo técnico."`,

  gracias: 'Cierre. "En resumen: VAN +$305.9M, TIR 178.2%, PRI 20.1 meses. Proyecto VIABLE y ALTAMENTE RENTABLE. Todos los indicadores de la rúbrica se cumplen y superan expectativas. Gracias."'
}

/* ── Animated counter ── */
function CountUp({ end, duration = 2000, suffix = '', prefix = '', decimals = 0 }) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (started.current) return; started.current = true
    let startTime = null, raf
    const step = (t) => {
      if (!startTime) startTime = t
      const p = Math.min((t - startTime) / duration, 1)
      setCount(p * end)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [end, duration])
  return <span>{prefix}{count.toLocaleString('es-CL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</span>
}

/* ── Confetti for last slide ── */
function Confetti() {
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i, x: Math.random() * 100, rotation: Math.random() * 360,
    color: ['#ff6b6b','#feca57','#48dbfb','#ff9ff3','#54a0ff','#5f27cd','#1dd1a1','#f368e0'][Math.floor(Math.random()*8)],
    speed: 2 + Math.random() * 3, delay: Math.random() * 2, size: 6 + Math.random() * 8,
  }))
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50" aria-hidden="true">
      {particles.map(p => (
        <motion.div key={p.id} className="absolute" style={{ left: `${p.x}%`, width: p.size, height: p.size * 0.5, borderRadius: 2 }}
          initial={{ y: '-10vh', rotate: 0, opacity: 1 }}
          animate={{ y: '110vh', rotate: p.rotation + 720, opacity: [1, 1, 0] }}
          transition={{ duration: 3 + p.speed, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        >
          <div style={{ background: p.color, width: '100%', height: '100%', borderRadius: 2 }} />
        </motion.div>
      ))}
    </div>
  )
}

/* ── Barra resumen financiero ── */
function FinBar({ showEquity = false } = {}) {
  return (
    <div className="grid grid-cols-5 gap-1 max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 sm:p-1.5 border border-white/10 text-center">
        <div className="text-white/40 text-[6px] sm:text-[8px] uppercase tracking-wider leading-tight"><DollarSign className="w-2.5 h-2.5 inline mr-0.5" /> Pedimos prestado</div>
        <div className="text-[10px] sm:text-xs font-bold text-white">$50M</div>
        <div className="text-white/30 text-[6px] sm:text-[8px]">89%</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 sm:p-1.5 border border-white/10 text-center">
        <div className="text-white/40 text-[6px] sm:text-[8px] uppercase tracking-wider leading-tight"><Handshake className="w-2.5 h-2.5 inline mr-0.5" /> Capital propio</div>
        <div className="text-[10px] sm:text-xs font-bold text-amber-300">$6.24M</div>
        <div className="text-white/30 text-[6px] sm:text-[8px]">11%</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 sm:p-1.5 border border-white/10 text-center">
        <div className="text-white/40 text-[6px] sm:text-[8px] uppercase tracking-wider leading-tight"><TrendingDown className="w-2.5 h-2.5 inline mr-0.5" /> Gastos totales</div>
        <div className="text-[10px] sm:text-xs font-bold text-amber-300">~$256M</div>
        <div className="text-white/30 text-[6px] sm:text-[8px]">op + int</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 sm:p-1.5 border border-white/10 text-center">
        <div className="text-white/40 text-[6px] sm:text-[8px] uppercase tracking-wider leading-tight"><TrendingUp className="w-2.5 h-2.5 inline mr-0.5" /> Ingreso/mes (m36)</div>
        <div className="text-[10px] sm:text-xs font-bold text-emerald-300">$50.5M</div>
        <div className="text-white/30 text-[6px] sm:text-[8px]">+90x</div>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 sm:p-1.5 border border-white/10 text-center">
        <div className="text-white/40 text-[6px] sm:text-[8px] uppercase tracking-wider leading-tight"><CheckCircle className="w-2.5 h-2.5 inline mr-0.5" /> Balance 36m</div>
        <div className="text-[10px] sm:text-xs font-bold text-emerald-300">+$414M</div>
        <div className="text-white/30 text-[6px] sm:text-[8px]">tot − gastos</div>
      </div>
    </div>
  )
}
function SlideIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Concepto financiero expandible ── */
function ConceptCard({ title, detail, delay = 0 }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
      <button onClick={() => setOpen(!open)}
        className={`w-full text-left bg-white/[0.07] backdrop-blur-sm rounded-xl border transition-all duration-300 ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-white/40 ${open ? 'border-white/20 bg-white/[0.12]' : 'border-white/[0.08] hover:bg-white/[0.10]'}`}
        aria-expanded={open}
      >
        <div className="p-2 sm:p-2.5 flex items-center justify-between gap-1">
          <span className="text-white/80 text-[10px] sm:text-xs font-medium truncate">{title}</span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white/40 flex-shrink-0" />
          </motion.div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
              <p className="px-2 sm:px-2.5 pb-2 sm:pb-2.5 text-white/50 text-[10px] sm:text-xs leading-relaxed border-t border-white/[0.06] pt-1.5 sm:pt-2 mt-1">{detail}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  )
}

/* ── Comparativa expandible ── */
function OptCard({ opt, details, delay = 0 }) {
  const [open, setOpen] = useState(false)
  const isMVP = opt === 'MVP'
  const border = isMVP ? 'border-emerald-500/40' : 'border-red-500/30'
  const bg = isMVP ? 'bg-emerald-500/10' : 'bg-red-500/10'
  const hoverBg = isMVP ? 'hover:bg-emerald-500/20' : 'hover:bg-red-500/20'
  const badge = isMVP ? 'bg-emerald-500/30 text-emerald-300' : 'bg-red-500/30 text-red-300'
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
      <article className={`${bg} backdrop-blur-sm rounded-2xl border-2 ${border} h-full transition-all duration-300 ease-out ${hoverBg}`}>
        <div className="p-3 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
            <div className="flex items-center gap-2"><div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${badge} flex items-center justify-center`}>{isMVP ? <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}</div><h3 className="text-sm sm:text-lg font-bold text-white">Opción {isMVP ? '1' : '2'} — <span className={isMVP ? 'text-emerald-300' : 'text-red-300'}>{opt}</span></h3></div>
            <button onClick={() => setOpen(!open)} className={`p-1 rounded-lg transition-all duration-200 ease-out active:scale-90 focus-visible:ring-2 focus-visible:ring-white/40 ${open ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/10'}`} aria-label={open ? 'Ocultar detalles' : 'Ver más detalles'}>
              <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <dl className="space-y-1 sm:space-y-1.5 text-[10px] sm:text-xs">
            <div className="flex justify-between text-white/60"><dt>Período</dt><dd className="text-white font-semibold">{isMVP ? '36 meses' : '48+ meses'}</dd></div>
            <div className="flex justify-between text-white/60"><dt>Inversión total</dt><dd className="text-white font-semibold">{isMVP ? '-$56.24M' : '-$120M+'}</dd></div>
            <div className="flex justify-between text-white/60"><dt>VAN</dt><dd className={isMVP ? 'text-emerald-300 font-bold' : 'text-red-300 font-bold'}>{isMVP ? '+$305.9M' : 'Negativo'}</dd></div>
            <div className="flex justify-between text-white/60"><dt>TIR</dt><dd className={isMVP ? 'text-emerald-300 font-bold' : 'text-red-300 font-bold'}>{isMVP ? '178.2%' : '< 12%'}</dd></div>
            <div className="flex justify-between text-white/60"><dt>PRI</dt><dd className={isMVP ? 'text-emerald-300 font-bold' : 'text-red-300 font-bold'}>{isMVP ? '20.1 meses' : '> 36 meses'}</dd></div>
          </dl>
          <div className={`mt-2 sm:mt-3 pt-2 border-t ${isMVP ? 'border-emerald-500/20' : 'border-red-500/20'} text-center`}>
            <span className={`font-bold text-[10px] sm:text-xs ${isMVP ? 'text-emerald-300' : 'text-red-300'}`}>{isMVP ? <><CheckCircle className="w-3 h-3 inline mr-1" /> RECOMENDADA</> : <><X className="w-3 h-3 inline mr-1" /> DESCARTADA</>}</span>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
              <div className={`px-3 sm:px-5 pb-3 sm:pb-5 border-t ${isMVP ? 'border-emerald-500/20' : 'border-red-500/20'} pt-2 sm:pt-3 space-y-1.5`}>
                {details.map((d, i) => <p key={i} className="text-white/50 text-[10px] sm:text-xs leading-relaxed">{d}</p>)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </motion.div>
  )
}

/* ── Q&A data for interactive help ── */
const qaData = [
  {
    q: 'Indicador 4 (15%): Presente de forma atractiva la opción de desarrollo a seleccionar, ¿Cuáles son los criterios técnicos aplicados en la decision? ¿Cómo influyeron los estudios de factibilidad y las necesidades de la organización?',
    a: 'Seleccionamos la Opción 1: Desarrollo Incremental Ágil (MVP). Criterios técnicos: (1) Viabilidad económica — VAN +$306M > $0, TIR 178.2% >> 12%, PRI 20.1m < 36m; Opción 2 tenía VAN negativo. (2) Factibilidad técnica — MVP en 6 meses con equipo de 5 roles (PO, Backend, Mobile, UX, QA). Tecnologías: React/Vite + Express/Node.js + PostgreSQL. (3) Estudio de factibilidad — viable técnica, económica y operativamente. (4) Necesidades de la organización — solución URGENTE, MVP entrega valor en 6 meses vs 18+ de Opción 2. Matching por IA de colores (Sharp.js + distancia euclidiana RGB) + geoalertas por coordenadas con 85%+ precisión.'
  },
  {
    q: 'Indicador 5 (20%): Justifique la selección del proyecto de software y su vía específica de desarrollo, ¿Qué particularidades conlleva la implementación de esta opción? ¿Qué problemas específicos resuelve la vía de desarrollo seleccionada?',
    a: 'Justificamos Patitas Conectadas (Opción 1 MVP) por: (1) Problema resuelto — 85% de mascotas nunca regresan por falta de plataforma centralizada. (2) Vía de desarrollo — Incremental Ágil con entregas quincenales, validación temprana. (3) Particularidades de implementación — Fase 1 (meses 1-6): desarrollo MVP, inversión $46.56M en RRHH. Fase 2 (meses 7-36): operación con 4 roles. Financiamiento: 89% préstamo $50M al 12% + 11% capital $6.24M. (4) Problemas resueltos — matching IA, geoalertas, red de apoyo integrada. (5) Capacidad financiera: Liquidez 6.7 meses, Cobertura intereses 5.6x, Capacidad pago 117%.'
  },
  {
    q: 'Indicador 6 (20%): Explique los resultados del proceso de forma clara y persuasiva, ¿Cuáles son los datos y cifras relevantes para las partes interesadas? ¿Cómo se da cumplimiento a los requerimientos iniciales?',
    a: 'Resultados: Inversión $56.24M → Ingresos 36m $670M → Balance +$414M. VAN: +$305.9M > $0. TIR: 178.2% >> 12%. PRI: 20.1 meses < 36 meses. Pto. equilibrio: Mes 12. Cada $1 invertido genera $7.36. Cumplimiento: (1) MVP operativo en 6 meses ✓ (2) Modelo Freemium + B2B genera ingresos desde mes 7 ✓ (3) Cobertura nacional ✓ (4) Sostenibilidad financiera ✓ (5) Impacto social: tasa reencuentro 15% → 60%+ ✓. Benchmark SaaS: TIR 178.2% vs 25-40% (4.5x), PRI 20.1m vs 24-36m, Margen Neto 61.8% vs 10-20% (3x).'
  },
  {
    q: 'Indicador 7 (15%): Explique de forma reflexiva su aporte individual al trabajo realizado, ¿Cuáles son sus fortalezas, dificultades y lecciones aprendidas en esta etapa?',
    a: 'APORTE: Lideré el modelamiento financiero completo — flujo de caja (2 fases × 36 meses), tabla de amortización (Sistema Francés), VAN, TIR, PRI, estructura de inversión ($50M préstamo + $6.24M capital), y proyección de ingresos Freemium + B2B. FORTALEZAS: Capacidad analítica para traducir requerimientos de software en variables cuantitativas financieras. Rigor metodológico. Visión integral conectando decisiones técnicas con impacto financiero. DIFICULTAD: Sobreestimación inicial de ingresos (asumí 30% conversión Premium). La superé investigando benchmarks SaaS reales (15-20%) y ajustando al 10% conservador. LECCIONES: La viabilidad técnica es inútil sin flujo de caja saludable. Aprendí a evaluar inversiones en tecnología con criterio económico, no solo técnico.'
  }
]

/* ── Respuestas fundamentadas para preguntas de la rúbrica ── */
const rubricAnswers = {
  pregunta1: {
    title: 'Indicador 4 (15%) — Opción de desarrollo y criterios técnicos',
    subtitle: 'Presente de forma atractiva la opción de desarrollo a seleccionar. ¿Cuáles son los criterios técnicos aplicados en la decision? ¿Cómo influyeron los estudios de factibilidad y las necesidades de la organización?',
    answer: `Respuesta fundamentada — Indicador 4:

Seleccionamos la Opción 1: Desarrollo Incremental Ágil (MVP) basándonos en 4 criterios técnicos:

1. VIABILIDAD ECONÓMICA: VAN +$306M > $0, TIR 178.2% >> 12%, PRI 20.1m < 36m. La Opción 2 tenía VAN negativo, TIR < 12% y PRI > 36m, por lo que fue descartada.

2. FACTIBILIDAD TÉCNICA: El MVP se construye en 6 meses con 5 roles (PO, Backend, Mobile, UX, QA). Tecnologías probadas: React/Vite + Express/Node.js + PostgreSQL. La Opción 2 requería 18 meses de desarrollo con arquitectura compleja (microservicios, IA avanzada) y mayor riesgo técnico.

3. ESTUDIO DE FACTIBILIDAD: Demostramos viabilidad en 3 dimensiones: técnica (plataforma funciona con tecnologías existentes), económica (todos los indicadores positivos), y operativa (equipo de 5 personas en desarrollo, 4 en operación).

4. NECESIDADES DE LA ORGANIZACIÓN: Solución URGENTE para mascotas perdidas. MVP entrega valor en 6 meses vs 18+ de Opción 2. Modelo Freemium + B2B genera ingresos desde mes 7.

CRITERIO TÉCNICO CLAVE: Matching por IA de colores (Sharp.js + distancia euclidiana RGB) + geoalertas por coordenadas con 85%+ precisión sin algoritmos complejos.`
  },
  pregunta2: {
    title: 'Indicador 5 (20%) — Justificación y problemas resueltos',
    subtitle: 'Justifique la selección del proyecto de software y su vía específica de desarrollo. ¿Qué particularidades conlleva la implementación de esta opción? ¿Qué problemas específicos resuelve la vía de desarrollo seleccionada?',
    answer: `Respuesta fundamentada — Indicador 5:

Justificamos Patitas Conectadas bajo Opción 1 (MVP) por 5 razones:

1. PROBLEMA RESUELTO: 85% de mascotas perdidas nunca regresan por falta de plataforma centralizada. Patitas Conectadas centraliza reportes, matching automático y red de apoyo.

2. VÍA DE DESARROLLO: Desarrollo Incremental Ágil con entregas quincenales. Validación temprana con usuarios reales y ajuste continuo del producto.

3. PARTICULARIDADES DE IMPLEMENTACIÓN:
   - Fase 1 (Meses 1-6): Desarrollo MVP, inversión $46.56M en RRHH
   - Fase 2 (Meses 7-36): Operación con equipo reducido de 4 roles
   - Financiamiento: 89% préstamo ($50M al 12%) + 11% capital ($6.24M)
   - Ingresos: Freemium (10% conversión a $3.000/mes) + B2B (clínicas $100K, municipios $300K, refugios $60K)

4. PROBLEMAS ESPECÍFICOS QUE RESUELVE:
   - Matching inteligente por foto (IA de colores) inexistente en Chile
   - Notificaciones automáticas de coincidencias (reduce tiempo de búsqueda)
   - Red de apoyo integrada (clínicas, refugios, municipios)
   - Geoalertas que notifican a usuarios cercanos

5. CAPACIDAD FINANCIERA DEMOSTRADA:
   - Liquidez (Runway): 6.7 meses — cubre todo el desarrollo
   - Cobertura de intereses: 5.6x (>2.5x mínimo)
   - Capacidad de pago: 117% — holgura del 17% sobre cuota
   - Apalancamiento: 8:1, favorable porque TIR 178.2% >> 12%`
  },
  pregunta3: {
    title: 'Indicador 6 (20%) — Resultados y cifras clave',
    subtitle: 'Explique los resultados del proceso de forma clara y persuasiva. ¿Cuáles son los datos y cifras relevantes para las partes interesadas? ¿Cómo se da cumplimiento a los requerimientos iniciales?',
    answer: `Respuesta fundamentada — Indicador 6:

RESULTADOS DEL PROYECTO:
· Inversión total: $56.24M ($50M préstamo + $6.24M capital propio)
· Ingresos totales 36 meses: $670M (B2C ~$240M + B2B ~$430M)
· Costos totales (RRHH + infraestructura + intereses): ~$256M
· Balance neto empresa: +$414M
· Cada $1 invertido genera $7.36 de retorno

INDICADORES FINANCIEROS:
| Indicador | Resultado | Exigencia | ¿Cumple? |
| VAN | +$305.9M | > $0 | ✓ |
| TIR | 178.2% | > 12% | ✓ 14.8x superior |
| PRI | 20.1 meses | < 36 meses | ✓ |
| Pto. Equilibrio | Mes 12 | — | ✓ |

CUMPLIMIENTO DE REQUERIMIENTOS:
1. MVP operativo en 6 meses con matching IA y geoalertas ✓
2. Modelo Freemium + B2B genera ingresos desde mes 7 ✓
3. Cobertura nacional vía acuerdos municipales ✓
4. Sostenibilidad financiera probada (todos los indicadores positivos) ✓
5. Impacto social: subir tasa de reencuentro del 15% al 60%+ ✓

BENCHMARK INDUSTRIA SaaS:
| Indicador | Industria | Patitas | Diferencia |
| TIR | 25-40% | 178.2% | 4.5x superior |
| PRI | 24-36m | 20.1m | Récord bajo |
| Margen Neto | 10-20% | 61.8% | 3x superior |

ECUACIÓN DEL BALANCE: $670M (Ingresos) − $256M (Costos+Interés) = +$414M (Balance)`
  },
  pregunta4: {
    title: 'Indicador 7 (15%) — Reflexión Individual',
    subtitle: 'Explique de forma reflexiva su aporte individual al trabajo realizado. ¿Cuáles son sus fortalezas, dificultades y lecciones aprendidas en esta etapa?',
    answer: `Respuesta fundamentada — Indicador 7:

MI APORTE INDIVIDUAL:
Lideré el modelamiento financiero completo del proyecto: flujo de caja (2 fases × 36 meses), tabla de amortización (Sistema Francés), cálculos de VAN, TIR y PRI, estructura de inversión ($50M préstamo + $6.24M capital), y proyección de ingresos Freemium + B2B.

MIS FORTALEZAS:
- Capacidad analítica para traducir requerimientos de software en variables cuantitativas financieras
- Rigor metodológico para que cada cifra cuadre al centavo y sea consistente
- Visión integral conectando decisiones técnicas con su impacto financiero

PRINCIPAL DIFICULTAD:
Sobreestimación inicial de ingresos (asumí 30% de conversión Premium). La superé investigando benchmarks SaaS reales (tasa real: 15-20%) y ajustando al 10% conservador. Esto hizo el modelo realista y defendible ante inversionistas.

LECCIONES APRENDIDAS:
La viabilidad técnica de un software es inútil si no tiene un flujo de caja saludable. Un producto técnicamente brillante puede ser financieramente inviable. Aprendí a defender un proyecto tanto técnica como financieramente ante un directorio o inversionista.

CONTRIBUCIÓN A MI FORMACIÓN:
Este proyecto me preparó para tomar decisiones de inversión en tecnología con criterio económico, no solo técnico. Hoy puedo evaluar si un proyecto de software es viable, calcular su retorno, y argumentar con datos. Es una habilidad crítica para líderes de proyectos de software.`
  }
}

const rubricSlideMap = {
  3: rubricAnswers.pregunta1,
  4: rubricAnswers.pregunta2,
  6: rubricAnswers.pregunta3,
  7: rubricAnswers.pregunta4,
}

/* ── Main component ── */
export default function Presentacion() {
  const [slide, setSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [showQA, setShowQA] = useState(false)
  const [selectedQA, setSelectedQA] = useState(null)
  const [rubricData, setRubricData] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(0)
  const zoomValues = [1, 1.35, 1.7]
  const zoomLabels = ['100%', '135%', '170%']
  const containerRef = useRef(null)
  const navigate = useNavigate()
  const total = slides.length

  const goTo = useCallback((i) => {
    setDirection(i > slide ? 1 : -1)
    setSlide(Math.max(0, Math.min(total - 1, i)))
  }, [slide, total])

  const next = useCallback(() => slide < total - 1 && goTo(slide + 1), [slide, total, goTo])
  const prev = useCallback(() => slide > 0 && goTo(slide - 1), [slide, goTo])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev() }
      if (e.key === 'Escape' && fullscreen) document.exitFullscreen()
      if (e.key === 'f' || e.key === 'F') toggleFull()
      if (e.key === 'n' || e.key === 'N') setShowNotes(s => !s)
      if (e.key === 'q' || e.key === 'Q') setShowQA(s => !s)
      if (e.key === 'r' || e.key === 'R') { e.preventDefault(); rubricSlideMap[slide] && setRubricData(rubricSlideMap[slide]) }
      if (e.key === 'Escape') { setRubricData(null); setShowQA(false); if (fullscreen) document.exitFullscreen() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev, fullscreen, slide])

  useEffect(() => {
    const handler = () => setFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handler)
    return () => document.removeEventListener('fullscreenchange', handler)
  }, [])

  const toggleFull = async () => {
    try {
      if (!document.fullscreenElement) {
        const el = containerRef.current || document.documentElement
        await el.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (e) {
      // fallback: intentar con document.documentElement
      try {
        if (!document.fullscreenElement) await document.documentElement.requestFullscreen()
      } catch {}
    }
  }

  /* ── Animations conforming to OMNI cubic-bezier ── */
  const containerVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 200 : -200, scale: 0.95 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -200 : 200, scale: 0.95 }),
  }
  const contentVariants = {
    enter: { opacity: 0, y: 30 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  }

  return (
    <article ref={containerRef} className="relative h-screen w-full overflow-hidden bg-slate-900 select-none" aria-label="Presentación evaluación económica Patitas Conectadas">
      {/* ── Background transitions ── */}
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div key={slide} custom={direction} variants={containerVariants} initial="enter" animate="center" exit="exit"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute inset-0"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${slides[slide].gradient} transition-opacity duration-700`}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_70%)]" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Top bar: exit + progress dots + fullscreen ── */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-8 py-4" aria-label="Controles de presentación">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/60 hover:text-white transition-all duration-200 ease-out active:scale-95 focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg text-xs" aria-label="Salir de presentación">
          <ArrowRight className="w-4 h-4 rotate-180" /> Salir
        </button>
        <div className="flex items-center gap-3">
          <nav className="hidden sm:flex gap-1" aria-label="Navegación de diapositivas">
            {slides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Ir a diapositiva ${i + 1}`}
                className={`transition-all duration-300 rounded-full focus-visible:ring-2 focus-visible:ring-white/50 ${i === slide ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`}
              />
            ))}
          </nav>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setZoomLevel(z => (z + 1) % zoomValues.length)} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200 ease-out active:scale-95 focus-visible:ring-2 focus-visible:ring-white/50" aria-label={`Zoom: ${zoomLabels[zoomLevel]}`} title={`Zoom: ${zoomLabels[zoomLevel]}`}>
              <ZoomIn className="w-4 h-4" /><span className="text-[9px] font-mono ml-0.5">{zoomLabels[zoomLevel]}</span>
            </button>
            <button onClick={toggleFull} className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 ease-out active:scale-95 focus-visible:ring-2 focus-visible:ring-white/50" aria-label={fullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}>
              {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Slide content ── */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div key={slide} custom={direction} variants={contentVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col h-full overflow-y-auto overflow-x-hidden box-border px-4 sm:px-10 pt-4 sm:pt-6 pb-20 sm:pb-24"
        >
          <div className="w-full max-w-5xl mx-auto mt-auto mb-auto" style={{ zoom: zoomValues[zoomLevel] }}>

            {/* ══════════ SLIDE 0 — PORTADA ══════════ */}
            {slide === 0 && <section className="text-center">
              <SlideIn delay={0}>
                <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, ease: [0.16, 1, 0.3, 1] }}
                  className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
                >
                  <PawPrint className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                </motion.div>
              </SlideIn>
              <SlideIn delay={0.3}>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-3 tracking-tight">
                  Patitas <span className="bg-gradient-to-r from-orange-300 to-pink-300 bg-clip-text text-transparent">Conectadas</span>
                </h1>
              </SlideIn>
              <SlideIn delay={0.5}>
                <p className="text-white/80 text-lg sm:text-2xl font-light mb-2">Evaluación Económica de Proyecto de Software</p>
              </SlideIn>
              <SlideIn delay={0.7}>
                <p className="text-white/50 text-sm sm:text-base">GPY1101 — Duoc UC</p>
                <p className="text-white/40 text-xs sm:text-sm mt-1">Opción 1: Desarrollo Incremental Ágil (MVP) | 36 meses</p>
              </SlideIn>
              <SlideIn delay={1.0}>
                <div className="mt-10 sm:mt-14 flex items-center justify-center gap-2 text-white/40 text-sm">
                  <span className="animate-pulse">Presiona → para comenzar</span>
                  <ChevronRight className="w-4 h-4 animate-pulse" />
                </div>
              </SlideIn>
            </section>}

            {/* ══════════ SLIDE 1 — CONTEXTO / EL PROBLEMA ══════════ */}
            {slide === 1 && <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center">
              <div className="text-center lg:text-left">
                <SlideIn delay={0}>
                  <div className="text-7xl sm:text-9xl font-black text-white/90 leading-none mb-2">85<small className="text-4xl sm:text-5xl">%</small></div>
                </SlideIn>
                <SlideIn delay={0.2}>
                  <p className="text-white/80 text-lg sm:text-2xl font-light">de las mascotas perdidas <span className="text-red-300 font-semibold">nunca</span> regresan</p>
                </SlideIn>
                <SlideIn delay={0.5}>
                  <p className="text-white/50 text-xs sm:text-sm mt-4">Un problema que afecta a miles de familias chilenas</p>
                </SlideIn>
              </div>
              <aside className="space-y-4">
                <SlideIn delay={0.4}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 transition-all duration-200 ease-out hover:bg-white/15">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">10.000+</div>
                    <div className="text-white/60 text-sm">mascotas perdidas al año en Chile</div>
                  </div>
                </SlideIn>
                <SlideIn delay={0.55}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 transition-all duration-200 ease-out hover:bg-white/15">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">15%</div>
                    <div className="text-white/60 text-sm">tasa actual de reencuentro</div>
                  </div>
                </SlideIn>
                <SlideIn delay={0.7}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 transition-all duration-200 ease-out hover:bg-white/15">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">$56M</div>
                    <div className="text-white/60 text-sm">inversión total del proyecto</div>
                  </div>
                </SlideIn>
              </aside>
            </section>}

            {/* ══════════ SLIDE 2 — EVALUACIÓN MULTICRITERIO ══════════ */}
            {slide === 2 && <section className="w-full max-w-6xl">
              <div className="text-center mb-3">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 rounded-full bg-amber-500/20 flex items-center justify-center"
                >
                  <Scale className="w-6 h-6 sm:w-8 sm:h-8 text-amber-300" />
                </motion.div>
                <h2 className="text-xl sm:text-3xl font-black text-white">Evaluación Multicriterio — Selección de Alternativas</h2>
                <p className="text-white/50 text-[10px] sm:text-sm mt-1">Matriz de decisión ponderada · 3 dimensiones · 6 criterios técnicos, administrativos y normativos</p>
              </div>

              <SlideIn delay={0.1}>
                <div className="overflow-x-auto">
                  <table className="w-full text-[8px] sm:text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-1.5 pr-2 text-white/60 font-semibold">Criterio Evaluado</th>
                        <th className="text-center py-1.5 px-1 text-white/40 text-[6px] sm:text-[9px]">Dimensión</th>
                        <th className="text-center py-1.5 px-1 text-white/40 text-[6px] sm:text-[9px]">Peso</th>
                        <th className="text-center py-1.5 px-1 text-emerald-300 font-semibold">Opción 1<br/><span className="text-[7px] sm:text-[10px] font-normal">MVP Ágil PRO</span></th>
                        <th className="text-center py-1.5 px-1 text-amber-300 font-semibold">Opción 2<br/><span className="text-[7px] sm:text-[10px] font-normal">Cascada Total</span></th>
                        <th className="text-center py-1.5 px-1 text-rose-300 font-semibold">Opción 3<br/><span className="text-[7px] sm:text-[10px] font-normal">SaaS Híbrido</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-1 pr-2 text-white/80 font-medium">Funcionalidad Core</td>
                        <td className="text-center px-1"><span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[6px] sm:text-[9px]">Técnico</span></td>
                        <td className="text-center px-1 text-white/60">20%</td>
                        <td className="text-center px-1"><span className="font-bold text-emerald-300">15</span><span className="text-white/40">/20</span></td>
                        <td className="text-center px-1"><span className="font-bold text-amber-300">20</span><span className="text-white/40">/20</span></td>
                        <td className="text-center px-1"><span className="font-bold text-rose-300">18</span><span className="text-white/40">/20</span></td>
                      </tr>
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-1 pr-2 text-white/80 font-medium">Integración Sistemas</td>
                        <td className="text-center px-1"><span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[6px] sm:text-[9px]">Técnico</span></td>
                        <td className="text-center px-1 text-white/60">20%</td>
                        <td className="text-center px-1"><span className="font-bold text-emerald-300">10</span><span className="text-white/40">/20</span></td>
                        <td className="text-center px-1"><span className="font-bold text-amber-300">20</span><span className="text-white/40">/20</span></td>
                        <td className="text-center px-1"><span className="font-bold text-rose-300">15</span><span className="text-white/40">/20</span></td>
                      </tr>
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-1 pr-2 text-white/80 font-medium">Capacidad del Equipo</td>
                        <td className="text-center px-1"><span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[6px] sm:text-[9px]">Admin.</span></td>
                        <td className="text-center px-1 text-white/60">15%</td>
                        <td className="text-center px-1"><span className="font-bold text-emerald-300">15</span><span className="text-white/40">/15</span></td>
                        <td className="text-center px-1"><span className="font-bold text-amber-300">5</span><span className="text-white/40">/15</span></td>
                        <td className="text-center px-1"><span className="font-bold text-rose-300">10</span><span className="text-white/40">/15</span></td>
                      </tr>
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-1 pr-2 text-white/80 font-medium">Viabilidad Financiera</td>
                        <td className="text-center px-1"><span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[6px] sm:text-[9px]">Admin.</span></td>
                        <td className="text-center px-1 text-white/60">15%</td>
                        <td className="text-center px-1"><span className="font-bold text-emerald-300">15</span><span className="text-white/40">/15</span></td>
                        <td className="text-center px-1"><span className="font-bold text-amber-300">5</span><span className="text-white/40">/15</span></td>
                        <td className="text-center px-1"><span className="font-bold text-rose-300">10</span><span className="text-white/40">/15</span></td>
                      </tr>
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-1 pr-2 text-white/80 font-medium">Privacidad de Datos</td>
                        <td className="text-center px-1"><span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[6px] sm:text-[9px]">Normativo</span></td>
                        <td className="text-center px-1 text-white/60">15%</td>
                        <td className="text-center px-1"><span className="font-bold text-emerald-300">15</span><span className="text-white/40">/15</span></td>
                        <td className="text-center px-1"><span className="font-bold text-amber-300">15</span><span className="text-white/40">/15</span></td>
                        <td className="text-center px-1"><span className="font-bold text-rose-300">5</span><span className="text-white/40">/15</span></td>
                      </tr>
                      <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="py-1 pr-2 text-white/80 font-medium">Propiedad Intelectual</td>
                        <td className="text-center px-1"><span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[6px] sm:text-[9px]">Normativo</span></td>
                        <td className="text-center px-1 text-white/60">15%</td>
                        <td className="text-center px-1"><span className="font-bold text-emerald-300">15</span><span className="text-white/40">/15</span></td>
                        <td className="text-center px-1"><span className="font-bold text-amber-300">15</span><span className="text-white/40">/15</span></td>
                        <td className="text-center px-1"><span className="font-bold text-rose-300">5</span><span className="text-white/40">/15</span></td>
                      </tr>
                      <tr className="bg-white/10 font-bold">
                        <td className="py-1.5 pr-2 text-white">Veredicto Final</td>
                        <td className="text-center px-1"></td>
                        <td className="text-center px-1 text-white">100%</td>
                        <td className="text-center px-1"><span className="text-emerald-300 text-sm sm:text-lg">85%</span><br/><span className="text-emerald-300/80 text-[7px]">Factible</span></td>
                        <td className="text-center px-1"><span className="text-amber-300 text-sm sm:text-lg">80%</span><br/><span className="text-amber-300/80 text-[7px]">Riesgo Alto</span></td>
                        <td className="text-center px-1"><span className="text-rose-300 text-sm sm:text-lg">63%</span><br/><span className="text-rose-300/80 text-[7px]">Deficiente</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </SlideIn>

              <SlideIn delay={0.2}>
                <div className="mt-2 grid grid-cols-3 gap-2 max-w-4xl mx-auto">
                  <div className="bg-emerald-500/10 rounded-xl p-2 border border-emerald-500/20 text-center">
                    <div className="text-emerald-300 font-bold text-sm">Opción 1: 85% ✅</div>
                    <p className="text-white/50 text-[8px]">MVP Ágil PRO — SELECCIONADA. Destaca en capacidad equipo, viabilidad financiera y normativo.</p>
                  </div>
                  <div className="bg-amber-500/10 rounded-xl p-2 border border-amber-500/20 text-center">
                    <div className="text-amber-300 font-bold text-sm">Opción 2: 80% ⚠️</div>
                    <p className="text-white/50 text-[8px]">Cascada Total — RIESGO ALTO. Gana en técnico pero pierde en financiero (TIR negativa).</p>
                  </div>
                  <div className="bg-rose-500/10 rounded-xl p-2 border border-rose-500/20 text-center">
                    <div className="text-rose-300 font-bold text-sm">Opción 3: 63% ❌</div>
                    <p className="text-white/50 text-[8px]">SaaS Híbrido — DEFICIENTE. Incumple normativa de privacidad y propiedad intelectual.</p>
                  </div>
                </div>
              </SlideIn>
            </section>}

            {/* ══════════ SLIDE 3 — INDICADOR 4 (15%) ══════════ */}
            {slide === 3 && <section className="w-full max-w-5xl">
              <div className="flex items-center gap-2 mb-3 justify-center">
                <button onClick={() => setRubricData(rubricAnswers.pregunta1)} type="button" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity active:scale-95 focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg px-2 py-1" title="Click para respuesta fundamentada">
                  <Target className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-300" />
                  <span className="text-xl sm:text-3xl font-black">Indicador 4 (15%) — Opción de Desarrollo</span>
                </button>
              </div>
              <p className="text-white/50 text-[10px] sm:text-sm text-center mb-3">Presente de forma atractiva la opción de desarrollo a seleccionar. ¿Cuáles son los criterios técnicos aplicados en la decisión? ¿Cómo influyeron los estudios de factibilidad y las necesidades de la organización?</p>

              <SlideIn delay={0.1}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-5xl mx-auto mb-2">
                  <div className="bg-emerald-500/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-emerald-500/20 transition-all duration-200 ease-out hover:bg-emerald-500/15">
                    <div className="text-emerald-300 font-bold text-[9px] sm:text-xs mb-1"><CheckCircle className="w-3 h-3 inline mr-1" /> Opción 1: Desarrollo Incremental Ágil (MVP)</div>
                    <p className="text-white/60 text-[8px] sm:text-[10px] leading-relaxed">36 meses de proyecto. 6 meses de desarrollo con equipo de 5 roles (PO, Backend, Mobile, UX, QA). Inversión $56.24M. TIR 178.2%, VAN +$306M, PRI 20.1 meses.</p>
                  </div>
                  <div className="bg-red-500/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-red-500/20 transition-all duration-200 ease-out hover:bg-red-500/15">
                    <div className="text-red-300 font-bold text-[9px] sm:text-xs mb-1"><X className="w-3 h-3 inline mr-1" /> Opción 2: Desarrollo Full (Descartada)</div>
                    <p className="text-white/60 text-[8px] sm:text-[10px] leading-relaxed">48+ meses. Inversión $120M+. VAN negativo, TIR &lt; 12%, PRI &gt; 36m. No viable financieramente.</p>
                  </div>
                </div>
              </SlideIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-5xl mx-auto">
                <SlideIn delay={0.15}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/10 h-full">
                    <h4 className="text-white/90 font-bold text-[8px] sm:text-[10px] mb-1"><CheckCircle className="w-2.5 h-2.5 inline mr-0.5" /> Viabilidad Económica</h4>
                    <p className="text-white/50 text-[7px] sm:text-[9px] leading-relaxed">VAN +$306M &gt; $0, TIR 178.2% &gt;&gt; 12%, PRI 20.1m &lt; 36m. Opción 2: VAN negativo, TIR &lt; 12%, PRI &gt; 36m.</p>
                  </div>
                </SlideIn>
                <SlideIn delay={0.2}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/10 h-full">
                    <h4 className="text-white/90 font-bold text-[8px] sm:text-[10px] mb-1"><CheckCircle className="w-2.5 h-2.5 inline mr-0.5" /> Factibilidad Técnica</h4>
                    <p className="text-white/50 text-[7px] sm:text-[9px] leading-relaxed">MVP en 6 meses con 5 roles. React/Vite + Express/Node.js + PostgreSQL. Opción 2: 18 meses, microservicios, IA avanzada.</p>
                  </div>
                </SlideIn>
                <SlideIn delay={0.25}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/10 h-full">
                    <h4 className="text-white/90 font-bold text-[8px] sm:text-[10px] mb-1"><CheckCircle className="w-2.5 h-2.5 inline mr-0.5" /> Estudio de Factibilidad</h4>
                    <p className="text-white/50 text-[7px] sm:text-[9px] leading-relaxed">3 dimensiones: técnica (tecnologías probadas), económica (indicadores positivos), operativa (equipo 5/4 roles).</p>
                  </div>
                </SlideIn>
                <SlideIn delay={0.3}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/10 h-full">
                    <h4 className="text-white/90 font-bold text-[8px] sm:text-[10px] mb-1"><CheckCircle className="w-2.5 h-2.5 inline mr-0.5" /> Necesidades Organización</h4>
                    <p className="text-white/50 text-[7px] sm:text-[9px] leading-relaxed">Solución urgente: MVP en 6 meses vs 18+. Matching IA (85%+ precisión) + geoalertas. Modelo Freemium + B2B.</p>
                  </div>
                </SlideIn>
              </div>
            </section>}

            {/* ══════════ SLIDE 3 — INDICADOR 5 (20%) ══════════ */}
            {slide === 3 && <section className="w-full max-w-5xl">
              <div className="flex items-center gap-2 mb-3 justify-center">
                <button onClick={() => setRubricData(rubricAnswers.pregunta2)} type="button" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity active:scale-95 focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg px-2 py-1" title="Click para respuesta fundamentada">
                  <BarChart3 className="w-5 h-5 sm:w-7 sm:h-7 text-blue-300" />
                  <span className="text-xl sm:text-3xl font-black">Indicador 5 (20%) — Justificación del Proyecto</span>
                </button>
              </div>
              <p className="text-white/50 text-[10px] sm:text-sm text-center mb-3">Justifique la selección del proyecto de software y su vía específica de desarrollo. ¿Qué particularidades conlleva la implementación de esta opción? ¿Qué problemas específicos resuelve la vía de desarrollo seleccionada?</p>

              <div className="grid grid-cols-2 gap-2 max-w-5xl mx-auto mb-2">
                <SlideIn delay={0.1}>
                  <div className="bg-rose-500/10 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-rose-500/20 h-full">
                    <div className="text-rose-300 font-bold text-[8px] sm:text-[10px] mb-0.5"><Heart className="w-2.5 h-2.5 inline mr-0.5" /> Problema Resuelto</div>
                    <p className="text-white/60 text-[7px] sm:text-[9px] leading-relaxed">85% de mascotas perdidas nunca regresan. Patitas Conectadas centraliza reportes, matching automático y red de apoyo en una plataforma.</p>
                  </div>
                </SlideIn>
                <SlideIn delay={0.15}>
                  <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-blue-500/20 h-full">
                    <div className="text-blue-300 font-bold text-[8px] sm:text-[10px] mb-0.5"><RefreshCw className="w-2.5 h-2.5 inline mr-0.5" /> Vía de Desarrollo</div>
                    <p className="text-white/60 text-[7px] sm:text-[9px] leading-relaxed">Desarrollo Incremental Ágil con entregas quincenales. Validación temprana con usuarios reales y ajuste continuo del producto.</p>
                  </div>
                </SlideIn>
              </div>

              <SlideIn delay={0.2}>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-white/10 mb-2">
                  <p className="text-white/50 text-[7px] sm:text-[9px] uppercase tracking-wider mb-1"><ClipboardList className="w-2.5 h-2.5 inline mr-0.5" /> Particularidades de Implementación</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    <div className="bg-white/5 rounded-lg p-1.5 text-center"><span className="text-white/80 font-semibold text-[10px] sm:text-sm">Fase 1</span><p className="text-white/40 text-[7px] sm:text-[9px]">Meses 1-6: Desarrollo MVP</p><p className="text-white/30 text-[6px] sm:text-[8px]">$46.56M RRHH</p></div>
                    <div className="bg-white/5 rounded-lg p-1.5 text-center"><span className="text-white/80 font-semibold text-[10px] sm:text-sm">Fase 2</span><p className="text-white/40 text-[7px] sm:text-[9px]">Meses 7-36: Operación</p><p className="text-white/30 text-[6px] sm:text-[8px]">4 roles operativos</p></div>
                    <div className="bg-white/5 rounded-lg p-1.5 text-center"><span className="text-amber-300 font-semibold text-[10px] sm:text-sm">89% Deuda</span><p className="text-white/40 text-[7px] sm:text-[9px]">$50M al 12% anual</p><p className="text-white/30 text-[6px] sm:text-[8px]">Sistema Francés</p></div>
                    <div className="bg-white/5 rounded-lg p-1.5 text-center"><span className="text-emerald-300 font-semibold text-[10px] sm:text-sm">Modelo Mixto</span><p className="text-white/40 text-[7px] sm:text-[9px]">Freemium + B2B</p><p className="text-white/30 text-[6px] sm:text-[8px]">Ingresos desde mes 7</p></div>
                  </div>
                </div>
              </SlideIn>

              <SlideIn delay={0.25}>
                <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-indigo-500/20">
                  <p className="text-indigo-300/80 text-[7px] sm:text-[9px] uppercase tracking-wider text-center font-bold mb-1"><BarChart3 className="w-3 h-3 inline mr-0.5" /> Capacidad Financiera Demostrada</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    <div className="bg-white/10 rounded-lg p-1.5 text-center"><div className="text-blue-300 font-bold text-[10px] sm:text-sm">6.7 meses</div><p className="text-white/50 text-[6px] sm:text-[8px]">Liquidez (Runway)</p></div>
                    <div className="bg-white/10 rounded-lg p-1.5 text-center"><div className="text-amber-300 font-bold text-[10px] sm:text-sm">5.6x</div><p className="text-white/50 text-[6px] sm:text-[8px]">Cobertura Intereses</p></div>
                    <div className="bg-white/10 rounded-lg p-1.5 text-center"><div className="text-emerald-300 font-bold text-[10px] sm:text-sm">117%</div><p className="text-white/50 text-[6px] sm:text-[8px]">Capacidad Pago</p></div>
                    <div className="bg-white/10 rounded-lg p-1.5 text-center"><div className="text-purple-300 font-bold text-[10px] sm:text-sm">8:1</div><p className="text-white/50 text-[6px] sm:text-[8px]">Apalancamiento</p></div>
                  </div>
                </div>
              </SlideIn>
            </section>}

            {/* ══════════ SLIDE 5 — HERRAMIENTAS Y MÉTODOS ══════════ */}
            {slide === 5 && <section className="w-full max-w-6xl">
              <div className="text-center mb-3">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 rounded-full bg-purple-500/20 flex items-center justify-center"
                >
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-purple-300" />
                </motion.div>
                <h2 className="text-xl sm:text-3xl font-black text-white">Herramientas Colaborativas y Métodos de Análisis</h2>
                <p className="text-white/50 text-[10px] sm:text-sm mt-1">Ofimática 365 · Project Libre · Git/GitHub · Vercel · Sala de Proyectos</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-w-6xl mx-auto">
                <SlideIn delay={0.1}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10 h-full">
                    <h3 className="text-purple-300 font-bold text-xs sm:text-sm mb-2 flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> Herramientas Colaborativas</h3>
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                        <div className="text-white/80 font-semibold text-[9px] sm:text-xs">Ofimática 365</div>
                        <p className="text-white/40 text-[7px] sm:text-[9px]">Documentación compartida, tablas dinámicas, informes en tiempo real</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                        <div className="text-white/80 font-semibold text-[9px] sm:text-xs">Project Libre</div>
                        <p className="text-white/40 text-[7px] sm:text-[9px]">Cronograma WBS, ruta crítica, asignación de recursos, seguimiento</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                        <div className="text-white/80 font-semibold text-[9px] sm:text-xs">Git / GitHub</div>
                        <p className="text-white/40 text-[7px] sm:text-[9px]">Control de versiones, trabajo colaborativo, code review, CI/CD</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                        <div className="text-white/80 font-semibold text-[9px] sm:text-xs">Sala de Proyectos</div>
                        <p className="text-white/40 text-[7px] sm:text-[9px]">Pizarra para planning semanal, TV para sprints reviews</p>
                      </div>
                    </div>
                  </div>
                </SlideIn>

                <SlideIn delay={0.15}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10 h-full">
                    <h3 className="text-amber-300 font-bold text-xs sm:text-sm mb-2 flex items-center gap-1.5"><BarChart3 className="w-4 h-4" /> Métodos de Análisis Aplicados</h3>
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                        <div className="text-white/80 font-semibold text-[9px] sm:text-xs">Matriz Multicriterio</div>
                        <p className="text-white/40 text-[7px] sm:text-[9px]">6 criterios ponderados × 3 alternativas. Puntaje 0-20 por criterio.</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                        <div className="text-white/80 font-semibold text-[9px] sm:text-xs">VAN / TIR / PRI</div>
                        <p className="text-white/40 text-[7px] sm:text-[9px]">Flujo caja descontado 12% anual. Tasa mínima exigida por el CFO.</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                        <div className="text-white/80 font-semibold text-[9px] sm:text-xs">Capacidad Financiera</div>
                        <p className="text-white/40 text-[7px] sm:text-[9px]">4 ratios: Liquidez, Cobertura, Capacidad Pago, Apalancamiento</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                        <div className="text-white/80 font-semibold text-[9px] sm:text-xs">Benchmark SaaS</div>
                        <p className="text-white/40 text-[7px] sm:text-[9px]">Comparación con industria (OpenView, SaaS Capital 2024)</p>
                      </div>
                    </div>
                  </div>
                </SlideIn>
              </div>

              <SlideIn delay={0.2}>
                <div className="mt-2 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 border border-indigo-500/20 max-w-4xl mx-auto">
                  <p className="text-indigo-300/80 text-[7px] sm:text-[9px] uppercase tracking-wider text-center font-bold mb-1"><Target className="w-3 h-3 inline mr-0.5" /> Mitigación de Errores en el Análisis</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-center">
                    <div className="bg-white/10 rounded-lg p-1.5"><div className="text-rose-300 font-bold text-[9px] sm:text-xs">Sobreestimación ingresos</div><p className="text-white/50 text-[7px] sm:text-[9px]">Benchmarks SaaS reales (15-20%) → ajuste 10% conservador</p></div>
                    <div className="bg-white/10 rounded-lg p-1.5"><div className="text-rose-300 font-bold text-[9px] sm:text-xs">Riesgo técnico</div><p className="text-white/50 text-[7px] sm:text-[9px]">MVP en 6 meses con 5 roles → tecnología probada, entregas quincenales</p></div>
                    <div className="bg-white/10 rounded-lg p-1.5"><div className="text-rose-300 font-bold text-[9px] sm:text-xs">Riesgo normativo</div><p className="text-white/50 text-[7px] sm:text-[9px]">Evaluación PDP (privacidad) + PI → opción 3 descartada por incumplimiento</p></div>
                    <div className="bg-white/10 rounded-lg p-1.5"><div className="text-rose-300 font-bold text-[9px] sm:text-xs">Riesgo financiero</div><p className="text-white/50 text-[7px] sm:text-[9px]">TIR 178.2% &gt;&gt; 12% → capacidad de pago 117% → holgura del 17%</p></div>
                  </div>
                </div>
              </SlideIn>
            </section>}

            {/* ══════════ SLIDE 6 — INDICADOR 6 (20%) ══════════ */}
            {slide === 6 && <section className="w-full max-w-5xl">
              <div className="flex items-center gap-2 mb-3 justify-center">
                <button onClick={() => setRubricData(rubricAnswers.pregunta3)} type="button" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity active:scale-95 focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg px-2 py-1" title="Click para respuesta fundamentada">
                  <TrendingUp className="w-5 h-5 sm:w-7 sm:h-7 text-violet-300" />
                  <span className="text-xl sm:text-3xl font-black">Indicador 6 (20%) — Resultados y Cifras Clave</span>
                </button>
              </div>
              <p className="text-white/50 text-[10px] sm:text-sm text-center mb-3">Explique los resultados del proceso de forma clara y persuasiva. ¿Cuáles son los datos y cifras relevantes para las partes interesadas? ¿Cómo se da cumplimiento a los requerimientos iniciales?</p>

              <SlideIn delay={0.1}>
                <div className="grid grid-cols-4 gap-1.5 max-w-4xl mx-auto mb-2">
                  <div className="bg-emerald-500/15 rounded-lg p-1.5 sm:p-2.5 border border-emerald-500/30 text-center"><div className="text-white/40 text-[6px] sm:text-[8px] uppercase">VAN</div><div className="text-sm sm:text-lg font-black text-emerald-300"><CountUp end={305902076} duration={2500} prefix="$" /></div><div className="text-emerald-300/80 text-[6px] sm:text-[8px]">&gt; $0</div></div>
                  <div className="bg-emerald-500/15 rounded-lg p-1.5 sm:p-2.5 border border-emerald-500/30 text-center"><div className="text-white/40 text-[6px] sm:text-[8px] uppercase">TIR</div><div className="text-sm sm:text-lg font-black text-emerald-300"><CountUp end={1782} duration={2000} decimals={1} suffix="%" /></div><div className="text-emerald-300/80 text-[6px] sm:text-[8px]">&gt; 12%</div></div>
                  <div className="bg-emerald-500/15 rounded-lg p-1.5 sm:p-2.5 border border-emerald-500/30 text-center"><div className="text-white/40 text-[6px] sm:text-[8px] uppercase">PRI</div><div className="text-sm sm:text-lg font-black text-emerald-300"><CountUp end={201} duration={2000} decimals={1} suffix="m" /></div><div className="text-emerald-300/80 text-[6px] sm:text-[8px]">&lt; 36m</div></div>
                  <div className="bg-amber-500/15 rounded-lg p-1.5 sm:p-2.5 border border-amber-500/30 text-center"><div className="text-white/40 text-[6px] sm:text-[8px] uppercase">Equilibrio</div><div className="text-sm sm:text-lg font-black text-amber-300">Mes 12</div><div className="text-amber-300/80 text-[6px] sm:text-[8px]">✓</div></div>
                </div>
              </SlideIn>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-5xl mx-auto mb-2">
                <SlideIn delay={0.15}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-white/10 h-full">
                    <p className="text-white/50 text-[7px] sm:text-[9px] uppercase tracking-wider mb-1"><DollarSign className="w-2.5 h-2.5 inline mr-0.5" /> Resumen Económico</p>
                    <div className="space-y-0.5 text-[7px] sm:text-[9px]">
                      <div className="flex justify-between"><span className="text-white/60">Inversión total</span><span className="text-white font-semibold">$56.24M</span></div>
                      <div className="flex justify-between"><span className="text-white/60">Ingresos 36m</span><span className="text-emerald-300 font-semibold">$670M</span></div>
                      <div className="flex justify-between"><span className="text-white/60">Costos totales</span><span className="text-amber-300 font-semibold">-$256M</span></div>
                      <div className="flex justify-between border-t border-white/10 pt-0.5"><span className="text-white/80">Balance neto</span><span className="text-emerald-300 font-bold">+$414M</span></div>
                      <div className="flex justify-between"><span className="text-white/60">Retorno por $1</span><span className="text-emerald-300 font-semibold">$7.36</span></div>
                    </div>
                  </div>
                </SlideIn>
                <SlideIn delay={0.2}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-white/10 h-full">
                    <p className="text-white/50 text-[7px] sm:text-[9px] uppercase tracking-wider mb-1"><ClipboardCheck className="w-2.5 h-2.5 inline mr-0.5" /> Cumplimiento de Requerimientos</p>
                    <ul className="text-white/60 text-[7px] sm:text-[9px] space-y-0.5 list-disc list-inside">
                      <li>MVP operativo en 6 meses con matching IA y geoalertas ✓</li>
                      <li>Modelo Freemium + B2B genera ingresos desde mes 7 ✓</li>
                      <li>Cobertura nacional vía acuerdos municipales ✓</li>
                      <li>Sostenibilidad financiera probada ✓</li>
                      <li>Impacto social: tasa reencuentro 15% → 60%+ ✓</li>
                    </ul>
                  </div>
                </SlideIn>
              </div>

              <SlideIn delay={0.25}>
                <div className="max-w-5xl mx-auto bg-gradient-to-br from-amber-900/20 to-orange-900/20 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-amber-500/20">
                  <p className="text-amber-300/80 text-[7px] sm:text-[9px] uppercase tracking-wider text-center font-bold mb-1"><BarChart3 className="w-3 h-3 inline mr-0.5" /> Benchmark Industria SaaS</p>
                  <div className="grid grid-cols-4 gap-x-2 gap-y-0.5 text-[7px] sm:text-[9px] items-center max-w-md mx-auto">
                    <div className="text-white/30 font-medium">Indicador</div><div className="text-white/30 text-center">Industria</div><div className="text-white/30 text-center">Patitas</div><div className="text-white/30 text-center">Brecha</div>
                    <span className="text-white/70">TIR</span><span className="text-white/40 text-center">25-40%</span><span className="text-emerald-300 font-bold text-center">178.2%</span><span className="text-emerald-300 text-center">↑ 4.5x</span>
                    <span className="text-white/70">PRI</span><span className="text-white/40 text-center">24-36m</span><span className="text-emerald-300 font-bold text-center">20.1m</span><span className="text-emerald-300 text-center">Récord</span>
                    <span className="text-white/70">Margen Neto</span><span className="text-white/40 text-center">10-20%</span><span className="text-emerald-300 font-bold text-center">61.8%</span><span className="text-emerald-300 text-center">↑ 3x</span>
                  </div>
                </div>
              </SlideIn>
            </section>}

            {/* ══════════ SLIDE 7 — INDICADOR 7 (15%) ══════════ */}
            {slide === 7 && <section className="max-w-4xl mx-auto w-full">
              <div className="flex items-center gap-2 mb-3 justify-center">
                <button onClick={() => setRubricData(rubricAnswers.pregunta4)} type="button" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity active:scale-95 focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg px-2 py-1" title="Click para respuesta fundamentada">
                  <Lightbulb className="w-5 h-5 sm:w-7 sm:h-7 text-teal-300" />
                  <span className="text-xl sm:text-3xl font-black">Indicador 7 (15%) — Reflexión Individual</span>
                </button>
              </div>
              <p className="text-white/50 text-[10px] sm:text-sm text-center mb-3">Explique de forma reflexiva su aporte individual al trabajo realizado. ¿Cuáles son sus fortalezas, dificultades y lecciones aprendidas en esta etapa?</p>

              <SlideIn delay={0.1}>
                <div className="bg-indigo-500/10 backdrop-blur-sm rounded-2xl p-3 sm:p-5 border border-indigo-500/20 mb-3 max-w-3xl mx-auto">
                  <div className="flex items-center gap-2 mb-1.5"><Lightbulb className="w-4 h-4 text-amber-300" /><span className="text-amber-300 font-bold text-[10px] sm:text-xs uppercase tracking-wider">Mi Aporte Individual</span></div>
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed">Lideré el modelamiento financiero completo del proyecto: flujo de caja (2 fases × 36 meses), tabla de amortización (Sistema Francés), cálculos de VAN, TIR y PRI, estructura de inversión ($50M préstamo + $6.24M capital), y proyección de ingresos Freemium + B2B.</p>
                </div>
              </SlideIn>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-3xl mx-auto">
                <SlideIn delay={0.2}>
                  <div className="bg-emerald-500/10 backdrop-blur-sm rounded-xl p-2 sm:p-3.5 border border-emerald-500/20 h-full">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center mb-1.5"><TrendingUp className="w-3.5 h-3.5 text-emerald-300" /></div>
                    <div className="text-emerald-300 font-bold text-[9px] sm:text-xs mb-0.5">Fortalezas</div>
                    <ul className="text-white/60 text-[7px] sm:text-[10px] leading-relaxed space-y-0.5 list-disc list-inside">
                      <li>Capacidad analítica para traducir requerimientos de software a variables financieras</li>
                      <li>Rigor metodológico para que cada cifra cuadre al centavo</li>
                      <li>Visión integral conectando decisiones técnicas con impacto financiero</li>
                    </ul>
                  </div>
                </SlideIn>
                <SlideIn delay={0.3}>
                  <div className="bg-amber-500/10 backdrop-blur-sm rounded-xl p-2 sm:p-3.5 border border-amber-500/20 h-full">
                    <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center mb-1.5"><Target className="w-3.5 h-3.5 text-amber-300" /></div>
                    <div className="text-amber-300 font-bold text-[9px] sm:text-xs mb-0.5">Dificultades</div>
                    <ul className="text-white/60 text-[7px] sm:text-[10px] leading-relaxed space-y-0.5 list-disc list-inside">
                      <li>Sobreestimación inicial de ingresos (asumí 30% conversión Premium)</li>
                      <li>Superada investigando benchmarks SaaS reales (15-20%)</li>
                      <li>Ajuste a tasa conservadora del 10% — modelo realista y defendible</li>
                    </ul>
                  </div>
                </SlideIn>
                <SlideIn delay={0.4}>
                  <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-2 sm:p-3.5 border border-blue-500/20 h-full">
                    <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center mb-1.5"><BookOpen className="w-3.5 h-3.5 text-blue-300" /></div>
                    <div className="text-blue-300 font-bold text-[9px] sm:text-xs mb-0.5">Lecciones</div>
                    <ul className="text-white/60 text-[7px] sm:text-[10px] leading-relaxed space-y-0.5 list-disc list-inside">
                      <li>Viabilidad técnica es inútil sin flujo de caja saludable</li>
                      <li>Evaluar inversiones en tecnología con criterio económico</li>
                      <li>Defensa técnica + financiera ante inversionistas</li>
                    </ul>
                  </div>
                </SlideIn>
              </div>

              <SlideIn delay={0.5}>
                <blockquote className="max-w-2xl mx-auto mt-2 sm:mt-3 text-center px-4">
                  <p className="text-white/80 text-xs sm:text-sm italic leading-relaxed">"La viabilidad técnica de un software <span className="text-orange-200 font-semibold">es inútil</span> si no tiene un flujo de caja saludable. Hoy puedo defender un proyecto tanto técnica como financieramente ante un directorio o inversionista."</p>
                </blockquote>
              </SlideIn>
            </section>}

            {/* ══════════ SLIDE 8 — GRACIAS ══════════ */}
            {slide === 8 && <section className="text-center">
              <Confetti />
              <SlideIn delay={0}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12, ease: [0.16, 1, 0.3, 1] }}
                  className="w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-4 sm:mb-6 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center"
                >
                  <Heart className="w-10 h-10 sm:w-14 sm:h-14 text-pink-300" fill="#f9a8d4" />
                </motion.div>
              </SlideIn>
              <SlideIn delay={0.3}><h2 className="text-4xl sm:text-7xl font-black text-white mb-2">¡Gracias!</h2></SlideIn>
              <SlideIn delay={0.5}><p className="text-white/70 text-lg sm:text-2xl font-light mb-4 sm:mb-6">¿Preguntas?</p></SlideIn>
              <SlideIn delay={0.7}>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 border border-white/10 text-white/60 text-xs sm:text-sm transition-all duration-200 ease-out hover:bg-white/15">VAN: $305.9M</span>
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 border border-white/10 text-white/60 text-xs sm:text-sm transition-all duration-200 ease-out hover:bg-white/15">TIR: 178.2%</span>
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 border border-white/10 text-white/60 text-xs sm:text-sm transition-all duration-200 ease-out hover:bg-white/15">PRI: 20.1 meses</span>
                  <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 border border-white/10 text-white/60 text-xs sm:text-sm transition-all duration-200 ease-out hover:bg-white/15">Opción 1: MVP</span>
                </div>
              </SlideIn>
            </section>}

          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Speaker Notes panel ── */}
      <AnimatePresence>
        {showNotes && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-4 right-4 sm:left-12 sm:right-12 z-40 bottom-20 sm:bottom-24"
          >
            <div className="max-w-5xl mx-auto bg-slate-900/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl p-4 sm:p-6 max-h-[50vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-white/60 text-xs font-medium"><MessageSquareText className="w-3.5 h-3.5" /> Notas para el orador <span className="text-white/30 font-mono">[N]</span></div>
                <button onClick={() => setShowNotes(false)} className="text-white/40 hover:text-white transition-all duration-200 ease-out active:scale-95" aria-label="Cerrar notas"><X className="w-4 h-4" /></button>
              </div>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-mono">{speakerNotes[slides[slide].id] || 'Sin notas disponibles.'}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Q&A Modal ── */}
      <AnimatePresence>
        {showQA && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setShowQA(false); setSelectedQA(null) }} />
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-300" />
                  <h2 className="text-white font-bold text-sm">Q&A — Posibles preguntas del profesor</h2>
                </div>
                <button onClick={() => { setShowQA(false); setSelectedQA(null) }}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200 ease-out active:scale-95"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-y-auto p-4 sm:p-5 space-y-1.5">
                {selectedQA === null ? (
                  qaData.map((item, i) => (
                    <motion.button key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04, duration: 0.3 }}
                      onClick={() => setSelectedQA(i)}
                      className="w-full text-left bg-white/[0.06] hover:bg-white/[0.10] active:bg-white/[0.12] rounded-xl px-4 py-2.5 border border-white/[0.06] hover:border-white/20 transition-all duration-200 ease-out active:scale-[0.98] group"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-amber-400/50 text-xs font-mono mt-0.5 font-bold flex-shrink-0">Q{i + 1}</span>
                        <div className="min-w-0">
                          <p className="text-white/80 group-hover:text-white text-[11px] sm:text-sm font-medium leading-snug transition-colors">{item.q}</p>
                          <p className="text-white/30 text-[9px] sm:text-xs mt-0.5">Presiona para ver respuesta profesional</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 flex-shrink-0 mt-0.5 transition-colors" />
                      </div>
                    </motion.button>
                  ))
                ) : (
                  <div className="space-y-3">
                    <button onClick={() => setSelectedQA(null)}
                      className="flex items-center gap-1.5 text-white/40 hover:text-white transition-all duration-200 ease-out active:scale-95 text-xs"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Volver a preguntas
                    </button>
                    <div className="bg-indigo-500/10 rounded-xl p-4 sm:p-5 border border-indigo-500/20">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-amber-400 text-xs font-mono font-bold flex-shrink-0 mt-0.5">Q{selectedQA + 1}</span>
                        <h3 className="text-white font-bold text-xs sm:text-sm leading-snug">{qaData[selectedQA].q}</h3>
                      </div>
                      <div className="pl-7 border-l-2 border-indigo-500/30">
                        <p className="text-white/80 text-[11px] sm:text-sm leading-relaxed whitespace-pre-line">{qaData[selectedQA].a}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setSelectedQA(Math.max(0, selectedQA - 1))} disabled={selectedQA === 0}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 text-white/60 hover:text-white transition-all duration-200 ease-out active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                      >
                        <ChevronLeft className="w-3 h-3" /> Anterior
                      </button>
                      <button onClick={() => setSelectedQA(Math.min(qaData.length - 1, selectedQA + 1))} disabled={selectedQA === qaData.length - 1}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 text-white/60 hover:text-white transition-all duration-200 ease-out active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-xs ml-auto"
                      >
                        Siguiente <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between px-5 py-2 border-t border-white/10 text-white/30 text-[9px] flex-shrink-0">
                <span>{selectedQA === null ? `${qaData.length} preguntas` : `Pregunta ${selectedQA + 1} de ${qaData.length}`}</span>
                <span>Presiona <kbd className="text-white/50 font-mono">Q</kbd> o toca fuera para cerrar</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating rubric button ── */}
      <motion.button onClick={() => rubricSlideMap[slide] && setRubricData(rubricSlideMap[slide])}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className={`fixed bottom-32 right-8 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ease-out active:scale-90 focus-visible:ring-2 focus-visible:ring-white/50 ${rubricSlideMap[slide] ? 'bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-white shadow-amber-500/40 cursor-pointer' : 'bg-white/10 text-white/30 shadow-none cursor-default'}`}
        title={rubricSlideMap[slide] ? `Ver respuesta: ${rubricSlideMap[slide].title}` : 'Sin respuesta de rúbrica para este slide'}
        aria-label={rubricSlideMap[slide] ? `Ver respuesta: ${rubricSlideMap[slide].title}` : 'Sin respuesta de rúbrica para este slide'}
      >
        <span className="font-black text-lg">R</span>
      </motion.button>

      {/* ── Rubric answer popup ── */}
      {rubricData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setRubricData(null)} />
          <div className="relative z-10 bg-slate-900/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-300" />
                <h2 className="text-white font-bold text-sm">{rubricData.title}</h2>
              </div>
              <button onClick={() => setRubricData(null)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200 ease-out active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="overflow-y-auto p-4 sm:p-6">
              <p className="text-white/50 text-xs sm:text-sm mb-3 pb-2 border-b border-white/10">{rubricData.subtitle}</p>
              <div className="space-y-2">
                {rubricData.answer.split('\n').map((line, i) => {
                  if (line.startsWith('Respuesta fundamentada:')) return null
                  if (line.trim() === '') return <div key={i} className="h-1" />
                  if (line.match(/^[A-ZÁÉÍÓÚÑ\s]{4,}:/) || line.match(/^[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ\s]{3,}:/) || line.startsWith('---'))
                    return <h3 key={i} className="text-amber-300 font-bold text-xs sm:text-sm mt-2">{line.replace(/^---\s*/, '')}</h3>
                  if (line.match(/^\d\.\s/))
                    return <p key={i} className="text-white/80 text-[11px] sm:text-sm leading-relaxed ml-2">{line}</p>
                  if (line.startsWith('|'))
                    return <p key={i} className="text-white/70 text-[10px] sm:text-xs font-mono leading-relaxed">{line}</p>
                  return <p key={i} className="text-white/80 text-[11px] sm:text-sm leading-relaxed">{line}</p>
                })}
              </div>
            </div>
            <div className="flex items-center justify-between px-5 py-2 border-t border-white/10 text-white/30 text-[9px] flex-shrink-0">
              <span>Respuesta fundamentada para la rúbrica</span>
              <span>Click fuera o <kbd className="text-white/50 font-mono">ESC</kbd> para cerrar</span>
            </div>
          </div>
        </div>
      )}
      <nav className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6" aria-label="Controles de navegación">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={prev} disabled={slide === 0}
              className={`p-2 rounded-lg transition-all duration-200 ease-out active:scale-95 focus-visible:ring-2 focus-visible:ring-white/50 ${slide === 0 ? 'text-white/20 cursor-not-allowed' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
              aria-label="Diapositiva anterior"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <span className="text-white/40 text-xs sm:text-sm font-mono" aria-label={`Diapositiva ${slide + 1} de ${total}`}>{slide + 1} / {total}</span>
            <button onClick={next} disabled={slide === total - 1}
              className={`p-2 rounded-lg transition-all duration-200 ease-out active:scale-95 focus-visible:ring-2 focus-visible:ring-white/50 ${slide === total - 1 ? 'text-white/20 cursor-not-allowed' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
              aria-label="Diapositiva siguiente"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          <div className="hidden sm:block flex-1 max-w-md mx-4">
            <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden" role="progressbar" aria-valuenow={((slide + 1) / total) * 100} aria-valuemin={0} aria-valuemax={100}>
              <motion.div className="h-full bg-white/60 rounded-full" animate={{ width: `${((slide + 1) / total) * 100}%` }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowQA(true)} className="p-1.5 rounded-lg transition-all duration-200 ease-out active:scale-95 focus-visible:ring-2 focus-visible:ring-white/50 text-white/40 hover:text-white hover:bg-white/10" aria-label="Abrir Q&A de ayuda" title="Q&A del profesor [Q]">
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setShowNotes(s => !s)} className={`p-1.5 rounded-lg transition-all duration-200 ease-out active:scale-95 focus-visible:ring-2 focus-visible:ring-white/50 ${showNotes ? 'text-amber-300 bg-white/10' : 'text-white/40 hover:text-white hover:bg-white/10'}`} aria-label={showNotes ? 'Ocultar notas' : 'Mostrar notas del orador'} title="Notas para el orador [N]">
              <MessageSquareText className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="text-white/30 text-xs hidden sm:block" aria-label="Atajos de teclado">← ↑ → ↓ ESPACIO | <kbd className="text-white/50">N</kbd> notas <kbd className="text-white/50">Q</kbd> Q&A</div>
        </div>
      </nav>
    </article>
  )
}
