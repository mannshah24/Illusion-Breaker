"use client";

interface TrustScoreProps {
  score: number;
  label?: string;
}

export default function TrustScore({
  score,
  label = "Trust Score",
}: TrustScoreProps) {
  const getColor = (score: number) => {
    if (score >= 70) return "#00fff7";
    if (score >= 40) return "#ff6b35";
    return "#b026ff";
  };

  const getGlow = (score: number) => {
    if (score >= 70) return "glow-cyan";
    if (score >= 40) return "glow-orange";
    return "glow-purple";
  };

  const getInterpretation = (score: number) => {
    if (score >= 80) return "High confidence - Claims appear well-supported";
    if (score >= 60)
      return "Moderate confidence - Some supporting evidence found";
    if (score >= 40) return "Low confidence - Limited supporting evidence";
    return "Very low confidence - Significant concerns identified";
  };

  return (
    <div className="glass-card rounded-2xl p-10 border-0 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black opacity-50" />
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-8 tracking-wide">
          {label}
        </h3>

        {/* Circular Score Display */}
        <div className="flex items-center justify-center mb-8">
          <div
            className={`relative w-64 h-64 ${getGlow(
              score
            )} rounded-full transition-all duration-1000`}
          >
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="110"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="16"
                fill="none"
              />
              <circle
                cx="128"
                cy="128"
                r="110"
                stroke={getColor(score)}
                strokeWidth="16"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 110}`}
                strokeDashoffset={`${2 * Math.PI * 110 * (1 - score / 100)}`}
                className="transition-all duration-1000"
                strokeLinecap="round"
                style={{
                  filter: `drop-shadow(0 0 8px ${getColor(score)})`,
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="text-7xl font-bold"
                style={{ color: getColor(score) }}
              >
                {score}
              </span>
              <span className="text-gray-500 text-sm mt-2 tracking-widest uppercase">
                / 100
              </span>
            </div>
          </div>
        </div>

        {/* Interpretation */}
        <div
          className="glass-card rounded-xl p-5 border-l-4"
          style={{ borderLeftColor: getColor(score) }}
        >
          <p className="text-gray-300 text-center leading-relaxed">
            {getInterpretation(score)}
          </p>
        </div>
      </div>
    </div>
  );
}
