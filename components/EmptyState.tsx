import React from "react";

export default function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[360px]">
      <div className="w-16 h-16 border-2 border-dashed border-gray-400 flex items-center justify-center mb-5 text-gray-500 font-mono text-2xl font-bold select-none">
        {"{}"}
      </div>
      <h3 className="font-display font-bold uppercase tracking-wider text-frame text-base sm:text-lg mb-2">
        Awaiting Code Submission
      </h3>
      <p className="font-mono text-xs sm:text-sm text-gray-600 max-w-sm leading-relaxed">
        Paste your code on the left, then click <span className="font-bold text-frame">&quot;ROAST MY CODE&quot;</span> or press <kbd className="px-1.5 py-0.5 border border-frame bg-canvas text-xs font-bold">Ctrl+Enter</kbd> (⌘+Enter on Mac).
      </p>
    </div>
  );
}
