import React from 'react';
import { HiCursorClick } from 'react-icons/hi';
import { PiCursorFill } from 'react-icons/pi';

interface CursorProps {
  x: number;
  y: number;
  animate?: boolean;
  clicking?: boolean;
  style?: React.CSSProperties;
}

const Cursor: React.FC<CursorProps> = ({ x, y, animate = false, clicking = false, style }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        pointerEvents: 'none',
        transition: animate ? 'left 0.2s cubic-bezier(0.4,0,0.2,1), top 0.2s cubic-bezier(0.4,0,0.2,1)' : undefined,
        zIndex: 9999,
        ...style,
      }}
    >
      {clicking ? (
        <HiCursorClick size={48} color="black" style={{ display: 'block' }} />
      ) : (
        <PiCursorFill size={48} color="black" style={{ display: 'block' }} />
      )}
    </div>
  );
};

export default Cursor; 