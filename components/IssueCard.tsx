import React from "react";
import { RoastIssue, Severity } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const severityConfig: Record<
  Severity,
  { badgeBg: string; badgeText: string; borderColor: string }
> = {
  "FATAL BUG": {
    badgeBg: "bg-red-100",
    badgeText: "text-red-700 border-red-400",
    borderColor: "border-l-google-red",
  },
  "CODE SMELL": {
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800 border-amber-400",
    borderColor: "border-l-mustard",
  },
  OPTIMIZATION: {
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-800 border-emerald-400",
    borderColor: "border-l-google-green",
  },
};

export default function IssueCard({ index, issue }: IssueCardProps) {
  const paddedIndex = String(index + 1).padStart(2, "0");
  const styling =
    severityConfig[issue.severity] || severityConfig["CODE SMELL"];

  return (
    <div className="bg-white border-2 border-frame shadow-brutal-sm p-3.5 sm:p-4 mb-3 transition-transform hover:-translate-y-0.5">
      {/* Top row */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-subtle pb-2.5 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="bg-frame text-white font-mono text-[11px] font-bold px-1.5 py-0.5 select-none">
            #{paddedIndex}
          </span>
          <span className="font-mono text-xs font-bold text-frame">
            LINE {issue.line}
          </span>
          <span
            className={`font-mono text-[10px] font-bold px-2 py-0.5 border ${styling.badgeBg} ${styling.badgeText} uppercase tracking-wider`}
          >
            {issue.severity}
          </span>
        </div>
        <span className="font-mono text-[11px] text-gray-500 text-right break-words max-w-full">
          {issue.title}
        </span>
      </div>

      {/* Code Snippet */}
      {issue.codeSnippet && (
        <div
          className={`border-l-4 ${styling.borderColor} bg-canvas/70 border border-subtle p-2.5 mb-3 font-mono text-xs overflow-x-auto`}
        >
          <pre>
            <code className="text-gray-800">{issue.codeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Diagnosis & Expected */}
      <div className="space-y-1.5 font-mono text-xs">
        <div className="text-gray-800 flex items-start gap-1.5">
          <span className="font-bold text-accent select-none shrink-0">✕</span>
          <span>
            <strong className="text-accent font-semibold">Diagnosis:</strong>{" "}
            {issue.diagnosis}
          </span>
        </div>
        <div className="text-gray-800 flex items-start gap-1.5">
          <span className="font-bold text-google-green select-none shrink-0">
            ✓
          </span>
          <span>
            <strong className="text-google-green font-semibold">Expected:</strong>{" "}
            {issue.expected}
          </span>
        </div>
      </div>
    </div>
  );
}
