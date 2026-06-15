import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, DollarSign, TrendingUp, Target, CheckCircle, BarChart3, PiggyBank, BookOpen, Shield, X } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

const sections = [
  { id: 'resumen', label: 'Resumen Ejecutivo', icon: FileText },
  { id: 'flujo', label: 'Flujo de Caja', icon: BarChart3 },
  { id: 'prestamo', label: 'Préstamo', icon: DollarSign },
  { id: 'indicadores', label: 'VAN, TIR, PRI', icon: TrendingUp },
  { id: 'comparativa', label: 'Comparativa', icon: Shield },
  { id: 'conclusion', label: 'Conclusión', icon: CheckCircle },
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

const amortizationData = [
  { mes: 1, cuota: 1660715, interes: 500000, amortizacion: 1160715, saldo: 48839285 },
  { mes: 6, cuota: 1660715, interes: 444082, amortizacion: 1216633, saldo: 42947906 },
  { mes: 12, cuota: 1660715, interes: 372155, amortizacion: 1288560, saldo: 35499592 },
  { mes: 18, cuota: 1660715, interes: 285012, amortizacion: 1375703, saldo: 27053589 },
  { mes: 24, cuota: 1660715, interes: 188522, amortizacion: 1472193, saldo: 17567032 },
  { mes: 30, cuota: 1660715, interes: 84508, amortizacion: 1576207, saldo: 7006669 },
  { mes: 36, cuota: 1660715, interes: 16506, amortizacion: 1644209, saldo: 0 },
]

const milestones = [
  { mes: 6, evento: 'Fin desarrollo MVP', icon: Target },
  { mes: 12, evento: 'Punto de equilibrio', icon: PiggyBank },
  { mes: 20, evento: 'Recuperación inversión (PRI)', icon: TrendingUp },
  { mes: 36, evento: 'Flujo acumulado $414M', icon: DollarSign },
]

export default function Informe() {
  const [activeSection, setActiveSection] = useState('resumen')

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white mb-2">Informe de Evaluación Económica</h1>
            <p className="text-slate-400 dark:text-slate-500">Patitas Conectadas — GPY1101</p>
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
                    <Icon className="w-4 h-4" />{s.label}
                  </a>
                )
              })}
            </div>
          </nav>

          <div className="space-y-8 min-w-0">
            {/* RESUMEN EJECUTIVO */}
            <section id="resumen" className="scroll-mt-24">
              <ScrollReveal>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-blue-500" /> Resumen Ejecutivo</h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">Patitas Conectadas es una plataforma centralizada para la recuperación de mascotas perdidas, desarrollada bajo la <strong>Opción 1: Desarrollo Incremental Ágil (MVP)</strong>, con un horizonte de evaluación de <strong>36 meses</strong> (6 meses de desarrollo + 30 meses de operación).</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 text-center border border-blue-100 dark:border-blue-800/30">
                      <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400"><DollarSign className="w-4 h-4 inline" />$305.9M</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">VAN</div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-4 text-center border border-emerald-100 dark:border-emerald-800/30">
                      <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">178.2%</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">TIR</div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 text-center border border-amber-100 dark:border-amber-800/30">
                      <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">20.1 meses</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">PRI</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 text-center border border-purple-100 dark:border-purple-800/30">
                      <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">Mes 12</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Punto equilibrio</div>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">El proyecto demuestra <strong>viabilidad económica</strong> con un VAN positivo de $305.9M, una TIR de 178.2% muy superior a la tasa de descuento del 12%, y un período de recuperación de 20.1 meses, dentro del horizonte de 36 meses. Se recomienda la Opción 1 (MVP) por su menor riesgo y mayor rentabilidad.</p>
                </div>
              </ScrollReveal>
            </section>

            {/* FLUJO DE CAJA */}
            <section id="flujo" className="scroll-mt-24">
              <ScrollReveal>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-blue-500" /> Flujo de Caja</h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">El flujo de caja se estructura en dos fases. Durante el desarrollo (meses 1-6) los egresos son de <strong>$8.340.000/mes</strong> ($7.760.000 RRHH + $580.000 infraestructura) más inversión inicial de $6.200.000. En operación (meses 7-36) los costos bajan a <strong>$6.330.000/mes</strong> y los ingresos crecen desde $560.000 hasta $50.520.000 mensuales.</p>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-slate-600">
                          <th className="text-left py-2.5 px-3 text-slate-500 dark:text-slate-400 font-medium">Mes</th>
                          <th className="text-right py-2.5 px-3 text-slate-500 dark:text-slate-400 font-medium">Ingresos</th>
                          <th className="text-right py-2.5 px-3 text-slate-500 dark:text-slate-400 font-medium">Egresos</th>
                          <th className="text-right py-2.5 px-3 text-slate-500 dark:text-slate-400 font-medium">Flujo Neto</th>
                          <th className="text-right py-2.5 px-3 text-slate-500 dark:text-slate-400 font-medium">Acumulado</th>
                          <th className="text-center py-2.5 px-3 text-slate-500 dark:text-slate-400 font-medium">Fase</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cashFlowData.map((row, i) => (
                          <tr key={i} className={`border-b border-gray-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors ${row.mes === 12 || row.mes === 36 ? 'font-semibold' : ''}`}>
                            <td className="py-2 px-3 text-slate-700 dark:text-slate-300">{row.mes}</td>
                            <td className="py-2 px-3 text-right text-slate-700 dark:text-slate-300">{formatCLP(row.ingresos)}</td>
                            <td className="py-2 px-3 text-right text-red-500">{formatCLP(row.egresos)}</td>
                            <td className={`py-2 px-3 text-right font-medium ${row.flujo >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>{formatCLP(row.flujo)}</td>
                            <td className={`py-2 px-3 text-right font-medium ${row.acumulado >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>{formatCLP(row.acumulado)}</td>
                            <td className="py-2 px-3 text-center"><span className={`text-xs px-2 py-0.5 rounded-full ${row.tipo === 'Desarrollo' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'}`}>{row.tipo}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-xl p-4 sm:p-5 border border-blue-100 dark:border-blue-800/20">
                    <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm">Hitos del Proyecto</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {milestones.map((m, i) => {
                        const Icon = m.icon
                        return (
                          <div key={i} className="text-center p-2">
                            <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center"><Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" /></div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Mes {m.mes}</div>
                            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">{m.evento}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </section>

            {/* PRÉSTAMO */}
            <section id="prestamo" className="scroll-mt-24">
              <ScrollReveal>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-blue-500" /> Préstamo y Amortización</h2>
                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-violet-100 dark:border-violet-800/30">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Préstamo</div>
                      <div className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">{formatCLP(50000000)}</div>
                    </div>
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-violet-100 dark:border-violet-800/30">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Cuota Mensual (Sist. Francés)</div>
                      <div className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">{formatCLP(1660715)}</div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800/30">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Intereses (36 meses)</div>
                      <div className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">{formatCLP(9785763)}</div>
                    </div>
                  </div>
                  <div className="overflow-x-auto mb-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-slate-600">
                          <th className="text-left py-2.5 px-3 text-slate-500 dark:text-slate-400 font-medium">Mes</th>
                          <th className="text-right py-2.5 px-3 text-slate-500 dark:text-slate-400 font-medium">Cuota</th>
                          <th className="text-right py-2.5 px-3 text-slate-500 dark:text-slate-400 font-medium">Interés</th>
                          <th className="text-right py-2.5 px-3 text-slate-500 dark:text-slate-400 font-medium">Amortización</th>
                          <th className="text-right py-2.5 px-3 text-slate-500 dark:text-slate-400 font-medium">Saldo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {amortizationData.map((row, i) => (
                          <tr key={i} className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                            <td className="py-2 px-3 text-slate-700 dark:text-slate-300">{row.mes}</td>
                            <td className="py-2 px-3 text-right text-slate-700 dark:text-slate-300">{formatCLP(row.cuota)}</td>
                            <td className="py-2 px-3 text-right text-amber-500">{formatCLP(row.interes)}</td>
                            <td className="py-2 px-3 text-right text-emerald-600 dark:text-emerald-400">{formatCLP(row.amortizacion)}</td>
                            <td className="py-2 px-3 text-right font-medium text-slate-700 dark:text-slate-300">{row.saldo === 0 ? '✓ Pagado' : formatCLP(row.saldo)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-800/20">
                    <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Sistema de Amortización Francés:</strong> Cuota constante de $1.660.715 mensual durante 36 meses. La tasa de interés aplicada es del 1% mensual (12% anual). El total de intereses pagados asciende a $9.785.763. La estructura de financiamiento es 11% capital propio ($6.240.000) y 89% préstamo bancario ($50.000.000), con un apalancamiento favorable dado que la TIR del 178.2% supera ampliamente el 12% de interés del préstamo.</p>
                  </div>
                </div>
              </ScrollReveal>
            </section>

            {/* VAN TIR PRI */}
            <section id="indicadores" className="scroll-mt-24">
              <ScrollReveal>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-500" /> VAN, TIR y PRI</h2>

                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800/30 text-center">
                      <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-blue-500/20 flex items-center justify-center"><DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" /></div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">VAN</div>
                      <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">{formatCLP(305902076)}</div>
                      <div className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 mt-1 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full"><CheckCircle className="w-3 h-3" /> &gt; $0 ✓</div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-5 border border-emerald-100 dark:border-emerald-800/30 text-center">
                      <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-emerald-500/20 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /></div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">TIR</div>
                      <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">178.2%</div>
                      <div className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 mt-1 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full"><CheckCircle className="w-3 h-3" /> &gt; 12% ✓</div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-5 border border-amber-100 dark:border-amber-800/30 text-center">
                      <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-amber-500/20 flex items-center justify-center"><Target className="w-5 h-5 text-amber-600 dark:text-amber-400" /></div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">PRI</div>
                      <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">20.1 meses</div>
                      <div className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 mt-1 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full"><CheckCircle className="w-3 h-3" /> &lt; 36 meses ✓</div>
                    </div>
                  </div>

                  <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                    <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4">
                      <h4 className="font-bold text-slate-800 dark:text-white mb-2">Valor Actual Neto (VAN)</h4>
                      <p className="mb-2">El VAN se calcula descontando cada flujo mensual a la tasa de descuento del 12% anual (0.949% mensual). La fórmula aplicada es:</p>
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-3 font-mono text-xs sm:text-sm text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-600 mb-2">VAN = Σ (Flujo_t / (1 + 0.00949)^t) — Inversión_0</div>
                      <p><strong>Resultado: $305.902.076 &gt; $0</strong> — El proyecto crea valor por sobre el 12% exigido.</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4">
                      <h4 className="font-bold text-slate-800 dark:text-white mb-2">Tasa Interna de Retorno (TIR)</h4>
                      <p>La TIR se calcula por iteración, encontrando la tasa que hace VAN = 0. A 0.1% mensual el VAN es +$411M; a 8.9% mensual el VAN ≈ $0.</p>
                      <p><strong>TIR mensual: 8.9% → TIR anual: (1.089)^12 - 1 = 178.2%</strong></p>
                      <p>Por cada peso invertido, el proyecto genera un retorno equivalente al 178.2% anual, superando ampliamente el 12% de costo de capital.</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-4">
                      <h4 className="font-bold text-slate-800 dark:text-white mb-2">Período de Recuperación de la Inversión (PRI)</h4>
                      <p>Se calcula por interpolación lineal sobre el flujo acumulado. En el mes 20 el acumulado es -$987.443; en el mes 21 es +$18.198.268.</p>
                      <p><strong>PRI = 20 + ($987.443 / $18.198.268) = 20.1 meses</strong></p>
                      <p>La inversión se recupera en 20.1 meses, muy por debajo del horizonte de 36 meses.</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </section>

            {/* COMPARATIVA */}
            <section id="comparativa" className="scroll-mt-24">
              <ScrollReveal>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-blue-500" /> Comparativa de Opciones</h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-5 border-2 border-emerald-200 dark:border-emerald-700/40">
                      <div className="flex items-center gap-2 mb-3"><CheckCircle className="w-5 h-5 text-emerald-500" /><h3 className="font-bold text-slate-800 dark:text-white">Opción 1 — MVP</h3></div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Período</span><span className="font-semibold text-slate-700 dark:text-slate-300">36 meses</span></div>
                        <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">VAN</span><span className="font-semibold text-emerald-600 dark:text-emerald-400">+$305.9M</span></div>
                        <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">TIR</span><span className="font-semibold text-emerald-600 dark:text-emerald-400">178.2%</span></div>
                        <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">PRI</span><span className="font-semibold text-emerald-600 dark:text-emerald-400">20.1 meses</span></div>
                        <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Inversión</span><span className="font-semibold text-slate-700 dark:text-slate-300">-$56.24M</span></div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-emerald-200 dark:border-emerald-700/30 text-center"><span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">✅ RECOMENDADA</span></div>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-xl p-5 border-2 border-red-200 dark:border-red-700/30">
                      <div className="flex items-center gap-2 mb-3"><X className="w-5 h-5 text-red-500" /><h3 className="font-bold text-slate-800 dark:text-white">Opción 2 — Desarrollo Full</h3></div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Período</span><span className="font-semibold text-slate-700 dark:text-slate-300">48+ meses</span></div>
                        <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">VAN</span><span className="font-semibold text-red-500">Negativo</span></div>
                        <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">TIR</span><span className="font-semibold text-red-500">&lt; 12%</span></div>
                        <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">PRI</span><span className="font-semibold text-red-500">&gt; 36 meses</span></div>
                        <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Inversión</span><span className="font-semibold text-slate-700 dark:text-slate-300">-$120M+</span></div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-red-200 dark:border-red-700/20 text-center"><span className="text-red-500 font-bold text-sm">❌ DESCARTADA</span></div>
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm text-center">La Opción 2 requiere más de $120M de inversión, genera VAN negativo, TIR menor al 12% y no recupera la inversión dentro del horizonte de 36 meses. Se descarta por inviable.</p>
                </div>
              </ScrollReveal>
            </section>

            {/* CONCLUSIÓN */}
            <section id="conclusion" className="scroll-mt-24">
              <ScrollReveal>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-blue-500" /> Conclusión</h2>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-5 border border-emerald-100 dark:border-emerald-800/30 mb-4">
                    <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300 mb-2">El proyecto es VIABLE y ALTAMENTE RENTABLE</p>
                    <div className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
                      <p>✅ <strong>VAN = $305.902.076 &gt; $0</strong> — El proyecto crea valor económico</p>
                      <p>✅ <strong>TIR = 178.2% &gt; 12%</strong> — Rentabilidad superior al costo de capital</p>
                      <p>✅ <strong>PRI = 20.1 meses &lt; 36 meses</strong> — Recuperación dentro del horizonte</p>
                      <p>✅ <strong>Punto de equilibrio en mes 12</strong> — Sostenibilidad financiera temprana</p>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Se recomienda avanzar con la <strong>Opción 1: Desarrollo Incremental Ágil (MVP)</strong>, que minimiza el riesgo financiero, permite validación temprana con el mercado y maximiza la rentabilidad del proyecto. La estructura de financiamiento con 89% deuda bancaria es favorable dado que la TIR del 178.2% supera ampliamente el 12% de interés del préstamo.</p>
                </div>
              </ScrollReveal>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
