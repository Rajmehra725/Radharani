"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function RadhaRaniKiVaniCinematic() {
  const [message, setMessage] = useState<string | null>(null);
  const [dateStr, setDateStr] = useState<string>("");

  useEffect(() => {
    const date = new Date();
    const day = date.getDate();

    const messages = [
      "आज प्रेम से बोलो, हर शब्द में मिठास भरो 🌸",
      "किसी की मदद करो — वही सच्ची भक्ति है 💞",
      "अपने मन को शांत रखो, तभी सच्चा आनंद मिलेगा 🌺",
      "आज किसी को क्षमा करो, यही सबसे बड़ा दान है 🌷",
      "कृष्ण नाम का जप करो, हर पीड़ा मिट जाएगी 💫",
      "भक्ति में डूबो, चिंता अपने आप दूर होगी 🙏",
      "आज सादगी को अपनाओ, वही सच्चा सौंदर्य है 🌼",
      "प्रेम बाँटो, संसार तुम्हारा हो जाएगा 💖",
      "सेवा में लगो, वही सच्चा सुख है 🌿",
      "किसी का मन मत दुखाओ, मैं वहीं वास करती हूँ 💞",
      "धैर्य रखो — हर चीज़ अपने समय पर सुंदर बनती है 🌸",
      "आज वृंदावन का स्मरण करो, मन में शांति आएगी 🌺",
      "किसी को धन्यवाद दो, आभार ही भक्ति का प्रथम चरण है 💫",
      "कृष्ण के नाम में डूबो — वहीं अमर शांति है 🎶",
      "भक्ति से किया गया हर कर्म शुभ फल देगा 🌷",
      "अपने हृदय की सुनो, वहीं मैं बोलती हूँ 💖",
      "जो मिला है उसका आभार जताओ 🌼",
      "कर्म करो, फल की चिंता मुझे सौंप दो 🙏",
      "किसी को मुस्कुराने का कारण बनो 🌸",
      "आज अपने अंदर की रोशनी पहचानो 🌟"
    ];

    const msg = messages[(day - 1) % messages.length];
    setMessage(msg);

    setDateStr(
      date.toLocaleDateString("hi-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  if (!message)
    return (
      <div className="flex items-center justify-center min-h-screen text-rose-700 text-xl font-semibold">
        🌸 राधारानी की वाणी लोड हो रही है...
      </div>
    );

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-[#fff8f9] via-[#fde4ec] to-[#fbeef4] text-center px-6">
      {/* Divine Aura Glow */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,180,200,0.4),transparent_70%)]"
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Petals */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300 text-2xl"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              y: ["110%", "-20%"],
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0.4, 1, 0.4],
              rotate: [0, 360],
            }}
            transition={{
              duration: 25 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="text-4xl md:text-5xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-500 to-amber-500 drop-shadow-2xl mb-8 tracking-wide"
      >
        🌸 राधारानी की वाणी 🌸
      </motion.h1>

      {/* Main Message */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="relative z-20 max-w-2xl p-8 rounded-3xl shadow-2xl bg-white/30 backdrop-blur-md border border-pink-200"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="text-2xl md:text-3xl font-serif font-semibold text-transparent bg-clip-text bg-gradient-to-r from-rose-700 via-pink-600 to-amber-500 drop-shadow-md leading-relaxed"
        >
          {message}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1.2 }}
          className="mt-6 text-xl md:text-2xl text-rose-800 font-medium"
        >
          🌷 आज यदि आप ऐसा करेंगे तो आपका दिन  
          <span className="font-semibold text-rose-600"> राधारानी के आशीर्वाद से सफल होगा।</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.2 }}
          className="mt-8 text-sm text-rose-500 font-semibold"
        >
          📅 {dateStr}
        </motion.div>
      </motion.div>

      {/* Light shimmer overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
