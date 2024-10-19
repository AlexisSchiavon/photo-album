import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import PhotoSection from './components/PhotoSection';
import QuestionSection from './components/QuestionSection';
import PhotoMural from './components/PhotoMural';
import IntroSection from './components/IntroSection';
import BackgroundParticles from './components/BackgroundParticles';
import AudioPlayer from './components/AudioPlayer';
import foto1 from './assets/images/1.jpeg';
import foto2 from './assets/images/2.jpeg';
import foto3 from './assets/images/3.jpeg';
import foto4 from './assets/images/4.jpeg';
import foto5 from './assets/images/5.jpeg';
import foto6 from './assets/images/6.jpeg';
import foto7 from './assets/images/7.jpeg';
import foto8 from './assets/images/8.jpeg';
import foto9 from './assets/images/9.jpeg';
import foto10 from './assets/images/10.jpeg';
import foto11 from './assets/images/11.jpeg';
import foto12 from './assets/images/12.jpeg';
import foto13 from './assets/images/13.jpeg';
import foto14 from './assets/images/14.jpeg';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(-1);
  const [direction, setDirection] = useState(0);

  const photoSections = [
    { date: '2023-08-04', text: 'Aunque a ti no te guste, a mi me encanta tu carita hermosa y siempre te tomaré capturas de tus caritas preciosas', imageUrl: foto1 },
    { date: '2023-09-15', text: 'Me gustaría despertar cada día y poder verte así', imageUrl: foto2 },
    { date: '2023-11-24', text: 'Me encanta que podamos hacer cosas chistinas juntos', imageUrls: [foto3, foto4] },
    { date: '2023-12-?', text: 'De las mejores fiestas a las que he ido y porque gracias a ti haz podido hacer que disfrute bailar contigo', imageUrl: foto5 },
    { date: '2024-02-27', text: 'No sabes lo mucho que amé hacer esta alcancía y pintarla junto a ti', imageUrl: foto6 },
    { date: '2024-02-27', text: 'La foto que más representa por que me encantas y cómo inició todo', imageUrl: foto7 },
    { date: '2024-03-20', text: 'Todos los días que comemos juntos me hacen más feliz y me enseñan a disfrutar más los momentos junto a alguien que amo', imageUrl: foto8 },
    { date: '2024-04-04', text: 'Las fotos que más me encantan de ti son cuando sales tan espontanea y agradezco que te tomes el tiempo para mandarme tus fotos', imageUrl: foto9 },
    { date: '2024-05-23', text: 'Sin duda el regalo que más bonita y extravagante te ves', imageUrl: foto10 },
    { date: '2024-06-22', text: 'Cansaditos nos vemos más bonitos jsjsjs, y me encanta que te veas tan bonita', imageUrl: foto11 },
    { date: '2024-07-11', text: 'La mejor fiesta de cumpleaños que he tenido en mi vida entera y lo agradezco tanto porque me haces la persona mas feliz del mundo', imageUrl: foto12 },
    { date: '2024-09-30', text: 'Este es otro ejemplo de las fotos que más me encantan de ti por ser tan espontanea, por favor no dejes de enviarme estas fotos por lo que más quieras', imageUrl: foto13 },
    { date: '2024-10-16', text: 'Mi vida hermosa haciendo cada cosa y que me divierte de aquí a la luna, nunca cambies mamor', imageUrl: foto14 }
  ];

  const questions = [
    '¿Cuál es tu recuerdo favorito de nosotros?',
    '¿Dónde nos ves en 5 años?',
    '¿Qué es algo que te gustaría que aprendiéramos juntos?',
    // Agrega más preguntas aquí
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
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-teal-600 text-white flex flex-col items-center justify-center overflow-hidden relative p-4">
      <BackgroundParticles />
      <AudioPlayer />
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold mb-8 text-white relative z-10 flex items-center"
      >
        Nuestra Historia de Amor
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="ml-2"
        >
          <Heart size={32} fill="white" />
        </motion.span>
      </motion.h1>
      <div className="w-full max-w-4xl relative">
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={currentSection}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
            className="w-full"
          >
            {currentSection === -1 ? (
              <IntroSection onStart={nextSection} />
            ) : currentSection < photoSections.length ? (
              <PhotoSection
                date={photoSections[currentSection].date}
                text={photoSections[currentSection].text}
                imageUrl={photoSections[currentSection].imageUrl}
                imageUrls={photoSections[currentSection].imageUrls}
              />
            ) : currentSection === photoSections.length ? (
              <PhotoMural photos={photoSections.map(section => section.imageUrl || section.imageUrls?.[0] || '')} />
            ) : (
              <QuestionSection questions={questions} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-between w-full max-w-4xl mt-8 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSection}
          disabled={currentSection === -1}
          className="bg-white text-teal-800 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSection}
          disabled={currentSection === photoSections.length + 1}
          className="bg-white text-teal-800 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>
    </div>
  );
};

export default App;
