import React from "react";
import { AI, APP } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export default function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="border-t-2 border-frame bg-white px-4 py-2.5 font-mono text-[11px] select-none">
      {/* Primary status row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left Status */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-500 uppercase">STATUS:</span>
          {isRoasting ? (
            <span className="flex items-center gap-1.5 font-bold text-amber-600">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              PROCESSING...
            </span>
          ) : (
            <span className="flex items-center gap-1.5 font-bold text-google-green">
              <span className="w-2 h-2 rounded-full bg-google-green" />
              ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}
          <span className="hidden md:inline text-gray-400">|</span>
          <span className="hidden md:inline text-gray-500 font-medium">
            ENGINE: GOOGLE GEMINI & STITCH MCP
          </span>
        </div>

        {/* Right Tag */}
        <div className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">
          {APP.name} {APP.version} // LIVE
        </div>
      </div>

      {/* Workshop attribution sub-row */}
      <div className="mt-1.5 pt-1.5 border-t border-subtle text-center text-[10px] text-gray-500 font-mono tracking-wide">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
