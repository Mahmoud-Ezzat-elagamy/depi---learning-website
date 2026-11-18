// ========== APP / ROUTER ==========

let currentPage = 'home';
let currentCourseId = null;

function navigateTo(page, courseId) {
  currentPage = page;
  currentCourseId = courseId || null;

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  const target = document.getElementById(`page-${page}`);
  if (target) target.classList.add('active');

  const navLink = document.querySelector(`.nav-links a[data-page="${page}"]`);
  if (navLink) navLink.classList.add('active');

  if (page === 'home') renderHome();
  if (page === 'courses') renderCoursesPage();
  if (page === 'course-detail') renderCourseDetail(currentCourseId);
  if (page === 'profile') renderProfilePage();

  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeNav();
}

function updateNavProfile() {
  const link = document.getElementById('nav-profile-link');
  if (isLoggedIn()) {
    const user = getLoggedInUser();
    link.textContent = user ? user.name.split(' ')[0] : 'Profile';
    link.dataset.page = 'profile';
  } else {
    link.textContent = 'Login';
    link.dataset.page = '__login__';
  }
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function closeNav() {
  document.getElementById('nav-links').classList.remove('open');
}

function setupNav() {
  document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const page = this.getAttribute('data-page');
      if (page === '__login__') {
        openModal();
      } else {
        navigateTo(page);
      }
    });
  });

  document.getElementById('nav-toggle').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('open');
  });
}

function setupBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 280) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========== INIT ==========

document.addEventListener('DOMContentLoaded', () => {
  setupNav();
  setupAuth();
  setupContact();
  setupBackToTop();
  updateNavProfile();
  navigateTo('home');
});

