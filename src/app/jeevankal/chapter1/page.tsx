'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Chapter1Cinematic() {
  return (
    <div
      className="relative min-h-screen overflow-hidden text-white font-serif"
      style={{
        backgroundImage: "url('/images/vrindavan-bg.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0b0d]/90 via-[#2a0d16]/80 to-[#3a1a1f]/90 backdrop-blur-sm z-0"></div>

      {/* floating aura particles */}
      <motion.div
        className="absolute inset-0 z-0 bg-[url('/images/aura-particles.jpg')] bg-cover opacity-10"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* cinematic fade-in section */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto text-center px-6 pt-32 sm:pt-48"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-pink-200 mb-6 drop-shadow-lg">
          🌸 अध्याय 1: राधारानी का जन्म और बाल्यकाल 🌸
        </h1>

        <motion.p
          className="text-lg sm:text-xl text-pink-100 italic mb-16 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.2 }}
        >
          “जहाँ प्रेम स्वयं आकार लेता है, वहीं राधा जन्म लेती हैं...”
        </motion.p>

        {/* cinematic image fade-in */}
        <motion.img
          src="/images/radha-childhood.jpg"
          alt="राधारानी का जन्म"
          className="rounded-3xl mx-auto shadow-2xl mb-16 w-full max-w-3xl ring-4 ring-pink-200/50"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 2 }}
        />

        {/* story narration cinematic */}
        <motion.div
          className="text-left sm:text-justify text-lg sm:text-xl leading-relaxed text-rose-100 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 border border-rose-200/20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.3 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-6"
          >
            बरसाना की शांत पहाड़ियों पर, जब प्रभात की पहली किरण पड़ी — 
            तभी दिव्यता ने आकार लिया। महाराज वृषभानु के घर एक अद्भुत प्रकाश फूटा। 
            यह कोई साधारण बालिका नहीं थी... यह थी **स्वयं राधा**, 
            प्रेम की प्रतिमूर्ति, भक्ति का हृदय।
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-6"
          >
            जब नंदगाँव में कृष्ण प्रकट हुए, उसी क्षण बरसाना में राधा का जन्म हुआ — 
            मानो सृष्टि ने दो आत्माओं को एक साथ रचा हो। 
            वृक्षों ने फूलों की वर्षा की, गोधन ने आनंद से नृत्य किया, 
            और गगन में संगीत गूंज उठा।
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-6"
          >
            बाल्यकाल में राधारानी की मुस्कान ऐसी थी, 
            जैसे चंद्रिका की शीतल रेखाएँ धरती को सहला रही हों। 
            उनकी आँखों में नन्हा ब्रह्मांड झिलमिलाता था। 
            जब वे सखियों संग खेलतीं, तो लगता था कि हर पत्ता उनके सुर में झूम रहा है।
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            श्रीराधा का हर कदम, हर हँसी, हर दृष्टि — 
            ब्रह्मांड के लिए एक अनुग्रह थी। 
            वे केवल बालिका नहीं थीं; वे प्रेम की भाषा थीं, 
            जो शब्दों से नहीं, भावों से बोली जाती है।
          </motion.p>
        </motion.div>

        {/* cinematic nav buttons */}
        <div className="flex justify-between items-center mt-16">
          <Link href="/jeevankal">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-rose-500/40 hover:bg-rose-500/70 border border-pink-200 px-6 py-2 rounded-full shadow-md transition"
            >
              <ArrowLeft size={18} /> पिछले पृष्ठ
            </motion.button>
          </Link>

          <Link href="/jeevankal/chapter2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-rose-600/50 hover:bg-rose-600/70 border border-pink-300 px-6 py-2 rounded-full shadow-md transition"
            >
              अगला अध्याय <ArrowRight size={18} />
            </motion.button>
          </Link>
        </div>

        {/* closing cinematic mantra */}
        <motion.div
          className="mt-20 text-xl sm:text-2xl text-pink-300 font-semibold tracking-wide"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          ✨ “राधा ही प्रेम हैं, और प्रेम ही राधा है...” ✨
        </motion.div>
      </motion.div>
    </div>
  );
}
