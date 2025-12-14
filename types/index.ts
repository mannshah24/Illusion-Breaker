/**
 * Illusion Breaker - Type Definitions
 * 
 * Centralized type definitions for the entire application
 */

// ===========================
// Analysis Types
// ===========================

export type ClaimStatus = 'verified' | 'disputed' | 'unverified' | 'misleading'

export interface Claim {
  id: number
  text: string
  status: ClaimStatus
  confidence: number
  sources: string[]
  reasoning: string
}

export type FlagType = 'critical' | 'warning' | 'info'

export interface EvidenceFlag {
  type: FlagType
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

export interface ReasoningData {
  steps: ReasoningStep[]
  summary: string
  methodology: string
}

export interface AnalysisMetadata {
  contentType: string
  wordCount: number
  imageCount: number
  analysisTime: number
}

export interface AnalysisResult {
  id: string
  url: string
  timestamp: string
  trustScore: number
  claims: Claim[]
  flags: EvidenceFlag[]
  reasoning: ReasoningData
  metadata: AnalysisMetadata
}

// ===========================
// API Types
// ===========================

export interface AnalysisInput {
  content: string
  url?: string
  images?: string[]
  contentType?: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// ===========================
// Extension Types
// ===========================

export interface ImageData {
  url: string
  alt: string
  width: number
  height: number
}

export interface PageData {
  url: string
  title: string
  description: string
  content: string
  images: ImageData[]
  contentType: string
  timestamp: string
}

export interface ExtensionMessage {
  action: string
  data?: unknown
}

export interface ExtensionResponse {
  success: boolean
  data?: PageData
  error?: string
}

// ===========================
// Agent Types
// ===========================

export interface AgentConfig {
  model: string
  version: string
  capabilities: string[]
  mode: string
  disclaimer: string
}

export interface AgentInput {
  content: string
  url?: string
  content_type?: string
  claims?: string[]
  media_analysis?: MediaAnalysisResult[]
}

export interface MediaAnalysisResult {
  url: string
  authentic: boolean
  confidence: number
  flags: string[]
}

export interface AgentOutput extends AnalysisResult {
  agent_info: AgentConfig
}

// ===========================
// Component Props Types
// ===========================

export interface TrustScoreProps {
  score: number
  label?: string
}

export interface ClaimBreakdownProps {
  claims: Claim[]
}

export interface EvidenceFlagsProps {
  flags: EvidenceFlag[]
}

export interface ReasoningPanelProps {
  steps: ReasoningStep[]
  summary: string
  methodology: string
}

// ===========================
// Utility Types
// ===========================

export type ContentType = 'news-article' | 'social-media' | 'default'

export interface VerificationResult {
  verified: boolean
  confidence: number
  sources: string[]
}

// ===========================
// Kestra Workflow Types
// ===========================

export interface WorkflowInput {
  content: string
  url?: string
  images?: string[]
  contentType?: string
}

export interface WorkflowOutput {
  analysis_result: AnalysisResult
}

export interface WorkflowTask {
  id: string
  type: string
  description?: string
  script?: string
  message?: string
}
