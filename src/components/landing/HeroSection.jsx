import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { ChevronLeft, Calendar, Users, Trophy } from "lucide-react";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6926de6ecd587609884dccf2/76fb90dd7_1.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" dir="rtl">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f2044] to-[#1a237e]" />
      
      {/* Animated circles */}
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
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/3"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.img
          src={LOGO_URL}
          alt="אריות דדו"
          className="w-40 h-40 md:w-52 md:h-52 mx-auto mb-6 object-contain drop-shadow-2xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-6 backdrop-blur-sm">
            פסח 2026 • 24-30 במרץ
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          מחנה הספורט
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-300 to-blue-500">
            והערכים
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-blue-100/70 max-w-2xl mx-auto mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          הרבה מעבר לכדורגל — חוויה ספורטיבית וחינוכית שמחזקת ביטחון עצמי, עבודת צוות ושייכות
        </motion.p>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex items-center gap-2 text-blue-200/80">
            <Calendar className="w-5 h-5" />
            <span className="text-sm md:text-base">5 ימי פעילות</span>
          </div>
          <div className="flex items-center gap-2 text-blue-200/80">
            <Users className="w-5 h-5" />
            <span className="text-sm md:text-base">כיתות ד׳ - ו׳</span>
          </div>
          <div className="flex items-center gap-2 text-blue-200/80">
            <Trophy className="w-5 h-5" />
            <span className="text-sm md:text-base">ספורט + ערכים</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            to={createPageUrl("Registration")}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-l from-blue-500 to-blue-600 text-white font-bold text-lg rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
          >
            הרשמה למחנה
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <a
            href="#schedule"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold text-lg rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/10 backdrop-blur-sm"
          >
            לוח זמנים
          </a>
        </motion.div>

        {/* Price badge */}
        <motion.div
          className="mt-10 inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-gradient-to-l from-amber-500/20 to-yellow-500/20 border border-yellow-500/30 rounded-2xl px-6 py-3 backdrop-blur-sm">
            <span className="text-yellow-300 font-bold text-lg">₪850</span>
            <span className="text-yellow-200/70 text-sm mr-2">בהרשמה מוקדמת עד 11.3.2026</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1b2a] to-transparent" />
    </section>
  );
}