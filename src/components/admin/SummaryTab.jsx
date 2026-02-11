import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Calculator } from "lucide-react";

const EXPECTED_PAYMENT_PER_CHILD = 750;

export default function SummaryTab({ registrations, payments, expenses }) {
  // הכנסות בפועל - רק מי ששילם
  const paidPayments = payments.filter(p => p.is_paid);
  const totalIncome = paidPayments.reduce((sum, p) => sum + (p.amount || 0), 0);

  // הוצאות בפועל ומתוכננות
  const actualExpenses = expenses.filter(e => !e.is_planned);
  const plannedExpenses = expenses.filter(e => e.is_planned);
  const totalActualExpenses = actualExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const totalPlannedExpenses = plannedExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  // רווח בפועל
  const actualProfit = totalIncome - totalActualExpenses;

  // חישוב רווח צפוי
  const paidRegistrationIds = paidPayments.map(p => p.registration_id);
  const unpaidRegistrations = registrations.filter(r => !paidRegistrationIds.includes(r.id));
  const expectedFromUnpaid = unpaidRegistrations.length * EXPECTED_PAYMENT_PER_CHILD;
  const expectedTotalIncome = totalIncome + expectedFromUnpaid;
  const expectedProfit = expectedTotalIncome - totalActualExpenses - totalPlannedExpenses;

  // סטטיסטיקות
  const totalRegistrations = registrations.length;
  const paidCount = paidPayments.length;
  const unpaidCount = unpaidRegistrations.length;

  return (
    <div className="space-y-6">
      {/* סטטיסטיקות כלליות */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-blue-200/60 text-sm">סה״כ נרשמים</p>
                <p className="text-2xl font-bold text-white">{totalRegistrations}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-500/10 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-green-200/60 text-sm">שילמו</p>
                <p className="text-2xl font-bold text-white">{paidCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-500/10 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-yellow-200/60 text-sm">ממתינים לתשלום</p>
                <p className="text-2xl font-bold text-white">{unpaidCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-500/10 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-purple-200/60 text-sm">ממוצע לנרשם</p>
                <p className="text-2xl font-bold text-white">
                  ₪{paidCount > 0 ? Math.round(totalIncome / paidCount) : 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* רווח בפועל */}
      <Card className="bg-gradient-to-br from-green-500/15 to-green-600/5 border-green-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            מצב כספי בפועל
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-green-200/60 text-sm mb-1">הכנסות בפועל</p>
              <p className="text-3xl font-black text-green-400">₪{totalIncome.toLocaleString()}</p>
              <p className="text-green-200/40 text-xs mt-1">{paidCount} תשלומים התקבלו</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-red-200/60 text-sm mb-1">הוצאות בפועל</p>
              <p className="text-3xl font-black text-red-400">₪{totalActualExpenses.toLocaleString()}</p>
              <p className="text-red-200/40 text-xs mt-1">{actualExpenses.length} הוצאות</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white/60 text-sm mb-1">רווח בפועל</p>
              <p className={`text-3xl font-black ${actualProfit >= 0 ? "text-green-400" : "text-red-400"}`}>
                ₪{actualProfit.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* רווח צפוי */}
      <Card className="bg-gradient-to-br from-amber-500/15 to-yellow-600/5 border-amber-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-400" />
            צפי כספי (כולל מתוכנן)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-amber-200/60 text-sm mb-1">הכנסות צפויות מלא-משלמים</p>
              <p className="text-2xl font-bold text-amber-300">₪{expectedFromUnpaid.toLocaleString()}</p>
              <p className="text-amber-200/40 text-xs mt-1">{unpaidCount} × ₪{EXPECTED_PAYMENT_PER_CHILD}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-green-200/60 text-sm mb-1">סה״כ הכנסות צפויות</p>
              <p className="text-2xl font-bold text-green-300">₪{expectedTotalIncome.toLocaleString()}</p>
              <p className="text-green-200/40 text-xs mt-1">שולם + צפי</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-yellow-200/60 text-sm mb-1">הוצאות מתוכננות</p>
              <p className="text-2xl font-bold text-yellow-300">₪{totalPlannedExpenses.toLocaleString()}</p>
              <p className="text-yellow-200/40 text-xs mt-1">{plannedExpenses.length} הוצאות מתוכננות</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white/60 text-sm mb-1">רווח צפוי</p>
              <p className={`text-2xl font-bold ${expectedProfit >= 0 ? "text-green-300" : "text-red-300"}`}>
                ₪{expectedProfit.toLocaleString()}
              </p>
              <p className="text-white/40 text-xs mt-1">הכנסות צפויות - כל ההוצאות</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
            <p className="text-amber-200/80 text-sm">
              <strong>הערה:</strong> הרווח הצפוי מחושב לפי הנחה של ₪{EXPECTED_PAYMENT_PER_CHILD} לכל ילד שעדיין לא שילם, 
              בתוספת התשלומים שכבר התקבלו, פחות כל ההוצאות (בפועל + מתוכננות).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}