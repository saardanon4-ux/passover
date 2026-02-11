import React, { useState } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { ArrowRight, Loader2, CheckCircle2, Pen } from "lucide-react";
import SignaturePad from "../components/registration/SignaturePad";
import PaymentTermsModal from "../components/registration/PaymentTermsModal";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6926de6ecd587609884dccf2/76fb90dd7_1.png";

export default function Registration() {
  const [form, setForm] = useState({
    child_name: "",
    parent_name: "",
    parent_phone: "",
    grade: "",
    shirt_size: "",
    health_declaration: false,
    payment_terms_accepted: false,
    signature_url: "",
    notes: ""
  });

  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [showPaymentTerms, setShowPaymentTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.child_name.trim()) newErrors.child_name = "שדה חובה";
    if (!form.parent_name.trim()) newErrors.parent_name = "שדה חובה";
    if (!form.parent_phone.trim()) newErrors.parent_phone = "שדה חובה";
    if (!form.grade) newErrors.grade = "שדה חובה";
    if (!form.shirt_size) newErrors.shirt_size = "שדה חובה";
    if (!form.health_declaration) newErrors.health_declaration = "יש לאשר את הצהרת הבריאות";
    if (!form.payment_terms_accepted) newErrors.payment_terms_accepted = "יש לאשר את תנאי התשלום";
    if (!form.signature_url) newErrors.signature_url = "יש לחתום";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    // Upload signature
    let signatureUrl = form.signature_url;
    if (form.signature_url.startsWith("data:")) {
      const blob = await (await fetch(form.signature_url)).blob();
      const file = new File([blob], "signature.png", { type: "image/png" });
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      signatureUrl = file_url;
    }

    await base44.entities.Registration.create({
      ...form,
      signature_url: signatureUrl,
      status: "pending"
    });

    setSubmitting(false);
    setSubmitted(true);
  };

  const handleSignatureSave = (dataUrl) => {
    updateField("signature_url", dataUrl);
    setShowSignaturePad(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0d1b2a] flex items-center justify-center px-4" dir="rtl">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">ההרשמה התקבלה!</h1>
          <p className="text-blue-100/60 mb-8">
            תודה שנרשמתם למחנה הספורט והערכים של אריות דדו. ניצור אתכם קשר בהקדם.
          </p>
          <Link
            to={createPageUrl("Home")}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה לדף הבית
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1b2a] py-10 px-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to={createPageUrl("Home")}>
            <img src={LOGO_URL} alt="אריות דדו" className="w-24 h-24 mx-auto mb-4 object-contain" />
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">הרשמה למחנה</h1>
          <p className="text-blue-100/50">פסח 2026 • 24-30 במרץ</p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-3xl p-6 md:p-8 border border-white/[0.06] space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Child Name */}
          <div className="space-y-2">
            <Label className="text-blue-100/80 text-sm font-medium">שם הילד/ה</Label>
            <Input
              value={form.child_name}
              onChange={(e) => updateField("child_name", e.target.value)}
              placeholder="שם מלא"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-blue-500/50 h-12"
            />
            {errors.child_name && <p className="text-red-400 text-xs">{errors.child_name}</p>}
          </div>

          {/* Parent Name */}
          <div className="space-y-2">
            <Label className="text-blue-100/80 text-sm font-medium">שם ההורה</Label>
            <Input
              value={form.parent_name}
              onChange={(e) => updateField("parent_name", e.target.value)}
              placeholder="שם מלא"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-blue-500/50 h-12"
            />
            {errors.parent_name && <p className="text-red-400 text-xs">{errors.parent_name}</p>}
          </div>

          {/* Parent Phone */}
          <div className="space-y-2">
            <Label className="text-blue-100/80 text-sm font-medium">טלפון הורה</Label>
            <Input
              type="tel"
              value={form.parent_phone}
              onChange={(e) => updateField("parent_phone", e.target.value)}
              placeholder="050-0000000"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-blue-500/50 h-12"
              dir="ltr"
            />
            {errors.parent_phone && <p className="text-red-400 text-xs">{errors.parent_phone}</p>}
          </div>

          {/* Grade & Shirt Size */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-blue-100/80 text-sm font-medium">כיתה</Label>
              <Select value={form.grade} onValueChange={(v) => updateField("grade", v)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                  <SelectValue placeholder="בחר כיתה" />
                </SelectTrigger>
                <SelectContent className="bg-[#0f2044] border-white/10">
                  <SelectItem value="ד" className="text-white hover:bg-white/10">כיתה ד׳</SelectItem>
                  <SelectItem value="ה" className="text-white hover:bg-white/10">כיתה ה׳</SelectItem>
                  <SelectItem value="ו" className="text-white hover:bg-white/10">כיתה ו׳</SelectItem>
                </SelectContent>
              </Select>
              {errors.grade && <p className="text-red-400 text-xs">{errors.grade}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-blue-100/80 text-sm font-medium">מידת חולצה</Label>
              <Select value={form.shirt_size} onValueChange={(v) => updateField("shirt_size", v)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                  <SelectValue placeholder="בחר מידה" />
                </SelectTrigger>
                <SelectContent className="bg-[#0f2044] border-white/10">
                  {["XS", "S", "M", "L", "XL"].map(size => (
                    <SelectItem key={size} value={size} className="text-white hover:bg-white/10">{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.shirt_size && <p className="text-red-400 text-xs">{errors.shirt_size}</p>}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/[0.06] pt-6">
            <h3 className="text-lg font-bold text-white mb-4">אישורים וחתימה</h3>
          </div>

          {/* Health Declaration */}
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Checkbox
                checked={form.health_declaration}
                onCheckedChange={(v) => updateField("health_declaration", v)}
                className="border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 mt-1"
              />
              <div>
                <span className="text-blue-100/80 text-sm leading-relaxed">
                  אני מצהיר/ה כי בני/בתי כשיר/ה מבחינה בריאותית להשתתף בפעילות ספורטיבית במסגרת המחנה.
                  אין לילד/ה בעיות בריאותיות המונעות השתתפות, ואני מתחייב/ת לעדכן את צוות המחנה במידה ויחול שינוי במצב הבריאותי.
                </span>
              </div>
            </div>
            {errors.health_declaration && <p className="text-red-400 text-xs">{errors.health_declaration}</p>}
          </div>

          {/* Payment Terms */}
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Checkbox
                checked={form.payment_terms_accepted}
                onCheckedChange={(v) => updateField("payment_terms_accepted", v)}
                className="border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 mt-1"
              />
              <div>
                <span className="text-blue-100/80 text-sm">
                  קראתי ואני מאשר/ת את{" "}
                  <button
                    type="button"
                    onClick={() => setShowPaymentTerms(true)}
                    className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors"
                  >
                    תנאי התשלום ומדיניות הביטולים
                  </button>
                </span>
              </div>
            </div>
            {errors.payment_terms_accepted && <p className="text-red-400 text-xs">{errors.payment_terms_accepted}</p>}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label className="text-blue-100/80 text-sm font-medium">הערות והעדפות (אופציונלי)</Label>
            <Textarea
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="בקשות או הערות מיוחדות בקשר לארוחת הבוקר, אלרגיות, העדפות תזונתיות וכו׳..."
              className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-blue-500/50 min-h-24 resize-none"
              rows={3}
            />
          </div>

          {/* Signature */}
          <div className="space-y-3">
            <Label className="text-blue-100/80 text-sm font-medium">חתימת הורה</Label>
            {showSignaturePad ? (
              <SignaturePad
                onSave={handleSignatureSave}
                onCancel={() => setShowSignaturePad(false)}
              />
            ) : form.signature_url ? (
              <div className="space-y-2">
                <div className="bg-[#0a1628] rounded-xl border border-blue-500/20 p-4 flex items-center justify-center">
                  <img src={form.signature_url} alt="חתימה" className="h-20 object-contain" />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowSignaturePad(true)}
                  className="w-full border-white/10 text-blue-200/60 hover:text-white hover:bg-white/10"
                >
                  <Pen className="w-4 h-4 ml-2" />
                  חתום מחדש
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowSignaturePad(true)}
                  className="w-full h-20 border-2 border-dashed border-white/10 text-blue-200/40 hover:text-blue-200/60 hover:border-blue-500/30 hover:bg-white/5 transition-all"
                >
                  <Pen className="w-5 h-5 ml-2" />
                  לחצו כאן לחתימה
                </Button>
                {errors.signature_url && <p className="text-red-400 text-xs mt-1">{errors.signature_url}</p>}
              </div>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-14 bg-gradient-to-l from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/25 disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                שולח...
              </>
            ) : (
              "שליחת הרשמה"
            )}
          </Button>
        </motion.form>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link
            to={createPageUrl("Home")}
            className="inline-flex items-center gap-2 text-blue-300/40 hover:text-blue-300/70 text-sm transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה לדף הבית
          </Link>
        </div>
      </div>

      <PaymentTermsModal open={showPaymentTerms} onClose={() => setShowPaymentTerms(false)} />
    </div>
  );
}