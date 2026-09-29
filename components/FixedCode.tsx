"use client";

import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (fixedCode: string) => void;
}

export default function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const langConfig = LANGUAGES.find((l) => l.id === language);
  const extension = langConfig?.extension || "txt";
  const filename = `solution.${extension}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
    setTimeout(() => {
      setCopyStatus("idle");
    }, 2000);
  };

  const copyButtonLabel =
    copyStatus === "copied"
      ? "✓ COPIED TO CLIPBOARD"
      : copyStatus === "failed"
      ? "✕ COPY BLOCKED, SELECT MANUALLY"
      : "📋 COPY FIXED CODE";

  return (
    <div className="mt-6">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="font-mono text-xs font-bold text-google-green uppercase tracking-wider">
          CORRECTED CODE
        </span>
      </SectionHeader>

      <div className="border-2 border-frame bg-white shadow-brutal-sm overflow-hidden mb-3">
        {/* Header strip */}
        <div className="bg-canvas border-b-2 border-frame px-3 py-1.5 flex items-center justify-between font-mono text-xs">
          <span className="font-bold text-gray-700">{filename}</span>
          <span className="font-bold text-google-green uppercase tracking-wider flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-google-green animate-pulse" />
            READY TO APPLY
          </span>
        </div>

        {/* Code body */}
        <div className="p-3.5 bg-[#171717] text-[#F7F3EA] overflow-x-auto max-h-[350px]">
          <pre className="font-mono text-xs leading-relaxed">
            <code>{code}</code>
          </pre>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <button
          onClick={handleCopy}
          className="flex-1 py-2 px-3 border-2 border-frame font-mono text-xs font-bold uppercase tracking-wider bg-white hover:bg-frame hover:text-white transition-all shadow-brutal-sm active:translate-x-0.5 active:translate-y-0.5"
        >
          {copyButtonLabel}
        </button>
        <button
          onClick={() => onApply(code)}
          className="flex-1 py-2 px-3 border-2 border-frame font-mono text-xs font-bold uppercase tracking-wider bg-mustard hover:bg-frame hover:text-white transition-all shadow-brutal-sm active:translate-x-0.5 active:translate-y-0.5"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
}
