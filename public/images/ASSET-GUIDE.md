# Image Asset Guide

Drop your real photos here to replace the placeholder SVGs.
Use JPG or WebP for photos (Next.js auto-optimizes them).

## Story Panel Backgrounds (full-screen, behind text)

These appear as cinematic full-bleed backgrounds behind the story sections
as users scroll through the experience. Aim for moody, editorial photography.

| File to create                        | Section it appears in                     | What to shoot / source                                       |
| ------------------------------------- | ----------------------------------------- | ------------------------------------------------------------ |
| `stories/sanctuary.jpg`               | "A place of your own" (1st story panel)   | Interior or exterior pod shot — calm, private, resolved feel |
| `stories/built-for-anywhere.jpg`      | "Built for anywhere" (2nd story panel)    | Pod in a natural setting — forest, meadow, hillside          |
| `stories/disappear-into-landscape.jpg`| "Designed to disappear" (3rd story panel) | Pod in open desert/arid landscape — long horizon line        |

Recommended: 1920x1080 minimum, 2400x1600 ideal. Dark/moody works best
(there's a gradient overlay on top). Landscape orientation only.

## Environment Card Thumbnails (small cards in the configurator)

These appear as ~320px wide thumbnails inside the option cards when the
user picks their environment (Step 3). They should quickly convey the vibe.

| File to create              | Card it appears in   | What to show                          |
| --------------------------- | -------------------- | ------------------------------------- |
| `environments/desert.jpg`   | "Open desert" card   | Arid landscape, warm light, open sky  |
| `environments/forest.jpg`   | "Forest edge" card   | Tree canopy, diffuse green light      |
| `environments/urban.jpg`    | "Urban infill" card  | City backyard, rooftop, or alley view |

Recommended: 640x400 minimum. These get cropped to ~320x144 with object-fit cover.

## HDRI Environments (real 360 backgrounds for the 3D preview)

Drop .hdr files here to replace the flat-color geometric scenes.
When present, these wrap around the 3D pod as a photorealistic background
and also provide realistic image-based lighting (reflections on the shell).

| File to create      | Location        | Environment it replaces            |
| ------------------- | --------------- | ---------------------------------- |
| `desert.hdr`        | `public/hdri/`  | Flat orange desert with box rocks  |
| `forest.hdr`        | `public/hdri/`  | Flat green forest with cone trees  |
| `urban.hdr`         | `public/hdri/`  | Flat blue urban with box buildings |

Where to get free HDRIs:
- https://polyhaven.com/hdris (CC0 license, free for commercial use)
  - Desert: search "desert", "dry lake", "goegap"
  - Forest: search "forest", "pine", "woods"
  - Urban: search "urban", "city", "parking", "courtyard"
- Download the 1K or 2K resolution .hdr file (1K = ~2MB, 2K = ~8MB)
- 1K is plenty for web. 2K if you want crisp reflections.

The code auto-detects: if an HDRI is present it uses it, otherwise falls
back to the geometric scene. HDRIs only apply in "day" mode; "night" mode
always uses the flat-color scene.

## 3D Model

| File               | Location              | Notes                                          |
| ------------------ | --------------------- | ---------------------------------------------- |
| `pod-model.glb`    | `public/models/`      | Already placed. See Rhino material tips below. |

## Rhino Material Tips for a Sleek GLB Export

The site's code applies the selected finish color to every opaque
MeshStandardMaterial in the GLB. To get the best results, set up
your Rhino materials so the exported GLB is "color-ready":

### Shell / Exterior surfaces (the parts that change color)
- Use Rhino's **Physically Based** material (not Basic or Custom)
- Set **Base Color** to any neutral mid-grey (the site overrides this)
- **Metallic**: 0.15-0.25 (slight metallic sheen, not chrome)
- **Roughness**: 0.55-0.70 (satin/matte, not mirror-glossy)
- These values make the shell look premium when tinted by the configurator

### Glass / Windows (transparent parts the code skips)
- Use a separate PBR material with **Opacity** < 1.0 (e.g. 0.3-0.5)
- Set **Transmission** if your Rhino version supports it
- The code detects `transparent: true` or `opacity < 0.9` and leaves
  these materials alone (no color override)

### Trim / Dark accents (frames, base, details)
- If you want parts to NOT change color with the finish selector,
  make them a separate material and set them very dark (#1a1a1a)
  with Roughness 0.4-0.6
- The code currently tints all opaque MeshStandardMaterials. If you
  need trim to stay fixed, you have two options:
  1. Use a MeshPhysicalMaterial (set Clearcoat > 0 in Rhino) — the
     code only targets MeshStandardMaterial
  2. Or we can update the code to skip materials by name

### Export settings (Rhino -> GLB)
1. Select all geometry -> File -> Export Selected -> .glb
2. In the export dialog:
   - Check "Export materials"
   - Check "Map Z to Y" (Rhino is Z-up, Three.js is Y-up)
   - Draco compression: ON (reduces file size ~70%)
   - Texture resolution: 1024 or 2048 max
3. Keep the file under 5MB for fast web loading (current: 1.7MB, great)

### Material naming convention (optional but helpful)
- Name shell materials starting with `shell_` or `exterior_`
- Name glass materials starting with `glass_` or `window_`
- Name trim materials starting with `trim_` or `frame_`
- This makes it easy to add per-part logic later if needed
