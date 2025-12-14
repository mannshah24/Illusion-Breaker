import { NextRequest, NextResponse } from 'next/server'
import { analyzeContent } from '@/lib/analyze'

/**
 * POST /api/analyze
 * 
 * Accepts content for analysis and returns structured results
 * In production, this would trigger a Kestra workflow
 * For the MVP, it returns mocked analysis from predefined patterns
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input - require content
    if (!body.content || typeof body.content !== 'string') {
      // Return fallback analysis for empty content
      return NextResponse.json({
        success: true,
        data: {
          id: `analysis-${Date.now()}`,
          timestamp: new Date().toISOString(),
          url: body.url || 'N/A',
          trustScore: 50,
          confidence_label: 'No Analysis',
          claims: [{
            id: 1,
            text: 'No content provided for analysis',
            status: 'unverified',
            confidence: 0,
            sources: [],
            reasoning: 'Empty content cannot be analyzed'
          }],
          flags: [{
            type: 'warning',
            category: 'No Content',
            description: 'No content available for analysis',
            details: 'Please provide content to analyze.'
          }],
          reasoning: {
            steps: [],
            summary: 'No content was provided for analysis.',
            methodology: 'N/A'
          },
          metadata: {
            contentType: 'unknown',
            wordCount: 0,
            imageCount: 0,
            analysisTime: 0
          }
        }
      })
    }

    // Extract input parameters
    const { content, url, images, contentType, title } = body

    // Perform real heuristic analysis
    const result = await analyzeContent({
      content,
      url,
      title,
      images,
      contentType,
    })

    // Always return success with data
    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('Analysis error:', error)
    
    // Return fallback analysis even on error
    return NextResponse.json({
      success: true,
      data: {
        id: `analysis-error-${Date.now()}`,
        timestamp: new Date().toISOString(),
        url: 'N/A',
        trustScore: 50,
        confidence_label: 'Analysis Error',
        claims: [{
          id: 1,
          text: 'Analysis encountered an error',
          status: 'unverified',
          confidence: 0,
          sources: [],
          reasoning: 'System error during processing'
        }],
        flags: [{
          type: 'critical',
          category: 'System Error',
          description: 'Analysis system encountered an error',
          details: error instanceof Error ? error.message : 'Unknown error'
        }],
        reasoning: {
          steps: [],
          summary: 'Analysis could not be completed due to a system error.',
          methodology: 'Error fallback'
        },
        metadata: {
          contentType: 'unknown',
          wordCount: 0,
          imageCount: 0,
          analysisTime: 0
        }
      }
    })
  }
}

/**
 * GET /api/analyze
 * 
 * Returns API status and documentation
 */
export async function GET() {
  return NextResponse.json({
    status: 'active',
    version: '1.0.0',
    description: 'Illusion Breaker Analysis API',
    endpoints: {
      POST: {
        description: 'Submit content for misinformation analysis',
        parameters: {
          content: 'string (required) - Text content to analyze',
          url: 'string (optional) - Source URL',
          images: 'string[] (optional) - Array of image URLs',
          contentType: 'string (optional) - Content type hint (news-article, social-media, default)',
        },
        example: {
          content: 'Article text here...',
          url: 'https://example.com/article',
          contentType: 'news-article',
        },
      },
    },
    note: 'This API uses real heuristic analysis. No external APIs or AI services are required.',
  })
}
