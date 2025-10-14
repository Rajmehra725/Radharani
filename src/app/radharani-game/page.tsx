'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

type LevelType = {
  type: 'quiz' | 'memory' | 'collect' | 'puzzle' | 'story' | 'dance';
  title: string;
  content?: any;
  coins: number;
};

const levels: LevelType[] = [
  { type: 'quiz', title: 'Radharani Quiz', coins: 10, content: [
    { question: 'Radharani ka prem kis par tha?', options: ['Krishna', 'Balaram', 'Indra'], answer: 'Krishna' },
    { question: 'Radharani ka favorite color?', options: ['Blue', 'Yellow', 'Pink'], answer: 'Pink' },
    { question: 'Radharani ka janm kaha hua?', options: ['Vrindavan', 'Mathura', 'Ayodhya'], answer: 'Vrindavan' },
    { question: 'Radharani ke bhakti ka pramukh sandesh?', options: ['Prem', 'Tyag', 'Daya'], answer: 'Prem' },
    { question: 'Radharani ka favorite flower?', options: ['Lotus', 'Rose', 'Tulip'], answer: 'Lotus' },
  ] },
  { type: 'memory', title: 'Memory Game', coins: 15 },
  { type: 'collect', title: 'Collect Coins', coins: 20 },
  { type: 'puzzle', title: 'Radharani Puzzle', coins: 25 },
  { type: 'story', title: 'Story Choice', coins: 15 },
  { type: 'dance', title: 'Radharani Blessing', coins: 30 },
];

export default function Home() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [coins, setCoins] = useState(0);
  const [quizQuestion, setQuizQuestion] = useState(0);

  const currentLevel = levels[levelIndex];

  const handleQuizAnswer = (option: string) => {
    if (option === currentLevel.content[quizQuestion].answer) {
      setCoins(coins + 2); // 2 coins per correct answer
      confetti({ particleCount: 50, spread: 70 });
    }
    if (quizQuestion + 1 < currentLevel.content.length) {
      setQuizQuestion(quizQuestion + 1);
    } else {
      nextLevel();
    }
  };

  const nextLevel = () => {
    setLevelIndex(levelIndex + 1);
    setQuizQuestion(0);
  };

  // Game End Screen
  if (levelIndex >= levels.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-200 to-purple-300">
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-4xl font-bold text-white mb-4"
        >
          🌸 Radharani's Blessings 🌸
        </motion.h1>
        <p className="text-white text-2xl mb-4">Total Coins Collected: {coins}</p>
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
          className="text-7xl mb-4"
        >
          💖
        </motion.div>
      </div>
    );
  }

  // Level Rendering
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-200 to-purple-300 p-4">
      <div className="absolute top-4 right-4 text-white font-bold text-xl">Coins: {coins}</div>
      <h1 className="text-3xl font-bold text-white mb-6">{currentLevel.title}</h1>

      {currentLevel.type === 'quiz' && (
        <div className="flex flex-col gap-4 w-full max-w-md">
          <h2 className="text-white text-xl mb-2">{currentLevel.content[quizQuestion].question}</h2>
          {currentLevel.content[quizQuestion].options.map((opt: string) => (
            <motion.button
              key={opt}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuizAnswer(opt)}
              className="px-6 py-3 bg-white rounded-lg font-semibold shadow-md hover:bg-pink-100"
            >
              {opt}
            </motion.button>
          ))}
        </div>
      )}

      {currentLevel.type === 'memory' && (
        <div className="text-white text-xl">Memory Game Placeholder (Add Images of Radharani & Krishna)</div>
      )}

      {currentLevel.type === 'collect' && (
        <div className="text-white text-xl">Collect Coins Task Placeholder (Floating coins animation)</div>
      )}

      {currentLevel.type === 'puzzle' && (
        <div className="text-white text-xl">Puzzle Task Placeholder (Drag & Drop Radharani image)</div>
      )}

      {currentLevel.type === 'story' && (
        <div className="text-white text-xl">Story Choice Task Placeholder (Interactive Story)</div>
      )}

      {currentLevel.type === 'dance' && (
        <div className="text-white text-xl">Dance / Blessing Animation Placeholder (Final Level)</div>
      )}
    </div>
  );
}
