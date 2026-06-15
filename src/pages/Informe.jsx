import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, DollarSign, TrendingUp, Target, CheckCircle, BarChart3, PiggyBank, BookOpen, Shield, X, Lightbulb, ClipboardList, Search } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

const sections = [
  { id: 'indicador1', label: 'Indicador 1 — Opciones de Desarrollo', icon: ClipboardList },
  { id: 'indicador2', label: 'Indicador 2 — Técnicas de Análisis', icon: Search },
  { id: 'indicador3', label: 'Indicador 3 — Documentación Final', icon: FileText },
]

function formatCLP(n) {
  return '$' + n.toLocaleString('es-CL')
}

const cashFlowData = [
  { mes: 1, ingresos: 0, egresos: 8340000, flujo: -8340000, acumulado: -8340000, tipo: 'Desarrollo' },
  { mes: 2, ingresos: 0, egresos: 8340000, flujo: -8340000, acumulado: -16680000, tipo: 'Desarrollo' },
  { mes: 3, ingresos: 0, egresos: 8340000, flujo: -8340000, acumulado: -25020000, tipo: 'Desarrollo' },
  { mes: 4, ingresos: 0, egresos: 8340000, flujo: -8340000, acumulado: -33360000, tipo: 'Desarrollo' },
  { mes: 5, ingresos: 0, egresos: 8340000, flujo: -8340000, acumulado: -41700000, tipo: 'Desarrollo' },
  { mes: 6, ingresos: 0, egresos: 8340000, flujo: -8340000, acumulado: -50040000, tipo: 'Desarrollo' },
  { mes: 7, ingresos: 560000, egresos: 6330000, flujo: -5770000, acumulado: -55810000, tipo: 'Operación' },
  { mes: 8, ingresos: 1190000, egresos: 6330000, flujo: -5140000, acumulado: -60950000, tipo: 'Operación' },
  { mes: 9, ingresos: 2030000, egresos: 6330000, flujo: -4300000, acumulado: -65250000, tipo: 'Operación' },
  { mes: 10, ingresos: 3180000, egresos: 6330000, flujo: -3150000, acumulado: -68400000, tipo: 'Operación' },
  { mes: 11, ingresos: 4750000, egresos: 6330000, flujo: -1580000, acumulado: -69980000, tipo: 'Operación' },
  { mes: 12, ingresos: 6880000, egresos: 6330000, flujo: 550000, acumulado: -69430000, tipo: 'Operación' },
  { mes: 18, ingresos: 10400000, egresos: 6330000, flujo: 4070000, acumulado: -46930000, tipo: 'Operación' },
  { mes: 24, ingresos: 15600000, egresos: 6330000, flujo: 9270000, acumulado: -18310000, tipo: 'Operación' },
  { mes: 30, ingresos: 25000000, egresos: 6330000, flujo: 18670000, acumulado: 31900000, tipo: 'Operación' },
  { mes: 36, ingresos: 50520000, egresos: 6330000, flujo: 44190000, acumulado: 414163379, tipo: 'Operación' },
]

export default function Informe() {
  const [activeSection, setActiveSection] = useState('indicador1')

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white mb-2">Informe Ejecutivo de Cierre</h1>
            <p className="text-slate-400 dark:text-slate-500">Patitas Conectadas — GPY1101 — Evaluación Parcial N°4</p>
            <p className="text-slate-300 dark:text-slate-600 text-sm mt-1">Informe grupal · Formato PDF · Máx. 6 planas · APA · 30% de la evaluación</p>
          </div>
        </ScrollReveal>

        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-8">
          <nav className="hidden lg:block sticky top-24 self-start">
            <div className="space-y-1">
              {sections.map(s => {
                const Icon = s.icon
                const isActive = activeSection === s.id
                return (
                  <a key={s.id} href={`#${s.id}`} onClick={(e) => { e.preventDefault(); setActiveSection(s.id); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }) }}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ease-out active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-400 ${isActive ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    <Icon className="w-4 h-4" />
                    {s.label}
                  </a>
                )
              })}
            </div>
            <div className="mt-6 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
              <p className="text-amber-700 dark:text-amber-300 text-xs font-semibold flex items-center gap-1"><FileText className="w-3 h-3" /> Formato Informe</p>
              <ul className="text-amber-600 dark:text-amber-400 text-[10px] mt-1 space-y-0.5 list-disc list-inside">
                <li>PDF, Arial/Times New Roman 12</li>
                <li>Interlineado 1.5, márgenes 2.5cm</li>
                <li>Máx. 6 planas</li>
                <li>Citas y referencias APA</li>
              </ul>
            </div>
          </nav>

          <div className="space-y-8">

            {/* ════════════════════════════════════════════ */}
            {/* INDICADOR 1 — Opciones de Desarrollo (10%) */}
            {/* ════════════════════════════════════════════ */}
            <ScrollReveal>
              <section id="indicador1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0"><ClipboardList className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /></div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Indicador 1 (10%) — Opciones de Desarrollo</h2>
                    <p className="text-slate-400 dark:text-slate-500 text-sm">Define las implicancias, proyecciones y expectativas de las opciones de desarrollo</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-1">Opción 1: Desarrollo Incremental Ágil (MVP) — SELECCIONADA</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                      Implicancia: Desarrollo por fases con entregas quincenales. MVP operativo en 6 meses con funcionalidades core (matching IA, geoalertas, red de apoyo).
                      Proyección a 36 meses: Fase 1 (desarrollo, meses 1-6) con inversión de $46.56M en RRHH, seguida de Fase 2 (operación, meses 7-36) con modelo Freemium + B2B.
                      Expectativa: VAN +$305.9M, TIR 178.2%, PRI 20.1 meses. Punto de equilibrio en mes 12. Se espera aumentar tasa de reencuentro del 15% al 60%+.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-1">Opción 2: Desarrollo Full — DESCARTADA</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                      Implicancia: Arquitectura compleja con microservicios, IA avanzada y desarrollo completo antes del lanzamiento. Proyección: 48+ meses sin generar ingresos durante 18+ meses de construcción. Expectativa: VAN negativo, TIR inferior al 12%, no recupera inversión en el horizonte. Se descarta por inviable financieramente.
                    </p>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-xl p-3 border border-indigo-100 dark:border-indigo-800">
                    <p className="text-indigo-600 dark:text-indigo-300 text-sm font-semibold">Alineación con objetivos de la organización:</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">La organización necesita una solución URGENTE para el problema de mascotas perdidas. El MVP entrega valor real en 6 meses, genera ingresos desde el mes 7, y permite validación temprana con usuarios — todo alineado con la necesidad de impacto social rápido y sostenibilidad financiera.</p>
                  </div>
                </div>
              </section>
            </ScrollReveal>

            {/* ════════════════════════════════════════════ */}
            {/* INDICADOR 2 — Técnicas de Análisis (10%) */}
            {/* ════════════════════════════════════════════ */}
            <ScrollReveal>
              <section id="indicador2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0"><Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /></div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Indicador 2 (10%) — Técnicas de Análisis</h2>
                    <p className="text-slate-400 dark:text-slate-500 text-sm">Describe las técnicas de análisis utilizadas para la justificación grupal</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-2">1. Análisis de Viabilidad Económica (VAN, TIR, PRI)</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                      Se construyó un flujo de caja mensual a 36 meses dividido en dos fases (desarrollo y operación). Se descontaron los flujos a una tasa del 12% anual (0.949% mensual) para calcular el VAN. La TIR se obtuvo por iteración hasta encontrar la tasa que hace VAN = 0. El PRI se calculó por interpolación lineal del flujo acumulado. Resultado: VAN +$305.9M, TIR 178.2%, PRI 20.1 meses — todos superan las exigencias.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-2">2. Análisis de Factibilidad Técnica y Operativa</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                      Se evaluaron las tecnologías disponibles (React/Vite, Express/Node.js, PostgreSQL) vs. las requeridas (microservicios, IA avanzada). Se dimensionó el equipo necesario en 5 roles para desarrollo y 4 para operación, con costos de RRHH basados en tarifas de mercado para perfiles TI en Chile.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-2">3. Análisis de Capacidad Financiera</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                      Se calcularon 4 indicadores: Liquidez (Runway: 6.7 meses = $56.24M / $8.34M mensuales), Cobertura de Intereses (5.6x = $1.95M EBIT / $0.35M intereses), Capacidad de Pago (117% = $1.95M / $1.66M cuota), y Apalancamiento (8:1 = $50M deuda / $6.24M capital). Todos los indicadores confirman capacidad de pago.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-2">4. Benchmark Industria SaaS</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                      Se compararon los indicadores del proyecto con benchmarks de la industria SaaS (fuentes: OpenView 2024, SaaS Capital 2024). TIR 178.2% vs 25-40% industria (4.5x superior), PRI 20.1m vs 24-36m, Margen Neto 61.8% vs 10-20% (3x superior). Esto demuestra que el proyecto supera ampliamente los estándares de la industria.
                    </p>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl p-3 border border-emerald-100 dark:border-emerald-800">
                    <p className="text-emerald-600 dark:text-emerald-300 text-sm font-semibold">Justificación grupal:</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">La Opción 1 (MVP) fue seleccionada por unanimidad al demostrar viabilidad en todas las dimensiones: económica (VAN positivo, TIR superior, PRI menor al horizonte), técnica (tecnologías probadas, equipo factible) y operativa (modelo Freemium + B2B sostenible). La Opción 2 fue descartada por inviable financieramente (VAN negativo, TIR inferior al costo de capital).</p>
                  </div>
                </div>
              </section>
            </ScrollReveal>

            {/* ════════════════════════════════════════════ */}
            {/* INDICADOR 3 — Documentación Final (10%) */}
            {/* ════════════════════════════════════════════ */}
            <ScrollReveal>
              <section id="indicador3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0"><FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" /></div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Indicador 3 (10%) — Documentación Final</h2>
                    <p className="text-slate-400 dark:text-slate-500 text-sm">Presenta la documentación final comunicando persuasivamente los resultados</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-800">
                      <p className="text-blue-600 dark:text-blue-300 font-bold text-sm mb-2">Resumen de Inversión</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Préstamo bancario (89%)</span><span className="font-semibold text-slate-700 dark:text-slate-300">$50.000.000</span></div>
                        <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Capital propio (11%)</span><span className="font-semibold text-amber-600 dark:text-amber-400">$6.240.000</span></div>
                        <div className="flex justify-between border-t border-blue-100 dark:border-blue-800 pt-1"><span className="font-semibold text-slate-600 dark:text-slate-300">Total inversión</span><span className="font-bold text-blue-600 dark:text-blue-400">$56.240.000</span></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 rounded-xl p-4 border border-emerald-100 dark:border-emerald-800">
                      <p className="text-emerald-600 dark:text-emerald-300 font-bold text-sm mb-2">Resultados Clave</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">VAN</span><span className="font-bold text-emerald-600 dark:text-emerald-400">+$305.902.076</span></div>
                        <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">TIR</span><span className="font-bold text-emerald-600 dark:text-emerald-400">178.2%</span></div>
                        <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">PRI</span><span className="font-bold text-emerald-600 dark:text-emerald-400">20.1 meses</span></div>
                        <div className="flex justify-between border-t border-emerald-100 dark:border-emerald-800 pt-1"><span className="font-semibold text-slate-600 dark:text-slate-300">Balance neto 36m</span><span className="font-bold text-emerald-600 dark:text-emerald-400">+$414.000.000</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                    <p className="text-slate-600 dark:text-slate-300 font-bold text-sm mb-2">Flujo de Caja — Mensual (Resumen)</p>
                    <div className="overflow-x-auto text-sm">
                      <table className="w-full">
                        <thead>
                          <tr className="text-slate-400 dark:text-slate-500 text-xs border-b border-slate-200 dark:border-slate-700">
                            <th className="text-left py-1 pr-2">Mes</th>
                            <th className="text-right py-1 px-2">Ingresos</th>
                            <th className="text-right py-1 px-2">Egresos</th>
                            <th className="text-right py-1 px-2">Flujo Neto</th>
                            <th className="text-right py-1 pl-2">Acumulado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cashFlowData.map(r => (
                            <tr key={r.mes} className="border-b border-slate-100 dark:border-slate-700/50">
                              <td className="py-0.5 pr-2 text-slate-500 dark:text-slate-400">{r.mes}</td>
                              <td className={`text-right py-0.5 px-2 ${r.ingresos > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>{r.ingresos === 0 ? '—' : formatCLP(r.ingresos)}</td>
                              <td className="text-right py-0.5 px-2 text-red-500 dark:text-red-400">{formatCLP(r.egresos)}</td>
                              <td className={`text-right py-0.5 px-2 font-medium ${r.flujo > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>{r.flujo > 0 ? '' : ''}{formatCLP(r.flujo)}</td>
                              <td className={`text-right py-0.5 pl-2 font-medium ${r.acumulado > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>{formatCLP(r.acumulado)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      <strong className="text-slate-800 dark:text-white">Conclusión:</strong> El proyecto es <strong className="text-emerald-600 dark:text-emerald-400">VIABLE</strong> y <strong className="text-emerald-600 dark:text-emerald-400">ALTAMENTE RENTABLE</strong>. Todos los indicadores superan las exigencias: VAN &gt; $0, TIR &gt;&gt; 12%, PRI &lt; 36 meses. Se recomienda la <strong>Opción 1: Desarrollo Incremental Ágil (MVP)</strong> por su viabilidad económica, técnica y operativa.
                    </p>
                  </div>

                  <div className="text-center text-slate-400 dark:text-slate-500 text-xs pt-2 border-t border-slate-200 dark:border-slate-700">
                    <p>Documento preparado para la evaluación final — GPY1101 Evaluación de Proyectos de Software — Duoc UC</p>
                    <p className="mt-0.5">Formato APA | Máx. 6 planas | Times New Roman 12 | Interlineado 1.5</p>
                  </div>
                </div>
              </section>
            </ScrollReveal>

          </div>
        </div>
      </div>
    </div>
  )
}
