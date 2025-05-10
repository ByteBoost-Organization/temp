import { motion } from 'framer-motion';
import MockBrowser from '../MockBrowser';
import Cursor from '../components/Cursor';
import { useEffect, useState } from 'react';

const JANE_DOE_POS = { x: 320, y: 170 };
const NEW_TAB_POS = { x: 900, y: 40 };

export default function ChatScene() {
  const [cursorStep, setCursorStep] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (cursorStep === 0) {
      const t = setTimeout(() => setCursorStep(1), 1000);
      return () => clearTimeout(t);
    }
    if (cursorStep === 1) {
      // Simulate copy
      const t = setTimeout(() => {
        setCopied(true);
        setCursorStep(2);
      }, 800);
      return () => clearTimeout(t);
    }
    if (cursorStep === 2) {
      // Move to new tab
      const t = setTimeout(() => setCursorStep(3), 1200);
      return () => clearTimeout(t);
    }
    if (cursorStep === 3) {
      // Simulate click on new tab
      const t = setTimeout(() => setCursorStep(4), 600);
      return () => clearTimeout(t);
    }
  }, [cursorStep]);

  // Cursor position logic
  let cursorPos = { x: 80, y: 300 };
  if (cursorStep === 1 || cursorStep === 2) cursorPos = JANE_DOE_POS;
  if (cursorStep >= 3) cursorPos = NEW_TAB_POS;

  return (
    <div style={{ position: 'relative', width: 1000, margin: '0 auto' }}>
      <MockBrowser
        tabs={[{
          title: 'Support',
          content: (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="text-center p-4 border rounded bg-gray-800 w-[500px]"
            >
              <p className="text-sm text-gray-400 mb-2">
                User: <span style={{ background: copied ? '#a7f3d0' : undefined, transition: 'background 0.3s' }}>Jane Doe</span>
              </p>
              <p className="text-lg italic">"Yeah I tried logging in and then I refreshed and... something blinked."</p>
            </motion.div>
          ),
        }]}
      />
      <Cursor x={cursorPos.x} y={cursorPos.y} animate clicking={cursorStep === 3} />
    </div>
  );
} 