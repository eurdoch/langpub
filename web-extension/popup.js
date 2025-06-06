document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.getElementById('login');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  
  loginButton.addEventListener('click', function() {
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    console.log('Login attempt:', { username, password });
  });
});