const fs = require('fs');
const path = require('path');

const files = [
  'components/smartphoto/ServicesContent.tsx',
  'components/smartphoto/ArticlesContent.tsx',
  'components/smartphoto/BlogContent.tsx',
  'components/smartphoto/CaseStudyContent.tsx',
  'components/smartphoto/TestimonialsContent.tsx',
];

for (const relPath of files) {
  const fullPath = path.join(__dirname, '..', relPath);
  if (fs.existsSync(fullPath)) {
    let text = fs.readFileSync(fullPath, 'utf8');
    text = text.replace(/bg-\[#07152F\]/g, (match, offset, str) => {
      // only replace in loader sections (near BrandLoader or min-h-[75vh])
      const snippet = str.slice(Math.max(0, offset - 100), offset + 100);
      if (snippet.includes('BrandLoader') || snippet.includes('min-h-[')) {
        return 'bg-white';
      }
      return match;
    });
    fs.writeFileSync(fullPath, text, 'utf8');
    console.log(`Updated ${relPath}`);
  }
}
