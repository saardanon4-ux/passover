import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Eye, MessageSquare } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";

const statusLabels = {
  pending: "ממתין",
  confirmed: "אושר",
  cancelled: "בוטל"
};

const statusColors = {
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  confirmed: "bg-green-500/20 text-green-300 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-300 border-red-500/30"
};

export default function RegistrationsTab({ registrations }) {
  const [sortField, setSortField] = useState("created_date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedRegistrations = [...registrations].sort((a, b) => {
    let aVal = a[sortField] || "";
    let bVal = b[sortField] || "";
    if (sortDirection === "asc") {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });

  const SortableHeader = ({ field, children }) => (
    <TableHead className="text-right">
      <Button
        variant="ghost"
        onClick={() => handleSort(field)}
        className="text-blue-200/70 hover:text-white hover:bg-white/10 p-0 h-auto font-medium"
      >
        {children}
        <ArrowUpDown className="mr-2 h-4 w-4" />
      </Button>
    </TableHead>
  );

  return (
    <div className="space-y-4">
      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <Table dir="rtl">
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <SortableHeader field="child_name">שם הילד/ה</SortableHeader>
              <SortableHeader field="parent_name">שם ההורה</SortableHeader>
              <TableHead className="text-right text-blue-200/70">מייל הורה</TableHead>
              <SortableHeader field="parent_phone">טלפון</SortableHeader>
              <SortableHeader field="grade">כיתה</SortableHeader>
              <SortableHeader field="shirt_size">מידה</SortableHeader>
              <SortableHeader field="status">סטטוס</SortableHeader>
              <SortableHeader field="created_date">תאריך הרשמה</SortableHeader>
              <TableHead className="text-right text-blue-200/70">הערות</TableHead>
              <TableHead className="text-right text-blue-200/70">פעולות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRegistrations.map((reg) => (
              <TableRow key={reg.id} className="border-white/10 hover:bg-white/5">
                <TableCell className="text-white font-medium">{reg.child_name}</TableCell>
                <TableCell className="text-blue-100/70">{reg.parent_name}</TableCell>
                <TableCell className="text-blue-100/70" dir="ltr">{reg.parent_email || "-"}</TableCell>
                <TableCell className="text-blue-100/70" dir="ltr">{reg.parent_phone}</TableCell>
                <TableCell className="text-blue-100/70">{reg.grade}׳</TableCell>
                <TableCell className="text-blue-100/70">{reg.shirt_size}</TableCell>
                <TableCell>
                  <Badge className={statusColors[reg.status]}>{statusLabels[reg.status]}</Badge>
                </TableCell>
                <TableCell className="text-blue-100/70">
                  {reg.created_date ? format(new Date(reg.created_date), "dd/MM/yyyy") : "-"}
                </TableCell>
                <TableCell>
                  {reg.notes ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center cursor-pointer hover:bg-amber-500/30 transition-colors">
                            <MessageSquare className="w-4 h-4 text-amber-400" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-[#0f2044] border-white/10 text-white max-w-xs" dir="rtl">
                          <p className="text-sm">{reg.notes}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <span className="text-blue-200/30">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedRegistration(reg)}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedRegistration} onOpenChange={() => setSelectedRegistration(null)}>
        <DialogContent className="bg-[#0f2044] border-white/10 text-white max-w-lg" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-xl">פרטי הרשמה - {selectedRegistration?.child_name}</DialogTitle>
          </DialogHeader>
          {selectedRegistration && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-blue-200/50 text-sm">שם הילד/ה</span>
                  <p className="text-white">{selectedRegistration.child_name}</p>
                </div>
                <div>
                  <span className="text-blue-200/50 text-sm">שם ההורה</span>
                  <p className="text-white">{selectedRegistration.parent_name}</p>
                </div>
                <div>
                  <span className="text-blue-200/50 text-sm">מייל הורה</span>
                  <p className="text-white" dir="ltr">{selectedRegistration.parent_email || "-"}</p>
                </div>
                <div>
                  <span className="text-blue-200/50 text-sm">טלפון</span>
                  <p className="text-white" dir="ltr">{selectedRegistration.parent_phone}</p>
                </div>
                <div>
                  <span className="text-blue-200/50 text-sm">כיתה</span>
                  <p className="text-white">{selectedRegistration.grade}׳</p>
                </div>
                <div>
                  <span className="text-blue-200/50 text-sm">מידת חולצה</span>
                  <p className="text-white">{selectedRegistration.shirt_size}</p>
                </div>
                <div>
                  <span className="text-blue-200/50 text-sm">סטטוס</span>
                  <Badge className={statusColors[selectedRegistration.status]}>
                    {statusLabels[selectedRegistration.status]}
                  </Badge>
                </div>
              </div>
              {selectedRegistration.notes && (
                <div>
                  <span className="text-blue-200/50 text-sm">הערות</span>
                  <p className="text-white bg-white/5 rounded-lg p-3 mt-1">{selectedRegistration.notes}</p>
                </div>
              )}
              {selectedRegistration.signature_url && (
                <div>
                  <span className="text-blue-200/50 text-sm">חתימה</span>
                  <div className="bg-white/10 rounded-lg p-3 mt-1">
                    <img src={selectedRegistration.signature_url} alt="חתימה" className="h-16 object-contain" />
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}