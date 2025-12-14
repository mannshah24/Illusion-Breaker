/**
 * Heuristic-Based Content Analysis Engine
 * 
 * This module provides deterministic, rule-based analysis of web content
 * without requiring external APIs or AI services.
 * 
 * Key components:
 * - Claim extraction using linguistic patterns
 * - Trust score computation based on multiple signals
 * - Evidence flag generation
 * - Reasoning template system
 */

export interface AnalysisInput {
  content: string
  url?: string
  title?: string
}

export interface Claim {
  id: number
  text: string
  status: 'verified' | 'unverified' | 'disputed' | 'misleading'
  confidence: number
  sources: string[]
  reasoning: string
}

export interface EvidenceFlag {
  type: 'critical' | 'warning' | 'info'
  category: string
  description: string
  details: string
}

export interface ReasoningStep {
  step: number
  title: string
  description: string
  outcome: string
}

export interface AnalysisResult {
  trust_score: number
  confidence_label: string
  claims: Claim[]
  flags: EvidenceFlag[]
  reasoning: {
    steps: ReasoningStep[]
    summary: string
    methodology: string
  }
}

/**
 * Main heuristic analysis function
 */
export function analyzeContentHeuristic(input: AnalysisInput): AnalysisResult {
  const { content, url = '', title = '' } = input
  
  // Extract claims from content
  const claims = extractClaims(content)
  
  // Compute trust score based on multiple signals
  const signals = computeSignals(content, url, title)
  const trustScore = computeTrustScore(signals)
  
  // Generate evidence flags
  const flags = generateEvidenceFlags(signals, content, url)
  
  // Generate reasoning
  const reasoning = generateReasoning(signals, trustScore, claims.length)
  
  // Determine confidence label
  const confidenceLabel = getConfidenceLabel(trustScore)
  
  return {
    trust_score: trustScore,
    confidence_label: confidenceLabel,
    claims,
    flags,
    reasoning,
  }
}

/**
 * Extract claims from content using rule-based sentence selection
 */
function extractClaims(content: string): Claim[] {
  const claims: Claim[] = []
  
  // Split content into sentences
  const sentences = content
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 20 && s.length < 300)
  
  // Key verbs that indicate factual claims
  const claimVerbs = [
    'is', 'are', 'was', 'were', 'shows', 'proves', 'demonstrates',
    'reveals', 'confirms', 'indicates', 'suggests', 'claims',
    'states', 'reports', 'found', 'discovered'
  ]
  
  let claimId = 1
  
  for (const sentence of sentences) {
    if (claims.length >= 3) break // Limit to top 3 claims
    
    const lowerSentence = sentence.toLowerCase()
    
    // Check if sentence contains claim verbs
    const hasClaim = claimVerbs.some(verb => {
      const pattern = new RegExp(`\\b${verb}\\b`, 'i')
      return pattern.test(lowerSentence)
    })
    
    if (hasClaim) {
      // Determine claim status based on language patterns
      const status = determineClaimStatus(lowerSentence)
      const confidence = computeClaimConfidence(lowerSentence)
      
      claims.push({
        id: claimId++,
        text: sentence.substring(0, 200), // Truncate long sentences
        status,
        confidence,
        sources: detectSources(sentence),
        reasoning: generateClaimReasoning(status, confidence),
      })
    }
  }
  
  // If no claims found, create a default one
  if (claims.length === 0) {
    claims.push({
      id: 1,
      text: 'Content contains general information without specific factual claims',
      status: 'unverified',
      confidence: 50,
      sources: [],
      reasoning: 'No specific verifiable claims detected in content',
    })
  }
  
  return claims
}

/**
 * Determine claim status based on language patterns
 */
function determineClaimStatus(sentence: string): 'verified' | 'unverified' | 'disputed' | 'misleading' {
  // Check for hedging language (indicates uncertainty)
  const hedgeWords = ['may', 'might', 'could', 'possibly', 'allegedly', 'reportedly', 'supposedly']
  const hasHedging = hedgeWords.some(word => sentence.includes(word))
  
  // Check for strong assertions
  const strongWords = ['definitely', 'absolutely', 'certainly', 'undoubtedly', 'proven']
  const hasStrong = strongWords.some(word => sentence.includes(word))
  
  // Check for sensational language
  const sensationalWords = ['shocking', 'unbelievable', 'secret', 'they don\'t want you to know']
  const hasSensational = sensationalWords.some(word => sentence.includes(word))
  
  if (hasSensational) return 'misleading'
  if (hasStrong && !hasHedging) return 'disputed'
  if (hasHedging) return 'unverified'
  
  // Check for attribution
  if (sentence.includes('according to') || sentence.includes('study') || sentence.includes('research')) {
    return 'verified'
  }
  
  return 'unverified'
}

/**
 * Compute claim confidence score
 */
function computeClaimConfidence(sentence: string): number {
  let confidence = 50 // Base confidence
  
  // Increase confidence for sourced claims
  if (sentence.includes('study') || sentence.includes('research') || sentence.includes('according to')) {
    confidence += 25
  }
  
  // Decrease confidence for sensational language
  const sensationalWords = ['shocking', 'unbelievable', 'incredible']
  if (sensationalWords.some(word => sentence.includes(word))) {
    confidence -= 20
  }
  
  // Decrease confidence for strong assertions without evidence
  if (sentence.includes('definitely') || sentence.includes('absolutely')) {
    confidence -= 15
  }
  
  return Math.max(0, Math.min(100, confidence))
}

/**
 * Detect sources mentioned in sentence
 */
function detectSources(sentence: string): string[] {
  const sources: string[] = []
  
  if (sentence.toLowerCase().includes('study')) {
    sources.push('Research study (specific source not verified)')
  }
  if (sentence.toLowerCase().includes('research')) {
    sources.push('Research publication (specific source not verified)')
  }
  if (sentence.toLowerCase().includes('according to')) {
    sources.push('Attributed source (verification needed)')
  }
  if (sentence.toLowerCase().includes('expert') || sentence.toLowerCase().includes('professor')) {
    sources.push('Expert opinion (credentials not verified)')
  }
  
  return sources
}

/**
 * Generate claim reasoning text
 */
function generateClaimReasoning(status: string, confidence: number): string {
  const reasons = {
    verified: 'Claim includes attribution and appears to reference verifiable sources',
    unverified: 'Claim lacks clear attribution or verifiable sources',
    disputed: 'Claim uses strong assertions without adequate evidence',
    misleading: 'Claim contains sensational language that may distort facts',
  }
  
  return reasons[status as keyof typeof reasons] || 'Standard claim analysis applied'
}

/**
 * Compute analysis signals from content
 */
interface AnalysisSignals {
  emotionalLanguageDensity: number
  sensationalPunctuation: number
  domainReputation: number
  sourcePresence: number
  contentLength: number
  capsRatio: number
  exclamationCount: number
  questionCount: number
  urlCount: number
  readabilityScore: number
}

function computeSignals(content: string, url: string, title: string): AnalysisSignals {
  // 1. Emotional language density
  const emotionalWords = [
    'shocking', 'unbelievable', 'incredible', 'amazing', 'terrible',
    'horrifying', 'outrageous', 'scandal', 'explosive', 'bombshell',
    'must-see', 'viral', 'breaking', 'urgent', 'crisis'
  ]
  const contentLower = content.toLowerCase()
  const emotionalCount = emotionalWords.filter(word => contentLower.includes(word)).length
  const emotionalLanguageDensity = (emotionalCount / Math.max(content.split(/\s+/).length / 100, 1))
  
  // 2. Sensational punctuation
  const exclamationCount = (content.match(/!/g) || []).length
  const questionCount = (content.match(/\?/g) || []).length
  const multiExclamation = (content.match(/!{2,}/g) || []).length
  const sensationalPunctuation = exclamationCount + (multiExclamation * 3) + (questionCount * 0.5)
  
  // 3. Domain reputation heuristic
  const domainReputation = computeDomainReputation(url)
  
  // 4. Source presence
  const sourceIndicators = ['according to', 'study', 'research', 'report', 'source:', 'http']
  const sourceCount = sourceIndicators.filter(indicator => contentLower.includes(indicator)).length
  const sourcePresence = Math.min(sourceCount * 2, 10)
  
  // 5. Content length
  const contentLength = content.length
  
  // 6. ALL CAPS ratio
  const capsWords = content.match(/\b[A-Z]{3,}\b/g) || []
  const totalWords = content.split(/\s+/).length
  const capsRatio = totalWords > 0 ? (capsWords.length / totalWords) * 100 : 0
  
  // 7. URL count in content
  const urlCount = (content.match(/https?:\/\//gi) || []).length
  
  // 8. Simple readability score (inverse of avg word length)
  const words = content.split(/\s+/)
  const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / Math.max(words.length, 1)
  const readabilityScore = 100 - (avgWordLength * 5)
  
  return {
    emotionalLanguageDensity,
    sensationalPunctuation,
    domainReputation,
    sourcePresence,
    contentLength,
    capsRatio,
    exclamationCount,
    questionCount,
    urlCount,
    readabilityScore: Math.max(0, Math.min(100, readabilityScore)),
  }
}

/**
 * Compute domain reputation score
 */
function computeDomainReputation(url: string): number {
  if (!url) return 50 // Neutral if no URL
  
  const urlLower = url.toLowerCase()
  
  // High reputation domains
  const highRepDomains = [
    '.edu', '.gov', '.ac.uk', 'reuters.com', 'apnews.com', 'bbc.com',
    'nytimes.com', 'washingtonpost.com', 'theguardian.com', 'nature.com',
    'science.org', 'npr.org'
  ]
  if (highRepDomains.some(domain => urlLower.includes(domain))) {
    return 90
  }
  
  // Moderate reputation domains (news sites)
  const modRepDomains = ['news', 'times', 'post', 'journal', 'herald', 'tribune']
  if (modRepDomains.some(domain => urlLower.includes(domain))) {
    return 70
  }
  
  // Social media domains (lower initial trust)
  const socialDomains = [
    'twitter.com', 'x.com', 'facebook.com', 'instagram.com',
    'tiktok.com', 'reddit.com'
  ]
  if (socialDomains.some(domain => urlLower.includes(domain))) {
    return 30
  }
  
  // Blog platforms
  const blogPlatforms = ['wordpress', 'blogger', 'medium.com', 'substack']
  if (blogPlatforms.some(platform => urlLower.includes(platform))) {
    return 50
  }
  
  return 60 // Default neutral-positive
}

/**
 * Compute final trust score based on signals
 */
function computeTrustScore(signals: AnalysisSignals): number {
  // Start with domain reputation as baseline
  let score = signals.domainReputation
  
  // Adjust for emotional language (negative)
  score -= signals.emotionalLanguageDensity * 10
  
  // Adjust for sensational punctuation (negative)
  if (signals.sensationalPunctuation > 5) {
    score -= Math.min(signals.sensationalPunctuation, 20)
  }
  
  // Adjust for source presence (positive)
  score += signals.sourcePresence * 1.5
  
  // Adjust for CAPS usage (negative)
  if (signals.capsRatio > 5) {
    score -= signals.capsRatio * 2
  }
  
  // Adjust for content length (very short or very long is suspicious)
  if (signals.contentLength < 200) {
    score -= 15
  } else if (signals.contentLength > 500 && signals.contentLength < 3000) {
    score += 5 // Good length for substantive content
  }
  
  // Adjust for external links (positive for credible linking)
  if (signals.urlCount >= 2 && signals.urlCount <= 10) {
    score += 5
  } else if (signals.urlCount > 10) {
    score -= 5 // Too many links can indicate spam
  }
  
  // Clamp between 0 and 100
  return Math.round(Math.max(0, Math.min(100, score)))
}

/**
 * Generate evidence flags based on detected patterns
 */
function generateEvidenceFlags(signals: AnalysisSignals, content: string, url: string): EvidenceFlag[] {
  const flags: EvidenceFlag[] = []
  
  // High emotional language
  if (signals.emotionalLanguageDensity > 2) {
    flags.push({
      type: 'warning',
      category: 'Emotional Language',
      description: 'High density of emotional or sensational language detected',
      details: 'Content uses emotionally charged words that may bias perception. Consider seeking additional neutral sources.',
    })
  }
  
  // Excessive punctuation
  if (signals.exclamationCount > 5 || content.includes('!!!')) {
    flags.push({
      type: 'warning',
      category: 'Sensational Presentation',
      description: 'Excessive use of exclamation marks detected',
      details: 'Multiple exclamation marks often indicate sensationalism rather than factual reporting.',
    })
  }
  
  // ALL CAPS usage
  if (signals.capsRatio > 5) {
    flags.push({
      type: 'warning',
      category: 'Formatting Concerns',
      description: 'Excessive use of all-caps text detected',
      details: 'Heavy use of capitalization can indicate emotional appeals or lack of editorial standards.',
    })
  }
  
  // Limited sources
  if (signals.sourcePresence < 2) {
    flags.push({
      type: 'info',
      category: 'Limited Source Attribution',
      description: 'Few external sources or references found',
      details: 'Content lacks clear attribution to external sources or research. Claims may be difficult to verify independently.',
    })
  }
  
  // Social media source
  if (signals.domainReputation < 40) {
    flags.push({
      type: 'info',
      category: 'Social Media Content',
      description: 'Content from social media or user-generated platform',
      details: 'Social media content has less editorial oversight. Verify claims through multiple independent sources.',
    })
  }
  
  // High reputation source
  if (signals.domainReputation > 85) {
    flags.push({
      type: 'info',
      category: 'Reputable Source',
      description: 'Content from established institutional or news source',
      details: 'Source has established editorial standards and fact-checking processes.',
    })
  }
  
  // Very short content
  if (signals.contentLength < 200) {
    flags.push({
      type: 'warning',
      category: 'Minimal Context',
      description: 'Very brief content with limited detail',
      details: 'Short content may lack necessary context for understanding claims. Seek additional information.',
    })
  }
  
  // Good source presence
  if (signals.sourcePresence >= 5) {
    flags.push({
      type: 'info',
      category: 'Well-Referenced',
      description: 'Multiple sources or references cited',
      details: 'Content includes references to external sources, enabling independent verification.',
    })
  }
  
  return flags
}

/**
 * Generate reasoning explanation
 */
function generateReasoning(signals: AnalysisSignals, trustScore: number, claimCount: number): {
  steps: ReasoningStep[]
  summary: string
  methodology: string
} {
  const steps: ReasoningStep[] = [
    {
      step: 1,
      title: 'Content Extraction',
      description: 'Analyzed text content and linguistic patterns',
      outcome: `Extracted ${claimCount} verifiable claim${claimCount !== 1 ? 's' : ''} from content`,
    },
    {
      step: 2,
      title: 'Signal Analysis',
      description: 'Evaluated multiple credibility indicators',
      outcome: generateSignalSummary(signals),
    },
    {
      step: 3,
      title: 'Trust Score Calculation',
      description: 'Computed weighted score from all signals',
      outcome: `Final trust score: ${trustScore}/100 (${getTrustLabel(trustScore)})`,
    },
  ]
  
  // Generate summary based on score
  let summary = ''
  if (trustScore >= 75) {
    summary = 'Content appears credible with good sourcing and minimal sensationalism. '
  } else if (trustScore >= 50) {
    summary = 'Content has mixed credibility signals. Some concerns present but not definitively problematic. '
  } else if (trustScore >= 25) {
    summary = 'Content shows multiple warning signs including sensational language or limited sourcing. '
  } else {
    summary = 'Content exhibits significant credibility concerns. Exercise extreme caution. '
  }
  
  // Add specific concerns
  if (signals.emotionalLanguageDensity > 2) {
    summary += 'High emotional language detected. '
  }
  if (signals.sourcePresence < 2) {
    summary += 'Limited external source attribution. '
  }
  if (signals.domainReputation < 40) {
    summary += 'Content from platform with limited editorial oversight. '
  }
  
  summary += 'Always verify claims through multiple independent sources.'
  
  const methodology = 'This analysis uses rule-based heuristics including linguistic pattern matching, domain reputation scoring, and structural analysis. It does not rely on external APIs or AI models, making it fully deterministic and privacy-preserving.'
  
  return { steps, summary, methodology }
}

/**
 * Generate signal summary text
 */
function generateSignalSummary(signals: AnalysisSignals): string {
  const points: string[] = []
  
  if (signals.domainReputation > 80) {
    points.push('High-reputation source')
  } else if (signals.domainReputation < 40) {
    points.push('Lower-reputation platform')
  }
  
  if (signals.sourcePresence > 4) {
    points.push('Well-sourced')
  } else if (signals.sourcePresence < 2) {
    points.push('Limited sourcing')
  }
  
  if (signals.emotionalLanguageDensity > 2) {
    points.push('High emotional language')
  }
  
  if (signals.sensationalPunctuation > 5) {
    points.push('Sensational presentation')
  }
  
  return points.length > 0 ? points.join(', ') : 'Standard content patterns detected'
}

/**
 * Get trust level label
 */
function getTrustLabel(score: number): string {
  if (score >= 80) return 'High confidence'
  if (score >= 60) return 'Moderate confidence'
  if (score >= 40) return 'Low confidence'
  return 'Very low confidence'
}

/**
 * Get confidence label for display
 */
function getConfidenceLabel(score: number): string {
  if (score >= 80) return 'High Confidence'
  if (score >= 60) return 'Moderate Confidence'
  if (score >= 40) return 'Low Confidence'
  return 'Very Low Confidence'
}
