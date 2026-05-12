import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Users } from "lucide-react";

const timeSlots = [
  { time: "08:00 - 08:30", label: "התכנסות וחימום" },
  { time: "08:30 - 09:15", label: "פעילות בוקר" },
  { time: "09:15 - 10:00", label: "המשך פעילות" },
  { time: "10:00 - 10:30", label: "הפסקת אוכל" },
  { time: "10:30 - 11:15", label: "אימון / סדנה" },
  { time: "11:15 - 12:00", label: "פעילות ספורטיבית" },
  { time: "12:00 - 12:45", label: "דיון / משחקים" },
  { time: "12:45 - 13:00", label: "סיכום וסיום יום" }
];

const days = [
  { date: "5/7", dayName: "ראשון", active: true },
  { date: "6/7", dayName: "שני", active: true },
  { date: "7/7", dayName: "שלישי", active: true },
  { date: "8/7", dayName: "רביעי", active: true },
  { date: "9/7", dayName: "חמישי", active: true },
];

const groupAActivities = [
  ["התכנסות והיכרות", "התכנסות וחימום", "התכנסות וחימום", "התכנסות וחימום", "התכנסות וחימום"],
  ["פעילות פתיחה - שיתוף פעולה", "אימון בוקר", "משחק אסטרטגיה וצוות", "אימון בוקר - מאמן נוער", "פילאטיס"],
  ["אימון בוקר", "פילאטיס", "פעילות אולם", "אימון בוקר - מאמן נוער", "אימון בוקר"],
  ["הפסקת אוכל", "הפסקת אוכל", "הפסקת אוכל", "הפסקת אוכל", "הפסקת אוכל"],
  ["אימון 2 - דגש בעיטות", "אימון 2 - דגש מסירה", "אימון - תנועה ללא כדור", "אימון סיומות - מאמן נוער", "טורניר סיום"],
  ["סדנת פיתוח אתלטי", "סדנת קאורדינציה", "סדנת תנועה", "פעילות אולם", "טורניר סיום"],
  ["דיון - אורח חיים בריא", "שחרור הגוף ותרגילי גמישות", "דיון - מנהיגות על המגרש", "חידון כדורגל + פרסים", "סיכום וסיום המחנה"],
  ["סיכום וסיום יום", "סיכום וסיום יום", "סיכום וסיום יום", "סיכום וסיום יום", "סיכום וסיום יום"],
];

const groupBActivities = [
  ["התכנסות והיכרות", "התכנסות וחימום", "התכנסות וחימום", "התכנסות וחימום", "התכנסות וחימום"],
  ["אימון בוקר", "פילאטיס", "פעילות אולם", "פעילות אולם", "אימון בוקר"],
  ["פעילות פתיחה - שיתוף פעולה", "אימון בוקר", "משחק אסטרטגיה וצוות", "אימון בוקר - מאמן נוער", "פילאטיס"],
  ["הפסקת אוכל", "הפסקת אוכל", "הפסקת אוכל", "הפסקת אוכל", "הפסקת אוכל"],
  ["סדנת פיתוח אתלטי", "סדנת קאורדינציה", "סדנת תנועה", "פעילות אולם", "טורניר סיום"],
  ["אימון 2 - דגש בעיטות", "אימון 2 - דגש מסירה", "אימון - תנועה ללא כדור", "אימון סיומות - מאמן נוער", "טורניר סיום"],
  ["דיון - אורח חיים בריא", "שחרור הגוף ותרגילי גמישות", "דיון - מנהיגות על המגרש", "חידון כדורגל + פרסים", "סיכום וסיום המחנה"],
  ["סיכום וסיום יום", "סיכום וסיום יום", "סיכום וסיום יום", "סיכום וסיום יום", "סיכום וסיום יום"],
];

export default function ScheduleSection() {
  const [activeGroup, setActiveGroup] = useState("A");
  const activities = activeGroup === "A" ? groupAActivities : groupBActivities;
  const activeDays = days.filter(d => d.active);

  return (
    <section id="schedule" className="py-20 px-4 bg-[#0a1628]" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-400 text-sm font-semibold tracking-wider">מה מחכה לנו?</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-4">
            לוח זמנים לדוגמא
          </h2>
          <p className="text-blue-100/50 text-base">
            5–9 ביולי 2026 • ראשון עד חמישי, חמישה ימי פעילות רצופים
          </p>
        </motion.div>

        {/* Group Toggle */}
        <div className="flex justify-center gap-3 mb-8">
          {["A", "B"].map((group) => (
            <button
              key={group}
              onClick={() => setActiveGroup(group)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                activeGroup === group
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white/5 text-blue-200/60 hover:bg-white/10 border border-white/10"
              }`}
            >
              <Users className="w-4 h-4" />
              קבוצה {group === "A" ? "א׳" : "ב׳"}
            </button>
          ))}
        </div>

        {/* Desktop Table */}
        <motion.div
          className="hidden lg:block overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] rounded-2xl border border-white/[0.06] overflow-hidden min-w-[900px]">
            {/* Header Row */}
            <div className="grid grid-cols-[140px_repeat(5,1fr)] bg-blue-500/10 border-b border-white/[0.06]">
              <div className="p-4 flex items-center gap-2 text-blue-300 font-semibold text-sm border-l border-white/[0.06]">
                <Clock className="w-4 h-4" />
                שעה
              </div>
              {activeDays.map((day) => (
                <div key={day.date} className="p-4 text-center border-l border-white/[0.06] last:border-l-0">
                  <div className="text-white font-bold text-sm">יום {day.dayName}</div>
                  <div className="text-blue-300/60 text-xs mt-1">{day.date}</div>
                </div>
              ))}
            </div>

            {/* Time Slots */}
            {timeSlots.map((slot, rowIndex) => (
              <div
                key={slot.time}
                className={`grid grid-cols-[140px_repeat(5,1fr)] ${
                  rowIndex % 2 === 0 ? "bg-white/[0.01]" : "bg-transparent"
                } ${slot.label === "הפסקת אוכל" ? "bg-amber-500/5" : ""} border-b border-white/[0.04] last:border-b-0`}
              >
                <div className="p-3 text-blue-200/60 text-xs font-mono border-l border-white/[0.06] flex items-center">
                  {slot.time}
                </div>
                {activeDays.map((day, dayIndex) => {
                  const activityRow = activities[rowIndex];
                  const activity = activityRow ? activityRow[dayIndex] : slot.label;
                  const isBreak = slot.label === "הפסקת אוכל";
                  return (
                    <div
                      key={day.date}
                      className={`p-3 text-sm border-l border-white/[0.04] last:border-l-0 flex items-center ${
                        isBreak ? "text-amber-300/70" : "text-blue-100/60"
                      }`}
                    >
                      {isBreak ? "🍽️ הפסקת אוכל" : activity}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {activeDays.map((day, dayIndex) => (
            <motion.div
              key={day.date}
              className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] rounded-2xl border border-white/[0.06] overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: dayIndex * 0.1 }}
            >
              <div className="bg-blue-500/10 p-4 border-b border-white/[0.06]">
                <span className="text-white font-bold">יום {day.dayName}</span>
                <span className="text-blue-300/60 text-sm mr-2">{day.date}</span>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {timeSlots.map((slot, rowIndex) => {
                  const activityRow = activities[rowIndex];
                  const activity = activityRow ? activityRow[dayIndex] : slot.label;
                  const isBreak = slot.label === "הפסקת אוכל";
                  return (
                    <div key={slot.time} className={`p-3 flex justify-between items-center ${isBreak ? "bg-amber-500/5" : ""}`}>
                      <span className={`text-sm ${isBreak ? "text-amber-300/70" : "text-blue-100/60"}`}>
                        {isBreak ? "🍽️ הפסקת אוכל" : activity}
                      </span>
                      <span className="text-blue-200/40 text-xs font-mono">{slot.time}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          className="mt-8 space-y-2 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-blue-200/60 text-sm font-semibold">
            ⚠️ זהו לוח זמנים לדוגמא בלבד
          </p>
          <p className="text-blue-200/40 text-xs">
            * התכנים והשעות עשויים להשתנות
          </p>
          <p className="text-blue-200/40 text-xs">
            * בכל יום, הילדים ישתתפו בהכנת ארוחת הבוקר
          </p>
          <p className="text-blue-200/40 text-xs">
            * הדגש במחנה הוא על התפתחות אישית ופחות על תחרותיות
          </p>
          <p className="text-blue-200/40 text-xs">
            * במחנה, לא נחייב שום ילד להשתתף בשום חלק. אנחנו מאמינים בבחירה של הילד
          </p>
        </motion.div>
      </div>
    </section>
  );
}