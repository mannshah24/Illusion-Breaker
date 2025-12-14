import type { Claim } from '@/components/ClaimBreakdown'
import type { EvidenceFlag } from '@/components/EvidenceFlags'
import type { ReasoningStep } from '@/components/ReasoningPanel'

// Analysis result structure
export interface AnalysisResult {
  id: string
  url: string
  timestamp: string
  trustScore: number
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

// Mock analysis data for different content types
export const MOCK_ANALYSES: Record<string, AnalysisResult> = {
  'real-news': {
    id: 'analysis-001',
    url: 'https://example.com/news/article',
    timestamp: new Date().toISOString(),
    trustScore: 78,
    claims: [
      {
        id: 1,
        text: 'The study involved 10,000 participants over 5 years',
        status: 'verified',
        confidence: 90,
        sources: [
          'Original research paper published in Nature Medicine',
          'University press release confirming study parameters',
        ],
        reasoning: 'Cross-referenced with original research publication. Study methodology matches claimed parameters.',
      },
      {
        id: 2,
        text: 'Research was conducted at leading institutions',
        status: 'verified',
        confidence: 85,
        sources: [
          'Institutional affiliations listed in publication',
        ],
        reasoning: 'Verified through academic database records and institutional websites.',
      },
    ],
    flags: [
      {
        type: 'info',
        category: 'Well-Sourced Content',
        description: 'Multiple credible sources cited',
        details: 'This content references peer-reviewed research and includes proper attribution. Claims are verifiable through academic databases.',
      },
    ],
    reasoning: {
      steps: [
        {
          step: 1,
          title: 'Content Analysis',
          description: 'Extracted and categorized claims',
          outcome: '2 primary claims identified',
        },
        {
          step: 2,
          title: 'Source Verification',
          description: 'Cross-checked against academic databases',
          outcome: 'All major claims verified',
        },
        {
          step: 3,
          title: 'Score Calculation',
          description: 'Applied weighted scoring',
          outcome: 'Final score: 78/100',
        },
      ],
      summary: 'Content is well-sourced and references legitimate research. Claims are verifiable through credible sources. Minor deductions for lack of direct primary source links.',
      methodology: 'This is a demonstration using predefined patterns. Production systems would perform live verification against fact-checking databases.',
    },
    metadata: {
      contentType: 'real-news',
      wordCount: 850,
      imageCount: 1,
      analysisTime: 3.2,
    },
  },

  'news-article': {
    id: 'analysis-001',
    url: 'https://example.com/news/article',
    timestamp: new Date().toISOString(),
    trustScore: 72,
    claims: [
      {
        id: 1,
        text: 'The study involved 10,000 participants over 5 years',
        status: 'verified',
        confidence: 85,
        sources: [
          'Original research paper published in Nature Medicine',
          'University press release confirming study parameters',
        ],
        reasoning: 'Cross-referenced with original research publication. Study methodology matches claimed parameters.',
      },
      {
        id: 2,
        text: 'Results showed a 95% improvement rate',
        status: 'misleading',
        confidence: 65,
        sources: [
          'Original study reports 95% statistical significance, not improvement rate',
          'Actual improvement was measured at 23%',
        ],
        reasoning: 'The article conflates statistical significance with improvement rate. Original study shows 23% improvement with 95% confidence interval.',
      },
      {
        id: 3,
        text: 'The treatment received FDA approval last month',
        status: 'unverified',
        confidence: 40,
        sources: [],
        reasoning: 'No corresponding FDA approval announcement found in public records. The treatment appears to still be in Phase III trials.',
      },
    ],
    flags: [
      {
        type: 'warning',
        category: 'Statistical Misrepresentation',
        description: 'Confusion between statistical significance and effect size',
        details: 'The article presents a p-value threshold (95%) as if it were the magnitude of the treatment effect. This is a common misinterpretation that can mislead readers about actual outcomes.',
      },
      {
        type: 'critical',
        category: 'Unverified Regulatory Claim',
        description: 'FDA approval claim cannot be confirmed',
        details: 'No record of FDA approval for this treatment in the past 6 months. Always verify regulatory claims through official FDA databases.',
      },
    ],
    reasoning: {
      steps: [
        {
          step: 1,
          title: 'Content Extraction',
          description: 'Extracted text content and identified 3 primary factual claims',
          outcome: '3 claims extracted for verification',
        },
        {
          step: 2,
          title: 'Source Identification',
          description: 'Searched academic databases and regulatory records for supporting evidence',
          outcome: 'Found original research paper and university records',
        },
        {
          step: 3,
          title: 'Claim Verification',
          description: 'Cross-referenced each claim against identified sources',
          outcome: '1 verified, 1 misleading, 1 unverified',
        },
        {
          step: 4,
          title: 'Media Analysis',
          description: 'Checked accompanying images for manipulation indicators',
          outcome: 'No manipulation detected in provided images',
        },
        {
          step: 5,
          title: 'Trust Score Calculation',
          description: 'Computed weighted score based on claim verification and flag severity',
          outcome: 'Final score: 72/100',
        },
      ],
      summary: 'This article references legitimate research but contains significant misrepresentations. The core study exists and is credible, but key claims about results and regulatory status are either misleading or unverified. Readers should consult the original research paper for accurate findings.',
      methodology: 'This is a demonstration pattern designed to showcase the Illusion Breaker architecture. In a production system, claims would be verified against live databases, and media would undergo forensic analysis. Current results are illustrative only.',
    },
    metadata: {
      contentType: 'news-article',
      wordCount: 850,
      imageCount: 2,
      analysisTime: 3.2,
    },
  },

  'social-media': {
    id: 'analysis-002',
    url: 'https://example.com/social/post',
    timestamp: new Date().toISOString(),
    trustScore: 35,
    claims: [
      {
        id: 1,
        text: 'This photo shows the event that happened yesterday',
        status: 'disputed',
        confidence: 80,
        sources: [
          'Reverse image search found original photo from 2019',
          'Multiple fact-checking sites debunked this claim',
        ],
        reasoning: 'The image is authentic but miscontextualized. It was originally published 4 years ago and shows a different event.',
      },
      {
        id: 2,
        text: 'Over 100,000 people attended',
        status: 'unverified',
        confidence: 30,
        sources: [],
        reasoning: 'No official attendance records available. Crowd size estimates vary widely across sources and cannot be independently verified.',
      },
    ],
    flags: [
      {
        type: 'critical',
        category: 'Image Miscontextualization',
        description: 'Old image presented as recent event',
        details: 'The photo is authentic but dates from 2019. Using old imagery to represent current events is a common misinformation tactic that misleads viewers about timing and context.',
      },
      {
        type: 'warning',
        category: 'Unverifiable Claims',
        description: 'Specific numerical claims without credible sourcing',
        details: 'Crowd size claims are notoriously difficult to verify and are often exaggerated. No official estimates could be located.',
      },
    ],
    reasoning: {
      steps: [
        {
          step: 1,
          title: 'Content Extraction',
          description: 'Extracted post text and associated media',
          outcome: '2 factual claims and 1 image identified',
        },
        {
          step: 2,
          title: 'Image Analysis',
          description: 'Performed reverse image search and metadata examination',
          outcome: 'Image found in archives from 2019',
        },
        {
          step: 3,
          title: 'Claim Verification',
          description: 'Searched for corroborating evidence for attendance claims',
          outcome: 'No reliable sources found',
        },
        {
          step: 4,
          title: 'Trust Score Calculation',
          description: 'Applied scoring model weighted toward image misuse',
          outcome: 'Final score: 35/100',
        },
      ],
      summary: 'This content exhibits classic misinformation patterns: recycled imagery and unverifiable statistics. The image is real but misleadingly presented as recent. Without proper context and sourcing, this post should be treated with extreme skepticism.',
      methodology: 'This is a demonstration analysis using predefined patterns. Production systems would perform live reverse image searches, EXIF data analysis, and cross-reference with real-time news databases.',
    },
    metadata: {
      contentType: 'social-media',
      wordCount: 45,
      imageCount: 1,
      analysisTime: 2.8,
    },
  },

  'misleading-post': {
    id: 'analysis-004',
    url: 'https://example.com/viral-post',
    timestamp: new Date().toISOString(),
    trustScore: 28,
    claims: [
      {
        id: 1,
        text: 'Secret trick that doctors don\'t want you to know',
        status: 'disputed',
        confidence: 85,
        sources: [
          'Medical consensus contradicts claimed mechanism',
          'Multiple fact-checking sites debunked similar claims',
        ],
        reasoning: 'Classic clickbait pattern with no scientific backing. Medical professionals openly discuss this topic.',
      },
      {
        id: 2,
        text: 'Limited time offer - act now',
        status: 'misleading',
        confidence: 90,
        sources: [],
        reasoning: 'Artificial urgency tactic commonly used in scams. No genuine time constraint exists.',
      },
    ],
    flags: [
      {
        type: 'critical',
        category: 'Clickbait Patterns',
        description: 'Sensationalist language and false urgency',
        details: 'Content uses manipulative language designed to bypass critical thinking: "secret", "they don\'t want you to know", "limited time". These are red flags for misinformation.',
      },
      {
        type: 'critical',
        category: 'Unsupported Medical Claims',
        description: 'Health claims without scientific evidence',
        details: 'Makes medical assertions that contradict established science without providing credible sources.',
      },
    ],
    reasoning: {
      steps: [
        {
          step: 1,
          title: 'Language Analysis',
          description: 'Scanned for manipulative patterns',
          outcome: 'Multiple clickbait indicators detected',
        },
        {
          step: 2,
          title: 'Claim Verification',
          description: 'Checked medical claims against databases',
          outcome: 'Claims contradict medical consensus',
        },
        {
          step: 3,
          title: 'Trust Score Calculation',
          description: 'Applied penalties for manipulation tactics',
          outcome: 'Final score: 28/100',
        },
      ],
      summary: 'This content exhibits clear misinformation patterns: sensationalist language, unsupported claims, and manipulation tactics. Should be treated with extreme skepticism.',
      methodology: 'Demonstration analysis using pattern recognition. Real systems would verify against medical databases and fact-checking APIs.',
    },
    metadata: {
      contentType: 'misleading-post',
      wordCount: 120,
      imageCount: 0,
      analysisTime: 2.1,
    },
  },

  'manipulated-media': {
    id: 'analysis-005',
    url: 'https://example.com/viral-image',
    timestamp: new Date().toISOString(),
    trustScore: 42,
    claims: [
      {
        id: 1,
        text: 'Image shows recent event at specific location',
        status: 'disputed',
        confidence: 75,
        sources: [
          'Reverse image search found earlier version',
          'Geolocation does not match claimed location',
        ],
        reasoning: 'Image has been digitally altered or miscontextualized. Original version shows different details.',
      },
    ],
    flags: [
      {
        type: 'critical',
        category: 'Potential Image Manipulation',
        description: 'Evidence of editing or miscontextualization',
        details: 'Forensic analysis suggests image has been cropped, edited, or taken out of context. Always verify image authenticity for news content.',
      },
      {
        type: 'warning',
        category: 'Location Mismatch',
        description: 'Claimed location inconsistent with image metadata',
        details: 'Geographic details in image do not match the claimed location. This could indicate deliberate misrepresentation.',
      },
    ],
    reasoning: {
      steps: [
        {
          step: 1,
          title: 'Image Extraction',
          description: 'Retrieved and analyzed media files',
          outcome: '1 primary image identified',
        },
        {
          step: 2,
          title: 'Reverse Search',
          description: 'Searched for image origins',
          outcome: 'Found earlier versions with differences',
        },
        {
          step: 3,
          title: 'Forensic Analysis',
          description: 'Checked for manipulation indicators',
          outcome: 'Potential editing detected',
        },
        {
          step: 4,
          title: 'Score Calculation',
          description: 'Weighted scoring for media authenticity',
          outcome: 'Final score: 42/100',
        },
      ],
      summary: 'Media content shows signs of manipulation or miscontextualization. Image authenticity is questionable and claims should be verified independently.',
      methodology: 'Mock analysis demonstrating media verification workflow. Production systems would use forensic tools and metadata analysis.',
    },
    metadata: {
      contentType: 'manipulated-media',
      wordCount: 85,
      imageCount: 3,
      analysisTime: 4.5,
    },
  },

  'default': {
    id: 'analysis-003',
    url: 'https://example.com/content',
    timestamp: new Date().toISOString(),
    trustScore: 55,
    claims: [
      {
        id: 1,
        text: 'Sample claim extracted from content',
        status: 'unverified',
        confidence: 50,
        sources: [],
        reasoning: 'Insufficient information available to verify this claim. Further investigation would be needed.',
      },
    ],
    flags: [
      {
        type: 'info',
        category: 'Limited Context',
        description: 'Analysis performed with incomplete information',
        details: 'The provided content did not contain enough specific claims or context for comprehensive analysis.',
      },
    ],
    reasoning: {
      steps: [
        {
          step: 1,
          title: 'Content Processing',
          description: 'Analyzed provided content structure',
          outcome: 'Limited verifiable claims identified',
        },
        {
          step: 2,
          title: 'Basic Verification',
          description: 'Attempted to verify extractable claims',
          outcome: 'No strong evidence found either way',
        },
      ],
      summary: 'This analysis was performed on generic content without strong factual claims. Results should be considered preliminary.',
      methodology: 'This is a demonstration pattern. Real-world analysis would depend on content specificity and available verification sources.',
    },
    metadata: {
      contentType: 'generic',
      wordCount: 200,
      imageCount: 0,
      analysisTime: 1.5,
    },
  },
}

// Function to select mock data based on content type
export function getMockAnalysis(contentType?: string): AnalysisResult {
  const type = contentType || 'default'
  const validTypes = ['real-news', 'news-article', 'social-media', 'misleading-post', 'manipulated-media', 'default']
  
  // Return the analysis for the given type, fallback to default
  if (validTypes.includes(type)) {
    return MOCK_ANALYSES[type]
  }
  
  return MOCK_ANALYSES['default']
}
