# Konnark Dey | Hallownest Archives

A single-page, Hollow Knight–themed portfolio site for Konnark Dey
(Integrated MSc. student, Ultracold Atoms, NISER Bhubaneswar). It presents
profile, skills, research/projects, and contact info as "save files" in a
game-menu interface, complete with an animated void/abyss atmosphere, a
Radiance (light) mode toggle, and a custom wavy SVG scrollbar. Content is
adapted from the provided CV (education, research interests, technical
skills, research experience, past projects, honors, and outreach).

## File structure

```
hallownest-site/
├── index.html   # Page structure & content (all 4 "save file" sections)
├── style.css    # All styling: theme colors, layout, animations, controls
├── script.js    # All behavior: navigation, theme toggle, music, SVG uploads
└── README.md    # This file
```

The site was originally a single HTML file with inline `<style>` and
`<script>` blocks; it has been split into three separate files so each
concern (markup / styling / behavior) can be edited independently.

## Features

- **Save-file navigation** — a home screen with four "save slots" that open
  Status, Skills, Compendium, and Confidants pages, SPA-style (no page
  reloads).
- **Void / Radiance mode toggle** — switches the whole site between a dark
  "void" theme and a light "radiance" theme via CSS custom properties.
- **Animated atmosphere** — drifting blurred "cloud" and "orb" shapes plus
  floating light motes, generated and randomized in JavaScript.
- **Wavy SVG scrollbar** — a custom scroll-progress indicator shaped like a
  wave, replacing the native browser scrollbar.
- **Background music player** *(new)* — visitors can upload a local audio
  file (MP3/OGG/WAV) from their own device to loop as background music, with
  play/pause and a volume slider. No audio file ships with the site, so
  nothing plays automatically on load.
- **Custom SVG uploader** *(new)* — visitors can upload their own `.svg`
  files to re-skin two elements while keeping their exact position and size:
  - the corner embellishments on every save-slot / lore-box / charm-card
  - the wavy scrollbar's fill graphic

  A "RESET" button appears next to each uploader once a custom SVG is
  active, restoring the original default artwork.
- **Artifact detail modal** *(new)* — on the Compendium & Projects page,
  clicking "INSPECT ARTIFACT →" on any research/project card opens a modal
  with the full project description (not just the short card summary) and
  an image area. An "ATTACH IMAGE" button lets a visitor pick a local image
  to preview inside that artifact's modal for the current visit. See
  "Adding or editing Compendium projects" below to ship a *default* image
  with a project (visible to everyone, not just uploaded per-visit).

## Compendium content structure

All research/project entries shown in the Compendium modal are defined in
one place: the `ARTIFACT_DATA` object near the top of the "ARTIFACT DETAIL
MODAL" section in `script.js`. Each entry looks like:

```js
'microtrap-arrays': {
    title: 'Generation of Microtrap Arrays for Single Atom Trapping',
    meta: 'MSc. Thesis — SPS, NISER · Advisor: Dr. Ashok K. Mohapatra · Aug 2025–May 2026',
    image: null,   // or e.g. 'assets/microtrap-setup.jpg'
    body: 'Full multi-paragraph description...'
}
```

### Adding or editing Compendium projects
1. **Add a new entry** to `ARTIFACT_DATA` in `script.js` with a unique key
   (e.g. `'my-new-project'`).
2. **Add a matching card** in `index.html` inside the `#compendium` page's
   `.charm-grid`:
   ```html
   <div class="charm-card decorate-corners">
       <div class="charm-title">❖ My New Project</div>
       <div class="charm-desc">One-line summary shown on the card.</div>
       <a class="charm-link" onclick="openArtifact('my-new-project')">INSPECT ARTIFACT →</a>
   </div>
   ```
3. **To ship a default image** with an entry (so every visitor sees it, not
   just visitors who use the ATTACH IMAGE button): put an image file in an
   `assets/` folder next to `index.html`, then set that entry's `image`
   field to the relative path, e.g. `image: 'assets/microtrap-setup.jpg'`.

Note: images attached live via the "ATTACH IMAGE" button in the modal are
stored only in the visitor's own browser session (via a temporary object
URL) — they are not uploaded anywhere or saved back into the site's files.

## How the music and SVG upload features work

Both features use the browser's native `<input type="file">` element and
read the chosen file entirely on the visitor's own device — nothing is
uploaded to a server:

- **Music**: the chosen audio file is turned into a temporary local object
  URL (`URL.createObjectURL`) and assigned to a hidden `<audio>` element,
  which is then set to loop and played.
- **SVG**: the chosen `.svg` file's text content is read with `FileReader`
  and injected directly into the page in place of the default corner/
  scrollbar graphic, using the same CSS classes so sizing and position stay
  unchanged.

Because both features run purely in the visitor's browser, if you want a
piece of music or artwork to load automatically for *every* visitor (rather
than requiring them to pick a file each time), you would need to add the
file to the project folder and reference it directly — see "Customizing
further" below.

## Running it locally

No build step or server-side code is required. Any of the following will
work:

- **Just open the file**: double-click `index.html` to open it directly in
  a browser.
- **Local server (recommended)**: some browsers restrict file uploads or
  fonts when opened via `file://`. From inside the project folder, run:
  ```bash
  python3 -m http.server 8000
  ```
  then visit `http://localhost:8000` in your browser.

## Customizing further

- **Ship a default background track**: place an audio file (e.g.
  `music/theme.mp3`) in the project folder, then in `script.js` set
  `bgAudio.src = 'music/theme.mp3';` near the top of the music player
  section instead of waiting for a file upload. Keep in mind most browsers
  block autoplay-with-sound until the visitor interacts with the page, so
  you'll likely still want a play button.
- **Ship default corner/scrollbar art**: place `.svg` files in the project
  folder (e.g. `assets/corner.svg`) and fetch + inject them the same way the
  upload handlers do (`fetch('assets/corner.svg').then(r => r.text()).then(applyCustomCorners)`).
- **Edit content**: all page text lives in `index.html` inside the
  `.game-page` sections — edit directly, no build step needed.
- **Edit colors/theme**: all colors are CSS custom properties at the top of
  `style.css` under `:root` (void mode) and `body.radiance-mode` (light
  mode).

## Publishing

See `PUBLISHING.md` for step-by-step instructions to publish this site for
free using GitHub Pages, plus a list of alternative hosting options.
