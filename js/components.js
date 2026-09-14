/**
 * @file components.js
 * Reusable UI renderers and templates with HTML sanitization
 */

/**
 * Escape HTML to prevent XSS vulnerabilities
 * @param {string | number | undefined | null} value 
 * @returns {string}
 */
export function escapeHTML(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

/**
 * Render Education cards
 * @param {Array} items 
 * @param {HTMLElement} container 
 */
export function renderEducation(items, container) {
  if (!container) return;

  container.innerHTML = items.map((edu) => `
    <article class="card timeline-card reveal">
      <div class="timeline-icon-box" aria-hidden="true">🎓</div>
      <div class="timeline-body">
        <div class="timeline-header">
          <h3 class="timeline-title">${escapeHTML(edu.university)}</h3>
          <span class="timeline-date-badge">${escapeHTML(edu.startYear)} – ${escapeHTML(edu.endYear || '')}</span>
        </div>
        <div class="timeline-subtitle">${escapeHTML(edu.program)} • ${escapeHTML(edu.degree)}</div>
        <div class="timeline-meta-row">
          <span><strong>Grade:</strong> ${escapeHTML(edu.grade)}</span>
        </div>
        ${edu.description ? `<p class="timeline-desc">${escapeHTML(edu.description)}</p>` : ''}
      </div>
    </article>
  `).join('');
}

/**
 * Render Experience cards
 * @param {Array} items 
 * @param {HTMLElement} container 
 */
export function renderExperiences(items, container) {
  if (!container) return;

  container.innerHTML = items.map((exp) => {
    const dateText = exp.present
      ? `${escapeHTML(exp.startYear)} – Present`
      : `${escapeHTML(exp.startYear)} – ${escapeHTML(exp.endYear || '')}`;

    return `
      <article class="card timeline-card reveal">
        <div class="timeline-icon-box" aria-hidden="true">💼</div>
        <div class="timeline-body">
          <div class="timeline-header">
            <h3 class="timeline-title">${escapeHTML(exp.workName)}</h3>
            <span class="timeline-date-badge">${dateText}</span>
          </div>
          <div class="timeline-subtitle">${escapeHTML(exp.role)}</div>
          ${exp.description ? `<p class="timeline-desc">${escapeHTML(exp.description)}</p>` : ''}
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Render Categorized Skills
 * @param {Array} items 
 * @param {HTMLElement} container 
 */
export function renderSkills(items, container) {
  if (!container) return;

  // Group skills by category
  const categories = {};
  items.forEach((skill) => {
    const cat = skill.category || 'General';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(skill);
  });

  const categoryIcons = {
    'Soft Skills': '🤝',
    'Tools & Office': '💻',
    'Motion Graphics': '🎬',
    'Graphic Design': '🎨',
    'General': '✨'
  };

  container.innerHTML = Object.entries(categories).map(([category, skillList]) => `
    <article class="card skill-category-card reveal">
      <div class="skill-category-header">
        <span class="skill-category-icon" aria-hidden="true">${categoryIcons[category] || '⚡'}</span>
        <h3 class="skill-category-title">${escapeHTML(category)}</h3>
      </div>
      <div class="skill-badges-container">
        ${skillList.map((s) => `
          <span class="skill-pill" title="${escapeHTML(s.description || '')}">
            ${escapeHTML(s.name)}
          </span>
        `).join('')}
      </div>
    </article>
  `).join('');
}

/**
 * Render Projects with empty-state handling
 * @param {Array} items 
 * @param {HTMLElement} container 
 * @param {HTMLElement} emptyContainer 
 */
export function renderProjects(items, container, emptyContainer) {
  if (!container) return;

  if (items.length === 0) {
    if (emptyContainer) emptyContainer.hidden = false;
    container.innerHTML = '';
    return;
  }

  if (emptyContainer) emptyContainer.hidden = true;

  container.innerHTML = items.map((proj) => `
    <article class="project-card reveal">
      <div class="project-thumb-box">
        <img 
          src="${escapeHTML(proj.image || 'assets/images/project-placeholder.svg')}" 
          alt="${escapeHTML(proj.name)} project preview" 
          loading="lazy"
        />
      </div>
      <div class="project-body">
        ${proj.category ? `<span class="project-category">${escapeHTML(proj.category)}</span>` : ''}
        <h3 class="project-title">${escapeHTML(proj.name)}</h3>
        ${proj.description ? `<p class="project-desc">${escapeHTML(proj.description)}</p>` : ''}
        <div class="project-footer">
          ${proj.url ? `
            <a href="${escapeHTML(proj.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
              View Project <span>→</span>
            </a>
          ` : '<span class="text-muted">Direct Preview</span>'}
        </div>
      </div>
    </article>
  `).join('');
}

/**
 * Render Achievements with empty-state handling
 * @param {Array} items 
 * @param {HTMLElement} container 
 * @param {HTMLElement} emptyContainer 
 */
export function renderAchievements(items, container, emptyContainer) {
  if (!container) return;

  if (items.length === 0) {
    if (emptyContainer) emptyContainer.hidden = false;
    container.innerHTML = '';
    return;
  }

  if (emptyContainer) emptyContainer.hidden = true;

  container.innerHTML = items.map((ach) => `
    <article class="card achievement-card reveal">
      ${ach.image ? `
        <div class="achievement-thumb">
          <img src="${escapeHTML(ach.image)}" alt="${escapeHTML(ach.title)}" loading="lazy" />
        </div>
      ` : ''}
      <h3 class="achievement-title">${escapeHTML(ach.title)}</h3>
      ${ach.source ? `<div class="achievement-source">${escapeHTML(ach.source)} ${ach.date ? `• ${escapeHTML(ach.date)}` : ''}</div>` : ''}
      ${ach.description ? `<p>${escapeHTML(ach.description)}</p>` : ''}
    </article>
  `).join('');
}

/**
 * Render Testimonials ("People Feedback") with star ratings and empty state
 * @param {Array} items 
 * @param {HTMLElement} container 
 * @param {HTMLElement} emptyContainer 
 */
export function renderTestimonials(items, container, emptyContainer) {
  if (!container) return;

  if (items.length === 0) {
    if (emptyContainer) emptyContainer.hidden = false;
    container.innerHTML = '';
    return;
  }

  if (emptyContainer) emptyContainer.hidden = true;

  container.innerHTML = items.map((t) => {
    const rating = Math.min(5, Math.max(1, Number(t.rating) || 5));
    const starsHtml = Array.from({ length: 5 }, (_, i) => 
      `<span class="${i < rating ? 'star-filled' : 'star-empty'}" aria-hidden="true">★</span>`
    ).join('');

    const initial = escapeHTML((t.name || 'U').charAt(0).toUpperCase());

    return `
      <article class="card testimonial-card reveal">
        <div class="star-rating-display" aria-label="${rating} out of 5 stars">
          ${starsHtml}
        </div>
        <p class="testimonial-quote">${escapeHTML(t.feedback)}</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar" aria-hidden="true">${initial}</div>
          <div class="author-info">
            <h4>${escapeHTML(t.name)}</h4>
            <p>${escapeHTML(t.role || 'Client')} ${t.company ? `• ${escapeHTML(t.company)}` : ''}</p>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Render Services Grid
 * @param {Array} items 
 * @param {HTMLElement} container 
 */
export function renderServices(items, container) {
  if (!container) return;

  container.innerHTML = items.map((service) => `
    <article class="card service-card reveal">
      <div class="service-icon-box" aria-hidden="true">${escapeHTML(service.icon || '✨')}</div>
      <h3 class="service-name">${escapeHTML(service.name)}</h3>
      ${service.description ? `<p class="service-desc">${escapeHTML(service.description)}</p>` : ''}
    </article>
  `).join('');
}
