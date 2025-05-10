import { motion } from 'framer-motion';

export default function CommentScene() {
  return (
    <motion.div
      key="comment"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center bg-gray-900 p-4 rounded border"
    >
      <p>Comment: <em>"Submit button stuck on loading."</em></p>
    </motion.div>
  );
} 