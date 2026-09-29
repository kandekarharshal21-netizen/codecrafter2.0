import React from "react";

interface ErrorStateProps {
  error?: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[360px]">
      <div className="w-16 h-16 border-2 border-accent flex items-center justify-center mb-5 text-accent font-mono text-3xl font-bold bg-red-50 shadow-brutal-sm">
        !
      </div>
      <h3 className="font-display font-bold uppercase tracking-wider text-accent text-base sm:text-lg mb-2">
        Analysis Failed
      </h3>
      <p className="font-mono text-xs sm:text-sm text-gray-700 max-w-md leading-relaxed mb-6 bg-red-50 p-3 border border-red-200 rounded">
        {error || "An unknown error occurred during code evaluation."}
      </p>
      <button
        onClick={onRetry}
        className="px-5 py-2.5 bg-frame text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-frame shadow-brutal hover:bg-white hover:text-frame transition-all active:translate-x-0.5 active:translate-y-0.5"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
