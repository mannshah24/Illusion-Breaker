"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import TrustScore from "@/components/TrustScore";
import ClaimBreakdown from "@/components/ClaimBreakdown";
import EvidenceFlags from "@/components/EvidenceFlags";
import ReasoningPanel from "@/components/ReasoningPanel";
import { getMockAnalysis } from "@/lib/mock_data";
import type { AnalysisResult } from "@/lib/mock_data";

function DashboardContent() {
  const searchParams = useSearchParams();
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<string>("news-article");
  const [error, setError] = useState<string | null>(null);

  // Auto-trigger analysis when payload is in URL
  useEffect(() => {
    const payload = searchParams.get("payload");
    if (payload) {
      analyzeFromPayload(payload);
    }
  }, [searchParams]);

  const analyzeFromPayload = async (encodedPayload: string) => {
    setLoading(true);
    setError(null);

    try {
      // Decode payload
      const payloadData = JSON.parse(decodeURIComponent(encodedPayload));

      // Call API for analysis
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: payloadData.content,
          url: payloadData.url,
          title: payloadData.title,
          contentType: payloadData.contentType,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        setAnalysisResult(result.data);
      } else {
        throw new Error(result.error || "Analysis failed");
      }
    } catch (err) {
      console.error("Analysis error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to analyze content"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAnalysis = async (demoType: string) => {
    setLoading(true);
    setSelectedDemo(demoType);
    setError(null);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const result = getMockAnalysis(demoType);
    setAnalysisResult(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-900 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00fff7] to-[#b026ff] rounded-lg flex items-center justify-center glow-cyan transition-all group-hover:scale-110">
                <span className="text-black font-bold text-xl">I</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-wide">
                Illusion Breaker
              </h1>
            </Link>
            <nav className="flex space-x-6">
              <Link
                href="/"
                className="text-gray-400 hover:text-[#00fff7] transition-all duration-200 font-medium"
              >
                Home
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Title */}
        <div className="mb-10">
          <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Analysis Dashboard
          </h2>
          <p className="text-gray-500 text-lg">
            Review content analysis results with detailed claim verification and
            reasoning
          </p>
        </div>

        {/* Demo Controls */}
        <div className="mb-10 glass-card rounded-2xl p-8 border-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00fff7]/5 via-transparent to-[#b026ff]/5" />
          <div className="relative z-10">
            <h3 className="text-white font-bold text-xl mb-3 tracking-wide">
              Demo Analyses
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Select a pre-configured demo to see how Illusion Breaker analyzes
              different content types
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleDemoAnalysis("news-article")}
                disabled={loading}
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-200 ${
                  selectedDemo === "news-article"
                    ? "bg-[#00fff7] text-black glow-cyan"
                    : "glass-card text-gray-300 hover:text-white hover:border-[#00fff7]"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                News Article
              </button>
              <button
                onClick={() => handleDemoAnalysis("social-media")}
                disabled={loading}
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-200 ${
                  selectedDemo === "social-media"
                    ? "bg-[#ff6b35] text-black glow-orange"
                    : "glass-card text-gray-300 hover:text-white hover:border-[#ff6b35]"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Social Media Post
              </button>
              <button
                onClick={() => handleDemoAnalysis("default")}
                disabled={loading}
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-200 ${
                  selectedDemo === "default"
                    ? "bg-[#b026ff] text-white glow-purple"
                    : "glass-card text-gray-300 hover:text-white hover:border-[#b026ff]"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Generic Content
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="glass-card rounded-2xl p-6 border-l-4 border-l-[#ff6b35] mb-8">
            <h4 className="text-[#ff6b35] font-bold mb-3 tracking-wide text-lg">
              Analysis Error
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[#00fff7] mx-auto mb-6 glow-cyan"></div>
              <p className="text-gray-400 text-lg font-medium">
                Analyzing content...
              </p>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysisResult && !loading && (
          <div className="space-y-8">
            {/* Metadata */}
            <div className="glass-card rounded-2xl p-6 border-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
                <div>
                  <p className="text-gray-500 mb-2 uppercase tracking-wider text-xs">
                    Analyzed URL
                  </p>
                  <p className="text-white font-mono text-xs truncate">
                    {analysisResult.url}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-2 uppercase tracking-wider text-xs">
                    Content Type
                  </p>
                  <p className="text-white capitalize font-semibold">
                    {analysisResult.metadata.contentType}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-2 uppercase tracking-wider text-xs">
                    Word Count
                  </p>
                  <p className="text-white font-semibold">
                    {analysisResult.metadata.wordCount}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-2 uppercase tracking-wider text-xs">
                    Analysis Time
                  </p>
                  <p className="text-white font-semibold">
                    {analysisResult.metadata.analysisTime}s
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Score - Make it the focal point */}
            <div className="flex justify-center">
              <div className="w-full max-w-2xl">
                <TrustScore score={analysisResult.trustScore} />
              </div>
            </div>

            {/* Claims */}
            <ClaimBreakdown claims={analysisResult.claims} />

            {/* Evidence Flags */}
            <EvidenceFlags flags={analysisResult.flags} />

            {/* Reasoning */}
            <ReasoningPanel
              steps={analysisResult.reasoning.steps}
              summary={analysisResult.reasoning.summary}
              methodology={analysisResult.reasoning.methodology}
            />

            {/* Transparency Notice */}
            <div className="glass-card rounded-2xl p-6 border-l-4 border-l-[#ff6b35]">
              <h4 className="text-[#ff6b35] font-bold mb-3 tracking-wide text-lg">
                Transparency Notice
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                This analysis was generated using{" "}
                <strong className="text-white">deterministic heuristics</strong>{" "}
                without external APIs. Illusion Breaker analyzes linguistic
                patterns, domain reputation, source presence, and content
                structure to compute trust scores. This MVP does not use neural
                networks or paid services. In a production environment, this
                would integrate with fact-checking databases, reverse image
                search APIs, and advanced NLP models.
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!analysisResult && !loading && (
          <div className="glass-card rounded-2xl p-16 border-0 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00fff7]/5 via-transparent to-[#b026ff]/5" />
            <div className="max-w-md mx-auto relative z-10">
              <div className="text-7xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">
                No Analysis Yet
              </h3>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Select a demo analysis above to see how Illusion Breaker
                examines content for misinformation patterns and verifies
                claims.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#00fff7] mx-auto mb-4"></div>
            <p className="text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
