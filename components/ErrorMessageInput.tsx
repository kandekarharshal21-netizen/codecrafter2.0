import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

export default function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="bg-amber-50/60 border-b-2 border-frame p-3 sm:px-6 transition-all">
      <div className="flex items-center justify-between mb-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-gray-700">
        <span>ATTACH TERMINAL TRACEBACK / COMPILER ERROR (OPTIONAL)</span>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-frame hover:underline transition-colors"
        >
          Dismiss ✕
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        placeholder="TypeError: unsupported operand type(s) for +=: 'int' and 'list' at line 6..."
        className="w-full font-mono text-xs p-2 border-2 border-frame bg-white focus:outline-none focus:ring-1 focus:ring-frame resize-y"
      />
    </div>
  );
}
