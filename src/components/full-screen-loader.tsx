import { motion } from 'framer-motion'

export function FullScreenLoader() {
  return (
    <div className="h-screen fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 105 50"
        className="w-28"
        aria-labelledby="mindflow-logo-title"
      >
        <title id="mindflow-logo-title">Logo da Mindflow</title>
        <motion.path
          d="M7.69771 5.46217C3.15515 7.16541 -1.18552 18.0426 7.49716 24.1979C16.5854 30.6406 25.473 12.8676 31.398 2.5C33.6693 4.771 39.3425 19.7546 43.7863 24.1979C52.7966 33.207 59.5422 12.8676 68.4298 12.8676C77.3174 12.8676 80.28 25.2346 89.1676 24.7163C96.574 24.7163 96.574 12.8676 102.499 9.90542"
          fill="none"
          stroke="#2dd4bf"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      </motion.svg>
    </div>
  )
}
