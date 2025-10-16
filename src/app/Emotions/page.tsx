"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Emotion = {
  id: string;
  name: string;
  emoji: string;
  message: string;
  image?: string;
  voice?: string;
  music?: string;
};

export const EMOTIONS: Emotion[] = [
  {
    id: "khush",
    name: "खुश",
    emoji: "😊",
    message: `आपकी खुशी आपके भीतर से आती है। इसे बाँटने से यह और गहरी होती है।\n
राधारानी कहती हैं — अपने आस-पास के लोगों को प्रेम और मुस्कान दें।\nछोटे-छोटे सुखों का आनंद लें। याद रखिए, खुशी फैलाने से मन में और अधिक आनंद और शांति आएगी।`,
    image: "/images/radha1.webp",
    voice: "/audio/voice-khush.mp3",
    music: "/audio/flute-happy.mp3",
  },
  {
    id: "dukh",
    name: "दुखी",
    emoji: "😢",
    message: `दुख आपके जीवन का हिस्सा है, लेकिन इसे पहचानना और स्वीकार करना आवश्यक है।\n
राधारानी कहती हैं — अपनी भावनाओं को दबाएं नहीं। धीरे-धीरे सांस लें, अपने दिल को शांत करें, और यह सोचें कि यह समय भी गुजर जाएगा।`,
    image: "/images/radha2.png",
    voice: "/audio/voice-sad.mp3",
    music: "/audio/tanpura-slow.mp3",
  },
  {
    id: "gussa",
    name: "गुस्सा",
    emoji: "😡",
    message: `गुस्सा क्षणिक होता है, लेकिन उसका प्रभाव स्थायी हो सकता है।\n
राधारानी कहती हैं — गहरी साँस लें, कुछ समय अकेले बिताएँ, और अपने विचारों को शांत करें।`,
    image: "/images/radha3.png",
    voice: "/audio/voice-anger.mp3",
    music: "/audio/drone-low.mp3",
  },
  {
    id: "bhay",
    name: "भय",
    emoji: "😨",
    message: `भय सिर्फ मन की प्रतिक्रिया है। इसे समझना और सामना करना आवश्यक है।\n
राधारानी कहती हैं — विश्वास रखें, अपने हृदय को स्थिर रखें। ध्यान और प्रार्थना से भय को धीरे-धीरे प्रेम में बदला जा सकता है।`,
    image: "/images/radha4.png",
    voice: "/audio/voice-fear.mp3",
    music: "/audio/ambient-ominous.mp3",
  },
  {
    id: "shanti",
    name: "शांति",
    emoji: "😌",
    message: `शांति आपके भीतर से निकलती है। इसे बनाए रखना सबसे बड़ा धर्म है।\n
राधारानी कहती हैं — ध्यान, योग, और प्रेम से अपने मन को स्थिर रखें।`,
    image: "/images/radha5.png",
    voice: "/audio/voice-peace.mp3",
    music: "/audio/tanpura-soft.mp3",
  },
  {
    id: "aashcharya",
    name: "आश्चर्य",
    emoji: "😲",
    message: `आश्चर्य आपकी जिज्ञासा को जगाता है। राधारानी कहती हैं — नए अनुभवों के लिए मन खोलें, सीखें और आनंद लें।\n
छोटे-छोटे आश्चर्य आपके जीवन को रंगीन बनाते हैं।`,
    image: "/images/radha6.png",
    voice: "/audio/voice-surprise.mp3",
    music: "/audio/bells-light.mp3",
  },
  {
    id: "vishwas",
    name: "विश्वास",
    emoji: "🙏",
    message: `विश्वास से जीवन में स्थिरता आती है। राधारानी कहती हैं — अपने ईश्वर और अपने हृदय पर विश्वास रखें।\n
धैर्य और प्रेम से हर बाधा आसान हो जाती है।`,
    image: "/images/radha7.png",
    voice: "/audio/voice-trust.mp3",
    music: "/audio/harmonium-soft.mp3",
  },
  {
    id: "prem",
    name: "प्रेम",
    emoji: "❤️",
    message: `प्रेम सबसे महान शक्ति है। राधारानी कहती हैं — प्रेम बाँटें, बिना शर्त।\n
प्रेम से आपका मन, परिवार और समाज सबका कल्याण होता है।`,
    image: "/images/radha8.png",
    voice: "/audio/voice-love.mp3",
    music: "/audio/flute-romantic.mp3",
  },
  {
    id: "utsaah",
    name: "उत्साह",
    emoji: "😃",
    message: `उत्साह आपके कार्यों में ऊर्जा लाता है। राधारानी कहती हैं — उत्साहित रहें और हर काम पूरी निष्ठा से करें।\n
ऊर्जा और सकारात्मकता से हर कार्य सफल होता है।`,
    image: "/images/radha9.png",
    voice: "/audio/voice-enthusiasm.mp3",
    music: "/audio/drone-high.mp3",
  },
  {
    id: "nirasha",
    name: "निराशा",
    emoji: "😔",
    message: `निराशा केवल अस्थायी होती है। राधारानी कहती हैं — उम्मीद बनाए रखें और छोटे-छोटे कदम बढ़ाएँ।\n
धैर्य और प्रार्थना से मन फिर से उज्जवल हो जाता है।`,
    image: "/images/radha10.png",
    voice: "/audio/voice-disappointed.mp3",
    music: "/audio/tanpura-slow.mp3",
  },
  {
    id: "ashanti",
    name: "अशांति",
    emoji: "😖",
    message: `अशांति आपके मन और जीवन में भ्रम लाती है। राधारानी कहती हैं — शांत हो जाएँ, गहरी सांस लें और ध्यान में समय बिताएँ।\n
मन को स्थिर करना पहला कदम है।`,
    image: "/images/radha11.png",
    voice: "/audio/voice-unrest.mp3",
    music: "/audio/ambient-low.mp3",
  },
  {
    id: "sahas",
    name: "साहस",
    emoji: "💪",
    message: `साहस आपको चुनौतियों का सामना करने की शक्ति देता है। राधारानी कहती हैं — डर के बिना कदम बढ़ाएँ।\n
विश्वास और प्रेम से आप हर बाधा पार कर सकते हैं।`,
    image: "/images/radha12.png",
    voice: "/audio/voice-courage.mp3",
    music: "/audio/drone-meditative.mp3",
  },
  {
    id: "utajjna",
    name: "शर्म/संकोच",
    emoji: "😳",
    message: `संकोच या शर्म स्वाभाविक है। राधारानी कहती हैं — स्वयं को स्वीकारें और धीरे-धीरे दूसरों के साथ खुलें।\n
आत्मविश्वास धीरे-धीरे बढ़ता है।`,
    image: "/images/radha13.png",
    voice: "/audio/voice-shy.mp3",
    music: "/audio/flute-soft.mp3",
  },
];


export default function RadharaniBhavCinematic() {
  const [selected, setSelected] = useState<Emotion | null>(null);
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const fxRef = useRef<HTMLAudioElement | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null);
  const emotionMusicRef = useRef<HTMLAudioElement | null>(null);

  // preload ambient audio and fx
  useEffect(() => {
    ambientRef.current = new Audio("/audio/ambient-loop.mp3");
    ambientRef.current.loop = true;
    ambientRef.current.volume = 0.12;

    fxRef.current = new Audio("/audio/bell-soft.mp3");
    fxRef.current.volume = 0.25;

    // emotion audio nodes created dynamically per selection
    return () => {
      ambientRef.current?.pause();
      ambientRef.current = null;
      fxRef.current = null;
    };
  }, []);

  // play ambient when component mounts
  useEffect(() => {
    // try to autoplay ambient but guard with user gesture restrictions
    const tryPlay = () => {
      ambientRef.current?.play().catch(() => {});
    };

    // attempt once on mount
    tryPlay();

    // also resume on first user interaction
    const handler = () => tryPlay();
    window.addEventListener("pointerdown", handler, { once: true });

    return () => window.removeEventListener("pointerdown", handler);
  }, []);

  // when selected changes, manage voice + emotion music + fx
  useEffect(() => {
    // stop previous
    voiceRef.current?.pause();
    voiceRef.current = null;
    emotionMusicRef.current?.pause();
    emotionMusicRef.current = null;

    if (selected) {
      // gentle bell when modal opens
      try {
        fxRef.current && (fxRef.current.currentTime = 0) && fxRef.current.play().catch(() => {});
      } catch (e) {}

      // load voice
      if (selected.voice) {
        voiceRef.current = new Audio(selected.voice);
        voiceRef.current.volume = 0.9;
        voiceRef.current.play().catch(() => {});
      }

      if (selected.music) {
        emotionMusicRef.current = new Audio(selected.music);
        emotionMusicRef.current.loop = true;
        emotionMusicRef.current.volume = 0.12;
        emotionMusicRef.current.play().catch(() => {});
      }

      // slightly bump ambient when modal open for warmth
      if (ambientRef.current) ambientRef.current.volume = 0.18;
    } else {
      // restore ambient
      if (ambientRef.current) ambientRef.current.volume = 0.12;
    }

    return () => {
      // cleanup on unmount / change
      voiceRef.current?.pause();
      emotionMusicRef.current?.pause();
    };
  }, [selected]);

  // helper to render message with staggered words
  const renderMessage = (text: string) => {
    const words = text.split(/(\s+)/); // keep spaces
    return words.map((w, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(i * 0.04, 1.2), duration: 0.45 }}
        className="inline-block mr-0.5"
      >
        {w}
      </motion.span>
    ));
  };

  return (
   <div className="relative min-h-screen flex flex-col items-center justify-start 
bg-gradient-to-b from-[#fff7f9] via-[#fff1f6] to-[#fff4ef] 
text-center overflow-hidden 
px-6 sm:px-12 py-16 sm:py-20 
mt-8 sm:mt-12 mb-8 sm:mb-16 
rounded-3xl shadow-[0_0_40px_rgba(255,170,190,0.25)] border border-pink-100">

      {/* subtle vrindavan background layers */}
      <div className="absolute inset-0 -z-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-amber-50 to-emerald-50 opacity-80" />

        {/* slow moving mist using CSS animation */}
        <div className="absolute inset-0 -z-20">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(255,240,245,0.6),_transparent)] animate-slow-float opacity-60" />
        </div>

        {/* floating golden particles (decorative) */}
        <div className="pointer-events-none">
          {Array.from({ length: 28 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.9, 0], y: [ -10, 140 + (i % 8) * 12, 420], x: [`${(i * 7) % 100}%`, `${((i * 11) % 100)}%`] }}
              transition={{ duration: 14 + (i % 6), delay: i * 0.25, repeat: Infinity, ease: "linear" }}
              className="absolute w-2 h-2 rounded-full blur-sm bg-amber-200/80"
              style={{ left: `${(i * 13) % 100}%`, top: -20 }}
            />
          ))}
        </div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-700 via-pink-600 to-amber-500 drop-shadow-md mb-8"
      >
        🌸 राधारानी की वाणी — भाव, भक्ति और प्रेम 🌸
      </motion.h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 max-w-4xl w-full mb-10">
        {EMOTIONS.map((e) => (
          <motion.button
            key={e.id}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(e)}
            className="flex flex-col items-center justify-center bg-white/60 backdrop-blur-md border border-rose-100 rounded-2xl shadow-lg p-4 px-6 text-lg font-semibold text-rose-700"
            aria-label={`खोलें: ${e.name}`}
          >
            <span className="text-3xl mb-2">{e.emoji}</span>
            <span>{e.name}</span>
          </motion.button>
        ))}
      </div>

      {/* bottom rotating quote */}
      <motion.p animate={{ opacity: [0.2, 1, 0.2], y: [0, -6, 0] }} transition={{ duration: 6, repeat: Infinity }} className="text-sm text-rose-600 italic mb-6">
        "जहाँ प्रेम है, वहाँ राधा हैं — जहाँ राधा हैं, वहीं वृंदावन है।"
      </motion.p>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }} transition={{ duration: 0.6 }} className="relative bg-white/95 rounded-3xl max-w-3xl w-[92%] p-6 md:p-10 shadow-2xl border border-rose-100 overflow-hidden">
              {/* Background Radha image */}
              {selected.image && (
                <motion.img src={selected.image} alt="Radha" initial={{ opacity: 0 }} animate={{ opacity: 0.18 }} transition={{ duration: 1.8 }} className="absolute inset-0 w-full h-full object-cover rounded-3xl pointer-events-none" />
              )}

              {/* light aura */}
              <motion.div animate={{ boxShadow: ["0 0 18px rgba(255,255,255,0.06)", "0 0 88px rgba(255,160,200,0.18)", "0 0 18px rgba(255,255,255,0.06)"] }} transition={{ duration: 5, repeat: Infinity }} className="absolute inset-0 rounded-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-rose-50 p-2 shadow-inner">
                    {selected.image ? (
                      <motion.img src={selected.image} alt={selected.name} initial={{ scale: 1.06, rotate: -3, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ duration: 1.2 }} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-rose-50 rounded-xl text-3xl">{selected.emoji}</div>
                    )}
                  </div>

                  <div className="text-left md:flex-1">
                    <h2 className="text-2xl font-bold text-rose-700 mb-2">{selected.emoji} {selected.name}</h2>
                    <p className="text-rose-600 leading-relaxed text-base md:text-lg">{renderMessage(selected.message)}</p>
                  </div>
                </div>

                <div className="mt-6 flex gap-3 justify-center md:justify-end">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => {
                    // small play/pause for the voice line
                    if (voiceRef.current && !voiceRef.current.paused) {
                      voiceRef.current.pause();
                    } else if (voiceRef.current) {
                      voiceRef.current.play().catch(() => {});
                    } else if (selected.voice) {
                      voiceRef.current = new Audio(selected.voice);
                      voiceRef.current.volume = 0.9;
                      voiceRef.current.play().catch(() => {});
                    }
                  }} className="px-4 py-2 rounded-full bg-rose-500 text-white font-semibold shadow">🔊 वाणी सुनें</motion.button>

                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setSelected(null)} className="px-4 py-2 rounded-full bg-white border border-rose-200 shadow hover:bg-rose-50">🌸 बंद करें</motion.button>
                </div>
              </div>

              {/* decorative falling petals inside modal */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div key={i} initial={{ y: -10, opacity: 0 }} animate={{ y: [ -10, 160 + i * 12, 380 ], opacity: [0, 0.7, 0] }} transition={{ duration: 10 + (i % 6), delay: i * 0.18, repeat: Infinity }} className="absolute w-3 h-3 rounded-full blur-sm bg-pink-200/90" style={{ left: `${(i * 11) % 100}%` }} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* small credit / controls */}
      <div className="fixed left-4 bottom-4 z-40 bg-white/70 backdrop-blur rounded-xl p-3 border border-rose-100 shadow-md flex items-center gap-3">
        <button onClick={() => {
          if (ambientRef.current?.paused) ambientRef.current.play().catch(() => {}); else ambientRef.current?.pause();
        }} className="px-3 py-1 rounded-md bg-rose-50 border border-rose-100">🔁 Ambient</button>

        <button onClick={() => {
          // toggle all audio off
          ambientRef.current?.pause();
          voiceRef.current?.pause();
          emotionMusicRef.current?.pause();
        }} className="px-3 py-1 rounded-md bg-rose-50 border border-rose-100">🔇 Mute</button>

        <div className="text-xs text-rose-600">Designed for Vrindavan mood • Tap any emotion</div>
      </div>

    </div>
  );
}
