# Flowrix

Flowrix is a responsive creative-agency landing page built with React and Vite. It includes animated sections, a responsive navigation system, smooth scrolling, a Swiper works carousel, a WebGL testimonial globe, local fonts, WebP assets, and accessibility-focused form controls.

## Tech stack

- React 19
- Vite
- Tailwind CSS with PostCSS
- Framer Motion
- Lenis
- Swiper
- AOS
- Lucide React
- cobe WebGL globe
- Fontsource local fonts

## Requirements

- Node.js 18 or newer
- npm

## Run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run lint checks:

```bash
npm run lint
```

## Performance audit

The latest Lighthouse audit results are:

| Device | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Mobile | 87 | 95 | 100 | 100 |
| Desktop | 99 | 95 | 100 | 100 |

Performance work includes local Tailwind and fonts, tree-shaken Lucide icons, WebP image assets, responsive image loading, deferred below-the-fold sections, lazy-loaded heavy libraries, and viewport-aware animation initialization.

## Project structure

```text
src/
  components/       Page sections and shared UI
  lib/              Smooth-scroll utilities
  App.jsx           Application shell and deferred sections
  index.css         Tailwind entrypoint and global styles
  main.jsx          React entrypoint and local font imports
public/
  assets/           WebP images and branding assets
  robots.txt        Crawler directives
```

## Notes

- The site uses hash navigation such as `#home`, `#about`, and `#contact`.
- The current forms are presentation/UI forms and do not submit data to a backend.
- Images are served from `public/assets`, so paths should begin with `/assets/`.
