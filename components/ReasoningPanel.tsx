"use client";

import { useState } from "react";

export interface ReasoningStep {
  step: number;
  title: string;
  description: string;
  outcome: string;
}

interface ReasoningPanelProps {
  steps: ReasoningStep[];
  summary: string;
  methodology: string;
}

export default function ReasoningPanel({
  steps,
  summary,
  methodology,
}: ReasoningPanelProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card rounded-2xl p-8 border-0 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black opacity-50" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white tracking-wide">
            Analysis Reasoning
          </h3>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-[#00fff7] hover:text-[#39ff14] transition-all duration-200 uppercase tracking-wider font-semibold"
          >
            {expanded ? "▲ Hide" : "▼ Show"}
          </button>
        </div>

        {/* Summary */}
        <div className="glass-card rounded-xl p-6 mb-6 border-l-4 border-l-[#00fff7]">
          <h4 className="text-white font-bold mb-3 tracking-wide">Summary</h4>
          <p className="text-gray-300 leading-relaxed">{summary}</p>
        </div>

        {/* Expanded Details */}
        {expanded && (
          <>
            {/* Reasoning Steps */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-4">
                Analysis Process
              </h4>
              <div className="space-y-3">
                {steps.map((step) => (
                  <div
                    key={step.step}
                    className="bg-gray-900 rounded-lg p-4 border border-gray-700"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {step.step}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h5 className="text-white font-semibold mb-2">
                          {step.title}
                        </h5>
                        <p className="text-gray-400 text-sm mb-2">
                          {step.description}
                        </p>
                        <div className="bg-gray-800 rounded p-2">
                          <p className="text-gray-300 text-xs">
                            <span className="text-blue-400 font-semibold">
                              Result:
                            </span>{" "}
                            {step.outcome}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Methodology */}
            <div className="glass-card rounded-xl p-6 border-l-4 border-l-[#ff6b35]">
              <h4 className="text-[#ff6b35] font-bold mb-3 tracking-wide">
                Methodology Note
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                {methodology}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
