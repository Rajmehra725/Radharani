'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const chapters = [
  {
    id: 1,
    title: 'अध्याय 1: राधारानी का जन्म और बाल्यकाल',
    path: '/jeevankal/chapter1',
    image: '/images/radha-childhood.jpg',
  },
  {
    id: 2,
    title: 'अध्याय 2: श्रीकृष्ण से प्रथम मिलन',
    path: '/jeevankal/chapter2',
    image: '/images/krishna-meeting.jpg',
  },
  {
    id: 3,
    title: 'अध्याय 3: वृंदावन की बाल लीलाएँ',
    path: '/jeevankal/chapter3',
    image: '/images/vrindavan-leela.jpg',
  },
  {
    id: 4,
    title: 'अध्याय 4: माखन चोर लीलाएँ और उपालंभ',
    path: '/jeevankal/chapter4',
    image: '/images/makhan-chor.jpg',
  },
  {
    id: 5,
    title: 'अध्याय 5: रासलीला का प्रारंभ',
    path: '/jeevankal/chapter5',
    image: '/images/raas-leela.jpg',
  },
  {
    id: 6,
    title: 'अध्याय 6: महारास और आत्मिक प्रेम',
    path: '/jeevankal/chapter6',
    image: '/images/maharas.jpg',
  },
  {
    id: 7,
    title: 'अध्याय 7: विरह और तड़प',
    path: '/jeevankal/chapter7',
    image: '/images/virah.jpg',
  },
  {
    id: 8,
    title: 'अध्याय 8: गोपियों की भक्ति और राधा का उपदेश',
    path: '/jeevankal/chapter8',
    image: '/images/gopi-bhakti.jpg',
  },
  {
    id: 9,
    title: 'अध्याय 9: उद्धव-राधा संवाद',
    path: '/jeevankal/chapter9',
    image: '/images/uddhav-radha.jpg',
  },
  {
    id: 10,
    title: 'अध्याय 10: दिव्य प्रेम का तत्त्वज्ञान',
    path: '/jeevankal/chapter10',
    image: '/images/divya-prem.jpg',
  },
  {
    id: 11,
    title: 'अध्याय 11: श्रीराधा का ध्यान और समाधि',
    path: '/jeevankal/chapter11',
    image: '/images/radha-samadhi.jpg',
  },
  {
    id: 12,
    title: 'अध्याय 12: अनंत प्रेम की कथा',
    path: '/jeevankal/chapter12',
    image: '/images/anant-prem.jpg',
  },
];

export default function JeevanKalHome() {
  const [search, setSearch] = useState('');
  const [showScroll, setShowScroll] = useState(false);

  const filteredChapters = chapters.filter((ch) =>
    ch.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) setShowScroll(true);
      else setShowScroll(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start text-center px-4 sm:px-6 py-32 relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/vrindavan-bg.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Transparent overlay for readability */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0"></div>

      {/* Floating petals animation */}
      <motion.div
        className="absolute inset-0 bg-[url('/petals.png')] bg-center bg-cover opacity-10 z-0"
        animate={{ opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Heading */}
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-rose-700 mb-8 z-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🌸 राधारानी का सम्पूर्ण जीवन काल 🌸
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-base sm:text-lg text-pink-800 max-w-3xl mb-10 leading-relaxed font-medium z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        “मेरे प्रिय भक्तों, यह कथा प्रेम की पराकाष्ठा का प्रतीक है — 
        मेरे जन्म से लेकर अनंत प्रेम तक की प्रत्येक लीला उसी प्रेम की व्याख्या है। 
        चलो, उस वृंदावन की ओर जहाँ हर कण में राधे नाम की सुगंध है।”
      </motion.p>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-10 w-full max-w-md z-10"
      >
        <input
          type="text"
          placeholder="🔍 अध्याय खोजें..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-rose-300 px-5 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-rose-400 text-rose-800 placeholder-pink-400"
        />
      </motion.div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl z-10">
        {filteredChapters.length > 0 ? (
          filteredChapters.map((chapter, i) => (
            <motion.div
              key={chapter.id}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg border border-rose-200 overflow-hidden hover:shadow-pink-300 transition"
            >
              {/* Image Section */}
              <div className="h-40 sm:h-48 w-full overflow-hidden">
                <img
                  src={chapter.image}
                  alt={chapter.title}
                  className="h-full w-full object-cover transform hover:scale-105 transition duration-500"
                />
              </div>

              {/* Text Section */}
              <div className="p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-rose-800 mb-4">
                  {chapter.title}
                </h2>
                <Link href={chapter.path}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="bg-rose-500 text-white font-medium px-6 py-2 rounded-full shadow hover:bg-rose-600 transition"
                  >
                    📖 कथा सुनें
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-pink-700 font-medium col-span-full">कोई अध्याय नहीं मिला।</p>
        )}
      </div>

      {/* Bottom mantra */}
      <motion.div
        className="mt-20 text-lg sm:text-2xl text-pink-700 font-semibold z-10"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        🕉️ राधे राधे • प्रेम ही मेरा स्वरूप है • राधे राधे 🕉️
      </motion.div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-full shadow-lg z-50 transition"
          >
            <ArrowUp size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
