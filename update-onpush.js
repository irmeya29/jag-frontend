const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const targetDir = path.join(__dirname, 'src', 'app');

walk(targetDir, (filePath) => {
  if (!filePath.endsWith('.ts') || filePath.endsWith('.spec.ts') || filePath.endsWith('.routes.ts') || filePath.endsWith('.config.ts')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('@Component({')) {
    let modified = false;

    // Ajouter l'import
    if (!content.includes('ChangeDetectionStrategy')) {
      // Trouver l'import @angular/core
      const importCoreRegex = /import\s+{([^}]+)}\s+from\s+['"]@angular\/core['"];/;
      const match = content.match(importCoreRegex);
      if (match) {
        const imports = match[1];
        const newImports = imports + ', ChangeDetectionStrategy';
        content = content.replace(importCoreRegex, `import {${newImports}} from '@angular/core';`);
        modified = true;
      }
    }

    // Ajouter la stratégie
    if (!content.includes('changeDetection:')) {
      content = content.replace(/@Component\(\{/, '@Component({\n  changeDetection: ChangeDetectionStrategy.OnPush,');
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  }
});
