// Log In Page JavaScript

// Form submission handler
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value;
  const remember = document.getElementById('remember').checked;

  if (!email || !password) {
    alert('Please fill in all fields');
    return;
  }

  if (!isValidEmail(email)) {
    alert('Please enter a valid email address');
    return;
  }

  const user = findUserByEmail(email);
  if (!user) {
    alert('No account found with this email. Please register first.');
    return;
  }

  if (user.password !== password) {
    alert('Incorrect password. Please try again.');
    return;
  }

  setCurrentUser({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role
  }, remember);

  alert('Login successful!');
  window.location.href = '../../landing.html';
}

function getStoredUsers() {
  const users = localStorage.getItem('bookendUsers');
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem('bookendUsers', JSON.stringify(users));
}

function findUserByEmail(email) {
  const users = getStoredUsers();
  return users.find(user => user.email === email.toLowerCase());
}

function setCurrentUser(currentUser, remember = false) {
  sessionStorage.setItem('bookendCurrentUser', JSON.stringify(currentUser));
  if (remember) {
    localStorage.setItem('bookendCurrentUser', JSON.stringify(currentUser));
    localStorage.setItem('bookendRememberUser', currentUser.email);
  } else {
    localStorage.removeItem('bookendCurrentUser');
    localStorage.removeItem('bookendRememberUser');
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function goHome() {
  window.location.href = '../../landing.html';
}

function searchBooks() {
  alert('Search feature coming soon!');
}

function openLogin() {
  alert('You are already on the login page');
}

function openRegister() {
  window.location.href = 'register.html';
}

function toggleGenreMenu() {
  const genreMenu = document.getElementById('genreMenu');
  genreMenu.classList.toggle('active');
}

function closeGenreMenuOnClickOutside() {
  document.addEventListener('click', function(event) {
    const genreMenu = document.getElementById('genreMenu');
    if (!event.target.closest('.genre-dropdown')) {
      genreMenu.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  closeGenreMenuOnClickOutside();
  setupScrollEffect();

  const passwordInput = document.getElementById('password');
  if (passwordInput) {
    passwordInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        document.getElementById('loginForm').submit();
      }
    });
  }
});

function setupScrollEffect() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}
