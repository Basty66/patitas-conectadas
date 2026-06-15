import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Calendar, Upload, X, Image as ImageIcon, Sparkles, Send } from 'lucide-react'
import DogIcon from '../components/icons/DogIcon.jsx'
import CatIcon from '../components/icons/CatIcon.jsx'
import BoneIcon from '../components/icons/BoneIcon.jsx'
import { useToast } from '../context/ToastContext.jsx'

const typeConfig = {
  article: { icon: BoneIcon, label: 'Artículo', color: 'bg-blue-500', from: 'from-blue-400', to: 'to-blue-600' },
  success_story: { icon: DogIcon, label: 'Historia de éxito', color: 'bg-emerald-500', from: 'from-emerald-400', to: 'to-emerald-600' },
  tip: { icon: CatIcon, label: 'Consejo', color: 'bg-amber-500', from: 'from-amber-400', to: 'to-amber-600' },
  announcement: { icon: Sparkles, label: 'Anuncio', color: 'bg-purple-500', from: 'from-purple-400', to: 'to-purple-600' },
}

const filters = [
  { key: 'all', label: 'Para ti', icon: Sparkles },
  { key: 'success_story', label: 'Éxitos', icon: Heart },
  { key: 'tip', label: 'Consejos', icon: CatIcon },
  { key: 'article', label: 'Artículos', icon: BoneIcon },
  { key: 'announcement', label: 'Anuncios', icon: MessageCircle },
]

const FAKE_AVATARS = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-rose-500']

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'
}

function getAvatarColor(name) {
  let hash = 0
  for (let i = 0; i < (name || '').length; i++) hash = ((hash << 5) - hash) + name.charCodeAt(i)
  return FAKE_AVATARS[Math.abs(hash) % FAKE_AVATARS.length]
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  const diff = (now - d) / 1000
  if (diff < 60) return 'Ahora'
  if (diff < 3600) return `${Math.floor(diff / 60)}m`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`
  return d.toLocaleDateString('es-CL', { day: 'numeric', month: 'short' })
}

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', content: '', author: '', type: 'article' })
  const [formFile, setFormFile] = useState(null)
  const [formPreview, setFormPreview] = useState(null)
  const [sending, setSending] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    fetch('/api/blog').then(r => r.json()).then(d => { setPosts(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const filtered = filter === 'all' ? posts : posts.filter(p => p.type === filter)

  const handleLike = async (id) => {
    const res = await fetch(`/api/blog/${id}/like`, { method: 'POST' })
    if (res.ok) setPosts(p => p.map(pt => pt.id === id ? { ...pt, likes: (pt.likes || 0) + 1 } : pt))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.title || !form.content) return
    setSending(true)
    const fd = new FormData()
    fd.append('title', form.title)
    fd.append('content', form.content)
    fd.append('author', form.author || 'Equipo Patitas')
    fd.append('type', form.type)
    if (formFile) fd.append('image', formFile)
    try {
      const res = await fetch('/api/blog', { method: 'POST', body: fd })
      if (res.ok) {
        const n = await res.json()
        const p = { id: n.id, title: form.title, content: form.content, author: form.author || 'Equipo Patitas', type: form.type, likes: 0, image: formPreview, created_at: new Date().toISOString() }
        setPosts([p, ...posts])
        setForm({ title: '', content: '', author: '', type: 'article' })
        setFormFile(null); setFormPreview(null); setShowForm(false)
      }
    } catch {}
    setSending(false)
  }

  const handleFormFile = f => {
    if (!f) return
    if (f.size > 5 * 1024 * 1024) return
    setFormFile(f)
    setFormPreview(URL.createObjectURL(f))
  }

  return (
    <div className="min-h-screen pt-20 pb-10 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-800 dark:text-white">Blog <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Patitas</span></h1>
            <p className="text-slate-400 dark:text-slate-500 text-sm">Historias que inspiran, consejos que ayudan</p>
          </div>
          <button onClick={() => setShowForm(true)} className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-sm font-bold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 ease-out shadow-lg hover:shadow-xl active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-400">
            <ImageIcon className="w-4 h-4" /> Crear post
          </button>
        </div>

        <div className="flex gap-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-1.5 mb-6 overflow-x-auto">
          {filters.map(f => {
            const Icon = f.icon
            const isActive = filter === f.key
            return (
              <button key={f.key} onClick={() => setFilter(f.key)} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ease-out whitespace-nowrap active:scale-95 focus-visible:ring-2 focus-visible:ring-slate-400 ${isActive ? 'bg-slate-800 dark:bg-slate-600 text-white shadow-md' : 'text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : ''}`} />{f.label}
              </button>
            )
          })}
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 p-4 mb-6 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800 dark:text-white">Nuevo post</h3>
                <button onClick={() => { setShowForm(false); setFormFile(null); setFormPreview(null) }} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all duration-200 ease-out active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-400" aria-label="Cerrar formulario"><X className="w-4 h-4 text-slate-400" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${getAvatarColor(form.author || 'T')} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {getInitials(form.author || 'T')}
                  </div>
                  <div className="flex-1 flex gap-2">
                    <input type="text" placeholder="Tu nombre" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} className="flex-1 bg-slate-50 dark:bg-slate-700 rounded-xl px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 focus:border-blue-400 outline-none transition-all duration-200 ease-out dark:text-slate-200 focus-visible:ring-2 focus-visible:ring-blue-400" />
                    <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="bg-slate-50 dark:bg-slate-700 rounded-xl px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 focus:border-blue-400 outline-none transition-all duration-200 ease-out dark:text-slate-200 focus-visible:ring-2 focus-visible:ring-blue-400">
                      <option value="article">Artículo</option>
                      <option value="success_story">Éxito</option>
                      <option value="tip">Consejo</option>
                      <option value="announcement">Anuncio</option>
                    </select>
                  </div>
                </div>
                <input type="text" placeholder="Título de tu post..." value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className="w-full bg-slate-50 dark:bg-slate-700 rounded-xl px-3 py-2.5 text-sm border border-slate-200 dark:border-slate-600 focus:border-blue-400 outline-none transition-all duration-200 ease-out font-medium dark:text-slate-200 focus-visible:ring-2 focus-visible:ring-blue-400" />
                <textarea placeholder="Escribe algo..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required rows={3} className="w-full bg-slate-50 dark:bg-slate-700 rounded-xl px-3 py-2.5 text-sm border border-slate-200 dark:border-slate-600 focus:border-blue-400 outline-none transition-all duration-200 ease-out resize-none dark:text-slate-200 focus-visible:ring-2 focus-visible:ring-blue-400" />
                {formPreview ? (
                  <div className="relative">
                    <img src={formPreview} alt="preview" className="w-full h-40 object-cover rounded-xl" />
                    <button type="button" onClick={() => { setFormFile(null); setFormPreview(null) }} className="absolute top-2 right-2 w-6 h-6 bg-black/50 text-white rounded-full text-xs hover:bg-black/70 transition-all duration-200 ease-out active:scale-95 focus-visible:ring-2 focus-visible:ring-white" aria-label="Eliminar imagen">✕</button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center gap-2 py-3 bg-slate-50 dark:bg-slate-700 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 cursor-pointer transition-all duration-200 ease-out text-sm text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 focus-visible:ring-2 focus-visible:ring-blue-400">
                    <Upload className="w-4 h-4" /> Agregar foto
                    <input type="file" accept="image/*" onChange={e => handleFormFile(e.target.files[0])} className="hidden" />
                  </label>
                )}
                <div className="flex gap-2 pt-1">
                  <button type="submit" disabled={sending} className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-xl text-sm font-bold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 ease-out shadow-md disabled:opacity-60 active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-400">
                    {sending ? 'Publicando...' : 'Publicar'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {!showForm && (
          <button onClick={() => setShowForm(true)} className="w-full mb-4 py-3 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 border-dashed text-sm text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200 ease-out shadow-sm sm:hidden active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-400">
            <ImageIcon className="w-4 h-4" /> Crear publicación
          </button>
        )}

        {loading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700">
                <div className="h-52 bg-slate-100 dark:bg-slate-700 animate-shimmer" />
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-600 animate-shimmer" />
                    <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded-lg w-24 animate-shimmer" />
                  </div>
                  <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded-lg w-3/4 animate-shimmer" />
                  <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-lg w-full animate-shimmer" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CatIcon size={36} className="text-slate-400 dark:text-slate-500" />
            </motion.div>
            <p className="text-slate-500 dark:text-slate-300 font-medium">No hay publicaciones aún</p>
            <button onClick={() => setShowForm(true)} className="mt-3 text-sm text-blue-500 dark:text-blue-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors">+ Crear la primera publicación</button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((post, i) => (
              <BlogPostCard key={post.id} post={post} index={i} onLike={handleLike} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function BlogPostCard({ post, index, onLike }) {
  const [liked, setLiked] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const [commentAuthor, setCommentAuthor] = useState('')
  const [commentText, setCommentText] = useState('')
  const [loadingComments, setLoadingComments] = useState(false)
  const [sendingComment, setSendingComment] = useState(false)
  const { addToast } = useToast()
  const cfg = typeConfig[post.type] || typeConfig.article
  const Icon = cfg.icon

  const loadComments = async () => {
    setLoadingComments(true)
    try {
      const r = await fetch(`/api/blog/${post.id}/comments`)
      setComments(await r.json())
    } catch {}
    setLoadingComments(false)
  }

  const toggleComments = () => {
    if (!showComments && comments.length === 0) loadComments()
    setShowComments(!showComments)
  }

  const addComment = async e => {
    e.preventDefault()
    if (!commentAuthor || !commentText) return
    setSendingComment(true)
    try {
      const r = await fetch(`/api/blog/${post.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: commentAuthor, content: commentText })
      })
      if (r.ok) {
        const c = await r.json()
        setComments(prev => [...prev, c])
        setCommentText('')
        addToast('Comentario agregado')
      }
    } catch {}
    setSendingComment(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 dark:border-slate-700 transition-all duration-300"
    >
      {post.image && (
        <div className="relative aspect-[4/3] sm:aspect-[16/9] bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          <div className="absolute top-3 left-3">
            <div className={`px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg ${cfg.color}`}>
              <div className="flex items-center gap-1.5">
                <Icon size={12} /> {cfg.label}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-9 h-9 rounded-full ${getAvatarColor(post.author)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm`}>
            {getInitials(post.author)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm leading-tight">{post.author || 'Equipo Patitas'}</div>
            <div className="text-xs text-slate-400">{formatDate(post.created_at)}</div>
          </div>
          {!post.image && (
            <div className={`px-2.5 py-1 rounded-full text-xs font-bold text-white ${cfg.color}`}>
              <div className="flex items-center gap-1"><Icon size={10} /> {cfg.label}</div>
            </div>
          )}
        </div>

        <h3 className="font-bold text-slate-800 dark:text-white text-base mb-1.5 leading-snug">{post.title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-line">{post.content}</p>

        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100 dark:border-slate-700">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => { if (!liked) { setLiked(true); onLike(post.id) } }}
            className={`flex items-center gap-1.5 text-sm font-medium transition-all duration-200 ease-out active:scale-95 focus-visible:ring-2 focus-visible:ring-pink-400 rounded-lg px-1 ${liked ? 'text-pink-500' : 'text-slate-400 hover:text-pink-500 dark:text-slate-500 dark:hover:text-pink-400'}`}
            aria-label={liked ? 'Te gusta esta publicación' : 'Dar like'}
          >
            <motion.div animate={liked ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
              <Heart className={`w-4 h-4 ${liked ? 'fill-pink-500' : ''}`} />
            </motion.div>
            {(post.likes || 0) + (liked ? 1 : 0)}
          </motion.button>

          <button onClick={toggleComments} className={`flex items-center gap-1.5 text-sm font-medium transition-all duration-200 ease-out active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg px-1 ${showComments ? 'text-blue-500' : 'text-slate-400 hover:text-blue-500 dark:text-slate-500 dark:hover:text-blue-400'}`} aria-label={showComments ? 'Ocultar comentarios' : 'Ver comentarios'}>
            <MessageCircle className="w-4 h-4" />
            {comments.length > 0 ? comments.length : 'Comentar'}
          </button>
        </div>

        <AnimatePresence>
          {showComments && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700 space-y-3">
                <form onSubmit={addComment} className="flex gap-2">
                  <input type="text" placeholder="Tu nombre" value={commentAuthor} onChange={e => setCommentAuthor(e.target.value)} required
                    className="w-24 sm:w-28 bg-slate-50 dark:bg-slate-700 rounded-lg px-2.5 py-2 text-xs border border-slate-200 dark:border-slate-600 focus:border-blue-400 outline-none transition-all duration-200 ease-out dark:text-slate-200 focus-visible:ring-2 focus-visible:ring-blue-400" />
                  <input type="text" placeholder="Escribe un comentario..." value={commentText} onChange={e => setCommentText(e.target.value)} required
                    className="flex-1 bg-slate-50 dark:bg-slate-700 rounded-lg px-2.5 py-2 text-xs border border-slate-200 dark:border-slate-600 focus:border-blue-400 outline-none transition-all duration-200 ease-out dark:text-slate-200 focus-visible:ring-2 focus-visible:ring-blue-400" />
                  <button type="submit" disabled={sendingComment} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 ease-out disabled:opacity-50 flex-shrink-0 active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-400" aria-label="Enviar comentario">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                {loadingComments ? (
                  <div className="space-y-2">
                    {[1, 2].map(i => <div key={i} className="h-8 bg-slate-100 dark:bg-slate-700 rounded-lg animate-shimmer" />)}
                  </div>
                ) : comments.length === 0 ? (
                  <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-2">Sin comentarios aún. ¡Sé el primero!</p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {comments.map(c => (
                      <div key={c.id} className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2.5">
                        <div className="flex items-center gap-2 mb-0.5">
                          <div className={`w-5 h-5 rounded-full ${getAvatarColor(c.author)} flex items-center justify-center text-white text-[8px] font-bold`}>
                            {getInitials(c.author)}
                          </div>
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{c.author}</span>
                          <span className="text-[10px] text-slate-400">{formatDate(c.created_at)}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 ml-7">{c.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
