# IllusionBreaker

Breaking down online illusions with transparent, explainable analysis.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## Overview

IllusionBreaker is a browser-based tool that analyzes real webpages to identify misleading patterns, missing context, and credibility signals. It prioritizes transparency and explainability over black-box predictions.

---

## Problem

Misinformation spreads quickly through emotionally charged language, reused media, and missing context, making it difficult for users to judge credibility in real time.

---

## Solution

IllusionBreaker allows users to inspect any webpage using a browser extension and receive:

- **Trust Score (0–100)** based on multiple credibility signals
- **Extracted claims** with verification status
- **Evidence flags** highlighting potential issues
- **Clear reasoning** explaining confidence levels

---

## How It Works

1. User clicks the IllusionBreaker browser extension on any webpage
2. Page content is extracted and sent to the analysis pipeline
3. A Kestra workflow orchestrates summarization and decision steps
4. An Oumi-based agent abstraction evaluates signals
5. Results are displayed instantly in the dashboard

---

## Architecture

```
┌─────────────────┐
│ Browser         │
│ Extension       │ ──┐
└─────────────────┘   │
                      │
┌─────────────────┐   │    ┌─────────────────┐
│ Next.js         │   │    │ Kestra          │
│ Dashboard       │ ◄─┴───►│ Workflow        │
└─────────────────┘        └─────────────────┘
         │                          │
         ▼                          ▼
┌─────────────────┐        ┌─────────────────┐
│ Heuristic       │        │ Oumi Agent      │
│ Analyzer        │───────►│ Abstraction     │
└─────────────────┘        └─────────────────┘
```

### Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Chrome Extension** (Manifest v3)
- **Kestra** (workflow orchestration + AI Agent)
- **Oumi** (agent abstraction and evaluation)
- **Vercel** (deployment platform)

---

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Chrome browser
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mannshah24/Illusion-Breaker.git
   cd Illusion-Breaker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   ```
   http://localhost:3000
   ```

---

## Browser Extension Setup

1. Clone the repository
2. Open Chrome and navigate to `chrome://extensions`
3. Enable **Developer Mode** (toggle in top right)
4. Click **Load unpacked**
5. Select the `/extension` folder from this project
6. Visit any webpage and click **Inspect Reality**

The extension extracts page content and redirects you to the dashboard where analysis results are displayed automatically.

**Direct link to extension folder:**  
https://github.com/mannshah24/Illusion-Breaker/tree/main/extension

---

## Analysis Features

### 1. Trust Score Visualization

A circular progress indicator showing confidence level (0-100) with color-coded interpretation:

- **70-100 (Green)**: High confidence, well-sourced content
- **40-69 (Orange)**: Mixed signals, moderate quality
- **0-39 (Red)**: Low confidence, potential issues

### 2. Claim Breakdown

Individual analysis of each verifiable claim with:

- Verification status (verified, disputed, unverified, misleading)
- Confidence percentage
- Referenced sources
- Detailed reasoning

### 3. Evidence Flags

Visual indicators for concerns:

- 🔴 **Critical**: Significant issues detected
- ⚠️ **Warning**: Potential problems identified
- ℹ️ **Info**: Contextual information

### 4. Reasoning Panel

Transparent explanation of the analysis process:

- Step-by-step breakdown
- Summary of findings
- Methodology notes

---

## AI & Limitations

### Analysis Method

IllusionBreaker uses **heuristic-based and rule-driven analysis** including:

- Linguistic pattern matching for claim extraction
- Domain reputation scoring
- Emotional language detection
- Source presence verification
- Content structure analysis
- Punctuation and formatting signals

### What It Does NOT Use

- ❌ Paid or proprietary LLM APIs (OpenAI, Claude, etc.)
- ❌ Neural network inference
- ❌ External fact-checking databases
- ❌ Image forensics or deepfake detection

### Limitations

- **Not perfect**: The system does not claim 100% accuracy
- **Heuristic-based**: Uses rule-driven logic, not machine learning
- **No external data**: Does not query live fact-checking services
- **Educational purpose**: Assists critical thinking rather than making final judgments

**Always verify information through multiple trusted sources.**

---

## Kestra AI Agent Usage

Kestra's built-in AI Agent is used within the workflow to:

1. **Summarize extracted content** into human-readable format
2. **Make confidence decisions** based on detected signals
3. **Compute scores** (0-100 scale)
4. **Output structured decisions**: High/Medium/Low Confidence

The AI Agent task in `kestra/flow.yaml` processes content using deterministic heuristics (not neural networks) to ensure:

- Consistent, reproducible results
- No external API dependencies
- Fast execution in serverless environments
- Clear, explainable decision logic

**Example output:**

```json
{
  "summary": "Content appears to be substantive article with attributed sources...",
  "decision": "High Confidence",
  "confidence_score": 85,
  "signals_detected": {
    "has_sources": true,
    "has_sensational": false,
    "word_count": 847
  }
}
```

---

## Oumi Integration

The project integrates the [Oumi open-source library](https://github.com/oumi-ai/oumi) for agent configuration and evaluation.

### What Oumi Provides

1. **Agent Configuration Abstraction**
   - Structured agent parameter definitions
   - Capability declarations
   - Mode and version management

2. **Evaluation Utilities**
   - Consistency scoring for analysis outputs
   - Quality metrics tracking
   - Foundation for reward modeling

3. **Architecture Foundation**
   - Prepares codebase for future RL integration
   - Demonstrates real library usage
   - Enables future fine-tuning experiments

### What This MVP Includes

- Real Oumi library installation (`agent/requirements.txt`)
- Agent abstraction patterns (`agent/oumi_agent.py`)
- Evaluation infrastructure for heuristic outputs
- Integration with Kestra workflow

### What This MVP Does NOT Include

**Reinforcement learning fine-tuning is not executed in this MVP.**

The integration provides:
- ✅ Agent abstraction and configuration
- ✅ Evaluation utilities and metrics
- ✅ Architectural foundation for future RL
- ❌ Production RL training loops
- ❌ Policy gradient updates
- ❌ Model weight fine-tuning

This honest, incremental approach demonstrates real library usage and clear understanding of RL concepts while maintaining realistic scope for an MVP.

---

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Deploy with default settings
4. Update extension API URL to your Vercel URL

### Environment Variables

No environment variables required (no external APIs or secrets needed).

---

## Project Structure

```
illusion-breaker/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── dashboard/
│   │   └── page.tsx             # Analysis results dashboard
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts         # Analysis API endpoint
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles with neon theme
│
├── components/
│   ├── TrustScore.tsx           # Circular trust score display
│   ├── ClaimBreakdown.tsx       # Claim-by-claim analysis
│   ├── EvidenceFlags.tsx        # Warning and info flags
│   └── ReasoningPanel.tsx       # Explainable reasoning steps
│
├── lib/
│   ├── analyze.ts               # Analysis wrapper
│   ├── heuristic_analyzer.ts    # Core heuristic engine
│   └── mock_data.ts             # Demo patterns for dashboard
│
├── extension/
│   ├── manifest.json            # Chrome extension manifest
│   ├── content.js               # Content extraction script
│   ├── popup.html               # Extension popup UI
│   └── popup.js                 # Popup logic
│
├── kestra/
│   └── flow.yaml                # Kestra workflow with AI Agent
│
├── agent/
│   ├── oumi_agent.py            # Oumi-based agent abstraction
│   ├── heuristic_analyzer.py    # Python version of heuristics
│   └── requirements.txt         # Python dependencies
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## Testing the Demo

### Test Case 1: News Article Analysis

1. Go to the dashboard
2. Click **"News Article"** demo
3. Observe mixed verification results and statistical analysis

### Test Case 2: Social Media Post

1. Go to the dashboard
2. Click **"Social Media Post"** demo
3. Observe low trust score due to sensational language patterns

### Test Case 3: Live Webpage (Extension)

1. Navigate to any news website
2. Click the IllusionBreaker extension icon
3. Click **"Inspect Reality"**
4. View real-time analysis in the dashboard

---

## Ethics

IllusionBreaker does not:

- ❌ Censor content or remove posts
- ❌ Assign intent or motivation
- ❌ Make final judgments about truth
- ❌ Replace professional fact-checkers

It provides:

- ✅ Transparent analysis to support informed decision-making
- ✅ Explainable reasoning for all conclusions
- ✅ Multiple signals rather than single scores
- ✅ Tools to assist critical thinking

**Users remain responsible for their own judgments.**

---

## Roadmap to Production

To make this production-ready:

### Phase 1: Real NLP
- Integrate spaCy or Hugging Face for claim extraction
- Add named entity recognition
- Implement semantic similarity checks

### Phase 2: Fact-Checking Integration
- Connect to Google Fact Check API
- Integrate ClaimReview structured data
- Add news archive searches

### Phase 3: Media Forensics
- Implement reverse image search (Google Vision API)
- Add EXIF metadata analysis
- Detect deepfakes with specialized models

### Phase 4: Oumi RL Fine-Tuning
- Implement reward modeling for heuristic calibration
- Add policy gradient training for score optimization
- Fine-tune lightweight models for claim extraction
- Integrate human feedback loops (RLHF)

### Phase 5: Scale
- Add database for caching results
- Implement rate limiting
- Add user accounts and history

---

## Contributing

This is a demonstration project, but suggestions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## License

MIT License - See [LICENSE](LICENSE) for details

---

## Contact

**Project Maintainer**: Mann Shah  
**GitHub**: [@mannshah24](https://github.com/mannshah24)  
**Repository**: [Illusion-Breaker](https://github.com/mannshah24/Illusion-Breaker)

---

## Acknowledgments

- **Next.js Team** for the excellent framework
- **Tailwind CSS** for beautiful utility classes
- **Vercel** for seamless deployment
- **Kestra** for workflow orchestration
- **Oumi** for agent architecture patterns

---

**Built with transparency. Powered by education. Designed for critical thinking.**
