# Orra Pod Product Experience

Single-page cinematic product site for a futuristic modular pod company, built with Next.js App Router, Tailwind CSS, Framer Motion, and React Three Fiber.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

## Project structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  3d/
    pod-canvas.tsx
    pod-model.tsx
    pod-preview.tsx
    scene-environment.tsx
  experience/
    contact-stage.tsx
    guided-decision-stage.tsx
    hero-section.tsx
    immersive-transition.tsx
    pod-experience.tsx
    progress-dock.tsx
    story-panel.tsx
    summary-stage.tsx
  ui/
    glow-button.tsx
    option-card.tsx
lib/
  configurator-data.ts
  pricing.ts
  site-content.ts
  utils.ts
public/
  placeholder-desert.svg
  placeholder-forest.svg
  placeholder-sanctuary.svg
  placeholder-urban.svg
types/
  configurator.ts
```

## Replace later

### 3D model

- Replace the placeholder geometry in `components/3d/pod-model.tsx`.
- Keep the same props (`size`, `finish`, `windowStyle`, `lighting`) so real GLB assets can plug into the existing state and UI.
- For automatic live loading, place your file at `public/models/pod-model.glb`.
- Local upload path: `C:\Users\Ege Yener\Projects\pod-project\public\models\pod-model.glb`
- Local asset URL while the dev server is running: `http://localhost:3010/models/pod-model.glb`

### Text content

- Update hero and transition copy in `lib/site-content.ts`.
- Update option labels, story sections, and guided microcopy in `lib/configurator-data.ts`.

### Images

- Swap the placeholder SVGs in `public/` with real photography or renders.
- The story sections and environment cards already point to those files, so replacements are drop-in.

## Notes

- Contact flow is front-end only right now. Wire `components/experience/contact-stage.tsx` to a CRM, email service, or API route when ready.
- The content/state split is set up so future CMS-driven sections or SEO routes can reuse the same data patterns.
