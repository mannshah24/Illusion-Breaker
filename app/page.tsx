import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-900 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00fff7] to-[#b026ff] rounded-lg flex items-center justify-center glow-cyan transition-all group-hover:scale-110">
                <span className="text-black font-bold text-xl">I</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-wide">
                Illusion Breaker
              </h1>
            </div>
            <nav className="flex space-x-6">
              <Link
                href="/dashboard"
                className="text-gray-400 hover:text-[#00fff7] transition-all duration-200 font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="#about"
                className="text-gray-400 hover:text-[#00fff7] transition-all duration-200 font-medium"
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00fff7]/5 via-transparent to-[#b026ff]/5" />
        <div className="text-center relative z-10">
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Break the Illusion,
            <br />
            <span className="bg-gradient-to-r from-[#00fff7] to-[#b026ff] text-transparent bg-clip-text">
              One Claim at a Time
            </span>
          </h2>
          <p className="text-xl text-gray-500 mb-14 max-w-3xl mx-auto leading-relaxed">
            An AI-powered analysis assistant that examines online content for
            misinformation patterns, verifies claims against public sources, and
            provides transparent reasoning.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              href="/dashboard"
              className="px-10 py-5 bg-[#00fff7] hover:bg-[#39ff14] text-black font-bold rounded-xl transition-all duration-200 shadow-lg glow-cyan hover:glow-green"
            >
              Try Demo Analysis
            </Link>
            <a
              href="https://github.com/mannshah24/Illusion-Breaker/tree/main/extension"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 glass-card text-white font-bold rounded-xl transition-all duration-200 hover:border-[#b026ff] glow-purple"
            >
              Download Chrome Extension
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Manual installation required (Chrome Developer Mode)
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Claim Extraction"
            description="Automatically identifies and isolates specific claims made in text, images, and videos."
            icon="🔍"
          />
          <FeatureCard
            title="Media Authenticity"
            description="Performs heuristic checks on images and videos to detect potential manipulation indicators."
            icon="🖼️"
          />
          <FeatureCard
            title="Source Cross-Check"
            description="Compares claims against a curated database of verified public sources and fact-checks."
            icon="📚"
          />
        </div>
      </section>

      {/* How It Works */}
      <section
        id="about"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <h3 className="text-3xl font-bold text-white text-center mb-12">
          How It Works
        </h3>
        <div className="space-y-6 max-w-3xl mx-auto">
          <Step
            number={1}
            title="Extract Content"
            description="Use the browser extension or paste content directly into the dashboard."
          />
          <Step
            number={2}
            title="Analyze Claims"
            description="Our system breaks down the content into verifiable claims and identifies key assertions."
          />
          <Step
            number={3}
            title="Verify & Score"
            description="Claims are cross-checked with public sources and assigned a Trust Score (0-100)."
          />
          <Step
            number={4}
            title="Review Results"
            description="Examine detailed reasoning, evidence flags, and transparency notes in the dashboard."
          />
        </div>
      </section>

      {/* How to Use IllusionBreaker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h3 className="text-3xl font-bold text-white text-center mb-12">How to Use IllusionBreaker</h3>
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Step 1 */}
          <div className="glass-card rounded-2xl p-8 border-0">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#00fff7] to-[#b026ff] rounded-xl flex items-center justify-center glow-cyan">
                <span className="text-black font-bold text-xl">1</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-3 tracking-wide">Install the Extension</h4>
                <ol className="text-gray-400 space-y-2 list-decimal list-inside leading-relaxed">
                  <li>
                    <span className="text-white font-semibold">Download</span> the extension from GitHub —
                    <a href="https://github.com/mannshah24/Illusion-Breaker/tree/main/extension" target="_blank" rel="noopener noreferrer" className="text-[#00fff7] hover:text-[#39ff14] underline">/extension</a>
                  </li>
                  <li>Open <span className="font-mono text-white">chrome://extensions</span></li>
                  <li>Enable <span className="text-white font-semibold">Developer Mode</span></li>
                  <li>Click <span className="text-white font-semibold">Load unpacked</span></li>
                  <li>Select the <span className="text-white font-semibold">/extension</span> folder</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="glass-card rounded-2xl p-8 border-0">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#00fff7] to-[#b026ff] rounded-xl flex items-center justify-center glow-cyan">
                <span className="text-black font-bold text-xl">2</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-3 tracking-wide">Inspect Any Webpage</h4>
                <ol className="text-gray-400 space-y-2 list-decimal list-inside leading-relaxed">
                  <li>Open any website (news, social media, blog)</li>
                  <li>Click the IllusionBreaker extension icon</li>
                  <li>Click <span className="text-white font-semibold">Inspect Reality</span></li>
                </ol>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="glass-card rounded-2xl p-8 border-0">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#00fff7] to-[#b026ff] rounded-xl flex items-center justify-center glow-cyan">
                <span className="text-black font-bold text-xl">3</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-3 tracking-wide">View Analysis</h4>
                <ol className="text-gray-400 space-y-2 list-decimal list-inside leading-relaxed">
                  <li>You will be redirected to the dashboard</li>
                  <li>Trust Score, claims, and reasoning are shown automatically</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extension Section */}
      <section
        id="extension"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="glass-card rounded-2xl p-12 border-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00fff7]/5 via-transparent to-[#b026ff]/5" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h3 className="text-4xl font-bold text-white mb-6 tracking-wide">
              Browser Extension
            </h3>
            <p className="text-gray-500 mb-10 text-lg leading-relaxed">
              Install the Illusion Breaker extension to analyze any webpage with
              a single click. The extension extracts page content and sends it
              for analysis directly from your browser.
            </p>
            <div className="glass-card rounded-xl p-8 border-l-4 border-l-[#00fff7] text-left">
              <h4 className="text-white font-bold mb-6 text-lg tracking-wide">
                Installation Instructions:
              </h4>
              <ol className="text-gray-400 space-y-3 list-decimal list-inside leading-relaxed">
                <li>Open Chrome and navigate to chrome://extensions/</li>
                <li>Enable &quot;Developer mode&quot; in the top right</li>
                <li>Click &quot;Load unpacked&quot;</li>
                <li>Select the /extension folder from this project</li>
                <li>
                  Click the extension icon and hit &quot;Break Illusion&quot;
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="glass-card rounded-2xl p-8 border-l-4 border-l-[#ff6b35]">
          <h4 className="text-[#ff6b35] font-bold text-xl mb-4 tracking-wide">
            Important Disclaimer
          </h4>
          <p className="text-gray-400 leading-relaxed">
            IllusionBreaker is an{" "}
            <strong className="text-white">educational and research-oriented tool</strong>{" "}
            that uses heuristic-based and rule-driven analysis to examine live webpage content.
            It does not use paid or proprietary AI APIs and does not claim perfect accuracy.
            Results are intended to{" "}
            <strong className="text-white">support critical thinking</strong>,
            not replace independent verification. Always verify information through multiple trusted sources.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-900 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p className="mb-2 font-semibold">
              Illusion Breaker - Hackathon MVP
            </p>
            <p className="text-sm">
              Built with Next.js, TypeScript, Kestra, and Oumi
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Feature Card Component
function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-8 border-0 hover:scale-105 transition-all duration-200 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00fff7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        <div className="text-5xl mb-6">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-4 tracking-wide">
          {title}
        </h3>
        <p className="text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// Step Component
function Step({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start space-x-5 group">
      <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#00fff7] to-[#b026ff] rounded-xl flex items-center justify-center glow-cyan group-hover:scale-110 transition-all duration-200">
        <span className="text-black font-bold text-xl">{number}</span>
      </div>
      <div>
        <h4 className="text-xl font-bold text-white mb-3 tracking-wide">
          {title}
        </h4>
        <p className="text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
