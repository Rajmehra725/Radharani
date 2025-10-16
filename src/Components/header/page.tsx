'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const links = [
    { name: '🏠 गृह', path: '/' },
    { name: '🌸 लीला (Divine Plays)', path: '/leela' },
    { name: '🎶 भजन (Bhajans)', path: '/bhajan' },
    { name: '🌺 दर्शन (Darshan)', path: '/darshan' },
    { name: '💖 रासलीला (Divine Love)', path: '/raslila' },
    { name: '🕊️ भाव नियंत्रण (Emotions)', path: '/Emotions' },
  ];

  // ✨ बाहर क्लिक करने पर मेनू बंद करने का इफ़ेक्ट
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <motion.header
      className="w-full py-4 px-6 bg-gradient-to-r from-yellow-200 via-pink-200 to-orange-100 
      shadow-lg flex justify-between items-center fixed top-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, type: 'spring' }}
    >
      {/* 🌸 Title */}
      <motion.h1
        className="text-xl sm:text-2xl font-bold text-pink-700"
        whileHover={{ scale: 1.1 }}
      >
        🌸 Vrindavan Leela
      </motion.h1>

      {/* 🌼 Desktop Navigation */}
      <nav className="hidden md:flex gap-6">
        {links.map((link, i) => (
          <motion.div key={i} whileHover={{ scale: 1.1 }}>
            <Link href={link.path}>
              <span className="text-pink-800 hover:text-orange-700 transition font-semibold">
                {link.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* 🕉️ Radhe Radhe animation */}
      <motion.div
        className="hidden sm:block text-xl sm:text-2xl text-yellow-600 font-bold"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        🕉️ राधे राधे
      </motion.div>

      {/* 📱 Mobile Menu Toggle */}
      <button
        className="md:hidden text-3xl text-pink-700"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      {/* 📜 Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-gradient-to-b from-pink-100 to-yellow-100 
            shadow-lg flex flex-col items-center py-4 gap-3 md:hidden"
          >
            {links.map((link, i) => (
              <Link key={i} href={link.path} onClick={() => setMenuOpen(false)}>
                <span className="text-pink-800 hover:text-orange-700 font-semibold text-lg">
                  {link.name}
                </span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
