// ========== COURSES PAGE ==========

let activeFilter = 'All';

function renderCoursesPage() {
  renderFilterBar();
  renderCourseCards(COURSES);
}

function renderFilterBar() {
  const categories = ['All', ...new Set(COURSES.map(c => c.category))];
  const bar = document.getElementById('filter-bar');
  bar.innerHTML = categories.map(cat => `
    <button class="filter-btn ${cat === activeFilter ? 'active' : ''}" data-cat="${cat}">${cat}</button>
  `).join('');

  bar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      activeFilter = this.dataset.cat;
      bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filtered = activeFilter === 'All' ? COURSES : COURSES.filter(c => c.category === activeFilter);
      renderCourseCards(filtered);
    });
  });
}

function renderCourseCards(courses) {
  const grid = document.getElementById('courses-grid');
  grid.innerHTML = courses.map(c => courseCard(c)).join('');
  grid.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      navigateTo('course-detail', id);
    });
  });
}

// ========== COURSE DETAIL PAGE ==========

function renderCourseDetail(courseId) {
  const course = COURSES.find(c => c.id === courseId);
  if (!course) return;

  const enrolled = isEnrolled(courseId);
  const loggedIn = isLoggedIn();

  let subscribeBtn = '';
  if (!loggedIn) {
    subscribeBtn = `<button class="btn btn-primary" id="detail-subscribe-btn">Log in to Subscribe</button>`;
  } else if (enrolled) {
    subscribeBtn = `<button class="btn btn-outline" id="detail-subscribe-btn" style="border-color:#16a34a;color:#16a34a" title="Click to unenroll">✓ Enrolled — Click to Unenroll</button>`;
  } else {
    subscribeBtn = `<button class="btn btn-primary" id="detail-subscribe-btn">Subscribe to Course</button>`;
  }

  const sectionsHTML = course.sections.map(section => `
    <div class="section-block">
      <div class="section-block-title">${section.title}</div>
      ${section.lessons.map(lesson => `
        <div class="lesson-item">
          <span class="lesson-name">▶ ${lesson.title}</span>
          <span class="lesson-dur">${lesson.duration}</span>
        </div>
      `).join('')}
    </div>
  `).join('');

  document.getElementById('course-detail-content').innerHTML = `
    <button class="back-btn" id="back-to-courses">← Back to Courses</button>
    <div class="detail-header">
      <div class="detail-info">
        <div class="card-tag">${course.category}</div>
        <h1>${course.title}</h1>
        <p>${course.description}</p>
        <div class="detail-badges">
          <span class="badge">⏱ ${course.duration}</span>
          <span class="badge">📶 ${course.level}</span>
        </div>
        <p class="detail-instructor">Instructor: <strong>${course.instructor}</strong></p>
        ${subscribeBtn}
      </div>
      <img src="${course.image}" alt="${course.title}">
    </div>
    <h2 class="section-title" style="margin-bottom:20px">Course Content</h2>
    <div class="sections-list">${sectionsHTML}</div>
  `;

  document.getElementById('back-to-courses').addEventListener('click', () => navigateTo('courses'));

  const subBtn = document.getElementById('detail-subscribe-btn');
  if (subBtn) {
    subBtn.addEventListener('click', () => {
      if (!isLoggedIn()) {
        openModal();
      } else if (isEnrolled(courseId)) {
        unenrollCourse(courseId);
        showToast('You have been unenrolled from this course.');
        renderCourseDetail(courseId);
      } else {
        enrollCourse(courseId);
        showToast('You are now enrolled! 🎉');
        renderCourseDetail(courseId);
      }
    });
  }
}

// ========== Shared card template ==========

function courseCard(course) {
  return `
    <div class="card" data-id="${course.id}">
      <img class="card-img" src="${course.image}" alt="${course.title}" loading="lazy">
      <div class="card-body">
        <span class="card-tag">${course.category}</span>
        <div class="card-title">${course.title}</div>
        <div class="card-desc">${course.description}</div>
        <div class="card-meta">
          <span>⏱ ${course.duration}</span>
          <span>📶 ${course.level}</span>
        </div>
      </div>
    </div>
  `;
}

