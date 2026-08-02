const sharp = require('sharp');
const fs = require('fs');
const files = ['./rides.png', './public/ghkfoto.png', './public/skin.png'];
files.forEach(f => {
  if (fs.existsSync(f)) {
    let out = f;
    if (f === './rides.png') out = './public/rides.webp';
    else out = f.replace('.png', '.webp');
    sharp(f).webp({ quality: 80 }).toFile(out).then(() => console.log('Converted ' + f + ' to ' + out)).catch(err => console.error(err));
  } else {
    console.log('File not found: ' + f);
  }
});
