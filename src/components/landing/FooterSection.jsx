import React from "react";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6926de6ecd587609884dccf2/76fb90dd7_1.png";

export default function FooterSection() {
  return (
    <footer className="py-10 px-4 bg-[#070f1a] border-t border-white/[0.04]" dir="rtl">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
        <img src={LOGO_URL} alt="אריות דדו" className="w-16 h-16 object-contain opacity-60" />
        <p className="text-blue-200/30 text-sm text-center">
          אריות דדו — מחנה הספורט והערכים • פסח 2026
        </p>
        <p className="text-blue-200/20 text-xs">
          © {new Date().getFullYear()} כל הזכויות שמורות
        </p>
      </div>
    </footer>
  );
}