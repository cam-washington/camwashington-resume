// form-validation.js
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
  const showError = (input, message) => {
    const err = document.getElementById(`${input.id}-error`);
    input.setAttribute('aria-invalid', 'true');
    err.textContent = message;
  };
  const clearError = (input) => {
    const err = document.getElementById(`${input.id}-error`);
    input.removeAttribute('aria-invalid');
    err.textContent = '';
  };

  const validateField = (field) => {
    if (!field.checkValidity()) {
      if (field.validity.valueMissing) return 'This field is required.';
      if (field.validity.typeMismatch) return 'Please enter a valid value.';
      if (field.validity.tooShort) return `Please enter at least ${field.minLength} characters.`;
    }
    return '';
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    let hasError = false;
    for (const el of [form.name, form.email, form.message]) {
      const msg = validateField(el);
      if (msg) { showError(el, msg); hasError = true; } else clearError(el);
    }
    if (hasError) return;

    // simulate async submission (replace with real endpoint)
    status.textContent = 'Sending…';
    try {
      // Example: send to server endpoint
      // await fetch('/api/contact', { method:'POST', body: data });
      await new Promise(r => setTimeout(r, 700));
      status.textContent = 'Message sent — thank you!';
      form.reset();
    } catch (err) {
      status.textContent = 'Failed to send. Please try again later.';
    }
  });

  // live validation
  form.addEventListener('input', (e) => {
    const msg = validateField(e.target);
    if (msg) showError(e.target, msg); else clearError(e.target);
  });
}
