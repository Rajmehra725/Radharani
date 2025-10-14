'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <motion.footer
      className="relative overflow-hidden w-full bg-gradient-to-r from-pink-100 via-yellow-100 to-orange-100 text-center py-10 mt-20 border-t border-yellow-300 shadow-[0_-10px_30px_rgba(255,200,150,0.3)]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >

      {/* 🪔 Floating diyas animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-500"
            initial={{ y: 400, opacity: 0 }}
            animate={{
              y: [-10, -400],
              opacity: [0, 1, 1, 0],
              x: [Math.random() * 200 - 100, Math.random() * 300 - 150],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'easeInOut',
            }}
          >
            🪔
          </motion.div>
        ))}
      </div>

      {/* Title quote */}
      <motion.p
        className="text-pink-800 text-xl font-semibold mb-4 px-4 leading-relaxed"
        animate={{ scale: [1, 1.03, 1], opacity: [1, 0.9, 1] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        “राधे राधे नाम बिना जीवन अधूरा है 💛”
      </motion.p>

      {/* Nav links */}
      <div className="flex justify-center flex-wrap gap-8 mt-6">
        {[
          { href: '/about', text: 'हमारे बारे में' },
          { href: '/contact', text: 'संपर्क करें' },
          { href: '/more-leela', text: 'अधिक लीलाएँ' },
        ].map((link, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.2, color: '#D946EF', textShadow: '0px 0px 8px #ff80ff' }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Link href={link.href}>
              <span className="cursor-pointer text-yellow-800 font-medium text-lg hover:text-pink-700 transition-colors">
                {link.text}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Glowing separator line */}
      <motion.div
        className="mt-8 h-1 w-2/3 mx-auto rounded-full bg-gradient-to-r from-pink-300 via-yellow-400 to-orange-300 shadow-[0_0_15px_#ffb347]"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.02, 1],
        }}
        transition={{ repeat: Infinity, duration: 3 }}
      />

      {/* Chant text */}
      <motion.div
        className="mt-6 text-yellow-800 font-bold text-lg"
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.05, 1],
          rotate: [0, 1, -1, 0],
        }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        🪔 जय श्री राधे कृष्ण 🪔
      </motion.div>

      {/* Radha-Krishna aura background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-pink-200/40 via-transparent to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.8],
        }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      />
    </motion.footer>
  );
}
