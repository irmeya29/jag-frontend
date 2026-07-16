const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('src/app', function(filePath) {
    if (filePath.endsWith('.scss')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // 1. Replace large shadows with minimalist soft shadow + fine border
        // Regex looks for box-shadow: followed by something that looks like a heavy shadow
        content = content.replace(/box-shadow:\s*0\s+[1-3]?\dpx\s+[2-6]?\dpx\s+rgba\([^)]+\)\s*;/g, 
            'box-shadow: var(--shadow-md);\n    border: 1px solid rgba(11, 29, 58, 0.05);');

        // 2. Replace large border-radii for cards (12px to 32px)
        content = content.replace(/border-radius:\s*(12|14|16|18|20|24|28|32)px\s*;/g, 'border-radius: var(--radius-xl);');
        
        // 3. Replace pill shape (50px) mostly used for buttons, with 4px
        content = content.replace(/border-radius:\s*50px\s*;/g, 'border-radius: 4px;');

        // 4. Add filter to images (simple approach: look for img tags or classes ending in img/image)
        content = content.replace(/(img\s*\{|img\s*,\s*|-[iI]mg\s*\{|-[iI]mage\s*\{)/g, (match) => {
            // We append the filter property right after the opening brace if it's there
            if (match.endsWith('{')) {
                return match + '\n    filter: saturate(0.8) contrast(1.1);';
            }
            return match;
        });

        // 5. Button ghost effect on hover
        // Look for &:hover inside button-like selectors and force background transparent
        // This is a bit tricky with Regex, so we'll just look for standard btn hover blocks
        content = content.replace(/(\.btn[^{]*\{[^}]*&:hover\s*\{)([^}]+)\}/g, (match, prefix, hoverContent) => {
            if (hoverContent.includes('background') && !hoverContent.includes('transparent')) {
                return prefix + '\n        background-color: transparent !important;\n        color: var(--jag-green) !important;\n        border-color: var(--jag-green) !important;\n    }';
            }
            return match;
        });


        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    }
});
