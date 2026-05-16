const catalogueBooks = [
  {
    id: 'book-01',
    title: 'The Midnight Library',
    genre: 'Fiction',
    price: 14.99,
    rating: 4.7,
    newRelease: true,
    coverLabel: 'ML',
    author: 'Matt Haig'
  },
  {
    id: 'book-02',
    title: 'Project Hail Mary',
    genre: 'Science Fiction',
    price: 18.50,
    rating: 4.8,
    newRelease: true,
    coverLabel: 'PH',
    author: 'Andy Weir'
  },
  {
    id: 'book-03',
    title: 'The Seven Husbands of Evelyn Hugo',
    genre: 'Fiction',
    price: 16.20,
    rating: 4.6,
    newRelease: false,
    coverLabel: 'EH',
    author: 'Taylor Jenkins Reid'
  },
  {
    id: 'book-04',
    title: 'Educated',
    genre: 'Non-Fiction',
    price: 13.30,
    rating: 4.5,
    newRelease: false,
    coverLabel: 'ED',
    author: 'Tara Westover'
  },
  {
    id: 'book-05',
    title: 'Atomic Habits',
    genre: 'Self-Help',
    price: 17.00,
    rating: 4.9,
    newRelease: true,
    coverLabel: 'AH',
    author: 'James Clear'
  },
  {
    id: 'book-06',
    title: 'The Silent Patient',
    genre: 'Mystery & Thriller',
    price: 15.75,
    rating: 4.4,
    newRelease: false,
    coverLabel: 'SP',
    author: 'Alex Michaelides'
  },
  {
    id: 'book-07',
    title: 'The Hobbit',
    genre: 'Fantasy',
    price: 12.99,
    rating: 4.8,
    newRelease: false,
    coverLabel: 'TH',
    author: 'J.R.R. Tolkien'
  },
  {
    id: 'book-08',
    title: 'Dune',
    genre: 'Science Fiction',
    price: 19.40,
    rating: 4.7,
    newRelease: false,
    coverLabel: 'DU',
    author: 'Frank Herbert'
  },
  {
    id: 'book-09',
    title: 'Becoming',
    genre: 'Biography',
    price: 16.80,
    rating: 4.7,
    newRelease: false,
    coverLabel: 'BC',
    author: 'Michelle Obama'
  },
  {
    id: 'book-10',
    title: 'The Night Circus',
    genre: 'Fantasy',
    price: 15.10,
    rating: 4.5,
    newRelease: false,
    coverLabel: 'NC',
    author: 'Erin Morgenstern'
  },
  {
    id: 'book-11',
    title: 'The Road',
    genre: 'Fiction',
    price: 13.60,
    rating: 4.1,
    newRelease: false,
    coverLabel: 'RD',
    author: 'Cormac McCarthy'
  },
  {
    id: 'book-12',
    title: 'The Four Agreements',
    genre: 'Self-Help',
    price: 14.20,
    rating: 4.4,
    newRelease: false,
    coverLabel: 'FA',
    author: 'Don Miguel Ruiz'
  }
];

let selectedGenres = new Set();
let filteredSearchTerm = '';

const queryGenres = parseUrlGenres();

function genreSlugToName(slug) {
  const genreMap = {
    'fiction': 'Fiction',
    'mystery': 'Mystery & Thriller',
    'scifi': 'Science Fiction',
    'fantasy': 'Fantasy',
    'romance': 'Romance',
    'nonfiction': 'Non-Fiction',
    'biography': 'Biography',
    'history': 'History',
    'selfhelp': 'Self-Help',
    'children': 'Children\'s Books',
    'horror': 'Horror',
    'poetry': 'Poetry'
  };
  return genreMap[slug.toLowerCase()] || slug;
}

function parseUrlGenres() {
  const params = new URLSearchParams(window.location.search);
  const genreParam = params.get('genre');
  if (!genreParam) return [];
  return genreParam.split(',').map(slug => genreSlugToName(slug.trim())).filter(Boolean);
}

function getCurrentUser() {
  let currentUser = sessionStorage.getItem('bookendCurrentUser');
  if (!currentUser) {
    currentUser = localStorage.getItem('bookendCurrentUser');
  }
  return currentUser ? JSON.parse(currentUser) : null;
}

function goHome() {
  window.location.href = '../landing.html';
}

function openLogin() {
  window.location.href = '../accounts log/sign/log_in.html';
}

function openRegister() {
  window.location.href = '../accounts log/sign/register.html';
}

function openProfile() {
  const user = getCurrentUser();
  if (user) {
    alert(`Logged in as ${user.firstName} ${user.lastName} (${user.role})`);
  } else {
    window.location.href = '../accounts log/sign/log_in.html';
  }
}

function toggleGenreMenu() {
  const genreMenu = document.getElementById('genreMenu');
  genreMenu.classList.toggle('active');
}

function toggleAuthMenu() {
  const authMenu = document.getElementById('authMenu');
  authMenu.classList.toggle('active');
}

function closeMenusOnClickOutside() {
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
}

function renderNavAuth() {
  const navAuth = document.getElementById('navAuth');
  const user = getCurrentUser();
  const authDropdown = document.querySelector('.auth-dropdown');
  if (!navAuth) return;

  if (user) {
    const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    navAuth.innerHTML = `<button class="profile-btn" onclick="openProfile()">${initials}</button>`;
    if (authDropdown) {
      authDropdown.style.display = 'none';
    }
  } else {
    navAuth.innerHTML = `
      <button class="btn-login" onclick="openLogin()">Log In</button>
      <button class="btn-register" onclick="openRegister()">Register</button>
    `;
    if (authDropdown) {
      authDropdown.style.display = '';
    }
  }
}

function getGenres() {
  return [
    'Fiction',
    'Mystery & Thriller',
    'Science Fiction',
    'Fantasy',
    'Romance',
    'Non-Fiction',
    'Biography',
    'History',
    'Self-Help',
    'Children\'s Books',
    'Horror',
    'Poetry'
  ];
}

function renderGenreButtons() {
  const container = document.getElementById('genreButtons');
  container.innerHTML = '';
  getGenres().forEach(genre => {
    const button = document.createElement('button');
    button.className = 'filter-button';
    button.innerText = genre;
    button.onclick = () => toggleGenreFilter(genre);
    if (selectedGenres.has(genre)) {
      button.classList.add('active');
    }
    container.appendChild(button);
  });
}

function toggleGenreFilter(genre) {
  if (selectedGenres.has(genre)) {
    selectedGenres.delete(genre);
  } else {
    selectedGenres.add(genre);
  }
  filteredSearchTerm = '';
  document.getElementById('searchInput').value = '';
  renderGenreButtons();
  updateCatalogueDisplay();
}

function clearFilters() {
  selectedGenres.clear();
  filteredSearchTerm = '';
  document.getElementById('searchInput').value = '';
  renderGenreButtons();
  updateCatalogueDisplay();
}

function setFilterActions() {
  const actions = document.getElementById('filterActions');
  actions.innerHTML = '';
  if (selectedGenres.size > 0) {
    const clearButton = document.createElement('button');
    clearButton.className = 'clear-filters';
    clearButton.innerText = 'Clear Filters';
    clearButton.onclick = clearFilters;
    actions.appendChild(clearButton);
  }
}

function renderNewReleases() {
  const container = document.getElementById('newReleasesRow');
  const newBooks = catalogueBooks.filter(book => book.newRelease);
  container.innerHTML = '';
  if (!newBooks.length) {
    container.innerHTML = '<div class="no-results">No new releases are available at the moment.</div>';
    return;
  }
  newBooks.forEach(book => container.appendChild(createBookCard(book)));
}

function renderExploreAll() {
  const container = document.getElementById('catalogueGrid');
  const sortedBooks = [...catalogueBooks].sort((a, b) => a.title.localeCompare(b.title));
  container.innerHTML = '';
  if (filteredSearchTerm) {
    const matches = sortedBooks.filter(book => matchesSearch(book, filteredSearchTerm));
    if (!matches.length) {
      container.innerHTML = `<div class="no-results">No books found matching "${filteredSearchTerm}".</div>`;
      return;
    }
    matches.forEach(book => container.appendChild(createBookCard(book)));
    return;
  }
  sortedBooks.forEach(book => container.appendChild(createBookCard(book)));
}

function renderGenreRows() {
  const section = document.getElementById('genreRows');
  section.innerHTML = '';
  const genres = Array.from(selectedGenres);
  genres.forEach(genre => {
    const genreBooks = catalogueBooks
      .filter(book => book.genre === genre)
      .sort((a, b) => a.title.localeCompare(b.title));

    if (!genreBooks.length) return;

    const rowBlock = document.createElement('div');
    rowBlock.className = 'section-block';
    rowBlock.innerHTML = `
      <div class="genre-row-group">
        <div class="section-header">
          <div>
            <p class="eyebrow">${genre}</p>
            <h2>${genre} books</h2>
          </div>
          <p class="section-copy">Showing ${genreBooks.length} ${genreBooks.length === 1 ? 'book' : 'books'}.</p>
        </div>
        <div class="genre-row"></div>
      </div>
    `;

    const rowContainer = rowBlock.querySelector('.genre-row');
    genreBooks.forEach(book => rowContainer.appendChild(createBookCard(book)));
    section.appendChild(rowBlock);
  });
}

function updateCatalogueDisplay() {
  const exploreSection = document.getElementById('exploreSection');
  const genreRowsSection = document.getElementById('genreRowsSection');
  renderNewReleases();
  setFilterActions();

  if (selectedGenres.size > 0) {
    exploreSection.classList.add('hidden');
    genreRowsSection.classList.remove('hidden');
    renderGenreRows();
  } else {
    exploreSection.classList.remove('hidden');
    genreRowsSection.classList.add('hidden');
    renderExploreAll();
  }
}

function matchesSearch(book, query) {
  return [book.title, book.author, book.genre]
    .some(value => value.toLowerCase().includes(query.toLowerCase()));
}

function searchCatalogue() {
  const query = document.getElementById('searchInput').value.trim();
  filteredSearchTerm = query;
  selectedGenres.clear();
  renderGenreButtons();
  updateCatalogueDisplay();
}

function createBookCard(book) {
  const card = document.createElement('article');
  card.className = 'book-card';
  card.onclick = () => viewBookDetails(book.id);
  card.innerHTML = `
    <div class="book-cover">${book.coverLabel}</div>
    <div class="book-card-body">
      <div class="book-meta">
        <span class="book-genre">${book.genre}</span>
        <span class="book-price">$${book.price.toFixed(2)}</span>
      </div>
      <h3 class="book-title">${book.title}</h3>
      <div class="book-meta">
        <span>${book.author}</span>
        <span class="rating">${renderRating(book.rating)}</span>
      </div>
    </div>
  `;
  return card;
}

function renderRating(value) {
  const fullStars = Math.floor(value);
  const emptyStars = 5 - fullStars;
  let stars = '';
  for (let i = 0; i < fullStars; i++) stars += '★';
  for (let i = 0; i < emptyStars; i++) stars += '☆';
  return `${stars}`;
}

function viewBookDetails(bookId) {
  alert('Book detail page coming soon for ' + bookId + '.');
}

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

function applyQueryGenreSelection() {
  if (!queryGenres.length) return;
  queryGenres.forEach(genre => selectedGenres.add(genre));
}

function setupPage() {
  renderNavAuth();
  renderGenreButtons();
  applyQueryGenreSelection();
  updateCatalogueDisplay();
  closeMenusOnClickOutside();
  setupScrollEffect();

  document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      searchCatalogue();
    }
  });
}

function selectGenreFromDropdown(genreName) {
  selectedGenres.clear();
  selectedGenres.add(genreName);
  renderGenreButtons();
  updateCatalogueDisplay();
  document.getElementById('genreMenu').classList.remove('active');
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

window.addEventListener('DOMContentLoaded', setupPage);
