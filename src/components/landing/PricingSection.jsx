import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Check, ChevronLeft, Zap } from "lucide-react";

export default function PricingSection() {
  return (
    <section className="py-20 px-4 bg-[#0d1b2a]" dir="rtl">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-400 text-sm font-semibold tracking-wider">הצטרפו אלינו</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-4">
            מחירים והרשמה
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-3xl mx-auto">
          {/* Early Bird */}
          <motion.div
            className="relative bg-gradient-to-br from-blue-500/15 to-blue-600/5 rounded-3xl p-8 border-2 border-blue-500/30 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-l from-blue-500 to-blue-600 py-2 text-white text-xs font-bold">
              <Zap className="w-3 h-3 inline-block ml-1" />
              מומלץ
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-bold text-blue-300 mb-2">הרשמה מוקדמת</h3>
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-5xl font-black text-white">850</span>
                <span className="text-xl text-blue-300">₪</span>
              </div>
              <p className="text-blue-200/50 text-sm mb-6">עד 11.3.2026</p>
              <div className="space-y-3 text-right">
                {[
                  "5 ימי מחנה מושקעים",
                  "אימוני כדורגל + ספורט מגוון",
                  "פעילויות ערכיות ורגשיות",
                  "חולצת מחנה",
                  "10% הנחה לאח/ות נוסף/ת"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="text-blue-100/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Regular Price */}
          <motion.div
            className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] rounded-3xl p-8 border border-white/[0.06]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mt-4">
              <h3 className="text-lg font-bold text-blue-200/60 mb-2">מחיר רגיל</h3>
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-5xl font-black text-white/80">930</span>
                <span className="text-xl text-blue-300/60">₪</span>
              </div>
              <p className="text-blue-200/40 text-sm mb-6">לאחר 11.3.2026</p>
              <div className="space-y-3 text-right">
                {[
                  "5 ימי מחנה מושקעים",
                  "ארוחת בוקר עשירה בכל יום 🍳",
                  "אימוני כדורגל + ספורט מגוון",
                  "פעילויות ערכיות ורגשיות",
                  "חולצת מחנה",
                  "10% הנחה לאח/ות נוסף/ת"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400/40 shrink-0" />
                    <span className="text-blue-100/50 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            to={createPageUrl("Registration")}
            className="group inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-l from-blue-500 to-blue-600 text-white font-bold text-lg rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
          >
            הירשמו עכשיו
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <p className="text-blue-200/30 text-sm mt-4">מקומות מוגבלים!</p>
        </motion.div>
      </div>
    </section>
  );
}