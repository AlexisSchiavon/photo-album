import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import PhotoSection from './components/PhotoSection';
import QuestionSection from './components/QuestionSection';
import PhotoMural from './components/PhotoMural';
import IntroSection from './components/IntroSection';
import BackgroundParticles from './components/BackgroundParticles';
import AudioPlayer from './components/AudioPlayer';
import Cursor from './components/Cursor';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(-1);
  const [direction, setDirection] = useState(0);

  const photoSections = [
    { date: '2023-01-15', text: 'Our first date', imageUrl: 'https://images.unsplash.com/photo-1522264766891-6d72d7b6a01c?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { date: '2023-02-14', text: 'Valentine\'s Day picnic', imageUrl: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { date: '2023-03-20', text: 'Spring hike adventure', imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    // Add 10 more photo sections here to reach a total of 13
  ];

  const questions = [
    'What\'s your favorite memory of us?',
    'Where do you see us in 5 years?',
    'What\'s one thing you\'d like us to learn together?',
    // Add more questions here
  ];

  const nextSection = () => {
    setDirection(1);
    setCurrentSection((prev) => (prev < photoSections.length + 1 ? prev + 1 : prev));
  };

  const prevSection = () => {
    setDirection(-1);
    setCurrentSection((prev) => (prev > -1 ? prev - 1 : prev));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSection();
      if (e.key === 'ArrowLeft') prevSection();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -15 : 15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? -15 : 15,
    }),
  };

  const pageTransition = {
    type: 'tween',
    duration: 0.8,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-teal-600 text-white flex flex-col items-center justify-center overflow-hidden relative">
      <Cursor />
      <BackgroundParticles />
      <AudioPlayer />
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-6xl font-bold mb-12 text-white relative z-10"
      >
        Our Love Story
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute -right-12 top-0"
        >
          <Heart size={48} fill="white" />
        </motion.span>
      </motion.h1>
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={currentSection}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={pageTransition}
          className="w-full flex justify-center items-center perspective-1000"
        >
          {currentSection === -1 ? (
            <IntroSection onStart={nextSection} />
          ) : currentSection < photoSections.length ? (
            <PhotoSection
              date={photoSections[currentSection].date}
              text={photoSections[currentSection].text}
              imageUrl={photoSections[currentSection].imageUrl}
            />
          ) : currentSection === photoSections.length ? (
            <PhotoMural photos={photoSections.map(section => section.imageUrl)} />
          ) : (
            <QuestionSection questions={questions} />
          )}
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-between w-full max-w-4xl mt-12 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSection}
          disabled={currentSection === -1}
          className="bg-white text-teal-800 px-6 py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSection}
          disabled={currentSection === photoSections.length + 1}
          className="bg-white text-teal-800 px-6 py-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>
    </div>
  );
};

export default App;