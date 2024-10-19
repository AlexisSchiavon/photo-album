import React from 'react';
import { motion } from 'framer-motion';

interface PhotoSectionProps {
  date: string;
  text: string;
  imageUrl?: string;
  imageUrls?: string[];
}

const PhotoSection: React.FC<PhotoSectionProps> = ({ date, text, imageUrl, imageUrls }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[600px] bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden flex flex-col"
    >
      <div className="p-4 flex-shrink-0">
        <h2 className="text-2xl font-bold mb-2">{date}</h2>
        <p className="text-lg mb-4">{text}</p>
      </div>
      <div className="flex-grow overflow-auto">
        {imageUrl ? (
          <div className="w-full h-full flex items-center justify-center">
            <img src={imageUrl} alt={text} className="max-w-full max-h-full w-auto h-auto" />
          </div>
        ) : imageUrls ? (
          <div className="w-full h-full flex">
            <div className="w-1/2 h-full flex items-center justify-center">
              <img src={imageUrls[0]} alt={`${text} 1`} className="max-w-full max-h-full w-auto h-auto" />
            </div>
            <div className="w-1/2 h-full flex items-center justify-center">
              <img src={imageUrls[1]} alt={`${text} 2`} className="max-w-full max-h-full w-auto h-auto" />
            </div>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default PhotoSection;
