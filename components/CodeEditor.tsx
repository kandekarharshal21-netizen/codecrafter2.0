"use client";

import React, { useRef, useState, useEffect } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (val: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export default function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 14);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  const langConfig = LANGUAGES.find((l) => l.id === language);
  const languageLabel = langConfig?.label || language;

  const updateCursor = () => {
    if (!textareaRef.current) return;
    const { selectionStart } = textareaRef.current;
    const textBefore = code.slice(0, selectionStart);
    const splitLines = textBefore.split("\n");
    const currentLine = splitLines.length;
    const currentCol = splitLines[splitLines.length - 1].length + 1;
    setCursorPos({ line: currentLine, col: currentCol });
  };

  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Insert 4 spaces
      textarea.setRangeText("    ", start, end, "end");
      onChange(textarea.value);

      // Recalculate cursor
      setTimeout(updateCursor, 0);
    }
  };

  return (
    <div className="flex flex-col flex-1 border-b-2 lg:border-b-0 lg:border-r-2 border-frame bg-white h-full min-h-[480px]">
      {/* 40px Header Strip */}
      <div className="h-10 bg-canvas border-b-2 border-frame px-4 flex items-center justify-between font-mono text-xs select-none">
        <span className="text-gray-500 font-bold uppercase tracking-wider">
          INPUT // SRC
        </span>
        <span className="font-display font-bold text-frame uppercase tracking-wider text-xs">
          Your Code
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onLoadSample}
            className="text-accent hover:underline font-bold uppercase text-[11px]"
          >
            SAMPLE BUG
          </button>
          <span className="text-subtle">|</span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-gray-500 hover:text-frame font-bold uppercase text-[11px]"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Editor Main: Gutter + Textarea */}
      <div className="relative flex-1 flex overflow-hidden bg-[#171717]">
        {/* Gutter */}
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="w-12 bg-[#121212] border-r border-[#2a2a2a] select-none py-3 font-mono text-xs text-right pr-2.5 overflow-hidden text-gray-500"
        >
          {lineNumbers.map((num) => {
            const isError = errorLine === num;
            return (
              <div
                key={num}
                className={`leading-6 h-6 transition-colors ${
                  isError
                    ? "bg-accent/30 text-accent font-bold px-1 rounded-sm border-r-2 border-accent"
                    : ""
                }`}
              >
                {num}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => {
            onChange(e.target.value);
            updateCursor();
          }}
          onScroll={handleScroll}
          onSelect={updateCursor}
          onKeyUp={updateCursor}
          onClick={updateCursor}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="// Paste your code here or click 'SAMPLE BUG' above..."
          className="flex-1 w-full bg-transparent text-[#F7F3EA] font-mono text-xs leading-6 p-3 outline-none resize-none overflow-auto whitespace-pre font-normal"
          style={{ tabSize: 4 }}
        />
      </div>

      {/* Bottom status strip overlay */}
      <div className="h-7 bg-canvas border-t-2 border-frame px-3 flex items-center justify-between font-mono text-[11px] text-gray-600 select-none">
        <div>
          Ln {cursorPos.line}, Col {cursorPos.col} · {languageLabel}
        </div>
        <div className="hidden sm:block text-gray-500">
          UTF-8 · Tab Size: 4
        </div>
      </div>
    </div>
  );
}
