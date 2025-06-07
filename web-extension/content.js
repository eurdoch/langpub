// Content script for LangPub extension
console.log('LangPub content script loaded');

// Extension state
let extensionEnabled = true;

// Check extension state on load
chrome.storage.local.get(['extensionEnabled'], function(result) {
  extensionEnabled = result.extensionEnabled !== false; // Default to enabled
  console.log('Extension state loaded:', extensionEnabled ? 'enabled' : 'disabled');
});

// Helper function to safely send messages to background script
function safeSendMessage(message, callback) {
  try {
    chrome.runtime.sendMessage(message, (response) => {
      // Check if the extension context is invalidated
      if (chrome.runtime.lastError) {
        console.log('Extension context invalidated, ignoring message:', chrome.runtime.lastError.message);
        if (callback) callback(null);
        return;
      }
      if (callback) callback(response);
    });
  } catch (error) {
    console.log('Extension context invalidated, cannot send message:', error.message);
    if (callback) callback(null);
  }
}

// Add text selection listener on mouseup only
document.addEventListener('mouseup', function(e) {
  // Check if extension is enabled
  if (!extensionEnabled) {
    return;
  }
  
  const selectedText = window.getSelection().toString().trim();
  
  if (selectedText.length > 0) {
    console.log('Selected text:', selectedText);
    
    // Send message to background script to handle translation
    safeSendMessage({
      action: 'translate',
      text: selectedText
    }, (response) => {
      if (response && response.translation) {
        console.log('Translation:', response.translation);
        showTranslationModal(selectedText, response.translation.translated_text);
      } else if (response && response.error) {
        console.error('Translation error:', response.error);
        if (response.error === 'Extension is disabled') {
          // Extension was disabled, update local state
          extensionEnabled = false;
          return;
        }
        showTranslationModal(selectedText, 'Translation failed');
      } else if (response === null) {
        // Extension context invalidated, show fallback
        showTranslationModal(selectedText, 'Extension reloaded - please try again');
      }
    });
  }
});

// Function to show translation modal
function showTranslationModal(originalText, translatedText) {
  // Store original text for explanations
  currentOriginalText = originalText;
  // Remove existing modal if present
  const existingModal = document.getElementById('langpub-translation-modal');
  if (existingModal) {
    existingModal.remove();
  }
  
  // Create modal container
  const modal = document.createElement('div');
  modal.id = 'langpub-translation-modal';
  modal.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    max-width: 300px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    font-family: Arial, sans-serif;
    font-size: 14px;
    padding: 16px;
    animation: slideIn 0.3s ease-out;
  `;
  
  // Add animation keyframes
  if (!document.getElementById('langpub-modal-styles')) {
    const style = document.createElement('style');
    style.id = 'langpub-modal-styles';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Create clickable words from original text
  const words = originalText.split(/(\s+)/).map((word, index) => {
    if (word.trim().length > 0) {
      return `<span class="langpub-clickable-word" data-word="${word.trim()}" style="
        cursor: pointer;
        text-decoration: underline;
        color: #4CAF50;
      " onmouseover="this.style.background='#e0e0e0'" onmouseout="this.style.background=''">${word}</span>`;
    }
    return word;
  }).join('');

  // Create modal content
  modal.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
      <div style="font-weight: bold; color: #4CAF50;">LangPub Translation</div>
      <button id="langpub-close-modal" style="
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #666;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">×</button>
    </div>
    <div style="margin-bottom: 8px;">
      <div style="background: #e8f5e8; padding: 12px; border-radius: 4px; font-size: 14px;">${translatedText}</div>
    </div>
    <div style="margin-bottom: 8px;">
      <div style="background: #f5f5f5; padding: 8px; border-radius: 4px; font-size: 12px; color: #666;">${words}</div>
    </div>
    <div id="langpub-word-translation" style="display: none; background: #fff3cd; padding: 8px; border-radius: 4px; font-size: 12px; border: 1px solid #ffeaa7;">
      <div style="font-weight: bold; margin-bottom: 4px;">Word Translation:</div>
      <div id="langpub-word-result"></div>
      <div style="margin-top: 8px;">
        <button id="langpub-explain-word" style="
          background: #4CAF50;
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 11px;
        ">Explain Word</button>
      </div>
    </div>
  `;
  
  // Add modal to page
  document.body.appendChild(modal);
  
  // Add close button functionality
  document.getElementById('langpub-close-modal').addEventListener('click', function() {
    modal.remove();
  });
  
  // Add click handlers for words
  modal.addEventListener('click', function(e) {
    if (e.target.classList.contains('langpub-clickable-word')) {
      const word = e.target.dataset.word;
      translateWord(word);
    }
  });
  
}

// Store current word for explanation
let currentWord = '';
let currentOriginalText = '';

// Function to translate individual words
async function translateWord(word) {
  const wordTranslationDiv = document.getElementById('langpub-word-translation');
  const wordResultDiv = document.getElementById('langpub-word-result');
  const explainButton = document.getElementById('langpub-explain-word');
  
  if (!wordTranslationDiv || !wordResultDiv) return;
  
  // Store current word for explanation
  currentWord = word;
  
  // Show loading state
  wordTranslationDiv.style.display = 'block';
  wordResultDiv.innerHTML = 'Translating...';
  
  // Add click handler for explain button
  if (explainButton) {
    explainButton.onclick = () => explainWord(currentWord, currentOriginalText);
  }
  
  // Send message to background script to translate the word
  safeSendMessage({
    action: 'translate',
    text: word
  }, (response) => {
    if (response && response.translation) {
      wordResultDiv.innerHTML = `<strong>${word}</strong> → ${response.translation.translated_text}`;
    } else if (response && response.error) {
      wordResultDiv.innerHTML = `Translation failed: ${response.error}`;
    } else if (response === null) {
      wordResultDiv.innerHTML = 'Extension reloaded - please try again';
    }
  });
}

// Function to explain word and start chat
async function explainWord(word, sentence) {
  const wordResultDiv = document.getElementById('langpub-word-result');
  
  if (!wordResultDiv) return;
  
  // Show loading state
  wordResultDiv.innerHTML = 'Getting explanation...';
  
  // Send message to background script to explain the word
  safeSendMessage({
    action: 'explain',
    word: word,
    sentence: sentence
  }, (response) => {
    if (response && response.explanation) {
      showChatInterface(word, response.explanation);
    } else if (response && response.error) {
      wordResultDiv.innerHTML = `Explanation failed: ${response.error}`;
    } else if (response === null) {
      wordResultDiv.innerHTML = 'Extension reloaded - please try again';
    }
  });
}

// Function to show chat interface
function showChatInterface(word, explanation) {
  const wordTranslationDiv = document.getElementById('langpub-word-translation');
  
  if (!wordTranslationDiv) return;
  
  // Create chat interface
  wordTranslationDiv.innerHTML = `
    <div style="font-weight: bold; margin-bottom: 8px; color: #4CAF50;">Chat about "${word}"</div>
    <div id="langpub-chat-messages" style="
      max-height: 200px;
      overflow-y: auto;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 8px;
      margin-bottom: 8px;
      background: white;
    ">
      <div style="margin-bottom: 8px; padding: 8px; background: #f0f8ff; border-radius: 4px;">
        <strong>Assistant:</strong> ${explanation}
      </div>
    </div>
    <div style="display: flex; gap: 4px;">
      <input id="langpub-chat-input" type="text" placeholder="Ask about this word..." style="
        flex: 1;
        padding: 6px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 12px;
      ">
      <button id="langpub-chat-send" style="
        background: #4CAF50;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
      ">Send</button>
    </div>
  `;
  
  // Initialize chat
  initializeChat(word, explanation);
}

// Chat functionality
let chatMessages = [];

function initializeChat(word, explanation) {
  const chatInput = document.getElementById('langpub-chat-input');
  const chatSend = document.getElementById('langpub-chat-send');
  const chatMessagesDiv = document.getElementById('langpub-chat-messages');
  
  // Initialize conversation with explanation
  chatMessages = [
    { role: 'user', content: `Explain the word "${word}" in context.` },
    { role: 'assistant', content: explanation }
  ];
  
  // Send message function
  function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat('user', message);
    chatInput.value = '';
    
    // Add to conversation history
    chatMessages.push({ role: 'user', content: message });
    
    // Show loading
    addMessageToChat('assistant', 'Thinking...');
    
    // Send to API
    safeSendMessage({
      action: 'chat',
      messages: chatMessages
    }, (response) => {
      // Remove loading message
      const lastMessage = chatMessagesDiv.lastElementChild;
      if (lastMessage) lastMessage.remove();
      
      if (response && response.response) {
        addMessageToChat('assistant', response.response);
        chatMessages.push({ role: 'assistant', content: response.response });
      } else if (response === null) {
        addMessageToChat('assistant', 'Extension reloaded - please try again.');
      } else {
        addMessageToChat('assistant', 'Sorry, I could not process your message.');
      }
    });
  }
  
  // Add message to chat display
  function addMessageToChat(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
      margin-bottom: 8px;
      padding: 8px;
      border-radius: 4px;
      background: ${role === 'user' ? '#e8f5e8' : '#f0f8ff'};
    `;
    messageDiv.innerHTML = `<strong>${role === 'user' ? 'You' : 'Assistant'}:</strong> ${content}`;
    chatMessagesDiv.appendChild(messageDiv);
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
  }
  
  // Event listeners
  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Focus input
  chatInput.focus();
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'activate_reader') {
    console.log('Activating language reader');
    // TODO: Implement language learning functionality
    activateLanguageReader();
  }
  
  // Handle extension toggle messages
  if (request.action === 'extension_toggled') {
    extensionEnabled = request.enabled;
    console.log('Extension state updated:', extensionEnabled ? 'enabled' : 'disabled');
    
    // Close any open translation modals when disabled
    if (!extensionEnabled) {
      const existingModal = document.getElementById('langpub-translation-modal');
      if (existingModal) {
        existingModal.remove();
      }
    }
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