'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import ProtectedRoute from '@/Components/ProtectedRoute';
import Radharani from '@/Components/RadharaniBhavishyavani/page';

/* ---------- Mandala Animation ---------- */
function Mandala({ size = 320 }: { size?: number }) {
  return (
    <motion.div
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
      className="flex items-center justify-center"
    >
      <svg viewBox="0 0 200 200" width={size} height={size} className="opacity-90">
        <defs>
          <radialGradient id="g1">
            <stop offset="0%" stopColor="#fff7e0" />
            <stop offset="100%" stopColor="#ffd6ea" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="80" fill="url(#g1)" />
        <g transform="translate(100,100)">
          {[...Array(12)].map((_, i) => (
            <g key={i} transform={`rotate(${i * 30}) translate(60,0)`}>
              <ellipse rx="10" ry="4" fill="#ffffff" opacity="0.6" />
            </g>
          ))}
        </g>
      </svg>
    </motion.div>
  );
}

/* ---------- Bhajan Player ---------- */
function BhajanPlayer({
  title,
  src,
  onPlayChange,
}: {
  title: string;
  src: string;
  onPlayChange?: (p: boolean) => void;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      onPlayChange?.(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
        onPlayChange?.(true);
      } catch (e) {
        console.warn('Playback blocked:', e);
      }
    }
  };

  return (
    <div className="p-4 rounded-xl bg-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
      <div>
        <div className="font-semibold text-yellow-300">{title}</div>
        <div className="text-sm text-pink-200">Soft bhajan — listen with devotion</div>
      </div>
      <button
        onClick={toggle}
        className="px-4 py-2 rounded-full bg-gradient-to-r from-radha-pink to-[#ffd37a] text-black font-semibold"
      >
        {playing ? '⏸️ Stop' : '▶️ Play'}
      </button>
    </div>
  );
}

/* ---------- Main Vrindavan Page ---------- */
export default function VrindavanHome() {
  const [introDone, setIntroDone] = useState(false);
  const [flowersOffered, setFlowersOffered] = useState(0);
  const [showBlessing, setShowBlessing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [japCount, setJapCount] = useState<number>(0);

  const { scrollYProgress } = useScroll();
  const zoom = useTransform(scrollYProgress, [0, 0.25], [1, 1.05]);

  const slides = [
    { title: 'माखन चोरी', img: '/images/leela1.webp', text: 'नटखट कान्हा की माखन लीला।' },
    { title: 'रासलीला', img: '/images/leela2.jpg', text: 'रह-रह के मन में रस भर दे।' },
    { title: 'विरह', img: '/images/leela3.jpg', text: 'विरह में भी प्रेम की गूँज।' },
    { title: 'मुरली वादन', img: '/images/leela4.webp', text: 'मुरली की तान से जीवन मधुर।' },
  ];

  /* Jap Counter */
  const handleJap = () => {
    if (japCount < 108) setJapCount((c) => c + 1);
    const a = new Audio('/audio/jap-click.mp3');
    a.play().catch(() => {});
    if (japCount >= 107) {
      confetti({ particleCount: 200, spread: 90, colors: ['#ffd6ea', '#fff2cc'] });
      setShowBlessing(true);
    }
  };

  const handleOfferFlower = () => {
    setFlowersOffered((f) => f + 1);
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      gravity: 0.6,
      colors: ['#ffd6ea', '#fff2cc', '#ffb6d2'],
    });
  };

  return (
    <ProtectedRoute>
      <Radharani />
      <motion.div
        style={{ scale: zoom }}
        className="min-h-screen bg-gradient-to-b from-[#0b1020] via-[#0d2233] to-[#0b1020] text-white overflow-x-hidden"
      >
        {/* ---------- Intro Section ---------- */}
        <AnimatePresence>
          {!introDone && (
            <motion.section
              className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-black/70 via-pink-900/40 to-black/80 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div className="text-center px-6">
                <motion.h1
                  className="text-3xl md:text-5xl font-bold glow-gold"
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  ✨ द्वापर युग का प्रेम — कलियुग के दिलों तक ✨
                </motion.h1>
                <p className="mt-4 text-pink-200 italic">
                  शुद्ध प्रेम की यात्रा — अब शुरू होती है।
                </p>
                <motion.button
                  onClick={() => setIntroDone(true)}
                  whileHover={{ scale: 1.05 }}
                  className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-radha-pink to-[#ffd37a] text-black font-bold shadow-lg"
                >
                  🌼 दर्शन प्रारंभ करें
                </motion.button>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ---------- Main Content ---------- */}
        {introDone && (
          <main className="pt-20 space-y-20">
            {/* Radha Rani Section */}
            <section className="text-center px-4 flex flex-col items-center">
              <motion.img
                src="/images/radha.jpeg"
                alt="Radha"
                className="w-48 md:w-64 h-48 md:h-64 rounded-full border-4 border-pink-200 shadow-xl"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
              />
              <h2 className="text-3xl md:text-4xl mt-6 font-bold text-yellow-200">
                🌸 राधा रानी दर्शन 🌸
              </h2>
              <p className="text-pink-200 mt-2 max-w-xl">
                “राधे नाम जप कर मन पावन करो — प्रेम की लहरें भीतर तक बहेंगी।”
              </p>
            </section>

            {/* Jap Section */}
            <section className="text-center px-4">
              <h3 className="text-2xl md:text-3xl font-bold glow-gold mb-4">
                🧘 भक्ति ध्यान — राधे नाम जपो
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <Mandala size={260} />
                <div className="space-y-4">
                  <button
                    onClick={handleJap}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-radha-pink to-[#ffd37a] text-black font-bold shadow-lg"
                  >
                    💖 राधे नाम जपो
                  </button>
                  <div className="text-lg text-yellow-300">
                    गिनती: {japCount} / 108
                  </div>
                  <button
                    onClick={() => setJapCount(0)}
                    className="underline text-sm text-pink-200"
                  >
                    रीसेट करें
                  </button>
                  <button
                    onClick={handleOfferFlower}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-radha-pink to-[#ffd37a] text-black font-bold shadow-lg"
                  >
                    🌸 फूल चढ़ाएँ ({flowersOffered})
                  </button>
                </div>
              </div>
            </section>

            {/* Bhakti Leela Carousel */}
            <section className="text-center px-4">
              <h3 className="text-2xl md:text-3xl font-bold glow-gold mb-6">
                🎠 भक्ति लीला
              </h3>
              <div className="relative max-w-3xl mx-auto">
                <motion.img
                  src={slides[currentSlide].img}
                  alt={slides[currentSlide].title}
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 1.5 }}
                />
                <div className="absolute bottom-4 left-4 bg-black/40 p-3 rounded-xl">
                  <h4 className="text-xl text-yellow-300 font-semibold">
                    {slides[currentSlide].title}
                  </h4>
                  <p className="text-pink-100 text-sm">{slides[currentSlide].text}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() =>
                      setCurrentSlide((s) => (s - 1 + slides.length) % slides.length)
                    }
                    className="px-3 py-1 bg-white/10 rounded"
                  >
                    ⬅️
                  </button>
                  <button
                    onClick={() => setCurrentSlide((s) => (s + 1) % slides.length)}
                    className="px-3 py-1 bg-white/10 rounded"
                  >
                    ➡️
                  </button>
                </div>
              </div>
            </section>

            {/* Bhajans */}
            <section className="text-center px-4">
              <h3 className="text-2xl md:text-3xl font-bold glow-gold mb-6">
                🎶 प्रेम रस भजन
              </h3>
              <div className="max-w-2xl mx-auto space-y-4">
                <BhajanPlayer title="Barsane Wali Radhe" src="/audio/barsane.mp3" />
                <BhajanPlayer title="Radhe Radhe Govinda Gopal" src="/audio/radhe-govinda.mp3" />
              </div>
            </section>

            {/* Blessing */}
            {showBlessing && (
              <section className="text-center px-4">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold glow-gold mb-4"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  🌈 राधारानी आशीर्वाद 🌈
                </motion.h2>
                <p className="text-yellow-200 max-w-lg mx-auto">
                  “आपका हर कर्म प्रेममय हो — यही राधारानी का सच्चा आशीर्वाद है।” 💫
                </p>
              </section>
            )}
          </main>
        )}
      </motion.div>
    </ProtectedRoute>
  );
}
