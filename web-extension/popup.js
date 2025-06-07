document.addEventListener('DOMContentLoaded', function() {
  // DOM elements
  const loginView = document.getElementById('login-view');
  const verificationView = document.getElementById('verification-view');
  const languageView = document.getElementById('language-view');
  
  const emailInput = document.getElementById('email');
  const loginButton = document.getElementById('login');
  const loginError = document.getElementById('login-error');
  
  const verificationCodeInput = document.getElementById('verification-code');
  const verifyButton = document.getElementById('verify');
  const backToEmailButton = document.getElementById('back-to-email');
  const verificationError = document.getElementById('verification-error');
  
  const languageSelect = document.getElementById('language');
  const userEmailDisplay = document.getElementById('user-email');
  const logoutButton = document.getElementById('logout');
  
  // API base URL
  const API_BASE_URL = 'https://langpub.directto.link';
  
  let currentEmail = '';
  let userData = null;

  // Check for existing authentication on load
  checkExistingAuth();

  // Event listeners
  loginButton.addEventListener('click', sendVerificationEmail);
  verifyButton.addEventListener('click', verifyCode);
  backToEmailButton.addEventListener('click', backToEmailView);
  logoutButton.addEventListener('click', logout);
  
  languageSelect.addEventListener('change', function() {
    const selectedLanguage = languageSelect.value;
    if (selectedLanguage) {
      console.log('Language selected:', selectedLanguage);
      
      // Save language to local storage
      chrome.storage.local.set({ selectedLanguage: selectedLanguage }, function() {
        console.log('Language saved to storage:', selectedLanguage);
      });
    }
  });

  // Functions
  function checkExistingAuth() {
    chrome.storage.local.get(['langpub_user'], function(result) {
      if (result.langpub_user) {
        try {
          userData = JSON.parse(result.langpub_user);
          showLanguageView();
          console.log('User authenticated from storage:', userData.email);
        } catch (error) {
          console.error('Error parsing stored user data:', error);
          chrome.storage.local.remove(['langpub_user']);
        }
      }
    });
  }

  async function sendVerificationEmail() {
    const email = emailInput.value.trim();
    
    if (!email) {
      showError(loginError, 'Please enter a valid email address');
      return;
    }

    loginButton.disabled = true;
    loginButton.textContent = 'Sending...';
    hideError(loginError);

    try {
      const response = await fetch(`${API_BASE_URL}/verification/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        currentEmail = email;
        showVerificationView();
        console.log('Verification email sent successfully');
      } else {
        throw new Error(data.error || 'Failed to send verification email');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      showError(loginError, 'Failed to send verification email. Please try again.');
    } finally {
      loginButton.disabled = false;
      loginButton.textContent = 'Send Verification Code';
    }
  }

  async function verifyCode() {
    const code = verificationCodeInput.value.trim();
    
    if (!code || code.length !== 6) {
      showError(verificationError, 'Please enter a valid 6-digit code');
      return;
    }

    verifyButton.disabled = true;
    verifyButton.textContent = 'Verifying...';
    hideError(verificationError);

    try {
      const response = await fetch(`${API_BASE_URL}/verification/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: currentEmail, 
          code: code 
        })
      });

      const data = await response.json();

      if (response.ok && data) {
        userData = data;
        
        // Store user data in Chrome storage
        chrome.storage.local.set({ 
          langpub_user: JSON.stringify(userData) 
        }, function() {
          console.log('User data stored successfully');
        });
        
        showLanguageView();
        console.log('User authenticated successfully:', userData.email);
      } else {
        throw new Error(data.error || 'Invalid verification code');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      showError(verificationError, 'Invalid or expired verification code. Please try again.');
    } finally {
      verifyButton.disabled = false;
      verifyButton.textContent = 'Verify Code';
    }
  }

  function backToEmailView() {
    verificationCodeInput.value = '';
    hideError(verificationError);
    showLoginView();
  }

  function logout() {
    userData = null;
    currentEmail = '';
    emailInput.value = '';
    verificationCodeInput.value = '';
    languageSelect.value = '';
    
    // Clear stored data
    chrome.storage.local.remove(['langpub_user'], function() {
      console.log('User data cleared');
    });
    
    showLoginView();
    console.log('User logged out');
  }

  function showLoginView() {
    loginView.classList.remove('hidden');
    verificationView.classList.add('hidden');
    languageView.classList.add('hidden');
  }

  function showVerificationView() {
    loginView.classList.add('hidden');
    verificationView.classList.remove('hidden');
    languageView.classList.add('hidden');
    verificationCodeInput.focus();
  }

  function showLanguageView() {
    loginView.classList.add('hidden');
    verificationView.classList.add('hidden');
    languageView.classList.remove('hidden');
    
    if (userData) {
      userEmailDisplay.textContent = userData.email;
    }
    
    // Load saved language if any
    chrome.storage.local.get(['selectedLanguage'], function(result) {
      if (result.selectedLanguage) {
        languageSelect.value = result.selectedLanguage;
      }
    });
  }

  function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
  }

  function hideError(errorElement) {
    errorElement.classList.add('hidden');
  }
});