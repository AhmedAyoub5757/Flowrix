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

## Deploy to Vercel

### Option 1: Deploy through the Vercel dashboard

1. Push the project to GitHub, GitLab, or Bitbucket.
2. Sign in at [vercel.com](https://vercel.com).
3. Select **Add New Project**.
4. Import the repository containing Flowrix.
5. Confirm the project settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
6. No environment variables are required for the current project.
7. Select **Deploy**.
8. Open the generated Vercel URL and test the navigation, mobile menu, carousel, contact form UI, and smooth scrolling.

Vercel automatically creates preview deployments for pull requests and a production deployment for the configured production branch.

### Option 2: Deploy with the Vercel CLI

Install the CLI and authenticate:

```bash
npm install --global vercel
vercel login
```

From the project root, create a preview deployment:

```bash
vercel
```

For the production deployment:

```bash
vercel --prod
```

When prompted, use these values:

- Link to an existing project or create a new one.
- Select the current project directory.
- Keep the detected Vite settings.
- Use `dist` as the output directory if Vercel asks.

### Optional custom domain

1. Open the Vercel project.
2. Go to **Settings → Domains**.
3. Add the domain.
4. Apply the DNS records Vercel provides.
5. Wait for DNS and SSL verification to complete.

Update the canonical and social URLs in [index.html](./index.html) if the production domain differs from `https://flowrix.studio/`.

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
