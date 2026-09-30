const fs = require('fs');
const path = require('path');

const imageRegex = /([\w-]+\.(?:webp|jpg|jpeg|png))/gi;
const imageMap = {}; // { imageName: Set<filePath> }

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else {
      if (['.html', '.scss', '.ts'].includes(path.extname(fullPath))) {
        const content = fs.readFileSync(fullPath, 'utf8');
        let match;
        while ((match = imageRegex.exec(content)) !== null) {
          const img = match[1];
          if (!imageMap[img]) {
            imageMap[img] = new Set();
          }
          // Stocker le chemin relatif pour la lisibilité
          imageMap[img].add(fullPath.replace(__dirname, ''));
        }
      }
    }
  }
}

const targetDir = path.join(__dirname, 'src', 'app');
walk(targetDir);

const duplicates = {};
for (const [img, paths] of Object.entries(imageMap)) {
  if (paths.size > 1) {
    duplicates[img] = Array.from(paths);
  }
}

console.log(JSON.stringify(duplicates, null, 2));
