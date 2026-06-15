import { motion } from 'framer-motion'

export default function BoneIcon({ size = 24, className = '' }) {
  return (
    <motion.svg
      whileHover={{ rotate: [0, -15, 15, -5, 0] }}
      transition={{ duration: 0.5 }}
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
      <path d="M17 10a3 3 0 0 1-3-3c0-1.5.8-2.8 2-3.5C16.5 3 17 3.5 17 4.5V6h1.5c1 0 1.5-.5 1.5-1.5 0-1.2 1-1.8 2-1.5.7.2 1 1 1 2 0 2.2-1.8 4-4 4Z" />
      <path d="M7 14a3 3 0 0 1 3 3c0 1.5-.8 2.8-2 3.5-1 .5-1.5 0-1.5-1V18H5c-1 0-1.5.5-1.5 1.5 0 1.2-1 1.8-2 1.5C.8 20.8.5 20 .5 19c0-2.2 1.8-4 4-4H7Z" />
      <path d="m14 10-4 4" />
    </motion.svg>
  )
}
