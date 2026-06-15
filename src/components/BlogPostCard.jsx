import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Send } from 'lucide-react'
import BoneIcon from './icons/BoneIcon.jsx'
import DogIcon from './icons/DogIcon.jsx'
import CatIcon from './icons/CatIcon.jsx'
import { useToast } from '../context/ToastContext.jsx'

const typeConfig = {
  article: { icon: BoneIcon, label: 'Artículo', color: 'bg-blue-500' },
  success_story: { icon: DogIcon, label: 'Historia de éxito', color: 'bg-emerald-500' },
  tip: { icon: CatIcon, label: 'Consejo', color: 'bg-amber-500' },
  announcement: { icon: Heart, label: 'Anuncio', color: 'bg-purple-500' },
}

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

export default function BlogPostCard({ post, index, onLike }) {
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
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 dark:border-slate-700 transition-all duration-200 ease-out"
    >
      {post.image && (
        <div className="relative bg-slate-100 dark:bg-slate-700 overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <img src={post.image} alt={post.title} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out" />
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg ${cfg.color}`}>
              <Icon size={12} /> {cfg.label}
            </span>
          </div>
        </div>
      )}

      <div className="p-4">
        <header className="flex items-center gap-3 mb-3">
          <div className={`w-9 h-9 rounded-full ${getAvatarColor(post.author)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm`} aria-hidden="true">
            {getInitials(post.author)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm leading-tight">{post.author || 'Equipo Patitas'}</div>
            <time className="text-xs text-slate-400">{formatDate(post.created_at)}</time>
          </div>
          {!post.image && (
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-white ${cfg.color}`}>
              <Icon size={10} /> {cfg.label}
            </span>
          )}
        </header>

        <h3 className="font-bold text-slate-800 dark:text-white text-base mb-1.5 leading-snug">{post.title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-line">{post.content}</p>

        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100 dark:border-slate-700">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={() => { if (!liked) { setLiked(true); onLike(post.id) } }}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ease-out active:scale-95 ${liked ? 'text-pink-500' : 'text-slate-400 hover:text-pink-500 dark:text-slate-500 dark:hover:text-pink-400'}`}
            aria-label={liked ? 'Quitar like' : 'Dar like'}
          >
            <motion.div animate={liked ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
              <Heart className={`w-4 h-4 ${liked ? 'fill-pink-500' : ''}`} />
            </motion.div>
            {(post.likes || 0) + (liked ? 1 : 0)}
          </motion.button>

          <button
            onClick={toggleComments}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ease-out active:scale-95 ${showComments ? 'text-blue-500' : 'text-slate-400 hover:text-blue-500 dark:text-slate-500 dark:hover:text-blue-400'}`}
            aria-label={showComments ? 'Ocultar comentarios' : 'Ver comentarios'}
            aria-expanded={showComments}
          >
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
              transition={{ ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <section className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700 space-y-3">
                <form onSubmit={addComment} className="flex gap-2">
                  <input
                    type="text" placeholder="Tu nombre" value={commentAuthor}
                    onChange={e => setCommentAuthor(e.target.value)} required
                    className="w-24 sm:w-28 bg-slate-50 dark:bg-slate-700 rounded-lg px-2.5 py-2 text-xs border border-slate-200 dark:border-slate-600 focus:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-500 outline-none dark:text-slate-200 transition-all duration-200 ease-out"
                    aria-label="Tu nombre"
                  />
                  <input
                    type="text" placeholder="Escribe un comentario..." value={commentText}
                    onChange={e => setCommentText(e.target.value)} required
                    className="flex-1 bg-slate-50 dark:bg-slate-700 rounded-lg px-2.5 py-2 text-xs border border-slate-200 dark:border-slate-600 focus:border-blue-400 focus-visible:ring-2 focus-visible:ring-blue-500 outline-none dark:text-slate-200 transition-all duration-200 ease-out"
                    aria-label="Escribe un comentario"
                  />
                  <button type="submit" disabled={sendingComment}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:scale-95 transition-all duration-200 ease-out disabled:opacity-50 flex-shrink-0 focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-label="Enviar comentario"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                {loadingComments ? (
                  <div className="space-y-2">
                    {[1, 2].map(i => <div key={i} className="h-8 bg-slate-100 dark:bg-slate-700 rounded-lg animate-pulse" />)}
                  </div>
                ) : comments.length === 0 ? (
                  <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-2">Sin comentarios aún. ¡Sé el primero!</p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto" role="list">
                    {comments.map(c => (
                      <div key={c.id} className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-2.5" role="listitem">
                        <div className="flex items-center gap-2 mb-0.5">
                          <div className={`w-5 h-5 rounded-full ${getAvatarColor(c.author)} flex items-center justify-center text-white text-[8px] font-bold`} aria-hidden="true">
                            {getInitials(c.author)}
                          </div>
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{c.author}</span>
                          <time className="text-[10px] text-slate-400">{formatDate(c.created_at)}</time>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 ml-7">{c.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}
