document.addEventListener('DOMContentLoaded', function() {
  const activateButton = document.getElementById('activate');
  
  activateButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'activate_reader'
      });
    });
  });
});