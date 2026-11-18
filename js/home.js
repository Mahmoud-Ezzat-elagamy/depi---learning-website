// ========== HOME PAGE ==========

function renderHome() {
  renderFeaturedCourses();
  renderQA();
}

function renderFeaturedCourses() {
  const grid = document.getElementById('home-courses-grid');
  const featured = COURSES.slice(0, 3);
  grid.innerHTML = featured.map(c => courseCard(c)).join('');
  grid.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      navigateTo('course-detail', id);
    });
  });
}

function renderQA() {
  const list = document.getElementById('qa-list');
  list.innerHTML = QA.map((item, i) => `
    <div class="qa-item">
      <button class="qa-question" data-idx="${i}">
        ${item.question}
        <span class="arrow">▼</span>
      </button>
      <div class="qa-answer" id="qa-answer-${i}">${item.answer}</div>
    </div>
  `).join('');

  list.querySelectorAll('.qa-question').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = this.dataset.idx;
      const answer = document.getElementById(`qa-answer-${idx}`);
      const isOpen = answer.classList.contains('open');
      // close all
      list.querySelectorAll('.qa-answer').forEach(a => a.classList.remove('open'));
      list.querySelectorAll('.qa-question').forEach(b => b.classList.remove('open'));
      if (!isOpen) {
        answer.classList.add('open');
        this.classList.add('open');
      }
    });
  });
}

