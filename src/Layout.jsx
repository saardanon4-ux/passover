import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#0d1b2a]">
      <style>{`
        :root {
          --background: 222 47% 11%;
          --foreground: 210 40% 98%;
        }
        body {
          background-color: #0d1b2a;
          margin: 0;
          padding: 0;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.3) transparent;
        }
        *::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        *::-webkit-scrollbar-track {
          background: transparent;
        }
        *::-webkit-scrollbar-thumb {
          background-color: rgba(59, 130, 246, 0.3);
          border-radius: 3px;
        }
      `}</style>
      {children}
    </div>
  );
}