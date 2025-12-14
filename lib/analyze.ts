import { analyzeContentHeuristic, type Claim, type EvidenceFlag, type ReasoningStep } from './heuristic_analyzer'

// Input structure for analysis
export interface AnalysisInput {
  url?: string
  content: string
  images?: string[]
  contentType?: string
  title?: string
}

// Complete analysis result with metadata
export interface AnalysisResult {
  id: string
  timestamp: string
  url: string
  trustScore: number
  confidence_label: string
  claims: Claim[]
  flags: EvidenceFlag[]
  reasoning: {
    steps: ReasoningStep[]
    summary: string
    methodology: string
  }
  metadata: {
    contentType: string
    wordCount: number
    imageCount: number
    analysisTime: number
  }
}

/**
 * Main analysis function using real heuristic analysis
 * 
 * This function now performs actual content analysis using deterministic
 * heuristics without requiring external APIs or AI services.
 */
export async function analyzeContent(input: AnalysisInput): Promise<AnalysisResult> {
  const startTime = Date.now()
  
  // Simulate brief processing time for UX
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Perform real heuristic analysis
  const heuristicResult = analyzeContentHeuristic({
    content: input.content,
    url: input.url,
    title: input.title
  })
  
  const analysisTime = ((Date.now() - startTime) / 1000).toFixed(2)
  
  // Add wrapper fields required by frontend
  const result: AnalysisResult = {
    id: `analysis-${Date.now()}`,
    timestamp: new Date().toISOString(),
    url: input.url || 'N/A',
    trustScore: heuristicResult.trust_score,
    confidence_label: heuristicResult.confidence_label,
    claims: heuristicResult.claims,
    flags: heuristicResult.flags,
    reasoning: heuristicResult.reasoning,
    metadata: {
      contentType: input.contentType || 'article',
      wordCount: input.content.split(/\s+/).length,
      imageCount: input.images?.length || 0,
      analysisTime: parseFloat(analysisTime)
    }
  }
  
  return result
}

/**
 * Extract claims from content (mocked)
 * In production, this would use NLP to identify verifiable statements
 */
export function extractClaims(content: string): string[] {
  // Mock implementation - in reality would use NLP
  const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 0)
  
  // Return first few sentences as "claims"
  return sentences.slice(0, 3).map((s) => s.trim())
}

/**
 * Verify a single claim (mocked)
 * In production, would query fact-checking databases and search engines
 */
export async function verifyClaim(claim: string): Promise<{
  verified: boolean
  confidence: number
  sources: string[]
}> {
  // Mock implementation
  return {
    verified: Math.random() > 0.5,
    confidence: Math.floor(Math.random() * 40) + 40, // 40-80
    sources: ['Mock Source 1', 'Mock Source 2'],
  }
}

/**
 * Calculate trust score based on analysis components
 */
export function calculateTrustScore(
  verifiedClaims: number,
  totalClaims: number,
  flagCount: number,
  criticalFlags: number
): number {
  if (totalClaims === 0) return 50 // Neutral score for no claims

  // Base score from claim verification
  const claimScore = (verifiedClaims / totalClaims) * 100

  // Penalty for flags
  const flagPenalty = flagCount * 5 + criticalFlags * 10

  // Final score (clamped to 0-100)
  return Math.max(0, Math.min(100, claimScore - flagPenalty))
}
