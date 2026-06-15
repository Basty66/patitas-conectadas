import { motion } from 'framer-motion'

export default function HeartPawIcon({ size = 24, className = '' }) {
  return (
    <motion.svg
      whileHover={{ scale: 1.15 }}
      transition={{ duration: 0.3 }}
      xmlns="http://www.w3.org/2000/svg"
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 14c1.5-2 3-4 3-6 0-2-1-4-3-4s-3 1-3 2c0-1-1-2-3-2S7 6 7 8c0 2 1.5 4 3 6" />
      <path d="M7 14c-1.5-2-3-4-3-6 0-2 1-4 3-4s3 1 3 2c0-1 1-2 3-2" opacity="0" />
      <circle cx="14.5" cy="4.5" r="1.5" />
      <circle cx="9.5" cy="4.5" r="1.5" />
      <circle cx="18" cy="8" r="1.5" />
      <circle cx="6" cy="8" r="1.5" />
      <path d="M20 16c0 3-2.5 4-8 4s-8-1-8-4" />
    </motion.svg>
  )
}
