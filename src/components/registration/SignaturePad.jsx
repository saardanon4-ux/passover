import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eraser, Check } from "lucide-react";

export default function SignaturePad({ onSave, onCancel }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
    setHasSignature(true);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = (e) => {
    e?.preventDefault();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    onSave(dataUrl);
  };

  return (
    <div className="space-y-4">
      <div className="relative rounded-xl overflow-hidden border-2 border-blue-500/30 bg-[#0a1628]">
        <canvas
          ref={canvasRef}
          className="w-full h-48 cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
          {!hasSignature && (
            <span className="text-blue-300/30 text-sm">חתמ/י כאן</span>
          )}
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={clearCanvas}
          className="border-white/10 text-blue-200/60 hover:text-white hover:bg-white/10"
        >
          <Eraser className="w-4 h-4 ml-2" />
          נקה
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-white/10 text-blue-200/60 hover:text-white hover:bg-white/10"
        >
          ביטול
        </Button>
        <Button
          type="button"
          onClick={saveSignature}
          disabled={!hasSignature}
          className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-30"
        >
          <Check className="w-4 h-4 ml-2" />
          שמור חתימה
        </Button>
      </div>
    </div>
  );
}