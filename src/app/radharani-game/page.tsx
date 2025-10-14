'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function RadharaniGame() {
  const [level, setLevel] = useState(1);
  const [coins, setCoins] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);

  // Background devotional music
  useEffect(() => {
    const audio = new Audio('/audio/bhakti-song.mp3');
    audio.loop = true;
    audio.play();
    return () => audio.pause();
  }, []);

  // Quiz Level Questions
  const quizQuestions = [
    { q: 'Radharani ka prem kis par tha?', options: ['Krishna', 'Balaram', 'Indra'], answer: 'Krishna' },
    { q: 'Radharani ka favorite color?', options: ['Blue', 'Yellow', 'Pink'], answer: 'Pink' },
    { q: 'Radharani ka janm kaha hua?', options: ['Vrindavan', 'Mathura', 'Ayodhya'], answer: 'Vrindavan' },
    { q: 'Radharani ke bhakti ka pramukh sandesh?', options: ['Prem', 'Tyag', 'Daya'], answer: 'Prem' },
    { q: 'Radharani ka favorite flower?', options: ['Lotus', 'Rose', 'Tulip'], answer: 'Lotus' },
  ];

  // Handle Quiz Answer
  const handleQuiz = (option: string) => {
    if (option === quizQuestions[quizIndex].answer) {
      setCoins(coins + 2);
      confetti({ particleCount: 50, spread: 70 });
    }
    if (quizIndex + 1 < quizQuestions.length) setQuizIndex(quizIndex + 1);
    else setLevel(2);
  };

  // Next Level Function
  const nextLevel = () => setLevel(level + 1);

  // Floating Petals Component
  const FloatingPetals = () => (
    <>
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-6 h-6 bg-pink-300 rounded-full opacity-80"
          initial={{ y: -50, x: Math.random() * 800 }}
          animate={{ y: 600, rotate: Math.random() * 360 }}
          transition={{ duration: 10 + Math.random()*5, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </>
  );

  // Game End Screen
  if (level > 6) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-200 to-purple-300 relative overflow-hidden">
        <FloatingPetals />
        <motion.h1 initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-4xl font-bold text-white mb-4">🌸 Radharani's Blessings 🌸</motion.h1>
        <p className="text-white text-2xl mb-4">Total Coins Collected: {coins}</p>
        <motion.div animate={{ rotate: [0, 10, -10, 10, -10, 0] }} className="text-7xl mb-4">💖</motion.div>
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-6xl">
          🌸🌸🌸
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-200 to-purple-300 relative overflow-hidden p-4">
      <FloatingPetals />
      <div className="absolute top-4 right-4 text-white font-bold text-xl">Coins: {coins}</div>
      <h1 className="text-3xl font-bold text-white mb-6">Level {level}</h1>

      {/* Level Render */}
      {level === 1 && (
        <div className="flex flex-col gap-4 w-full max-w-md">
          <h2 className="text-white text-xl mb-2">{quizQuestions[quizIndex].q}</h2>
          {quizQuestions[quizIndex].options.map((opt) => (
            <motion.button key={opt} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleQuiz(opt)} className="px-6 py-3 bg-white rounded-lg font-semibold shadow-md hover:bg-pink-100">
              {opt}
            </motion.button>
          ))}
        </div>
      )}

      {level === 2 && (
        <div className="text-white text-xl">
          Memory Game Placeholder – Match Radharani & Krishna Images
          <button onClick={nextLevel} className="mt-4 px-4 py-2 bg-pink-100 rounded">Next Level</button>
        </div>
      )}

      {level === 3 && (
        <div className="text-white text-xl">
          Collect Coins Task Placeholder – Click floating coin images
          <button onClick={nextLevel} className="mt-4 px-4 py-2 bg-pink-100 rounded">Next Level</button>
        </div>
      )}

      {level === 4 && (
        <div className="text-white text-xl">
          Puzzle Task Placeholder – Drag & Drop Radharani Image
          <button onClick={nextLevel} className="mt-4 px-4 py-2 bg-pink-100 rounded">Next Level</button>
        </div>
      )}

      {level === 5 && (
        <div className="text-white text-xl">
          Story Choice Task Placeholder – Interactive Bhakti Story
          <button onClick={nextLevel} className="mt-4 px-4 py-2 bg-pink-100 rounded">Next Level</button>
        </div>
      )}

      {level === 6 && (
        <div className="text-white text-xl">
          Final Blessing Animation Placeholder – Radharani Dance/GIF + Confetti
          <button onClick={nextLevel} className="mt-4 px-4 py-2 bg-pink-100 rounded">Finish Game</button>
        </div>
      )}
    </div>
  );
}
