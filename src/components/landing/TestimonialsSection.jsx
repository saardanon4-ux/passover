import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Quote } from "lucide-react";

const testimonials = [
  "סער, אני חייבת להודות לך על השבוע הזה, הילדים חזרו כל יום בעננים, נהנו מכל רגע! וכל יום היה טוב מקודמו, כל הכבוד לך, על ההשקעה, על היחס החם, אתה באמת אלוף, ממש זכינו בך!",
  "סער אתה נכס!!! תודה על ההשקעה בילדים, על צבירת חוויות שלא ישכחו. אוהבים אותך",
  "תודה רבה על מחנה מושקע ומגוון, אור מאוד נהנה קם כל בוקר והלך בכיף!!!",
  "היה מדהים! ההשקעה והמחשבה ניכרים, היה מגוון, מעניין ומלא חוויות",
  "עוז נהנה וחיכה כל יום להגיע ומאוד הורגש שהיה מושקע וששמת מלא מחשבה בזה! ממש זמן שנוצל היטב!",
  "גילעד ממש נהנה, וחזר כל יום מאושר ומתרגש לקראת היום הבא. ניכר שהשקעת הרבה מחשבה, וגם אנחנו הרגשנו את זה. זכינו בך",
  "חייבת לפרגן ולהודות — שיהונתנוש שלנו מאוד מאוד נהנה! כל בוקר השכים קום, והלך במרץ ובשמחה! וחזר מבסוט!! וראוי לציין, שעד עכשיו, לפני שהוא יוצא לספורט, הוא הולך לראות מה מותר וכדאי לו לאכול, מהתפריט המומלץ לספורטאי הצעיר, ששלחתם לנו, ותלינו אותו כמובן עד עכשיו, על המקרר"
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef(null);

  const goTo = (newIndex, dir) => {
    setDirection(dir);
    setCurrentIndex(newIndex);
  };

  const next = () => {
    goTo((currentIndex + 1) % testimonials.length, -1);
  };

  const prev = () => {
    goTo((currentIndex - 1 + testimonials.length) % testimonials.length, 1);
  };

  useEffect(() => {
    intervalRef.current = setInterval(next, 6000);
    return () => clearInterval(intervalRef.current);
  }, [currentIndex]);

  return (
    <section className="py-20 px-4 bg-[#0d1b2a]" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-400 text-sm font-semibold tracking-wider">מה ההורים אומרים</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-3">
            המלצות מהשטח
          </h2>
        </motion.div>

        <div className="relative">
          {/* Quote Card */}
          <div className="relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-3xl p-8 md:p-12 border border-white/[0.06] min-h-[220px] flex flex-col items-center justify-center">
            <Quote className="w-10 h-10 text-blue-500/30 mb-6" />
            
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 50 }}
              transition={{ duration: 0.4 }}
              className="text-blue-100/80 text-lg md:text-xl leading-relaxed text-center max-w-3xl"
            >
              &ldquo;{testimonials[currentIndex]}&rdquo;
            </motion.p>

            {/* Dots */}
            <div className="flex gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > currentIndex ? -1 : 1)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "bg-blue-400 w-6" : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 w-10 h-10 md:w-12 md:h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 w-10 h-10 md:w-12 md:h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}