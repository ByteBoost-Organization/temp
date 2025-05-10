import { motion } from 'framer-motion';

export default function PostToSlackScene() {
  return (
    <motion.div
      key="postToSlack"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center bg-gray-900 p-4 rounded"
    >
      <p>Posted to <code>#bugs</code> in Slack 💬</p>
    </motion.div>
  );
} 