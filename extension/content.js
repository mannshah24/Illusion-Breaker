// Content script - Runs on all web pages
// Extracts page content when requested by the popup

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractContent') {
    try {
      // Extract page content
      const pageData = extractPageContent()
      sendResponse({ success: true, data: pageData })
    } catch (error) {
      console.error('Content extraction error:', error)
      sendResponse({ success: false, error: error.message })
    }
  }
  return true // Keep message channel open for async response
})

/**
 * Extract relevant content from the current page
 */
function extractPageContent() {
  // Get page URL
  const url = window.location.href

  // Extract main text content
  const bodyText = extractMainText()

  // Extract images
  const images = extractImages()

  // Get page metadata
  const title = document.title
  const description = getMetaContent('description')
  
  // Detect content type
  const contentType = detectContentType()

  return {
    url,
    title,
    description,
    content: bodyText,
    images,
    contentType,
    timestamp: new Date().toISOString(),
  }
}

/**
 * Extract main text content from the page
 */
function extractMainText() {
  // Try to find main content containers
  const mainSelectors = [
    'article',
    'main',
    '[role="main"]',
    '.article-content',
    '.post-content',
    '#content',
  ]

  let mainElement = null
  for (const selector of mainSelectors) {
    mainElement = document.querySelector(selector)
    if (mainElement) break
  }

  // Fall back to body if no main content found
  const contentSource = mainElement || document.body

  // Extract text, filtering out script and style elements
  const clone = contentSource.cloneNode(true)
  const scripts = clone.querySelectorAll('script, style, nav, header, footer')
  scripts.forEach((el) => el.remove())

  return clone.textContent
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 8000) // Limit to 8k chars for safe URL encoding
}

/**
 * Extract image URLs from the page
 */
function extractImages() {
  const images = []
  const imgElements = document.querySelectorAll('img')

  imgElements.forEach((img) => {
    const src = img.src || img.dataset.src
    if (src && src.startsWith('http')) {
      images.push({
        url: src,
        alt: img.alt || '',
        width: img.width,
        height: img.height,
      })
    }
  })

  // Limit to first 10 images
  return images.slice(0, 10)
}

/**
 * Get meta tag content
 */
function getMetaContent(name) {
  const meta =
    document.querySelector(`meta[name="${name}"]`) ||
    document.querySelector(`meta[property="og:${name}"]`)
  return meta ? meta.content : ''
}

/**
 * Attempt to detect content type
 */
function detectContentType() {
  const url = window.location.href.toLowerCase()
  const hostname = window.location.hostname.toLowerCase()

  // Social media detection
  if (
    hostname.includes('twitter') ||
    hostname.includes('facebook') ||
    hostname.includes('instagram') ||
    hostname.includes('tiktok')
  ) {
    return 'social-media'
  }

  // News sites detection (basic heuristic)
  if (
    hostname.includes('news') ||
    hostname.includes('times') ||
    hostname.includes('post') ||
    document.querySelector('article')
  ) {
    return 'news-article'
  }

  return 'default'
}

console.log('Illusion Breaker content script loaded')
