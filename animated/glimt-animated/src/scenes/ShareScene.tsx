import { motion } from 'framer-motion';

export default function ShareScene() {
  return (
    <motion.div
      key="share"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center bg-gray-800 p-4 rounded"
    >
      <p>Session marked public & link copied ✅</p>
    </motion.div>
  );
} 