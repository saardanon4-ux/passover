import React from "react";
import { Phone, AlertCircle } from "lucide-react";
import { CAMP_DATES_LABEL, CONTACT } from "@/config/camp";

export default function CampClosureNotice({ className = "" }) {
  return (
    <div
      className={`bg-gradient-to-br from-amber-500/20 to-orange-500/10 border-2 border-amber-500/40 rounded-2xl p-6 md:p-8 text-center backdrop-blur-sm ${className}`}
      dir="rtl"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <AlertCircle className="w-7 h-7 text-amber-400 shrink-0" />
        <h2 className="text-xl md:text-2xl font-black text-amber-100">עדכון חשוב</h2>
      </div>
      <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
        לצערנו, כרגע לא יתקיים מחנה בתאריכים המבוקשים
        <span className="text-amber-200 font-semibold"> ({CAMP_DATES_LABEL})</span>.
      </p>
      <p className="text-blue-100/70 text-sm md:text-base mt-4">
        לפרטים נוספים — {CONTACT.name}:
      </p>
      <a
        href={CONTACT.phoneHref}
        className="inline-flex items-center justify-center gap-2 mt-3 px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-white font-bold text-lg transition-colors"
        dir="ltr"
      >
        <Phone className="w-5 h-5" />
        {CONTACT.phone}
      </a>
    </div>
  );
}
