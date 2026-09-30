const fs = require('fs');
const path = require('path');

const replacements = [
  { file: 'src/app/nospoles/pole1/pole1.html', search: 'hero_farmland.webp', replace: 'pole1hero.webp' },
  { file: 'src/app/pages/notreprocessus/notreprocessus.html', search: 'plannificat.webp', replace: 'analyse-terrain.webp' },
  { file: 'src/app/nospoles/pole2/pole2.html', search: 'coffre.webp', replace: 'industrie.webp' },
  { file: 'src/app/nospoles/pole2/pole2.html', search: 'brief.webp', replace: 'conn.webp' },
  { file: 'src/app/nospoles/pole2/pole2.html', search: 'terre.webp', replace: 'terre-nue.webp' },
  { file: 'src/app/nospoles/pole2/pole2.html', search: 'livraison.webp', replace: 'tracteur.webp' },
  { file: 'src/app/nospoles/pole2/pole2.html', search: 'femme2.webp', replace: 'dame2.webp' },
  { file: 'src/app/pages/notreprocessus/notreprocessus.html', search: 'expertiset.webp', replace: 'vision_expertise.webp' },
  { file: 'src/app/pages/notreprocessus/notreprocessus.html', search: 'vege2.png', replace: 'branche.webp' },
  { file: 'src/app/pages/home/home.html', search: 'vision_main.webp', replace: 'mains.webp' },
  { file: 'src/app/pages/home/home.html', search: 'vision_tractor.webp', replace: 'tract.webp' }
];

const basePath = path.join(__dirname);

for (const r of replacements) {
  const fullPath = path.join(basePath, r.file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes(r.search)) {
      // Remplacer toutes les occurrences dans le fichier
      const regex = new RegExp(r.search, 'g');
      content = content.replace(regex, r.replace);
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Replaced ${r.search} with ${r.replace} in ${r.file}`);
    }
  } else {
    console.log(`File not found: ${fullPath}`);
  }
}
