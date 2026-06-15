import { motion } from 'framer-motion'

export default function DogIcon({ size = 24, className = '' }) {
  return (
    <motion.svg
      whileHover={{ scale: 1.12, y: -2 }}
      transition={{ duration: 0.3 }}
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
      <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2 .333-3.5 1.8-4 3.5C2 7.5 2 9 2 10c0 3.5 2 6 4 6 .5 0 1-.2 1.5-.5" />
      <path d="M14 5.172C14 3.782 15.577 2.679 17.5 3c2 .333 3.5 1.8 4 3.5C22 7.5 22 9 22 10c0 3.5-2 6-4 6-.5 0-1-.2-1.5-.5" />
      <path d="M8 14c0 2 1.5 4 4 4s4-2 4-4" />
      <path d="M8.5 14c.5-1 1.5-2 3.5-2s3 1 3.5 2" />
      <ellipse cx="8" cy="11" rx="1" ry="0.5" fill="currentColor" />
      <ellipse cx="16" cy="11" rx="1" ry="0.5" fill="currentColor" />
      <path d="M9 16c0 .5.5 1 1 1h4c.5 0 1-.5 1-1" />
    </motion.svg>
  )
}
