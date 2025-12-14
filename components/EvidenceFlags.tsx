"use client";

export interface EvidenceFlag {
  type: "warning" | "info" | "critical";
  category: string;
  description: string;
  details: string;
}

interface EvidenceFlagsProps {
  flags: EvidenceFlag[];
}

export default function EvidenceFlags({ flags }: EvidenceFlagsProps) {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case "critical":
        return {
          color: "#b026ff",
          icon: "▲",
        };
      case "warning":
        return {
          color: "#ff6b35",
          icon: "◆",
        };
      case "info":
        return {
          color: "#00fff7",
          icon: "●",
        };
      default:
        return {
          color: "#6b7280",
          icon: "•",
        };
    }
  };

  if (flags.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-8 border-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black opacity-50" />
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-6 tracking-wide">
            Evidence Flags
          </h3>
          <div className="glass-card rounded-xl p-6 border-l-4 border-l-[#39ff14] glow-green">
            <p className="text-[#39ff14] text-center font-medium">
              No significant concerns detected
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-8 border-0 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black opacity-50" />
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-6 tracking-wide">
          Evidence Flags
        </h3>

        <div className="space-y-5">
          {flags.map((flag, idx) => {
            const styles = getTypeStyles(flag.type);
            return (
              <div
                key={idx}
                className="glass-card rounded-xl p-5 border-l-4 transition-all hover:scale-[1.01] duration-200"
                style={{ borderLeftColor: styles.color }}
              >
                <div className="flex items-start space-x-4">
                  <span
                    className="text-2xl flex-shrink-0"
                    style={{ color: styles.color }}
                  >
                    {styles.icon}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-white text-lg">
                        {flag.category}
                      </h4>
                      <span
                        className="text-xs uppercase tracking-widest font-mono"
                        style={{ color: styles.color }}
                      >
                        {flag.type}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                      {flag.description}
                    </p>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {flag.details}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
