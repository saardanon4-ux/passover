import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Users } from "lucide-react";

const timeSlots = [
  { time: "08:00 - 08:30", label: "התכנסות וחימום" },
  { time: "08:30 - 09:15", label: "פעילות ספורטיבית מרכזית" },
  { time: "09:15 - 10:00", label: "אימון כדורגל / משחקים קבוצתיים" },
  { time: "10:00 - 10:30", label: "הפסקת אוכל" },
  { time: "10:30 - 11:15", label: "פעילות ערכית / סדנה חווייתית" },
  { time: "11:15 - 12:00", label: "אימון / משחק ספורטיבי" },
  { time: "12:00 - 12:45", label: "פעילות גיבוש ומשחקים" },
  { time: "12:45 - 13:00", label: "מעגל סיכום וסגירת יום" }
];

const days = [
  { date: "24/3", dayName: "שלישי", active: true },
  { date: "25/3", dayName: "רביעי", active: true },
  { date: "26/3", dayName: "חמישי", active: true },
  { date: "27/3", dayName: "שישי", active: false },
  { date: "28/3", dayName: "שבת", active: false },
  { date: "29/3", dayName: "ראשון", active: true },
  { date: "30/3", dayName: "שני", active: true },
];

const groupAActivities = [
  ["התכנסות וחימום", "התכנסות וחימום"],
  ["אימון בוקר — כדורגל", "פעילות פתיחה — משחקי היכרות"],
  ["משחקים קבוצתיים — שיתוף פעולה", "אימון כדורגל חווייתי"],
  ["הפסקת אוכל", "הפסקת אוכל"],
  ["סדנת תנועה ואתלטיקה", "אימון דגש — עבודת צוות"],
  ["אימון כדורגל — דגש טכני", "פעילות ערכית — כבוד והקשבה"],
  ["פעילויות חוץ — באולינג/בריכה", "משחקי גיבוש"],
  ["מעגל סיכום וסיום יום", "מעגל סיכום וסיום יום"],
];

const groupBActivities = [
  ["התכנסות וחימום", "התכנסות וחימום"],
  ["פעילות פתיחה — משחקי היכרות", "אימון בוקר — כדורגל"],
  ["אימון כדורגל חווייתי", "משחקים קבוצתיים — שיתוף פעולה"],
  ["הפסקת אוכל", "הפסקת אוכל"],
  ["אימון דגש — עבודת צוות", "סדנת תנועה ואתלטיקה"],
  ["פעילות ערכית — כבוד והקשבה", "אימון כדורגל — דגש טכני"],
  ["משחקי גיבוש", "פעילויות חוץ — באולינג/בריכה"],
  ["מעגל סיכום וסיום יום", "מעגל סיכום וסיום יום"],
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
            לוח זמנים שבועי
          </h2>
          <p className="text-blue-100/50 text-base">
            24-30 במרץ 2026 • שישי ושבת ימי מנוחה
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
                  const activityPair = activities[rowIndex];
                  const activity = activityPair ? (dayIndex < 3 ? activityPair[0] : activityPair[1]) : slot.label;
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
                  const activityPair = activities[rowIndex];
                  const activity = activityPair ? (dayIndex < 3 ? activityPair[0] : activityPair[1]) : slot.label;
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
        <motion.p
          className="text-center text-blue-200/40 text-xs mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          * לוח הזמנים נועד להמחיש את סוג הפעילויות. התכנים והשעות עשויים להשתנות
        </motion.p>
      </div>
    </section>
  );
}