import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Check, ChevronLeft } from "lucide-react";

const INCLUDED = [
  "5 ימי מחנה מושקעים",
  "ארוחת בוקר עשירה בכל יום 🍳",
  "אימוני כדורגל + ספורט מגוון",
  "פעילויות ערכיות ורגשיות",
  "חולצת מחנה",
  "10% הנחה לאח/ות נוסף/ת",
];

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
          <p className="text-blue-100/50 text-base max-w-xl mx-auto mb-2">
            מחנה קיץ 2026 • 5–9 ביולי
          </p>
        </motion.div>

        <motion.div
          className="mt-12 max-w-md mx-auto bg-gradient-to-br from-blue-500/15 to-blue-600/5 rounded-3xl p-8 border-2 border-blue-500/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-lg font-bold text-blue-300 mb-2">עלות המחנה</h3>
          <div className="flex items-baseline justify-center gap-1 mb-6">
            <span className="text-5xl font-black text-white">850</span>
            <span className="text-xl text-blue-300">₪</span>
          </div>
          <div className="space-y-3 text-right">
            {INCLUDED.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-blue-100/70 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

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
