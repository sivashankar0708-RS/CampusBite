/**
 * CampusBite - Orders Management
 * Handles Checkout, Order Placement, Token Generation, My Orders, and Live Tracking
 */

const OrderManager = {
  // Place a new order from checkout page
  placeOrder(formData) {
    const cart = Storage.getCart();
    if (!cart || cart.length === 0) {
      showToast('Your tray is empty! Please add food first.', 'error');
      return null;
    }

    const token = Storage.getNextToken();
    const orderId = 'CB-' + Math.floor(1000 + Math.random() * 9000);
    const pickupTime = localStorage.getItem('cb_chosen_pickup') || 'ASAP';

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal; // 0 convenience fee

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    const newOrder = {
      id: orderId,
      token: token,
      studentName: formData.studentName.trim(),
      studentId: formData.studentId.trim(),
      department: formData.department.trim(),
      year: formData.year.trim(),
      phone: formData.phone.trim(),
      items: [...cart],
      subtotal: subtotal,
      convenienceFee: 0,
      total: total,
      pickupTime: pickupTime,
      paymentMethod: formData.paymentMethod || 'Pay At Canteen',
      paymentStatus: formData.paymentMethod === 'Pay At Canteen' ? 'Pending' : 'Paid',
      status: 'ORDER PLACED',
      createdAt: Date.now(),
      date: dateStr,
      time: timeStr
    };

    // Save order
    const orders = Storage.getOrders();
    orders.unshift(newOrder);
    Storage.saveOrders(orders);

    // Clear cart
    CartManager.clearCart();

    // Store active order ID for tracking
    localStorage.setItem('cb_latest_order_id', orderId);

    showToast('Order placed successfully ✓', 'success');
    return newOrder;
  },

  // Get order by ID or Token
  getOrder(lookupVal) {
    const orders = Storage.getOrders();
    return orders.find(o => o.id === lookupVal || o.token === lookupVal) || null;
  },

  // Render My Orders page
  renderOrdersPage() {
    const container = document.getElementById('myOrdersContainer');
    const emptyState = document.getElementById('ordersEmptyState');
    if (!container) return;

    const orders = Storage.getOrders();

    if (!orders || orders.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    container.innerHTML = orders.map(order => {
      const statusClass = order.status.toLowerCase().replace(/\s+/g, '-');
      const progressPercent = OrderManager.getProgressPercent(order.status);

      return `
        <div class="order-history-card">
          <div class="order-card-top">
            <div>
              <span class="order-card-token">${order.token}</span>
              <span style="color: var(--text-muted); font-size: 0.85rem; margin-left: 10px;">ID: ${order.id}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <span class="status-badge ${statusClass}">${order.status}</span>
              <a href="/tracking.html?id=${order.id}" class="btn btn-outline btn-sm">Track Live ↗</a>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 0.88rem; color: var(--text-muted); margin-bottom: 12px;">
            <span>📅 ${order.date} at ${order.time}</span>
            <span>⏱️ Pickup: <strong>${order.pickupTime}</strong></span>
          </div>

          <!-- Items list -->
          <div class="order-card-items-list">
            ${order.items.map(item => `
              <div style="display: flex; justify-content: space-between; font-size: 0.92rem;">
                <span>${item.quantity}x ${item.name}</span>
                <span class="tabular-nums">${formatCurrency(item.price * item.quantity)}</span>
              </div>
            `).join('')}
          </div>

          <!-- Progress Mini Timeline -->
          <div style="margin: 16px 0 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); margin-bottom: 6px;">
              <span style="${order.status !== 'CANCELLED' ? 'color: var(--primary-orange)' : ''}">Placed</span>
              <span style="${['PREPARING', 'READY', 'COLLECTED'].includes(order.status) ? 'color: var(--primary-orange)' : ''}">Preparing</span>
              <span style="${['READY', 'COLLECTED'].includes(order.status) ? 'color: var(--success-green)' : ''}">Ready</span>
              <span style="${order.status === 'COLLECTED' ? 'color: var(--text-charcoal)' : ''}">Collected</span>
            </div>
            <div style="height: 6px; background: var(--bg-muted); border-radius: 3px; overflow: hidden;">
              <div style="height: 100%; width: ${progressPercent}%; background: ${order.status === 'READY' ? 'var(--success-green)' : 'var(--primary-orange)'}; border-radius: 3px; transition: width 0.3s ease;"></div>
            </div>
          </div>

          <div class="order-card-footer">
            <div style="font-size: 0.88rem; color: var(--text-muted);">
              Payment: <strong>${order.paymentMethod}</strong> (${order.paymentStatus})
            </div>
            <div style="font-size: 1.25rem; font-weight: 800; font-family: var(--font-mono);">
              Total: ${formatCurrency(order.total)}
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  // Calculate timeline percentage based on current order status
  getProgressPercent(status) {
    switch (status) {
      case 'ORDER PLACED': return 25;
      case 'PREPARING': return 55;
      case 'READY': return 85;
      case 'COLLECTED': return 100;
      case 'CANCELLED': return 0;
      default: return 20;
    }
  },

  // Render Live Order Tracking Page
  renderTrackingPage() {
    const urlParams = new URLSearchParams(window.location.search);
    let orderId = urlParams.get('id');

    if (!orderId) {
      orderId = localStorage.getItem('cb_latest_order_id');
    }

    const orders = Storage.getOrders();
    const order = orderId ? orders.find(o => o.id === orderId || o.token === orderId) : (orders[0] || null);

    const tokenEl = document.getElementById('trackToken');
    const statusBadgeEl = document.getElementById('trackStatusBadge');
    const statusMsgEl = document.getElementById('trackStatusMsg');
    const etaEl = document.getElementById('trackEta');
    const progressBar = document.getElementById('trackProgressBar');
    const orderDetailsEl = document.getElementById('trackOrderDetails');

    if (!order) {
      if (statusMsgEl) statusMsgEl.textContent = 'No active order found to track.';
      return;
    }

    if (tokenEl) tokenEl.textContent = order.token;

    if (statusBadgeEl) {
      statusBadgeEl.textContent = order.status;
      statusBadgeEl.className = `status-badge ${order.status.toLowerCase().replace(/\s+/g, '-')}`;
    }

    // Status contextual messages
    let msg = 'Your food order has been received by the kitchen team.';
    let eta = order.pickupTime === 'ASAP' ? '~8-12 minutes' : order.pickupTime;

    if (order.status === 'ORDER PLACED') {
      msg = 'Order received! Kitchen is preparing the counter.';
    } else if (order.status === 'PREPARING') {
      msg = 'Chefs are currently preparing your hot food fresh.';
      eta = order.pickupTime === 'ASAP' ? '~4-6 minutes' : order.pickupTime;
    } else if (order.status === 'READY') {
      msg = '🎉 Your food is ready! Please show this token at Counter 2 to collect.';
      eta = 'Ready for pickup now!';
    } else if (order.status === 'COLLECTED') {
      msg = 'Enjoy your meal! Order has been collected.';
      eta = 'Order Complete';
    } else if (order.status === 'CANCELLED') {
      msg = 'This order was cancelled. Please contact canteen admin.';
      eta = 'Cancelled';
    }

    if (statusMsgEl) statusMsgEl.textContent = msg;
    if (etaEl) etaEl.textContent = eta;

    // Timeline node highlights
    const steps = ['placed', 'preparing', 'ready', 'collected'];
    const currentStepIndex = order.status === 'ORDER PLACED' ? 0
      : order.status === 'PREPARING' ? 1
      : order.status === 'READY' ? 2
      : order.status === 'COLLECTED' ? 3 : -1;

    steps.forEach((stepName, idx) => {
      const stepEl = document.getElementById(`step-${stepName}`);
      if (!stepEl) return;

      stepEl.classList.remove('completed', 'active');
      if (idx < currentStepIndex) {
        stepEl.classList.add('completed');
      } else if (idx === currentStepIndex) {
        stepEl.classList.add('active');
      }
    });

    if (progressBar) {
      const width = currentStepIndex === 0 ? '15%'
        : currentStepIndex === 1 ? '48%'
        : currentStepIndex === 2 ? '80%'
        : currentStepIndex === 3 ? '100%' : '0%';
      progressBar.style.width = width;
    }

    // Itemized details
    if (orderDetailsEl) {
      orderDetailsEl.innerHTML = `
        <div style="border-top: 1px solid var(--border-light); padding-top: 18px; margin-top: 24px; text-align: left;">
          <h4 style="font-size: 1rem; margin-bottom: 12px; font-weight: 700;">Order Summary (${order.id})</h4>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.92rem;">
            ${order.items.map(i => `
              <div style="display: flex; justify-content: space-between;">
                <span>${i.quantity}x ${i.name}</span>
                <span class="tabular-nums">${formatCurrency(i.price * i.quantity)}</span>
              </div>
            `).join('')}
          </div>
          <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 1.15rem; margin-top: 12px; border-top: 1px dashed var(--border-light); padding-top: 12px;">
            <span>Total Amount:</span>
            <span class="tabular-nums" style="color: var(--primary-orange);">${formatCurrency(order.total)}</span>
          </div>
          <div style="margin-top: 8px; font-size: 0.85rem; color: var(--text-muted); display: flex; justify-content: space-between;">
            <span>Student: ${order.studentName} (${order.studentId})</span>
            <span>Payment: ${order.paymentMethod}</span>
          </div>
        </div>
      `;
    }
  }
};

// Checkout Page Form Submission & Setup
function initCheckoutPage() {
  const form = document.getElementById('checkoutForm');
  if (!form) return;

  // Pre-fill student info if user is logged in
  const currentUser = Storage.getCurrentUser();
  if (currentUser) {
    if (form.elements['studentName']) form.elements['studentName'].value = currentUser.name || '';
    if (form.elements['studentId']) form.elements['studentId'].value = currentUser.studentId || '';
    if (form.elements['department']) form.elements['department'].value = currentUser.department || '';
    if (form.elements['year']) form.elements['year'].value = currentUser.year || '';
    if (form.elements['phone']) form.elements['phone'].value = currentUser.phone || '';
  }

  // Render Cart mini summary on checkout
  const summary = CartManager.getSummary();
  const summaryEl = document.getElementById('checkoutOrderReview');
  if (summaryEl) {
    const cart = Storage.getCart();
    summaryEl.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
        ${cart.map(item => `
          <div style="display: flex; justify-content: space-between; font-size: 0.92rem;">
            <span>${item.quantity}x ${item.name}</span>
            <span class="tabular-nums">${formatCurrency(item.price * item.quantity)}</span>
          </div>
        `).join('')}
      </div>
      <div class="summary-row total-row">
        <span>Total Payable:</span>
        <span class="tabular-nums" style="color: var(--primary-orange);">${formatCurrency(summary.total)}</span>
      </div>
    `;
  }

  // Payment method radio cards
  const paymentCards = document.querySelectorAll('.payment-radio-card');
  paymentCards.forEach(card => {
    card.addEventListener('click', () => {
      paymentCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // Handle Form Submission with Validation
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const studentName = form.elements['studentName'].value.trim();
    const studentId = form.elements['studentId'].value.trim();
    const department = form.elements['department'].value.trim();
    const year = form.elements['year'].value.trim();
    const phone = form.elements['phone'].value.trim();

    const selectedPaymentEl = form.querySelector('input[name="paymentMethod"]:checked');
    const paymentMethod = selectedPaymentEl ? selectedPaymentEl.value : 'Pay At Canteen';

    // Validation
    if (!studentName || !studentId || !department || !year || !phone) {
      showToast('Please complete all student fields', 'error');
      return;
    }

    if (phone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }

    const order = OrderManager.placeOrder({
      studentName,
      studentId,
      department,
      year,
      phone,
      paymentMethod
    });

    if (order) {
      // Redirect to Order Success tracking page
      window.location.href = `/tracking.html?id=${order.id}&success=1`;
    }
  });
}

// Auto-refresh tracking page when localStorage updates (e.g. admin updates status in another tab)
window.addEventListener('storage', (e) => {
  if (e.key === 'cb_orders') {
    if (document.getElementById('trackToken')) {
      OrderManager.renderTrackingPage();
      showToast('Status updated live from canteen!', 'info');
    }
    if (document.getElementById('myOrdersContainer')) {
      OrderManager.renderOrdersPage();
    }
  }
});

// Periodic check for same-page live sync
setInterval(() => {
  if (document.getElementById('trackToken')) {
    OrderManager.renderTrackingPage();
  }
}, 4000);

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('checkoutForm')) initCheckoutPage();
  if (document.getElementById('myOrdersContainer')) OrderManager.renderOrdersPage();
  if (document.getElementById('trackToken')) OrderManager.renderTrackingPage();
});
