import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shirt } from "lucide-react";

const sizes = ["8", "10", "12", "14", "16", "S", "M", "L", "XL"];

export default function SizesTab({ registrations }) {
  const sizeCounts = sizes.reduce((acc, size) => {
    acc[size] = registrations.filter(r => r.shirt_size === size).length;
    return acc;
  }, {});

  const totalShirts = registrations.length;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shirt className="w-5 h-5 text-blue-400" />
            סיכום מידות לספק
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {sizes.map(size => (
              <div
                key={size}
                className="bg-white/5 rounded-xl p-4 text-center border border-white/10"
              >
                <div className="text-3xl font-black text-white mb-1">{sizeCounts[size]}</div>
                <div className="text-blue-200/60 text-sm">מידה {size}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-2xl font-bold text-white">{totalShirts}</span>
            <span className="text-blue-200/70">סה״כ חולצות לייצור:</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">פירוט לפי מידה</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sizes.map(size => {
              const kidsWithSize = registrations.filter(r => r.shirt_size === size);
              if (kidsWithSize.length === 0) return null;
              return (
                <div key={size} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">מידה {size}</span>
                    <span className="text-blue-300">{kidsWithSize.length} חולצות</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {kidsWithSize.map(kid => (
                      <span
                        key={kid.id}
                        className="bg-blue-500/20 text-blue-200 text-sm px-2 py-1 rounded"
                      >
                        {kid.child_name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}