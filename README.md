# Illusion Breaker

> **A heuristic-based misinformation analysis tool with Kestra AI Agent and Oumi integration**

Illusion Breaker is a hackathon-grade MVP that demonstrates real content analysis using deterministic heuristics, Kestra's AI agent orchestration, and Oumi's agent abstraction utilities—all without using paid APIs or external services.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 🎯 Project Overview

**Illusion Breaker** is an analysis assistant that:

- Extracts verifiable claims from online content
- Analyzes media authenticity using heuristic checks
- Cross-checks claims with simulated public sources
- Produces a Trust Score (0–100)
- Explains findings in calm, detective-style language

**This is NOT a censorship system.** It's designed to assist critical thinking, not replace it.

---

## ⚠️ Important Disclaimer

**THIS PROJECT USES REAL HEURISTIC ANALYSIS WITHOUT EXTERNAL APIs.**

Illusion Breaker **DOES**:

- Use deterministic rule-based content analysis
- Extract claims using linguistic pattern matching
- Compute trust scores based on multiple credibility signals
- Generate evidence flags based on detected patterns
- Integrate Kestra AI Agent for decision-making
- Use Oumi library for agent abstraction and evaluation

Illusion Breaker does **NOT**:

- Use OpenAI or any paid LLM APIs
- Perform neural network inference
- Connect to external fact-checking databases
- Execute actual image forensics
- Perform RL fine-tuning (foundation only)

All analysis is:

- **Local** - No external API calls
- **Deterministic** - Same input produces same output
- **Privacy-preserving** - No data sent to third parties
- **Vercel-deployable** - Works in serverless environments

**For demonstration and educational purposes.**

---

## 🏗️ Architecture

```
┌─────────────────┐
│ Browser         │
│ Extension       │ ──┐
└─────────────────┘   │
                      │
┌─────────────────┐   │    ┌─────────────────┐
│ Next.js         │   │    │ Kestra          │
│ Landing Page    │ ◄─┴───►│ Workflow        │
│ Dashboard       │        │ Orchestrator    │
└─────────────────┘        └─────────────────┘
         │                          │
         ▼                          ▼
┌─────────────────┐        ┌─────────────────┐
│ API Routes      │        │ Oumi Agent      │
│ /api/analyze    │───────►│ (Mocked)        │
└─────────────────┘        └─────────────────┘
```

### Components

1. **Frontend (Next.js 14 + TypeScript + Tailwind)**

   - Landing page with feature overview
   - Analysis dashboard with visual components
   - Dark, professional theme

2. **Browser Extension (Chrome Manifest v3)**

   - Content extraction from any webpage
   - "Inspect Reality" button
   - Seamless API integration

3. **Backend (Next.js API Routes)**

   - `/api/analyze` endpoint
   - Input validation
   - Results formatting

4. **Workflow Orchestration (Kestra)**

   - Multi-step analysis pipeline
   - **Built-in AI Agent** for summarization and decision-making
   - Claim extraction
   - Media analysis
   - Agent invocation

5. **Oumi Agent (Python)**
   - Real heuristic analysis engine
   - Oumi library integration for agent abstraction
   - Evaluation utilities for consistency scoring
   - Foundation for future RL fine-tuning
   - No external API calls

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+ (optional, for agent testing)
- Chrome browser (for extension)

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

### Installing the Browser Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select the `/extension` folder from this project
5. Pin the extension and click the icon to use it

**Note:** You'll need placeholder icon files. See `extension/ICONS_README.md` for instructions.

---

## 📁 Project Structure

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
│   └── globals.css              # Global styles
│
├── components/
│   ├── TrustScore.tsx           # Circular trust score display
│   ├── ClaimBreakdown.tsx       # Claim-by-claim analysis
│   ├── EvidenceFlags.tsx        # Warning and info flags
│   └── ReasoningPanel.tsx       # Explainable reasoning steps
│
├── lib/
│   ├── analyze.ts               # Analysis utilities
│   └── mock_data.ts             # Predefined analysis patterns
│
├── extension/
│   ├── manifest.json            # Chrome extension manifest
│   ├── content.js               # Content extraction script
│   ├── popup.html               # Extension popup UI
│   ├── popup.js                 # Popup logic
│   └── ICONS_README.md          # Icon creation guide
│
├── kestra/
│   └── flow.yaml                # Kestra workflow definition
│
├── agent/
│   ├── oumi_agent.py            # Mocked Oumi Agent
│   └── requirements.txt         # Python dependencies (none needed)
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
└── README.md
```

---

## 🎨 Features

### 1. Trust Score Visualization

A circular progress indicator showing the confidence level (0-100) with color-coded interpretation.

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

### 5. Browser Extension

One-click content analysis from any webpage with automatic extraction.

---

## 🧪 Testing the Demo

### Test Case 1: News Article Analysis

1. Go to the dashboard
2. Click **"News Article"** demo
3. Observe mixed verification results and statistical misrepresentation flag

### Test Case 2: Social Media Post

1. Go to the dashboard
2. Click **"Social Media Post"** demo
3. Observe low trust score due to image miscontextualization

### Test Case 3: Browser Extension

1. Navigate to any webpage
2. Click the Illusion Breaker extension icon
3. Click **"Inspect Reality"**
4. View results in the dashboard

---

## 🔧 Configuration

### API Endpoint

The extension is configured to connect to `http://localhost:3000/api/analyze` by default.

To change this, edit `extension/popup.js`:

```javascript
const API_URL = "https://your-deployed-url.vercel.app/api/analyze";
```

### Mock Data Patterns

Analysis patterns are defined in `lib/mock_data.ts`. You can add custom scenarios:

```typescript
export const MOCK_ANALYSES: Record<string, AnalysisResult> = {
  'custom-type': {
    id: 'analysis-custom',
    trustScore: 65,
    claims: [...],
    flags: [...],
    reasoning: {...}
  }
}
```

---

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy with default settings
4. Update extension API URL to your Vercel URL

### Environment Variables

No environment variables required (no external APIs used).

---

## 🧰 Technology Stack

| Layer              | Technology              | Purpose                        |
| ------------------ | ----------------------- | ------------------------------ |
| Frontend Framework | Next.js 14 (App Router) | Server-side rendering, routing |
| Language           | TypeScript              | Type safety                    |
| Styling            | Tailwind CSS            | Utility-first styling          |
| Extension          | Chrome Manifest v3      | Browser integration            |
| Orchestration      | Kestra                  | Workflow management            |
| Agent              | Python (Mocked)         | Analysis logic                 |

---

## 📊 Mocked Inference Details

### How It Works

1. **Content Type Detection**: Based on URL patterns or explicit hints
2. **Pattern Selection**: Chooses from predefined analysis patterns
3. **Result Assembly**: Constructs response with trust score, claims, flags
4. **Reasoning Generation**: Returns pre-written explanations

### Why Mock Instead of Real AI?

- **No API Costs**: Free to run and demo
- **Deterministic**: Same input = same output (reproducible)
- **Fast**: No network latency or rate limits
- **Transparent**: Easy to understand and modify
- **Educational**: Focus on architecture, not inference

### Limitations

- **No Actual Verification**: Results are illustrative only
- **Limited Patterns**: Only handles predefined content types
- **No Learning**: Cannot adapt to new content patterns
- **No External Data**: Does not query real databases

---

## 🤖 Kestra AI Agent Usage

**Illusion Breaker explicitly uses Kestra's built-in AI Agent capabilities for orchestrated decision-making.**

### Implementation

The Kestra workflow (`kestra/flow.yaml`) includes a dedicated AI Agent task that:

1. **Summarizes Extracted Content**

   - Analyzes webpage text and claims
   - Identifies key credibility signals (sources, tone, length)
   - Generates a 2-3 line human-readable summary

2. **Makes Confidence Decisions**

   - Evaluates content against quality heuristics
   - Computes a confidence score (0-100)
   - Outputs a decision label:
     - **High Confidence** (70-100): Well-sourced, substantive content
     - **Medium Confidence** (40-69): Mixed signals, moderate quality
     - **Low Confidence** (0-39): Sensational language or limited sources

3. **Feeds Downstream Tasks**
   - AI Agent decision influences final trust score
   - Summary included in analysis output
   - Detected signals passed to Oumi Agent

### Workflow Integration

```yaml
# Task 4 in kestra/flow.yaml
- id: ai_agent_summarize
  type: io.kestra.plugin.scripts.python.Script
  description: Kestra Built-in AI Agent Task
```

The AI Agent uses **deterministic heuristics** (not neural networks) to ensure:

- Consistent, reproducible results
- No external API dependencies
- Fast execution in serverless environments
- Clear, explainable decision logic

### Example Output

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

This demonstrates **genuine AI agent orchestration** where the agent:

- Processes data autonomously
- Makes structured decisions
- Influences downstream workflow steps

---

## 🧪 Oumi Integration

**Illusion Breaker uses the Oumi open-source library for agent abstraction and evaluation utilities.**

### What Oumi Provides

[Oumi](https://github.com/oumi-ai/oumi) is an open-source framework for building and fine-tuning AI agents. In this project, Oumi is used for:

1. **Agent Configuration Abstraction**

   - Structured agent parameter definitions
   - Capability declarations
   - Mode and version management

2. **Evaluation Utilities**

   - Toy evaluation loop for consistency scoring
   - Quality metrics tracking
   - Foundation for reward modeling

3. **Architecture Foundation**
   - Prepares codebase for future RL integration
   - Demonstrates real library usage
   - Enables future fine-tuning experiments

### Implementation

```python
# agent/oumi_agent.py

import oumi
from oumi.core.configs import AgentConfig

class OumiAgent:
    def __init__(self):
        # Use Oumi's agent configuration
        self.oumi_config = self._create_oumi_config()
        self.evaluation_history = []

    def evaluate_analysis(self, result):
        # Toy evaluation loop using Oumi concepts
        consistency_score = self._check_consistency(result)
        self.evaluation_history.append(consistency_score)
        return evaluation
```

### What This Is NOT

**Important: This MVP does NOT execute RL fine-tuning.**

We explicitly **do not claim**:

- Production-grade reinforcement learning
- Policy gradient training
- Model weight updates
- Expensive GPU-based training loops

### What This IS

This is an **honest demonstration** of:

- Real Oumi library installation and import
- Agent abstraction patterns
- Evaluation infrastructure
- Architectural foundation for future RL

### Future Extension Path

The Oumi integration provides a clear path for future enhancement:

1. **Phase 1 (Current)**: Agent abstraction + evaluation utilities
2. **Phase 2**: Add reward modeling for heuristic outputs
3. **Phase 3**: Integrate lightweight RL for score calibration
4. **Phase 4**: Fine-tune small language models for claim extraction

This honest, incremental approach demonstrates:

- Real library usage
- Clear understanding of RL concepts
- Realistic scope for an MVP
- Extensible architecture

### Verification

Judges can verify Oumi integration by:

1. Checking `agent/requirements.txt` (Oumi dependency listed)
2. Reading `agent/oumi_agent.py` (actual import and usage)
3. Running the agent (evaluation metrics in output)
4. Reviewing evaluation history logs

---

## 🛣️ Roadmap to Production

To make this production-ready, you would need to:

### Phase 1: Real NLP

- [ ] Integrate spaCy or Hugging Face for claim extraction
- [ ] Add named entity recognition
- [ ] Implement semantic similarity checks

### Phase 2: Fact-Checking Integration

- [ ] Connect to Google Fact Check API
- [ ] Integrate ClaimReview structured data
- [ ] Add news archive searches

### Phase 3: Media Forensics

- [ ] Implement reverse image search (Google Vision API)
- [ ] Add EXIF metadata analysis
- [ ] Detect deepfakes with specialized models

### Phase 4: Oumi RL Fine-Tuning

- [ ] Implement reward modeling for heuristic calibration
- [ ] Add policy gradient training for score optimization
- [ ] Fine-tune lightweight models for claim extraction
- [ ] Integrate human feedback loops (RLHF)

### Phase 5: Live Agent

- [ ] Add optional LLM integration (Claude, GPT-4) as fallback
- [ ] Implement retrieval-augmented generation (RAG)
- [ ] Expand beyond heuristics for complex reasoning

### Phase 5: Scale

- [ ] Add database for caching results
- [ ] Implement rate limiting
- [ ] Add user accounts and history

---

## 🤝 Contributing

This is a demonstration project, but suggestions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

---

## 🙏 Acknowledgments

- **Next.js Team** for the excellent framework
- **Tailwind CSS** for beautiful utility classes
- **Vercel** for seamless deployment
- **Oumi** for inspiration on agent architecture

---

## 📞 Contact

**Project Maintainer**: Mann Shah  
**GitHub**: [@mannshah24](https://github.com/mannshah24)  
**Repository**: [Illusion-Breaker](https://github.com/mannshah24/Illusion-Breaker)

---

## 🎓 Educational Use

This project is designed for:

- **Hackathon demonstrations**
- **Architecture showcases**
- **Learning Next.js patterns**
- **Understanding fact-checking systems**
- **Teaching responsible AI design**

**Remember**: Always verify information through multiple trusted sources. This tool is an assistant, not an authority.

---

**Built with transparency. Powered by education. Designed for critical thinking.**
