/* =========================================================================
   THE KNIGHT | HALLOWNEST ARCHIVES — SCRIPT
   Sections:
     1. Default corner SVG injection (fallback art)
     2. SPA-style page navigation
     3. Radiance / Void theme toggle
     4. Wavy scrollbar progress tracker
     5. Dynamic background generators (clouds, orbs, motes)
     6. NEW: Background music player
     7. NEW: Custom SVG uploader (box corners + scrollbar)
     8. NEW: Artifact detail modal (Compendium / Projects)
     9. Init on DOMContentLoaded
   ========================================================================= */

/* -------------------------------------------------------------------------
   1. DEFAULT CORNER SVG INJECTION (LEFT CORNERS ONLY — FALLBACK ART)
   ------------------------------------------------------------------------- */
function getHollowKnightCornerSVG() {
    return `
        <svg class="hk-corner-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 38 4 L 14 4 C 8 4, 4 8, 4 14 L 4 38" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M 12 12 C 12 8, 8 12, 16 16 C 8 20, 12 24, 12 20" stroke="currentColor" stroke-width="1.8" fill="none"/>
            <polygon points="12,6 18,12 12,18 6,12" fill="currentColor"/>
            <circle cx="36" cy="4" r="2" fill="currentColor"/>
            <circle cx="4" cy="36" r="2" fill="currentColor"/>
        </svg>
    `;
}

// Applies the default corner embellishment to every ".decorate-corners" box.
// Skipped for a box that already has a custom uploaded SVG applied.
function applyHollowKnightCorners() {
    const boxes = document.querySelectorAll('.decorate-corners');
    boxes.forEach(box => {
        if (box.querySelector('.hk-corner-svg')) return;

        const positions = ['top-left', 'bottom-left'];
        positions.forEach(pos => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = getHollowKnightCornerSVG().trim();
            const svgElement = tempDiv.firstChild;
            svgElement.classList.add(pos);
            box.appendChild(svgElement);
        });
    });
}

/* -------------------------------------------------------------------------
   2. SPA NAVIGATION — EXPLICIT DISPLAY: NONE / BLOCK SWITCHING
   ------------------------------------------------------------------------- */
function openPage(pageId, locationText) {
    const pages = document.querySelectorAll('.game-page');
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }

    const targetPage = document.getElementById(pageId);
    if (pageId === 'save-menu') {
        targetPage.style.display = 'flex';
    } else {
        targetPage.style.display = 'block';
    }

    document.getElementById('location-name').textContent = locationText;

    const backBtn = document.getElementById('back-to-menu-btn');
    const scrollWidget = document.getElementById('scrollbar-widget');
    const viewportContainer = document.getElementById('viewport-container');

    if (pageId === 'save-menu') {
        backBtn.style.display = 'none';
        scrollWidget.style.display = 'none';
        viewportContainer.classList.add('no-scroll');
    } else {
        backBtn.style.display = 'block';
        scrollWidget.style.display = 'block';
        viewportContainer.classList.remove('no-scroll');
    }

    viewportContainer.scrollTop = 0;
    updateWavyScrollbar();
}

/* -------------------------------------------------------------------------
   3. RADIANCE / VOID THEME TOGGLE
   ------------------------------------------------------------------------- */
function toggleMode() {
    const body = document.body;
    const btn = document.getElementById('mode-toggle-btn');
    body.classList.toggle('radiance-mode');

    if (body.classList.contains('radiance-mode')) {
        btn.textContent = '✦ MODE: RADIANCE';
    } else {
        btn.textContent = '✦ MODE: VOID';
    }
}

/* -------------------------------------------------------------------------
   4. WAVY SCROLLBAR PROGRESS TRACKER
   ------------------------------------------------------------------------- */
const viewportContainer = document.getElementById('viewport-container');
const wavyFillPath = document.getElementById('wavy-fill-path');
let pathTotalLength = 0;

function initWavyPath() {
    if (wavyFillPath) {
        pathTotalLength = wavyFillPath.getTotalLength();
        wavyFillPath.style.strokeDasharray = pathTotalLength;
        wavyFillPath.style.strokeDashoffset = pathTotalLength;
    }
}

function updateWavyScrollbar() {
    // If a custom scrollbar SVG/image has replaced the default wavy path,
    // there's no stroke-dashoffset animation to drive, so bail out quietly.
    if (!wavyFillPath || pathTotalLength === 0) return;

    const scrollTop = viewportContainer.scrollTop;
    const scrollHeight = viewportContainer.scrollHeight - viewportContainer.clientHeight;

    if (scrollHeight <= 0) {
        wavyFillPath.style.strokeDashoffset = pathTotalLength;
        return;
    }

    const scrollPercent = scrollTop / scrollHeight;
    const drawLength = pathTotalLength * Math.min(Math.max(scrollPercent, 0.05), 1);

    wavyFillPath.style.strokeDashoffset = pathTotalLength - drawLength;
}

viewportContainer.addEventListener('scroll', updateWavyScrollbar);

/* -------------------------------------------------------------------------
   5. DYNAMIC BACKGROUND GENERATORS (CLOUDS, ORBS, MOTES)
   ------------------------------------------------------------------------- */
const cloudContainer = document.getElementById('clouds-container');
for (let i = 0; i < 5; i++) {
    const cloud = document.createElement('div');
    cloud.classList.add('cloud');
    const size = Math.random() * 450 + 350;
    cloud.style.width = `${size}px`;
    cloud.style.height = `${size * 0.55}px`;
    cloud.style.top = `${Math.random() * 70}vh`;
    cloud.style.animationDuration = `${Math.random() * 25 + 20}s`;
    cloud.style.animationDelay = `${Math.random() * 5}s`;
    cloudContainer.appendChild(cloud);
}

const orbContainer = document.getElementById('abyss-orbs-container');
const orbColors = [
    'rgba(140, 60, 230, 0.75)',
    'rgba(50, 140, 250, 0.75)',
    'rgba(170, 90, 255, 0.7)',
    'rgba(80, 180, 255, 0.75)'
];
for (let i = 0; i < 6; i++) {
    const orb = document.createElement('div');
    orb.classList.add('abyss-orb');
    const size = Math.random() * 350 + 200;
    orb.style.width = `${size}px`;
    orb.style.height = `${size}px`;
    orb.style.left = `${Math.random() * 100}vw`;
    orb.style.background = orbColors[Math.floor(Math.random() * orbColors.length)];
    orb.style.animationDuration = `${Math.random() * 14 + 10}s`;
    orb.style.animationDelay = `${Math.random() * 5}s`;
    orbContainer.appendChild(orb);
}

const moteContainer = document.getElementById('motes-container');
for (let i = 0; i < 20; i++) {
    const mote = document.createElement('div');
    mote.classList.add('mote');
    const size = Math.random() * 6 + 4;
    mote.style.width = `${size}px`;
    mote.style.height = `${size}px`;
    mote.style.left = `${Math.random() * 100}vw`;
    mote.style.animationDuration = `${Math.random() * 7 + 5}s`;
    mote.style.animationDelay = `${Math.random() * 4}s`;
    moteContainer.appendChild(mote);
}

/* =========================================================================
   6. NEW FEATURE — BACKGROUND MUSIC PLAYER
   Lets a visitor upload their own local audio file (mp3/ogg/wav) and play
   it as a looping background track, with play/pause and a volume slider.
   No audio file ships with the site — nothing plays until the user chooses
   a track from their own device, so there's no autoplay-on-load surprise.
   ========================================================================= */
const bgAudio = document.getElementById('bg-audio');
const musicToggleBtn = document.getElementById('music-toggle-btn');
const musicFileInput = document.getElementById('music-file-input');
const musicVolumeSlider = document.getElementById('music-volume');
let musicObjectUrl = null; // tracks the last object URL so we can revoke it

function setMusicButtonLabel(isPlaying) {
    musicToggleBtn.textContent = isPlaying ? '♪ PAUSE MUSIC' : '♪ PLAY MUSIC';
}

// Clicking the note button either opens the file picker (first time / no
// track loaded yet) or toggles play/pause for an already-loaded track.
function handleMusicButtonClick() {
    if (!bgAudio.src) {
        musicFileInput.click();
        return;
    }
    if (bgAudio.paused) {
        bgAudio.play().catch(() => {
            // Autoplay can be blocked by the browser until a user gesture;
            // since this is already a click handler, this should succeed.
        });
    } else {
        bgAudio.pause();
    }
}

function handleMusicFileChange(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (musicObjectUrl) {
        URL.revokeObjectURL(musicObjectUrl);
    }
    musicObjectUrl = URL.createObjectURL(file);
    bgAudio.src = musicObjectUrl;
    bgAudio.loop = true;
    bgAudio.volume = parseFloat(musicVolumeSlider.value);
    bgAudio.play().catch(() => {
        // If the browser still blocks it, the button will show "PLAY MUSIC"
        // and the user can press it again to start playback manually.
    });
}

function handleVolumeChange(event) {
    bgAudio.volume = parseFloat(event.target.value);
}

if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', handleMusicButtonClick);
    musicFileInput.addEventListener('change', handleMusicFileChange);
    musicVolumeSlider.addEventListener('input', handleVolumeChange);
    bgAudio.addEventListener('play', () => setMusicButtonLabel(true));
    bgAudio.addEventListener('pause', () => setMusicButtonLabel(false));
}

/* =========================================================================
   7. NEW FEATURE — CUSTOM SVG UPLOADER (BOX CORNERS + SCROLLBAR)
   Lets a visitor upload their own .svg file to replace:
     a) the corner embellishments on save-slot / lore-box / charm-card boxes
     b) the wavy scrollbar fill graphic
   The shape/position/sizing of the existing assets is preserved — the
   uploaded SVG is dropped into the same slot classes and sized via CSS
   (see style.css sections 4 and 6), it does not change layout geometry.
   ========================================================================= */
const svgCornerInput = document.getElementById('svg-corner-input');
const svgCornerBtn = document.getElementById('svg-corner-btn');
const svgCornerStatus = document.getElementById('svg-corner-status');
const svgCornerResetBtn = document.getElementById('svg-corner-reset-btn');

const svgScrollbarInput = document.getElementById('svg-scrollbar-input');
const svgScrollbarBtn = document.getElementById('svg-scrollbar-btn');
const svgScrollbarStatus = document.getElementById('svg-scrollbar-status');
const svgScrollbarResetBtn = document.getElementById('svg-scrollbar-reset-btn');

let customCornerMarkup = null;   // raw <svg>...</svg> markup, cached for re-use
let customScrollbarMarkup = null;

// Basic guard: only accept files that look like SVGs (by name or MIME type).
function isSvgFile(file) {
    return file && (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg'));
}

// --- 7a. Corner SVG upload: replaces the default corner art on every
//         .decorate-corners box (save slots, lore boxes, charm cards) ---
function handleCornerFileChange(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    if (!isSvgFile(file)) {
        svgCornerStatus.textContent = 'Please choose an .svg file';
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        customCornerMarkup = e.target.result;
        applyCustomCorners(customCornerMarkup);
        svgCornerStatus.textContent = file.name;
        svgCornerResetBtn.classList.add('visible');
    };
    reader.readAsText(file);
}

function applyCustomCorners(svgMarkup) {
    const boxes = document.querySelectorAll('.decorate-corners');
    boxes.forEach(box => {
        // Remove any existing corner nodes (default or previously-custom)
        box.querySelectorAll('.hk-corner-svg').forEach(el => el.remove());

        const positions = ['top-left', 'bottom-left'];
        positions.forEach(pos => {
            const wrapper = document.createElement('div');
            wrapper.className = `hk-corner-svg custom-corner ${pos}`;
            wrapper.innerHTML = svgMarkup;
            box.appendChild(wrapper);
        });
    });
}

function resetCorners() {
    customCornerMarkup = null;
    document.querySelectorAll('.hk-corner-svg').forEach(el => el.remove());
    applyHollowKnightCorners();
    svgCornerStatus.textContent = '';
    svgCornerResetBtn.classList.remove('visible');
    svgCornerInput.value = '';
}

// --- 7b. Scrollbar SVG upload: replaces the wavy-fill graphic inside the
//         scrollbar track, keeping the same container position/size ---
function handleScrollbarFileChange(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    if (!isSvgFile(file)) {
        svgScrollbarStatus.textContent = 'Please choose an .svg file';
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        customScrollbarMarkup = e.target.result;
        applyCustomScrollbar(customScrollbarMarkup);
        svgScrollbarStatus.textContent = file.name;
        svgScrollbarResetBtn.classList.add('visible');
    };
    reader.readAsText(file);
}

function applyCustomScrollbar(svgMarkup) {
    const container = document.getElementById('scrollbar-widget');
    container.classList.add('custom-scrollbar');
    container.innerHTML = svgMarkup;
    // Progress-tracking against stroke-dashoffset no longer applies to an
    // arbitrary uploaded SVG, so we stop trying to animate a fill amount.
    pathTotalLength = 0;
}

function resetScrollbar() {
    customScrollbarMarkup = null;
    const container = document.getElementById('scrollbar-widget');
    container.classList.remove('custom-scrollbar');
    container.innerHTML = `
        <svg class="wavy-svg" viewBox="0 0 30 600" preserveAspectRatio="none">
            <path class="wavy-fill" id="wavy-fill-path" d="M 15,0 C 30,50 0,100 15,150 C 30,200 0,250 15,300 C 30,350 0,400 15,450 C 30,500 0,550 15,600" />
        </svg>
    `;
    svgScrollbarStatus.textContent = '';
    svgScrollbarResetBtn.classList.remove('visible');
    svgScrollbarInput.value = '';

    // Re-bind the path reference (a new DOM node replaced the old one) and
    // restore the normal scroll-progress animation.
    window.wavyFillPath = document.getElementById('wavy-fill-path');
    initWavyPath();
    updateWavyScrollbar();
}

if (svgCornerBtn) {
    svgCornerBtn.addEventListener('click', () => svgCornerInput.click());
    svgCornerInput.addEventListener('change', handleCornerFileChange);
    svgCornerResetBtn.addEventListener('click', resetCorners);

    svgScrollbarBtn.addEventListener('click', () => svgScrollbarInput.click());
    svgScrollbarInput.addEventListener('change', handleScrollbarFileChange);
    svgScrollbarResetBtn.addEventListener('click', resetScrollbar);
}

/* =========================================================================
   8. NEW FEATURE — ARTIFACT DETAIL MODAL (Compendium / Projects)
   Each research/project entry has a data record here: title, a short meta
   line, the full detail text, and an optional bundled image path. Clicking
   "INSPECT ARTIFACT" on a charm-card opens the modal and fills it in from
   this object. Visitors can also attach their own image live (per artifact,
   for the current browser session) via the ATTACH IMAGE control.

   TO ADD A NEW ARTIFACT: add an entry below with a unique key, then add a
   matching charm-card in index.html with onclick="openArtifact('your-key')".

   TO SHIP A DEFAULT IMAGE WITH AN ENTRY: set its `image` field to a path
   such as "assets/microtrap-setup.jpg" (place the file in an `assets/`
   folder next to index.html). Leave `image: null` for no default image —
   visitors can still attach one live via the modal's uploader.
   ========================================================================= */
const ARTIFACT_DATA = {
    'microtrap-arrays': {
        title: 'Generation of Microtrap Arrays for Single Atom Trapping',
        meta: 'MSc. Thesis — SPS, NISER · Advisor: Dr. Ashok K. Mohapatra · Aug 2025–May 2026',
        image: null,
        body: 'Studied quantum optics, Gaussian and non-Gaussian beam propagation and ray optics.\n\nCreated stable microtraps using (modified) Gerchberg–Saxton (GS) algorithm(s), experimentally achieved using spatial light modulators (SLMs).\n\nPreparing and characterizing MOT coils, cooling and repump beams, and setting up imaging lines for a Rubidium MOT.\n\nPreparing and aligning an ODT (optical dipole trap) setup and developing an alignment protocol for the same.\n\n(Future) Creating sub-diffraction-limited traps to increase trapping capability using spatially squeezed structured light.\n\n(Future) Implementing a feedback loop using a camera to automate corrections (Zernike) using test patterns.'
    },
    'hubbard-model': {
        title: 'Studying the Hubbard Model and its Realization in Ultracold Atoms',
        meta: 'Term Project — NISER · Advisor: Anamitra Mukherjee · Mar 2026–Apr 2026',
        image: null,
        body: 'Studied the Hubbard Model analytically and numerically using the mean-field approximation for a quadratic trapping potential.\n\nSimulated the system to arrive at the wedding-cake and insulator-shell structures and the localized wavefunctions, along with the experimental signatures of the same (Time-of-Flight imaging, Matter Wave Interferometry, Bragg Spectroscopy).'
    },
    'bound-states': {
        title: 'Study of 2- and 3-body Bound States',
        meta: 'Term Project — NISER · Advisor: Dr. Anamitra Mukherjee · Sep–Nov 2024',
        image: null,
        body: 'Study of 2- and 3-body bound states in Next-Nearest-Neighbor (NNN) interaction-limited Hamiltonian systems using Green\'s function equations of motion.\n\nStudied the spectral function to determine bound-state stability and created phase separation diagrams for such states.\n\nIncluded bound states above the continuum in the analysis and explored physical realizations of such systems.'
    },
    'reyes-sft': {
        title: 'Statistical Field Theory',
        meta: 'REYES Program',
        image: null,
        body: 'Independent study project undertaken through the REYES program, focused on statistical field theory.'
    },
    'qcd-reading': {
        title: 'A Pedagogical Introduction to Quantum Chromodynamics',
        meta: 'Self-directed reading project',
        image: null,
        body: 'A self-directed reading project building up a pedagogical introduction to Quantum Chromodynamics (QCD).'
    },
    'ultrafast-optics': {
        title: 'Topological and Kondo Behavior in Fe-doped Cr\u2082Sn\u2082S\u2082',
        meta: 'Using ultrafast optics',
        image: null,
        body: 'Investigation of topological and Kondo behavior in Fe-doped Cr\u2082Sn\u2082S\u2082 using ultrafast optics techniques.'
    },
    'geometric-phase': {
        title: 'Simulation, Generation & Study of the Geometrical Phase',
        meta: 'Using a Mach\u2013Zehnder Interferometer (MZI)',
        image: null,
        body: 'Simulation, generation, and experimental study of the geometrical (Berry) phase using a Mach\u2013Zehnder Interferometer setup.\n\nRelated poster: "Study of Geometric Phase using Michelson Interferometry" (2025) — Open Lab, NISER.'
    },
    'vortex-magnetometry': {
        title: 'Weak Field Magnetometry using Vortex Beam Interferometry',
        meta: 'Structured light / interferometric sensing',
        image: null,
        body: 'Weak magnetic field sensing using interferometry with structured (vortex) light beams.'
    }
};

const artifactOverlay = document.getElementById('artifact-modal-overlay');
const artifactTitleEl = document.getElementById('artifact-modal-title');
const artifactMetaEl = document.getElementById('artifact-modal-meta');
const artifactBodyEl = document.getElementById('artifact-modal-body');
const artifactImageWrap = document.getElementById('artifact-modal-image-wrap');
const artifactImageEl = document.getElementById('artifact-modal-image');
const artifactImageBtn = document.getElementById('artifact-image-btn');
const artifactImageInput = document.getElementById('artifact-image-input');
const artifactImageResetBtn = document.getElementById('artifact-image-reset-btn');

let currentArtifactKey = null;
let currentArtifactObjectUrl = null; // tracks a live-uploaded image's object URL

// Renders the image area for the given artifact key: shows a bundled
// `image` path if set, otherwise shows the "no image" placeholder.
function renderArtifactImage(key) {
    const entry = ARTIFACT_DATA[key];
    if (entry && entry.image) {
        artifactImageEl.src = entry.image;
        artifactImageWrap.classList.add('has-image');
    } else {
        artifactImageEl.removeAttribute('src');
        artifactImageWrap.classList.remove('has-image');
    }
}

function openArtifact(key) {
    const entry = ARTIFACT_DATA[key];
    if (!entry) return;

    currentArtifactKey = key;
    artifactTitleEl.textContent = entry.title;
    artifactMetaEl.textContent = entry.meta || '';
    artifactBodyEl.textContent = entry.body || '';
    renderArtifactImage(key);

    artifactOverlay.classList.add('open');
}

function closeArtifact() {
    artifactOverlay.classList.remove('open');
    currentArtifactKey = null;
}

// Clicking the dark overlay itself (not the modal panel) closes the modal.
function closeArtifactOnOverlay(event) {
    if (event.target === artifactOverlay) {
        closeArtifact();
    }
}

// Attaching an image is a live, in-browser change (via object URL) — it is
// not saved back to ARTIFACT_DATA or to disk, so it lasts for the current
// visit only. This lets any visitor preview an artifact with an image
// without needing to edit code.
function handleArtifactImageChange(event) {
    const file = event.target.files && event.target.files[0];
    if (!file || !currentArtifactKey) return;

    if (currentArtifactObjectUrl) {
        URL.revokeObjectURL(currentArtifactObjectUrl);
    }
    currentArtifactObjectUrl = URL.createObjectURL(file);

    // Store on the in-memory data object too, so re-opening the same
    // artifact later in this session keeps showing the attached image.
    ARTIFACT_DATA[currentArtifactKey].image = currentArtifactObjectUrl;
    renderArtifactImage(currentArtifactKey);
}

function handleArtifactImageRemove() {
    if (!currentArtifactKey) return;
    ARTIFACT_DATA[currentArtifactKey].image = null;
    artifactImageInput.value = '';
    renderArtifactImage(currentArtifactKey);
}

if (artifactOverlay) {
    document.getElementById('artifact-modal-close').addEventListener('click', closeArtifact);
    artifactImageBtn.addEventListener('click', () => artifactImageInput.click());
    artifactImageInput.addEventListener('change', handleArtifactImageChange);
    artifactImageResetBtn.addEventListener('click', handleArtifactImageRemove);

    // Escape key also closes the modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && artifactOverlay.classList.contains('open')) {
            closeArtifact();
        }
    });
}

/* -------------------------------------------------------------------------
   9. INIT ON DOMCONTENTLOADED
   ------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    applyHollowKnightCorners();
    initWavyPath();
    updateWavyScrollbar();
});
