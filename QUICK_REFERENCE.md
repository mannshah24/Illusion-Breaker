# Illusion Breaker - Quick Reference

## 🚀 Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type check
npx tsc --noEmit
```

## 📂 Key File Locations

| Purpose        | Location                   |
| -------------- | -------------------------- |
| Landing Page   | `app/page.tsx`             |
| Dashboard      | `app/dashboard/page.tsx`   |
| API Endpoint   | `app/api/analyze/route.ts` |
| Mock Data      | `lib/mock_data.ts`         |
| Analysis Utils | `lib/analyze.ts`           |
| Extension      | `extension/` folder        |
| Agent          | `agent/oumi_agent.py`      |
| Workflow       | `kestra/flow.yaml`         |

## 🎨 Component Import Paths

```typescript
import TrustScore from "@/components/TrustScore";
import ClaimBreakdown from "@/components/ClaimBreakdown";
import EvidenceFlags from "@/components/EvidenceFlags";
import ReasoningPanel from "@/components/ReasoningPanel";
import { analyzeContent } from "@/lib/analyze";
import { getMockAnalysis } from "@/lib/mock_data";
```

## 🔌 API Usage

### GET /api/analyze

Returns API information and status

```bash
curl http://localhost:3000/api/analyze
```

### POST /api/analyze

Submit content for analysis

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Your content here",
    "url": "https://example.com",
    "contentType": "news-article"
  }'
```

## 🎯 Content Types

- `news-article` - News and research articles (Trust Score: 72)
- `social-media` - Social media posts (Trust Score: 35)
- `default` - Generic content (Trust Score: 55)

## 🧩 Component Props

### TrustScore

```typescript
<TrustScore score={72} label="Trust Score" />
```

### ClaimBreakdown

```typescript
<ClaimBreakdown
  claims={[
    {
      id: 1,
      text: "Claim text",
      status: "verified",
      confidence: 85,
      sources: ["Source 1"],
      reasoning: "Explanation",
    },
  ]}
/>
```

### EvidenceFlags

```typescript
<EvidenceFlags
  flags={[
    {
      type: "warning",
      category: "Category",
      description: "Description",
      details: "Details",
    },
  ]}
/>
```

### ReasoningPanel

```typescript
<ReasoningPanel
  steps={[...]}
  summary="Summary text"
  methodology="Methodology note"
/>
```

## 🎨 Tailwind Utility Classes

### Colors

```
bg-gray-800       # Dark background
bg-gray-900       # Darker background
text-white        # White text
text-gray-300     # Light gray text
text-gray-400     # Medium gray text
border-gray-700   # Gray border
```

### Layout

```
rounded-xl        # Large rounded corners
p-8               # Padding 2rem
mb-6              # Margin bottom 1.5rem
space-y-4         # Vertical spacing 1rem
```

### Status Colors

```
text-green-500    # Success/Verified
text-yellow-500   # Warning
text-red-500      # Critical/Disputed
text-blue-500     # Info/Primary
```

## 🌐 URL Routes

| Route          | Purpose               |
| -------------- | --------------------- |
| `/`            | Landing page          |
| `/dashboard`   | Analysis dashboard    |
| `/api/analyze` | Analysis API endpoint |

## 🔧 Extension Files

| File            | Purpose                   |
| --------------- | ------------------------- |
| `manifest.json` | Extension configuration   |
| `content.js`    | Page content extraction   |
| `popup.html`    | Extension popup UI        |
| `popup.js`      | Popup logic and API calls |

## 📊 Mock Data Structure

```typescript
{
  id: 'analysis-001',
  url: 'https://example.com',
  timestamp: '2025-12-13T...',
  trustScore: 72,
  claims: [...],
  flags: [...],
  reasoning: {
    steps: [...],
    summary: '...',
    methodology: '...'
  },
  metadata: {
    contentType: 'news-article',
    wordCount: 850,
    imageCount: 2,
    analysisTime: 3.2
  }
}
```

## 🐍 Python Agent

### Test Agent

```bash
cd agent
python oumi_agent.py
```

### Import in Code

```python
from oumi_agent import OumiAgent, analyze_content

agent = OumiAgent()
result = analyze_content({
  'content': 'Text here',
  'content_type': 'news-article'
})
```

## 🚢 Deployment

### Vercel

1. Push to GitHub
2. Import in Vercel
3. Deploy (auto-configured)
4. Update extension API URL

### Environment Variables

None required (no external APIs)

## 🎓 Key Concepts

**Trust Score**: 0-100 confidence rating  
**Claims**: Verifiable statements extracted from content  
**Flags**: Warning indicators for concerns  
**Reasoning**: Transparent explanation of analysis process  
**Mocked Inference**: Predefined patterns, not live AI

## 🔍 Debugging

### Check Logs

- **Server**: Terminal where `npm run dev` is running
- **Browser**: DevTools Console (F12)
- **Extension Popup**: Right-click icon → Inspect popup
- **Extension Content**: Inspect any page → Console tab

### Common Issues

**Port in use**: Use different port or stop other process  
**Extension not loading**: Check manifest.json and icon files  
**API not responding**: Ensure dev server is running  
**TypeScript errors**: Check terminal output

## 📚 Documentation

- **Full Docs**: `README.md`
- **Getting Started**: `GETTING_STARTED.md`
- **Development**: `DEVELOPMENT.md`
- **Project Summary**: `PROJECT_SUMMARY.md`
- **Verification**: `VERIFICATION_CHECKLIST.md`

## 💡 Tips

- Use `npm run dev` for hot reload during development
- Tailwind classes apply instantly without restart
- Extension needs manual reload after changes
- API returns mocked data instantly (no external calls)
- Dashboard demos trigger same analysis function as API

## 🎯 Demo Checklist

1. ✅ Show landing page
2. ✅ Navigate to dashboard
3. ✅ Click demo buttons
4. ✅ Explain trust score
5. ✅ Review claims
6. ✅ Show flags
7. ✅ Expand reasoning
8. ✅ Highlight transparency
9. ✅ Demo extension
10. ✅ Discuss production path

---

**Quick Start**: `npm install && npm run dev`  
**URL**: http://localhost:3000  
**API**: http://localhost:3000/api/analyze

**Ready to inspect reality!** 🔍✨


