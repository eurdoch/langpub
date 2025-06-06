// Content script for LangPub extension
console.log('LangPub content script loaded');

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'activate_reader') {
    console.log('Activating language reader');
    // TODO: Implement language learning functionality
    activateLanguageReader();
  }
});

function activateLanguageReader() {
  // Create a visual indicator that the extension is active
  const indicator = document.createElement('div');
  indicator.id = 'langpub-indicator';
  indicator.textContent = 'LangPub Active';
  indicator.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: #4CAF50;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    z-index: 10000;
    font-family: Arial, sans-serif;
    font-size: 12px;
  `;
  
  // Remove existing indicator if present
  const existing = document.getElementById('langpub-indicator');
  if (existing) {
    existing.remove();
  }
  
  document.body.appendChild(indicator);
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    indicator.remove();
  }, 3000);
}