import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const LOGO_URL =
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6926de6ecd587609884dccf2/76fb90dd7_1.png";

export default function Home() {
  return (
    <div className="bg-[#0d1b2a] min-h-screen flex flex-col">
      <section
        className="relative flex-1 flex items-center justify-center overflow-hidden"
        dir="rtl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f2044] to-[#1a237e]" />

        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 rounded-full bg-blue-500/5"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-blue-400/5"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto py-20">
          <motion.img
            src={LOGO_URL}
            alt="אריות דדו"
            className="w-36 h-36 md:w-48 md:h-48 mx-auto mb-8 object-contain drop-shadow-2xl"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          />

          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            מחנה הספורט
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500">
              והערכים
            </span>
          </motion.h1>

          <motion.div
            className="bg-white/[0.06] border border-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Heart className="w-10 h-10 text-blue-400/60 mx-auto mb-6" />
            <p className="text-xl md:text-2xl text-blue-100/90 leading-relaxed font-medium mb-4">
              לצערנו, לאור המצב, לא נוכל לקיים השנה את מחנה הספורט והערכים בפסח.
            </p>
            <p className="text-lg md:text-xl text-blue-200/70 leading-relaxed">
              מצטער מאוד בפני הילדים ומקווה לימים שקטים יותר.
            </p>
          </motion.div>

          <motion.p
            className="text-blue-300/80 text-lg font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            — סער
          </motion.p>
        </div>
      </section>

      <footer
        className="py-10 px-4 bg-[#070f1a] border-t border-white/[0.04]"
        dir="rtl"
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
          <img
            src={LOGO_URL}
            alt="אריות דדו"
            className="w-16 h-16 object-contain opacity-60"
          />
          <p className="text-blue-200/30 text-sm text-center">
            אריות דדו — מחנה הספורט והערכים
          </p>
          <p className="text-blue-200/20 text-xs">
            © {new Date().getFullYear()} כל הזכויות שמורות
          </p>
        </div>
      </footer>
    </div>
  );
}