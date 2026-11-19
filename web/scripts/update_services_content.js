const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'components', 'smartphoto', 'ServicesContent.tsx');
let text = fs.readFileSync(targetFile, 'utf8');

const regexOld = /const categories = \[[\s\S]*?\];/;
const replacement = `const categories = [
    { id: "all", label: "All Services" },
    { id: "real-estate", label: "Real Estate Image Editing" },
    { id: "image-clipping", label: "Image Clipping Services" },
    { id: "portrait", label: "Portrait Editing Services" },
    { id: "wedding", label: "Wedding Photo Post Processing" },
  ];`;

text = text.replace(regexOld, replacement);
text = text.replace('s.id === selectedCategory', 's.id === selectedCategory || s.slug === selectedCategory');

fs.writeFileSync(targetFile, text, 'utf8');
console.log('Successfully updated ServicesContent.tsx!');
