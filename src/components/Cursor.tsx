import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Cursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
  };

  return (
    <>
      <motion.div
        className="cursor"
        variants={variants}
        animate="default"
        transition={{ type: 'spring', stiffness: 1000, damping: 28 }}
      />
      <div className="cursor-trail" style={{ left: mousePosition.x, top: mousePosition.y }} />
    </>
  );
};

export default Cursor;