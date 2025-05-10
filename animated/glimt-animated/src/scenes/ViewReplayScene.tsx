import { motion } from 'framer-motion';

export default function ViewReplayScene() {
  return (
    <motion.div
      key="viewReplay"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="text-center bg-gray-800 p-6 rounded"
    >
      <p>Session Replay UI</p>
      <p className="mt-2 italic">User stuck on submit button...</p>
    </motion.div>
  );
} 