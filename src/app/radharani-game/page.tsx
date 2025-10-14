'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Sparkles } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Howl } from 'howler';

/*
  Radharani Game - single page
  File: app/radharani-game/page.tsx
*/

import ThreeScene from './ThreeScene'; // component below
import GameHUD from './GameHUD';       // component below

export default function RadharaniGamePage() {
  // game state
  const [stage, setStage] = useState<number>(0); // 0=intro overlay, 1=Naam Jap, 2=Flower, 3=Quiz, 4=Raas, 5=Blessing
  const [japCount, setJapCount] = useState<number>(0);
  const [flowers, setFlowers] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [bgMusicOn, setBgMusicOn] = useState<boolean>(true);

  // background bansuri loop using howler
  const bansuri = useMemo(() => new Howl({ src: ['/audio/bansuri-loop.mp3'], loop: true, volume: 0.4 }), []);
  useEffect(() => {
    if (bgMusicOn) bansuri.play().catch(()=>{});
    else bansuri.pause();
    return () => { bansuri.stop(); };
  }, [bgMusicOn, bansuri]);

  // load saved progress (client only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const s = localStorage.getItem('r_game_stage');
      const j = Number(localStorage.getItem('r_game_jap') || 0);
      const f = Number(localStorage.getItem('r_game_flowers') || 0);
      if (s) setStage(Number(s));
      setJapCount(j);
      setFlowers(f);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('r_game_stage', String(stage));
      localStorage.setItem('r_game_jap', String(japCount));
      localStorage.setItem('r_game_flowers', String(flowers));
    }
  }, [stage, japCount, flowers]);

  // confetti when achieving milestones
  useEffect(() => {
    if (japCount === 108) {
      confetti({ particleCount: 180, spread: 120, colors: ['#ffd6ea','#fff2cc','#ffb6d2'] });
      setStage((s) => Math.max(s, 2)); // unlock flower stage
    }
  }, [japCount]);

  useEffect(() => {
    if (flowers >= 5) {
      confetti({ particleCount: 120, spread: 90, colors: ['#ffd6ea','#ffb6d2'] });
      setStage((s) => Math.max(s, 3)); // unlock quiz
    }
  }, [flowers]);

  // small helper functions
  const doJap = () => {
    setJapCount((c) => Math.min(108, c + 1));
    setScore((s) => s + 1);
    const click = new Howl({ src: ['/audio/jap-click.mp3'], volume: 0.7 });
    click.play();
  };

  const offerFlower = () => {
    setFlowers((f) => f + 1);
    setScore((s) => s + 10);
    confetti({ particleCount: 50, spread: 60, colors: ['#fff2cc', '#ffd6ea'] });
  };

  // reset
  const resetGame = () => {
    setStage(0);
    setJapCount(0);
    setFlowers(0);
    setScore(0);
    localStorage.removeItem('r_game_stage');
    localStorage.removeItem('r_game_jap');
    localStorage.removeItem('r_game_flowers');
  };

  return (
    <div className="min-h-screen w-full relative">
      {/* 3D canvas on full screen */}
      <Canvas className="fixed inset-0 z-0" camera={{ position: [0, 1.6, 6], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <ThreeScene stage={stage} japCount={japCount} flowers={flowers} />
        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>

      {/* sparkles / floating particles UI layer */}
      <div className="pointer-events-none fixed inset-0 z-10">
        <Sparkles count={40} size={6} color={'#ffd6ea'} />
      </div>

      {/* Intro overlay */}
      <AnimatePresence>
        {stage === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 px-6"
          >
            <div className="max-w-2xl text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold glow-gold mb-4">✨ द्वापर युग का प्रेम — कलियुग के दिलों तक ✨</h1>
              <p className="text-pink-200 mb-6">एक interactive भक्ति अनुभव — राधारानी के प्रेम में लीन हो जाइये।</p>

              <div className="flex justify-center gap-4">
                <button onClick={() => setStage(1)} className="px-6 py-3 rounded-full bg-gradient-to-r from-radha-pink to-[#ffd37a] text-vrind-bg font-semibold">
                  🌼 लीला प्रारंभ करें
                </button>
                <button onClick={() => { setBgMusicOn((s) => !s); }} className="px-4 py-3 rounded-full bg-white/10">
                  {bgMusicOn ? '🔊 संगीत बंद करें' : '🔈 संगीत चालू करें'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HUD and Game controls (top right) */}
      <GameHUD
        stage={stage}
        setStage={setStage}
        japCount={japCount}
        flowers={flowers}
        score={score}
        doJap={doJap}
        offerFlower={offerFlower}
        setBgMusicOn={setBgMusicOn}
        resetGame={resetGame}
      />

      {/* Bottom center instructional bar */}
      <div className="fixed bottom-6 left-0 right-0 z-20 flex justify-center">
        <div className="bg-white/6 px-6 py-3 rounded-full backdrop-blur-md text-sm text-pink-50 flex items-center gap-4 shadow-lg">
          <div className="font-semibold">Stage: {['Intro','Naam Jap','Flower','Quiz','Raas','Blessing'][Math.min(stage,5)]}</div>
          <div>Score: {score}</div>
        </div>
      </div>
    </div>
  );
}
