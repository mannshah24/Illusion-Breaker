// Popup script - Handles user interactions in the extension popup

const API_URL = 'http://localhost:3000/api/analyze'
const DASHBOARD_URL = 'http://localhost:3000/dashboard'

// Get DOM elements
const inspectButton = document.getElementById('inspectButton')
const dashboardButton = document.getElementById('dashboardButton')
const statusMessage = document.getElementById('statusMessage')
const loadingState = document.getElementById('loadingState')
const actionButtons = document.getElementById('actionButtons')

// Event listeners
inspectButton.addEventListener('click', handleInspect)
dashboardButton.addEventListener('click', openDashboard)

/**
 * Handle "Break Illusion" button click
 */
async function handleInspect() {
  try {
    showLoading()

    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    // Check if we're on a valid page
    if (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) {
      throw new Error('Cannot analyze Chrome system pages. Please navigate to a regular webpage.')
    }

    // Send message to content script to extract page content
    const response = await chrome.tabs.sendMessage(tab.id, {
      action: 'extractContent',
    }).catch(err => {
      throw new Error('Content script not ready. Please refresh the page and try again.')
    })

    if (!response || !response.success) {
      throw new Error(response?.error || 'Failed to extract content')
    }

    // Prepare payload for dashboard
    const payload = {
      url: response.data.url,
      title: response.data.title,
      content: response.data.content,
      contentType: response.data.contentType,
      timestamp: new Date().toISOString()
    }

    // Encode payload for URL
    const encodedPayload = encodeURIComponent(JSON.stringify(payload))

    // Show success message
    showStatus('Redirecting to dashboard...', 'success')

    // Open dashboard with payload
    const dashboardUrlWithPayload = `${DASHBOARD_URL}?payload=${encodedPayload}`
    chrome.tabs.create({ url: dashboardUrlWithPayload })

  } catch (error) {
    console.error('Inspection error:', error)
    showStatus(`Error: ${error.message}`, 'error')
  } finally {
    hideLoading()
  }
}

/**
 * Open dashboard in a new tab
 */
function openDashboard() {
  chrome.tabs.create({ url: DASHBOARD_URL })
}

/**
 * Show status message
 */
function showStatus(message, type = 'info') {
  statusMessage.textContent = message
  statusMessage.className = `status status-${type}`
  statusMessage.classList.remove('hidden')
}

/**
 * Show loading state
 */
function showLoading() {
  loadingState.classList.remove('hidden')
  actionButtons.classList.add('hidden')
  statusMessage.classList.add('hidden')
}

/**
 * Hide loading state
 */
function hideLoading() {
  loadingState.classList.add('hidden')
  actionButtons.classList.remove('hidden')
}

// Check if running in development environment
fetch('http://localhost:3000/api/analyze')
  .then((response) => response.json())
  .then(() => {
    // API is available
    showStatus('Connected to Illusion Breaker API', 'info')
    setTimeout(() => {
      statusMessage.classList.add('hidden')
    }, 2000)
  })
  .catch(() => {
    // API is not available
    showStatus('Warning: Backend API not running. Start dev server first.', 'error')
    inspectButton.disabled = true
  })
