/**
 * CampusBite - Authentication & Profile Manager
 * Handles Student Login, Admin Login, Registration, Profile Editing
 */

const AuthManager = {
  // Login student or admin
  login(identifier, password, role = 'student') {
    const users = Storage.getRegisteredUsers();
    identifier = identifier.trim().toLowerCase();

    // Check admin credentials
    if (role === 'admin' || identifier === 'admin' || identifier === 'admin@campusbite.com') {
      if (password === 'admin' || password === 'admin123') {
        const adminUser = {
          name: 'Canteen Manager',
          email: 'admin@campusbite.com',
          studentId: 'ADMIN01',
          role: 'admin'
        };
        Storage.saveCurrentUser(adminUser);
        showToast('Admin logged in successfully ✓', 'success');
        setTimeout(() => {
          window.location.href = '/admin/dashboard.html';
        }, 600);
        return true;
      } else {
        showToast('Invalid admin password (demo: "admin")', 'error');
        return false;
      }
    }

    // Check student credentials
    const found = users.find(u => 
      (u.email.toLowerCase() === identifier || u.studentId.toLowerCase() === identifier) && 
      u.password === password
    );

    if (found) {
      Storage.saveCurrentUser(found);
      showToast(`Welcome back, ${found.name}! ✓`, 'success');
      setTimeout(() => {
        window.location.href = '/menu.html';
      }, 600);
      return true;
    }

    // Fallback: If user enters demo student credentials
    if (identifier === 'aarav' || identifier === 'bca2024018' || identifier === 'aarav.sharma@college.edu') {
      const demoUser = Storage.getCurrentUser();
      Storage.saveCurrentUser(demoUser);
      showToast('Logged in as demo student ✓', 'success');
      setTimeout(() => {
        window.location.href = '/menu.html';
      }, 600);
      return true;
    }

    showToast('Invalid credentials. Check ID/Email or Password.', 'error');
    return false;
  },

  // Register new student account
  register(formData) {
    const { name, studentId, email, department, year, phone, password, confirmPassword } = formData;

    if (!name || !studentId || !email || !department || !year || !phone || !password) {
      showToast('Please complete all fields', 'error');
      return false;
    }

    if (password !== confirmPassword) {
      showToast('Passwords do not match!', 'error');
      return false;
    }

    if (password.length < 4) {
      showToast('Password must be at least 4 characters', 'error');
      return false;
    }

    const users = Storage.getRegisteredUsers();
    const existing = users.find(u => u.studentId.toLowerCase() === studentId.toLowerCase() || u.email.toLowerCase() === email.toLowerCase());

    if (existing) {
      showToast('Student ID or Email already registered. Please login.', 'error');
      return false;
    }

    const newUser = {
      name,
      studentId: studentId.toUpperCase(),
      email,
      department,
      year,
      phone,
      password,
      favouriteFood: 'Veg Burger',
      role: 'student'
    };

    users.push(newUser);
    Storage.saveRegisteredUsers(users);
    Storage.saveCurrentUser(newUser);

    showToast('Account registered successfully! ✓', 'success');
    setTimeout(() => {
      window.location.href = '/menu.html';
    }, 700);
    return true;
  },

  // Update profile
  updateProfile(formData) {
    const currentUser = Storage.getCurrentUser() || {};
    const updated = {
      ...currentUser,
      name: formData.name.trim(),
      studentId: formData.studentId.trim(),
      department: formData.department.trim(),
      year: formData.year.trim(),
      phone: formData.phone.trim(),
      favouriteFood: formData.favouriteFood ? formData.favouriteFood.trim() : currentUser.favouriteFood
    };

    Storage.saveCurrentUser(updated);
    showToast('Profile updated successfully ✓', 'success');
    AuthManager.renderProfilePage();
  },

  // Logout
  logout() {
    Storage.saveCurrentUser(null);
    showToast('Logged out successfully', 'info');
    setTimeout(() => {
      window.location.href = '/login.html';
    }, 500);
  },

  // Render profile.html
  renderProfilePage() {
    const profileContainer = document.getElementById('profileContent');
    if (!profileContainer) return;

    const user = Storage.getCurrentUser();
    if (!user) {
      window.location.href = '/login.html';
      return;
    }

    // Calculate user's total orders from order history
    const allOrders = Storage.getOrders();
    const studentOrders = allOrders.filter(o => 
      o.studentId && user.studentId && 
      o.studentId.toLowerCase() === user.studentId.toLowerCase()
    );
    const totalOrdersCount = studentOrders.length || allOrders.length; // fallback to all if matching demo

    const nameEl = document.getElementById('profileName');
    const idEl = document.getElementById('profileId');
    const deptEl = document.getElementById('profileDept');
    const yearEl = document.getElementById('profileYear');
    const phoneEl = document.getElementById('profilePhone');
    const emailEl = document.getElementById('profileEmail');
    const countEl = document.getElementById('profileOrderCount');
    const favEl = document.getElementById('profileFavFood');

    if (nameEl) nameEl.textContent = user.name;
    if (idEl) idEl.textContent = user.studentId;
    if (deptEl) deptEl.textContent = user.department;
    if (yearEl) yearEl.textContent = user.year;
    if (phoneEl) phoneEl.textContent = user.phone;
    if (emailEl) emailEl.textContent = user.email || 'student@college.edu';
    if (countEl) countEl.textContent = totalOrdersCount;
    if (favEl) favEl.textContent = user.favouriteFood || 'Veg Burger';

    // Form inputs for editing
    const form = document.getElementById('profileEditForm');
    if (form) {
      form.elements['name'].value = user.name || '';
      form.elements['studentId'].value = user.studentId || '';
      form.elements['department'].value = user.department || '';
      form.elements['year'].value = user.year || '';
      form.elements['phone'].value = user.phone || '';
      if (form.elements['favouriteFood']) {
        form.elements['favouriteFood'].value = user.favouriteFood || 'Veg Burger';
      }
    }
  }
};

// Setup Listeners for Login, Register and Profile forms
document.addEventListener('DOMContentLoaded', () => {
  // Login Form
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    const roleToggle = document.getElementById('loginRoleToggle');
    let currentRole = 'student';

    if (roleToggle) {
      roleToggle.addEventListener('change', (e) => {
        currentRole = e.target.checked ? 'admin' : 'student';
        const label = document.getElementById('roleLabel');
        if (label) label.textContent = currentRole === 'admin' ? 'Admin Login' : 'Student Login';
        const idInput = loginForm.elements['identifier'];
        if (idInput) {
          idInput.placeholder = currentRole === 'admin' ? 'admin@campusbite.com' : 'Email or Student ID (e.g. BCA2024018)';
        }
      });
    }

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const identifier = loginForm.elements['identifier'].value;
      const password = loginForm.elements['password'].value;
      AuthManager.login(identifier, password, currentRole);
    });

    // Forgot password trigger
    const forgotLink = document.getElementById('forgotPasswordLink');
    if (forgotLink) {
      forgotLink.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Password reset link sent to registered email! (Demo)', 'info');
      });
    }
  }

  // Register Form
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      AuthManager.register({
        name: registerForm.elements['name'].value,
        studentId: registerForm.elements['studentId'].value,
        email: registerForm.elements['email'].value,
        department: registerForm.elements['department'].value,
        year: registerForm.elements['year'].value,
        phone: registerForm.elements['phone'].value,
        password: registerForm.elements['password'].value,
        confirmPassword: registerForm.elements['confirmPassword'].value
      });
    });
  }

  // Profile Edit Form
  const profileEditForm = document.getElementById('profileEditForm');
  if (profileEditForm) {
    profileEditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      AuthManager.updateProfile({
        name: profileEditForm.elements['name'].value,
        studentId: profileEditForm.elements['studentId'].value,
        department: profileEditForm.elements['department'].value,
        year: profileEditForm.elements['year'].value,
        phone: profileEditForm.elements['phone'].value,
        favouriteFood: profileEditForm.elements['favouriteFood'] ? profileEditForm.elements['favouriteFood'].value : ''
      });
    });
  }

  // Logout buttons
  document.querySelectorAll('.btn-logout-action').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      AuthManager.logout();
    });
  });

  // Render profile page if on profile.html
  if (document.getElementById('profileName')) {
    AuthManager.renderProfilePage();
  }
});
