'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function VrindavanLock() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showShlok, setShowShlok] = useState(false);
  const [loading, setLoading] = useState(false);
  const [positions, setPositions] = useState<{ left: string; top: string }[]>([]);
  const SECRET = 'radharani';
  const router = useRouter();

  // 🌸 Random flower positions
  useEffect(() => {
    const generated = Array.from({ length: 8 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setPositions(generated);
  }, []);

  // 🌸 Alternate shlok
  useEffect(() => {
    const interval = setInterval(() => setShowShlok((s) => !s), 4000);
    return () => clearInterval(interval);
  }, []);

  // 🌸 Handle Unlock + Loading + Navigation
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.toLowerCase() === SECRET) {
      setLoading(true);
      localStorage.setItem('isUnlocked', 'true');
      document.cookie = 'unlocked=true; path=/';

      // 3 seconds loading screen before redirect
      setTimeout(() => {
        router.push('/home');
      }, 3000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  }

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://d34vm3j4h7f97z.cloudfront.net/original/4X/c/f/2/cf293bd7dfd3abfbc657907fe0ebf8aca779dbfa.jpeg')",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/60 to-black/80 backdrop-blur-sm" />

      {/* ✨ Background Light Animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(255,215,0,0.2), transparent)',
            'radial-gradient(circle at 80% 60%, rgba(255,192,203,0.25), transparent)',
            'radial-gradient(circle at 50% 90%, rgba(255,105,180,0.25), transparent)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* 🌸 Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center text-yellow-300"
          >
            <motion.h1
              className="text-4xl font-bold mb-4"
              animate={{ textShadow: ['0 0 20px gold', '0 0 60px pink'] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'mirror' }}
            >
              🌸 राधारानी... 🌸
            </motion.h1>

            <motion.div
              className="flex gap-3 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[1, 2, 3].map((dot) => (
                <motion.span
                  key={dot}
                  className="w-3 h-3 bg-yellow-300 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: dot * 0.3,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✨ Shlok Animation */}
      <AnimatePresence mode="wait">
        {!loading &&
          (showShlok ? (
            <motion.p
              key="shlok1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-10 text-center text-yellow-300 text-xl font-semibold"
            >
              🌸 “राधे राधे बोल, मन में बस जा राधे नाम।” 🌸
            </motion.p>
          ) : (
            <motion.p
              key="shlok2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-10 text-center text-pink-300 text-xl font-semibold"
            >
              “यत्र यत्र रघुनाथ कीर्तनं तत्र तत्र कृतमस्तकाञ्जलिम्।” 🙏
            </motion.p>
          ))}
      </AnimatePresence>

      {/* 🔒 Lock Form */}
      {!loading && (
        <motion.form
          className={`relative z-10 p-8 rounded-2xl backdrop-blur-xl bg-white/10 flex flex-col items-center gap-4 shadow-xl border border-yellow-300/30 ${
            error ? 'animate-shake' : ''
          }`}
          onSubmit={handleSubmit}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-3xl text-yellow-300 font-bold"
            animate={{ textShadow: ['0 0 10px gold', '0 0 30px pink'] }}
            transition={{ repeat: Infinity, duration: 2, repeatType: 'mirror' }}
          >
            🔱 वृन्दावन द्वार 🔱
          </motion.h2>

          <motion.p
            className="text-pink-200 text-center text-sm italic"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            "राधे राधे कहने से मन पावन हो जाता है 💖"
          </motion.p>

          <input
            type="password"
            value={password}
            placeholder="🔒 पासवर्ड दर्ज करें..."
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg w-60 text-center text-black font-semibold focus:outline-none"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-xl text-black bg-gradient-to-r from-yellow-300 to-pink-300 font-bold shadow-lg hover:shadow-pink-400/40"
          >
            द्वार खोलो 🌺
          </motion.button>

          {error && (
            <motion.p
              className="text-red-400 text-sm mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              ❌ गलत मंत्र! कृपया “radharani” लिखें 🙏
            </motion.p>
          )}
        </motion.form>
      )}

      {/* 🌸 Floating Flowers */}
      {!loading &&
        positions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200 text-xl select-none"
            style={{ left: pos.left, top: pos.top }}
            animate={{
              y: [0, -100],
              opacity: [1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 1.5,
            }}
          >
            🌸
          </motion.div>
        ))}
    </motion.div>
  );
}
