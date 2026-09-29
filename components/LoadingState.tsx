import React from "react";

export default function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[360px]">
      <div className="w-16 h-16 border-2 border-frame flex items-center justify-center mb-5 text-frame font-mono text-2xl font-bold bg-white shadow-brutal-sm animate-pulse">
        <span className="inline-block animate-spin text-accent">/</span>
      </div>
      <h3 className="font-display font-bold uppercase tracking-wider text-frame text-base sm:text-lg mb-2 animate-pulse">
        Analyzing Code
      </h3>
      <p className="font-mono text-xs sm:text-sm text-gray-600 max-w-sm leading-relaxed">
        Evaluating computational complexity and architectural purity...
      </p>
      <div className="mt-4 flex items-center gap-2 text-xs font-mono text-gray-500">
        <span className="inline-block w-2 h-2 rounded-full bg-accent animate-ping" />
        Consulting Desi Senior Dev & Gemini AI...
      </div>
    </div>
  );
}
