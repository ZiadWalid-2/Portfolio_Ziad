# Ziad Walid - Freelance Motion Graphic Designer Portfolio

A personal portfolio website for **Ziad Walid**, designed with a calm, sea/breeze-inspired aesthetic (soft oceanic teals, marine slates, subtle glassmorphism, responsive CSS Grid/Flexbox, WCAG-compliant accessibility, and native Light/Dark mode).

---

## 🌊 Design & Tech Stack

- **HTML5**: Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<dialog>`, `<footer>`) with accessible ARIA attributes.
- **Vanilla CSS**: Custom CSS properties (`css/variables.css`), modular architecture (`base.css`, `layout.css`, `components.css`, `responsive.css`), zero framework bloat.
- **Vanilla JavaScript (ES Modules)**: Data-driven UI rendering, dynamic modals, and safe localStorage persistence.
- **TypeScript Architecture**: Fully typed data models and component signatures ready in `ts/types.ts`, `ts/data.ts`, and `ts/components.ts`.
- **Sea-Breeze Aesthetic**: Oceanic teal palette (`#1b7a7c`, `#4ec2ba`), crisp light mode, deep marine slate dark mode, subtle ambient background shapes.

---

## 📁 File Structure

```text
ziad-portfolio/
│
├── index.html                  # Accessible semantic markup with all 10 sections & modals
├── README.md                   # Project documentation & run guide
│
├── assets/
│   ├── images/
│   │   ├── profile-placeholder.svg / .jpg
│   │   ├── about-placeholder.svg / .jpg
│   │   ├── project-placeholder.svg / .jpg
│   │   └── achievement-placeholder.svg / .jpg
│   └── cv/
│       └── ziad-walid-cv.pdf   # Initial CV placeholder file
│
├── css/
│   ├── variables.css           # Sea/breeze color tokens, typography, radii, shadows, light & dark mode
│   ├── base.css                # Reset, font imports, focus styles, smooth scrolling, reduced motion
│   ├── layout.css              # Header, footer, grid system, containers, responsive structure
│   ├── components.css          # Cards, buttons, dialogs/modals, badges, form controls, star ratings
│   └── responsive.css          # Breakpoints (320px, 480px, 768px, 1024px, 1280px+) & RTL rules
│
├── js/
│   ├── storage.js              # Safe LocalStorage wrapper with fallback handling
│   ├── theme.js                # System preference detection, toggle button, aria sync
│   ├── navigation.js           # Sticky header, mobile hamburger, smooth scrolling, active link observer
│   ├── components.js           # Pure render functions for cards, empty states, star rating renderers
│   ├── forms.js                # Dialog handlers, validations, dynamic add forms, simulated contact
│   └── app.js                  # Central data store, initialization, event delegation
│
└── ts/
    ├── types.ts                # TypeScript interfaces (Experience, Skill, Project, Achievement, etc.)
    ├── data.ts                 # Initial portfolioData with strict types
    └── components.ts           # Type-checked component signatures
```

---

## 🚀 Running Locally

### Option A: Direct or Simple Static Server (No build step required)

Since this project uses native modern ES modules and Vanilla CSS, you can serve it with any HTTP server:

```bash
# Using Python 3 (built-in)
python -m http.server 5500

# Using Node.js npx serve (if node is available)
npx serve .

# Or open index.html directly in any modern browser supporting ES modules!
```
Then navigate to `http://localhost:5500`.

### Option B: Vite + TypeScript (Future Migration)

To build this project with Vite:
1. Initialize Vite:
   ```bash
   npm init vite@latest ./ -- --template vanilla-ts
   npm install
   npm run dev
   ```
2. Build for production:
   ```bash
   npm run build
   ```
   Production artifacts will be generated in the `dist/` directory.

---

## ⚙️ Configuration & Customization

### 1. Social URLs
In `js/app.js` and `index.html`, replace the placeholder URLs:
- **Facebook**: `[INSERT EXACT FACEBOOK URL HERE]`
- **GitHub**: `[INSERT EXACT GITHUB URL HERE]`
- **LinkedIn**: `https://www.linkedin.com/in/zeyad-walled` (Already active)

### 2. About Me Bio
In `index.html` and `js/app.js`, replace `[INSERT EXACT ABOUT ME BIO HERE]` with Ziad's exact biographical statement.

### 3. Official CV
Replace `assets/cv/ziad-walid-cv.pdf` with the official exported PDF document.

### 4. Contact Form Backend Integration
The contact form currently performs client-side validation and renders an accessible success toast. To wire up an automated backend service, refer to the comments in `js/forms.js`:
- **Formspree / Resend / EmailJS**: Replace the `setTimeout` simulation in `js/forms.js` with an async `fetch()` request to your API endpoint.

---

## ✅ Verified Testing Checklist

- [x] **Navigation**: Sticky header, smooth scrolling, and active section highlighting.
- [x] **Mobile Menu**: Responsive hamburger toggle with `aria-expanded` and focus trap.
- [x] **Dark Mode**: System-aware with persistent localStorage state and accessible button.
- [x] **Escape Key**: Automatically closes mobile navigation and dialog modals.
- [x] **Add Experience**: Dynamic validation, live card rendering, and localStorage persistence.
- [x] **Add Project**: Modal dialog with URL validation and empty-state toggle.
- [x] **Add Testimonial**: People Feedback header (bold), interactive 1–5 star rating selector.
- [x] **Contact Form**: Validates inputs, shows accessible simulated response message.
- [x] **Direct Contacts**: Verified Egyptian WhatsApp link (`https://wa.me/201020112597`), `mailto:`, and phone.
- [x] **Responsive Layout**: Tested across 320px, 480px, 768px, 1024px, and desktop widths.
- [x] **Accessibility**: WCAG skip-link, keyboard `:focus-visible` rings, reduced-motion queries.
