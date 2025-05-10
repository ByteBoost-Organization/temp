import { motion } from 'framer-motion';

export default function CopyEmailScene() {
  return (
    <motion.div
      key="copyEmail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center bg-gray-900 p-4 rounded border"
    >
      <p>Copied user email: <strong>jane.doe@example.com</strong></p>
    </motion.div>
  );
} 