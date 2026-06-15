import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Camera, Upload, Sparkles, CheckCircle, MapPin, ChevronRight } from 'lucide-react'

const steps = ['Foto IA', 'Mascota', 'Contacto']

const dotsConfetti = Array.from({ length: 20 }, (_, i) => ({
  x: (Math.random() - 0.5) * 400,
  y: (Math.random() - 0.5) * 400,
  size: Math.random() * 8 + 4,
  color: ['#10b981', '#8b5cf6', '#3b82f6', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 5)],
}))

export default function ReportFound() {
  const nav = useNavigate()
  const [form, setForm] = useState({ species: 'dog', breed: '', color: '', size: 'medium', description: '', contact_name: '', phone: '', email: '', address: '' })
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [step, setStep] = useState(0)

  const handleFile = f => {
    if (!f) return
    if (f.size > 5 * 1024 * 1024) { setError('La foto no puede superar 5MB'); return }
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.contact_name) { setError('El nombre de contacto es obligatorio'); return }
    setError(''); setSending(true)
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.append(k, v))
    fd.append('type', 'found')
    if (file) fd.append('photo', file)
    try {
      const res = await fetch('/api/pets', { method: 'POST', body: fd })
      if (res.ok) { setSent(true) }
      else { const err = await res.json(); setError(err.error || 'Error al enviar') }
    } catch { setError('Error de conexión') }
    setSending(false)
  }

  if (sent) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative text-center bg-white dark:bg-slate-800 rounded-3xl p-12 shadow-xl max-w-sm mx-auto overflow-hidden">
        {dotsConfetti.map((d, i) => (
          <motion.div key={i} initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: d.x, y: d.y, opacity: 0, scale: 0 }} transition={{ duration: 1.5, delay: i * 0.03 }} className="absolute top-1/2 left-1/2 rounded-full" style={{ width: d.size, height: d.size, background: d.color }} />
        ))}
        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200 }} className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-500/30">
          <CheckCircle className="w-10 h-10 text-white" />
        </motion.div>
        <motion.h2 initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-2xl font-black text-slate-800 dark:text-white mb-2">Reporte Enviado</motion.h2>
        <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-slate-400 dark:text-slate-500 text-sm mb-6">La IA está analizando la foto para buscar coincidencias</motion.p>
        <motion.button initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} onClick={() => nav('/galeria')} className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold text-sm hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md">
          Ver coincidencias
        </motion.button>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen pt-24 pb-10 bg-gradient-to-b from-emerald-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-500/20">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white">Reportar Mascota Encontrada</h1>
          <p className="text-slate-400 dark:text-slate-500 mt-2">Sube una foto y la IA buscará automáticamente al dueño</p>
        </motion.div>

        <div className="flex items-center justify-center gap-2 mb-6">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i <= step ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500'}`}>
                {i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i <= step ? 'text-slate-700 dark:text-slate-300' : 'text-slate-300 dark:text-slate-600'}`}>{s}</span>
              {i < steps.length - 1 && <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600" />}
            </div>
          ))}
        </div>

        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 sm:p-8 space-y-6">

          <div className="text-center">
            <label onDragOver={e => { e.preventDefault(); setDragOver(true) }} onDragLeave={() => setDragOver(false)} onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }} className={`cursor-pointer inline-block w-full ${dragOver ? 'ring-2 ring-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl' : ''}`}>
              {preview ? (
                <div className="relative" onClick={() => setStep(0)}>
                  <img src={preview} alt="Preview" className="w-48 h-48 object-cover rounded-2xl mx-auto shadow-lg ring-2 ring-emerald-200 dark:ring-emerald-800" />
                  <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null) }} className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full text-xs font-bold hover:bg-red-600 transition-colors shadow">✕</button>
                  <div className="mt-2 flex items-center justify-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    <Sparkles className="w-4 h-4" /> Foto lista para análisis IA
                  </div>
                </div>
              ) : (
                <div onClick={() => setStep(0)} className="w-full py-12 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-700 dark:to-slate-700/50 rounded-2xl border-2 border-dashed border-emerald-200 dark:border-slate-600 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors flex flex-col items-center justify-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <Upload className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Sube una foto para análisis con IA</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Arrastra o haz clic para seleccionar</p>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full">
                    <Sparkles className="w-3 h-3" /> Se extraerán colores y características
                  </div>
                </div>
              )}
              <input type="file" accept="image/*" onChange={e => { setStep(0); handleFile(e.target.files[0]) }} className="hidden" />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" onClick={() => setStep(1)}>Especie</label>
              <select value={form.species} onChange={e => setForm({ ...form, species: e.target.value })} className="input-modern" onClick={() => setStep(1)}>
                <option value="dog">Perro</option>
                <option value="cat">Gato</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" onClick={() => setStep(1)}>Tamaño</label>
              <select value={form.size} onChange={e => setForm({ ...form, size: e.target.value })} className="input-modern" onClick={() => setStep(1)}>
                <option value="small">Pequeño</option>
                <option value="medium">Mediano</option>
                <option value="large">Grande</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Raza aproximada" value={form.breed} onChange={v => setForm({ ...form, breed: v })} onFocus={() => setStep(1)} />
            <Input label="Color" value={form.color} onChange={v => setForm({ ...form, color: v })} onFocus={() => setStep(1)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5" onClick={() => setStep(1)}>Descripción / Señas particulares</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} onFocus={() => setStep(1)} rows={3} className="input-modern resize-none" placeholder="Ej: Tiene collar azul, parece tener dueño..." />
          </div>

          <div className="border-t border-slate-100 dark:border-slate-700 pt-6">
            <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2" onClick={() => setStep(2)}><MapPin className="w-4 h-4" /> Datos de contacto</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Tu nombre *" value={form.contact_name} onChange={v => setForm({ ...form, contact_name: v })} onFocus={() => setStep(2)} required />
              <Input label="Teléfono" value={form.phone} onChange={v => setForm({ ...form, phone: v })} onFocus={() => setStep(2)} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <Input label="Email" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} onFocus={() => setStep(2)} />
              <Input label="Dirección / Comuna" value={form.address} onChange={v => setForm({ ...form, address: v })} onFocus={() => setStep(2)} />
            </div>
          </div>

          {error && <p className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/30 p-3 rounded-xl">{error}</p>}

          <button type="submit" disabled={sending} className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3.5 rounded-xl font-bold text-base hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-60 flex items-center justify-center gap-2">
            {sending ? 'Enviando...' : <><Sparkles className="w-5 h-5" /> Publicar — La IA buscará coincidencias</>}
          </button>
        </motion.form>
      </div>
    </div>
  )
}

function Input({ label, value, onChange, type = 'text', required, onFocus }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} onFocus={onFocus} required={required} className="input-modern" />
    </div>
  )
}
