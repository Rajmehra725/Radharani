'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';
import Link from 'next/link';
import ProtectedRoute from '@/Components/ProtectedRoute';

/* ---------- Helper Components ---------- */

function Mandala({ size = 320 }: { size?: number }) {
  return (
    <motion.div
      className="mandala-wrap"
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
    >
      <svg viewBox="0 0 200 200" width={size} height={size} className="opacity-95">
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

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

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
    <div className="p-4 rounded-xl bg-white/5 flex items-center justify-between">
      <div>
        <div className="font-semibold text-yellow-300">{title}</div>
        <div className="text-sm text-pink-200">Soft bhajan — listen with devotion</div>
      </div>
      <button
        onClick={toggle}
        className="px-4 py-2 rounded bg-gradient-to-r from-radha-pink to-[#ffd37a]"
      >
        {playing ? '⏸️ Stop' : '▶️ Play'}
      </button>
    </div>
  );
}

/* ---------- Main Page Component ---------- */

export default function VrindavanHome() {
  const [introDone, setIntroDone] = useState(false);
  const [mandalaOpen, setMandalaOpen] = useState(false);
  const [flowersOffered, setFlowersOffered] = useState(0);
  const [showBlessing, setShowBlessing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [japCount, setJapCount] = useState<number>(0);
  const [bhajanPlaying, setBhajanPlaying] = useState(false);

  // Scroll transform for subtle zoom
  const { scrollYProgress } = useScroll();
  const zoom = useTransform(scrollYProgress, [0, 0.25], [1, 1.04]);

  const slides = [
    { title: 'माखन चोरी', img: '/images/leela1.webp', text: 'नटखट कान्हा की माखन लीला।' },
    { title: 'रासलीला', img: '/images/leela2.jpg', text: 'रह-रह के मन में रस भर दे।' },
    { title: 'राधा संग विरह', img: '/images/leela3.jpg', text: 'विरह में भी प्रेम की गूँज।' },
    { title: 'कृष्ण का बंसी वादन', img: '/images/leela4.webp', text: 'मुरली की तान से जीवन मधुर।' },
  ];

  useEffect(() => {
    localStorage.setItem('japCount', String(japCount));
    if (japCount >= 108) {
      confetti({ particleCount: 150, spread: 90, colors: ['#ffd6ea', '#fff2cc', '#ffb6d2'] });
      setTimeout(() => setShowBlessing(true), 600);
    }
  }, [japCount]);

  useEffect(() => {
    if (flowersOffered > 0 && flowersOffered % 3 === 0) {
      confetti({ particleCount: 80, spread: 70, colors: ['#ffd6ea', '#ffb6d2', '#fff2cc'] });
    }
    if (flowersOffered > 6) setShowBlessing(true);
  }, [flowersOffered]);

  const handleJap = () => {
    if (japCount < 108) setJapCount((c) => c + 1);
    try {
      const a = new Audio('/audio/jap-click.mp3');
      a.volume = 0.6;
      a.play().catch(() => {});
    } catch {}
  };

  const handleOfferFlower = () => {
    setFlowersOffered((f) => f + 1);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.4 },
      gravity: 0.6,
      scalar: 0.6,
      shapes: ['circle', 'square'],
      colors: ['#ffd6ea', '#ffb6d2', '#fff2cc'],
    });
  };

  return (
    <ProtectedRoute>
<motion.div style={{ scale: zoom }} className="relative min-h-screen bg-gradient-to-b from-[#0b1020] via-[#0d2233] to-[#0b1020] text-white overflow-x-hidden">
      {/* ---------- 1. Intro Overlay ---------- */}
      <AnimatePresence>
        {!introDone && (
          <motion.section
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-black/70 via-pink-900/40 to-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="absolute inset-0 bg-[url('/images/vrindavan-bg.webp')] bg-cover bg-center opacity-30" />
            <motion.div className="text-center z-10 px-6">
              <motion.h1
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="text-3xl md:text-5xl font-bold glow-gold"
              >
                ✨ द्वापर युग का प्रेम — कलियुग के दिलों तक ✨
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-4 text-pink-200 italic"
              >
                शुद्ध प्रेम की यात्रा — अब शुरू होती है।
              </motion.p>

              <div className="pointer-events-none relative h-40 mt-8">
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    style={{ left: `${10 + i * 8}%`, top: `${10 + (i % 3) * 8}%` }}
                    animate={{ y: [0, 260], opacity: [1, 0], rotate: [0, 180] }}
                    transition={{ duration: 10 + i, repeat: Infinity, delay: i * 0.3 }}
                  >
                    🌸
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={() => setIntroDone(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-radha-pink to-[#ffd37a] text-vrind-bg font-semibold shadow-xl"
              >
                🌼 दर्शन प्रारंभ करें
              </motion.button>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ---------- 2. Main Interactive Page ---------- */}
      {introDone && (
        <main className="relative z-10">
          {/* Radha Rani Reveal */}
          <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
            <motion.img
              src="/images/radha.jpeg"
              alt="Radha Krishna"
              className="w-64 h-64 mx-auto rounded-full shadow-2xl border-4 border-[#ffd6ea]"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ repeat: Infinity, duration: 6 }}
            />
            <motion.h2 className="text-4xl md:text-5xl mt-6 glow-gold font-bold">🌺 राधा रानी दर्शन 🌺</motion.h2>
            <p className="mt-3 text-pink-200 italic max-w-2xl mx-auto">
              राधा नाम जप कर मन पावन करो — प्रेम की लहरें भीतर तक बहेंगी।
            </p>
          </section>

          {/* Digital Pooja */}
          <section id="meditation" className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-transparent to-[#05060a]/40">
            <h3 className="text-3xl font-bold glow-gold mb-4">🧘 भक्ति ध्यान — राधे नाम जपो</h3>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <Mandala size={300} />

              <div className="text-center space-y-4">
                <motion.div className="text-yellow-300 text-4xl font-bold glow-gold" animate={{ scale: [1, 1.04, 1] }} transition={{ repeat: Infinity, duration: 3 }}>
                  राधे राधे
                </motion.div>

                <div className="flex items-center gap-4 justify-center mt-4">
                  <button onClick={handleJap} className="px-6 py-3 rounded-full bg-gradient-to-r from-radha-pink to-[#ffd37a] text-vrind-bg font-semibold shadow-lg">
                    💖 राधे नाम जपो
                  </button>
                  <div className="text-xl font-semibold text-yellow-300">गिनती: {japCount} / 108</div>
                </div>

                <button onClick={() => { setJapCount(0); localStorage.setItem('japCount','0'); }} className="text-sm underline">रीसेट करें</button>

                <button onClick={handleOfferFlower} className="px-6 py-3 rounded-full bg-gradient-to-r from-radha-pink to-[#ffd37a] text-vrind-bg font-semibold shadow-lg">
                  🌸 फूल चढ़ाएँ
                </button>
                <div className="text-yellow-300 font-semibold">अर्पित: {flowersOffered}</div>
              </div>
            </div>
          </section>

          {/* Bhakti Leela Carousel */}
          <section className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-[#08131b]/50 to-transparent">
            <h3 className="text-3xl font-bold text-pink-100 glow-gold text-center mb-6">🎠 भक्ति लीला</h3>
            <div className="relative max-w-4xl w-full">
              <motion.img src={slides[currentSlide].img} alt={slides[currentSlide].title} className="w-full h-96 object-cover rounded-2xl shadow-xl" initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} />
              <motion.div className="absolute bottom-6 left-6 bg-white/5 p-4 rounded-xl">
                <h4 className="text-2xl font-bold text-yellow-300">{slides[currentSlide].title}</h4>
                <p className="text-pink-100 mt-1">{slides[currentSlide].text}</p>
              </motion.div>
              <div className="flex justify-between mt-6">
                <button onClick={() => setCurrentSlide((s) => (s - 1 + slides.length) % slides.length)} className="px-4 py-2 rounded bg-white/10">Prev</button>
                <div className="flex gap-2">{slides.map((_, idx) => (<button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-3 h-3 rounded-full ${idx === currentSlide ? 'bg-yellow-300' : 'bg-white/30'}`} />))}</div>
                <button onClick={() => setCurrentSlide((s) => (s + 1) % slides.length)} className="px-4 py-2 rounded bg-white/10">Next</button>
              </div>
            </div>
          </section>

          {/* Bhajans */}
          <section id="bhajans" className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-[#03060a] to-[#08131b]">
            <h3 className="text-3xl font-bold glow-gold mb-6">🎶 Prem Ras — भजन</h3>
            <div className="w-full max-w-2xl space-y-4">
              <BhajanPlayer title="Barsane Wali Radhe" src="/audio/barsane.mp3" onPlayChange={(p)=>setBhajanPlaying(p)} />
              <BhajanPlayer title="Radhe Radhe Govinda Gopal" src="/audio/radhe-govinda.mp3" onPlayChange={(p)=>setBhajanPlaying(p)} />
            </div>
          </section>

          {/* Blessing */}
          <section className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-[#0a0710] to-[#241223]">
            <motion.h2 className="text-4xl font-bold glow-gold mb-4">🌈 Radharani’s Blessings</motion.h2>
            <motion.p className="text-lg text-pink-200 max-w-2xl text-center">
              “राधे राधे नाम में जो लीन हुआ, उसका हर कर्म प्रेममय हुआ।” — Jai Radhe Radhe
            </motion.p>
            <motion.div className="mt-8 w-64 h-64 rounded-full bg-gradient-to-br from-[#fff1cc] to-[#ffe6f0] shadow-2xl flex items-center justify-center text-6xl">
              🪷
            </motion.div>
            <motion.div className="mt-6 text-yellow-300 font-bold text-lg animate-pulse">जय राधे राधे 💫</motion.div>
          </section>
        </main>
      )}

      {/* Mandala Modal */}
      <AnimatePresence>
        {mandalaOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-md">
              <Mandala size={360} />
              <div className="mt-6 text-center">
                <button onClick={() => setMandalaOpen(false)} className="px-4 py-2 rounded bg-gradient-to-r from-radha-pink to-[#ffd37a] text-vrind-bg">बाहर आएं</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blessing Modal */}
      <AnimatePresence>
        {showBlessing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-black/60 to-black/40">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-white/10 p-8 rounded-2xl backdrop-blur-md text-center">
              <h3 className="text-2xl font-bold text-pink-100 mb-2">🌸 राधारानी आशीर्वाद 🌸</h3>
              <p className="text-yellow-200">आपके प्रेम और भक्ति से मन शुद्ध हुआ। Jai Radhe Radhe! 💖</p>
              <button onClick={() => setShowBlessing(false)} className="mt-4 px-4 py-2 rounded bg-gradient-to-r from-radha-pink to-[#ffd37a] text-vrind-bg font-semibold">ठीक है</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    </ProtectedRoute>
    
  );
}
