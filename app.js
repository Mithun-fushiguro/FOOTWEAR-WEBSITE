// GEN-Z FOOTWEAR Application Logic

// Products Database
const PRODUCTS = [
  {
    id: 'p1',
    name: 'Urban Flex Slides',
    gender: 'men',
    category: 'Slides',
    price: 899,
    oldPrice: 1199,
    rating: 4.8,
    reviewsCount: 124,
    badge: 'BESTSELLER',
    badgeType: 'bestseller',
    image: 'images/men_slides_black.png',
    description: 'Lightweight everyday slides designed with soft cushioning and a durable anti-slip sole for maximum daily comfort.',
    colors: ['Black', 'Beige', 'Navy'],
    sizes: [6, 7, 8, 9, 10]
  },
  {
    id: 'p2',
    name: 'Cloud Walk Comfort',
    gender: 'women',
    category: 'Slides',
    price: 999,
    oldPrice: 1299,
    rating: 4.7,
    reviewsCount: 98,
    badge: 'NEW',
    badgeType: 'new',
    image: 'images/women_slides_beige.png',
    description: 'Ultra-soft cloud foam slide slippers offering plush arch support and everyday lounge elegance.',
    colors: ['Beige', 'Cream', 'Terracotta'],
    sizes: [5, 6, 7, 8, 9]
  },
  {
    id: 'p3',
    name: 'Classic Ease Flip-Flops',
    gender: 'men',
    category: 'Flip-Flops',
    price: 749,
    oldPrice: 999,
    rating: 4.6,
    reviewsCount: 76,
    badge: '25% OFF',
    badgeType: 'discount',
    image: 'images/hero_slipper.png',
    description: 'Lightweight waterproof flip-flops built with flexible straps and cushioned footbed.',
    colors: ['Navy', 'Black', 'Olive'],
    sizes: [6, 7, 8, 9, 10]
  },
  {
    id: 'p4',
    name: 'Everyday Street Slides',
    gender: 'men',
    category: 'Casual',
    price: 849,
    oldPrice: 1099,
    rating: 4.8,
    reviewsCount: 110,
    badge: 'BESTSELLER',
    badgeType: 'bestseller',
    image: 'images/men_slides_black.png',
    description: 'Stylish urban street slippers tailored for indoor relaxation and quick outdoor errands.',
    colors: ['Black', 'Grey', 'Navy'],
    sizes: [7, 8, 9, 10]
  },
  {
    id: 'p5',
    name: 'CloudStep Everyday',
    gender: 'women',
    category: 'Casual',
    price: 949,
    oldPrice: 1249,
    rating: 4.9,
    reviewsCount: 142,
    badge: 'NEW',
    badgeType: 'new',
    image: 'images/women_slides_beige.png',
    description: 'Modern feminine daily wear slipper featuring impact-absorbing foam and contoured heel cup.',
    colors: ['Terracotta', 'Beige', 'White'],
    sizes: [5, 6, 7, 8]
  },
  {
    id: 'p6',
    name: 'Urban Breeze Slides',
    gender: 'men',
    category: 'Slides',
    price: 899,
    oldPrice: 1149,
    rating: 4.7,
    reviewsCount: 88,
    badge: '',
    badgeType: '',
    image: 'images/men_slides_black.png',
    description: 'Breathable ergonomic slide slippers built with soft top strap and durable rubber grip.',
    colors: ['Navy', 'Black'],
    sizes: [6, 7, 8, 9, 10]
  },
  {
    id: 'p7',
    name: 'SoftWalk Classic Mules',
    gender: 'women',
    category: 'Fashion',
    price: 1099,
    oldPrice: 1499,
    rating: 4.8,
    reviewsCount: 65,
    badge: '25% OFF',
    badgeType: 'discount',
    image: 'images/women_slides_beige.png',
    description: 'Chic indoor/outdoor slipper mules featuring soft velvet touch lining and supportive outsole.',
    colors: ['Cream', 'Beige'],
    sizes: [6, 7, 8, 9]
  },
  {
    id: 'p8',
    name: 'Street Ease Flip-Flops',
    gender: 'men',
    category: 'Sports',
    price: 699,
    oldPrice: 899,
    rating: 4.5,
    reviewsCount: 52,
    badge: '',
    badgeType: '',
    image: 'images/hero_slipper.png',
    description: 'High-traction daily flip-flops engineered for beach, home, and post-workout comfort.',
    colors: ['Black', 'Blue'],
    sizes: [6, 7, 8, 9, 10]
  }
];

// App State
let state = {
  currentView: 'home',
  cart: [
    {
      product: PRODUCTS[0],
      size: 8,
      color: 'Black',
      quantity: 1
    }
  ],
  wishlist: ['p1', 'p2'],
  selectedProduct: PRODUCTS[0],
  couponApplied: false,
  couponDiscount: 0,
  activeFilters: {
    category: [],
    size: null,
    sort: 'popular'
  }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  renderProducts();
  updateCartBadge();
  updateWishlistBadge();
  renderCartView();
  renderWishlistGrid();
  setupEventListeners();
});

// Router
function initRouter() {
  const hash = window.location.hash.replace('#', '') || 'home';
  switchView(hash);

  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.replace('#', '') || 'home';
    switchView(newHash);
  });
}

function switchView(viewName) {
  state.currentView = viewName;
  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  const targetPanel = document.getElementById(`${viewName}-view`);
  if (targetPanel) {
    targetPanel.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update nav active states
  document.querySelectorAll('.nav-link, .mobile-nav-item').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${viewName}`) {
      link.classList.add('active');
    }
  });

  if (viewName === 'cart') renderCartView();
  if (viewName === 'wishlist') renderWishlistGrid();
  if (viewName === 'men') renderFilteredProducts('men');
  if (viewName === 'women') renderFilteredProducts('women');
}

// Render Products
function renderProducts() {
  // Trending Grid
  const trendingContainer = document.getElementById('trending-products-grid');
  if (trendingContainer) {
    trendingContainer.innerHTML = PRODUCTS.slice(0, 4).map(p => createProductCardMarkup(p)).join('');
  }

  // New Arrivals Grid
  const newArrivalsContainer = document.getElementById('new-arrivals-grid');
  if (newArrivalsContainer) {
    newArrivalsContainer.innerHTML = PRODUCTS.filter(p => p.badge === 'NEW' || p.badge === 'BESTSELLER').slice(0, 4).map(p => createProductCardMarkup(p)).join('');
  }

  // Men Featured Grid
  const menGrid = document.getElementById('men-featured-grid');
  if (menGrid) {
    menGrid.innerHTML = PRODUCTS.filter(p => p.gender === 'men').slice(0, 4).map(p => createProductCardMarkup(p)).join('');
  }

  // Women Featured Grid
  const womenGrid = document.getElementById('women-featured-grid');
  if (womenGrid) {
    womenGrid.innerHTML = PRODUCTS.filter(p => p.gender === 'women').slice(0, 4).map(p => createProductCardMarkup(p)).join('');
  }
}

function createProductCardMarkup(product) {
  const isWishlisted = state.wishlist.includes(product.id);
  const badgeHtml = product.badge ? `<span class="badge badge-${product.badgeType} product-badge-pos">${product.badge}</span>` : '';

  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-thumb" onclick="openProductDetail('${product.id}')">
        ${badgeHtml}
        <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist('${product.id}')" title="Wishlist">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-details">
        <span class="product-cat">${product.gender.toUpperCase()} • ${product.category}</span>
        <h3 class="product-title" onclick="openProductDetail('${product.id}')">${product.name}</h3>
        <div class="product-rating">
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <span>${product.rating}</span>
          <span style="color:var(--color-text-muted); font-size:0.75rem;">(${product.reviewsCount})</span>
        </div>
        <div class="color-swatches">
          <span class="swatch swatch-black"></span>
          <span class="swatch swatch-beige"></span>
          <span class="swatch swatch-navy"></span>
        </div>
        <div class="product-price-row">
          <span class="price-current">₹${product.price}</span>
          <span class="price-old">₹${product.oldPrice}</span>
          <span class="price-discount">${Math.round((1 - product.price/product.oldPrice)*100)}% OFF</span>
        </div>
        <button class="btn-add-cart" onclick="quickAddToCart('${product.id}')">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          Add to Cart
        </button>
      </div>
    </div>
  `;
}

// Product Listing Page Filtering & Sorting
function renderFilteredProducts(gender) {
  const container = document.getElementById(`${gender}-products-grid`);
  if (!container) return;

  let filtered = PRODUCTS.filter(p => p.gender === gender);

  if (state.activeFilters.size) {
    filtered = filtered.filter(p => p.sizes.includes(state.activeFilters.size));
  }

  // Sort logic
  if (state.activeFilters.sort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.activeFilters.sort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.activeFilters.sort === 'newest') {
    filtered.sort((a, b) => (b.badge === 'NEW' ? 1 : -1));
  } else {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  container.innerHTML = filtered.map(p => createProductCardMarkup(p)).join('');
  const countEl = document.getElementById(`${gender}-product-count`);
  if (countEl) countEl.innerText = `${filtered.length} Items`;
}

function handleSortChange(gender, sortValue) {
  state.activeFilters.sort = sortValue;
  renderFilteredProducts(gender);
}

function filterBySize(size) {
  state.activeFilters.size = state.activeFilters.size === size ? null : size;
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.innerText) === state.activeFilters.size);
  });
  renderFilteredProducts(state.currentView);
}

// Product Details Page
function openProductDetail(productId) {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  state.selectedProduct = product;

  document.getElementById('pdp-title').innerText = product.name;
  document.getElementById('pdp-price').innerText = `₹${product.price}`;
  document.getElementById('pdp-old-price').innerText = `₹${product.oldPrice}`;
  document.getElementById('pdp-discount').innerText = `${Math.round((1 - product.price/product.oldPrice)*100)}% OFF`;
  document.getElementById('pdp-rating-text').innerText = `${product.rating} (${product.reviewsCount} reviews)`;
  document.getElementById('pdp-desc').innerText = product.description;
  document.getElementById('pdp-main-img').src = product.image;

  // Render Thumbnails
  const thumbContainer = document.getElementById('pdp-thumbs');
  thumbContainer.innerHTML = [product.image, product.image, product.image, product.image].map((img, idx) => `
    <div class="thumb-item ${idx === 0 ? 'active' : ''}" onclick="switchPdpImage(this, '${img}')">
      <img src="${img}" alt="Thumbnail">
    </div>
  `).join('');

  // Render Sizes
  const sizeContainer = document.getElementById('pdp-size-picker');
  sizeContainer.innerHTML = product.sizes.map((s, idx) => `
    <button class="size-btn ${idx === 0 ? 'active' : ''}" onclick="selectPdpSize(this, ${s})">${s}</button>
  `).join('');

  window.location.hash = 'product';
}

function switchPdpImage(el, src) {
  document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('pdp-main-img').src = src;
}

function selectPdpSize(el, size) {
  document.querySelectorAll('#pdp-size-picker .size-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

// Cart Management
function quickAddToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingItem = state.cart.find(i => i.product.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({
      product: product,
      size: product.sizes[0],
      color: product.colors[0],
      quantity: 1
    });
  }

  updateCartBadge();
  showToast(`Added "${product.name}" to cart!`);
}

function addPdpToCart() {
  const product = state.selectedProduct;
  const activeSizeBtn = document.querySelector('#pdp-size-picker .size-btn.active');
  const size = activeSizeBtn ? parseInt(activeSizeBtn.innerText) : product.sizes[0];
  const qty = parseInt(document.getElementById('pdp-qty').innerText) || 1;

  const existing = state.cart.find(i => i.product.id === product.id && i.size === size);
  if (existing) {
    existing.quantity += qty;
  } else {
    state.cart.push({
      product: product,
      size: size,
      color: product.colors[0],
      quantity: qty
    });
  }

  updateCartBadge();
  showToast(`Added ${qty}x "${product.name}" to cart!`);
}

function updateCartBadge() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-count-badge').forEach(badge => {
    badge.innerText = totalCount;
  });
}

function renderCartView() {
  const cartContainer = document.getElementById('cart-items-list');
  if (!cartContainer) return;

  if (state.cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="text-center" style="padding:60px 0;">
        <h3>Your Cart is Empty</h3>
        <p style="color:var(--color-text-muted); margin: 12px 0 24px;">Explore our comfortable slipper collections and find your pair.</p>
        <a href="#home" class="btn btn-primary">SHOP NOW</a>
      </div>
    `;
    updateCartTotals();
    return;
  }

  cartContainer.innerHTML = state.cart.map((item, idx) => `
    <div class="cart-item">
      <img src="${item.product.image}" class="cart-item-img" alt="${item.product.name}">
      <div style="flex-grow:1;">
        <h4 style="font-size:1.1rem; margin-bottom:4px;">${item.product.name}</h4>
        <p style="font-size:0.85rem; color:var(--color-text-muted);">Size: UK ${item.size} • Color: ${item.color}</p>
        <span style="font-weight:800; font-size:1.1rem; display:block; margin-top:8px;">₹${item.product.price}</span>
      </div>
      <div class="qty-picker">
        <button class="qty-btn" onclick="updateCartQty(${idx}, -1)">-</button>
        <span class="qty-val">${item.quantity}</span>
        <button class="qty-btn" onclick="updateCartQty(${idx}, 1)">+</button>
      </div>
      <button onclick="removeFromCart(${idx})" style="color:var(--color-text-muted); padding:8px;" title="Remove">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
      </button>
    </div>
  `).join('');

  updateCartTotals();
}

function updateCartQty(index, delta) {
  state.cart[index].quantity += delta;
  if (state.cart[index].quantity <= 0) {
    state.cart.splice(index, 1);
  }
  updateCartBadge();
  renderCartView();
}

function removeFromCart(index) {
  const removedName = state.cart[index].product.name;
  state.cart.splice(index, 1);
  updateCartBadge();
  renderCartView();
  showToast(`Removed "${removedName}" from cart`);
}

function updateCartTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discount = state.couponApplied ? Math.round(subtotal * 0.15) : 0;
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal - discount + shipping;

  const subtotalEl = document.getElementById('cart-subtotal');
  const discountEl = document.getElementById('cart-discount');
  const shippingEl = document.getElementById('cart-shipping');
  const totalEl = document.getElementById('cart-total');

  if (subtotalEl) subtotalEl.innerText = `₹${subtotal}`;
  if (discountEl) discountEl.innerText = `-₹${discount}`;
  if (shippingEl) shippingEl.innerText = shipping === 0 ? 'FREE' : `₹${shipping}`;
  if (totalEl) totalEl.innerText = `₹${total}`;
}

function applyCoupon() {
  const codeInput = document.getElementById('coupon-input');
  if (!codeInput) return;
  const code = codeInput.value.trim().toUpperCase();

  if (code === 'STEP15') {
    state.couponApplied = true;
    showToast('Success! 15% discount applied (STEP15)');
    updateCartTotals();
  } else {
    showToast('Invalid coupon code. Try STEP15');
  }
}

// Wishlist Logic
function toggleWishlist(productId) {
  const idx = state.wishlist.indexOf(productId);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    showToast('Removed from Wishlist');
  } else {
    state.wishlist.push(productId);
    showToast('Saved to Wishlist!');
  }
  updateWishlistBadge();
  renderProducts();
  if (state.currentView === 'wishlist') renderWishlistGrid();
}

function updateWishlistBadge() {
  document.querySelectorAll('.wishlist-count-badge').forEach(b => {
    b.innerText = state.wishlist.length;
  });
}

function renderWishlistGrid() {
  const container = document.getElementById('wishlist-grid');
  if (!container) return;

  const wishlistedProducts = PRODUCTS.filter(p => state.wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    container.innerHTML = `
      <div class="text-center" style="grid-column: 1/-1; padding: 60px 0;">
        <h3>Your Wishlist is Waiting</h3>
        <p style="color:var(--color-text-muted); margin: 12px 0 24px;">Your wishlist is waiting for something comfortable.</p>
        <a href="#home" class="btn btn-primary">EXPLORE SLIPPERS</a>
      </div>
    `;
    return;
  }

  container.innerHTML = wishlistedProducts.map(p => createProductCardMarkup(p)).join('');
}

// Checkout & Order Tracking
function placeOrder(e) {
  if (e) e.preventDefault();
  state.cart = [];
  updateCartBadge();
  showToast('Order Placed Successfully! #STP10245');
  window.location.hash = 'tracking';
}

// Toast Notifications
function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Modal Toggle Helpers
function toggleSizeGuideModal() {
  const modal = document.getElementById('size-guide-modal');
  if (modal) modal.classList.toggle('open');
}

function toggleSearchOverlay() {
  const modal = document.getElementById('search-modal');
  if (modal) modal.classList.toggle('open');
}

function setupEventListeners() {
  const searchInput = document.getElementById('search-input');
  const headerSearch = document.getElementById('header-search-field');
  const heroSearch = document.getElementById('hero-search-field');

  function handleQuery(q) {
    if (searchInput && searchInput.value !== q) searchInput.value = q;
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;

    if (q.length > 0) {
      const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.gender.toLowerCase().includes(q));
      if (matches.length === 0) {
        resultsContainer.innerHTML = `<p style="padding:16px; color:var(--color-text-muted); font-size:0.9rem;">No slippers found matching "${q}".</p>`;
      } else {
        resultsContainer.innerHTML = matches.map(m => `
          <div style="display:flex; align-items:center; gap:12px; padding:12px; border-bottom:1px solid var(--color-border); cursor:pointer;" onclick="openProductDetail('${m.id}'); toggleSearchOverlay();">
            <img src="${m.image}" style="width:48px; height:48px; border-radius:8px; object-fit:cover;">
            <div>
              <strong style="display:block; font-size:0.95rem; color:var(--color-primary);">${m.name}</strong>
              <span style="font-size:0.8rem; color:var(--color-text-muted);">${m.gender.toUpperCase()} • ₹${m.price}</span>
            </div>
          </div>
        `).join('');
      }
    } else {
      resultsContainer.innerHTML = '';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => handleQuery(e.target.value.toLowerCase().trim()));
  }

  [headerSearch, heroSearch].forEach(input => {
    if (input) {
      input.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase().trim();
        const modal = document.getElementById('search-modal');
        if (modal && !modal.classList.contains('open')) {
          modal.classList.add('open');
        }
        handleQuery(val);
      });
    }
  });
}
