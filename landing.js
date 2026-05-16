// Sample books data for the carousel
const books = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    description: "A dazzling novel about discovering the endless possibilities in life.",
    icon: "📖"
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    description: "A thrilling science fiction adventure across the solar system.",
    icon: "🚀"
  },
  {
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    description: "A captivating tale of Old Hollywood glamour and secrets.",
    icon: "✨"
  },
  {
    title: "Educated",
    author: "Tara Westover",
    description: "An extraordinary true story of education, family, and self-discovery.",
    icon: "🎓"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    description: "Transform your life with tiny changes that deliver remarkable results.",
    icon: "⚛️"
  }
];

let currentSlide = 0;

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', function() {
  initCarousel();
  setupAutoSlide();
  setupScrollEffect();
  renderNavAuth();
  updateGenreDropdownVisibility();
  window.addEventListener('resize', updateGenreDropdownVisibility);
});

// Initialize carousel UI
function initCarousel() {
  const carouselContainer = document.getElementById('carouselContainer');
  const dotsContainer = document.getElementById('dotsContainer');

  // Clear existing content
  carouselContainer.innerHTML = '';
  dotsContainer.innerHTML = '';

  // Create book slides
  books.forEach((book, index) => {
    const slide = document.createElement('div');
    slide.className = 'book-slide';
    slide.innerHTML = `
      <div class="book-content">
        <div class="book-icon">${book.icon}</div>
        <div class="book-title">${book.title}</div>
        <div class="book-author">by ${book.author}</div>
        <div class="book-description">${book.description}</div>
      </div>
    `;
    carouselContainer.appendChild(slide);
  });

  // Create navigation dots
  books.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.onclick = () => goToSlide(index);
    dotsContainer.appendChild(dot);
  });

  updateCarousel();
}

// Update carousel position and dots
function updateCarousel() {
  const carouselContainer = document.getElementById('carouselContainer');
  const dots = document.querySelectorAll('.dot');

  // Update carousel position
  carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update dots
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

// Navigate to specific slide
function goToSlide(index) {
  currentSlide = index;
  updateCarousel();
  resetAutoSlide();
}

// Next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % books.length;
  updateCarousel();
  resetAutoSlide();
}

// Previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + books.length) % books.length;
  updateCarousel();
  resetAutoSlide();
}

// Auto-slide functionality
let autoSlideInterval;

function setupAutoSlide() {
  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, 5000); // Change slide every 5 seconds
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  setupAutoSlide();
}

// Scroll effect for navbar transparency
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

// Search functionality
function searchBooks() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  
  if (!searchInput.trim()) {
    alert('Please enter a search term');
    return;
  }

  // Search through books
  const results = books.filter(book => 
    book.title.toLowerCase().includes(searchInput) ||
    book.author.toLowerCase().includes(searchInput)
  );

  if (results.length > 0) {
    alert(`Found ${results.length} book(s):\n\n${results.map(b => `${b.title} by ${b.author}`).join('\n')}`);
  } else {
    alert('No books found matching your search. Try searching by title or author!');
  }
}

// Allow Enter key to trigger search
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      searchBooks();
    }
  });

  // Close genre menu when clicking outside
  document.addEventListener('click', function(event) {
    const genreMenu = document.getElementById('genreMenu');
    const authMenu = document.getElementById('authMenu');

    if (!event.target.closest('.genre-dropdown')) {
      genreMenu.classList.remove('active');
    }

    if (!event.target.closest('.auth-dropdown')) {
      authMenu.classList.remove('active');
    }
  });
});

// Genre Menu functionality
function toggleGenreMenu() {
  const genreMenu = document.getElementById('genreMenu');
  genreMenu.classList.toggle('active');
}

function toggleAuthMenu() {
  const authMenu = document.getElementById('authMenu');
  authMenu.classList.toggle('active');
}

// Browse All Books functionality
function browseAllBooks() {
  window.location.href = 'catalogue/catalogue.html';
}

function getCurrentUser() {
  let currentUser = sessionStorage.getItem('bookendCurrentUser');
  if (!currentUser) {
    currentUser = localStorage.getItem('bookendCurrentUser');
  }
  return currentUser ? JSON.parse(currentUser) : null;
}

function renderNavAuth() {
  const authButtons = document.getElementById('authButtons');
  const user = getCurrentUser();
  if (!authButtons) return;

  const authDropdown = document.querySelector('.auth-dropdown');
  if (user) {
    const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    authButtons.innerHTML = `<button class="profile-btn" onclick="openProfile()">${initials}</button>`;
    authButtons.style.display = 'inline-flex'; // Show profile button even on small screens
    if (authDropdown) {
      authDropdown.style.display = 'none';
    }
  } else {
    authButtons.innerHTML = `
      <button class="btn-login" onclick="openLogin()">Log In</button>
      <button class="btn-register" onclick="openRegister()">Register</button>
    `;
    authButtons.style.display = ''; // Let CSS handle display
    if (authDropdown) {
      authDropdown.style.display = ''; // Let CSS handle display
    }
  }
}

function updateGenreDropdownVisibility() {
  const genreDropdown = document.querySelector('.genre-dropdown');
  const nav = document.querySelector('nav');
  const authButtons = document.getElementById('authButtons');
  const browseBtn = document.querySelector('.browse-btn');
  if (!genreDropdown || !nav || !authButtons || !browseBtn) return;

  const availableSpace = nav.clientWidth - authButtons.offsetWidth - browseBtn.offsetWidth - 280;
  if (availableSpace > 0) {
    genreDropdown.style.display = 'inline-flex';
  } else {
    genreDropdown.style.display = 'none';
    document.getElementById('genreMenu').classList.remove('active');
  }
}
// Sign out functionality
function signOut() {
  const confirmed = confirm('Are you sure you want to sign out?');
  if (confirmed) {
    sessionStorage.removeItem('bookendCurrentUser');
    localStorage.removeItem('bookendCurrentUser');
    localStorage.removeItem('bookendRememberUser');
    renderNavAuth();
    alert('You have been signed out.');
  }
}
// Authentication function stubs (will be developed in next steps)
function openLogin() {
  window.location.href = 'accounts log/sign/log_in.html';
}

function openRegister() {
  window.location.href = 'accounts log/sign/register.html';
}

function openProfile() {
  alert('Profile page coming soon!');
}

// Placeholder for future account management
function openAccountManagement() {
  alert('Account management page coming soon!');
  // Future: window.location.href = 'account.html';
}

// Placeholder for future admin panel
function openAdminPanel() {
  alert('Admin panel coming soon!');
  // Future: window.location.href = 'admin.html';
}
