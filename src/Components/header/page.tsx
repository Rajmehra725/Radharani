'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Header() {
  const links = [
    { name: '🏠 गृह', path: '/' },
    { name: '🌸 लीला', path: '/leela' },
    { name: '🎶 भजन', path: '/bhajan' },
    { name: '🌺 दर्शन', path: '/darshan' },
    { name: '💖 रासलीला', path: '/raslila' },
  ];

  return (
    <motion.header
      className="w-full py-4 px-6 bg-gradient-to-r from-yellow-200 via-pink-200 to-orange-100 shadow-lg flex justify-between items-center fixed top-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, type: 'spring' }}
    >
      <motion.h1
        className="text-2xl font-bold text-pink-700"
        whileHover={{ scale: 1.1 }}
      >
        🌸 Vrindavan Leela
      </motion.h1>

      <nav className="flex gap-6">
        {links.map((link, i) => (
          <motion.div key={i} whileHover={{ scale: 1.1 }}>
            <Link href={link.path}>
              <span className="text-pink-800 hover:text-orange-700 transition font-semibold">{link.name}</span>
            </Link>
          </motion.div>
        ))}
      </nav>

      <motion.div
        className="text-2xl text-yellow-600 font-bold"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        🕉️ राधे राधे
      </motion.div>
    </motion.header>
  );
}
