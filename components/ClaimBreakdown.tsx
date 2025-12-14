"use client";

export interface Claim {
  id: number;
  text: string;
  status: "verified" | "disputed" | "unverified" | "misleading";
  confidence: number;
  sources: string[];
  reasoning: string;
}

interface ClaimBreakdownProps {
  claims: Claim[];
}

export default function ClaimBreakdown({ claims }: ClaimBreakdownProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "border-l-[#00fff7] bg-[#00fff7]/5";
      case "disputed":
        return "border-l-[#b026ff] bg-[#b026ff]/5";
      case "unverified":
        return "border-l-gray-600 bg-gray-800/30";
      case "misleading":
        return "border-l-[#ff6b35] bg-[#ff6b35]/5";
      default:
        return "border-l-gray-600 bg-gray-800/30";
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-[#00fff7]";
      case "disputed":
        return "text-[#b026ff]";
      case "unverified":
        return "text-gray-400";
      case "misleading":
        return "text-[#ff6b35]";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return "✓";
      case "disputed":
        return "✗";
      case "unverified":
        return "?";
      case "misleading":
        return "⚠";
      default:
        return "?";
    }
  };

  return (
    <div className="glass-card rounded-2xl p-8 border-0 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black opacity-50" />
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-6 tracking-wide">
          Claim Analysis
        </h3>

        <div className="space-y-5">
          {claims.map((claim) => (
            <div
              key={claim.id}
              className={`${getStatusColor(
                claim.status
              )} rounded-xl p-6 border-l-4 transition-all hover:scale-[1.01] duration-200`}
            >
              {/* Claim Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">
                    {getStatusIcon(claim.status)}
                  </span>
                  <span
                    className={`uppercase text-xs font-bold tracking-widest ${getStatusTextColor(
                      claim.status
                    )}`}
                  >
                    {claim.status}
                  </span>
                </div>
                <span className="text-sm text-gray-500 font-mono">
                  {claim.confidence}%
                </span>
              </div>

              {/* Claim Text */}
              <p className="text-white mb-4 leading-relaxed text-lg">
                &quot;{claim.text}&quot;
              </p>

              {/* Reasoning */}
              <div className="glass-card rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-400 leading-relaxed">
                  {claim.reasoning}
                </p>
              </div>

              {/* Sources */}
              {claim.sources.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                    Sources:
                  </p>
                  <ul className="space-y-2">
                    {claim.sources.map((source, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-gray-400 flex items-start"
                      >
                        <span className="mr-2 text-[#00fff7]">→</span>
                        <span>{source}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
