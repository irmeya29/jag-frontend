/**
 * apply-minimalist-theme.js
 * Applique le style minimaliste (Deep Green + Midnight Blue + Inter) 
 * sur l'ensemble du projet JAG sans toucher aux structures HTML/images.
 */

const fs = require('fs');
const path = require('path');

// ─────────────────────────────────────────────
// 1. MISE À JOUR styles.scss (Design System Global)
// ─────────────────────────────────────────────
const stylesPath = 'src/styles.scss';
let styles = fs.readFileSync(stylesPath, 'utf8');

// Font
styles = styles.replace(
  /@import url\('[^']+Montserrat[^']+'\);/,
  "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');"
);

// Colors
styles = styles
  .replace(/--jag-green:\s*#2EAA63;/, '--jag-green: #0f4c3a;      /* Deep Green */')
  .replace(/--jag-blue:\s*#1E9BD7;/, '--jag-blue: #0b1d3a;        /* Midnight Blue */')
  .replace(/--jag-navy:\s*#0D2137;/, '--jag-navy: #0b1d3a;         /* Midnight Blue */')
  .replace(/--jag-forest:\s*#0A3D2E;/, '--jag-forest: #081529;     /* Darker Midnight */')
  .replace(/--jag-orange:\s*#FF6B35;/, '--jag-orange: #0f4c3a;     /* Accent = Deep Green */')
  .replace(/--jag-text:\s*#555555;/, '--jag-text: #4a5568;         /* Minimalist Gray */')
  .replace(/--jag-muted:\s*#F7F8FC;/, '--jag-muted: #f8fafc;       /* Crisp Light BG */');

// Derived transparencies
styles = styles
  .replace(/--jag-green-10:\s*rgba\(46, 170, 99, 0\.10\);/, '--jag-green-10: rgba(15, 76, 58, 0.10);')
  .replace(/--jag-green-20:\s*rgba\(46, 170, 99, 0\.20\);/, '--jag-green-20: rgba(15, 76, 58, 0.20);')
  .replace(/--jag-blue-10:\s*rgba\(30, 155, 215, 0\.10\);/, '--jag-blue-10: rgba(11, 29, 58, 0.10);')
  .replace(/--jag-blue-20:\s*rgba\(30, 155, 215, 0\.20\);/, '--jag-blue-20: rgba(11, 29, 58, 0.20);')
  .replace(/--jag-navy-80:\s*rgba\(13, 33, 55, 0\.80\);/, '--jag-navy-80: rgba(11, 29, 58, 0.80);')
  .replace(/--jag-navy-90:\s*rgba\(13, 33, 55, 0\.90\);/, '--jag-navy-90: rgba(11, 29, 58, 0.90);')
  .replace(/--jag-orange-10:\s*rgba\(255, 107, 53, 0\.10\);/, '--jag-orange-10: rgba(15, 76, 58, 0.10);');

// Typography
styles = styles
  .replace(/--font-body:\s*'Open Sans', sans-serif;/, "--font-body: 'Inter', sans-serif;")
  .replace(/--font-display:\s*'Montserrat', sans-serif;/, "--font-display: 'Inter', sans-serif;");

// Border radius (minimalist)
styles = styles
  .replace(/--radius-sm:\s*4px;/, '--radius-sm: 2px;')
  .replace(/--radius-md:\s*8px;/, '--radius-md: 4px;')
  .replace(/--radius-lg:\s*12px;/, '--radius-lg: 8px;')
  .replace(/--radius-xl:\s*16px;/, '--radius-xl: 12px;');

// Shadows (ultra-light minimalist)
styles = styles
  .replace(/--shadow-sm:\s*0 1px 3px rgba\(13, 33, 55, 0\.08\);/, '--shadow-sm: 0 1px 3px rgba(11, 29, 58, 0.03);')
  .replace(/--shadow-md:\s*0 4px 12px rgba\(13, 33, 55, 0\.10\);/, '--shadow-md: 0 2px 8px rgba(11, 29, 58, 0.04);')
  .replace(/--shadow-lg:\s*0 8px 24px rgba\(13, 33, 55, 0\.14\);/, '--shadow-lg: 0 4px 16px rgba(11, 29, 58, 0.05);')
  .replace(/--shadow-xl:\s*0 16px 40px rgba\(13, 33, 55, 0\.18\);/, '--shadow-xl: 0 8px 24px rgba(11, 29, 58, 0.06);');

fs.writeFileSync(stylesPath, styles, 'utf8');
console.log('✅ styles.scss mis à jour (couleurs, fonts, shadows, radius)');

// ─────────────────────────────────────────────
// 2. TRAITEMENT GLOBAL des fichiers SCSS des composants
// ─────────────────────────────────────────────
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const fullPath = path.join(dir, f);
    const isDir = fs.statSync(fullPath).isDirectory();
    isDir ? walkDir(fullPath, callback) : callback(fullPath);
  });
}

const componentFiles = [];
walkDir('src/app', (filePath) => {
  if (filePath.endsWith('.scss')) componentFiles.push(filePath);
});

// Remplacement des anciennes couleurs hardcodées
const colorReplacements = [
  // Old green -> Deep Green
  [/rgba\(46,\s*170,\s*99,\s*([\d.]+)\)/g, (_, a) => `rgba(15, 76, 58, ${a})`],
  [/#2EAA63/gi, '#0f4c3a'],
  [/#259955/gi, '#0d4433'],
  // Old navy/blue -> Midnight Blue
  [/rgba\(13,\s*33,\s*55,\s*([\d.]+)\)/g, (_, a) => `rgba(11, 29, 58, ${a})`],
  [/#0D2137/gi, '#0b1d3a'],
  [/#0D2137/g, '#0b1d3a'],
  // Old orange -> Deep Green (accent unified)
  [/#FF6B35/gi, '#0f4c3a'],
  [/rgba\(255,\s*107,\s*53,\s*([\d.]+)\)/g, (_, a) => `rgba(15, 76, 58, ${a})`],
  // Old blue -> Midnight Blue  
  [/#1E9BD7/gi, '#0b1d3a'],
  [/rgba\(30,\s*155,\s*215,\s*([\d.]+)\)/g, (_, a) => `rgba(11, 29, 58, ${a})`],
  // Old forest -> Darker Midnight
  [/#0A3D2E/gi, '#081529'],
];

// Shadow lightening
const shadowReplacements = [
  // Heavy green shadows -> removed
  [/box-shadow:\s*0\s+\d+px\s+\d+px\s+rgba\(46,\s*170,\s*99,\s*[\d.]+\)[^;]*;/g, 
   'box-shadow: 0 2px 8px rgba(11, 29, 58, 0.04);'],
  // Heavy dark shadows -> ultra light
  [/box-shadow:\s*0\s+[2-9]\dpx\s+[3-9]\dpx\s+rgba\(\d+,\s*\d+,\s*\d+,\s*0\.[2-9]\d*\)[^;]*;/g,
   'box-shadow: 0 4px 12px rgba(11, 29, 58, 0.05);'],
  [/box-shadow:\s*0\s+[1-3]\dpx\s+[3-9]\dpx\s+rgba\(\d+,\s*\d+,\s*\d+,\s*0\.[1-9]\d*\)[^;]*;/g,
   'box-shadow: 0 2px 8px rgba(11, 29, 58, 0.04);'],
];

// Border radius flattening (for card-like elements, pill to subtle)
const radiusReplacements = [
  // Pill shapes (buttons) -> 4px
  [/border-radius:\s*50px;/g, 'border-radius: 4px;'],
  // Big round cards -> 12px max
  [/border-radius:\s*(28|24|22|20|18)px;/g, 'border-radius: 12px;'],
  [/border-radius:\s*(16|14)px;/g, 'border-radius: 8px;'],
];

let totalChanges = 0;

componentFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Apply color replacements
  colorReplacements.forEach(([pattern, replacement]) => {
    content = content.replace(pattern, replacement);
  });

  // Apply shadow replacements
  shadowReplacements.forEach(([pattern, replacement]) => {
    content = content.replace(pattern, replacement);
  });

  // Apply radius replacements
  radiusReplacements.forEach(([pattern, replacement]) => {
    content = content.replace(pattern, replacement);
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalChanges++;
    console.log(`✅ Mis à jour: ${filePath}`);
  }
});

// ─────────────────────────────────────────────
// 3. AJOUT DU BLOC GLOBAL dans styles.scss
// ─────────────────────────────────────────────
// Ajouter un bloc global après le :root pour gérer buttons + images  
const globalOverrides = `

// ============================================================
// MINIMALIST THEME — Global Overrides
// Applied uniformly to all pages. Do NOT override per-component.
// ============================================================

// --- Buttons: ghost on hover, 4px radius, no heavy shadow ---
.btn--primary,
.btn-primary,
[class*="btn"]:not([class*="btn--secondary"]):not([class*="btn--outline"]):not(.btn-close):not(.btn-outline-brand) {
  border-radius: 4px !important;
  box-shadow: none !important;
  font-weight: 500;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  font-size: 0.82rem;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

// --- Cards: flat, fine border, near-invisible shadow ---
.card,
[class*="-card"],
[class*="card-"],
.bento-card,
.pole-card-modern,
.vision-card,
.pacte-scorecard {
  box-shadow: 0 1px 4px rgba(11, 29, 58, 0.04) !important;
  border: 1px solid rgba(11, 29, 58, 0.06) !important;
  border-radius: 12px !important;
}

// --- Images on cards: subtle desaturation + slight contrast ---
[class*="-card"] img,
[class*="card-"] img,
.pole-card-img,
.bento-card img {
  filter: saturate(0.82) contrast(1.06);
}
`;

// Append only if not already present
const stylesContent = fs.readFileSync(stylesPath, 'utf8');
if (!stylesContent.includes('MINIMALIST THEME — Global Overrides')) {
  fs.appendFileSync(stylesPath, globalOverrides, 'utf8');
  console.log('✅ Bloc "MINIMALIST THEME — Global Overrides" ajouté à styles.scss');
}

console.log(`\n🎉 DONE — ${totalChanges} fichier(s) composant mis à jour + styles.scss reconfiguré.`);
