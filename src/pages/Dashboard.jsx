import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Percent, Clock, Users, Building, PiggyBank, ChevronRight, Calendar, Target, BarChart3, Briefcase, CheckCircle } from 'lucide-react'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

function KpiCard({ icon: Icon, value, label, sub, color }) {
  return (
    <motion.div variants={item} whileHover={{ y: -4 }} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-lg border border-gray-100 dark:border-slate-700 transition-all duration-300">
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow-lg`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 100 }} className="text-2xl font-black text-slate-800 dark:text-white">{value}</motion.div>
      <div className="font-semibold text-slate-700 dark:text-slate-300 text-sm mt-0.5">{label}</div>
      <div className="text-xs text-slate-400 dark:text-slate-500">{sub}</div>
    </motion.div>
  )
}

function InfoCard({ label, value, accent }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
      <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
      <div className={`font-bold mt-0.5 text-sm ${accent || 'text-slate-800 dark:text-white'}`}>{value}</div>
    </div>
  )
}

function BarChart({ data }) {
  const maxVal = Math.max(...data.map(d => Math.abs(d.flujoNeto)), 1)
  return (
    <div className="space-y-1.5">
      {data.slice(0, 24).map((d, i) => {
        const pct = (Math.abs(d.flujoNeto) / maxVal) * 100
        const isPositive = d.flujoNeto >= 0
        return (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-16 text-right text-slate-400 dark:text-slate-500 flex-shrink-0">{i === 0 ? 'Inv.' : `M${d.mes}`}</span>
            <div className="flex-1 h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden relative">
              <motion.div initial={{ width: 0 }} animate={{ width: `${Math.max(pct, 2)}%` }} transition={{ duration: 0.6, delay: i * 0.02 }} className={`h-full rounded-full ${isPositive ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-red-500'}`} />
            </div>
            <span className={`w-16 text-right font-medium ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>${(d.flujoNeto / 1e6).toFixed(1)}M</span>
          </div>
        )
      })}
    </div>
  )
}

function Milestone({ month, label, active }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${active ? 'bg-gradient-to-r from-emerald-50 to-white dark:from-emerald-900/30 dark:to-slate-800 border border-emerald-100 dark:border-emerald-800/50' : 'bg-slate-50 dark:bg-slate-700/50'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${active ? 'bg-emerald-500 text-white shadow-md' : 'bg-slate-200 dark:bg-slate-600 text-slate-400'}`}>
        <CheckCircle className="w-4 h-4" />
      </div>
      <div>
        <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</div>
        <div className="text-xs text-slate-400 dark:text-slate-500">Mes {month}</div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(setData).catch(() => {})
  }, [])

  if (!data) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="w-12 h-12 border-[3px] border-blue-200 dark:border-blue-800 border-t-blue-600 rounded-full mx-auto mb-4" />
        <p className="text-slate-400 dark:text-slate-500">Cargando dashboard...</p>
      </div>
    </div>
  )

  const kpis = [
    { icon: DollarSign, value: `$${(data.van / 1e6).toFixed(1)}M`, label: 'VAN', sub: 'Valor Actual Neto', color: 'from-emerald-500 to-teal-600' },
    { icon: Percent, value: `${data.tir}%`, label: 'TIR', sub: 'Tasa Interna de Retorno', color: 'from-blue-500 to-indigo-600' },
    { icon: Clock, value: `${data.pri} meses`, label: 'PRI', sub: 'Periodo Recuperación', color: 'from-purple-500 to-pink-500' },
    { icon: PiggyBank, value: `$${(data.flujoAcumulado / 1e6).toFixed(1)}M`, label: 'Flujo Acumulado', sub: 'Mes 36', color: 'from-orange-500 to-red-500' },
  ]

  const milestones = [
    { month: 0, label: 'Inicio del proyecto' },
    { month: 6, label: 'Lanzamiento MVP' },
    { month: 12, label: 'Punto de equilibrio' },
    { month: 20, label: 'Recuperación inversión' },
    { month: 36, label: 'Horizonte evaluación' },
  ]

  return (
    <div className="min-h-screen pt-20 pb-10 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1">
                <TrendingUp className="w-4 h-4" /> Evaluación económica
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white">Dashboard Financiero</h1>
              <p className="text-slate-400 dark:text-slate-500 mt-1">{data.modalidad}</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
              <Calendar className="w-4 h-4" /> Horizonte: {data.horizonte} meses
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {kpis.map((k, i) => <KpiCard key={i} {...k} />)}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <motion.div variants={item} className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="font-bold text-slate-800 dark:text-white text-lg mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-blue-500" /> Flujo de Caja Mensual</h2>
              <div className="max-h-80 overflow-y-auto pr-2">
                <BarChart data={data.flujoMensual} />
              </div>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100 dark:border-slate-700 text-xs text-slate-400 dark:text-slate-500">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-gradient-to-r from-emerald-400 to-emerald-500" /> Flujo positivo</div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-gradient-to-r from-red-400 to-red-500" /> Flujo negativo</div>
              </div>
            </motion.div>

            <motion.div variants={item} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="font-bold text-slate-800 dark:text-white text-lg mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-emerald-500" /> Hitos del Proyecto</h2>
              <div className="space-y-3">
                {milestones.map((m, i) => (
                  <Milestone key={i} {...m} active={data.pri >= m.month && (i === 0 || data.pri < (milestones[i + 1]?.month || 999))} />
                ))}
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <motion.div variants={item} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="font-bold text-slate-800 dark:text-white text-lg mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-blue-500" /> Resumen Financiero</h2>
              <div className="grid grid-cols-2 gap-3">
                <InfoCard label="Inversión Total" value={`$${(data.inversion / 1e6).toFixed(2)}M`} />
                <InfoCard label="Préstamo" value={`$${(data.prestamo / 1e6).toFixed(0)}M`} />
                <InfoCard label="Capital Propio" value={`$${(data.capitalPropio / 1e6).toFixed(2)}M`} />
                <InfoCard label="Cuota Mensual" value={`$${(data.cuotaMensual / 1e3).toFixed(0)}K/mes`} />
                <InfoCard label="Intereses Totales" value={`$${(data.totalIntereses / 1e6).toFixed(2)}M`} />
                <InfoCard label="Tasa Descuento" value={`${data.tasaDescuento}% anual`} />
                <InfoCard label="Punto Equilibrio" value={`Mes ${data.puntoEquilibrio}`} accent="text-emerald-600 dark:text-emerald-400" />
                <InfoCard label="PRI" value={`${data.pri} meses`} accent="text-purple-600 dark:text-purple-400" />
              </div>
            </motion.div>

            <motion.div variants={item} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
              <h2 className="font-bold text-slate-800 dark:text-white text-lg mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-orange-500" /> Proyección Comercial (Mes 36)</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <InfoCard label="Usuarios" value={`${(data.usuariosMes36 / 1e3).toFixed(0)}K`} />
                <InfoCard label="Ingresos/mes" value={`$${(data.ingresosMes36 / 1e6).toFixed(2)}M`} />
                <InfoCard label="Costo Op. Base" value={`$${(data.costosOperacionBase / 1e6).toFixed(2)}M`} />
                <InfoCard label="Margen" value={`${((data.ingresosMes36 - data.costosOperacionBase) / data.ingresosMes36 * 100).toFixed(1)}%`} accent="text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Convenios B2B</h3>
                <div className="space-y-2.5">
                  {[
                    { label: 'Clínicas', count: data.conveniosClinicas, ing: 100000, color: 'bg-blue-500' },
                    { label: 'Municipios', count: data.conveniosMunicipios, ing: 300000, color: 'bg-orange-500' },
                    { label: 'Refugios', count: data.conveniosRefugios, ing: 60000, color: 'bg-emerald-500' },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${c.color}`} />
                        <span className="text-sm text-slate-600 dark:text-slate-400">{c.label}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-slate-800 dark:text-white">{c.count}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">${(c.count * c.ing / 1e6).toFixed(1)}M/mes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={item} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 mb-8">
            <h2 className="font-bold text-slate-800 dark:text-white text-lg mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-emerald-500" /> Flujo de Caja Detallado</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-100 dark:border-slate-700">
                    {['Período', 'Ingresos', 'Costos', 'Flujo Neto', 'Acumulado'].map(h => (
                      <th key={h} className="text-left p-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.flujoMensual.map((f, i) => (
                    <motion.tr key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }} className={`border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors ${f.acumulado >= 0 ? 'bg-emerald-50/30 dark:bg-emerald-900/10' : ''}`}>
                      <td className="p-3 font-medium text-slate-700 dark:text-slate-300">{i === 0 ? 'Inversión' : `Mes ${f.mes}`}</td>
                      <td className={`p-3 font-medium ${f.ingresos > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>{f.ingresos === 0 ? '—' : `$${(f.ingresos / 1e6).toFixed(2)}M`}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">{f.costos === 0 ? '—' : `$${(f.costos / 1e6).toFixed(2)}M`}</td>
                      <td className={`p-3 font-bold ${f.flujoNeto >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                        {f.inversion > 0 ? `-$${(f.inversion / 1e6).toFixed(2)}M` : `${f.flujoNeto >= 0 ? '+' : ''}$${(f.flujoNeto / 1e6).toFixed(2)}M`}
                      </td>
                      <td className={`p-3 font-bold ${f.acumulado >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                        {f.acumulado >= 0 ? '+' : ''}${(Math.abs(f.acumulado) / 1e6).toFixed(2)}M
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {[
              { title: 'Equipo de Desarrollo', data: data.rrhhDesarrollo, icon: '🚀' },
              { title: 'Equipo de Operación', data: data.rrhhOperacion, icon: '⚙️' },
            ].map((section, si) => (
              <motion.div key={si} variants={item} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700">
                <h2 className="font-bold text-slate-800 dark:text-white text-lg mb-4"><span className="mr-2">{section.icon}</span>{section.title}</h2>
                <div className="space-y-2">
                  {section.data.map((r, i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <div>
                        <div className="font-medium text-slate-700 dark:text-slate-300 text-sm">{r.rol}</div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">{r.cantidad}x · {r.horasMes}h/mes</div>
                      </div>
                      <div className="font-bold text-slate-800 dark:text-white">${r.totalMes.toLocaleString()}</div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-600 text-white">
                    <span className="font-bold text-sm">Total Mensual</span>
                    <span className="font-bold">${section.data.reduce((a, r) => a + r.totalMes, 0).toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
