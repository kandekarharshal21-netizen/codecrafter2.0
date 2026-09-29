import React from "react";
import SectionHeader from "./SectionHeader";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import IssueCard from "./IssueCard";
import FixedCode from "./FixedCode";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg?: string;
  onRetry: () => void;
  onApplyFix: (fixedCode: string) => void;
}

export default function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  const issues = result?.issues || [];
  const issueCountText =
    issues.length === 1 ? "1 ISSUE DETECTED" : `${issues.length} ISSUES DETECTED`;

  const takeawaySectionNumber = result?.correctedCode ? 4 : 3;

  return (
    <div className="flex flex-col flex-1 bg-white h-full min-h-[480px]">
      {/* 40px Header Strip */}
      <div className="h-10 bg-canvas border-b-2 border-frame px-4 flex items-center justify-between font-mono text-xs select-none">
        <span className="text-gray-500 font-bold uppercase tracking-wider">
          AUDIT // REPORT
        </span>
        <span className="font-display font-bold text-frame uppercase tracking-wider text-xs">
          Roast Report
        </span>
        <div className="w-12" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {state === "empty" && <EmptyState />}
        {state === "loading" && <LoadingState />}
        {state === "error" && (
          <ErrorState error={errorMsg} onRetry={onRetry} />
        )}

        {state === "results" && result && (
          <div className="p-4 sm:p-6 space-y-6">
            {/* Section 1: Roast */}
            <div>
              <SectionHeader number={1} title="Roast">
                <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
                  STYLE: {roastLevel}
                </span>
              </SectionHeader>
              <div className="border-2 border-frame bg-amber-50/50 p-4 shadow-brutal-sm relative">
                <span className="text-4xl text-mustard font-serif leading-none absolute -top-2 left-2 select-none opacity-50">
                  “
                </span>
                <p className="font-mono text-sm sm:text-base text-frame font-medium leading-relaxed pl-4 pr-2">
                  {result.roast}
                </p>
              </div>
            </div>

            {/* Section 2: What's Wrong */}
            <div>
              <SectionHeader number={2} title="What's Wrong">
                <span
                  className={`font-mono text-xs font-bold uppercase tracking-wider ${
                    issues.length === 0 ? "text-google-green" : "text-google-red"
                  }`}
                >
                  {issueCountText}
                </span>
              </SectionHeader>

              {issues.length === 0 ? (
                <div className="p-4 border-2 border-google-green bg-green-50/60 text-google-green font-mono text-xs font-bold shadow-brutal-sm">
                  ✓ No issues found. Suspiciously clean.
                </div>
              ) : (
                <div className="space-y-3">
                  {issues.map((issue, idx) => (
                    <IssueCard key={idx} index={idx} issue={issue} />
                  ))}
                </div>
              )}
            </div>

            {/* Section 3: Fix */}
            {result.correctedCode && (
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Section 4: Takeaway */}
            {result.takeaway && (
              <div className="pt-2">
                <SectionHeader number={takeawaySectionNumber} title="Takeaway">
                  <span className="font-mono text-xs font-bold text-gray-600 uppercase tracking-wider">
                    REDEMPTION ARC
                  </span>
                </SectionHeader>
                <div className="border-2 border-frame bg-canvas p-4 shadow-brutal-sm font-mono text-xs text-gray-800 leading-relaxed">
                  💡 {result.takeaway}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
