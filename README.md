# Shikhar Portfolio

Professional React portfolio for a full-stack product engineer. The site uses Vite, React Router, Tailwind CSS, Framer Motion, GSAP, Lenis, and a lightweight animated interface system.

## Features

- Multi-page portfolio: home, about, projects, case studies, skills, experience, services, resume, articles, and not found.
- Responsive visual system with light and dark themes.
- Native-friendly cursor aura that keeps normal pointer and text-input behavior.
- Animated hero command center, scroll reveals, project visuals, route transitions, and smooth scrolling.
- SEO component per page.
- Social-first connection flow using GitHub, LinkedIn, X, and email links.
- Vercel and Netlify SPA routing config included.

## Local Development

```bash
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

## Quality Checks

```bash
npm run lint
npm run build
```

Use `npm.cmd` instead of `npm` on Windows if PowerShell blocks the npm script shim.

## Deploy To Vercel

1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. Use the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

The included `vercel.json` rewrites all routes to `index.html`, so direct project and page URLs work.

## Deploy To Netlify

1. Push this repository to GitHub.
2. Create a new Netlify site from the repository.
3. Use:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy.

The included `netlify.toml` and `public/_redirects` handle React Router fallback routing.
