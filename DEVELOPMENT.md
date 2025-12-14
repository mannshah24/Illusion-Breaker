# Development Guide

This guide covers development practices, architecture decisions, and extension points for Illusion Breaker.

## Architecture Decisions

### Why Next.js App Router?

- Server-side rendering for better SEO
- API routes for backend logic
- File-based routing
- Built-in TypeScript support
- Excellent developer experience

### Why Mocked Inference?

- **No API costs** during development
- **Deterministic behavior** for testing
- **Fast iteration** without rate limits
- **Demo-friendly** without API keys
- **Educational focus** on architecture

### Why Tailwind CSS?

- Rapid prototyping
- Consistent design system
- Small production bundle
- No context switching between files

## Project Conventions

### File Naming

- Components: PascalCase (`TrustScore.tsx`)
- Utilities: camelCase (`analyze.ts`)
- API routes: lowercase (`route.ts`)
- Config files: kebab-case (`tailwind.config.ts`)

### TypeScript

- Use explicit types for function parameters
- Export types alongside components
- Prefer interfaces over types for objects
- Use const assertions where appropriate

### Component Structure

```tsx
'use client' // Only if using hooks/client features

import statements

// Type definitions
interface ComponentProps {
  prop: string
}

// Main component
export default function Component({ prop }: ComponentProps) {
  return <div>{prop}</div>
}

// Helper components (if small and local)
function HelperComponent() {
  return <span>Helper</span>
}
```

### API Route Structure

```typescript
import { NextRequest, NextResponse } from "next/server";

// POST handler
export async function POST(request: NextRequest) {
  const body = await request.json();
  // Process request
  return NextResponse.json({ data });
}

// GET handler
export async function GET() {
  return NextResponse.json({ info });
}
```

## Extension Points

### Adding New Mock Patterns

Edit `lib/mock_data.ts`:

```typescript
export const MOCK_ANALYSES: Record<string, AnalysisResult> = {
  "your-type": {
    id: "analysis-custom",
    url: "https://example.com",
    timestamp: new Date().toISOString(),
    trustScore: 75,
    claims: [
      {
        id: 1,
        text: "Your claim here",
        status: "verified",
        confidence: 80,
        sources: ["Source 1"],
        reasoning: "Your reasoning",
      },
    ],
    flags: [],
    reasoning: {
      steps: [],
      summary: "Your summary",
      methodology: "Your methodology note",
    },
    metadata: {
      contentType: "your-type",
      wordCount: 100,
      imageCount: 0,
      analysisTime: 2.0,
    },
  },
};
```

### Creating New Components

1. Create file in `/components`
2. Define prop interface
3. Add 'use client' if using hooks
4. Export default function
5. Import in dashboard or other pages

Example:

```tsx
"use client";

interface NewComponentProps {
  data: string;
}

export default function NewComponent({ data }: NewComponentProps) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-white font-semibold mb-4">Title</h3>
      <p className="text-gray-300">{data}</p>
    </div>
  );
}
```

### Customizing the Theme

Edit `app/globals.css`:

```css
:root {
  --background: #0a0a0a; /* Dark background */
  --foreground: #ededed; /* Light text */
  --accent: #3b82f6; /* Blue accent */
}
```

Or use Tailwind's color system directly in components.

### Adding New API Endpoints

Create a new route:

```
app/
  api/
    your-endpoint/
      route.ts
```

Follow the same pattern as `analyze/route.ts`.

## Testing

### Manual Testing

Use the dashboard demo buttons to test different scenarios.

### API Testing

Use cURL, Postman, or the browser extension to test the API.

### Browser Extension Testing

1. Make changes to extension files
2. Go to `chrome://extensions/`
3. Click the refresh icon for Illusion Breaker
4. Test on any webpage

## Debugging

### Next.js Server

Check terminal output for errors and logs.

### Client-Side

Use browser DevTools console.

### Extension

1. Right-click extension icon → Inspect popup
2. Check console for popup.js errors
3. Inspect any webpage → Console for content.js errors

## Performance

### Bundle Size

- Next.js automatically optimizes
- Use dynamic imports for large components
- Keep dependencies minimal

### API Response Time

- Mocked responses are instant
- Adjust setTimeout in `lib/analyze.ts` for demo purposes

### Extension Performance

- Content script runs on all pages
- Only extracts content when button is clicked
- Minimal overhead

## Security

### Input Validation

Always validate user input in API routes.

### Extension Permissions

Only requests necessary permissions (activeTab, storage).

### CORS

Browser extension can't be blocked by CORS when running locally.

## Deployment Checklist

- [ ] Update extension API URL
- [ ] Test all demo scenarios
- [ ] Build and test production bundle
- [ ] Update README with deployment URL
- [ ] Add environment variables (if needed)
- [ ] Test extension with deployed API
- [ ] Check mobile responsiveness

## Future Enhancements

### Frontend

- Add animation to trust score
- Implement dark/light theme toggle
- Add keyboard shortcuts
- Improve mobile layout

### Backend

- Add result caching
- Implement rate limiting
- Add analytics/logging
- Create more mock patterns

### Extension

- Add options page
- Store analysis history
- Add keyboard shortcut
- Support more browsers (Firefox, Edge)

### Agent

- Add more sophisticated pattern matching
- Implement confidence scoring algorithm
- Add explanation templates
- Support multiple languages

## Code Quality

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npx tsc --noEmit
```

### Formatting

Consider adding Prettier:

```bash
npm install -D prettier
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)

## Getting Help

- Check existing issues in the repository
- Review the README and documentation
- Test with the provided demo scenarios
- Examine the mock data patterns

Happy developing!


