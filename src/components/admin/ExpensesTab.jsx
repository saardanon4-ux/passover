import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { format } from "date-fns";

const paymentMethods = {
  cash: "מזומן",
  transfer: "העברה בנקאית",
  bit: "ביט",
  credit_card: "כרטיס אשראי",
  check: "צ׳ק"
};

const categories = {
  equipment: "ציוד",
  food: "אוכל",
  venue: "מקום/מתחם",
  staff: "צוות",
  marketing: "שיווק",
  other: "אחר"
};

const emptyExpense = {
  description: "",
  amount: 0,
  payment_method: "",
  expense_date: "",
  is_planned: false,
  category: "",
  notes: ""
};

export default function ExpensesTab({ expenses }) {
  const [editingExpense, setEditingExpense] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data) => {
      const { data: inserted, error } = await supabase.from("expenses").insert([data]).select().single();
      if (error) throw error;
      return inserted;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      setEditingExpense(null);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const { data: updated, error } = await supabase.from("expenses").update(data).eq("id", id).select().single();
      if (error) throw error;
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      setEditingExpense(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("expenses").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expenses"] })
  });

  const handleAddNew = () => {
    setIsNew(true);
    setEditingExpense({ ...emptyExpense });
  };

  const handleEdit = (expense) => {
    setIsNew(false);
    setEditingExpense({ ...expense });
  };

  const handleSave = () => {
    if (isNew) {
      createMutation.mutate(editingExpense);
    } else {
      updateMutation.mutate({ id: editingExpense.id, data: editingExpense });
    }
  };

  const handleDelete = (id) => {
    if (confirm("האם למחוק את ההוצאה?")) {
      deleteMutation.mutate(id);
    }
  };

  const actualExpenses = expenses.filter(e => !e.is_planned);
  const plannedExpenses = expenses.filter(e => e.is_planned);

  const totalActual = actualExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const totalPlanned = plannedExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
            <span className="text-red-300/70 text-sm">הוצאות בפועל:</span>
            <span className="text-red-300 font-bold mr-2">₪{totalActual.toLocaleString()}</span>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-4 py-2">
            <span className="text-yellow-300/70 text-sm">הוצאות מתוכננות:</span>
            <span className="text-yellow-300 font-bold mr-2">₪{totalPlanned.toLocaleString()}</span>
          </div>
        </div>
        <Button onClick={handleAddNew} className="bg-blue-500 hover:bg-blue-600">
          <Plus className="w-4 h-4 ml-2" />
          הוספת הוצאה
        </Button>
      </div>

      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <Table dir="rtl">
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-right text-blue-200/70">סוג</TableHead>
              <TableHead className="text-right text-blue-200/70">תיאור</TableHead>
              <TableHead className="text-right text-blue-200/70">קטגוריה</TableHead>
              <TableHead className="text-right text-blue-200/70">סכום</TableHead>
              <TableHead className="text-right text-blue-200/70">אמצעי תשלום</TableHead>
              <TableHead className="text-right text-blue-200/70">תאריך</TableHead>
              <TableHead className="text-right text-blue-200/70">פעולות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-blue-200/50 py-8">
                  אין הוצאות עדיין
                </TableCell>
              </TableRow>
            ) : (
              expenses.map((expense) => (
                <TableRow key={expense.id} className="border-white/10 hover:bg-white/5">
                  <TableCell>
                    <Badge className={expense.is_planned ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" : "bg-red-500/20 text-red-300 border-red-500/30"}>
                      {expense.is_planned ? "מתוכננת" : "בפועל"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white font-medium">{expense.description}</TableCell>
                  <TableCell className="text-blue-100/70">
                    {expense.category ? categories[expense.category] : "-"}
                  </TableCell>
                  <TableCell className="text-blue-100/70">₪{expense.amount?.toLocaleString()}</TableCell>
                  <TableCell className="text-blue-100/70">
                    {expense.payment_method ? paymentMethods[expense.payment_method] : "-"}
                  </TableCell>
                  <TableCell className="text-blue-100/70">
                    {expense.expense_date ? format(new Date(expense.expense_date), "dd/MM/yyyy") : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(expense)}
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(expense.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editingExpense} onOpenChange={() => setEditingExpense(null)}>
        <DialogContent className="bg-[#0f2044] border-white/10 text-white max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>{isNew ? "הוספת הוצאה" : "עריכת הוצאה"}</DialogTitle>
          </DialogHeader>
          {editingExpense && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={editingExpense.is_planned}
                  onCheckedChange={(v) => setEditingExpense(prev => ({ ...prev, is_planned: v }))}
                  className="border-white/30 data-[state=checked]:bg-yellow-500"
                />
                <Label className="text-blue-100/80">הוצאה מתוכננת</Label>
              </div>
              <div className="space-y-2">
                <Label className="text-blue-100/80">תיאור</Label>
                <Input
                  value={editingExpense.description}
                  onChange={(e) => setEditingExpense(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="תיאור ההוצאה..."
                />
              </div>
              <div className="space-y-2">
                <Label className="text-blue-100/80">קטגוריה</Label>
                <Select
                  value={editingExpense.category || ""}
                  onValueChange={(v) => setEditingExpense(prev => ({ ...prev, category: v }))}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="בחר קטגוריה" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0f2044] border-white/10" dir="rtl">
                    {Object.entries(categories).map(([key, label]) => (
                      <SelectItem key={key} value={key} className="text-white hover:bg-white/10">
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-blue-100/80">סכום</Label>
                <Input
                  type="number"
                  value={editingExpense.amount || ""}
                  onChange={(e) => setEditingExpense(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-blue-100/80">אמצעי תשלום</Label>
                <Select
                  value={editingExpense.payment_method || ""}
                  onValueChange={(v) => setEditingExpense(prev => ({ ...prev, payment_method: v }))}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="בחר אמצעי תשלום" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0f2044] border-white/10" dir="rtl">
                    {Object.entries(paymentMethods).map(([key, label]) => (
                      <SelectItem key={key} value={key} className="text-white hover:bg-white/10">
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-blue-100/80">תאריך</Label>
                <Input
                  type="date"
                  value={editingExpense.expense_date || ""}
                  onChange={(e) => setEditingExpense(prev => ({ ...prev, expense_date: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-blue-100/80">הערות</Label>
                <Input
                  value={editingExpense.notes || ""}
                  onChange={(e) => setEditingExpense(prev => ({ ...prev, notes: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="הערות נוספות..."
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  <Check className="w-4 h-4 ml-2" />
                  שמור
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditingExpense(null)}
                  className="border-white/10 text-blue-200/70 hover:bg-white/10"
                >
                  <X className="w-4 h-4 ml-2" />
                  ביטול
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}