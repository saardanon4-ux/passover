import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Target, MessageCircle, Handshake, Star } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "ביטחון עצמי",
    description: "חיזוק האמונה של כל ילד ביכולות שלו דרך חוויות הצלחה"
  },
  {
    icon: Users,
    title: "עבודת צוות",
    description: "פיתוח יכולת שיתוף פעולה והובלה במשחקים קבוצתיים"
  },
  {
    icon: Target,
    title: "התמודדות",
    description: "למידה להתמודד עם תסכול וכישלון בצורה בטוחה ומכילה"
  },
  {
    icon: MessageCircle,
    title: "הקשבה ורגשות",
    description: "מתן מקום לרגשות ושיחות מעגל שמחזקות מודעות רגשית"
  },
  {
    icon: Handshake,
    title: "כבוד ואחריות",
    description: "חיבור לערכים של כבוד, אחריות, הקשבה ועזרה הדדית"
  },
  {
    icon: Star,
    title: "שייכות",
    description: "כל ילד מרגיש שרואים ושומעים אותו - חלק מהקבוצה"
  }
];

export default function AboutSection() {
  return (
    <section className="py-20 px-4 bg-[#0d1b2a]" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-400 text-sm font-semibold tracking-wider">הרעיון שלנו</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-6">
            הרבה מעבר לכדורגל
          </h2>
          <p className="text-blue-100/60 text-lg max-w-3xl mx-auto leading-relaxed">
            המחנה נבנה מתוך רצון ליצור חוויה שהיא הרבה מעבר לאימוני כדורגל. 
            הרעיון המרכזי הוא להשתמש בספורט כשפה חינוכית ורגשית - שמאפשרת לילדים 
            להתנסות, לטעות, להצליח, להרגיש ולהיות חלק מקבוצה.
          </p>
          <p className="text-blue-300 text-base mt-4 font-semibold">
            המחנה מיועד לילדי כיתות ד׳, ה׳ וו׳
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="group relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl p-6 border border-white/[0.06] hover:border-blue-500/30 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                <value.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
              <p className="text-blue-100/50 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Special Highlight - Soccer Player */}
        <motion.div
          className="mt-16 bg-gradient-to-br from-amber-500/15 to-yellow-500/10 rounded-3xl p-8 md:p-12 border-2 border-amber-500/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-8 h-8 text-amber-400" />
            <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-l from-amber-300 to-yellow-400">
              חוויה מיוחדת!
            </h3>
            <Star className="w-8 h-8 text-amber-400" />
          </div>
          <p className="text-blue-100/90 text-lg md:text-xl text-center leading-relaxed font-medium">
            מפגש עם שחקן כדורגל מליגת העל! 🌟
            <br />
            <span className="text-blue-100/70 text-base md:text-lg block mt-2">
              השחקן ישתף על הדרך שעבר, האתגרים שהתמודד איתם, וחוויות מהמגרש המקצועי
            </span>
          </p>
        </motion.div>

        {/* Activities list */}
        <motion.div
          className="mt-10 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-3xl p-8 md:p-12 border border-blue-500/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">מה עושים במחנה?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "אימוני כדורגל חווייתיים עם דגש על שיתוף פעולה",
              "משחקים קבוצתיים שמחזקים עבודת צוות ותקשורת",
              "ארוחות בוקר עשירות שהילדים מכינים בעצמם! 🍳",
              "תרגילי התמודדות עם תסכול והצלחה בצורה מכילה",
              "פעילויות גיבוש שמחזקות שייכות וחברות",
              "חיבור לערכים: כבוד, אחריות, הקשבה והתמדה"
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 shrink-0" />
                <span className="text-blue-100/70 text-sm md:text-base">{activity}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}