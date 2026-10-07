/**
 * CampusBite - Cart Logic & Rendering
 */

const CartManager = {
  // Add item to cart
  addItem(foodId, quantity = 1) {
    const menu = Storage.getMenu();
    const food = menu.find(item => item.id === foodId);
    if (!food) return;

    if (!food.available) {
      showToast('Sorry, this food is currently unavailable', 'error');
      return;
    }

    const cart = Storage.getCart();
    const existingIndex = cart.findIndex(item => item.id === foodId);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: food.id,
        name: food.name,
        price: food.price,
        quantity: quantity,
        isVeg: food.isVeg,
        image: food.image,
        category: food.category
      });
    }

    Storage.saveCart(cart);
    showToast(`Added ${food.name} to cart ✓`, 'success');
  },

  // Remove item completely
  removeItem(foodId) {
    let cart = Storage.getCart();
    const item = cart.find(i => i.id === foodId);
    cart = cart.filter(i => i.id !== foodId);
    Storage.saveCart(cart);
    showToast(`${item ? item.name : 'Item'} removed from tray`, 'info');
    CartManager.renderCartPage();
  },

  // Change quantity (+1 or -1)
  updateQuantity(foodId, change) {
    const cart = Storage.getCart();
    const item = cart.find(i => i.id === foodId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
      CartManager.removeItem(foodId);
      return;
    }

    Storage.saveCart(cart);
    CartManager.renderCartPage();
  },

  // Clear entire cart
  clearCart() {
    Storage.saveCart([]);
  },

  // Calculate totals
  getSummary() {
    const cart = Storage.getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const convenienceFee = 0;
    const total = subtotal + convenienceFee;
    return {
      subtotal,
      convenienceFee,
      total,
      count: cart.reduce((sum, item) => sum + item.quantity, 0)
    };
  },

  // Render the cart.html page
  renderCartPage() {
    const cartContainer = document.getElementById('cartItemsList');
    const emptyState = document.getElementById('cartEmptyState');
    const summaryCard = document.getElementById('cartSummaryContainer');
    if (!cartContainer) return;

    const cart = Storage.getCart();

    if (cart.length === 0) {
      cartContainer.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      if (summaryCard) summaryCard.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (summaryCard) summaryCard.style.display = 'block';

    cartContainer.innerHTML = cart.map(item => `
      <div class="cart-item-row" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" referrerpolicy="no-referrer" onerror="if(this.dataset.fallback){this.src=this.dataset.fallback;}else if(window.FoodImages){this.src=FoodImages.vegBurger;}" data-fallback="${item.fallbackImage || ''}" />
        <div class="cart-item-info">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <div class="diet-indicator ${item.isVeg ? 'veg' : 'non-veg'}" style="position: static; width: 16px; height: 16px;"></div>
            <h4 class="cart-item-name">${item.name}</h4>
          </div>
          <p class="cart-item-price">${formatCurrency(item.price)} each</p>
        </div>
        
        <div class="qty-control-group">
          <button class="qty-btn" onclick="CartManager.updateQuantity('${item.id}', -1)" aria-label="Decrease quantity">-</button>
          <input type="text" class="qty-input" value="${item.quantity}" readonly />
          <button class="qty-btn" onclick="CartManager.updateQuantity('${item.id}', 1)" aria-label="Increase quantity">+</button>
        </div>

        <div class="cart-item-total">
          ${formatCurrency(item.price * item.quantity)}
        </div>

        <button class="cart-remove-btn" onclick="CartManager.removeItem('${item.id}')" title="Remove item" aria-label="Remove item">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    `).join('');

    // Update Summary
    const summary = CartManager.getSummary();
    const subtotalEl = document.getElementById('summarySubtotal');
    const feeEl = document.getElementById('summaryFee');
    const totalEl = document.getElementById('summaryTotal');
    const itemCountEl = document.getElementById('summaryItemCount');

    if (subtotalEl) subtotalEl.textContent = formatCurrency(summary.subtotal);
    if (feeEl) feeEl.textContent = '₹0 (Free)';
    if (totalEl) totalEl.textContent = formatCurrency(summary.total);
    if (itemCountEl) itemCountEl.textContent = `(${summary.count} items)`;
  }
};

// Pickup time pill selection helper
function initPickupOptions() {
  const pills = document.querySelectorAll('.pickup-time-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('selected'));
      pill.classList.add('selected');
      const chosenTime = pill.dataset.time || pill.textContent.trim();
      localStorage.setItem('cb_chosen_pickup', chosenTime);
    });
  });

  // Default to ASAP
  if (!localStorage.getItem('cb_chosen_pickup')) {
    localStorage.setItem('cb_chosen_pickup', 'ASAP');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cartItemsList')) {
    CartManager.renderCartPage();
    initPickupOptions();
  }
});
