import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PhotoMuralProps {
  photos: string[];
}

const PhotoMural: React.FC<PhotoMuralProps> = ({ photos }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      container.style.setProperty('--mouse-x', `${x}`);
      container.style.setProperty('--mouse-y', `${y}`);
    };

    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl w-full mt-16 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-2xl p-8 perspective-1000"
    >
      <h2 className="text-4xl font-bold mb-8 text-white text-center">Our Photo Mural</h2>
      <div className="grid grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, zIndex: 1 }}
            className="relative overflow-hidden rounded-lg shadow-lg aspect-square photo-card"
          >
            <img
              src={photo}
              alt={`Mural photo ${index + 1}`}
              className="w-full h-full object-cover transition-all duration-300 transform hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-60 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PhotoMural;