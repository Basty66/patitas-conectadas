import { motion } from 'framer-motion'

export default function PawIcon({ size = 24, className = '' }) {
  return (
    <motion.svg
      whileHover={{ scale: 1.15, rotate: [0, -8, 8, -4, 0] }}
      transition={{ duration: 0.4 }}
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
      <circle cx="14.5" cy="4.5" r="2" />
      <circle cx="9.5" cy="4.5" r="2" />
      <circle cx="18" cy="9" r="2" />
      <circle cx="6" cy="9" r="2" />
      <path d="M20 17c0 3-2.5 4-8 4s-8-1-8-4c0-2.5 2-5 8-5s8 2.5 8 5Z" />
    </motion.svg>
  )
}
