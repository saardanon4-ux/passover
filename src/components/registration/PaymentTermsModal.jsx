import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function PaymentTermsModal({ open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-[#0f2044] border border-white/10 text-white max-h-[80vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white text-right">תנאי תשלום ומדיניות ביטולים</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 text-blue-100/80 text-sm leading-relaxed mt-4">
          <div>
            <p className="font-bold text-blue-300 text-base mb-2">🏆 הרשמה מוקדמת במחיר מיוחד!</p>
            <p>💰 850 ש״ח בלבד לנרשמים עד 11.3.2026</p>
            <p>📌 לאחר תאריך זה — 930 ש״ח</p>
            <p>👨‍👩‍👧‍👦 הרשמה לשני אחים ומעלה? קבלו 10% הנחה לכל ילד נוסף!</p>
          </div>
          
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
            <p className="font-bold text-amber-300 mb-1">📢 שימו לב!</p>
            <p>כדי ליהנות מהמחיר המוזל של ההרשמה המוקדמת, יש להשלים את התשלום עד 11.3.2026.</p>
          </div>

          <div className="border-t border-white/10 pt-4">
            <p className="font-bold text-blue-300 text-base mb-3">מדיניות ביטולים ותשלומים</p>
            
            <div className="space-y-2">
              <p>✅ <strong>תשלום והבטחת מקום:</strong></p>
              <p>מקום במחנה מובטח רק לאחר השלמת התשלום המלא.</p>
            </div>

            <div className="space-y-2 mt-3">
              <p>❌ <strong>מדיניות ביטולים:</strong></p>
              <p>🔹 ביטול עד 15.3.2026 — החזר מלא.</p>
              <p>🔹 ביטול בין 16.3.2026 ל-20.3.2026 — החזר של 50% מהתשלום.</p>
            </div>
          </div>

          <p className="text-blue-400 font-bold text-center text-base mt-4">
            ⚽ מקומות מוגבלים — נרשמים עכשיו ונהנים מהמחיר המוזל!
          </p>
        </div>

        <Button
          onClick={onClose}
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white"
        >
          הבנתי, סגור
        </Button>
      </DialogContent>
    </Dialog>
  );
}