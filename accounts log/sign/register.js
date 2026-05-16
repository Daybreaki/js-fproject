// Register Page JavaScript

function handleRegister(event) {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim().toLowerCase();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const termsAccepted = document.getElementById('terms').checked;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    alert('Please fill in all fields');
    return;
  }

  if (!isValidName(firstName)) {
    alert('Please enter a valid first name');
    return;
  }

  if (!isValidLastName(lastName)) {
    alert('Please enter a valid last name');
    return;
  }

  if (!isValidEmail(email)) {
    alert('Please enter a valid email address');
    return;
  }

  if (password.length < 8) {
    alert('Password must be at least 8 characters long');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  if (!termsAccepted) {
    alert('You must agree to the Terms of Service and Privacy Policy');
    return;
  }

  const existingUser = findUserByEmail(email);
  if (existingUser) {
    alert('An account with this email already exists. Please log in or use a different email.');
    return;
  }

  const users = getStoredUsers();
  const newUser = {
    firstName,
    lastName,
    email,
    password,
    role: 'user',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);

  alert('Account created successfully! You can now log in.');
  window.location.href = 'log_in.html';
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

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidName(firstName) {
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  return nameRegex.test(firstName);
}

function isValidLastName(lastName) {
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  return nameRegex.test(lastName);
}

function goHome() {
  window.location.href = '../../landing.html';
}

function searchBooks() {
  alert('Search feature coming soon!');
}

function openLogin() {
  window.location.href = 'log_in.html';
}

function openRegister() {
  alert('You are already on the registration page');
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
  const confirmPasswordInput = document.getElementById('confirmPassword');

  if (confirmPasswordInput && passwordInput) {
    confirmPasswordInput.addEventListener('blur', function() {
      if (passwordInput.value && confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.style.borderColor = '#e74c3c';
      } else {
        confirmPasswordInput.style.borderColor = '#e0e0e0';
      }
    });

    confirmPasswordInput.addEventListener('input', function() {
      if (passwordInput.value && confirmPasswordInput.value && passwordInput.value === confirmPasswordInput.value) {
        confirmPasswordInput.style.borderColor = '#27ae60';
      } else {
        confirmPasswordInput.style.borderColor = '#e0e0e0';
      }
    });

    confirmPasswordInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        document.getElementById('registerForm').submit();
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
