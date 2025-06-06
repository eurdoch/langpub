// Background service worker for LangPub extension
console.log('LangPub background service worker loaded');

// Handle extension installation
chrome.runtime.onInstalled.addListener(function(details) {
  console.log('LangPub extension installed:', details.reason);
  
  if (details.reason === 'install') {
    // Set default storage values
    chrome.storage.sync.set({
      langpub_enabled: true,
      target_language: 'en'
    });
  }
});

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('Background received message:', request);
  
  // Handle any background processing here
  if (request.action === 'get_settings') {
    chrome.storage.sync.get(['langpub_enabled', 'target_language'], function(result) {
      sendResponse(result);
    });
    return true; // Keep message channel open for async response
  }
});