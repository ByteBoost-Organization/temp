import { motion } from 'framer-motion';

export default function RespondToUserScene() {
  return (
    <motion.div
      key="respondToUser"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center bg-gray-800 p-4 rounded"
    >
      <p>Support agent: "Thanks! I've sent it to our dev team."</p>
    </motion.div>
  );
} 