import React from 'react';
import { motion } from 'framer-motion';

interface IntroSectionProps {
  onStart: () => void;
}

const IntroSection: React.FC<IntroSectionProps> = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl w-full bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden p-12 text-center"
    >
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl font-bold mb-6"
      >
        Welcome to Our Love Story
      </motion.h2>
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-xl mb-8"
      >
        Embark on a journey through our most cherished moments together. This interactive album is a testament to our love and the beautiful memories we've created.
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="bg-white text-teal-800 px-8 py-3 rounded-full text-xl font-semibold transition-all duration-300 hover:bg-teal-100"
      >
        Begin Our Journey
      </motion.button>
    </motion.div>
  );
};

export default IntroSection;