const sharp = require('sharp');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve('public');
(async () => {
  const sources = fs.readdirSync(path.join(root, 'cases'), {withFileTypes:true}).filter(e=>e.isDirectory());
  let before = 0, after = 0;
  for (const dir of sources) {
    for (const file of fs.readdirSync(path.join(root,'cases',dir.name)).filter(f=>f.endsWith('.png'))) {
      const input = path.join(root,'cases',dir.name,file);
      const out = input.replace(/\.png$/, '.webp');
      await sharp(input).resize({width:1265, withoutEnlargement:true}).webp({quality:86, effort:5}).toFile(out);
      before += fs.statSync(input).size;
      after += fs.statSync(out).size;
    }
  }
  const portrait = path.join(root,'valeriy-parshin.png');
  await sharp(portrait).resize({width:720, withoutEnlargement:true}).webp({quality:87, effort:5}).toFile(path.join(root,'valeriy-parshin.webp'));
  before += fs.statSync(portrait).size;
  after += fs.statSync(path.join(root,'valeriy-parshin.webp')).size;
  console.log(JSON.stringify({originalBytes:before, optimizedBytes:after, reductionPercent:Math.round(100*(1-after/before))}));
})().catch(e=>{console.error(e);process.exitCode=1});
