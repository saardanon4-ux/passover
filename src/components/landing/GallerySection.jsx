import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Camera } from "lucide-react";

// Placeholder images — replace with actual camp photos
const galleryImages = [
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
  "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800&q=80",
  "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
  "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80",
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
          * תמונות להמחשה ממחנות קודמים
        </p>
      </div>
    </section>
  );
}