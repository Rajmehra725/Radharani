'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Chapter2Cinematic() {
  return (
    <div
      className="relative min-h-screen overflow-hidden text-white font-serif"
      style={{
        backgroundImage: "url('/images/vrindavan-milap-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* overlay gradient cinematic tone */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#12080d]/90 via-[#2b0f19]/80 to-[#4a1a26]/90 backdrop-blur-sm z-0"></div>

      {/* slow floating aura particles */}
      <motion.div
        className="absolute inset-0 bg-[url('/images/golden-dust.webp')] bg-cover opacity-10 z-0"
        animate={{ opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto text-center px-6 pt-32 sm:pt-48"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-pink-200 mb-6 drop-shadow-lg">
          🌸 अध्याय 2: श्रीकृष्ण से प्रथम मिलन 🌸
        </h1>

        <motion.p
          className="text-lg sm:text-xl text-pink-100 italic mb-16 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.2 }}
        >
          “जहाँ राधा हैं, वहाँ कृष्ण हैं — और जहाँ कृष्ण हैं, वहाँ प्रेम है...”
        </motion.p>

        {/* cinematic image */}
        <motion.img
          src="/images/krishna-meeting.jpg"
          alt="राधा कृष्ण प्रथम मिलन"
          className="rounded-3xl mx-auto shadow-2xl mb-16 w-full max-w-3xl ring-4 ring-pink-200/40"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 2 }}
        />

        {/* story text block */}
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
            एक दिन बरसाना से गोपियों संग राधारानी वृंदावन की ओर चलीं। 
            हवा में बांसुरी की एक मधुर तान गूंज रही थी — 
            जो आत्मा को भेदकर हृदय में उतर जाती थी। 
            सब सखियाँ ठिठक गईं, पर राधा के कदम अनायास उस दिशा में बढ़ चले।
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-6"
          >
            वहाँ, यमुना तट के पास, पीताम्बर धारी, मुरलीधर खड़े थे। 
            सूर्य की किरणें जैसे उनके मुकुट से टकरा कर चारों ओर फैल रही थीं।  
            राधा रुकीं — और पहली बार,  
            ब्रह्मांड ने **प्रेम के दो स्रोतों को आमने-सामने देखा।**
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-6"
          >
            कृष्ण की दृष्टि राधा पर पड़ी — समय ठहर गया।  
            हवा ने चलना बंद कर दिया, यमुना का प्रवाह थम गया,  
            और फूलों की पंखुड़ियाँ धीरे-धीरे नीचे गिरने लगीं।  
            उनके नेत्रों का मिलन ही **युगों-युगों के प्रेम का आरंभ** था।
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            दोनों के मध्य कोई शब्द नहीं था —  
            केवल मौन था, और उस मौन में अनंत अर्थ छिपे थे।  
            उस दिन वृंदावन ने जाना कि प्रेम क्या होता है —  
            न पाने की चाह, न कहने की ज़रूरत —  
            केवल **एक दृष्टि**, और सृष्टि बदल जाती है।
          </motion.p>
        </motion.div>

        {/* cinematic nav */}
        <div className="flex justify-between items-center mt-16">
          <Link href="/jeevankal/chapter1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-rose-500/40 hover:bg-rose-500/70 border border-pink-200 px-6 py-2 rounded-full shadow-md transition"
            >
              <ArrowLeft size={18} /> पिछला अध्याय
            </motion.button>
          </Link>

          <Link href="/jeevankal/chapter3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-rose-600/50 hover:bg-rose-600/70 border border-pink-300 px-6 py-2 rounded-full shadow-md transition"
            >
              अगला अध्याय <ArrowRight size={18} />
            </motion.button>
          </Link>
        </div>

        {/* closing mantra */}
        <motion.div
          className="mt-20 text-xl sm:text-2xl text-pink-300 font-semibold tracking-wide"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          💫 “प्रेम वही है, जो मौन में भी गूंजे...” 💫
        </motion.div>
      </motion.div>
    </div>
  );
}
