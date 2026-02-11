import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { ArrowRight, Users, Shirt, CreditCard, Receipt, BarChart3, Loader2, ShieldAlert } from "lucide-react";

import RegistrationsTab from "../components/admin/RegistrationsTab";
import SizesTab from "../components/admin/SizesTab";
import PaymentsTab from "../components/admin/PaymentsTab";
import ExpensesTab from "../components/admin/ExpensesTab";
import SummaryTab from "../components/admin/SummaryTab";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6926de6ecd587609884dccf2/76fb90dd7_1.png";

export default function Admin() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await base44.auth.me();
        setCurrentUser(user);
      } catch (e) {
        setCurrentUser(null);
      }
      setIsCheckingAuth(false);
    };
    checkAuth();
  }, []);

  const { data: registrations = [], isLoading: loadingReg } = useQuery({
    queryKey: ["registrations"],
    queryFn: () => base44.entities.Registration.list("-created_date"),
    enabled: currentUser?.role === "admin"
  });

  const { data: payments = [], isLoading: loadingPay } = useQuery({
    queryKey: ["payments"],
    queryFn: () => base44.entities.Payment.list(),
    enabled: currentUser?.role === "admin"
  });

  const { data: expenses = [], isLoading: loadingExp } = useQuery({
    queryKey: ["expenses"],
    queryFn: () => base44.entities.Expense.list("-created_date"),
    enabled: currentUser?.role === "admin"
  });

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#0d1b2a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#0d1b2a] flex items-center justify-center px-4" dir="rtl">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">אין גישה</h1>
          <p className="text-blue-100/60 mb-6">עמוד זה מיועד למנהלים בלבד.</p>
          <Link
            to={createPageUrl("Home")}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה לדף הבית
          </Link>
        </div>
      </div>
    );
  }

  const isLoading = loadingReg || loadingPay || loadingExp;

  return (
    <div className="min-h-screen bg-[#0d1b2a] py-8 px-4" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to={createPageUrl("Home")}>
              <img src={LOGO_URL} alt="אריות דדו" className="w-14 h-14 object-contain" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">מערכת ניהול</h1>
              <p className="text-blue-200/50 text-sm">מחנה אריות דדו - פסח 2026</p>
            </div>
          </div>
          <Link
            to={createPageUrl("Home")}
            className="text-blue-300/50 hover:text-blue-300 text-sm flex items-center gap-1"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה לאתר
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
          </div>
        ) : (
          <Tabs defaultValue="registrations" className="space-y-6">
            <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl flex-wrap h-auto gap-1">
              <TabsTrigger
                value="registrations"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-blue-200/60 rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                הרשמות ({registrations.length})
              </TabsTrigger>
              <TabsTrigger
                value="sizes"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-blue-200/60 rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <Shirt className="w-4 h-4" />
                מידות
              </TabsTrigger>
              <TabsTrigger
                value="payments"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-blue-200/60 rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                תשלומים
              </TabsTrigger>
              <TabsTrigger
                value="expenses"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-blue-200/60 rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <Receipt className="w-4 h-4" />
                הוצאות
              </TabsTrigger>
              <TabsTrigger
                value="summary"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-blue-200/60 rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                סיכום
              </TabsTrigger>
            </TabsList>

            <TabsContent value="registrations">
              <RegistrationsTab registrations={registrations} />
            </TabsContent>

            <TabsContent value="sizes">
              <SizesTab registrations={registrations} />
            </TabsContent>

            <TabsContent value="payments">
              <PaymentsTab registrations={registrations} payments={payments} />
            </TabsContent>

            <TabsContent value="expenses">
              <ExpensesTab expenses={expenses} />
            </TabsContent>

            <TabsContent value="summary">
              <SummaryTab registrations={registrations} payments={payments} expenses={expenses} />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}