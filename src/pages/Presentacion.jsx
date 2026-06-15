import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ChevronDown, Maximize2, Minimize2, PawPrint, Heart, DollarSign, BarChart3, Target, CheckCircle, TrendingUp, BookOpen, Lightbulb, ArrowRight, Bell, ClipboardList, X, MessageSquareText, HelpCircle, ZoomIn, Users, User, Cloud, Handshake, Calendar, ClipboardCheck, Monitor, Scale, GraduationCap, Building2, Landmark, Wallet, Building, UserCheck, Hospital, Hourglass, RefreshCw, Shield, TrendingDown, Plus, Check, Star, Coins, Banknote } from 'lucide-react'

/* ── Slide metadata ── */
const slides = [
  { id: 'portada',    gradient: 'from-slate-900 via-blue-900 to-indigo-900 dark:from-black dark:via-blue-950 dark:to-indigo-950', icon: PawPrint },
  { id: 'contexto',   gradient: 'from-rose-900 via-red-800 to-orange-900 dark:from-rose-950 dark:via-red-900 dark:to-orange-950', icon: Heart },
  { id: 'solucion',   gradient: 'from-emerald-900 via-teal-800 to-cyan-900 dark:from-emerald-950 dark:via-teal-900 dark:to-cyan-950', icon: Target },
  { id: 'flujo',      gradient: 'from-blue-900 via-cyan-800 to-sky-900 dark:from-blue-950 dark:via-cyan-900 dark:to-sky-950', icon: BarChart3 },
  { id: 'conceptos',  gradient: 'from-indigo-900 via-violet-800 to-purple-900 dark:from-indigo-950 dark:via-violet-900 dark:to-purple-950', icon: BookOpen },
  { id: 'prestamo',   gradient: 'from-violet-900 via-purple-800 to-fuchsia-900 dark:from-violet-950 dark:via-purple-900 dark:to-fuchsia-950', icon: DollarSign },
  { id: 'indicadores',gradient: 'from-emerald-900 via-green-800 to-teal-900 dark:from-emerald-950 dark:via-green-900 dark:to-teal-950', icon: TrendingUp },
  { id: 'comparativa',gradient: 'from-amber-900 via-orange-800 to-yellow-900 dark:from-amber-950 dark:via-orange-900 dark:to-yellow-950', icon: ClipboardList },
  { id: 'reflexion',  gradient: 'from-cyan-900 via-teal-800 to-emerald-900 dark:from-cyan-950 dark:via-teal-900 dark:to-emerald-950', icon: Lightbulb },
  { id: 'exito',      gradient: 'from-amber-900 via-yellow-800 to-emerald-900 dark:from-amber-950 dark:via-yellow-900 dark:to-emerald-950', icon: CheckCircle },
  { id: 'gracias',    gradient: 'from-pink-900 via-rose-800 to-red-900 dark:from-pink-950 dark:via-rose-900 dark:to-red-950', icon: Heart },
]

/* ── Speaker notes for each slide ── */
const speakerNotes = {
  portada: 'Saludo inicial. "Buenos días, somos el equipo de Patitas Conectadas. Hoy presentamos la evaluación económica de nuestra plataforma centralizada para la recuperación de mascotas perdidas. El proyecto se desarrolla bajo la Opción 1: Desarrollo Incremental Ágil (MVP), con un horizonte de 36 meses."',
  contexto: 'Contextualizar el problema: 85% de mascotas perdidas nunca regresan. 10.000+ al año en Chile. Solo 15% se reencuentran. Nuestra solución busca revertir estas cifras.',
  solucion: 'Plataforma centralizada con 3 pilares: Matching IA por foto, Geoalertas por zona, Red de Apoyo con clínicas/refugios/municipios. Modelo Freemium + B2B.',
  flujo: `ESTRUCTURA: Dos fases claras. Fase 1 (desarrollo, meses 1-6): $8.34M/mes sin ingresos. Fase 2 (operación, meses 7-36): $6.33M/mes con ingresos crecientes.

CONCEPTOS FINANCIEROS CLAVE:
1. LIQUIDEZ: Monitoreamos mes a mes el flujo neto. En fase 1 el flujo es negativo (-$8.34M/mes). Desde mes 12 se vuelve positivo.
2. SOLVENCIA: El punto de equilibrio operacional se alcanza en el mes 12, cuando los ingresos de $8.28M superan los costos operativos de $6.33M más la cuota del préstamo de $1.66M.
3. ESCUDO FISCAL: Los intereses del préstamo ($9.78M total) reducen la base imponible del impuesto del 25%. Esto significa que pagamos menos impuesto gracias a los intereses.
4. COSTOS FIJOS VS VARIABLES: Separamos claramente los costos de desarrollo (fijos del proyecto) de los costos operativos (que escalan con usuarios).

RESULTADO: Punto de equilibrio en mes 12. Flujo acumulado al mes 36: $414.16M.`,

  conceptos: `Diapositiva dedicada a los 4 conceptos financieros clave para responder la Pregunta 1.
  
1. LIQUIDEZ: Capacidad de pago a corto plazo. Nuestro flujo neto mensual es negativo en desarrollo (-$8.34M) pero se vuelve positivo desde mes 12.
2. SOLVENCIA: Capacidad de pago total. Punto de equilibrio en mes 12 donde los ingresos cubren todos los costos más la cuota del préstamo.
3. ESCUDO FISCAL: Beneficio tributario. Los intereses del préstamo ($9.78M) reducen la base imponible del impuesto del 25%. Ahorro estimado: ~$2.4M.
4. COSTOS FIJOS VS VARIABLES: En desarrollo todos los costos son fijos (sueldos, infraestructura). En operación aparecen costos variables que escalan con usuarios.

Explicar cada concepto con su aplicación concreta al proyecto.`,

  prestamo: `CAPACIDAD FINANCIERA (3 razones):
1. PUNTO EQUILIBRIO MES 12: Los ingresos de $8.28M superan costos operativos $6.33M + cuota préstamo $1.66M.
2. TENDENCIA CRECIENTE: Ingresos de $560K (mes 7) a $50.52M (mes 36), multiplicando por 90.
3. ESTRUCTURA FINANCIAMIENTO: 11% capital propio ($6.24M) + 89% préstamo ($50M). Preserva liquidez sin diluir propiedad.

SISTEMA FRANCÉS:
Fórmula: R = P × [i(1+i)^n] / [(1+i)^n - 1]
- P = $50.000.000 (préstamo)
- i = 1% mensual (12% anual)
- n = 36 meses
R = $50M × [0,01(1,01)^36] / [(1,01)^36 - 1] = $1.660.715 mensuales

Total intereses: $9.785.763 en 36 meses.
BENEFICIO: TIR 178.2% >> 12% → Apalancamiento favorable. Pedir prestado al 12% para invertir en un proyecto que rinde 178.2%.`,

  indicadores: `PROCEDIMIENTO VAN:
1. Definir tasa de descuento: 12% anual
2. Convertir a mensual: i = (1.12)^(1/12) - 1 = 0.949% mensual
3. Descontar cada flujo: VAN = Σ Flujo_t / (1.00949)^t - Inversión_0
4. Sumar todos los flujos descontados y restar inversión inicial
RESULTADO: $305.902.076 > $0 → El proyecto crea valor sobre el 12% exigido

PROCEDIMIENTO TIR:
1. Probar tasas hasta encontrar VAN = 0
2. A 0.1% mensual: VAN = +$411M
3. A 8.9% mensual: VAN ≈ $0
4. TIR mensual = 8.9%
5. TIR anual = (1.089)^12 - 1 = 178.2%
INTERPRETACIÓN: Por cada peso invertido, retorno equivalente al 178.2% anual >> 12% costo capital

PROCEDIMIENTO PRI:
1. Ubicar el cambio de signo en flujo acumulado
2. Mes 20: acumulado -$987.443 → Mes 21: +$18.198.268
3. Interpolación lineal: PRI = 20 + ($987.443 / $18.198.268) = 20.1 meses
INTERPRETACIÓN: Recuperamos la inversión en 20.1 meses < 36 meses horizonte

COMPARATIVA OPCIÓN 2: VAN negativo, TIR < 12%, PRI > 36 meses → DESCARTADA`,

  comparativa: 'Opción 1 (MVP): 36 meses, VAN +$306M, TIR 178.2%, PRI 20.1m, inversión -$56.24M. Opción 2 (Full): 48+ meses, VAN negativo, TIR < 12%, PRI > 36m, inversión -$120M+. Conclusión: MVP es la opción viable.',
  reflexion: `MI APORTE ESPECÍFICO: Lideré el modelamiento financiero completo: flujo de caja, tabla de amortización del préstamo bajo sistema francés, y el cálculo de VAN, TIR y PRI.
   
MIS FORTALEZAS: Capacidad analítica para traducir requerimientos de software en variables cuantitativas financieras, y rigor metodológico para que cada cifra cuadrara al centavo.
   
MI PRINCIPAL DIFICULTAD: Sobreestimación inicial de ingresos. La superé investigando startups similares en Chile y ajustando la tasa de conversión al 10% realista.
   
LECCIÓN APRENDIDA: La viabilidad técnica de un software es inútil si no tiene un flujo de caja saludable. Hoy puedo defender un proyecto tanto técnica como financieramente ante un directorio o inversionista.`,

  exito: `CONCLUSIÓN FINAL: El proyecto es VIABLE y un ÉXITO rotundo.
   
TABLA RESUMEN:
| Concepto | Monto |
| Costo proyecto | $56.24M ($50M préstamo + $6.24M capital) |
| Ingresos totales 36m | $670M |
| Costos operativos totales | $246M |
| Intereses préstamo | $9.79M |
| Balance neto empresa | +$414M |
| VAN | +$305.9M > $0 <CheckCircle className="w-3 h-3 text-emerald-300 inline -mt-0.5" /> |
| TIR | 178.2% >> 12% <CheckCircle className="w-3 h-3 text-emerald-300 inline -mt-0.5" /> |
| PRI | 20.1 meses < 36m <CheckCircle className="w-3 h-3 text-emerald-300 inline -mt-0.5" /> |
| Nosotros (fundadores) ganamos | +$407.76M |
| El banco ganó | $9.79M |
| Cada $1 invertido genera | $7.36 de retorno |

Mensaje: Todos los indicadores son positivos. VAN > 0, TIR >> tasa descuento, PRI < horizonte. El proyecto supera todas las exigencias de la rúbrica. Es un proyecto ALTAMENTE RENTABLE y VIABLE.`,

  gracias: 'Cierre. "En resumen: VAN $305.9M positivo, TIR 178.2% superior al 12%, PRI 20.1 meses menor a 36 meses. El proyecto es VIABLE y ALTAMENTE RENTABLE. Estamos listos para responder sus preguntas. Gracias."'
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
    q: '¿Por qué eligieron Opción 1 (MVP) y descartaron Opción 2?',
    a: 'La Opción 1 (MVP) fue seleccionada tras un análisis comparativo riguroso. La Opción 2 requería una inversión superior a $120M con 18 meses de desarrollo sin generar ingresos, resultando en VAN negativo (no crea valor sobre el 12% exigido), TIR inferior al 12% (no supera el costo de capital) y PRI superior a 36 meses (no se recupera la inversión en el horizonte). En contraste, el MVP requiere solo $56.24M, genera ingresos desde el mes 7, alcanza el punto de equilibrio en el mes 12, y produce un VAN de +$305.9M con TIR de 178.2%. La Opción 1 minimiza el riesgo financiero, permite validación temprana con el mercado, y maximiza el retorno sobre la inversión. Es la decisión financieramente óptima.'
  },
  {
    q: '¿Cómo proyectaron los ingresos del proyecto?',
    a: 'Los ingresos se modelaron con un enfoque mixto Freemium + B2B. En el segmento B2C, asumimos una base creciente de usuarios donde el 10% se convierte a Premium pagando $3.000 mensuales. En B2B, contratamos 3 verticales: clínicas veterinarias a $100.000/mes cada una, municipios a $300.000/mes, y refugios/ONG a $60.000/mes. Los contratos B2B se incorporan gradualmente a partir del mes 7. El crecimiento es exponencial tipo SaaS: de $560.000 en el mes 7 a $50.52M en el mes 36 — un multiplicador de 90x. Este modelo es conservador porque la tasa de conversión del 10% está por debajo del promedio de la industria SaaS (15-20%) y los contratos B2B son recurrentes con alta retención.'
  },
  {
    q: '¿Qué impacto tiene si la tasa de conversión es menor al 10%?',
    a: 'Realizamos un análisis de sensibilidad. Si la tasa de conversión cae al 5%, los ingresos B2C se reducen a la mitad, pero los contratos B2B ($100K clínicas, $300K municipios, $60K refugios) se mantienen porque son contratos institucionales. El VAN seguiría siendo positivo (~$150M) y la TIR ~95%, todavía muy por encima del 12%. El punto de equilibrio se retrasaría aproximadamente 2 meses (mes 14). Incluso en un escenario pesimista extremo (conversión 3%, solo 50% de contratos B2B), el VAN sería ligeramente positivo y la TIR superaría el 20%. El proyecto es robusto gracias a la diversificación de ingresos entre B2C y B2B.'
  },
  {
    q: '¿Cómo calcularon la TIR y por qué es tan alta (178.2%)?',
    a: 'La TIR se calculó por iteración: probamos tasas de descuento mensuales hasta encontrar el valor que hace VAN = 0. A una tasa mensual de 0.1%, el VAN era +$411M. A 8.9% mensual, el VAN se aproximó a cero. La TIR mensual es 8.9%, que anualizada da (1.089)^12 − 1 = 178.2%. Es alta porque: (1) el modelo SaaS tiene costos operativos relativamente fijos mientras los ingresos crecen exponencialmente, (2) la inversión inicial es moderada ($56.24M), y (3) el apalancamiento con 89% de deuda al 12% anual multiplica el retorno sobre el capital propio. Una TIR de 178.2% significa que por cada $1 invertido, el proyecto genera un retorno equivalente al 178.2% anual, muy superior al 12% que cuesta el capital.'
  },
  {
    q: '¿Por qué usaron Sistema Francés y no Alemán?',
    a: 'Seleccionamos el Sistema Francés (cuota constante) porque es el estándar en la banca chilena para créditos comerciales y el más usado en evaluación de proyectos. En el Sistema Francés, la cuota es fija ($1.660.715/mes), lo que facilita la proyección de flujo de caja: sabemos exactamente cuánto pagar cada mes. La composición varía: al inicio se paga más interés y menos amortización, y con el tiempo se invierte. En total pagamos $9.785.763 en intereses. Si hubiéramos usado Sistema Alemán (cuota decreciente), las cuotas iniciales habrían sido más altas, empeorando el flujo de caja en los meses críticos del valle de la muerte. El Sistema Francés es más favorable para la liquidez del proyecto en sus primeros meses.'
  },
  {
    q: '¿Qué es el escudo fiscal y cómo lo incorporaron?',
    a: 'El escudo fiscal es el beneficio tributario que genera la deuda: los intereses del préstamo son gastos deducibles de impuestos. En Chile, la tasa de impuesto a la renta es del 25%. Los intereses totales del préstamo ascienden a $9.785.763 en 36 meses. Al ser deducibles, reducen la base imponible en esa misma cantidad, generando un ahorro fiscal de aproximadamente $2.4M (25% × $9.785.763). Incorporamos este beneficio en el flujo de caja como una reducción en el pago de impuestos. Esto mejora el VAN en aproximadamente $1.8M descontado. El escudo fiscal es una de las 3 razones que hacen favorable el apalancamiento: no solo pedimos prestado al 12% para ganar 178.2%, sino que además los intereses nos ahorran impuestos.'
  },
  {
    q: '¿Cómo determinaron el punto de equilibrio?',
    a: 'El punto de equilibrio operacional se determina cuando los ingresos mensuales igualan la suma de costos operativos más la cuota del préstamo. Los costos operativos son $6.330.000/mes (RRHH $5.24M + infraestructura $1.09M) y la cuota del préstamo es $1.660.715/mes, dando un total de $7.990.715/mes. Los ingresos comienzan en $560.000 en el mes 7 y crecen mensualmente. En el mes 12, los ingresos alcanzan aproximadamente $8.28M, superando por primera vez el umbral de $7.99M. Es importante notar que este es el equilibrio operacional, no contable: la empresa puede pagar todas sus obligaciones mensuales. El PRI (payback) es diferente: mide cuándo se recupera la inversión total, que ocurre en el mes 20.1.'
  },
  {
    q: '¿Por qué financiaron 89% con deuda y no con capital propio?',
    a: 'La estructura 89% deuda / 11% capital propio se justifica por 4 razones. Primero: el costo de la deuda (12% anual) es muy inferior a la rentabilidad del proyecto (TIR 178.2%), generando apalancamiento favorable — cada peso prestado rinde más de lo que cuesta. Segundo: preserva el capital propio de los socios para contingencias y futuras rondas de inversión, manteniendo liquidez. Tercero: los intereses son deducibles de impuestos (escudo fiscal ~$2.4M), reduciendo el costo efectivo de la deuda a aproximadamente 9% después de impuestos. Cuarto: evita diluir la propiedad del equipo fundador, ya que la deuda no entrega derechos de voto. El único riesgo es la capacidad de pago, pero el punto de equilibrio en mes 12 demuestra que el flujo de caja cubre cómodamente la cuota mensual de $1.66M.'
  },
  {
    q: '¿Cuál es el valor temporal del dinero y cómo lo aplicaron?',
    a: 'El valor temporal del dinero es el principio fundamental de las finanzas: $1 hoy vale más que $1 mañana porque puede invertirse y generar retorno. Lo aplicamos en 3 decisiones clave. Primero: la tasa de descuento del 12% anual representa nuestro costo de oportunidad — lo que exigimos por invertir en este proyecto en lugar de alternativas de similar riesgo. Segundo: descontamos cada flujo mensual a valor presente usando la fórmula VAN = Σ Flujoₜ/(1+0.00949)ᵗ − I₀, donde 0.949% es la tasa mensual equivalente. Tercero: el hecho de que el VAN sea positivo ($305.9M) significa que el proyecto genera más valor que la mejor alternativa disponible al 12%. Si ignoráramos este principio, cualquier proyecto con flujo positivo parecería rentable, cuando en realidad podría destruir valor si no supera el costo de capital.'
  },
  {
    q: '¿Qué aprendió de este proyecto para su formación profesional?',
    a: 'Este proyecto transformó mi comprensión de la ingeniería de software: un producto técnicamente impecable es financieramente insostenible si no tiene un modelo de negocio viable. Aprendí a traducir requerimientos de software (roles, infraestructura, tiempos de desarrollo) en variables cuantitativas financieras (flujo de caja, VAN, TIR). Desarrollé rigor metodológico para que cada cifra cuadre al centavo y aprendí a defender una propuesta tanto técnica como financieramente ante inversionistas. Este proyecto me preparó para tomar decisiones de inversión en tecnología con criterio económico, no solo técnico — una habilidad crítica para cualquier líder de proyectos de software.'
  }
]

/* ── Respuestas fundamentadas para preguntas de la rúbrica ── */
const rubricAnswers = {
  pregunta1: {
    title: 'Pregunta 1 — Flujo de Caja',
    subtitle: '¿Cómo desarrolló el cálculo de flujo de caja? ¿Qué conceptos financieros son clave?',
    answer: `Respuesta fundamentada:

Desarrollé el flujo de caja en dos fases claramente diferenciadas sobre un horizonte de 36 meses.

FASE 1 — DESARROLLO (Meses 1 a 6):
Durante 6 meses desarrollamos el MVP con un equipo de 5 roles (Product Owner, Backend, Mobile, UX, QA). Los costos mensuales son $7.760.000 en RRHH y $580.000 en infraestructura AWS/licencias, totalizando $8.340.000/mes. Se suma una inversión inicial de $6.200.000 en equipamiento, estudio de factibilidad, registro legal y capacitación. En esta fase NO HAY INGRESOS porque el producto está en construcción.

FASE 2 — OPERACIÓN (Meses 7 a 36):
El equipo se reduce a roles operativos (PM, Full Stack, Soporte, Community Manager) con costos RRHH de $5.240.000/mes. La infraestructura escala con usuarios a $1.090.000/mes. Los costos operativos totales son $6.330.000/mes.

MODELO DE INGRESOS (Freemium + B2B):
- B2C: 10% de usuarios se convierten a Premium pagando $3.000/mes
- B2B: Clínicas veterinarias a $100.000/mes, municipios a $300.000/mes, refugios/ONG a $60.000/mes
- Crecimiento: de $560.000 (mes 7) a $50.52M (mes 36) = crecimiento 90x

CONCEPTOS FINANCIEROS CLAVE (4):
1. LIQUIDEZ — Capacidad de pago a corto plazo. Flujo neto mensual negativo en desarrollo (-$8.34M), positivo desde mes 12.
2. SOLVENCIA — Capacidad de pago total. Punto de equilibrio en mes 12 cuando ingresos $8.28M superan costos $6.33M + cuota $1.66M.
3. ESCUDO FISCAL — Los intereses del préstamo ($9.78M) reducen la base imponible del impuesto del 25%. Ahorro estimado: ~$2.4M.
4. COSTOS FIJOS vs VARIABLES — Desarrollo: costos fijos (sueldos, infraestructura base). Operación: costos variables que escalan con usuarios.

RESULTADOS CLAVE:
- Punto de equilibrio operacional: Mes 12
- Flujo acumulado al mes 36: +$414.16M
- Ecuación: $670M (ingresos) − $256M (costos+interés) = +$414M (balance)`
  },
  pregunta1b: {
    title: 'Pregunta 1b — Conceptos Financieros Clave',
    subtitle: '¿Qué conceptos financieros son clave para el cálculo del flujo de caja?',
    answer: `Respuesta fundamentada:

Los 4 conceptos financieros clave que aplicamos al flujo de caja son:

1. LIQUIDEZ:
Mide la capacidad de la empresa para cumplir sus obligaciones de pago a corto plazo. En nuestro proyecto, monitoreamos el flujo neto mensual. Durante la fase de desarrollo (meses 1-6), la liquidez es negativa porque gastamos $8.34M/mes sin generar ingresos. A partir del mes 12, el flujo neto se vuelve positivo porque los ingresos ($8.28M) superan los costos operativos ($6.33M) más la cuota del préstamo ($1.66M). La liquidez es crítica en los primeros meses: por eso financiamos 89% con deuda, para preservar caja.

2. SOLVENCIA:
Evalúa la capacidad de pago total de la empresa a largo plazo. Nuestro punto de equilibrio en el mes 12 demuestra solvencia: en ese momento los ingresos cubren TODOS los costos, incluyendo el servicio de la deuda. La tendencia es positiva porque los ingresos crecen 90x mientras los costos operativos crecen solo linealmente.

3. ESCUDO FISCAL:
Beneficio tributario generado por el financiamiento con deuda. Los intereses del préstamo ($9.785.763 en 36 meses) son un gasto deducible de impuestos en Chile (tasa 25%). Esto reduce la base imponible, generando un ahorro fiscal estimado de ~$2.4M. Incorporamos este beneficio en el flujo de caja como menor pago de impuestos, mejorando el VAN en aproximadamente $1.8M.

4. COSTOS FIJOS vs VARIABLES:
Separamos claramente los costos que no dependen del uso (desarrollo: sueldos $7.76M/mes, infraestructura base $580K/mes) de aquellos que escalan con los usuarios (infraestructura en operación: $1.09M/mes). Esta distinción es clave porque nos permite proyectar con precisión el flujo de caja a medida que la base de usuarios crece, y determinar el punto de equilibrio con exactitud.`
  },
  pregunta2: {
    title: 'Pregunta 2 — Capacidad Financiera + Préstamo',
    subtitle: '¿Cómo evaluó la capacidad financiera? ¿Cómo calculó el préstamo y qué beneficios trae?',
    answer: `Respuesta fundamentada:

CAPACIDAD FINANCIERA — 4 INDICADORES NUMÉRICOS:

1. LIQUIDEZ (RUNWAY): 6.7 meses
   - $56.24M (caja disponible) / $8.34M (costo mensual desarrollo) = 6.7 meses
   - La empresa cubre toda la fase de desarrollo sin generar ingresos.

2. COBERTURA DE INTERESES: 5.6x
   - $1.95M (EBIT mensual desde mes 12) / $0.35M (interés mensual promedio) = 5.6x
   - Referencia mínima: 2.5x. Estamos al doble. Sólida capacidad de pago.

3. APALANCAMIENTO (DEUDA/PATRIMONIO): 8.0 : 1
   - $50M deuda / $6.24M capital = 8.0 (alto pero favorable)
   - Justificado porque TIR 178.2% >> 12% costo de la deuda

4. CAPACIDAD DE PAGO MENSUAL: 117%
   - $1.95M (ingresos netos) / $1.66M (cuota préstamo) = 117%
   - Holgura del 17% sobre la cuota. La empresa paga el préstamo con comodidad.

CONCLUSIÓN: La empresa SÍ tiene capacidad financiera. Todos los indicadores son positivos.

CÁLCULO DEL PRÉSTAMO — SISTEMA FRANCÉS:
Usamos el Sistema Francés (cuota constante) porque es el estándar en la banca chilena y facilita la proyección del flujo de caja.
Fórmula: R = P × [i(1+i)ⁿ] / [(1+i)ⁿ − 1]
- P = $50.000.000
- i = 1% mensual (12% anual)
- n = 36 meses
- R = $50M × [0.01(1.01)³⁶] / [(1.01)³⁶ − 1] = $1.660.715/mes

Total intereses pagados: $9.785.763
Total pagado (capital + intereses): $59.785.763

ESTRUCTURA DE INVERSIÓN:
- Préstamo: $50.000.000 (89%)
- Capital propio: $6.240.000 (11%)
- Inversión total: $56.240.000

El apalancamiento es favorable porque TIR 178.2% >> 12% costo de la deuda, y el escudo fiscal reduce aún más el costo efectivo.`
  },
  pregunta3: {
    title: 'Pregunta 3 — VAN, TIR y PRI',
    subtitle: '¿Cuál fue el procedimiento de cálculo de VAN, TIR y PRI?',
    answer: `Respuesta fundamentada:

PROCEDIMIENTO VAN (Valor Actual Neto):
1. Definir la tasa de descuento: 12% anual (costo de oportunidad del capital)
2. Convertir a tasa mensual: i = (1.12)^(1/12) − 1 = 0.949% mensual
3. Aplicar la fórmula: VAN = Σ [Flujoₜ / (1 + 0.00949)ᵗ] − Inversión₀
4. Cada flujo mensual se descuenta al valor presente usando la tasa del 0.949%
5. RESULTADO: VAN = +$305.902.076 > $0
INTERPRETACIÓN: El proyecto crea valor por $305.9M sobre el 12% exigido. Es rentable.

PROCEDIMIENTO TIR (Tasa Interna de Retorno):
1. Probar tasas de descuento hasta encontrar el valor que hace VAN = 0
2. A 0.1% mensual: VAN = +$411M (positivo, la tasa es baja)
3. A 8.9% mensual: VAN ≈ $0 (encontramos la TIR)
4. TIR mensual = 8.9%
5. TIR anual = (1.089)^12 − 1 = 178.2%
INTERPRETACIÓN: Por cada $1 invertido, el proyecto genera un retorno equivalente al 178.2% anual. Esto supera ampliamente el 12% que cuesta el capital.

PROCEDIMIENTO PRI (Período de Recuperación):
1. Identificar el cambio de signo en el flujo acumulado
2. Mes 20: acumulado = -$987.443 (último mes negativo)
3. Mes 21: acumulado = +$18.198.268 (primer mes positivo)
4. Interpolación lineal: PRI = 20 + (987.443 / 18.198.268) = 20.1 meses
INTERPRETACIÓN: Recuperamos la inversión total en 20.1 meses, muy por debajo del horizonte de 36 meses.

SÍNTESIS DE CRITERIOS:
| Criterio | Exigencia | Resultado | ¿Cumple? |
| VAN > 0 | $0 | +$305.9M | <CheckCircle className="w-3 h-3 text-emerald-300 inline" /> |
| TIR > 12% | 12% | 178.2% | <CheckCircle className="w-3 h-3 text-emerald-300 inline" /> |
| PRI < 36m | 36 meses | 20.1 meses | <CheckCircle className="w-3 h-3 text-emerald-300 inline" /> |
| Flujo + desde | — | Mes 12 | <CheckCircle className="w-3 h-3 text-emerald-300 inline" /> |

ECUACIÓN DEL BALANCE A 36 MESES:
$670M (Ingresos totales) − $256M (Costos + Interés) = +$414M (Balance final)
Inversión: $56.24M ($50M préstamo + $6.24M capital)

CONCEPTOS ECONÓMICOS CLAVE:
- VALOR TEMPORAL DEL DINERO: $1 hoy > $1 mañana. Por eso descontamos flujos.
- TASA DE DESCUENTO / COSTO DE OPORTUNIDAD: 12% = lo mínimo que exigimos.
- FLUJO DE CAJA DESCONTADO (DCF): Cada flujo se divide por (1+r)^t.
- INTERÉS COMPUESTO: TIR 8.9% mensual → (1.089)^12 − 1 = 178.2% anual.

INDICADORES DE LA INDUSTRIA — Benchmark SaaS:
| Indicador | Industria SaaS | Patitas | ¿Cómo estamos? |
| TIR | 25-40% anual | 178.2% | ↑ 4.5x — Sobresaliente |
| VAN | > $0 mínimo | +$305.9M | ↑ Excelente |
| PRI | 24-36 meses | 20.1 meses | ↑ Récord bajo |
| Conversión Premium | 15-20% | 10% | ↓ Conservador (realista) |
| Margen Neto | 10-20% | 61.8% | ↑ 3x — Liderazgo |

Patitas Conectadas supera todos los benchmarks de la industria SaaS. Incluso con una tasa de conversión conservadora (10% vs 15-20%), el modelo es robusto y rentable. Fuentes: OpenView 2024, SaaS Capital 2024.`
  },
  pregunta4: {
    title: 'Pregunta 4 — Reflexión Individual',
    subtitle: 'Aporte individual, fortalezas, dificultades y lecciones aprendidas',
    answer: `Respuesta fundamentada:

MI APORTE ESPECÍFICO AL PROYECTO:
Lideré el modelamiento financiero completo del proyecto Patitas Conectadas. Diseñé la estructura del flujo de caja mensual con sus dos fases (desarrollo y operación), calculé la tabla de amortización del préstamo bajo Sistema Francés, y ejecuté los cálculos de VAN, TIR y PRI para determinar la viabilidad económica. También definí la estructura de inversión ($50M préstamo + $6.24M capital propio) y proyecté los ingresos del modelo Freemium + B2B.

MIS FORTALEZAS APORTADAS:
- Capacidad analítica para traducir requerimientos de software en variables cuantitativas financieras
- Rigor metodológico para que cada cifra cuadre al centavo y sea consistente en todos los cálculos
- Visión integral para conectar las decisiones técnicas (arquitectura, roles, tiempos) con su impacto financiero

PRINCIPAL DIFICULTAD Y CÓMO LA SUPERÉ:
La sobreestimación inicial de ingresos fue mi mayor desafío. En mi primera proyección asumí una tasa de conversión del 30%, lo que daba ingresos irreales. Para superarlo, investigué startups similares en Chile (comparables del sector pet-tech y SaaS), consulté benchmarks de la industria (tasa de conversión promedio SaaS: 15-20%) y ajusté la tasa al 10% conservador. Esto hizo que el modelo fuera realista y defendible ante inversionistas.

LECCIONES APRENDIDAS:
La lección más importante fue que la viabilidad técnica de un software es inútil si no tiene un flujo de caja saludable. Un producto puede ser técnicamente brillante pero financieramente inviable. Aprendí a defender un proyecto tanto técnica como financieramente ante un directorio o inversionista, y desarrollé un criterio económico que aplicaré en todos mis proyectos futuros.

CONTRIBUCIÓN A MI FORMACIÓN PROFESIONAL:
Este proyecto me preparó para tomar decisiones de inversión en tecnología con criterio económico, no solo técnico. Hoy puedo evaluar si un proyecto de software es financieramente viable, calcular su retorno, y argumentar con datos por qué una opción es mejor que otra. Es una habilidad crítica para cualquier líder de proyectos de software y me diferencia como profesional.`
  }
}

const rubricSlideMap = {
  3: rubricAnswers.pregunta1,
  4: rubricAnswers.pregunta1b,
  5: rubricAnswers.pregunta2,
  6: rubricAnswers.pregunta3,
  8: rubricAnswers.pregunta4,
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

            {/* ══════════ SLIDE 2 — SOLUCIÓN ══════════ */}
            {slide === 2 && <section className="text-center">
              <SlideIn delay={0}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs sm:text-sm font-medium mb-4 sm:mb-6 backdrop-blur-sm border border-white/10">
                  <Target className="w-3.5 h-3.5" /> Plataforma Centralizada — MVP (Opción 1)
                </div>
              </SlideIn>
              <SlideIn delay={0.2}>
                <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 sm:mb-8">Patitas Conectadas</h2>
              </SlideIn>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 max-w-4xl mx-auto">
                <SlideIn delay={0.4}>
                  <article className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10 h-full transition-all duration-200 ease-out hover:bg-white/15">
                    <div className="w-10 h-10 rounded-xl bg-blue-400/20 flex items-center justify-center mb-3 mx-auto"><Target className="w-5 h-5 text-blue-300" /></div>
                    <h3 className="text-white font-bold text-sm sm:text-base mb-1">Matching IA</h3>
                    <p className="text-white/50 text-xs sm:text-sm">Coincidencias automáticas por foto</p>
                  </article>
                </SlideIn>
                <SlideIn delay={0.55}>
                  <article className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10 h-full transition-all duration-200 ease-out hover:bg-white/15">
                    <div className="w-10 h-10 rounded-xl bg-emerald-400/20 flex items-center justify-center mb-3 mx-auto"><Heart className="w-5 h-5 text-emerald-300" /></div>
                    <h3 className="text-white font-bold text-sm sm:text-base mb-1">Red de Apoyo</h3>
                    <p className="text-white/50 text-xs sm:text-sm">Clínicas, refugios y municipios</p>
                  </article>
                </SlideIn>
                <SlideIn delay={0.7}>
                  <article className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10 h-full transition-all duration-200 ease-out hover:bg-white/15">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center mb-3 mx-auto"><Bell className="w-5 h-5 text-amber-300" /></div>
                    <h3 className="text-white font-bold text-sm sm:text-base mb-1">Geoalertas</h3>
                    <p className="text-white/50 text-xs sm:text-sm">Notificaciones por zona</p>
                  </article>
                </SlideIn>
              </div>
              <SlideIn delay={0.85}>
                <div className="mt-6 sm:mt-8 inline-flex items-center gap-3 text-white/60 text-xs sm:text-sm">
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">6 meses desarrollo</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">30 meses operación</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Modelo Freemium + B2B</span>
                </div>
              </SlideIn>
            </section>}

            {/* ══════════ SLIDE 3 — FLUJO DE CAJA (Pregunta 1) ══════════ */}
            {slide === 3 && <section className="w-full max-w-5xl">
              <div className="flex items-center gap-2 mb-1 justify-center">
                <button onClick={() => setRubricData(rubricAnswers.pregunta1)} type="button" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity active:scale-95 focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg px-2 py-1" title="Click para respuesta fundamentada">
                  <BarChart3 className="w-5 h-5 sm:w-7 sm:h-7 text-blue-300" />
                  <span className="text-xl sm:text-3xl font-black">Pregunta 1 — Flujo de Caja</span>
                </button>
              </div>
              <p className="text-white/50 text-[10px] sm:text-sm text-center mb-2">¿Cómo desarrolló el cálculo? ¿Qué conceptos financieros son clave?</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-5xl mx-auto mb-1.5">
                <SlideIn delay={0.1}>
                  <article className="bg-white/10 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-white/10">
                    <div className="flex items-center gap-1.5 mb-0.5"><div className="w-2 h-2 rounded-full bg-blue-400" /><span className="text-blue-300 font-bold text-[9px] sm:text-xs uppercase tracking-wider">Fase 1: Desarrollo (Meses 1-6)</span></div>
                    <div className="flex items-baseline gap-1 mb-0.5"><span className="text-lg sm:text-2xl font-black text-white/80"><CountUp end={8340000} prefix="$" /></span><span className="text-white/40 text-[9px]">/mes</span></div>
                    <div className="space-y-0.5 text-white/50 text-[8px] sm:text-[10px]">
                      <div className="flex justify-between"><span><Users className="w-2.5 h-2.5 inline mr-0.5" /> RRHH (83%) — PO, Backend, Mobile, UX, QA</span><span className="text-white/70">$7.760.000</span></div>
                      <div className="flex justify-between"><span><Cloud className="w-2.5 h-2.5 inline mr-0.5" /> Infraestructura (6%)</span><span className="text-white/70">$580.000</span></div>
                      <div className="flex justify-between border-t border-white/10 pt-0.5"><span className="text-white/40"><Plus className="w-2.5 h-2.5 inline mr-0.5" /> Inversión inicial (11%)</span><span className="text-white/70">$6.200.000</span></div>
                    </div>
                  </article>
                </SlideIn>
                <SlideIn delay={0.2}>
                  <article className="bg-white/10 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-white/10">
                    <div className="flex items-center gap-1.5 mb-0.5"><div className="w-2 h-2 rounded-full bg-emerald-400" /><span className="text-emerald-300 font-bold text-[9px] sm:text-xs uppercase tracking-wider">Fase 2: Operación (Meses 7-36)</span></div>
                    <div className="flex items-baseline gap-1 mb-0.5"><span className="text-lg sm:text-2xl font-black text-white/80"><CountUp end={6330000} prefix="$" /></span><span className="text-white/40 text-[9px]">/mes</span></div>
                    <div className="space-y-0.5 text-white/50 text-[8px] sm:text-[10px]">
                      <div className="flex justify-between"><span><Users className="w-2.5 h-2.5 inline mr-0.5" /> RRHH (83%) — PM, Full Stack, Soporte, CM</span><span className="text-white/70">$5.240.000</span></div>
                      <div className="flex justify-between"><span><Cloud className="w-2.5 h-2.5 inline mr-0.5" /> Infraestructura escalada (17%)</span><span className="text-white/70">$1.090.000</span></div>
                      <div className="flex justify-between border-t border-white/10 pt-0.5"><span className="text-emerald-300/80"><TrendingUp className="w-2.5 h-2.5 inline mr-0.5" /> Ingresos:</span><span className="text-white/70">$560K → $50.5M/mes <span className="text-emerald-300 font-bold">(+90x)</span></span></div>
                    </div>
                  </article>
                </SlideIn>
              </div>

              {/* ── J-Curve SVG ── */}
              <SlideIn delay={0.25}>
                <div className="max-w-5xl mx-auto bg-white/[0.05] rounded-xl p-2 sm:p-3 border border-white/10 mb-1.5 relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white/40 text-[8px] sm:text-[10px] uppercase tracking-wider"><TrendingUp className="w-2.5 h-2.5 inline mr-0.5" /> Flujo Acumulado (J-Curve)</span>
                    <span className="text-red-300/60 text-[7px] sm:text-[9px] font-medium ml-auto"><ChevronLeft className="w-2.5 h-2.5 inline mr-0.5" /> Valle de la Muerte</span>
                    <span className="text-emerald-300/60 text-[7px] sm:text-[9px] font-medium">Recuperación <ChevronRight className="w-2.5 h-2.5 inline ml-0.5" /></span>
                  </div>
                  <svg viewBox="0 0 600 180" className="w-full h-auto" preserveAspectRatio="xMidYMid meet" aria-label="Gráfico J-curve del flujo de caja acumulado">
                    {/* Grid */}
                    <line x1="0" y1="140" x2="600" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    <line x1="0" y1="90" x2="600" y2="90" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="4,4" />
                    <line x1="0" y1="40" x2="600" y2="40" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="4,4" />
                    {/* J-Curve line */}
                    <polyline points="0,145 100,155 200,148 333,135 350,125 600,15"
                      fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Gradient fill under curve */}
                    <path d="M0,145 L0,145 L100,155 L200,148 L333,135 L350,125 L600,15 L600,180 L0,180 Z"
                      fill="url(#fillGrad)" opacity="0.15" />
                    {/* Gradient defs */}
                    <defs>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#f87171" />
                        <stop offset="50%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                      <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Annotation dots */}
                    <circle cx="0" cy="145" r="4" fill="#f87171" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                    <circle cx="200" cy="148" r="4" fill="#fbbf24" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                    <circle cx="333" cy="135" r="4" fill="#34d399" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                    <circle cx="600" cy="15" r="4" fill="#34d399" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                    {/* Labels */}
                    <text x="0" y="168" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" className="text-[7px] sm:text-[9px]">Mes 0</text>
                    <text x="0" y="138" fill="rgba(248,113,113,0.8)" fontSize="8" textAnchor="end" className="text-[6px] sm:text-[8px]">-$6.2M</text>
                    <text x="200" y="170" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" className="text-[7px] sm:text-[9px]">Mes 12</text>
                    <text x="200" y="141" fill="rgba(251,191,36,0.8)" fontSize="8" textAnchor="middle" className="text-[6px] sm:text-[8px]">Equilibrio</text>
                    <text x="333" y="128" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" className="text-[7px] sm:text-[9px]">PRI ~20</text>
                    <text x="333" y="120" fill="rgba(52,211,153,0.8)" fontSize="8" textAnchor="middle" className="text-[6px] sm:text-[8px]">+$0</text>
                    <text x="600" y="170" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" className="text-[7px] sm:text-[9px]">Mes 36</text>
                    <text x="600" y="8" fill="rgba(52,211,153,0.9)" fontSize="9" textAnchor="middle" className="text-[7px] sm:text-[9px]">+$414M</text>
                  </svg>
                </div>
              </SlideIn>

              {/* ── Métricas express ── */}
              <div className="grid grid-cols-4 gap-1.5 max-w-5xl mx-auto mb-1.5">
                <SlideIn delay={0.3}><div className="bg-emerald-500/10 rounded-lg p-1 sm:p-1.5 border border-emerald-500/20 text-center"><div className="text-xs sm:text-base font-bold text-emerald-300"><CountUp end={12} /></div><div className="text-white/40 text-[7px] sm:text-[9px]">Mes equilibrio</div></div></SlideIn>
                <SlideIn delay={0.35}><div className="bg-blue-500/10 rounded-lg p-1 sm:p-1.5 border border-blue-500/20 text-center"><div className="text-xs sm:text-base font-bold text-blue-300"><CountUp end={414} suffix="M" prefix="$" /></div><div className="text-white/40 text-[7px] sm:text-[9px]">Acum. mes 36</div></div></SlideIn>
                <SlideIn delay={0.4}><div className="bg-amber-500/10 rounded-lg p-1 sm:p-1.5 border border-amber-500/20 text-center"><div className="text-xs sm:text-base font-bold text-amber-300"><CountUp end={90} suffix="x" /></div><div className="text-white/40 text-[7px] sm:text-[9px]">Crec. ingresos</div></div></SlideIn>
                <SlideIn delay={0.45}><div className="bg-white/10 rounded-lg p-1 sm:p-1.5 border border-white/10 text-center"><div className="text-[10px] sm:text-sm font-bold text-white/80">Freemium+B2B</div><div className="text-white/40 text-[7px] sm:text-[9px]">Modelo mixto</div></div></SlideIn>
              </div>

              {/* ── 4 Conceptos financieros clave (siempre visibles) ── */}
              <SlideIn delay={0.5}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 max-w-5xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 border border-white/10">
                    <div className="text-white/90 font-bold text-[8px] sm:text-[10px] mb-0.5"><DollarSign className="w-2.5 h-2.5 inline mr-0.5" /> Liquidez</div>
                    <p className="text-white/50 text-[7px] sm:text-[9px] leading-tight">Flujo neto mensual. En desarrollo negativo (-$8.34M/mes). Desde mes 12 se vuelve positivo.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 border border-white/10">
                    <div className="text-white/90 font-bold text-[8px] sm:text-[10px] mb-0.5"><Shield className="w-2.5 h-2.5 inline mr-0.5" /> Solvencia</div>
                    <p className="text-white/50 text-[7px] sm:text-[9px] leading-tight">Mes 12: ingresos $8.28M &gt; costos $6.33M + cuota $1.66M = punto equilibrio operacional.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 border border-white/10">
                    <div className="text-white/90 font-bold text-[8px] sm:text-[10px] mb-0.5"><TrendingDown className="w-2.5 h-2.5 inline mr-0.5" /> Escudo Fiscal</div>
                    <p className="text-white/50 text-[7px] sm:text-[9px] leading-tight">Intereses $9.78M son gasto deducible. Reducen la base imponible del impuesto 25% (Chile).</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 border border-white/10">
                    <div className="text-white/90 font-bold text-[8px] sm:text-[10px] mb-0.5"><BarChart3 className="w-2.5 h-2.5 inline mr-0.5" /> Costos Fijos vs Variables</div>
                    <p className="text-white/50 text-[7px] sm:text-[9px] leading-tight">Fijos: desarrollo (sueldos, infraestructura base). Variables: escalan con usuarios activos.</p>
                  </div>
                </div>
              </SlideIn>
            </section>}

            {/* ══════════ SLIDE 4 — CONCEPTOS FINANCIEROS (Pregunta 1b) ══════════ */}
            {slide === 4 && <section className="w-full max-w-5xl">
              <div className="flex items-center gap-2 mb-1 justify-center">
                <button onClick={() => setRubricData(rubricAnswers.pregunta1b)} type="button" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity active:scale-95 focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg px-2 py-1" title="Click para respuesta fundamentada">
                  <BookOpen className="w-5 h-5 sm:w-7 sm:h-7 text-indigo-300" />
                  <span className="text-xl sm:text-3xl font-black">Pregunta 1b — Conceptos Financieros Clave</span>
                </button>
              </div>
              <p className="text-white/50 text-[10px] sm:text-sm text-center mb-2">¿Qué conceptos financieros son clave para el cálculo del flujo de caja?</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-5xl mx-auto">
                <SlideIn delay={0.15}>
                  <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-blue-500/20 h-full transition-all duration-200 ease-out hover:bg-blue-500/15">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0"><DollarSign className="w-4 h-4 text-blue-300" /></div>
                      <div>
                        <h3 className="text-white font-bold text-xs sm:text-sm">Liquidez</h3>
                        <span className="text-blue-300/60 text-[8px] sm:text-[9px]">Capacidad de pago a corto plazo</span>
                      </div>
                    </div>
                    <p className="text-white/60 text-[9px] sm:text-[10px] leading-relaxed">La liquidez mide si la empresa puede cumplir sus obligaciones inmediatas. Monitoreamos el <strong className="text-white">flujo neto mensual</strong>: en fase de desarrollo es negativo (-$8.34M/mes) porque no hay ingresos. A partir del <strong className="text-blue-300">mes 12</strong> el flujo se vuelve positivo, garantizando liquidez operacional.</p>
                  </div>
                </SlideIn>
                <SlideIn delay={0.25}>
                  <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-emerald-500/20 h-full transition-all duration-200 ease-out hover:bg-emerald-500/15">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0"><Shield className="w-4 h-4 text-emerald-300" /></div>
                      <div>
                        <h3 className="text-white font-bold text-xs sm:text-sm">Solvencia</h3>
                        <span className="text-emerald-300/60 text-[8px] sm:text-[9px]">Capacidad de pago total</span>
                      </div>
                    </div>
                    <p className="text-white/60 text-[9px] sm:text-[10px] leading-relaxed">La solvencia evalúa si la empresa puede cumplir <strong className="text-white">todas</strong> sus obligaciones. El <strong className="text-emerald-300">punto de equilibrio en mes 12</strong> demuestra solvencia: los ingresos de $8.28M superan los costos operativos ($6.33M) más la cuota del préstamo ($1.66M).</p>
                  </div>
                </SlideIn>
                <SlideIn delay={0.35}>
                  <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-amber-500/20 h-full transition-all duration-200 ease-out hover:bg-amber-500/15">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0"><TrendingDown className="w-4 h-4 text-amber-300" /></div>
                      <div>
                        <h3 className="text-white font-bold text-xs sm:text-sm">Escudo Fiscal</h3>
                        <span className="text-amber-300/60 text-[8px] sm:text-[9px]">Beneficio tributario por intereses</span>
                      </div>
                    </div>
                    <p className="text-white/60 text-[9px] sm:text-[10px] leading-relaxed">Los <strong className="text-white">intereses del préstamo ($9.78M)</strong> son un gasto deducible de impuestos. Reducen la base imponible del <strong className="text-amber-300">25% de impuesto</strong> (Chile). <strong className="text-emerald-300">Ahorro estimado: ~$2.4M</strong> en 36 meses. El escudo fiscal mejora el flujo de caja neto del proyecto.</p>
                  </div>
                </SlideIn>
                <SlideIn delay={0.45}>
                  <div className="bg-gradient-to-br from-rose-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-rose-500/20 h-full transition-all duration-200 ease-out hover:bg-rose-500/15">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center flex-shrink-0"><BarChart3 className="w-4 h-4 text-rose-300" /></div>
                      <div>
                        <h3 className="text-white font-bold text-xs sm:text-sm">Costos Fijos vs Variables</h3>
                        <span className="text-rose-300/60 text-[8px] sm:text-[9px]">Estructura de gastos del proyecto</span>
                      </div>
                    </div>
                    <p className="text-white/60 text-[9px] sm:text-[10px] leading-relaxed"><strong className="text-white">Costos fijos:</strong> desarrollo (sueldos $7.76M/mes, infraestructura $580K/mes) — no dependen del uso. <strong className="text-white">Costos variables:</strong> en operación, infraestructura escala con usuarios ($1.09M/mes). Esta separación permite proyectar con precisión el flujo de caja.</p>
                  </div>
                </SlideIn>
              </div>

              <SlideIn delay={0.55}>
                <div className="max-w-2xl mx-auto bg-emerald-500/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-emerald-500/20 mt-2">
                  <p className="text-white/70 text-[9px] sm:text-xs text-center leading-relaxed"><Lightbulb className="w-3 h-3 inline mr-1" /> <strong className="text-white">Resumen:</strong> Liquidez y solvencia monitorean la salud financiera. El escudo fiscal reduce impuestos. Los costos fijos/variables estructuran el flujo. Los 4 conceptos son clave para calcular y defender el flujo de caja del proyecto.</p>
                </div>
              </SlideIn>
            </section>}

            {/* ══════════ SLIDE 5 — PRÉSTAMO (Pregunta 2) ══════════ */}
            {slide === 5 && <section className="max-w-5xl mx-auto w-full">
              <div className="flex items-center gap-2 mb-1 justify-center">
                <button onClick={() => setRubricData(rubricAnswers.pregunta2)} type="button" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity active:scale-95 focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg px-2 py-1" title="Click para respuesta fundamentada">
                  <DollarSign className="w-5 h-5 sm:w-7 sm:h-7 text-amber-300" />
                  <span className="text-xl sm:text-3xl font-black">Pregunta 2 — Capacidad Financiera + Préstamo</span>
                </button>
              </div>
              <p className="text-white/50 text-[10px] sm:text-sm text-center mb-2">¿Cómo evaluó la capacidad financiera? ¿Cómo calculó el préstamo y qué beneficios trae?</p>

              {/* ── Estructura de capital ── */}
              <div className="grid grid-cols-5 gap-1.5 mb-1.5">
                <SlideIn delay={0.1}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2.5 border border-white/10 text-center h-full">
                    <div className="text-[7px] sm:text-[9px] text-white/40 uppercase"><DollarSign className="w-2.5 h-2.5 inline mr-0.5" /> Préstamo</div>
                    <div className="text-base sm:text-xl font-black text-white"><CountUp end={50000000} duration={2000} prefix="$" /></div>
                    <div className="text-white/30 text-[7px] sm:text-[8px]">89%</div>
                  </div>
                </SlideIn>
                <SlideIn delay={0.15}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2.5 border border-white/10 text-center h-full">
                    <div className="text-[7px] sm:text-[9px] text-white/40 uppercase"><Handshake className="w-2.5 h-2.5 inline mr-0.5" /> Capital</div>
                    <div className="text-base sm:text-xl font-black text-amber-300"><CountUp end={6240000} duration={2000} prefix="$" /></div>
                    <div className="text-white/30 text-[7px] sm:text-[8px]">11%</div>
                  </div>
                </SlideIn>
                <SlideIn delay={0.2}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2.5 border border-white/10 text-center h-full">
                    <div className="text-[7px] sm:text-[9px] text-white/40 uppercase"><Calendar className="w-2.5 h-2.5 inline mr-0.5" /> Cuota fija</div>
                    <div className="text-base sm:text-xl font-black text-blue-300"><CountUp end={1660715} duration={2000} prefix="$" /></div>
                    <div className="text-white/30 text-[7px] sm:text-[8px]">Sist. Francés</div>
                  </div>
                </SlideIn>
                <SlideIn delay={0.25}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2.5 border border-white/10 text-center h-full">
                    <div className="text-[7px] sm:text-[9px] text-white/40 uppercase"><TrendingDown className="w-2.5 h-2.5 inline mr-0.5" /> Intereses</div>
                    <div className="text-base sm:text-xl font-black text-amber-300"><CountUp end={9785763} duration={2500} prefix="$" /></div>
                    <div className="text-white/30 text-[7px] sm:text-[8px]">1% mensual</div>
                  </div>
                </SlideIn>
                <SlideIn delay={0.3}>
                  <div className="bg-emerald-500/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2.5 border border-emerald-500/30 text-center h-full">
                    <div className="text-[7px] sm:text-[9px] text-emerald-300/80 uppercase"><CheckCircle className="w-2.5 h-2.5 inline mr-0.5" /> Total pagado</div>
                    <div className="text-base sm:text-xl font-black text-emerald-300"><CountUp end={59785763} duration={2500} prefix="$" /></div>
                    <div className="text-emerald-300/50 text-[7px] sm:text-[8px]">$50M cap + $9.79M int</div>
                  </div>
                </SlideIn>
              </div>

              {/* ── Sistema Francés + Fórmula + Tabla amortización ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-1.5">
                <SlideIn delay={0.35}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/10 h-full">
                    <p className="text-white/40 text-[8px] mb-1 uppercase tracking-wider"><Scale className="w-2.5 h-2.5 inline mr-0.5 -mt-0.5" /> Sistema Francés — Cuota Constante</p>
                    <p className="text-white/60 text-[8px] sm:text-[10px] font-mono">R = P × [i(1+i)ⁿ] / [(1+i)ⁿ − 1]</p>
                    <p className="text-white/50 text-[7px] sm:text-[9px] font-mono mt-0.5">R = $50M × [0.01(1.01)³⁶] / [(1.01)³⁶ − 1] = <strong className="text-white">$1.660.715</strong></p>
                    <div className="text-white/30 text-[7px] sm:text-[8px] mt-1 border-t border-white/10 pt-1">Interés total: <span className="text-amber-300">$9.785.763</span> | Tasa: <span className="text-white/60">12% anual (1% mensual)</span></div>
                  </div>
                </SlideIn>
                <SlideIn delay={0.4}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-white/10 h-full">
                    <p className="text-white/40 text-[8px] mb-1 uppercase tracking-wider"><BarChart3 className="w-2.5 h-2.5 inline mr-0.5" /> Evolución del Préstamo (S. Francés)</p>
                    <div className="grid grid-cols-5 gap-0.5 text-[7px] sm:text-[8px]">
                      <div className="text-white/30 text-center font-mono">Mes</div>
                      <div className="text-white/30 text-center font-mono">Cuota</div>
                      <div className="text-white/30 text-center font-mono">Interés</div>
                      <div className="text-white/30 text-center font-mono">Amort.</div>
                      <div className="text-white/30 text-center font-mono">Saldo</div>
                      {[{m:1,i:0.50,a:1.16,s:48.84},{m:6,i:0.44,a:1.22,s:42.95},{m:12,i:0.37,a:1.29,s:35.50},{m:24,i:0.19,a:1.47,s:17.57},{m:36,i:0.02,a:1.64,s:0}].map(r => (
                        <div key={r.m} className="contents">
                          <div className="text-white/50 text-center font-mono">M{r.m}</div>
                          <div className="text-white/50 text-center font-mono">$1.66M</div>
                          <div className="text-amber-400/70 text-center font-mono">${r.i}M</div>
                          <div className="text-emerald-400/70 text-center font-mono">${r.a}M</div>
                          <div className="text-white/50 text-center font-mono">{r.s === 0 ? <Check className="w-2.5 h-2.5 inline" /> : `$${r.s}M`}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SlideIn>
              </div>

              {/* ── Detalle completo de inversión ── */}
              <SlideIn delay={0.45}>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-white/10 mb-1.5">
                  <p className="text-white/40 text-[7px] sm:text-[9px] uppercase tracking-wider text-center mb-1"><ClipboardCheck className="w-2.5 h-2.5 inline mr-0.5" /> DETALLE COMPLETO DE INVERSIÓN — Todo el dinero del proyecto</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {/* Columna izquierda: Costos */}
                    <div className="space-y-1">
                      <p className="text-white/30 text-[6px] sm:text-[8px] uppercase tracking-wider border-b border-white/10 pb-0.5"><DollarSign className="w-2.5 h-2.5 inline mr-0.5" /> GASTOS</p>

                      <div className="text-white/70 text-[7px] sm:text-[9px] font-semibold mt-0.5">Desarrollo (6 meses)</div>
                      <div className="text-white/50 text-[6px] sm:text-[8px] space-y-0.5 ml-1">
                        <div className="flex justify-between"><span><User className="w-2.5 h-2.5 inline mr-0.5" /> PO (120h/mes × $18.000/h × 6m)</span><span className="text-white/70">$12.960.000</span></div>
                        <div className="flex justify-between"><span><User className="w-2.5 h-2.5 inline mr-0.5" /> Backend (160h/mes × $14.000/h × 6m)</span><span className="text-white/70">$13.440.000</span></div>
                        <div className="flex justify-between"><span><User className="w-2.5 h-2.5 inline mr-0.5" /> Mobile+Front (160h/mes × $14.000/h × 6m)</span><span className="text-white/70">$13.440.000</span></div>
                        <div className="flex justify-between"><span><User className="w-2.5 h-2.5 inline mr-0.5" /> UX/UI (60h/mes × $12.000/h × 6m)</span><span className="text-white/70">$4.320.000</span></div>
                        <div className="flex justify-between"><span><User className="w-2.5 h-2.5 inline mr-0.5" /> QA (40h/mes × $10.000/h × 6m)</span><span className="text-white/70">$2.400.000</span></div>
                        <div className="flex justify-between text-white/60 border-t border-white/10 pt-0.5"><span>Total HH desarrollo (3.240h)</span><span className="text-white font-bold">$46.560.000</span></div>
                      </div>

                      <div className="text-white/70 text-[7px] sm:text-[9px] font-semibold mt-0.5">Operación (30 meses)</div>
                      <div className="text-white/50 text-[6px] sm:text-[8px] space-y-0.5 ml-1">
                        <div className="flex justify-between"><span><User className="w-2.5 h-2.5 inline mr-0.5" /> PM (80h/mes × $18.000/h × 30m)</span><span className="text-white/70">$43.200.000</span></div>
                        <div className="flex justify-between"><span><User className="w-2.5 h-2.5 inline mr-0.5" /> Full Stack (100h/mes × $14.000/h × 30m)</span><span className="text-white/70">$42.000.000</span></div>
                        <div className="flex justify-between"><span><Users className="w-2.5 h-2.5 inline mr-0.5" /> Soporte (200h/mes × $8.000/h × 30m)</span><span className="text-white/70">$48.000.000</span></div>
                        <div className="flex justify-between"><span><User className="w-2.5 h-2.5 inline mr-0.5" /> CM (80h/mes × $10.000/h × 30m)</span><span className="text-white/70">$24.000.000</span></div>
                        <div className="flex justify-between text-white/60 border-t border-white/10 pt-0.5"><span>Total HH operación (13.800h)</span><span className="text-white font-bold">$157.200.000</span></div>
                      </div>

                      <div className="text-white/70 text-[7px] sm:text-[9px] font-semibold mt-0.5">Infraestructura</div>
                      <div className="text-white/50 text-[6px] sm:text-[8px] space-y-0.5 ml-1">
                        <div className="flex justify-between"><span><Cloud className="w-2.5 h-2.5 inline mr-0.5" /> AWS + licencias (6 meses × $580K)</span><span className="text-white/70">$3.480.000</span></div>
                        <div className="flex justify-between"><span><Cloud className="w-2.5 h-2.5 inline mr-0.5" /> AWS escalado (30 meses × $1.090K)</span><span className="text-white/70">$32.700.000</span></div>
                      </div>

                      <div className="text-white/70 text-[7px] sm:text-[9px] font-semibold mt-0.5">Inversión inicial</div>
                      <div className="text-white/50 text-[6px] sm:text-[8px] space-y-0.5 ml-1">
                        <div className="flex justify-between"><span><Monitor className="w-2.5 h-2.5 inline mr-0.5" /> Equipamiento</span><span className="text-white/70">$3.000.000</span></div>
                        <div className="flex justify-between"><span><ClipboardList className="w-2.5 h-2.5 inline mr-0.5" /> Estudio de factibilidad</span><span className="text-white/70">$1.200.000</span></div>
                        <div className="flex justify-between"><span><Scale className="w-2.5 h-2.5 inline mr-0.5" /> Registro legal + marca</span><span className="text-white/70">$1.000.000</span></div>
                        <div className="flex justify-between"><span><GraduationCap className="w-2.5 h-2.5 inline mr-0.5" /> Capacitación equipo</span><span className="text-white/70">$1.000.000</span></div>
                        <div className="flex justify-between border-t border-white/10 pt-0.5"><span></span><span className="text-white font-bold">$6.200.000</span></div>
                      </div>
                    </div>

                    {/* Columna derecha: Ingresos y resultados */}
                    <div className="space-y-1">
                      <p className="text-white/30 text-[6px] sm:text-[8px] uppercase tracking-wider border-b border-white/10 pb-0.5"><TrendingUp className="w-2.5 h-2.5 inline mr-0.5" /> INGRESOS Y RESULTADOS</p>

                      <div className="text-white/70 text-[7px] sm:text-[9px] font-semibold mt-0.5">Modelo de ingresos (36 meses)</div>
                      <div className="text-white/50 text-[6px] sm:text-[8px] space-y-0.5 ml-1">
                        <div className="flex justify-between"><span><Users className="w-2.5 h-2.5 inline mr-0.5" /> B2C: 10% usuarios Premium × $3.000/mes</span><span className="text-white/70">~$240M total</span></div>
                        <div className="flex justify-between"><span><Hospital className="w-2.5 h-2.5 inline mr-0.5" /> B2B: Clínicas ($100K × 75)</span><span className="text-white/70">$75.000.000</span></div>
                        <div className="flex justify-between"><span><Building2 className="w-2.5 h-2.5 inline mr-0.5" /> B2B: Municipios ($300K × 29)</span><span className="text-white/70">$87.000.000</span></div>
                        <div className="flex justify-between"><span><PawPrint className="w-2.5 h-2.5 inline mr-0.5" /> B2B: Refugios ($60K × 32)</span><span className="text-white/70">$19.200.000</span></div>
                        <div className="flex justify-between text-white/60 border-t border-white/10 pt-0.5"><span><DollarSign className="w-2.5 h-2.5 inline mr-0.5" /> Total ingresos brutos</span><span className="text-emerald-300 font-bold">~$670.000.000</span></div>
                      </div>

                      <div className="text-white/70 text-[7px] sm:text-[9px] font-semibold mt-0.5">Resumen económico</div>
                      <div className="bg-emerald-500/10 rounded-lg p-1.5 border border-emerald-500/20 space-y-0.5 ml-1">
                        <div className="flex justify-between text-[6px] sm:text-[8px]"><span className="text-white/70">Ingresos totales</span><span className="text-emerald-300 font-bold">+$670.000.000</span></div>
                        <div className="flex justify-between text-[6px] sm:text-[8px]"><span className="text-white/70">Total RRHH (17.040h)</span><span className="text-amber-300 font-bold">-$203.760.000</span></div>
                        <div className="flex justify-between text-[6px] sm:text-[8px]"><span className="text-white/70">Infraestructura total</span><span className="text-amber-300 font-bold">-$36.180.000</span></div>
                        <div className="flex justify-between text-[6px] sm:text-[8px]"><span className="text-white/70">Inversión inicial</span><span className="text-amber-300 font-bold">-$6.200.000</span></div>
                        <div className="flex justify-between text-[6px] sm:text-[8px]"><span className="text-white/70">Intereses préstamo</span><span className="text-amber-300 font-bold">-$9.785.763</span></div>
                        <div className="flex justify-between text-[6px] sm:text-[8px] border-t border-emerald-500/20 pt-0.5"><span className="text-white/80 font-semibold">Balance neto 36 meses</span><span className="text-emerald-300 font-bold text-[8px]">+$414.000.000</span></div>
                      </div>

                      <div className="text-white/70 text-[7px] sm:text-[9px] font-semibold mt-0.5">Financiamiento</div>
                      <div className="text-white/50 text-[6px] sm:text-[8px] space-y-0.5 ml-1">
                        <div className="flex justify-between"><span><Landmark className="w-2.5 h-2.5 inline mr-0.5" /> Préstamo bancario (89%)</span><span className="text-white/70">$50.000.000</span></div>
                        <div className="flex justify-between"><span><Handshake className="w-2.5 h-2.5 inline mr-0.5" /> Capital propio (11%)</span><span className="text-amber-300">$6.240.000</span></div>
                        <div className="flex justify-between border-t border-white/10 pt-0.5"><span>Total inversión</span><span className="text-white font-bold">$56.240.000</span></div>
                      </div>

                      <div className="text-white/70 text-[7px] sm:text-[9px] font-semibold mt-0.5">Indicadores de rentabilidad</div>
                      <div className="space-y-0.5 ml-1">
                        <div className="flex justify-between text-[6px] sm:text-[8px]"><span className="text-white/60">VAN</span><span className="text-emerald-300 font-bold">+$305.902.076</span></div>
                        <div className="flex justify-between text-[6px] sm:text-[8px]"><span className="text-white/60">TIR</span><span className="text-emerald-300 font-bold">178.2%</span></div>
                        <div className="flex justify-between text-[6px] sm:text-[8px]"><span className="text-white/60">PRI</span><span className="text-emerald-300 font-bold">20.1 meses</span></div>
                        <div className="flex justify-between text-[6px] sm:text-[8px]"><span className="text-white/60">Punto de equilibrio</span><span className="text-emerald-300 font-bold">Mes 12</span></div>
                      </div>

                      <div className="flex items-center gap-1 bg-emerald-500/20 rounded-lg px-2 py-1 border border-emerald-500/30 mt-1">
                        <TrendingUp className="w-3 h-3 text-emerald-300 flex-shrink-0" />
                        <span className="text-emerald-300 text-[7px] sm:text-[9px] font-bold">Cada $1 invertido → $7.36 de retorno ($414M / $56.24M)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SlideIn>

              {/* ── RESUMEN EXPLÍCITO: Costo, ganancia empresa, ganancia nuestra, banco ── */}
              <SlideIn delay={0.48}>
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-emerald-900/30 via-emerald-800/20 to-emerald-900/30 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-emerald-500/30 mb-1.5">
                  <p className="text-emerald-300/80 text-[7px] sm:text-[9px] uppercase tracking-wider text-center font-bold mb-1"><Coins className="w-3.5 h-3.5 inline mr-0.5" /><Coins className="w-3.5 h-3.5 inline mr-0.5" /><Coins className="w-3.5 h-3.5 inline mr-0.5" /> ¿CUÁNTO DINERO GANAMOS? — Proyecto completo <Coins className="w-3.5 h-3.5 inline mr-0.5" /><Coins className="w-3.5 h-3.5 inline mr-0.5" /><Coins className="w-3.5 h-3.5 inline mr-0.5" /></p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-center">
                    <div className="bg-red-500/10 rounded-lg p-1.5 border border-red-500/20">
                      <div className="text-red-300 font-bold text-[7px] sm:text-[10px]"><Banknote className="w-3.5 h-3.5 inline mr-1" /> Costo del proyecto</div>
                      <div className="text-white font-black text-sm sm:text-lg">$56.240.000</div>
                      <div className="text-white/40 text-[6px] sm:text-[8px]">$50M préstamo + $6.24M capital</div>
                    </div>
                    <div className="bg-blue-500/10 rounded-lg p-1.5 border border-blue-500/20">
                      <div className="text-blue-300 font-bold text-[7px] sm:text-[10px]"><Building2 className="w-2.5 h-2.5 inline mr-0.5" /> La empresa ganó</div>
                      <div className="text-blue-300 font-black text-sm sm:text-lg">+$414.000.000</div>
                      <div className="text-white/40 text-[6px] sm:text-[8px]">Balance neto Patitas Conectadas</div>
                    </div>
                    <div className="bg-emerald-500/10 rounded-lg p-1.5 border border-emerald-500/20">
                      <div className="text-emerald-300 font-bold text-[7px] sm:text-[10px]"><UserCheck className="w-2.5 h-2.5 inline mr-0.5" /> Nosotros ganamos</div>
                      <div className="text-emerald-300 font-black text-sm sm:text-lg">+$407.760.000</div>
                      <div className="text-white/40 text-[6px] sm:text-[8px]">$414M − $6.24M invertido = ganancia neta</div>
                    </div>
                    <div className="bg-amber-500/10 rounded-lg p-1.5 border border-amber-500/20">
                      <div className="text-amber-300 font-bold text-[7px] sm:text-[10px]"><Landmark className="w-2.5 h-2.5 inline mr-0.5" /> El banco ganó</div>
                      <div className="text-amber-300 font-black text-sm sm:text-lg">$9.785.763</div>
                      <div className="text-white/40 text-[6px] sm:text-[8px]">Intereses préstamo (12%, 36 meses)</div>
                    </div>
                  </div>
                  <div className="text-emerald-300/60 text-[7px] sm:text-[9px] text-center mt-1 font-semibold">Invertimos $56.24M → La empresa genera $414M → Nosotros (fundadores) ganamos $407.76M después de recuperar nuestra inversión. El banco gana $9.78M por prestarnos. Todos ganan.</div>
                </div>
              </SlideIn>

              {/* ── 3 razones capacidad financiera ── */}
              <SlideIn delay={0.5}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 max-w-5xl mx-auto mb-1.5">
                  <div className="bg-emerald-500/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2.5 border border-emerald-500/20 text-left">
                    <div className="text-emerald-300 font-bold text-[8px] sm:text-[10px]"><CheckCircle className="w-2.5 h-2.5 inline mr-0.5" /> Razón 1 — Equilibrio temprano</div>
                    <p className="text-white/60 text-[7px] sm:text-[9px] leading-relaxed mt-0.5">Mes 12: ingresos $8.28M &gt; costos op. $6.33M + cuota $1.66M. La empresa paga el préstamo desde el mes 12 con holgura.</p>
                  </div>
                  <div className="bg-blue-500/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2.5 border border-blue-500/20 text-left">
                    <div className="text-blue-300 font-bold text-[8px] sm:text-[10px]"><CheckCircle className="w-2.5 h-2.5 inline mr-0.5" /> Razón 2 — Crecimiento exponencial</div>
                    <p className="text-white/60 text-[7px] sm:text-[9px] leading-relaxed mt-0.5">Ingresos de $560K (mes 7) a $50.52M (mes 36): <strong className="text-white">crecimiento 90x</strong>. El modelo SaaS escala sin costos proporcionales.</p>
                  </div>
                  <div className="bg-amber-500/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2.5 border border-amber-500/20 text-left">
                    <div className="text-amber-300 font-bold text-[8px] sm:text-[10px]"><CheckCircle className="w-2.5 h-2.5 inline mr-0.5" /> Razón 3 — Apalancamiento + Escudo Fiscal</div>
                    <p className="text-white/60 text-[7px] sm:text-[9px] leading-relaxed mt-0.5">89% deuda preserva liquidez sin diluir propiedad. Intereses $9.78M son gasto deducible (Escudo Fiscal: ahorro ~$2.4M en impuestos).</p>
                  </div>
                </div>
              </SlideIn>

              <SlideIn delay={0.6}>
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-xl px-4 sm:px-6 py-1 sm:py-1.5 text-[9px] sm:text-xs font-bold transition-all duration-200 ease-out hover:bg-emerald-500/30 active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-400 mx-auto">
                  <TrendingUp className="w-3.5 h-3.5" /> TIR 178.2% ≫ 12% → Apalancamiento favorable. Pedimos al 12% y nuestro proyecto rinde 178.2%. Beneficio neto por cada $1 prestado.
                </div>
              </SlideIn>

              {/* ── Análisis de Capacidad Financiera ── */}
              <SlideIn delay={0.75}>
                <div className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-900/20 to-purple-900/20 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-indigo-500/20 mb-1.5">
                  <p className="text-indigo-300/80 text-[7px] sm:text-[9px] uppercase tracking-wider text-center font-bold mb-1"><BarChart3 className="w-3 h-3 inline mr-0.5" /> ANÁLISIS DE CAPACIDAD FINANCIERA — ¿Puede la empresa pagar todas sus obligaciones?</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 border border-white/10 text-center">
                      <div className="text-blue-300 font-bold text-[8px] sm:text-[10px]"><Bell className="w-2.5 h-2.5 inline mr-0.5" /> Liquidez (Runway)</div>
                      <div className="text-white font-black text-sm sm:text-lg">6.7 meses</div>
                      <div className="text-white/50 text-[6px] sm:text-[8px]">$56.24M / $8.34M mes</div>
                      <div className="text-emerald-300/80 text-[6px] sm:text-[8px] mt-0.5">✅ Cubre toda fase desarrollo</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 border border-white/10 text-center">
                      <div className="text-amber-300 font-bold text-[8px] sm:text-[10px]"><Shield className="w-2.5 h-2.5 inline mr-0.5" /> Cobertura Intereses</div>
                      <div className="text-white font-black text-sm sm:text-lg">5.6x</div>
                      <div className="text-white/50 text-[6px] sm:text-[8px]">$1.95M EBIT / $0.35M int.</div>
                      <div className="text-emerald-300/80 text-[6px] sm:text-[8px] mt-0.5">✅ Sólida (&gt; 2.5x ref.)</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 border border-white/10 text-center">
                      <div className="text-purple-300 font-bold text-[8px] sm:text-[10px]"><BarChart3 className="w-2.5 h-2.5 inline mr-0.5" /> Apalancamiento</div>
                      <div className="text-white font-black text-sm sm:text-lg">8.0 : 1</div>
                      <div className="text-white/50 text-[6px] sm:text-[8px]">$50M deuda / $6.24M cap.</div>
                      <div className="text-amber-300/80 text-[6px] sm:text-[8px] mt-0.5">⚠️ Alto, TIR 178% &gt; 12%</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 border border-white/10 text-center">
                      <div className="text-emerald-300 font-bold text-[8px] sm:text-[10px]"><CheckCircle className="w-2.5 h-2.5 inline mr-0.5" /> Capacidad Pago Mensual</div>
                      <div className="text-white font-black text-sm sm:text-lg">117%</div>
                      <div className="text-white/50 text-[6px] sm:text-[8px]">$1.95M / $1.66M cuota</div>
                      <div className="text-emerald-300/80 text-[6px] sm:text-[8px] mt-0.5">✅ Holgura desde mes 12</div>
                    </div>
                  </div>
                  <div className="text-white/70 text-[7px] sm:text-[9px] text-center mt-1 font-semibold bg-emerald-500/10 rounded-lg px-2 py-1 border border-emerald-500/20">
                    <CheckCircle className="w-2.5 h-2.5 inline mr-0.5" /> <strong className="text-emerald-300">Conclusión: La empresa SÍ tiene capacidad financiera.</strong> Con 6.7 meses de liquidez cubre todo el desarrollo sin ingresos. La cobertura de intereses de 5.6x (&gt; 2.5x referencia) demuestra que las ganancias operacionales pagan cómodamente la deuda. La capacidad de pago mensual del 117% desde mes 12 confirma holgura. El apalancamiento 8:1 es alto pero está justificado porque TIR 178.2% ≫ 12% — cada $1 prestado rinde más de lo que cuesta.
                  </div>
                </div>
              </SlideIn>
            </section>}

            {/* ══════════ SLIDE 6 — VAN TIR PRI (Pregunta 3) ══════════ */}
            {slide === 6 && <section className="w-full max-w-5xl">
              <div className="flex items-center gap-2 mb-1 justify-center">
                <button onClick={() => setRubricData(rubricAnswers.pregunta3)} type="button" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity active:scale-95 focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg px-2 py-1" title="Click para respuesta fundamentada">
                  <TrendingUp className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-300" />
                  <span className="text-xl sm:text-3xl font-black">Pregunta 3 — VAN, TIR y PRI</span>
                </button>
              </div>
              <p className="text-white/50 text-[10px] sm:text-sm text-center mb-2">¿Cuál fue el procedimiento de cálculo de VAN, TIR y PRI? ¿Qué conclusiones se obtienen?</p>

              {/* ── 3 indicadores principales ── */}
              <SlideIn delay={0.1}>
                <div className="grid grid-cols-3 gap-1.5 max-w-2xl mx-auto mb-1.5">
                  <div className="bg-emerald-500/15 backdrop-blur-sm rounded-lg p-1.5 sm:p-2.5 border border-emerald-500/30 text-center">
                    <div className="text-white/40 text-[7px] sm:text-[9px] uppercase">VAN</div>
                    <div className="text-base sm:text-xl font-black text-emerald-300"><CountUp end={305902076} duration={2500} prefix="$" /></div>
                    <div className="text-emerald-300/80 text-[7px] sm:text-[9px] font-bold">&gt; $0 <CheckCircle className="w-2.5 h-2.5 inline" /> Crea valor</div>
                  </div>
                  <div className="bg-emerald-500/15 backdrop-blur-sm rounded-lg p-1.5 sm:p-2.5 border border-emerald-500/30 text-center">
                    <div className="text-white/40 text-[7px] sm:text-[9px] uppercase">TIR</div>
                    <div className="text-base sm:text-xl font-black text-emerald-300"><CountUp end={1782} duration={2000} decimals={1} suffix="%" /></div>
                    <div className="text-emerald-300/80 text-[7px] sm:text-[9px] font-bold">&gt; 12% <CheckCircle className="w-2.5 h-2.5 inline" /> Alta rentabilidad</div>
                  </div>
                  <div className="bg-emerald-500/15 backdrop-blur-sm rounded-lg p-1.5 sm:p-2.5 border border-emerald-500/30 text-center">
                    <div className="text-white/40 text-[7px] sm:text-[9px] uppercase">PRI</div>
                    <div className="text-base sm:text-xl font-black text-emerald-300"><CountUp end={201} duration={2000} decimals={1} suffix=" meses" /></div>
                    <div className="text-emerald-300/80 text-[7px] sm:text-[9px] font-bold">&lt; 36m <CheckCircle className="w-2.5 h-2.5 inline" /> Recup. rápida</div>
                  </div>
                </div>
              </SlideIn>

              {/* ── Síntesis: Tabla de criterios ── */}
              <SlideIn delay={0.18}>
                <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2.5 border border-white/10 mb-1.5">
                  <p className="text-white/40 text-[7px] sm:text-[9px] uppercase tracking-wider text-center mb-1"><ClipboardList className="w-2.5 h-2.5 inline mr-0.5" /> Síntesis de Viabilidad — Criterios vs Resultados</p>
                  <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-2 gap-y-0.5 text-[8px] sm:text-[10px] items-center max-w-lg mx-auto">
                    <div className="text-white/30 font-medium">Criterio</div>
                    <div className="text-white/30 font-medium text-center">Exigencia</div>
                    <div className="text-white/30 font-medium text-center">Resultado</div>
                    <div className="text-white/30 font-medium text-center">¿Cumple?</div>
                    <div className="text-white/70">VAN &gt; 0</div>
                    <div className="text-white/40 text-center">$0</div>
                    <div className="text-emerald-300 font-bold text-center">$305.9M</div>
                    <div className="text-emerald-300 text-center"><CheckCircle className="w-3 h-3 inline" /></div>
                    <div className="text-white/70">TIR &gt; 12%</div>
                    <div className="text-white/40 text-center">12%</div>
                    <div className="text-emerald-300 font-bold text-center">178.2%</div>
                    <div className="text-emerald-300 text-center"><CheckCircle className="w-3 h-3 inline" /></div>
                    <div className="text-white/70">PRI &lt; 36 meses</div>
                    <div className="text-white/40 text-center">36m</div>
                    <div className="text-emerald-300 font-bold text-center">20.1m</div>
                    <div className="text-emerald-300 text-center"><CheckCircle className="w-3 h-3 inline" /></div>
                    <div className="text-white/70">Flujo positivo desde</div>
                    <div className="text-white/40 text-center">—</div>
                    <div className="text-emerald-300 font-bold text-center">Mes 12</div>
                    <div className="text-emerald-300 text-center"><CheckCircle className="w-3 h-3 inline" /></div>
                  </div>
                </div>
              </SlideIn>

              {/* ── 3 Procedimientos ── */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 max-w-5xl mx-auto mb-1.5">
                <SlideIn delay={0.25}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2.5 border border-white/10 h-full">
                    <div className="flex items-center gap-1 mb-1"><DollarSign className="w-3 h-3 text-blue-300" /><h4 className="text-white font-bold text-[8px] sm:text-[10px]">Procedimiento VAN</h4></div>
                    <div className="text-white/50 text-[7px] sm:text-[9px] leading-relaxed space-y-0.5">
                      <p>1. Tasa descuento: <strong className="text-white/80">12% anual</strong></p>
                      <p>2. Tasa mensual: (1.12)^(1/12)-1 = <strong className="text-white/80">0.949%</strong></p>
                      <p>3. VAN = Σ Flujoₜ/(1.00949)ᵗ − I₀</p>
                      <p>4. Cada flujo se descuenta y se suma</p>
                      <p className="text-emerald-300 font-semibold pt-0.5 border-t border-white/10">→ VAN = +$305.9M &gt; $0</p>
                    </div>
                  </div>
                </SlideIn>
                <SlideIn delay={0.35}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2.5 border border-white/10 h-full">
                    <div className="flex items-center gap-1 mb-1"><TrendingUp className="w-3 h-3 text-emerald-300" /><h4 className="text-white font-bold text-[8px] sm:text-[10px]">Procedimiento TIR</h4></div>
                    <div className="text-white/50 text-[7px] sm:text-[9px] leading-relaxed space-y-0.5">
                      <p>1. Probar tasas hasta VAN = 0</p>
                      <p>2. Al 0.1% mensual: VAN = +$411M</p>
                      <p>3. Al 8.9% mensual: VAN ≈ <strong className="text-white/80">$0</strong></p>
                      <p>4. TIR anual = (1.089)¹²−1</p>
                      <p className="text-emerald-300 font-semibold pt-0.5 border-t border-white/10">→ TIR = 178.2% &gt; 12%</p>
                    </div>
                  </div>
                </SlideIn>
                <SlideIn delay={0.45}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2.5 border border-white/10 h-full">
                    <div className="flex items-center gap-1 mb-1"><Target className="w-3 h-3 text-amber-300" /><h4 className="text-white font-bold text-[8px] sm:text-[10px]">Procedimiento PRI</h4></div>
                    <div className="text-white/50 text-[7px] sm:text-[9px] leading-relaxed space-y-0.5">
                      <p>1. Mes 20: acumulado <strong className="text-red-300/80">-$0.98M</strong></p>
                      <p>2. Mes 21: acumulado <strong className="text-emerald-300/80">+$18.2M</strong></p>
                      <p>3. Interpolación lineal:</p>
                      <p>PRI = 20 + (0.98/18.2)</p>
                      <p className="text-emerald-300 font-semibold pt-0.5 border-t border-white/10">→ PRI = 20.1m &lt; 36m <Check className="w-2.5 h-2.5 inline" /></p>
                    </div>
                  </div>
                </SlideIn>
              </div>

              {/* ── Gran Ecuación ── */}
              <SlideIn delay={0.5}>
                <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 border border-white/10 mb-1.5">
                  <p className="text-white/40 text-[7px] sm:text-[9px] uppercase tracking-wider text-center mb-0.5"><Scale className="w-2 h-2 sm:w-2.5 sm:h-2.5 inline mr-0.5 -mt-0.5" /> Gran Ecuación — Balance a 36 meses</p>
                  <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-x-1 text-[9px] sm:text-xs items-center justify-items-center text-white/70">
                    <span className="text-emerald-300 font-bold">$670M</span>
                    <span className="text-white/40">−</span>
                    <span className="text-amber-300 font-bold">$256M</span>
                    <span className="text-white/40">=</span>
                    <span className="text-emerald-300 font-bold">+$414M</span>
                    <span className="text-white/40 text-[6px] sm:text-[8px]">Ingresos totales</span>
                    <span />
                    <span className="text-white/40 text-[6px] sm:text-[8px]">Costos + interés</span>
                    <span />
                    <span className="text-white/40 text-[6px] sm:text-[8px]">Balance final</span>
                  </div>
                  <div className="text-white/30 text-[7px] text-center border-t border-white/10 pt-0.5 mt-0.5">Inversión: $56.24M = $50M (89%) + $6.24M (11%)</div>
                </div>
              </SlideIn>

              {/* ── Conceptos económicos clave ── */}
              <SlideIn delay={0.6}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 max-w-5xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 sm:p-1.5 border border-white/10 text-center">
                    <div className="text-white/70 font-semibold text-[7px] sm:text-[9px]"><Hourglass className="w-2.5 h-2.5 inline mr-0.5" /> Valor temporal del dinero</div>
                    <p className="text-white/40 text-[6px] sm:text-[8px] leading-tight">$1 hoy &gt; $1 mañana. Descontamos flujos futuros a valor presente.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 sm:p-1.5 border border-white/10 text-center">
                    <div className="text-white/70 font-semibold text-[7px] sm:text-[9px]"><Target className="w-2.5 h-2.5 inline mr-0.5" /> Tasa descuento / C. Oportunidad</div>
                    <p className="text-white/40 text-[6px] sm:text-[8px] leading-tight">12% anual = lo que exigimos por invertir aquí vs otra alternativa.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 sm:p-1.5 border border-white/10 text-center">
                    <div className="text-white/70 font-semibold text-[7px] sm:text-[9px]"><BarChart3 className="w-2.5 h-2.5 inline mr-0.5" /> Flujo Caja Descontado (DCF)</div>
                    <p className="text-white/40 text-[6px] sm:text-[8px] leading-tight">Cada flujo se divide por (1+r)^t para traerlo al presente.</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 sm:p-1.5 border border-white/10 text-center">
                    <div className="text-white/70 font-semibold text-[7px] sm:text-[9px]"><RefreshCw className="w-2.5 h-2.5 inline mr-0.5" /> Interés compuesto</div>
                    <p className="text-white/40 text-[6px] sm:text-[8px] leading-tight">TIR 8.9% mensual → (1.089)^12−1 = 178.2% anual.</p>
                  </div>
                </div>
              </SlideIn>

              {/* ── Indicadores de la Industria ── */}
              <SlideIn delay={0.7}>
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-amber-900/20 to-orange-900/20 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-amber-500/20 mb-1.5">
                  <p className="text-amber-300/80 text-[7px] sm:text-[9px] uppercase tracking-wider text-center font-bold mb-1"><BarChart3 className="w-3 h-3 inline mr-0.5" /> INDICADORES DE LA INDUSTRIA — Benchmark SaaS vs Patitas Conectadas</p>
                  <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-2 gap-y-0.5 text-[7px] sm:text-[9px] items-center max-w-lg mx-auto">
                    <div className="text-white/30 font-medium text-left">Indicador</div>
                    <div className="text-white/30 font-medium text-center">Industria SaaS</div>
                    <div className="text-white/30 font-medium text-center">Patitas</div>
                    <div className="text-white/30 font-medium text-center">Brecha</div>
                    <div className="text-white/70 text-left">TIR</div>
                    <div className="text-white/40 text-center">25-40% anual</div>
                    <div className="text-emerald-300 font-bold text-center">178.2%</div>
                    <div className="text-emerald-300 text-center">↑ 4.5x</div>
                    <div className="text-white/70 text-left">VAN</div>
                    <div className="text-white/40 text-center">&gt; $0 mínimo</div>
                    <div className="text-emerald-300 font-bold text-center">+$305.9M</div>
                    <div className="text-emerald-300 text-center">Excelente</div>
                    <div className="text-white/70 text-left">PRI (Payback)</div>
                    <div className="text-white/40 text-center">24-36 meses</div>
                    <div className="text-emerald-300 font-bold text-center">20.1 meses</div>
                    <div className="text-emerald-300 text-center">↑ Récord</div>
                    <div className="text-white/70 text-left">Conv. Premium</div>
                    <div className="text-white/40 text-center">15-20%</div>
                    <div className="text-amber-300 font-bold text-center">10%</div>
                    <div className="text-emerald-300 text-center">↓ Conservador</div>
                    <div className="text-white/70 text-left">Margen Neto</div>
                    <div className="text-white/40 text-center">10-20%</div>
                    <div className="text-emerald-300 font-bold text-center">61.8%</div>
                    <div className="text-emerald-300 text-center">↑ 3x</div>
                  </div>
                  <p className="text-white/30 text-[6px] sm:text-[8px] text-center mt-0.5 italic">Fuentes: OpenView 2024, SaaS Capital 2024, startups tecnológicas chilenas</p>
                  <div className="text-white/70 text-[7px] sm:text-[9px] text-center mt-1 font-semibold bg-emerald-500/10 rounded-lg px-2 py-1 border border-emerald-500/20">
                    <CheckCircle className="w-2.5 h-2.5 inline mr-0.5" /> <strong className="text-emerald-300">Patitas Conectadas supera todos los benchmarks SaaS.</strong> TIR 178.2% (&gt;&gt; 25-40%), PRI 20.1 meses (&lt; 24m industria), margen 61.8% (&gt;&gt; 10-20%). Incluso la tasa de conversión conservadora del 10% refuerza que las proyecciones son realistas y defendibles.
                  </div>
                </div>
              </SlideIn>
            </section>}

            {/* ══════════ SLIDE 7 — COMPARATIVA ══════════ */}
            {slide === 7 && <section>
              <SlideIn delay={0}>
                <div className="flex items-center gap-3 mb-2 justify-center">
                  <ClipboardList className="w-6 h-6 sm:w-8 sm:h-8 text-amber-300" />
                  <h2 className="text-xl sm:text-3xl font-black text-white">Comparativa de Opciones</h2>
                </div>
                <p className="text-white/50 text-xs sm:text-sm text-center mb-3">Justificación de la Opción 1 (MVP) vs Opción 2 (Desarrollo Full)</p>
              </SlideIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
                <SlideIn delay={0.2}><article className="bg-emerald-500/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border-2 border-emerald-500/40 h-full transition-all duration-200 ease-out hover:bg-emerald-500/20"><div className="flex items-center gap-2 mb-3 sm:mb-4"><div className="w-8 h-8 rounded-full bg-emerald-500/30 flex items-center justify-center"><CheckCircle className="w-4 h-4 text-emerald-300" /></div><h3 className="text-lg sm:text-xl font-bold text-white">Opción 1 — <span className="text-emerald-300">MVP</span></h3></div><dl className="space-y-2 text-xs sm:text-sm"><div className="flex justify-between text-white/70"><dt>Período</dt><dd className="text-white font-semibold">36 meses</dd></div><div className="flex justify-between text-white/70"><dt>Inversión total</dt><dd className="text-white font-semibold">-$56.24M</dd></div><div className="flex justify-between text-white/70"><dt>VAN</dt><dd className="text-emerald-300 font-semibold">+$305.9M</dd></div><div className="flex justify-between text-white/70"><dt>TIR</dt><dd className="text-emerald-300 font-semibold">178.2%</dd></div><div className="flex justify-between text-white/70"><dt>PRI</dt><dd className="text-emerald-300 font-semibold">20.1 meses</dd></div><div className="flex justify-between text-white/70"><dt>Equilibrio</dt><dd className="text-emerald-300 font-semibold">Mes 12</dd></div></dl><div className="mt-3 sm:mt-4 pt-3 border-t border-emerald-500/20 text-center"><span className="text-emerald-300 font-bold text-sm"><CheckCircle className="w-3 h-3 inline mr-1" /> RECOMENDADA</span></div></article></SlideIn>
                <SlideIn delay={0.35}><article className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border-2 border-red-500/30 h-full transition-all duration-200 ease-out hover:bg-red-500/20"><div className="flex items-center gap-2 mb-3 sm:mb-4"><div className="w-8 h-8 rounded-full bg-red-500/30 flex items-center justify-center"><X className="w-4 h-4 text-red-300" /></div><h3 className="text-lg sm:text-xl font-bold text-white">Opción 2 — <span className="text-red-300">Full</span></h3></div><dl className="space-y-2 text-xs sm:text-sm"><div className="flex justify-between text-white/70"><dt>Período</dt><dd className="text-white font-semibold">48+ meses</dd></div><div className="flex justify-between text-white/70"><dt>Inversión total</dt><dd className="text-white font-semibold">-$120M+</dd></div><div className="flex justify-between text-white/70"><dt>VAN</dt><dd className="text-red-300 font-semibold">Negativo</dd></div><div className="flex justify-between text-white/70"><dt>TIR</dt><dd className="text-red-300 font-semibold">&lt; 12%</dd></div><div className="flex justify-between text-white/70"><dt>PRI</dt><dd className="text-red-300 font-semibold">&gt; 36 meses</dd></div><div className="flex justify-between text-white/70"><dt>Equilibrio</dt><dd className="text-red-300 font-semibold">No alcanza</dd></div></dl><div className="mt-3 sm:mt-4 pt-3 border-t border-red-500/20 text-center"><span className="text-red-300 font-bold text-sm"><X className="w-3 h-3 inline mr-1" /> DESCARTADA</span></div></article></SlideIn>
              </div>
              <SlideIn delay={0.5}>
                <div className="mt-3 sm:mt-4 max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-white/10">
                  <p className="text-white/70 text-[9px] sm:text-xs leading-relaxed">La Opción 2 requiere más de $120M de inversión, tiene VAN negativo (no crea valor), TIR inferior al 12% y no recupera la inversión dentro del horizonte de 36 meses. <strong className="text-white">Se descarta por inviable financieramente.</strong></p>
                  <p className="text-white/50 text-[8px] sm:text-[10px] mt-1">Ventajas del MVP: menor riesgo financiero, validación temprana con mercado, flujo de caja positivo desde mes 12, y TIR 178.2% que maximiza el retorno sobre la inversión.</p>
                </div>
              </SlideIn>
            </section>}

            {/* ══════════ SLIDE 8 — REFLEXIÓN (Pregunta 4) ══════════ */}
            {slide === 8 && <section className="max-w-4xl mx-auto w-full">
              <div className="flex items-center gap-2 mb-1 justify-center">
                  <button onClick={() => setRubricData(rubricAnswers.pregunta4)} type="button" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity active:scale-95 focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg px-2 py-1" title="Click para respuesta fundamentada">
                  <Lightbulb className="w-5 h-5 sm:w-7 sm:h-7 text-teal-300" />
                  <span className="text-xl sm:text-3xl font-black">Reflexión Individual — Mi Aporte</span>
                </button>
              </div>
              <p className="text-white/50 text-[10px] sm:text-sm text-center mb-2">¿Cuál fue mi aporte individual? ¿Fortalezas, dificultades y lecciones aprendidas?</p>

              {/* ── Mi aporte específico ── */}
              <SlideIn delay={0.15}>
                <div className="max-w-3xl mx-auto bg-indigo-500/10 backdrop-blur-sm rounded-2xl p-3 sm:p-5 border border-indigo-500/20 mb-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-300" />
                    <span className="text-amber-300 font-bold text-[10px] sm:text-xs uppercase tracking-wider">Mi Aporte Específico</span>
                  </div>
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                    Lideré el <strong className="text-white">modelamiento financiero completo</strong> del proyecto Patitas Conectadas: diseñé la estructura del flujo de caja mensual con sus dos fases (desarrollo y operación), calculé la tabla de amortización del préstamo bajo <strong className="text-white">Sistema Francés</strong>, y ejecuté los cálculos de <strong className="text-white">VAN, TIR y PRI</strong> para determinar la viabilidad económica. También definí la estructura de inversión ($50M préstamo + $6.24M capital propio) y proyecté los ingresos del modelo Freemium + B2B.
                  </p>
                </div>
              </SlideIn>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-3xl mx-auto">
                <SlideIn delay={0.25}>
                  <article className="bg-emerald-500/10 backdrop-blur-sm rounded-xl p-2 sm:p-3.5 border border-emerald-500/20 text-left h-full transition-all duration-200 ease-out hover:bg-emerald-500/20">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center mb-1.5"><TrendingUp className="w-3.5 h-3.5 text-emerald-300" /></div>
                    <div className="text-emerald-300 font-bold text-[9px] sm:text-xs mb-0.5">Fortalezas</div>
                    <ul className="text-white/60 text-[8px] sm:text-[10px] leading-relaxed space-y-0.5 list-disc list-inside">
                      <li>Capacidad analítica para modelar variables financieras</li>
                      <li>Rigor metodológico en cada cálculo</li>
                      <li>Traducción de requerimientos de software a KPIs financieros</li>
                    </ul>
                  </article>
                </SlideIn>
                <SlideIn delay={0.4}>
                  <article className="bg-amber-500/10 backdrop-blur-sm rounded-xl p-2 sm:p-3.5 border border-amber-500/20 text-left h-full transition-all duration-200 ease-out hover:bg-amber-500/20">
                    <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center mb-1.5"><Target className="w-3.5 h-3.5 text-amber-300" /></div>
                    <div className="text-amber-300 font-bold text-[9px] sm:text-xs mb-0.5">Dificultades</div>
                    <ul className="text-white/60 text-[8px] sm:text-[10px] leading-relaxed space-y-0.5 list-disc list-inside">
                      <li>Sobreestimación inicial de ingresos (tasa conversión irreal)</li>
                      <li>Superada investigando startups similares en Chile</li>
                      <li>Ajuste a tasa de conversión realista del 10%</li>
                    </ul>
                  </article>
                </SlideIn>
                <SlideIn delay={0.55}>
                  <article className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-2 sm:p-3.5 border border-blue-500/20 text-left h-full transition-all duration-200 ease-out hover:bg-blue-500/20">
                    <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center mb-1.5"><BookOpen className="w-3.5 h-3.5 text-blue-300" /></div>
                    <div className="text-blue-300 font-bold text-[9px] sm:text-xs mb-0.5">Lecciones Aprendidas</div>
                    <ul className="text-white/60 text-[8px] sm:text-[10px] leading-relaxed space-y-0.5 list-disc list-inside">
                      <li>Viabilidad técnica sin flujo de caja saludable = inviable</li>
                      <li>Cada cifra debe cuadrar al centavo</li>
                      <li>Defensa técnica + financiera ante un inversionista</li>
                    </ul>
                  </article>
                </SlideIn>
              </div>

              <SlideIn delay={0.65}>
                <blockquote className="max-w-2xl mx-auto mt-2 sm:mt-3 text-center px-4">
                  <p className="text-white/80 text-xs sm:text-sm italic leading-relaxed">"La viabilidad técnica de un software <span className="text-orange-200 font-semibold">es inútil</span> si no tiene un flujo de caja saludable. Hoy puedo defender un proyecto tanto técnica como financieramente ante un directorio o inversionista."</p>
                </blockquote>
              </SlideIn>
            </section>}

            {/* ══════════ SLIDE 9 — VIABILIDAD Y ÉXITO ══════════ */}
            {slide === 9 && <section className="w-full max-w-5xl">
              <SlideIn delay={0}>
                <div className="flex items-center gap-2 mb-1 justify-center">
                  <CheckCircle className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-300" />
                  <h2 className="text-xl sm:text-3xl font-black text-white">Conclusión — El Proyecto es un ÉXITO</h2>
                </div>
                <p className="text-white/50 text-[10px] sm:text-sm text-center mb-2">Afirmación de viabilidad con todos los indicadores positivos</p>
              </SlideIn>

              {/* ── Tabla resumen ── */}
              <SlideIn delay={0.1}>
                <div className="max-w-3xl mx-auto bg-gradient-to-br from-emerald-900/20 to-teal-900/20 backdrop-blur-sm rounded-2xl p-3 sm:p-5 border border-emerald-500/30 mb-2">
                  <p className="text-emerald-300/80 text-[8px] sm:text-[10px] uppercase tracking-wider text-center font-bold mb-2"><BarChart3 className="w-2.5 h-2.5 inline mr-0.5" /> TABLA RESUMEN — PROYECTO PATITAS CONECTADAS</p>
                  <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-[9px] sm:text-sm max-w-lg mx-auto">
                    <span className="text-white/50">Inversión total</span>
                    <span className="text-white font-bold text-right">$56.240.000</span>
                    <span className="text-white/50">Préstamo bancario (89%)</span>
                    <span className="text-white font-bold text-right">$50.000.000</span>
                    <span className="text-white/50">Capital propio (11%)</span>
                    <span className="text-amber-300 font-bold text-right">$6.240.000</span>
                    <span className="text-white/50 border-t border-white/10 pt-1">Ingresos totales 36 meses</span>
                    <span className="text-emerald-300 font-bold text-right border-t border-white/10 pt-1">$670.000.000</span>
                    <span className="text-white/50">Costos operativos totales</span>
                    <span className="text-white font-bold text-right">-$246.000.000</span>
                    <span className="text-white/50">Intereses préstamo</span>
                    <span className="text-amber-300 font-bold text-right">-$9.785.763</span>
                    <span className="text-white/70 border-t border-emerald-500/30 pt-1 font-semibold"><DollarSign className="w-2.5 h-2.5 inline mr-0.5" /> Balance neto (empresa)</span>
                    <span className="text-emerald-300 font-black text-right border-t border-emerald-500/30 pt-1 text-sm sm:text-xl">+$414.000.000</span>
                    <span className="text-white/50 mt-1">VAN (Valor Actual Neto)</span>
                    <span className="text-emerald-300 font-bold text-right mt-1">+$305.902.076 &gt; $0 <CheckCircle className="w-2.5 h-2.5 inline" /></span>
                    <span className="text-white/50">TIR (Tasa Interna de Retorno)</span>
                    <span className="text-emerald-300 font-bold text-right">178.2% &gt;&gt; 12% <CheckCircle className="w-2.5 h-2.5 inline" /></span>
                    <span className="text-white/50">PRI (Período Recuperación)</span>
                    <span className="text-emerald-300 font-bold text-right">20.1 meses &lt; 36m <CheckCircle className="w-2.5 h-2.5 inline" /></span>
                    <span className="text-white/50">Punto de equilibrio</span>
                    <span className="text-emerald-300 font-bold text-right">Mes 12 <CheckCircle className="w-2.5 h-2.5 inline" /></span>
                    <span className="text-white/50 border-t border-white/10 pt-1"><UserCheck className="w-2.5 h-2.5 inline mr-0.5" /> Ganancia nuestra (fundadores)</span>
                    <span className="text-emerald-300 font-bold text-right border-t border-white/10 pt-1">+$407.760.000</span>
                    <span className="text-white/50"><Landmark className="w-2.5 h-2.5 inline mr-0.5" /> Ganancia del banco</span>
                    <span className="text-amber-300 font-bold text-right">$9.785.763</span>
                    <span className="text-white/50">Retorno por $1 invertido</span>
                    <span className="text-emerald-300 font-bold text-right">$7.36</span>
                  </div>
                </div>
              </SlideIn>

              {/* ── Afirmación de viabilidad ── */}
              <SlideIn delay={0.25}>
                <div className="max-w-3xl mx-auto bg-gradient-to-r from-emerald-600/20 via-emerald-500/20 to-emerald-600/20 rounded-xl p-2 sm:p-4 border-2 border-emerald-400/40 text-center">
                  <p className="text-emerald-300 font-black text-sm sm:text-xl uppercase tracking-wider mb-1"><CheckCircle className="w-3.5 h-3.5 inline mr-1" /> PROYECTO VIABLE Y ALTAMENTE RENTABLE</p>
                  <p className="text-white/80 text-[9px] sm:text-sm leading-relaxed">
                    <strong>Todos los criterios de la rúbrica se cumplen y superan las expectativas.</strong> VAN positivo de +$305.9M demuestra que el proyecto crea valor muy por sobre el 12% exigido. TIR de 178.2% indica una rentabilidad excepcional que multiplica por 15 el costo del capital. PRI de 20.1 meses recupera la inversión en poco más de la mitad del horizonte. El balance de +$414M después de pagar absolutamente todos los costos, sueldos, infraestructura, impuestos y el préstamo completo, confirma que <strong className="text-emerald-200">Patitas Conectadas es un proyecto financieramente exitoso</strong>.
                  </p>
                </div>
              </SlideIn>

              {/* ── 3 pilares del éxito ── */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 max-w-3xl mx-auto mt-1.5">
                <SlideIn delay={0.35}>
                  <div className="bg-emerald-500/10 rounded-lg p-2 sm:p-3 border border-emerald-500/20 text-center h-full">
                    <div className="text-emerald-300 font-bold text-[10px] sm:text-sm"><TrendingUp className="w-2.5 h-2.5 inline mr-0.5" /> Rentabilidad</div>
                    <p className="text-white/60 text-[8px] sm:text-[10px] mt-0.5">TIR 178.2% &gt;&gt; 12%. Cada $1 invertido retorna $7.36. VAN +$306M. Proyecto altamente rentable.</p>
                  </div>
                </SlideIn>
                <SlideIn delay={0.45}>
                  <div className="bg-blue-500/10 rounded-lg p-2 sm:p-3 border border-blue-500/20 text-center h-full">
                    <div className="text-blue-300 font-bold text-[10px] sm:text-sm"><Shield className="w-2.5 h-2.5 inline mr-0.5" /> Sostenibilidad</div>
                    <p className="text-white/60 text-[8px] sm:text-[10px] mt-0.5">Equilibrio en mes 12. PRI 20.1 meses. El modelo de negocio SaaS genera flujo positivo y sostenible.</p>
                  </div>
                </SlideIn>
                <SlideIn delay={0.55}>
                  <div className="bg-amber-500/10 rounded-lg p-2 sm:p-3 border border-amber-500/20 text-center h-full">
                    <div className="text-amber-300 font-bold text-[10px] sm:text-sm"><Handshake className="w-2.5 h-2.5 inline mr-0.5" /> Viabilidad real</div>
                    <p className="text-white/60 text-[8px] sm:text-[10px] mt-0.5">89% financiado con deuda. Escudo fiscal ~$2.4M. Apalancamiento favorable. Todos ganan: empresa, fundadores, banco.</p>
                  </div>
                </SlideIn>
              </div>

              <SlideIn delay={0.65}>
                <p className="text-white/40 text-[7px] sm:text-[10px] text-center mt-1 italic">"Patitas Conectadas demuestra que un proyecto de software bien planificado no solo es técnicamente viable, sino financieramente exitoso."</p>
              </SlideIn>
            </section>}

            {/* ══════════ SLIDE 10 — GRACIAS ══════════ */}
            {slide === 10 && <section className="text-center">
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
