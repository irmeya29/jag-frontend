import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve('public');
const SRC_DIR = path.resolve('src');

async function processImages() {
  const files = await fs.readdir(PUBLIC_DIR);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  console.log(`Found ${imageFiles.length} images to process.`);

  let totalSaved = 0;
  const replacements = [];

  for (const file of imageFiles) {
    const ext = path.extname(file);
    const basename = path.basename(file, ext);
    const originalPath = path.join(PUBLIC_DIR, file);
    
    // We skip if it's already a .webp
    if (ext.toLowerCase() === '.webp') continue;

    const webpFilename = `${basename}.webp`;
    const webpPath = path.join(PUBLIC_DIR, webpFilename);

    try {
      const origStat = await fs.stat(originalPath);
      
      // Convert to webp
      await sharp(originalPath)
        .webp({ quality: 75 })
        .toFile(webpPath);
      
      const newStat = await fs.stat(webpPath);
      
      // If the new file is smaller, we keep it and delete the old one
      if (newStat.size < origStat.size) {
        totalSaved += (origStat.size - newStat.size);
        console.log(`Compressed ${file}: ${(origStat.size / 1024 / 1024).toFixed(2)} MB -> ${(newStat.size / 1024 / 1024).toFixed(2)} MB`);
        
        // Remove original
        await fs.unlink(originalPath);

        // Record replacement for source files
        replacements.push({
          old: file,
          new: webpFilename
        });
      } else {
        // If webp is larger (rare), keep original
        await fs.unlink(webpPath);
        console.log(`Skipped ${file} (WebP was larger)`);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }

  console.log(`\nTotal space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
  
  if (replacements.length > 0) {
    console.log(`\nUpdating source files references...`);
    await updateSourceFiles(replacements);
  }
}

async function walk(dir, callback) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    const stat = await fs.stat(filepath);
    if (stat.isDirectory()) {
      await walk(filepath, callback);
    } else {
      await callback(filepath);
    }
  }
}

async function updateSourceFiles(replacements) {
  let filesUpdated = 0;
  await walk(SRC_DIR, async (filepath) => {
    if (!/\.(html|ts|scss|css)$/i.test(filepath)) return;
    
    let content = await fs.readFile(filepath, 'utf-8');
    let changed = false;

    for (const r of replacements) {
      // Need to match exactly the filename in different contexts
      // e.g., src="/mat-premi.jpg" or url('/terr.jpg')
      const regex = new RegExp(`(['"\\/\\\\])${escapeRegExp(r.old)}(['"\\)?])`, 'g');
      if (regex.test(content)) {
        content = content.replace(regex, `$1${r.new}$2`);
        changed = true;
      }
    }

    if (changed) {
      await fs.writeFile(filepath, content, 'utf-8');
      filesUpdated++;
    }
  });
  console.log(`Updated references in ${filesUpdated} files.`);
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

processImages().catch(console.error);
