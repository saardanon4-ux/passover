import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Check, X, Pencil, Upload, Loader2 } from "lucide-react";
import { format } from "date-fns";

const paymentMethods = {
  cash: "מזומן",
  transfer: "העברה בנקאית",
  bit: "ביט",
  credit_card: "כרטיס אשראי",
  check: "צ׳ק"
};

export default function PaymentsTab({ registrations, payments }) {
  const [editingPayment, setEditingPayment] = useState(null);
  const [uploadingReceipt, setUploadingReceipt] = useState(false);
  const queryClient = useQueryClient();

  const createPaymentMutation = useMutation({
    mutationFn: (data) => base44.entities.Payment.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["payments"] })
  });

  const updatePaymentMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Payment.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      setEditingPayment(null);
    }
  });

  const getPaymentForRegistration = (regId) => {
    return payments.find(p => p.registration_id === regId);
  };

  const handleTogglePaid = async (reg) => {
    const existingPayment = getPaymentForRegistration(reg.id);
    if (existingPayment) {
      updatePaymentMutation.mutate({
        id: existingPayment.id,
        data: { is_paid: !existingPayment.is_paid }
      });
    } else {
      createPaymentMutation.mutate({
        registration_id: reg.id,
        child_name: reg.child_name,
        is_paid: true,
        amount: 0
      });
    }
  };

  const handleEditPayment = (reg) => {
    const existingPayment = getPaymentForRegistration(reg.id);
    setEditingPayment({
      registration_id: reg.id,
      child_name: reg.child_name,
      ...(existingPayment || { amount: 0, payment_method: "", is_paid: false, receipt_url: "", notes: "" }),
      id: existingPayment?.id
    });
  };

  const handleSavePayment = async () => {
    if (editingPayment.id) {
      updatePaymentMutation.mutate({
        id: editingPayment.id,
        data: editingPayment
      });
    } else {
      createPaymentMutation.mutate(editingPayment);
      setEditingPayment(null);
    }
  };

  const handleReceiptUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingReceipt(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setEditingPayment(prev => ({ ...prev, receipt_url: file_url }));
    setUploadingReceipt(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <Table dir="rtl">
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-right text-blue-200/70">שולם</TableHead>
              <TableHead className="text-right text-blue-200/70">שם הילד/ה</TableHead>
              <TableHead className="text-right text-blue-200/70">סכום</TableHead>
              <TableHead className="text-right text-blue-200/70">אמצעי תשלום</TableHead>
              <TableHead className="text-right text-blue-200/70">תאריך</TableHead>
              <TableHead className="text-right text-blue-200/70">אסמכתא</TableHead>
              <TableHead className="text-right text-blue-200/70">פעולות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations.map((reg) => {
              const payment = getPaymentForRegistration(reg.id);
              return (
                <TableRow key={reg.id} className="border-white/10 hover:bg-white/5">
                  <TableCell>
                    <Checkbox
                      checked={payment?.is_paid || false}
                      onCheckedChange={() => handleTogglePaid(reg)}
                      className="border-white/30 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                  </TableCell>
                  <TableCell className="text-white font-medium">{reg.child_name}</TableCell>
                  <TableCell className="text-blue-100/70">
                    {payment?.amount ? `₪${payment.amount}` : "-"}
                  </TableCell>
                  <TableCell className="text-blue-100/70">
                    {payment?.payment_method ? paymentMethods[payment.payment_method] : "-"}
                  </TableCell>
                  <TableCell className="text-blue-100/70">
                    {payment?.payment_date ? format(new Date(payment.payment_date), "dd/MM/yyyy") : "-"}
                  </TableCell>
                  <TableCell>
                    {payment?.receipt_url ? (
                      <a
                        href={payment.receipt_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        צפה
                      </a>
                    ) : (
                      <span className="text-blue-200/30">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditPayment(reg)}
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editingPayment} onOpenChange={() => setEditingPayment(null)}>
        <DialogContent className="bg-[#0f2044] border-white/10 text-white max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>עריכת תשלום - {editingPayment?.child_name}</DialogTitle>
          </DialogHeader>
          {editingPayment && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={editingPayment.is_paid}
                  onCheckedChange={(v) => setEditingPayment(prev => ({ ...prev, is_paid: v }))}
                  className="border-white/30 data-[state=checked]:bg-green-500"
                />
                <Label className="text-blue-100/80">שולם</Label>
              </div>
              <div className="space-y-2">
                <Label className="text-blue-100/80">סכום</Label>
                <Input
                  type="number"
                  value={editingPayment.amount || ""}
                  onChange={(e) => setEditingPayment(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-blue-100/80">אמצעי תשלום</Label>
                <Select
                  value={editingPayment.payment_method || ""}
                  onValueChange={(v) => setEditingPayment(prev => ({ ...prev, payment_method: v }))}
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
                <Label className="text-blue-100/80">תאריך תשלום</Label>
                <Input
                  type="date"
                  value={editingPayment.payment_date || ""}
                  onChange={(e) => setEditingPayment(prev => ({ ...prev, payment_date: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-blue-100/80">אסמכתא</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    onChange={handleReceiptUpload}
                    className="hidden"
                    id="receipt-upload"
                    accept="image/*,.pdf"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("receipt-upload").click()}
                    className="border-white/10 text-blue-200/70 hover:bg-white/10 flex-1"
                    disabled={uploadingReceipt}
                  >
                    {uploadingReceipt ? (
                      <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4 ml-2" />
                    )}
                    העלה אסמכתא
                  </Button>
                  {editingPayment.receipt_url && (
                    <a
                      href={editingPayment.receipt_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                    >
                      צפה
                    </a>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-blue-100/80">הערות</Label>
                <Input
                  value={editingPayment.notes || ""}
                  onChange={(e) => setEditingPayment(prev => ({ ...prev, notes: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white"
                  placeholder="הערות נוספות..."
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleSavePayment}
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                  disabled={updatePaymentMutation.isPending || createPaymentMutation.isPending}
                >
                  <Check className="w-4 h-4 ml-2" />
                  שמור
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditingPayment(null)}
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