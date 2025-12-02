// Product Data Service
const HousingService = {
  housingLocationList: [
    {
      id: 0,
      name: 'AeroFlex Tech Tee',
      brand: 'NikeLab',
      category: 'Performance Tee',
      photo: 'public/img1.webp',
      price: '200 pesos',
      colorway: 'Carbon Heather',
      availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
      waterproof: false,
      sustainable: true,
    },
    {
      id: 1,
      name: 'Coastline Linen Button-Up',
      brand: 'Everlane',
      category: 'Relaxed Shirt',
      photo: 'public/img2.jpg',
      price: '300 pesos',
      colorway: 'Tide Blue',
      availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
      waterproof: false,
      sustainable: true,
    },
    {
      id: 2,
      name: 'Drift Studio Overshirt',
      brand: 'COS',
      category: 'Modern Overshirt',
      photo: 'public/img10.webp',
      price: '450 pesos',
      colorway: 'Concrete Grey',
      availableSizes: ['S', 'M', 'L', 'XL'],
      waterproof: false,
      sustainable: true,
    },
    {
      id: 3,
      name: 'Everyday Organic Crew',
      brand: 'Uniqlo U',
      category: 'Essential Tee',
      photo: 'public/img3.jpg',
      price: '120 pesos',
      colorway: 'Bone White',
      availableSizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL'],
      waterproof: false,
      sustainable: true,
    },
    {
      id: 4,
      name: 'Rose District Silk Shirt',
      brand: 'Aritzia',
      category: 'Silk Button-Up',
      photo: 'public/img4.png',
      price: '130 pesos',
      colorway: 'Blush Bloom',
      availableSizes: ['XS', 'S', 'M', 'L'],
      waterproof: false,
      sustainable: false,
    },
    {
      id: 5,
      name: 'Mariner Popover',
      brand: 'J.Crew',
      category: 'Striped Shirt',
      photo: 'public/img5.webp',
      price: '200 pesos',
      colorway: 'Navy Stripe',
      availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
      waterproof: false,
      sustainable: false,
    },
    {
      id: 6,
      name: 'Daybreak Boxy Tee',
      brand: 'Kotn',
      category: 'Casual Tee',
      photo: 'public/img8.jpg',
      price: '270 pesos',
      colorway: 'Sunrise Coral',
      availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      waterproof: false,
      sustainable: true,
    },
    {
      id: 7,
      name: 'Gallery Camp Collar',
      brand: 'Topman',
      category: 'Camp Shirt',
      photo: 'public/img6.webp',
      price: '300 pesos',
      colorway: 'Art Print',
      availableSizes: ['S', 'M', 'L', 'XL'],
      waterproof: false,
      sustainable: false,
    },
    {
      id: 8,
      name: 'Umbra Pleated Shirt',
      brand: 'Theory',
      category: 'Dress Shirt',
      photo: 'public/img7.jpg',
      price: '90 pesos',
      colorway: 'Shadow Plaid',
      availableSizes: ['14', '15', '16', '17', '18'],
      waterproof: false,
      sustainable: false,
    },
  ],

  getAllHousingLocations() {
    return this.housingLocationList;
  },

  getHousingLocationById(id) {
    return this.housingLocationList.find((location) => location.id === id);
  },
};

// Application State
let filteredLocationList = [];
let currentModalProduct = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname === '/details.html' || window.location.pathname.includes('details.html')) {
    // Details page - handled by separate script
    return;
  }
  
  // Home page
  filteredLocationList = HousingService.getAllHousingLocations();
  renderProducts();
});

// Render products to the page
function renderProducts() {
  const container = document.getElementById('results-container');
  if (!container) return;

  container.innerHTML = filteredLocationList
    .map(
      (product) => `
    <section class="listing">
      <img
        class="listing-photo"
        src="${product.photo}"
        alt="Product photo of ${product.name}"
        crossorigin
      />
      <div class="listing-body">
        <p class="listing-brand">${product.brand}</p>
        <h2 class="listing-heading">${product.name}</h2>
        <p class="listing-meta">
          ${product.category} • ${product.colorway}
        </p>
        <div class="listing-footer">
          <span class="listing-price">${product.price}</span>
          <button class="btn primary" onclick="openPopup(${product.id})">order now</button>
        </div>
      </div>
    </section>
  `
    )
    .join('');
}

// Filter products
function filterResults() {
  const input = document.getElementById('filter-input');
  const text = input ? input.value : '';

  if (!text) {
    filteredLocationList = HousingService.getAllHousingLocations();
  } else {
    const query = text.toLowerCase();
    filteredLocationList = HousingService.getAllHousingLocations().filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.colorway.toLowerCase().includes(query)
    );
  }

  renderProducts();
}

// Scroll to listings section
function scrollToListings() {
  const section = document.getElementById('listings');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Open popup modal
function openPopup(productId) {
  const product = HousingService.getHousingLocationById(productId);
  if (!product) return;

  currentModalProduct = product;
  const modalContainer = document.getElementById('modal-container');
  
  if (!modalContainer) return;

  const sizesList = product.availableSizes.map(size => 
    `<span class="size-badge">${size}</span>`
  ).join('');

  const features = [
    product.sustainable ? '<span class="feature-badge sustainable">Sustainable</span>' : '',
    product.waterproof ? '<span class="feature-badge waterproof">Waterproof</span>' : ''
  ].filter(Boolean).join('');

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="closePopup()">
      <div class="modal-content" onclick="event.stopPropagation()">
        <button class="modal-close" onclick="closePopup()">&times;</button>
        <div class="modal-body">
          <img
            class="modal-photo"
            src="${product.photo}"
            alt="Product photo of ${product.name}"
            crossorigin
          />
          <div class="modal-info">
            <p class="modal-brand">${product.brand}</p>
            <h2 class="modal-heading">${product.name}</h2>
            <p class="modal-category">${product.category}</p>
            <p class="modal-colorway">Color: ${product.colorway}</p>
            <p class="modal-price">${product.price}</p>
            <div class="modal-sizes">
              <p class="sizes-label">Available Sizes:</p>
              <div class="sizes-list">
                ${sizesList}
              </div>
            </div>
            <div class="modal-features">
              ${features}
            </div>
            <button class="btn primary modal-order-btn" onclick="closePopup()">Confirm Order</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.style.overflow = 'hidden';
}

// Close popup modal
function closePopup() {
  const modalContainer = document.getElementById('modal-container');
  if (modalContainer) {
    modalContainer.innerHTML = '';
  }
  document.body.style.overflow = '';
  currentModalProduct = null;
}

// Load product details page
function loadProductDetails() {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get('id'), 10);
  
  if (isNaN(id)) {
    // No ID found, redirect to home
    window.location.href = 'index.html';
    return;
  }

  const product = HousingService.getHousingLocationById(id);
  
  if (!product) {
    // Product not found, redirect to home
    window.location.href = 'index.html';
    return;
  }

  const container = document.getElementById('details-container');
  if (!container) return;

  const sizesText = product.availableSizes.join(', ');

  container.innerHTML = `
    <nav class="nav">
      <div class="nav-item" onclick="window.location.href='index.html'" style="cursor: pointer;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M12 19L5 12L12 5" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Back to collection</span>
      </div>
    </nav>

    <div class="content-wrapper">
      <div class="content-section">
        <div class="housing-info">
          <span class="brand-chip">${product.brand}</span>
          <h1 class="housing-title">${product.name}</h1>
          <div class="location">
            <span>${product.category}</span>
            <span class="divider-dot"></span>
            <span>${product.colorway}</span>
          </div>
          <p class="price-tag">${product.price}</p>
        </div>

        <div class="about-section">
          <h2 class="about-title">Product highlights</h2>
          <div class="about-details">
            <p><strong>Available sizes:</strong> ${sizesText}</p>
            <p><strong>Waterproof membrane:</strong> ${product.waterproof ? 'Yes' : 'No'}</p>
            <p><strong>Sustainable materials:</strong> ${product.sustainable ? 'Certified' : 'Not listed'}</p>
          </div>
        </div>

        <div class="application-section">
          <h2 class="application-title">Reserve your size</h2>
          <form class="application-form" onsubmit="event.preventDefault(); handleFormSubmit();">
            <div class="form-group">
              <label class="form-label">Full name</label>
              <input type="text" class="form-input" placeholder="Alex Taylor" required>
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" placeholder="you@email.com" required>
            </div>
            <div class="form-group">
              <label class="form-label">Preferred size</label>
              <input type="text" class="form-input" placeholder="Medium" required>
            </div>
            <button type="submit" class="apply-button">Notify me</button>
          </form>
        </div>
      </div>

      <div class="image-section">
        <img 
          src="${product.photo}" 
          alt="Product photo of ${product.name}"
          class="housing-image"
          crossorigin
        />
      </div>
    </div>
  `;
}

// Handle form submission
function handleFormSubmit() {
  alert('Thank you for your interest! We will notify you when this item is available.');
}

