import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Camera } from "lucide-react";

// Actual camp photos
const galleryImages = [
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c158b7df8a2d4f6193ac5/3613e7b27_4AC1A0E4-1A37-41C9-A619-061406F05986.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c158b7df8a2d4f6193ac5/5d9d1f631_617e2221-2c6a-43c8-8b7e-e513de09a851.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c158b7df8a2d4f6193ac5/7a8a2ef14_fdd7bc52-22eb-4376-8e21-d9e8b9d38c25.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c158b7df8a2d4f6193ac5/428522e91_IMG_5129.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c158b7df8a2d4f6193ac5/434aa6ec0_IMG_5138.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c158b7df8a2d4f6193ac5/60def314c_IMG_5149.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c158b7df8a2d4f6193ac5/88e931fde_IMG_5161.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c158b7df8a2d4f6193ac5/675ccabcb_IMG_5263.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c158b7df8a2d4f6193ac5/06abd7704_IMG_5306.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c158b7df8a2d4f6193ac5/80d61e086_IMG_5325.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c158b7df8a2d4f6193ac5/a2fd2c185_IMG_5367.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c158b7df8a2d4f6193ac5/bd8c07895_IMG_5479.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c158b7df8a2d4f6193ac5/e24044c97_IMG_5505.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c158b7df8a2d4f6193ac5/08903d72a_IMG_5719.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c158b7df8a2d4f6193ac5/16913bd84_IMG_5728.jpg",
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/698c158b7df8a2d4f6193ac5/20d60d206_IMG_5839.jpg",
];

export default function GallerySection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-20 px-4 bg-[#0a1628]" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-400 text-sm font-semibold tracking-wider flex items-center justify-center gap-2">
            <Camera className="w-4 h-4" />
            רגעים מהמחנה
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-3">
            תמונות ממחנות קודמים
          </h2>
        </motion.div>

        <div className="relative">
          {/* Scroll container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                className="flex-shrink-0 w-72 md:w-80 h-52 md:h-60 rounded-2xl overflow-hidden relative group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <img
                  src={img}
                  alt={`תמונה ממחנה ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Navigation */}
          <button
            onClick={() => scroll("right")}
            className="absolute top-1/2 -translate-y-1/2 -right-2 md:-right-5 w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/20 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("left")}
            className="absolute top-1/2 -translate-y-1/2 -left-2 md:-left-5 w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/20 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center text-blue-200/30 text-xs mt-6">
          * תמונות ממחנות קודמים
        </p>
      </div>
    </section>
  );
}