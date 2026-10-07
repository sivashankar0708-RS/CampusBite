/**
 * CampusBite - Admin Portal Logic & Chart.js Integration
 * Handles Dashboard Stats, Live Order Status Updates, Menu CRUD, and Analytics Reports
 */

const AdminManager = {
  // Compute Dashboard Overview Metrics
  getDashboardMetrics() {
    const orders = Storage.getOrders();
    const todayOrders = orders.length; // Active orders today
    const pendingOrders = orders.filter(o => o.status === 'ORDER PLACED' || o.status === 'PREPARING').length;
    const readyOrders = orders.filter(o => o.status === 'READY').length;
    const todayRevenue = orders
      .filter(o => o.status !== 'CANCELLED')
      .reduce((sum, o) => sum + (o.total || 0), 0);

    return {
      todayOrders,
      pendingOrders,
      readyOrders,
      todayRevenue
    };
  },

  // Render Dashboard Page (admin/dashboard.html)
  initDashboard() {
    const metrics = AdminManager.getDashboardMetrics();

    const metricTodayOrders = document.getElementById('metricTodayOrders');
    const metricPendingOrders = document.getElementById('metricPendingOrders');
    const metricReadyOrders = document.getElementById('metricReadyOrders');
    const metricTodayRevenue = document.getElementById('metricTodayRevenue');

    if (metricTodayOrders) metricTodayOrders.textContent = metrics.todayOrders;
    if (metricPendingOrders) metricPendingOrders.textContent = metrics.pendingOrders;
    if (metricReadyOrders) metricReadyOrders.textContent = metrics.readyOrders;
    if (metricTodayRevenue) metricTodayRevenue.textContent = formatCurrency(metrics.todayRevenue);

    // Render Recent Orders in Dashboard table
    AdminManager.renderRecentOrdersTable();

    // Render Orders Per Hour Chart
    AdminManager.renderOrdersPerHourChart();
  },

  // Render Recent Orders on Dashboard
  renderRecentOrdersTable() {
    const tableBody = document.getElementById('adminRecentOrdersBody');
    if (!tableBody) return;

    const orders = Storage.getOrders().slice(0, 5); // top 5 recent

    if (orders.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 24px; color: var(--text-muted);">No orders placed yet.</td></tr>`;
      return;
    }

    tableBody.innerHTML = orders.map(order => `
      <tr>
        <td><span class="token-badge">${order.token}</span></td>
        <td>
          <div style="font-weight: 700;">${order.studentName}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${order.studentId} • ${order.department}</div>
        </td>
        <td>
          ${order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
        </td>
        <td class="tabular-nums" style="font-weight: 700;">${formatCurrency(order.total)}</td>
        <td style="font-size: 0.85rem; color: var(--text-muted);">${order.time || 'Just now'}</td>
        <td>
          <select class="status-select ${order.status.toLowerCase().replace(/\s+/g, '-')}" onchange="AdminManager.updateOrderStatus('${order.id}', this.value)">
            <option value="ORDER PLACED" ${order.status === 'ORDER PLACED' ? 'selected' : ''}>Pending (Placed)</option>
            <option value="PREPARING" ${order.status === 'PREPARING' ? 'selected' : ''}>Preparing</option>
            <option value="READY" ${order.status === 'READY' ? 'selected' : ''}>Ready for Pickup</option>
            <option value="COLLECTED" ${order.status === 'COLLECTED' ? 'selected' : ''}>Collected</option>
            <option value="CANCELLED" ${order.status === 'CANCELLED' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
      </tr>
    `).join('');
  },

  // Render Full Admin Orders Page (admin/orders.html)
  initOrdersPage() {
    const tableBody = document.getElementById('adminAllOrdersBody');
    if (!tableBody) return;

    const orders = Storage.getOrders();
    const filterStatus = document.getElementById('adminFilterStatus')?.value || 'ALL';

    const filtered = filterStatus === 'ALL' ? orders : orders.filter(o => o.status === filterStatus);

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 32px; color: var(--text-muted);">No orders matching this filter.</td></tr>`;
      return;
    }

    tableBody.innerHTML = filtered.map(order => `
      <tr>
        <td><span class="token-badge">${order.token}</span></td>
        <td>
          <div style="font-weight: 700;">${order.studentName}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">${order.studentId} • ${order.phone}</div>
        </td>
        <td>
          <div style="font-size: 0.88rem;">${order.items.map(i => `<strong>${i.quantity}x</strong> ${i.name}`).join('<br>')}</div>
        </td>
        <td class="tabular-nums" style="font-weight: 800; font-size: 1rem;">${formatCurrency(order.total)}</td>
        <td>
          <div style="font-size: 0.85rem;">${order.date}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">${order.time} (${order.pickupTime})</div>
        </td>
        <td>
          <div style="font-size: 0.85rem; font-weight: 600;">${order.paymentMethod}</div>
          <div style="font-size: 0.75rem; color: ${order.paymentStatus === 'Paid' ? 'var(--green)' : 'var(--amber)'}; font-weight: 700;">${order.paymentStatus}</div>
        </td>
        <td>
          <select class="status-select ${order.status.toLowerCase().replace(/\s+/g, '-')}" onchange="AdminManager.updateOrderStatus('${order.id}', this.value)">
            <option value="ORDER PLACED" ${order.status === 'ORDER PLACED' ? 'selected' : ''}>Pending (Placed)</option>
            <option value="PREPARING" ${order.status === 'PREPARING' ? 'selected' : ''}>Preparing</option>
            <option value="READY" ${order.status === 'READY' ? 'selected' : ''}>Ready for Pickup</option>
            <option value="COLLECTED" ${order.status === 'COLLECTED' ? 'selected' : ''}>Collected</option>
            <option value="CANCELLED" ${order.status === 'CANCELLED' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
      </tr>
    `).join('');
  },

  // Update order status & persist to localStorage
  updateOrderStatus(orderId, newStatus) {
    const orders = Storage.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    order.status = newStatus;
    if (newStatus === 'COLLECTED' && order.paymentMethod === 'Pay At Canteen') {
      order.paymentStatus = 'Paid';
    }

    Storage.saveOrders(orders);
    showToast(`Token ${order.token} updated to ${newStatus} ✓`, 'success');

    // Refresh views if present
    if (document.getElementById('adminRecentOrdersBody')) AdminManager.initDashboard();
    if (document.getElementById('adminAllOrdersBody')) AdminManager.initOrdersPage();
  },

  // Admin Menu Management (admin/menu.html)
  initMenuPage() {
    const container = document.getElementById('adminMenuGrid');
    if (!container) return;

    const menu = Storage.getMenu();

    container.innerHTML = menu.map(item => `
      <div class="admin-food-card" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="admin-food-thumb" referrerpolicy="no-referrer" onerror="if(this.dataset.fallback){this.src=this.dataset.fallback;}else if(window.FoodImages){this.src=FoodImages.vegBurger;}" data-fallback="${item.fallbackImage || ''}" />
        <div class="admin-food-info">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <span class="admin-food-category">${item.category}</span>
            <span class="diet-indicator ${item.isVeg ? 'veg' : 'non-veg'}" style="position: static; width: 14px; height: 14px;"></span>
          </div>
          <h4>${item.name}</h4>
          <div class="admin-food-price">${formatCurrency(item.price)}</div>
          
          <div style="display: flex; align-items: center; justify-content: space-between; margin: 8px 0;">
            <span style="font-size: 0.8rem; font-weight: 600; color: ${item.available ? 'var(--green)' : 'var(--text-muted)'};">
              ${item.available ? 'Available' : 'Unavailable'}
            </span>
            <label class="switch" title="Toggle availability">
              <input type="checkbox" ${item.available ? 'checked' : ''} onchange="AdminManager.toggleAvailability('${item.id}', this.checked)">
              <span class="slider"></span>
            </label>
          </div>

          <div class="admin-food-actions">
            <button class="admin-btn admin-btn-outline" style="padding: 4px 10px; font-size: 0.8rem;" onclick="AdminManager.openEditMenuModal('${item.id}')">✏️ Edit</button>
            <button class="admin-btn admin-btn-danger" style="padding: 4px 10px; font-size: 0.8rem;" onclick="AdminManager.deleteMenuItem('${item.id}')">🗑️ Delete</button>
          </div>
        </div>
      </div>
    `).join('');
  },

  // Toggle food availability
  toggleAvailability(foodId, isAvailable) {
    const menu = Storage.getMenu();
    const item = menu.find(i => i.id === foodId);
    if (!item) return;

    item.available = isAvailable;
    Storage.saveMenu(menu);
    showToast(`${item.name} is now ${isAvailable ? 'Available' : 'Unavailable'}`, 'info');
    AdminManager.initMenuPage();
  },

  // Delete food item
  deleteMenuItem(foodId) {
    if (!confirm('Are you sure you want to remove this item from the canteen menu?')) return;

    let menu = Storage.getMenu();
    const item = menu.find(i => i.id === foodId);
    menu = menu.filter(i => i.id !== foodId);
    Storage.saveMenu(menu);
    showToast(`${item ? item.name : 'Food item'} deleted ✓`, 'info');
    AdminManager.initMenuPage();
  },

  // Open modal for Adding new food
  openAddMenuModal() {
    const modal = document.getElementById('menuItemModal');
    const form = document.getElementById('menuItemForm');
    if (!modal || !form) return;

    form.reset();
    form.elements['itemId'].value = '';
    document.getElementById('modalMenuTitle').textContent = 'Add New Food Item';
    modal.classList.add('open');
  },

  // Open modal for Editing existing food
  openEditMenuModal(foodId) {
    const menu = Storage.getMenu();
    const item = menu.find(i => i.id === foodId);
    const modal = document.getElementById('menuItemModal');
    const form = document.getElementById('menuItemForm');
    if (!item || !modal || !form) return;

    document.getElementById('modalMenuTitle').textContent = 'Edit Food Item';
    form.elements['itemId'].value = item.id;
    form.elements['name'].value = item.name;
    form.elements['category'].value = item.category;
    form.elements['price'].value = item.price;
    form.elements['isVeg'].value = item.isVeg ? 'true' : 'false';
    form.elements['available'].checked = item.available;
    form.elements['description'].value = item.description;
    form.elements['ingredients'].value = item.ingredients || '';

    modal.classList.add('open');
  },

  // Save food item from modal
  saveMenuItem(formData) {
    let menu = Storage.getMenu();
    const itemId = formData.itemId;

    if (itemId) {
      // Edit existing
      const existing = menu.find(i => i.id === itemId);
      if (existing) {
        existing.name = formData.name;
        existing.category = formData.category;
        existing.price = parseFloat(formData.price) || 0;
        existing.isVeg = formData.isVeg === 'true';
        existing.available = formData.available;
        existing.description = formData.description;
        existing.ingredients = formData.ingredients;
      }
      showToast('Menu item updated successfully ✓', 'success');
    } else {
      // Add new
      const newId = 'food_' + Date.now();
      // Select appropriate fallback food image based on category and dish name
      let foodImg = FoodImages.vegBurger;
      const lowerName = (formData.name || '').toLowerCase();
      if (lowerName.includes('biryani')) foodImg = FoodImages.biryani;
      else if (lowerName.includes('sandwich')) foodImg = FoodImages.sandwich;
      else if (lowerName.includes('paneer roll')) foodImg = FoodImages.paneerRoll;
      else if (lowerName.includes('roll')) foodImg = formData.isVeg === 'true' ? FoodImages.paneerRoll : FoodImages.eggRoll;
      else if (lowerName.includes('rice')) foodImg = FoodImages.vegRice;
      else if (formData.category === 'Drinks') foodImg = FoodImages.freshJuice;
      else if (formData.category === 'Desserts') foodImg = FoodImages.brownie;
      else if (formData.category === 'Meals') foodImg = FoodImages.friedRice;
      else if (formData.category === 'Breakfast') foodImg = FoodImages.masalaDosa;
      else if (formData.category === 'Snacks') foodImg = FoodImages.samosa;

      const newItem = {
        id: newId,
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price) || 0,
        isVeg: formData.isVeg === 'true',
        available: formData.available,
        description: formData.description,
        ingredients: formData.ingredients,
        image: foodImg,
        popular: false
      };
      menu.push(newItem);
      showToast('New food item added to menu ✓', 'success');
    }

    Storage.saveMenu(menu);
    const modal = document.getElementById('menuItemModal');
    if (modal) modal.classList.remove('open');
    AdminManager.initMenuPage();
  },

  // Chart.js - Orders Per Hour Chart (Dashboard)
  renderOrdersPerHourChart() {
    const canvas = document.getElementById('ordersPerHourChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    if (window.hourlyChartInstance) {
      window.hourlyChartInstance.destroy();
    }

    window.hourlyChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
        datasets: [{
          label: 'Orders Received',
          data: [12, 28, 45, 62, 58, 40, 22, 35, 18],
          backgroundColor: 'rgba(255, 122, 61, 0.85)',
          borderRadius: 6,
          hoverBackgroundColor: '#FF7A3D'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1F2937',
            titleFont: { family: 'Plus Jakarta Sans', weight: 'bold' },
            bodyFont: { family: 'Plus Jakarta Sans' },
            padding: 12,
            cornerRadius: 8
          }
        },
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            beginAtZero: true,
            grid: { color: '#F1F5F9' },
            ticks: { stepSize: 15 }
          }
        }
      }
    });
  },

  // Admin Reports Page (admin/reports.html)
  initReportsPage() {
    const orders = Storage.getOrders();
    const menu = Storage.getMenu();

    // Calculate aggregated metrics
    const totalOrdersCount = orders.length + 158; // Base historical + current
    const totalRevenueSum = orders.reduce((sum, o) => sum + (o.total || 0), 0) + 14250;
    const mostOrderedItem = 'Veg Burger (84 orders)';
    const peakTime = '11:00 AM – 12:30 PM';

    const repTotalOrders = document.getElementById('repTotalOrders');
    const repTotalRevenue = document.getElementById('repTotalRevenue');
    const repMostOrdered = document.getElementById('repMostOrdered');
    const repPeakTime = document.getElementById('repPeakTime');

    if (repTotalOrders) repTotalOrders.textContent = totalOrdersCount;
    if (repTotalRevenue) repTotalRevenue.textContent = formatCurrency(totalRevenueSum);
    if (repMostOrdered) repMostOrdered.textContent = mostOrderedItem;
    if (repPeakTime) repPeakTime.textContent = peakTime;

    // Render Category Distribution Chart
    AdminManager.renderCategoryChart();

    // Render Revenue Trend Chart
    AdminManager.renderRevenueTrendChart();
  },

  // Chart.js Category Breakdown
  renderCategoryChart() {
    const canvas = document.getElementById('categoryReportChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    if (window.categoryChartInstance) window.categoryChartInstance.destroy();

    window.categoryChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Fast Food', 'Meals', 'Breakfast', 'Snacks', 'Drinks', 'Desserts'],
        datasets: [{
          data: [35, 25, 18, 12, 7, 3],
          backgroundColor: [
            '#FF7A3D',
            '#FF9E6D',
            '#7CB342',
            '#F59E0B',
            '#3B82F6',
            '#8B5CF6'
          ],
          borderWidth: 2,
          borderColor: '#FFFFFF'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: { font: { family: 'Plus Jakarta Sans', weight: '600' } }
          }
        },
        cutout: '68%'
      }
    });
  },

  // Chart.js Revenue Trend Chart
  renderRevenueTrendChart() {
    const canvas = document.getElementById('revenueTrendChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    if (window.revenueChartInstance) window.revenueChartInstance.destroy();

    window.revenueChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{
          label: 'Revenue (₹)',
          data: [4200, 5800, 7100, 6400, 8900, 5200],
          borderColor: '#FF7A3D',
          backgroundColor: 'rgba(255, 122, 61, 0.12)',
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#FF7A3D',
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            grid: { color: '#F1F5F9' },
            ticks: {
              callback: val => '₹' + val
            }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }
};

// Initialize Admin Page Handlers
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('metricTodayOrders')) {
    AdminManager.initDashboard();
  }

  if (document.getElementById('adminAllOrdersBody')) {
    AdminManager.initOrdersPage();
    const filterSelect = document.getElementById('adminFilterStatus');
    if (filterSelect) {
      filterSelect.addEventListener('change', () => AdminManager.initOrdersPage());
    }
  }

  if (document.getElementById('adminMenuGrid')) {
    AdminManager.initMenuPage();

    const addBtn = document.getElementById('openAddFoodModalBtn');
    if (addBtn) addBtn.addEventListener('click', AdminManager.openAddMenuModal);

    const form = document.getElementById('menuItemForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        AdminManager.saveMenuItem({
          itemId: form.elements['itemId'].value,
          name: form.elements['name'].value,
          category: form.elements['category'].value,
          price: form.elements['price'].value,
          isVeg: form.elements['isVeg'].value,
          available: form.elements['available'].checked,
          description: form.elements['description'].value,
          ingredients: form.elements['ingredients'].value
        });
      });
    }

    // Modal close
    const closeModalBtn = document.getElementById('closeMenuModalBtn');
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        document.getElementById('menuItemModal').classList.remove('open');
      });
    }
  }

  if (document.getElementById('repTotalOrders')) {
    AdminManager.initReportsPage();
  }
});
