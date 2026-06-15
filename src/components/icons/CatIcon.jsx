import { motion } from 'framer-motion'

export default function CatIcon({ size = 24, className = '' }) {
  return (
    <motion.svg
      whileHover={{ scale: 1.12, rotate: [-3, 3, -2, 0] }}
      transition={{ duration: 0.4 }}
      xmlns="http://www.w3.org/2000/svg"
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 5c-5 0-8 3-8 8v2c0 2 1 4 3 5h10c2-1 3-3 3-5v-2c0-5-3-8-8-8Z" />
      <path d="M9 3 7 6" />
      <path d="M15 3l2 3" />
      <ellipse cx="10" cy="12" rx="1" ry="0.8" fill="currentColor" />
      <ellipse cx="14" cy="12" rx="1" ry="0.8" fill="currentColor" />
      <path d="M9 16c.5.5 1.5 1 3 1s2.5-.5 3-1" />
      <path d="M16 10h1" />
      <path d="M7 10h1" />
    </motion.svg>
  )
}
