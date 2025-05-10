import { motion } from 'framer-motion';

export default function OpenGlimtScene() {
  return (
    <motion.div
      key="openGlimt"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center bg-gray-800 p-4 rounded"
    >
      <p className="text-lg">Navigating to <code>app.glimt.support</code></p>
    </motion.div>
  );
} 