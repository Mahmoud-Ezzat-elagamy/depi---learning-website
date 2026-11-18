// ========== AUTH ==========

function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function getLoggedInUser() {
  const name = localStorage.getItem('loggedInUser');
  if (!name) return null;
  return getUsers().find(u => u.email === name) || null;
}

function loginUser(email) {
  localStorage.setItem('loggedInUser', email);
  localStorage.setItem('loggedin', 'true');
}

function logoutUser() {
  localStorage.removeItem('loggedInUser');
  localStorage.removeItem('loggedin');
}

function isLoggedIn() {
  return localStorage.getItem('loggedin') === 'true';
}

function registerUser(name, email, password) {
  const users = getUsers();
  if (users.find(u => u.email === email)) return false;
  users.push({ name, email, password, enrolledCourses: [] });
  saveUsers(users);
  return true;
}

function validateLogin(email, password) {
  const users = getUsers();
  return users.find(u => u.email === email && u.password === password) || null;
}

function getUserEnrolledCourses() {
  const user = getLoggedInUser();
  if (!user) return [];
  return user.enrolledCourses || [];
}

function enrollCourse(courseId) {
  const users = getUsers();
  const email = localStorage.getItem('loggedInUser');
  const idx = users.findIndex(u => u.email === email);
  if (idx === -1) return false;
  if (!users[idx].enrolledCourses) users[idx].enrolledCourses = [];
  if (users[idx].enrolledCourses.includes(courseId)) return false;
  users[idx].enrolledCourses.push(courseId);
  saveUsers(users);
  return true;
}

function unenrollCourse(courseId) {
  const users = getUsers();
  const email = localStorage.getItem('loggedInUser');
  const idx = users.findIndex(u => u.email === email);
  if (idx === -1) return false;
  users[idx].enrolledCourses = (users[idx].enrolledCourses || []).filter(id => id !== courseId);
  saveUsers(users);
  return true;
}

function isEnrolled(courseId) {
  return getUserEnrolledCourses().includes(courseId);
}

// ========== Modal ==========

function openModal() {
  document.getElementById('auth-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('auth-modal').classList.add('hidden');
  clearAuthErrors();
}

function clearAuthErrors() {
  document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
}

function switchTab(tab) {
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.add('hidden'));
  document.querySelector(`.modal-tab[data-tab="${tab}"]`).classList.add('active');
  document.getElementById(`form-${tab}`).classList.remove('hidden');
  clearAuthErrors();
}

function setupAuth() {
  document.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('auth-modal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });

  document.getElementById('form-login').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('[name="email"]').value.trim();
    const pass = this.querySelector('[name="password"]').value;
    const user = validateLogin(email, pass);
    if (!user) {
      this.querySelector('.form-error').textContent = 'Incorrect email or password.';
      return;
    }
    loginUser(email);
    closeModal();
    updateNavProfile();
    showToast(`Welcome back, ${user.name}!`);
  });

  document.getElementById('form-register').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('[name="name"]').value.trim();
    const email = this.querySelector('[name="email"]').value.trim();
    const pass = this.querySelector('[name="password"]').value;
    if (name.length < 2) {
      this.querySelector('.form-error').textContent = 'Name is too short.';
      return;
    }
    if (!email.includes('@')) {
      this.querySelector('.form-error').textContent = 'Enter a valid email.';
      return;
    }
    if (pass.length < 6) {
      this.querySelector('.form-error').textContent = 'Password must be at least 6 characters.';
      return;
    }
    const ok = registerUser(name, email, pass);
    if (!ok) {
      this.querySelector('.form-error').textContent = 'Email already registered.';
      return;
    }
    loginUser(email);
    closeModal();
    updateNavProfile();
    showToast(`Account created! Welcome, ${name}.`);
  });
}

