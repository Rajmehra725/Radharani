'use client';
import React, { useState } from 'react';
import { motion , AnimatePresence } from 'framer-motion';

export default function GameHUD({
  stage, setStage, japCount, flowers, score, doJap, offerFlower, setBgMusicOn, resetGame
}: any) {
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const quizQuestions = [
    { q: 'राधा-कृष्ण प्रेम का मूल क्या है?', a: ['भाव', 'स्वार्थ', 'दिखावा', 'धन'], correct: 0 },
    { q: 'राधा नाम जपने से मन क्या होता है?', a: ['पवित्र', 'घबराना', 'भ्रामक', 'अलिप्त'], correct: 0 },
  ];

  const handleAnswer = (idx:number, choice:number) => {
    if (choice === quizQuestions[idx].correct) {
      setQuizScore((s) => s + 1);
    }
    if (idx === quizQuestions.length - 1) {
      // end quiz - award score
      setTimeout(() => {
        setQuizOpen(false);
        // unlock next stage
        setStage((s:any) => Math.max(s, 4));
      }, 800);
    }
  };

  return (
    <>
      {/* top-right HUD */}
      <div className="fixed top-6 right-6 z-30 flex flex-col gap-4">
        <div className="card-glass px-4 py-2 rounded-xl text-sm">
          <div className="font-semibold">भक्ति ऊर्जा: {score}</div>
          <div className="text-xs text-pink-200">जप: {japCount} • फूल: {flowers}</div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setStage(1)} className="px-3 py-2 rounded bg-white/6">नाम जपो</button>
          <button onClick={() => setStage(2)} className="px-3 py-2 rounded bg-white/6">फूल अर्पण</button>
          <button onClick={() => setQuizOpen(true)} className="px-3 py-2 rounded bg-white/6">प्रश्न</button>
          <button onClick={() => setStage(4)} className="px-3 py-2 rounded bg-white/6">रास लीला</button>
        </div>

        <div className="card-glass px-3 py-2 rounded-xl text-sm flex gap-2 items-center">
          <button onClick={() => setBgMusicOn((s:any)=>!s)} className="px-2 py-1 rounded bg-white/8">🔊</button>
          <button onClick={resetGame} className="px-2 py-1 rounded bg-white/8">↺ reset</button>
        </div>
      </div>

      {/* quiz modal */}
      <AnimatePresence>
        {quizOpen && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
            <motion.div initial={{ scale:0.9 }} animate={{ scale:1 }} className="bg-white/5 p-6 rounded-xl backdrop-blur-md">
              <h3 className="text-xl font-semibold mb-2">📿 प्रेम का प्रश्न</h3>
              {quizQuestions.map((qq, i) => (
                <div key={i} className="mb-3">
                  <div className="font-medium">{qq.q}</div>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {qq.a.map((ans, ai) => (
                      <button key={ai} onClick={() => handleAnswer(i, ai)} className="px-3 py-1 rounded bg-white/6">{ans}</button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="text-sm text-pink-200">सही उत्तर: {quizScore}</div>
              <div className="mt-4 flex justify-end">
                <button onClick={() => setQuizOpen(false)} className="px-4 py-2 rounded bg-white/10">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
