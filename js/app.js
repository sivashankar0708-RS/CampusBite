/**
 * CampusBite - Main App Utilities
 * Common shared functions: Toasts, Cart Badges, Navbars, Modals
 */

// Toast Notifications System
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✓';
  if (type === 'error') icon = '⚠️';
  if (type === 'warning') icon = '⚡';

  toast.innerHTML = `
    <span style="font-weight: 800; font-size: 1.1rem;">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3200);
}

// Update Cart Badge in Navbar
function updateCartBadge() {
  const badgeEls = document.querySelectorAll('.cart-badge');
  if (!badgeEls.length) return;

  const cart = Storage.getCart();
  const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  badgeEls.forEach(el => {
    el.textContent = totalCount;
    el.style.display = totalCount > 0 ? 'flex' : 'none';
  });
}

// Format Indian Rupee currency
function formatCurrency(num) {
  return '₹' + Number(num || 0).toLocaleString('en-IN');
}

// Setup Global Navbar & Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Update badge initially
  updateCartBadge();

  // Listen to cart changes
  window.addEventListener('cb_cart_updated', updateCartBadge);

  // Setup mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isExpanded = navLinks.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Update user profile link / login button based on auth state
  syncUserAuthNav();

  // Close modals when clicking backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });
  });

  const closeBtns = document.querySelectorAll('.modal-close-btn');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) modal.classList.remove('open');
    });
  });
});

// Update navbar login/profile link based on user
function syncUserAuthNav() {
  const loginNavLinks = document.querySelectorAll('.nav-auth-link');
  const currentUser = Storage.getCurrentUser();

  loginNavLinks.forEach(link => {
    if (currentUser && currentUser.name) {
      link.href = '/profile.html';
      link.innerHTML = `👤 ${currentUser.name.split(' ')[0]}`;
      link.title = `Logged in as ${currentUser.name}`;
    } else {
      link.href = '/login.html';
      link.textContent = 'Login';
    }
  });
}
window.addEventListener('cb_user_updated', syncUserAuthNav);

// Global Food Modal Controller
let activeModalFood = null;
let activeModalQty = 1;

function openFoodModal(foodId) {
  const menu = Storage.getMenu();
  const food = menu.find(item => item.id === foodId);
  if (!food) return;

  activeModalFood = food;
  activeModalQty = 1;

  const modal = document.getElementById('foodModal');
  if (!modal) return;

  const heroImg = modal.querySelector('.modal-hero-img');
  const title = modal.querySelector('.modal-title');
  const dietBadge = modal.querySelector('.modal-diet-indicator');
  const price = modal.querySelector('.modal-price-tag');
  const desc = modal.querySelector('.modal-desc');
  const ingredients = modal.querySelector('.modal-ingredients');
  const category = modal.querySelector('.modal-category');
  const status = modal.querySelector('.modal-status');
  const qtyInput = modal.querySelector('#modalQtyInput');
  const addBtn = modal.querySelector('#modalAddBtn');

  if (heroImg) {
    heroImg.src = food.image;
    heroImg.setAttribute('referrerpolicy', 'no-referrer');
    heroImg.onerror = () => {
      heroImg.onerror = null;
      heroImg.src = food.fallbackImage || (window.FoodImages && FoodImages.vegBurger) || '';
    };
  }
  if (title) title.textContent = food.name;
  if (price) price.textContent = formatCurrency(food.price);
  if (desc) desc.textContent = food.description;
  if (ingredients) ingredients.textContent = food.ingredients || 'Standard fresh ingredients';
  if (category) category.textContent = food.category;

  if (status) {
    status.textContent = food.available ? 'In Stock (Ready in 5-10m)' : 'Currently Unavailable';
    status.style.color = food.available ? 'var(--success-green)' : 'var(--danger-red)';
  }

  if (dietBadge) {
    dietBadge.className = `diet-indicator ${food.isVeg ? 'veg' : 'non-veg'}`;
    dietBadge.title = food.isVeg ? 'Vegetarian' : 'Non-Vegetarian';
  }

  if (qtyInput) qtyInput.value = 1;

  if (addBtn) {
    addBtn.disabled = !food.available;
    addBtn.textContent = food.available ? `Add To Tray • ${formatCurrency(food.price)}` : 'Sold Out';
  }

  modal.classList.add('open');
}

function updateModalQty(change) {
  const qtyInput = document.getElementById('modalQtyInput');
  const addBtn = document.getElementById('modalAddBtn');
  if (!qtyInput || !activeModalFood) return;

  let newQty = activeModalQty + change;
  if (newQty < 1) newQty = 1;
  if (newQty > 15) newQty = 15;

  activeModalQty = newQty;
  qtyInput.value = activeModalQty;

  if (addBtn && activeModalFood.available) {
    addBtn.textContent = `Add To Tray • ${formatCurrency(activeModalFood.price * activeModalQty)}`;
  }
}

function addModalItemToCart() {
  if (!activeModalFood) return;
  CartManager.addItem(activeModalFood.id, activeModalQty);
  const modal = document.getElementById('foodModal');
  if (modal) modal.classList.remove('open');
}
