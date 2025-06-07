// Content script for LangPub extension
console.log('LangPub content script loaded');

// Add text selection listener on mouseup only
document.addEventListener('mouseup', function(e) {
  const selectedText = window.getSelection().toString().trim();
  
  if (selectedText.length > 0) {
    console.log('Selected text:', selectedText);
    
    // Send message to background script to handle translation
    chrome.runtime.sendMessage({
      action: 'translate',
      text: selectedText
    }, (response) => {
      if (response && response.translation) {
        console.log('Translation:', response.translation);
        showTranslationModal(selectedText, response.translation.translated_text);
      } else if (response && response.error) {
        console.error('Translation error:', response.error);
        showTranslationModal(selectedText, 'Translation failed');
      }
    });
  }
});

// Function to show translation modal
function showTranslationModal(originalText, translatedText) {
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
  
  // Auto-hide after 10 seconds
  setTimeout(() => {
    if (modal.parentNode) {
      modal.remove();
    }
  }, 10000);
}

// Function to translate individual words
async function translateWord(word) {
  const wordTranslationDiv = document.getElementById('langpub-word-translation');
  const wordResultDiv = document.getElementById('langpub-word-result');
  
  if (!wordTranslationDiv || !wordResultDiv) return;
  
  // Show loading state
  wordTranslationDiv.style.display = 'block';
  wordResultDiv.innerHTML = 'Translating...';
  
  // Send message to background script to translate the word
  chrome.runtime.sendMessage({
    action: 'translate',
    text: word
  }, (response) => {
    if (response && response.translation) {
      wordResultDiv.innerHTML = `<strong>${word}</strong> → ${response.translation.translated_text}`;
    } else if (response && response.error) {
      wordResultDiv.innerHTML = `Translation failed: ${response.error}`;
    }
  });
}

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