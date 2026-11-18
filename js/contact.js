// ========== CONTACT PAGE ==========

function setupContact() {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('[name="name"]').value.trim();
    const email = this.querySelector('[name="email"]').value.trim();
    const msg = this.querySelector('[name="message"]').value.trim();

    if (!name || !email || !msg) return;

    document.getElementById('contact-success').classList.remove('hidden');
    this.reset();

    setTimeout(() => {
      document.getElementById('contact-success').classList.add('hidden');
    }, 4000);
  });
}

