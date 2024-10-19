import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuestionSectionProps {
  questions: string[];
}

const QuestionSection: React.FC<QuestionSectionProps> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const nextQuestion = () => {
    setCurrentQuestion((prev) => (prev < questions.length - 1 ? prev + 1 : prev));
  };

  const prevQuestion = () => {
    setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl w-full bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-2xl p-8"
    >
      <h2 className="text-4xl font-bold mb-8 text-white text-center">Preguntas para nuestro futuro</h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-teal-50 bg-opacity-20 backdrop-blur-md p-6 rounded-xl shadow-md"
        >
          <p className="text-2xl text-white mb-4 text-center">{questions[currentQuestion]}</p>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-between mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="bg-white text-teal-800 px-6 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextQuestion}
          disabled={currentQuestion === questions.length - 1}
          className="bg-white text-teal-800 px-6 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuestionSection;