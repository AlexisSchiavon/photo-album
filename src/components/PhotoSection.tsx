import React from 'react';
import { motion } from 'framer-motion';

interface PhotoSectionProps {
  date: string;
  text: string;
  imageUrl: string;
}

const PhotoSection: React.FC<PhotoSectionProps> = ({ date, text, imageUrl }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl w-full bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden transform-style-3d"
    >
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="p-6 bg-teal-600 bg-opacity-70 text-white text-center"
      >
        <h2 className="text-3xl font-semibold">{date}</h2>
      </motion.div>
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="relative h-[60vh] overflow-hidden"
      >
        <img src={imageUrl} alt={text} className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
      </motion.div>
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="p-8 bg-white bg-opacity-10 backdrop-blur-md"
      >
        <p className="text-2xl text-center italic text-white">{text}</p>
      </motion.div>
    </motion.div>
  );
};

export default PhotoSection;