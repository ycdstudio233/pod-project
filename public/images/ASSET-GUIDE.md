# Image Asset Guide

Drop your real photos here to replace the placeholder artwork.
Use JPG, PNG, or WebP for photos.

## Story Panel Backgrounds

These are the cinematic full-screen backgrounds used in the narrative sections.
Aim for moody, editorial compositions with the pod grounded in a believable site.

| File to replace        | Section it appears in                     | What to show |
| ---------------------- | ----------------------------------------- | ------------ |
| `story-sanctuary.png`  | "A place of your own"                     | Calm, resolved exterior or interior scene |
| `story-anywhere.png`   | "Built for anywhere"                      | Forest, meadow, or site-adapted placement |
| `story-landscape.png`  | "Designed to disappear into landscape"    | Desert or wide-open arid context |

Recommended: 1920x1080 minimum, 2400x1600 ideal.

## Environment Card Images

These are the smaller thumbnails inside the setting step.

| File in use            | Card it appears in        | What to show |
| ---------------------- | ------------------------- | ------------ |
| `scene-desert.svg`     | "Open desert"             | Warm light, open ground, quiet distance |
| `scene-forest.svg`     | "Forest edge"             | Layered trees and diffuse green light |
| `scene-backyard.svg`   | "Suburban backyard"       | Fence line, lawn, house edge, ADU placement cue |

If you want photo thumbnails instead of SVG placeholders, add JPG or WebP files
to `public/` and update the image paths in `lib/configurator-data.ts`.

## HDRI Lighting

Drop `.hdr` files into `public/hdri/` to improve reflections and daylight realism.
The site now uses HDRI for lighting and reflections only. The visible background
is a grounded 3D scene so the pod does not feel scaled wrong or dropped into a giant dome.

| File             | Environment it supports |
| ---------------- | ----------------------- |
| `desert.hdr`     | Open desert             |
| `forest.hdr`     | Forest edge             |
| `urban.hdr`      | Suburban backyard       |

Free source:
- https://polyhaven.com/hdris

Suggested searches:
- Desert: `desert`, `dry lake`, `goegap`
- Forest: `forest`, `pine`, `woods`
- Backyard: `garden`, `courtyard`, `suburb`, `small house`

1K HDRIs are usually enough for web. 2K is the upper end I would use here.

## 3D Model

| File            | Location             |
| --------------- | -------------------- |
| `pod-model.glb` | `public/models/`     |

## Rhino Export Tips

### Shell / exterior surfaces
- Use Rhino's Physically Based material.
- Keep the base color neutral grey.
- Metallic: `0.15-0.25`
- Roughness: `0.55-0.70`

### Glass
- Use a separate PBR material.
- Opacity: roughly `0.3-0.5`
- Add transmission if Rhino supports it.

### Trim / dark accents
- Give trim its own material.
- Keep it dark, around `#1a1a1a`.
- Roughness: `0.4-0.6`

### Helpful material naming
- Shell: `shell_` or `exterior_`
- Glass: `glass_` or `window_`
- Trim: `trim_` or `frame_`
- Lights: `light_` or `emissive_`

The viewer now looks at mesh and material names first, so good naming gives us
much better control over shell tinting, glass, trim, and night glow.

### Rhino -> GLB export settings
1. Export Selected -> `.glb`
2. Enable material export
3. Enable `Map Z to Y`
4. Turn Draco compression on
5. Keep textures at `1024` or `2048`

Try to keep the final GLB under 5 MB for fast loading.
