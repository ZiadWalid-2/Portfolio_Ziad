/**
 * @file forms.js
 * Modal dialog management, dynamic item submission handlers, validation, and simulated contact form
 */

import { storage } from './storage.js';

export function initForms({
  onAddExperience,
  onAddSkill,
  onAddProject,
  onAddAchievement,
  onAddTestimonial,
  onAddService
}) {
  // Generic Dialog Open / Close Helpers
  const dialogs = document.querySelectorAll('dialog.app-dialog');

  // Close dialog on backdrop click or close button
  dialogs.forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      const isClickInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!isClickInside) {
        dialog.close();
      }
    });

    const closeBtn = dialog.querySelector('.dialog-close-btn');
    closeBtn?.addEventListener('click', () => dialog.close());
  });

  // Modal Triggers
  const openButtons = [
    { btnId: '#btn-open-experience-modal', dialogId: '#dialog-add-experience' },
    { btnId: '#btn-open-skill-modal', dialogId: '#dialog-add-skill' },
    { btnId: '#btn-open-project-modal', dialogId: '#dialog-add-project' },
    { btnId: '#btn-open-achievement-modal', dialogId: '#dialog-add-achievement' },
    { btnId: '#btn-open-testimonial-modal', dialogId: '#dialog-add-testimonial' },
    { btnId: '#btn-open-service-modal', dialogId: '#dialog-add-service' }
  ];

  openButtons.forEach(({ btnId, dialogId }) => {
    const btn = document.querySelector(btnId);
    const dialog = document.querySelector(dialogId);
    btn?.addEventListener('click', () => {
      dialog?.showModal();
      const firstInput = dialog?.querySelector('input, textarea, select');
      firstInput?.focus();
    });
  });

  /* --------------------------------------------------------------------------
     1. Add Experience Form
  -------------------------------------------------------------------------- */
  const expForm = document.querySelector('#form-add-experience');
  const expDialog = document.querySelector('#dialog-add-experience');
  const presentCheckbox = document.querySelector('#exp-present');
  const endYearInput = document.querySelector('#exp-end-year');

  presentCheckbox?.addEventListener('change', (e) => {
    if (endYearInput) {
      endYearInput.disabled = e.target.checked;
      if (e.target.checked) endYearInput.value = '';
    }
  });

  expForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(expForm);
    const workName = String(formData.get('workName') || '').trim();
    const role = String(formData.get('role') || '').trim();
    const startYear = String(formData.get('startYear') || '').trim();
    const endYear = String(formData.get('endYear') || '').trim();
    const isPresent = formData.get('present') === 'on';
    const description = String(formData.get('description') || '').trim();

    if (!workName || !role || !startYear) {
      alert('Please fill in Work Name, Role, and Start Year.');
      return;
    }

    const newExp = {
      id: `exp-${Date.now()}`,
      workName,
      role,
      startYear,
      endYear: isPresent ? 'Present' : endYear,
      present: isPresent,
      description
    };

    onAddExperience(newExp);
    expForm.reset();
    if (endYearInput) endYearInput.disabled = false;
    expDialog?.close();
  });

  /* --------------------------------------------------------------------------
     2. Add Skill Form
  -------------------------------------------------------------------------- */
  const skillForm = document.querySelector('#form-add-skill');
  const skillDialog = document.querySelector('#dialog-add-skill');

  skillForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(skillForm);
    const name = String(formData.get('skillName') || '').trim();
    const category = String(formData.get('category') || 'Graphic Design').trim();
    const description = String(formData.get('description') || '').trim();

    if (!name) return;

    onAddSkill({
      id: `sk-${Date.now()}`,
      name,
      category,
      description
    });

    skillForm.reset();
    skillDialog?.close();
  });

  /* --------------------------------------------------------------------------
     3. Add Project Form
  -------------------------------------------------------------------------- */
  const projectForm = document.querySelector('#form-add-project');
  const projectDialog = document.querySelector('#dialog-add-project');

  projectForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(projectForm);
    const name = String(formData.get('projectName') || '').trim();
    const image = String(formData.get('image') || '').trim();
    const url = String(formData.get('url') || '').trim();
    const category = String(formData.get('category') || '').trim();
    const description = String(formData.get('description') || '').trim();

    if (!name) return;

    // Validate URL if provided
    if (url) {
      try {
        new URL(url);
      } catch {
        alert('Please provide a valid URL including http:// or https://');
        return;
      }
    }

    onAddProject({
      id: `proj-${Date.now()}`,
      name,
      image: image || 'assets/images/project-placeholder.svg',
      url,
      category,
      description
    });

    projectForm.reset();
    projectDialog?.close();
  });

  /* --------------------------------------------------------------------------
     4. Add Achievement Form
  -------------------------------------------------------------------------- */
  const achForm = document.querySelector('#form-add-achievement');
  const achDialog = document.querySelector('#dialog-add-achievement');

  achForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(achForm);
    const title = String(formData.get('title') || '').trim();
    const image = String(formData.get('image') || '').trim();
    const source = String(formData.get('source') || '').trim();
    const date = String(formData.get('date') || '').trim();
    const description = String(formData.get('description') || '').trim();

    if (!title) return;

    onAddAchievement({
      id: `ach-${Date.now()}`,
      title,
      image,
      source,
      date,
      description
    });

    achForm.reset();
    achDialog?.close();
  });

  /* --------------------------------------------------------------------------
     5. Add Testimonial Form (With 1-5 Star Selection, Default 5)
  -------------------------------------------------------------------------- */
  const testForm = document.querySelector('#form-add-testimonial');
  const testDialog = document.querySelector('#dialog-add-testimonial');
  const starStars = document.querySelectorAll('.star-rating-selector span');
  const ratingInput = document.querySelector('#testimonial-rating');

  // Star selector interaction
  function setStarVisual(rating) {
    starStars.forEach((star) => {
      const val = Number(star.getAttribute('data-value'));
      if (val <= rating) {
        star.classList.add('is-active');
        star.textContent = '★';
      } else {
        star.classList.remove('is-active');
        star.textContent = '☆';
      }
    });
  }

  starStars.forEach((star) => {
    star.addEventListener('click', () => {
      const val = Number(star.getAttribute('data-value')) || 5;
      if (ratingInput) ratingInput.value = String(val);
      setStarVisual(val);
    });
  });

  // Default to 5 stars
  setStarVisual(5);

  testForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(testForm);
    const name = String(formData.get('personName') || '').trim();
    const role = String(formData.get('role') || '').trim();
    const company = String(formData.get('company') || '').trim();
    const feedback = String(formData.get('feedback') || '').trim();
    const rating = Number(formData.get('rating')) || 5;

    if (!name || !feedback) return;

    onAddTestimonial({
      id: `test-${Date.now()}`,
      name,
      role,
      company,
      feedback,
      rating
    });

    testForm.reset();
    setStarVisual(5);
    if (ratingInput) ratingInput.value = '5';
    testDialog?.close();
  });

  /* --------------------------------------------------------------------------
     6. Add Service Form
  -------------------------------------------------------------------------- */
  const srvForm = document.querySelector('#form-add-service');
  const srvDialog = document.querySelector('#dialog-add-service');

  srvForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(srvForm);
    const name = String(formData.get('serviceName') || '').trim();
    const icon = String(formData.get('icon') || '✨').trim();
    const description = String(formData.get('description') || '').trim();

    if (!name) return;

    onAddService({
      id: `srv-${Date.now()}`,
      name,
      icon,
      description
    });

    srvForm.reset();
    srvDialog?.close();
  });

  /* --------------------------------------------------------------------------
     7. Contact Form Simulation
     Validates inputs, simulates async delivery, renders accessible feedback.
     ==========================================================================
     BACKEND INTEGRATION NOTICE:
     To connect a live email backend:
     Option A: Formspree / EmailJS:
       Replace the simulated setTimeout with fetch('https://formspree.io/f/YOUR_ID', {
         method: 'POST',
         body: formData,
         headers: { 'Accept': 'application/json' }
       });
     Option B: Node.js / Express / Next.js API route:
       fetch('/api/contact', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ name, email, message })
       });
     ==========================================================================
  -------------------------------------------------------------------------- */
  const contactForm = document.querySelector('#contact-form');
  const contactAlert = document.querySelector('#contact-alert');
  const submitBtn = contactForm?.querySelector('button[type="submit"]');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = contactForm.querySelector('#contact-name');
    const emailInput = contactForm.querySelector('#contact-email');
    const messageInput = contactForm.querySelector('#contact-message');

    const name = nameInput?.value.trim();
    const email = emailInput?.value.trim();
    const message = messageInput?.value.trim();

    // Reset error states
    contactForm.querySelectorAll('.form-group').forEach((g) => g.classList.remove('has-error'));

    let hasError = false;
    if (!name) {
      nameInput?.closest('.form-group')?.classList.add('has-error');
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      emailInput?.closest('.form-group')?.classList.add('has-error');
      hasError = true;
    }

    if (!message) {
      messageInput?.closest('.form-group')?.classList.add('has-error');
      hasError = true;
    }

    if (hasError) return;

    // Simulate sending state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending message...';
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }

      contactForm.reset();

      if (contactAlert) {
        contactAlert.hidden = false;
        contactAlert.innerHTML = `
          <span class="alert-toast-icon" aria-hidden="true">✓</span>
          <div>
            <strong>Thank you, ${escapeString(name)}!</strong>
            <p>Your message has been received (simulation). Ziad will respond to you at <em>${escapeString(email)}</em> promptly.</p>
          </div>
        `;
        contactAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 700);
  });
}

function escapeString(val) {
  return String(val).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}
