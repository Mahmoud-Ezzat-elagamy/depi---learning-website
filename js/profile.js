// ========== PROFILE PAGE ==========

function renderProfilePage() {
  const user = getLoggedInUser();
  if (!user) {
    document.getElementById('profile-content').innerHTML = `
      <div class="empty-state">
        <p>You are not logged in.</p>
        <button class="btn btn-primary" onclick="openModal()">Login / Register</button>
      </div>
    `;
    return;
  }

  const enrolled = getUserEnrolledCourses();
  const enrolledCourses = COURSES.filter(c => enrolled.includes(c.id));

  let coursesHTML = '';
  if (enrolledCourses.length === 0) {
    coursesHTML = `
      <div class="empty-state">
        <p>You haven't enrolled in any course yet.</p>
        <button class="btn btn-primary" onclick="navigateTo('courses')">Browse Courses</button>
      </div>
    `;
  } else {
    coursesHTML = `<div class="cards-grid">${enrolledCourses.map(c => courseCard(c)).join('')}</div>`;
  }

  document.getElementById('profile-content').innerHTML = `
    <div class="profile-header">
      <div class="container">
        <h1>Hello, ${user.name} 👋</h1>
        <p>${user.email}</p>
      </div>
    </div>
    <div class="container">
      <div class="profile-section-title">My Enrolled Courses</div>
      ${coursesHTML}
      <div style="margin-top: 32px;">
        <button class="btn btn-outline btn-sm" id="logout-btn">Log Out</button>
      </div>
    </div>
  `;

  document.getElementById('logout-btn').addEventListener('click', () => {
    logoutUser();
    updateNavProfile();
    showToast('You have been logged out.');
    renderProfilePage();
  });

  document.querySelectorAll('#profile-content .card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      navigateTo('course-detail', id);
    });
  });
}

