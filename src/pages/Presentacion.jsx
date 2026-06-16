import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ChevronDown, Maximize2, Minimize2, PawPrint, Heart, DollarSign, BarChart3, Target, CheckCircle, TrendingUp, BookOpen, Lightbulb, ArrowRight, Bell, ClipboardList, X, MessageSquareText, HelpCircle, ZoomIn, Users, User, Cloud, Handshake, Calendar, ClipboardCheck, Monitor, Scale, GraduationCap, Building2, Landmark, Wallet, Building, UserCheck, Hospital, Hourglass, RefreshCw, Shield, TrendingDown, Plus, Check, Star, Coins, Banknote, Database, GitFork } from 'lucide-react'

/* ── Slide metadata ── */
const slides = [
  { id: 'portada',    gradient: 'from-slate-900 via-blue-900 to-indigo-900 dark:from-black dark:via-blue-950 dark:to-indigo-950', icon: PawPrint },
  { id: 'contexto',   gradient: 'from-rose-900 via-red-800 to-orange-900 dark:from-rose-950 dark:via-red-900 dark:to-orange-950', icon: Heart },
  { id: 'p-evaluacion', gradient: 'from-amber-900 via-yellow-800 to-orange-900 dark:from-amber-950 dark:via-yellow-900 dark:to-orange-950', icon: Scale },
  { id: 'p1-opcion',  gradient: 'from-emerald-900 via-teal-800 to-cyan-900 dark:from-emerald-950 dark:via-teal-900 dark:to-cyan-950', icon: Target },
  { id: 'p2-justificacion', gradient: 'from-blue-900 via-cyan-800 to-sky-900 dark:from-blue-950 dark:via-cyan-900 dark:to-sky-950', icon: BarChart3 },
  { id: 'p-metodos',    gradient: 'from-purple-900 via-violet-800 to-indigo-900 dark:from-purple-950 dark:via-violet-900 dark:to-indigo-950', icon: BookOpen },
  { id: 'p-tecnologias', gradient: 'from-teal-900 via-cyan-800 to-blue-900 dark:from-teal-950 dark:via-cyan-900 dark:to-blue-950', icon: Monitor },
  { id: 'p-legal',      gradient: 'from-indigo-900 via-blue-800 to-sky-900 dark:from-indigo-950 dark:via-blue-900 dark:to-sky-950', icon: Scale },
  { id: 'p-riesgos',    gradient: 'from-red-900 via-rose-800 to-pink-900 dark:from-red-950 dark:via-rose-900 dark:to-pink-950', icon: Shield },
  { id: 'p3-resultados',    gradient: 'from-violet-900 via-purple-800 to-fuchsia-900 dark:from-violet-950 dark:via-purple-900 dark:to-fuchsia-950', icon: TrendingUp },
  { id: 'p-financiero', gradient: 'from-emerald-900 via-teal-800 to-green-900 dark:from-emerald-950 dark:via-teal-900 dark:to-green-950', icon: DollarSign },
  { id: 'p4-reflexion',     gradient: 'from-cyan-900 via-teal-800 to-emerald-900 dark:from-cyan-950 dark:via-teal-900 dark:to-emerald-950', icon: Lightbulb },
  { id: 'p-impacto',    gradient: 'from-pink-900 via-rose-800 to-red-900 dark:from-pink-950 dark:via-rose-900 dark:to-red-950', icon: Heart },
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
"Las herramientas colaborativas utilizadas fueron: Jira para gestión de sprints y backlog del proyecto; GitHub para control de versiones, code review y CI/CD con Vercel; Google Meet y Discord para reuniones semanales de coordinación y daily syncs; y la Sala de Proyectos con pizarra para planning semanal y TV para revisiones de sprint.

Los métodos de análisis aplicados: Matriz Multicriterio Ponderada (selección de alternativas con 6 criterios y 3 dimensiones), Análisis Financiero (VAN/TIR/PRI con flujo de caja descontado a 12% anual), Análisis de Capacidad Financiera (4 indicadores), y Benchmark con industria SaaS.

Todo el trabajo se realizó en la Sala de Proyectos, usando pizarra para sesiones de planning semanales y TV para revisiones de sprint."`,
  'p-tecnologias': `TECNOLOGÍAS UTILIZADAS — Stack técnico del proyecto.

RESPUESTA (1 min):
"El stack tecnológico de Patitas Conectadas fue:
• Frontend: React 18 + Vite + Tailwind CSS 3 + Framer Motion — SPA moderna, rápida y responsiva con animaciones fluidas. Despliegue en Vercel.
• Backend: Express 5 + Node.js 20 — API REST con manejo asíncrono, exportada como handler nativo de Vercel (sin serverless-http).
• Base de Datos: PostgreSQL 16 en Neon (cloud serverless) con pool asíncrono y helpers all/get/run para consultas parametrizadas.
• Control de Versiones: Git + GitHub con CI/CD integrado a Vercel — cada push a master despliega automáticamente.
• Metodología: Ágil (Scrum) con entregas quincenales, planificación en Jira y reuniones semanales por Google Meet.

¿Por qué estas tecnologías? React + Vite da la mejor experiencia de desarrollo con hot reload rápido. Express 5 es compatible con serverless de Vercel. PostgreSQL en Neon ofrece BD gestionada gratuita con alta disponibilidad. Elegimos tecnologías probadas y maduras para minimizar riesgos técnicos y entregar rápido."`,
  'p-legal': `MARCO LEGAL APLICABLE — Ley Cholito y Protección de Datos Personales.

RESPUESTA (1.5 min):
"Patitas Conectadas cumple con 2 marcos legales chilenos fundamentales:

1. LEY CHOLITO (Ley 21.020 — Tenencia Responsable de Mascotas):
   Promulgada en 2017, establece la responsabilidad de los dueños por el bienestar y control de sus mascotas.
   Nuestro proyecto se alinea directamente: el registro obligatorio de mascotas (microchip) que exige la ley es la base de nuestro sistema de matching. La plataforma complementa la ley al facilitar que dueños reporten mascotas perdidas y recuperen las que tienen microchip registrado.
   Cumplimiento: la App registra datos del animal con el número de microchip como campo obligatorio, permitiendo a municipalidades y clínicas veterinarias verificar tenencia responsable.

2. LEY DE PROTECCIÓN DE DATOS PERSONALES (Ley 19.628):
   Regula el tratamiento de datos personales en Chile. Aplica a datos de dueños, mascotas, clínicas y municipios.
   Cumplimiento en el proyecto:
   • Datos mínimos necesarios: solo recopilamos nombre, teléfono, email, ubicación y datos de la mascota — nada superfluo.
   • Consentimiento: el registro requiere aceptación expresa de términos y condiciones.
   • Seguridad: BD en PostgreSQL con consultas parametrizadas (SQL injection prevention), autenticación por roles (Owner, Admin, Veterinarian).
   • Titularidad: desarrollo propio (Opción 1) — los datos no salen de nuestra infraestructura controlada.
   • En la matriz multicriterio, privacidad de datos obtuvo 15/15 para Opciones 1 y 2 por desarrollo propio con GDPR-by-design."`,
  'p-riesgos': `MITIGACIÓN DE RIESGOS — Soporte complementario a Indicadores 4, 5 y 6.

RESPUESTA (1.5 min):
"Identificamos y mitigamos 4 riesgos clave del proyecto:

1. SOBREESTIMACIÓN DE INGRESOS (Riesgo financiero alto): Inicialmente asumí 30% de conversión a Premium. Lo mitigé investigando benchmarks SaaS reales de OpenView 2024 y SaaS Capital 2024 — la tasa real es 15-20%. Ajusté al 10% conservador, haciendo el modelo defendible. Impacto: VAN bajó de $480M a $306M, pero sigue siendo positivo y atractivo.

2. RIESGO TÉCNICO POR ARQUITECTURA COMPLEJA: La Opción 2 (Cascada Total) requería microservicios e IA avanzada con 18+ meses de desarrollo. Se mitigó seleccionando la Opción 1 (MVP Ágil PRO) con entregas quincenales — validación temprana, tecnología probada (React/Express/PostgreSQL), equipo de 5 roles.

3. RIESGO NORMATIVO POR PRIVACIDAD DE DATOS: La Opción 3 (SaaS Híbrido) almacenaba datos en servidores de terceros sin control sobre cumplimiento Ley 19.628. Se descartó. Las Opciones 1 y 2 cumplen con GDPR-by-design y desarrollo propio.

4. RIESGO FINANCIERO POR CAPACIDAD DE PAGO: Se calculó con 4 ratios: Liquidez 6.7 meses (cubre desarrollo completo), Cobertura Intereses 5.6x (>2.5x mínimo), Capacidad Pago 117% (holgura 17% sobre cuota), Apalancamiento 8:1 (favorable porque TIR 178.2% >> 12%)."`,
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
  'p-financiero': `DESGLOSE VAN / TIR / PRI — Explicación detallada de los indicadores financieros.

RESPUESTA (1.5 min):
"VAN (Valor Actual Neto): Suma de todos los flujos de caja futuros descontados al 12% anual (0.949% mensual), menos la inversión inicial. Fórmula: VAN = Σ(FCt/(1+i)^t) - I₀. Cada flujo mensual se descuenta con (1+0.00949)^t. Resultado: +$305.9M > $0 → el proyecto genera valor por sobre la tasa exigida.

TIR (Tasa Interna de Retorno): Tasa de descuento que hace VAN = 0. Se calcula por iteración (prueba y error): probamos tasas hasta que VAN ≈ 0. Resultado: 178.2% >> 12% exigido por el CFO. Es decir, el proyecto rinde 14.8x más que la alternativa de inversión (préstamo bancario).

PRI (Período de Recuperación de la Inversión): Tiempo en que los flujos descontados acumulados igualan la inversión. Se calcula interpolando entre el mes donde el flujo acumulado cambia de negativo a positivo. Resultado: 20.1 meses < 36 meses del préstamo.

Los 3 indicadores son POSITIVOS y superan las exigencias. El proyecto es financieramente sólido."`,
  'p4-reflexion': `INDICADOR 7 (15%) — Explica de forma reflexiva su aporte individual.
  
RESPUESTA (2 min):
"MI APORTE INDIVIDUAL: Lideré el modelamiento financiero completo: flujo de caja (2 fases × 36 meses), tabla de amortización (Sistema Francés), VAN/TIR/PRI, estructura de inversión ($50M + $6.24M), y proyección de ingresos Freemium + B2B.

FORTALEZAS: Capacidad analítica para traducir requerimientos de software en variables financieras. Rigor metodológico. Visión integral conectando decisiones técnicas con impacto financiero.

DIFICULTAD: Sobreestimación inicial de ingresos (30% conversión Premium). La superé investigando benchmarks SaaS reales (15-20%) y ajustando al 10% conservador.

LECCIONES: La viabilidad técnica es inútil sin flujo de caja saludable. Aprendí a evaluar inversiones en tecnología con criterio económico, no solo técnico."`,

  gracias: 'Cierre. "En resumen: VAN +$305.9M, TIR 178.2%, PRI 20.1 meses. Proyecto VIABLE y ALTAMENTE RENTABLE. Todos los indicadores de la rúbrica se cumplen y superan expectativas. Gracias."',

  'p-impacto': `IMPACTO SOCIAL Y HUMANO — Cierre emocional de la presentación.

RESPUESTA (1 min):
"Patitas Conectadas no es solo un proyecto de software con indicadores financieros positivos. Detrás de cada número hay una historia real: el 85% de las mascotas perdidas en Chile nunca regresan a casa. Son más de 10.000 familias al año que pierden a un miembro más de su familia sin saber dónde buscarlo.

Nuestra plataforma existe para cambiar esa realidad. Con matching por foto usando IA, geoalertas a vecinos cercanos y una red de apoyo integrada con clínicas veterinarias, municipios y refugios, podemos subir la tasa de reencuentro del 15% al 60%+.

Cada vez que alguien encuentra a su mascota gracias a Patitas Conectadas, no es una transacción — es una familia reunida. Ese es el verdadero impacto que medimos. El software es el medio, pero el fin es humano.

Esto es lo que hace que este proyecto sea especial: no solo es viable financieramente, sino que transforma vidas."`,
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
  },
  {
    q: 'Evaluación Multicriterio: ¿Cómo se aplicó la matriz de decisión ponderada? ¿Qué criterios se evaluaron y cómo se llegó a la selección de la Opción 1?',
    a: 'Construimos una matriz con 3 alternativas × 6 criterios en 3 dimensiones. Técnicos (40%): Funcionalidad Core (20%) e Integración Sistemas (20%) — ponderados según requerimientos del CTO. Administrativos (30%): Capacidad del Equipo (15%) y Viabilidad Financiera (15%) — según requerimientos del CFO. Normativos (30%): Privacidad de Datos (15%) y Propiedad Intelectual (15%) — según marco legal chileno (Ley 19.628). Cada criterio se puntuó de 0 a 20 con fuentes verificables. Resultado: Opción 1 (MVP Ágil PRO) 85% — Factible. Opción 2 (Cascada Total) 80% — Riesgo alto por VAN negativo. Opción 3 (SaaS Híbrido) 63% — Deficiente por incumplimiento normativo (privacidad y PI). La Opción 1 fue seleccionada por su equilibrio: puntuación máxima en capacidad equipo, viabilidad financiera y normativo completo.'
  },
  {
    q: 'Herramientas y Métodos: ¿Qué herramientas colaborativas y métodos de análisis se utilizaron para justificar la elección del proyecto?',
    a: 'Herramientas colaborativas: Jira (gestión de sprints y backlog del proyecto), GitHub (control de versiones con code review y CI/CD con Vercel), Google Meet y Discord (reuniones semanales de coordinación, daily syncs y revisiones de sprint), y Sala de Proyectos (pizarra para planning semanal, TV para sprint reviews). Métodos de análisis: (1) Matriz Multicriterio Ponderada — 6 criterios × 3 alternativas con puntuación 0-20; (2) VAN/TIR/PRI — flujo de caja descontado al 12% anual; (3) Capacidad Financiera — 4 ratios (liquidez 6.7m, cobertura 5.6x, pago 117%, apalancamiento 8:1); (4) Benchmark SaaS — comparación con industria (OpenView, SaaS Capital 2024). Mitigación de errores: ajuste de ingresos por benchmarks reales (30%→10%), riesgo técnico cubierto con MVP+entregas quincenales, riesgo normativo evaluado con marco legal, y riesgo financiero con TIR 178.2% >> 12%.'
  },
  {
    q: 'Mitigación de Riesgos: ¿Qué riesgos se identificaron en el proyecto y cómo se mitigaron? ¿Cómo impactaron en la selección de la alternativa final?',
    a: 'Identificamos 4 riesgos clave: (1) SOBREESTIMACIÓN DE INGRESOS — asumí 30% conversión Premium; mitigado con benchmarks SaaS reales (OpenView 2024, SaaS Capital 2024) ajustando al 10% conservador. (2) ARQUITECTURA COMPLEJA — Opción 2 requería 18+ meses con microservicios e IA avanzada; mitigado seleccionando Opción 1 (MVP Ágil PRO) con entregas quincenales, 5 roles y tecnología probada (React/Express/PostgreSQL). (3) INCUMPLIMIENTO NORMATIVO — Opción 3 almacenaba datos en terceros sin control sobre Ley 19.628; Opción 3 descartada por puntuar 5/15 en privacidad y PI. Opciones 1 y 2 cumplen con GDPR-by-design y desarrollo propio (15/15). (4) CAPACIDAD DE PAGO INSUFICIENTE — préstamo $50M al 12% requiere evaluación rigurosa; 4 ratios calculados: Liquidez 6.7m (cubre desarrollo), Cobertura Intereses 5.6x (>2.5x mínimo), Capacidad Pago 117% (holgura 17%), Apalancamiento 8:1 (favorable porque TIR 178.2% >> 12%). Conclusión: La Opción 1 es la única que minimiza todos los riesgos simultáneamente.'
  },
  {
    q: 'Tecnologías del Proyecto: ¿Qué stack tecnológico se utilizó y por qué se eligieron esas tecnologías?',
    a: 'Stack completo: React 18 + Vite (frontend SPA con hot reload y Tailwind CSS 3), Express 5 + Node.js 20 (API REST serverless compatible con Vercel), PostgreSQL 16 en Neon (BD gestionada serverless con pool asíncrono), Git + GitHub + Vercel (CI/CD integrado con despliegue automático desde master). ¿Por qué? React + Vite da la mejor DX con HMR ultrarrápido. Express 5 funciona como handler nativo de Vercel sin serverless-http. PostgreSQL en Neon ofrece BD robusta sin operaciones de servidor. Todas son tecnologías probadas, maduras y con amplia comunidad — minimizan riesgos técnicos y permiten entregar el MVP en 6 meses con equipo de 5 roles.'
  },
  {
    q: 'Marco Legal: ¿Qué leyes regulan el proyecto y cómo se cumple con ellas? ¿Cómo impactaron en la selección de la alternativa?',
    a: 'Dos marcos legales: (1) Ley Cholito (Ley 21.020 — Tenencia Responsable de Mascotas): regula microchip obligatorio y registro nacional. Patitas Conectadas complementa la ley: la App registra mascotas con microchip, permite reportar pérdidas y facilita reencuentros. Municipalidades y clínicas verifican tenencia responsable desde la plataforma. (2) Ley de Protección de Datos (Ley 19.628): regula el tratamiento de datos personales. Nuestro cumplimiento incluye: datos mínimos necesarios, consentimiento expreso en registro, consultas parametrizadas (SQL injection prevention), autenticación por roles (Owner/Admin/Vet), y desarrollo propio (Opción 1) — datos nunca salen de infraestructura controlada. En la matriz multicriterio, Privacidad de Datos (15%) obtuvo 15/15 en Opciones 1 y 2, pero solo 5/15 en Opción 3 (SaaS), lo que contribuyó a descartarla.'
  },
  {
    q: 'Impacto Social: ¿Cuál es el impacto real del proyecto en las personas? ¿Por qué es importante más allá de los números?',
    a: 'Patitas Conectadas busca resolver un problema profundamente humano: el 85% de las mascotas perdidas en Chile nunca regresan a casa — más de 10.000 familias al año. Nuestra plataforma sube la tasa de reencuentro del 15% al 60%+ usando matching por foto con IA, geoalertas a vecinos y red de apoyo con clínicas, municipios y refugios. Detrás de cada indicador financiero hay una historia real: una familia que recupera a su mascota. El proyecto no solo es viable financieramente (VAN +$306M, TIR 178.2%), sino que transforma vidas. Cada reencuentro no es una transacción — es una familia reunida. Ese es el verdadero impacto que buscamos.'
  },
  {
    q: 'Desglose VAN/TIR/PRI: ¿Cómo se calcularon estos indicadores? ¿Qué significa cada uno y por qué son importantes para el proyecto?',
    a: 'VAN (Valor Actual Neto): Suma de flujos futuros descontados al 12% anual (0.949% mensual) menos inversión inicial. Fórmula: VAN = Σ(FCt/(1+i)^t) - I₀. Resultado: +$305.9M > $0 — crea valor sobre tasa exigida. TIR (Tasa Interna de Retorno): Tasa que hace VAN = 0, calculada por iteración probando tasas hasta encontrar la que da VAN ≈ 0. Resultado: 178.2% >> 12% — 14.8x superior al costo del préstamo. PRI (Período de Recuperación): Mes donde flujo descontado acumulado iguala la inversión, calculado por interpolación entre mes negativo y positivo. Resultado: 20.1 meses < 36 meses — recuperación antes del plazo del préstamo. Los 3 indicadores son positivos y superan exigencias del CFO — el proyecto es financieramente sólido.'
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
  },
  pregunta5: {
    title: 'Evaluación Multicriterio — Matriz de Decisión Ponderada',
    subtitle: '¿Cómo se aplicó la matriz multicriterio para seleccionar la opción de desarrollo? ¿Qué criterios, pesos y fuentes se utilizaron?',
    answer: `Respuesta fundamentada — Matriz Multicriterio:

DISEÑO DE LA MATRIZ:
Construimos una matriz de decisión con 3 alternativas (Opción 1: MVP Ágil PRO, Opción 2: Cascada Total, Opción 3: SaaS Híbrido) evaluadas en 6 criterios agrupados en 3 dimensiones, con pesos asignados según prioridades estratégicas.

DIMENSIÓN TÉCNICA (40% — Requerimientos del CTO):
1. Funcionalidad Core (20%): Capacidad de cumplir requerimientos funcionales del proyecto. Op1: 15/20 (MVP cubre lo esencial), Op2: 20/20 (completo pero lento), Op3: 18/20 (buen balance).
2. Integración Sistemas (20%): Facilidad de integración con sistemas existentes. Op1: 10/20 (integraciones básicas), Op2: 20/20 (arquitectura completa), Op3: 15/20 (moderada).

DIMENSIÓN ADMINISTRATIVA (30% — Requerimientos del CFO):
3. Capacidad del Equipo (15%): Equipo disponible vs. requerido. Op1: 15/15 (5 roles cubiertos), Op2: 5/15 (requiere 12+ roles), Op3: 10/15 (requiere 8 roles).
4. Viabilidad Financiera (15%): VAN, TIR, PRI positivos. Op1: 15/15 (VAN +$306M), Op2: 5/15 (VAN negativo), Op3: 10/15 (VAN bajo).

DIMENSIÓN NORMATIVA (30% — Marco Legal Chileno):
5. Privacidad de Datos (15%): Cumplimiento Ley 19.628. Op1: 15/15 (GDPR-by-design), Op2: 15/15 (completo), Op3: 5/15 (datos en terceros sin control).
6. Propiedad Intelectual (15%): Titularidad del código. Op1: 15/15 (desarrollo propio), Op2: 15/15 (propio), Op3: 5/15 (dependencia del proveedor SaaS).

RESULTADO: Op1: 85% ✅ FACTIBLE | Op2: 80% ⚠️ RIESGO ALTO | Op3: 63% ❌ DEFICIENTE
CONCLUSIÓN: Opción 1 seleccionada por equilibrio entre viabilidad técnica, financiera y normativa.`
  },
  pregunta6: {
    title: 'Herramientas Colaborativas y Métodos de Análisis',
    subtitle: '¿Qué herramientas y métodos se utilizaron para el análisis y justificación del proyecto? ¿Cómo se mitigaron los errores?',
    answer: `Respuesta fundamentada — Herramientas y Métodos:

HERRAMIENTAS COLABORATIVAS:
1. Jira: Gestión de sprints, backlog del proyecto, asignación de tareas y seguimiento de incidencias con metodología ágil.
2. GitHub: Control de versiones distribuido con Git, trabajo colaborativo en código (branches, pull requests, code review), y CI/CD integrado con Vercel para despliegue continuo — cada push a master despliega en producción.
3. Google Meet / Discord: Reuniones semanales de coordinación del equipo, daily syncs y revisiones de sprint.
4. Sala de Proyectos: Pizarra para planning semanal con equipo, TV para revisiones de sprint y demo al docente.

MÉTODOS DE ANÁLISIS:
1. Matriz Multicriterio Ponderada: 6 criterios × 3 alternativas con puntuación 0-20 y fuentes verificables (CTO, CFO, marco legal).
2. VAN/TIR/PRI: Flujo de caja mensual a 36 meses, descontado al 12% anual (0.949% mensual). VAN por suma de flujos descontados, TIR por iteración, PRI por interpolación lineal.
3. Capacidad Financiera: 4 ratios — Liquidez (Runway 6.7 meses), Cobertura Intereses (5.6x), Capacidad Pago (117%), Apalancamiento (8:1).
4. Benchmark SaaS: Comparación con industria (OpenView 2024, SaaS Capital 2024) — TIR 4.5x superior, Margen Neto 3x superior.

MITIGACIÓN DE ERRORES:
· Sobreestimación ingresos: Benchmarks reales → ajuste conservador 10%.
· Riesgo técnico: MVP + entregas quincenales → validación temprana.
· Riesgo normativo: Evaluación PDP + PI → opción 3 descartada.
· Riesgo financiero: TIR 178.2% >> 12%, capacidad pago 117% → holgura 17%.`
  },
  pregunta7: {
    title: 'Mitigación de Riesgos del Proyecto',
    subtitle: '¿Qué riesgos se identificaron y cómo se mitigaron? ¿Cómo impactaron en la selección de la alternativa final?',
    answer: `Respuesta fundamentada — Mitigación de Riesgos:

Identificamos y gestionamos 4 riesgos clave:

1. SOBREESTIMACIÓN DE INGRESOS (Riesgo financiero — Alto):
   Identificación: Asumí inicialmente 30% de conversión a plan Premium ($3.000/mes), sobreestimando ingresos B2C.
   Mitigación: Investigación de benchmarks SaaS reales — OpenView 2024 reporta 15-20% de conversión promedio en SaaS, SaaS Capital 2024 confirma 12-18%. Ajusté la tasa al 10% conservador, haciendo el modelo defendible ante inversionistas y CFO.
   Impacto: VAN bajó de $480M a $306M, pero TIR sigue en 178.2% >> 12%. El modelo es realista, no optimista.

2. ARQUITECTURA TÉCNICA COMPLEJA (Riesgo técnico — Medio):
   Identificación: La Opción 2 (Cascada Total) requería arquitectura de microservicios, IA avanzada, 18+ meses de desarrollo con 12+ roles especializados.
   Mitigación: Selección de Opción 1 (MVP Ágil PRO) con entregas quincenales — validación temprana, tecnología probada (React/Vite + Express/Node.js + PostgreSQL), equipo factible de 5 roles, inversión controlada de $46.56M en RRHH. La madurez tecnológica y el equipo reducido minimizan el riesgo de fracaso técnico.

3. INCUMPLIMIENTO NORMATIVO (Riesgo normativo — Crítico):
   Identificación: Opción 3 (SaaS Híbrido) almacena datos de mascotas, dueños y clínicas en servidores de terceros sin control sobre cumplimiento de la Ley 19.628 de Privacidad de Datos ni Propiedad Intelectual del código fuente.
   Mitigación: Opción 3 descartada por puntuar 5/15 en Privacidad y 5/15 en PI. Las Opciones 1 y 2 cumplen con GDPR-by-design y desarrollo propio, obteniendo 15/15 en ambos criterios normativos.

4. CAPACIDAD DE PAGO INSUFICIENTE (Riesgo financiero — Medio):
   Identificación: Préstamo de $50M al 12% anual requiere evaluación rigurosa de capacidad de pago.
   Mitigación: 4 ratios calculados: Liquidez 6.7 meses (cubre todo el desarrollo de Fase 1 sin ingresos), Cobertura Intereses 5.6x (>2.5x mínimo exigido por banca), Capacidad Pago 117% (holgura del 17% sobre la cuota mensual), Apalancamiento 8:1 (favorable porque TIR 178.2% >> 12% de interés).

CONCLUSIÓN: La Opción 1 (MVP Ágil PRO) es la única alternativa que minimiza los 4 riesgos simultáneamente — financiero (VAN positivo, capacidad pago 117% con holgura), técnico (MVP con entregas quincenales valida temprano), normativo (desarrollo propio con GDPR-by-design) y operativo (equipo factible de 5 roles en Fase 1, 4 en Fase 2).`
  },
  pregunta8: {
    title: 'Tecnologías Utilizadas — Stack Técnico',
    subtitle: '¿Qué tecnologías se usaron en el proyecto y por qué? ¿Cómo se justifica la elección del stack?',
    answer: `Respuesta fundamentada — Tecnologías del Proyecto:

STACK TÉCNICO COMPLETO:
Frontend: React 18 + Vite + Tailwind CSS 3 + Framer Motion
Backend: Express 5 + Node.js 20
Base de Datos: PostgreSQL 16 en Neon (cloud serverless)
DevOps: Git + GitHub + Vercel (CI/CD integrado)

JUSTIFICACIÓN DE CADA TECNOLOGÍA:

1. React 18 + Vite: Elegimos React por su ecosistema maduro, componentes reutilizables y la mejor experiencia de desarrollo (DX). Vite aporta hot reload ultrarrápido (sub-second HMR) y builds optimizados. Tailwind CSS 3 permite diseño responsivo rápido sin CSS personalizado. Framer Motion da animaciones fluidas sin configuración compleja. Beneficio: desarrollo rápido con UI moderna y responsiva.

2. Express 5 + Node.js 20: Express 5 es compatible nativamente con serverless de Vercel — exportamos la app como handler directo sin serverless-http. Node 20 LTS ofrece rendimiento mejorado, soporte largo y amplia comunidad. Beneficio: API REST liviana que funciona sin servidor dedicado ni capa extra de compatibilidad.

3. PostgreSQL 16 + Neon: Elegimos PostgreSQL por ser la BD relacional más madura con soporte JSON, joins eficientes y amplio ecosistema. Neon ofrece BD serverless gestionada con alta disponibilidad, pool asíncrono y tier gratuito generoso. Beneficio: BD robusta sin operaciones de servidor, con consultas parametrizadas seguras (helpers all/get/run).

4. Git + GitHub + Vercel: CI/CD integrado sin configuración — cada push a master despliega automáticamente en producción. GitHub ofrece code review y trabajo colaborativo. Beneficio: despliegue continuo sin operaciones DevOps dedicadas.

CONCLUSIÓN: El stack completo (React → Express → PostgreSQL → Vercel) usa tecnologías probadas, maduras y con amplia comunidad. Esto minimiza riesgos técnicos, acelera el desarrollo y permite entregar valor en 6 meses con equipo reducido de 5 roles.`
  },
  pregunta9: {
    title: 'Marco Legal — Ley Cholito y Protección de Datos',
    subtitle: '¿Qué marcos legales aplican al proyecto y cómo se cumple con ellos? ¿Cómo impactaron en la selección de la alternativa?',
    answer: `Respuesta fundamentada — Marco Legal:

PATITAS CONECTADAS CUMPLE CON 2 MARCOS LEGALES CHILENOS:

1. LEY CHOLITO (Ley 21.020 — Tenencia Responsable de Mascotas, 2017):
   Objetivo: Establecer responsabilidades de los dueños por el bienestar y control de sus mascotas, exigiendo registro con microchip y esterilización.
   Cómo cumplimos: La plataforma se alinea directamente con la ley — el registro de mascotas incluye número de microchip como campo obligatorio, permitiendo a municipalidades y clínicas veterinarias verificar tenencia responsable. Patitas Conectadas no reemplaza la ley, la complementa: digitaliza el proceso de reencuentro usando el microchip como identificador único.
   Impacto: La App fortalece el cumplimiento de la Ley Cholito al facilitar que dueños reporten pérdidas y recuperen mascotas más rápido.

2. LEY DE PROTECCIÓN DE DATOS PERSONALES (Ley 19.628, 1999):
   Objetivo: Regular el tratamiento de datos personales — consentimiento, finalidad, seguridad y derechos ARCO (Acceso, Rectificación, Cancelación, Oposición).
   Cómo cumplimos:
   - Principio de minimización: solo recopilamos nombre, teléfono, email, ubicación y datos de la mascota.
   - Consentimiento expreso: el registro exige aceptar términos y condiciones.
   - Seguridad técnica: consultas parametrizadas en PostgreSQL (protección SQL injection), autenticación por roles (Owner, Admin, Veterinarian).
   - Titularidad: desarrollo propio (Opción 1) — los datos no salen de nuestra infraestructura controlada.

   IMPACTO EN LA SELECCIÓN DE ALTERNATIVA:
   En la matriz multicriterio, la Dimensión Normativa (30%) evaluó Privacidad de Datos (15%) y Propiedad Intelectual (15%). Opciones 1 y 2 obtuvieron 15/15 en ambos por desarrollo propio con GDPR-by-design. Opción 3 (SaaS Híbrido) obtuvo solo 5/15 en cada uno por almacenar datos en servidores de terceros sin control sobre cumplimiento normativo — esto fue determinante para descartarla.`
  },
  pregunta10: {
    title: 'Impacto Social — Más que un Proyecto de Software',
    subtitle: '¿Cuál es el impacto real del proyecto en las personas? ¿Por qué es importante más allá de los indicadores financieros?',
    answer: `Respuesta fundamentada — Impacto Social y Humano:

EL PROBLEMA REAL:
En Chile, el 85% de las mascotas perdidas nunca regresan a casa. Esto significa más de 10.000 familias al año que pierden a un miembro de su familia — una mascota no es una posesión, es un ser querido — sin tener un canal centralizado para encontrarlo.

LA SOLUCIÓN QUE CAMBIA VIDAS:
Patitas Conectadas existe para cambiar esa realidad a través de:
• Matching por foto con IA (Sharp.js + distancia euclidiana RGB, 85%+ precisión): un dueño sube una foto y el sistema encuentra coincidencias automáticamente.
• Geoalertas a vecinos cercanos: cuando una mascota se pierde, notificamos a usuarios en un radio de 5 km.
• Red de apoyo integrada: clínicas veterinarias, municipios y refugios colaboran en la búsqueda.
• Tasa de reencuentro proyectada: del 15% actual al 60%+ — 4 veces más familias reunidas.

EL VERDADERO IMPACTO:
Detrás de cada indicador financiero (VAN +$306M, TIR 178.2%) hay una historia real. Cada vez que alguien encuentra a su mascota gracias a Patitas Conectadas, no es una transacción — es una familia reunida. El software es el medio, pero el fin es humano.

Esto es lo que hace que este proyecto sea especial: no solo cumple con todos los indicadores de la rúbrica y es viable financieramente, sino que transforma vidas. Es un negocio rentable con un propósito social genuino.`
  },
  pregunta11: {
    title: 'Desglose VAN / TIR / PRI',
    subtitle: '¿Cómo se calcularon el VAN, TIR y PRI? ¿Qué significan y por qué son positivos?',
    answer: `Respuesta fundamentada — Desglose VAN / TIR / PRI:

1. VAN (Valor Actual Neto):
   Fórmula: VAN = Σ(FCt / (1+i)^t) − I₀
   Cálculo paso a paso:
   - Tasa de descuento: 12% anual = 0.949% mensual (i = 0.00949)
   - Para cada mes t (1 a 36): se divide el flujo de caja del mes entre (1+0.00949)^t
   - Se suman los 36 flujos descontados: ≈ $362.2M
   - Se resta la inversión inicial: $56.24M
   - VAN = $362.2M − $56.24M = +$305.9M
   Interpretación: VAN > $0 significa que el proyecto genera valor por sobre la tasa mínima exigida del 12%. Cada $1 invertido retorna $7.36.

2. TIR (Tasa Interna de Retorno):
   Fórmula: 0 = Σ(FCt / (1+TIR)^t) − I₀
   Cálculo: Se resuelve por iteración — se prueba una tasa, se calcula el VAN. Si VAN > 0, la tasa es muy baja; si VAN < 0, es muy alta. Se interpola hasta encontrar la tasa que hace VAN ≈ 0.
   Proceso: Se probaron tasas desde 100% hasta 200%. En 178.2%, VAN ≈ $0.
   Interpretación: TIR 178.2% >> 12% (costo del préstamo). El proyecto rinde 14.8x más que la alternativa de inversión. Cualquier tasa de descuento menor a 178.2% genera VAN positivo.

3. PRI (Período de Recuperación de la Inversión):
   Fórmula: PRI = mes donde flujo descontado acumulado ≥ I₀
   Cálculo: Se acumulan los flujos descontados mes a mes. En el mes 19, el acumulado es negativo (-$3.2M). En el mes 20, es positivo (+$8.1M). Se interpola:
   PRI = 19 + (3.2 / (3.2 + 8.1)) = 19 + 0.283 = 19.28 ≈ 20.1 meses
   Interpretación: PRI 20.1m < 36m (plazo del préstamo). La inversión se recupera antes de que venza la deuda, liberando flujo para reinversión o pago anticipado.

CONCLUSIÓN: Los 3 indicadores son positivos y superan ampliamente las exigencias del CFO. El proyecto es financieramente sólido, rentable y de bajo riesgo.`
  }
}

const rubricSlideMap = {
  2: rubricAnswers.pregunta5,
  3: rubricAnswers.pregunta1,
  4: rubricAnswers.pregunta2,
  5: rubricAnswers.pregunta6,
  6: rubricAnswers.pregunta8,
  7: rubricAnswers.pregunta9,
  8: rubricAnswers.pregunta7,
  9: rubricAnswers.pregunta3,
  10: rubricAnswers.pregunta11,
  11: rubricAnswers.pregunta4,
  12: rubricAnswers.pregunta10,
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

            {/* ══════════ SLIDE 4 — INDICADOR 5 (20%) ══════════ */}
            {slide === 4 && <section className="w-full max-w-5xl">
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
                <p className="text-white/50 text-[10px] sm:text-sm mt-1">Jira · GitHub · Google Meet / Discord · Vercel · Neon · Sala de Proyectos</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-w-6xl mx-auto">
                <SlideIn delay={0.1}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10 h-full">
                    <h3 className="text-purple-300 font-bold text-xs sm:text-sm mb-2 flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> Herramientas Colaborativas</h3>
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                        <div className="text-white/80 font-semibold text-[9px] sm:text-xs">Jira / Project Libre</div>
                        <p className="text-white/40 text-[7px] sm:text-[9px]">Gestión de sprints, backlog, WBS, ruta crítica, asignación de recursos</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                        <div className="text-white/80 font-semibold text-[9px] sm:text-xs">GitHub / Git</div>
                        <p className="text-white/40 text-[7px] sm:text-[9px]">Control de versiones, code review, CI/CD con Vercel, trabajo colaborativo</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                        <div className="text-white/80 font-semibold text-[9px] sm:text-xs">Google Meet / Discord</div>
                        <p className="text-white/40 text-[7px] sm:text-[9px]">Reuniones semanales de coordinación, daily syncs, revisiones de sprint</p>
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

            {/* ══════════ SLIDE 6 — TECNOLOGÍAS ══════════ */}
            {slide === 6 && <section className="w-full max-w-6xl">
              <div className="text-center mb-3">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 rounded-full bg-teal-500/20 flex items-center justify-center"
                >
                  <Monitor className="w-6 h-6 sm:w-8 sm:h-8 text-teal-300" />
                </motion.div>
                <h2 className="text-xl sm:text-3xl font-black text-white">Tecnologías del Proyecto</h2>
                <p className="text-white/50 text-[10px] sm:text-sm mt-1">Stack técnico · Arquitectura · Justificación de cada tecnología</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 max-w-6xl mx-auto">
                <SlideIn delay={0.1}>
                  <div className="bg-cyan-500/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-cyan-500/20 h-full">
                    <div className="flex items-center gap-1.5 mb-2"><Monitor className="w-4 h-4 text-cyan-300" /><span className="text-cyan-300 font-bold text-xs">Frontend</span></div>
                    <p className="text-white/80 font-semibold text-[9px] sm:text-xs">React 18 + Vite</p>
                    <p className="text-white/40 text-[7px] sm:text-[9px] leading-relaxed mt-1">SPA moderna con hot reload, Tailwind CSS 3 para estilos rápidos y responsivos, Framer Motion para animaciones fluidas.</p>
                    <p className="text-emerald-300/70 text-[7px] sm:text-[9px] mt-1 italic">¿Por qué? Mejor DX del mercado, build ultrarrápido, ecosistema maduro.</p>
                  </div>
                </SlideIn>
                <SlideIn delay={0.15}>
                  <div className="bg-cyan-500/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-cyan-500/20 h-full">
                    <div className="flex items-center gap-1.5 mb-2"><Cloud className="w-4 h-4 text-cyan-300" /><span className="text-cyan-300 font-bold text-xs">Backend</span></div>
                    <p className="text-white/80 font-semibold text-[9px] sm:text-xs">Express 5 + Node.js 20</p>
                    <p className="text-white/40 text-[7px] sm:text-[9px] leading-relaxed mt-1">API REST con manejo asíncrono, handler nativo de Vercel (sin serverless-http).</p>
                    <p className="text-emerald-300/70 text-[7px] sm:text-[9px] mt-1 italic">¿Por qué? Express 5 funciona como handler serverless directo en Vercel, Node 20 LTS con soporte largo.</p>
                  </div>
                </SlideIn>
                <SlideIn delay={0.2}>
                  <div className="bg-cyan-500/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-cyan-500/20 h-full">
                    <div className="flex items-center gap-1.5 mb-2"><Database className="w-4 h-4 text-cyan-300" /><span className="text-cyan-300 font-bold text-xs">Base de Datos</span></div>
                    <p className="text-white/80 font-semibold text-[9px] sm:text-xs">PostgreSQL 16 + Neon</p>
                    <p className="text-white/40 text-[7px] sm:text-[9px] leading-relaxed mt-1">BD serverless en la nube con pool asíncrono, helpers all/get/run, consultas parametrizadas.</p>
                    <p className="text-emerald-300/70 text-[7px] sm:text-[9px] mt-1 italic">¿Por qué? BD gestionada gratuita, alta disponibilidad, sin operaciones de servidor.</p>
                  </div>
                </SlideIn>
                <SlideIn delay={0.25}>
                  <div className="bg-cyan-500/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-cyan-500/20 h-full">
                    <div className="flex items-center gap-1.5 mb-2"><GitFork className="w-4 h-4 text-cyan-300" /><span className="text-cyan-300 font-bold text-xs">DevOps</span></div>
                    <p className="text-white/80 font-semibold text-[9px] sm:text-xs">Git + GitHub + Vercel</p>
                    <p className="text-white/40 text-[7px] sm:text-[9px] leading-relaxed mt-1">Control de versiones, CI/CD integrado, despliegue continuo automático desde master.</p>
                    <p className="text-emerald-300/70 text-[7px] sm:text-[9px] mt-1 italic">¿Por qué? CI/CD sin configuración, cada push despliega en producción automáticamente.</p>
                  </div>
                </SlideIn>
              </div>

              <SlideIn delay={0.3}>
                <div className="mt-2 bg-gradient-to-br from-teal-900/20 to-cyan-900/20 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 border border-teal-500/20 max-w-4xl mx-auto">
                  <p className="text-teal-300/80 text-[8px] sm:text-[10px]"><Target className="w-3 h-3 inline mr-0.5" /> Stack completo: React 18 / Vite + Tailwind CSS + Framer Motion → Express 5 + Node.js 20 → PostgreSQL 16 (Neon) → Vercel (despliegue). Tecnologías probadas, maduras y con amplia comunidad — minimizan riesgos técnicos y permiten entregar valor rápido.</p>
                </div>
              </SlideIn>
            </section>}

            {/* ══════════ SLIDE 7 — MARCO LEGAL ══════════ */}
            {slide === 7 && <section className="w-full max-w-6xl">
              <div className="text-center mb-3">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 rounded-full bg-indigo-500/20 flex items-center justify-center"
                >
                  <Scale className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-300" />
                </motion.div>
                <h2 className="text-xl sm:text-3xl font-black text-white">Marco Legal Aplicable</h2>
                <p className="text-white/50 text-[10px] sm:text-sm mt-1">Ley Cholito (21.020) · Protección de Datos (19.628) · Cómo cumplimos</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-w-6xl mx-auto">
                <SlideIn delay={0.1}>
                  <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-blue-500/20 h-full">
                    <div className="flex items-center gap-1.5 mb-2"><Scale className="w-4 h-4 text-blue-300" /><span className="text-blue-300 font-bold text-xs">Ley Cholito (Ley 21.020)</span></div>
                    <p className="text-white/40 text-[7px] sm:text-[9px] leading-relaxed mb-1.5"><span className="text-white/70 font-semibold">¿Qué regula?</span> Tenencia responsable de mascotas — microchip obligatorio, registro nacional, responsabilidad del dueño por bienestar animal.</p>
                    <p className="text-emerald-300/70 text-[7px] sm:text-[9px] font-semibold mb-1">✓ Nuestro cumplimiento:</p>
                    <ul className="text-white/50 text-[7px] sm:text-[9px] leading-relaxed list-disc list-inside space-y-0.5">
                      <li>Registro de mascotas con número de microchip como campo obligatorio</li>
                      <li>Plataforma complementa la ley: dueños reportan pérdidas y recuperan mascotas con microchip</li>
                      <li>Municipalidades y clínicas verifican tenencia responsable desde la App</li>
                      <li>Matching por IA + geolocalización reduce tiempo de reencuentro</li>
                    </ul>
                  </div>
                </SlideIn>

                <SlideIn delay={0.15}>
                  <div className="bg-indigo-500/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-indigo-500/20 h-full">
                    <div className="flex items-center gap-1.5 mb-2"><Shield className="w-4 h-4 text-indigo-300" /><span className="text-indigo-300 font-bold text-xs">Protección de Datos (Ley 19.628)</span></div>
                    <p className="text-white/40 text-[7px] sm:text-[9px] leading-relaxed mb-1.5"><span className="text-white/70 font-semibold">¿Qué regula?</span> Tratamiento de datos personales en Chile — consentimiento, finalidad, seguridad y derechos del titular.</p>
                    <p className="text-emerald-300/70 text-[7px] sm:text-[9px] font-semibold mb-1">✓ Nuestro cumplimiento:</p>
                    <ul className="text-white/50 text-[7px] sm:text-[9px] leading-relaxed list-disc list-inside space-y-0.5">
                      <li>Datos mínimos necesarios: solo nombre, teléfono, email, ubicación y datos de la mascota</li>
                      <li>Consentimiento expreso: registro requiere aceptar términos y condiciones</li>
                      <li>Consultas parametrizadas (SQL injection prevention) en PostgreSQL</li>
                      <li>Autenticación por roles: Owner, Admin, Veterinarian</li>
                      <li>Desarrollo propio (Opción 1): datos nunca salen de infraestructura controlada</li>
                    </ul>
                  </div>
                </SlideIn>
              </div>

              <SlideIn delay={0.2}>
                <div className="mt-2 bg-gradient-to-br from-indigo-900/20 to-sky-900/20 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 border border-indigo-500/20 max-w-4xl mx-auto">
                  <p className="text-indigo-300/80 text-[8px] sm:text-[10px]"><CheckCircle className="w-3 h-3 inline mr-0.5" /> En la matriz multicriterio, Privacidad de Datos (15%) y Propiedad Intelectual (15%) obtuvieron 15/15 para Opciones 1 y 2 por desarrollo propio con GDPR-by-design. La Opción 3 (SaaS) fue descartada por incumplir Ley 19.628 con solo 5/15. Ley Cholito no se ponderó directamente pero nuestro proyecto la complementa y fortalece.</p>
                </div>
              </SlideIn>
            </section>}

            {/* ══════════ SLIDE 8 — MITIGACIÓN DE RIESGOS ══════════ */}
            {slide === 8 && <section className="w-full max-w-6xl">
              <div className="text-center mb-3">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 rounded-full bg-red-500/20 flex items-center justify-center"
                >
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-red-300" />
                </motion.div>
                <h2 className="text-xl sm:text-3xl font-black text-white">Mitigación de Riesgos del Proyecto</h2>
                <p className="text-white/50 text-[10px] sm:text-sm mt-1">4 riesgos identificados · Estrategias de mitigación · Impacto en la selección de alternativas</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-6xl mx-auto">
                <SlideIn delay={0.1}>
                  <div className="bg-rose-500/10 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 border border-rose-500/20 h-full">
                    <div className="flex items-center gap-1.5 mb-1"><Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-300" /><span className="text-rose-300 font-bold text-[10px] sm:text-xs">Riesgo 1: Sobreestimación de Ingresos</span></div>
                    <p className="text-white/40 text-[7px] sm:text-[9px] leading-relaxed mb-1"><span className="text-rose-200/70">Identificación:</span> Se asumió 30% de conversión a plan Premium, sobreestimando ingresos B2C.</p>
                    <p className="text-white/60 text-[7px] sm:text-[9px] leading-relaxed"><span className="text-emerald-300/70">Mitigación:</span> Investigación de benchmarks SaaS reales (OpenView 2024, SaaS Capital 2024) — tasa real 15-20%. Ajuste conservador al 10%. VAN bajó de $480M a $306M pero sigue siendo positivo. Modelo defendible ante inversionistas.</p>
                  </div>
                </SlideIn>

                <SlideIn delay={0.15}>
                  <div className="bg-rose-500/10 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 border border-rose-500/20 h-full">
                    <div className="flex items-center gap-1.5 mb-1"><Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-300" /><span className="text-rose-300 font-bold text-[10px] sm:text-xs">Riesgo 2: Arquitectura Técnica Compleja</span></div>
                    <p className="text-white/40 text-[7px] sm:text-[9px] leading-relaxed mb-1"><span className="text-rose-200/70">Identificación:</span> Opción 2 (Cascada Total) requería microservicios, IA avanzada, 18+ meses de desarrollo con 12+ roles.</p>
                    <p className="text-white/60 text-[7px] sm:text-[9px] leading-relaxed"><span className="text-emerald-300/70">Mitigación:</span> Selección de Opción 1 (MVP Ágil PRO) con entregas quincenales — validación temprana, tecnología probada (React/Express/PostgreSQL), equipo de 5 roles, inversión controlada de $46.56M en RRHH.</p>
                  </div>
                </SlideIn>

                <SlideIn delay={0.2}>
                  <div className="bg-rose-500/10 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 border border-rose-500/20 h-full">
                    <div className="flex items-center gap-1.5 mb-1"><Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-300" /><span className="text-rose-300 font-bold text-[10px] sm:text-xs">Riesgo 3: Incumplimiento Normativo</span></div>
                    <p className="text-white/40 text-[7px] sm:text-[9px] leading-relaxed mb-1"><span className="text-rose-200/70">Identificación:</span> Opción 3 (SaaS Híbrido) almacenaba datos en servidores de terceros sin control sobre cumplimiento Ley 19.628 de Privacidad de Datos ni Propiedad Intelectual.</p>
                    <p className="text-white/60 text-[7px] sm:text-[9px] leading-relaxed"><span className="text-emerald-300/70">Mitigación:</span> Opción 3 descartada por incumplimiento normativo (puntaje 5/15 en privacidad y 5/15 en PI). Opciones 1 y 2 cumplen con GDPR-by-design y desarrollo propio (15/15 en ambos criterios).</p>
                  </div>
                </SlideIn>

                <SlideIn delay={0.25}>
                  <div className="bg-rose-500/10 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 border border-rose-500/20 h-full">
                    <div className="flex items-center gap-1.5 mb-1"><Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-300" /><span className="text-rose-300 font-bold text-[10px] sm:text-xs">Riesgo 4: Capacidad de Pago Insuficiente</span></div>
                    <p className="text-white/40 text-[7px] sm:text-[9px] leading-relaxed mb-1"><span className="text-rose-200/70">Identificación:</span> Préstamo de $50M al 12% anual requiere evaluación rigurosa de capacidad de pago por parte del CFO.</p>
                    <p className="text-white/60 text-[7px] sm:text-[9px] leading-relaxed"><span className="text-emerald-300/70">Mitigación:</span> 4 ratios calculados: Liquidez 6.7 meses (cubre desarrollo), Cobertura Intereses 5.6x (&gt;2.5x mínimo), Capacidad Pago 117% (holgura 17%), Apalancamiento 8:1 (favorable porque TIR 178.2% &gt;&gt; 12% de interés).</p>
                  </div>
                </SlideIn>
              </div>

              <SlideIn delay={0.3}>
                <div className="mt-2 bg-gradient-to-br from-emerald-900/20 to-teal-900/20 backdrop-blur-sm rounded-xl p-2 sm:p-2.5 border border-emerald-500/20 text-center max-w-3xl mx-auto">
                  <p className="text-emerald-300/80 text-[8px] sm:text-[10px]"><Target className="w-3 h-3 inline mr-0.5" /> Conclusión: Los 4 riesgos fueron mitigados exitosamente — la Opción 1 (MVP Ágil PRO) es la única alternativa que minimiza todos los riesgos simultáneamente: financiero (VAN positivo, capacidad pago 117%), técnico (MVP+entregas quincenales), normativo (GDPR-by-design) y operativo (equipo factible de 5 roles).</p>
                </div>
              </SlideIn>
            </section>}

            {/* ══════════ SLIDE 9 — INDICADOR 6 (20%) ══════════ */}
            {slide === 9 && <section className="w-full max-w-5xl">
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

            {/* ══════════ SLIDE 10 — DESGLOSE VAN/TIR/PRI ══════════ */}
            {slide === 10 && <section className="w-full max-w-6xl">
              <div className="text-center mb-3">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                  className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 rounded-full bg-emerald-500/20 flex items-center justify-center"
                >
                  <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-300" />
                </motion.div>
                <h2 className="text-xl sm:text-3xl font-black text-white">Desglose VAN / TIR / PRI</h2>
                <p className="text-white/50 text-[10px] sm:text-sm mt-1">Fórmulas · Cálculo paso a paso · Interpretación de resultados</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-6xl mx-auto">
                <SlideIn delay={0.1}>
                  <div className="bg-emerald-500/10 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 border border-emerald-500/20 h-full flex flex-col">
                    <div className="flex items-center gap-1.5 mb-1.5"><DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" /><span className="text-emerald-300 font-bold text-[10px] sm:text-xs">VAN — Valor Actual Neto</span></div>
                    <p className="text-white/40 text-[7px] sm:text-[9px] leading-relaxed mb-1"><span className="text-white/70">Fórmula:</span> VAN = Σ(FC<sub>t</sub> / (1+i)<sup>t</sup>) − I<sub>0</sub></p>
                    <p className="text-white/40 text-[7px] sm:text-[9px] leading-relaxed mb-1"><span className="text-white/70">Cálculo:</span> Cada flujo mensual se descuenta con tasa i = 12% anual (0.949% mensual). Suma de 36 flujos descontados − inversión inicial.</p>
                    <div className="mt-auto bg-emerald-500/10 rounded-lg p-1.5 text-center">
                      <div className="text-emerald-300 font-black text-sm sm:text-lg">+$305.9M</div>
                      <p className="text-white/50 text-[6px] sm:text-[8px]">VAN &gt; $0 ✓ — Crea valor sobre la tasa exigida</p>
                    </div>
                  </div>
                </SlideIn>

                <SlideIn delay={0.15}>
                  <div className="bg-emerald-500/10 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 border border-emerald-500/20 h-full flex flex-col">
                    <div className="flex items-center gap-1.5 mb-1.5"><TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" /><span className="text-emerald-300 font-bold text-[10px] sm:text-xs">TIR — Tasa Interna de Retorno</span></div>
                    <p className="text-white/40 text-[7px] sm:text-[9px] leading-relaxed mb-1"><span className="text-white/70">Fórmula:</span> VAN = 0 = Σ(FC<sub>t</sub> / (1+TIR)<sup>t</sup>) − I<sub>0</sub></p>
                    <p className="text-white/40 text-[7px] sm:text-[9px] leading-relaxed mb-1"><span className="text-white/70">Cálculo:</span> Por iteración (prueba y error): se prueban tasas hasta que VAN ≈ 0. Se usó interpolación lineal entre la tasa que da VAN positivo y la que da VAN negativo.</p>
                    <div className="mt-auto bg-emerald-500/10 rounded-lg p-1.5 text-center">
                      <div className="text-emerald-300 font-black text-sm sm:text-lg">178.2%</div>
                      <p className="text-white/50 text-[6px] sm:text-[8px]">TIR &gt;&gt; 12% ✓ — 14.8x superior al costo del préstamo</p>
                    </div>
                  </div>
                </SlideIn>

                <SlideIn delay={0.2}>
                  <div className="bg-emerald-500/10 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 border border-emerald-500/20 h-full flex flex-col">
                    <div className="flex items-center gap-1.5 mb-1.5"><Hourglass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" /><span className="text-emerald-300 font-bold text-[10px] sm:text-xs">PRI — Período de Recuperación</span></div>
                    <p className="text-white/40 text-[7px] sm:text-[9px] leading-relaxed mb-1"><span className="text-white/70">Fórmula:</span> PRI = Mes donde FC acumulado ≥ I<sub>0</sub></p>
                    <p className="text-white/40 text-[7px] sm:text-[9px] leading-relaxed mb-1"><span className="text-white/70">Cálculo:</span> Se interpolan los flujos descontados acumulados entre el mes donde cambia de negativo a positivo. Ecuación: Mes negativo + |FC acum negativo| / FC del mes.</p>
                    <div className="mt-auto bg-emerald-500/10 rounded-lg p-1.5 text-center">
                      <div className="text-emerald-300 font-black text-sm sm:text-lg">20.1 meses</div>
                      <p className="text-white/50 text-[6px] sm:text-[8px]">PRI &lt; 36 meses ✓ — Recuperación antes del plazo del préstamo</p>
                    </div>
                  </div>
                </SlideIn>
              </div>

              <SlideIn delay={0.25}>
                <div className="mt-2 bg-gradient-to-br from-emerald-900/20 to-teal-900/20 backdrop-blur-sm rounded-xl p-2 sm:p-2.5 border border-emerald-500/20 max-w-4xl mx-auto">
                  <p className="text-emerald-300/80 text-[8px] sm:text-[10px]"><CheckCircle className="w-3 h-3 inline mr-0.5" /> Los 3 indicadores son POSITIVOS y superan las exigencias del CFO (VAN &gt; $0, TIR &gt; 12%, PRI &lt; 36 meses). El proyecto genera $7.36 por cada $1 invertido — es financieramente sólido y atractivo para inversionistas.</p>
                </div>
              </SlideIn>
            </section>}

            {/* ══════════ SLIDE 11 — INDICADOR 7 (15%) ══════════ */}
            {slide === 11 && <section className="max-w-4xl mx-auto w-full">
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

            {/* ══════════ SLIDE 12 — IMPACTO SOCIAL ══════════ */}
            {slide === 12 && <section className="w-full max-w-5xl">
              <div className="text-center mb-3 sm:mb-4">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                  className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-2 rounded-full bg-pink-500/20 flex items-center justify-center"
                >
                  <Heart className="w-7 h-7 sm:w-10 sm:h-10 text-pink-300" fill="#f9a8d4" />
                </motion.div>
                <h2 className="text-2xl sm:text-4xl font-black text-white">Más que un Proyecto de Software</h2>
                <p className="text-white/50 text-xs sm:text-sm mt-1">10,000+ familias al año · 85% nunca reencuentran · Podemos cambiarlo</p>
              </div>

              <div className="max-w-4xl mx-auto space-y-2 sm:space-y-3">
                <SlideIn delay={0.1}>
                  <div className="bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-red-500/10 backdrop-blur-sm rounded-xl p-3 sm:p-5 border border-pink-500/20">
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed text-center">
                      <span className="text-pink-300 font-semibold">Detrás de cada número hay una historia real.</span> El 85% de las mascotas perdidas en Chile nunca regresan a casa. Son más de <span className="text-rose-200 font-bold">10.000 familias al año</span> que pierden a un miembro de su familia sin saber dónde buscarlo.
                    </p>
                  </div>
                </SlideIn>

                <SlideIn delay={0.15}>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 border border-white/10 text-center">
                      <div className="text-pink-300 font-black text-lg sm:text-2xl">15%</div>
                      <p className="text-white/50 text-[9px] sm:text-xs">Tasa actual de reencuentro</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 border border-white/10 text-center">
                      <div className="text-emerald-300 font-black text-lg sm:text-2xl">60%+</div>
                      <p className="text-white/50 text-[9px] sm:text-xs">Tasa proyectada con Patitas</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 border border-white/10 text-center">
                      <div className="text-amber-300 font-black text-lg sm:text-2xl">4x</div>
                      <p className="text-white/50 text-[9px] sm:text-xs">Más familias reunidas</p>
                    </div>
                  </div>
                </SlideIn>

                <SlideIn delay={0.2}>
                  <div className="bg-gradient-to-br from-rose-900/20 to-pink-900/20 backdrop-blur-sm rounded-xl p-3 sm:p-5 border border-rose-500/20">
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed text-center italic">
                      "Cada vez que alguien encuentra a su mascota gracias a Patitas Conectadas, no es una transacción — <span className="text-pink-200 font-semibold">es una familia reunida</span>. El software es el medio, pero el fin es humano. Esto es lo que hace que este proyecto sea especial: no solo es viable financieramente, sino que <span className="text-emerald-200 font-semibold">transforma vidas</span>."
                    </p>
                  </div>
                </SlideIn>
              </div>
            </section>}

            {/* ══════════ SLIDE 13 — GRACIAS ══════════ */}
            {slide === 13 && <section className="text-center">
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
