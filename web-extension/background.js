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
  
  // Handle translation requests
  if (request.action === 'translate') {
    translateText(request.text, sendResponse);
    return true; // Keep message channel open for async response
  }
  
  // Handle explanation requests
  if (request.action === 'explain') {
    explainWord(request.word, request.sentence, sendResponse);
    return true; // Keep message channel open for async response
  }
  
  // Handle chat requests
  if (request.action === 'chat') {
    chatWithAI(request.messages, sendResponse);
    return true; // Keep message channel open for async response
  }
  
  // Handle any background processing here
  if (request.action === 'get_settings') {
    chrome.storage.sync.get(['langpub_enabled', 'target_language'], function(result) {
      sendResponse(result);
    });
    return true; // Keep message channel open for async response
  }
});

// Function to translate text using the API
async function translateText(text, sendResponse) {
  try {
    // Get the selected language from storage
    const result = await chrome.storage.local.get(['selectedLanguage']);
    const targetLanguage = result.selectedLanguage;
    
    if (!targetLanguage) {
      sendResponse({ error: 'No target language selected' });
      return;
    }
    
    // Call the translation API
    const response = await fetch('https://langpub.directto.link/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        language: targetLanguage
      })
    });
    
    if (response.ok) {
      const translation = await response.json();
      sendResponse({ translation: translation });
    } else {
      sendResponse({ error: `Translation failed: ${response.status}` });
    }
  } catch (error) {
    sendResponse({ error: `Translation error: ${error.message}` });
  }
}

// Function to explain word using the API
async function explainWord(word, sentence, sendResponse) {
  try {
    // Get the selected language from storage
    const result = await chrome.storage.local.get(['selectedLanguage']);
    const language = result.selectedLanguage;
    
    if (!language) {
      sendResponse({ error: 'No target language selected' });
      return;
    }
    
    // Call the explanation API
    const response = await fetch('https://langpub.directto.link/explain', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        word: word,
        language: language,
        sentence: sentence
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      sendResponse({ explanation: result.explanation });
    } else {
      sendResponse({ error: `Explanation failed: ${response.status}` });
    }
  } catch (error) {
    sendResponse({ error: `Explanation error: ${error.message}` });
  }
}

// Function to chat with AI using the API
async function chatWithAI(messages, sendResponse) {
  try {
    // Get the selected language from storage
    const result = await chrome.storage.local.get(['selectedLanguage']);
    const language = result.selectedLanguage;
    
    if (!language) {
      sendResponse({ error: 'No target language selected' });
      return;
    }
    
    // Call the chat API
    const response = await fetch('https://langpub.directto.link/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: messages,
        language: language
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      sendResponse({ response: result.response });
    } else {
      sendResponse({ error: `Chat failed: ${response.status}` });
    }
  } catch (error) {
    sendResponse({ error: `Chat error: ${error.message}` });
  }
}