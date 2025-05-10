import { motion } from 'framer-motion';

export default function SearchSessionScene() {
  return (
    <motion.div
      key="searchSession"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center p-4 bg-gray-700 rounded"
    >
      <p>Searching session by user email...</p>
    </motion.div>
  );
} 