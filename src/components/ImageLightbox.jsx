import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ImageLightbox({ images, index, onClose, onPrev, onNext }) {
  if (index === null || index === undefined) return null
  const img = images[index]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-sm flex items-center justify-center"
        onClick={onClose}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
          <X className="w-5 h-5 text-white" />
        </button>

        {images.length > 1 && (
          <>
            <button onClick={e => { e.stopPropagation(); onPrev() }} className="absolute left-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button onClick={e => { e.stopPropagation(); onNext() }} className="absolute right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </>
        )}

        <motion.div
          key={index}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="max-w-4xl max-h-[85vh] mx-4"
          onClick={e => e.stopPropagation()}
        >
          <img
            src={typeof img === 'string' ? img : img.photo || img.url}
            alt=""
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
          />
        </motion.div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium">
          {index + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
