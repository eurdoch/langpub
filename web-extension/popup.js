document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.getElementById('login');
  const usernameInput = document.getElementById('username');
  const loginView = document.getElementById('login-view');
  const languageView = document.getElementById('language-view');
  const languageSelect = document.getElementById('language');
  
  loginButton.addEventListener('click', function() {
    const username = usernameInput.value;
    
    console.log('Login attempt:', { username });
    
    // Hide login view and show language selection
    loginView.classList.add('hidden');
    languageView.classList.remove('hidden');
  });
  
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
});