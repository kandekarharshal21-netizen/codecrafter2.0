"use client";

import React from "react";
import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export default function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs">
      {/* Roast Level selector */}
      <div className="flex items-center gap-2">
        <span className="font-bold text-gray-700 tracking-wider text-[11px] uppercase">
          Roast Level:
        </span>
        <div className="flex items-center border-2 border-frame bg-white shadow-brutal-sm p-0.5">
          {ROAST_LEVELS.map((level) => {
            const isSelected = roastLevel === level.id;
            return (
              <button
                key={level.id}
                type="button"
                onClick={() => onRoastLevelChange(level.id)}
                title={level.description}
                className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-all ${
                  isSelected
                    ? "bg-frame text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {level.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Language dropdown */}
      <div className="flex items-center gap-2">
        <span className="font-bold text-gray-700 tracking-wider text-[11px] uppercase">
          Lang:
        </span>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none bg-white border-2 border-frame pl-2.5 pr-7 py-1 font-mono text-xs font-bold text-frame shadow-brutal-sm cursor-pointer focus:outline-none"
          >
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-frame font-bold">
            ▼
          </span>
        </div>
      </div>

      {/* Error message toggle */}
      <button
        type="button"
        onClick={onToggleErrorDrawer}
        className={`px-2.5 py-1 border-2 border-dashed border-frame font-mono text-[11px] font-bold tracking-wider transition-all shadow-brutal-sm ${
          errorDrawerOpen
            ? "bg-frame text-white"
            : "bg-white text-frame hover:bg-gray-100"
        }`}
      >
        {errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}
      </button>

      {/* Primary Roast Button */}
      <button
        type="button"
        onClick={onRoast}
        disabled={isRoasting}
        className={`flex items-center gap-2 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider border-2 border-frame transition-all shadow-brutal active:translate-x-0.5 active:translate-y-0.5 ${
          isRoasting
            ? "bg-gray-300 text-gray-600 cursor-not-allowed animate-pulse"
            : "bg-mustard text-frame hover:bg-accent hover:text-white"
        }`}
      >
        {isRoasting ? (
          <span>ANALYZING...</span>
        ) : (
          <>
            <span>ROAST MY CODE</span>
            <span className="hidden sm:inline-block bg-frame text-white text-[10px] px-1 py-0.2 rounded font-normal">
              Ctrl ⏎
            </span>
          </>
        )}
      </button>
    </div>
  );
}
