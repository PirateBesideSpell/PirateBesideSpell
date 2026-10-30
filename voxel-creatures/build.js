const fs = require('fs');
const path = require('path');

const root = __dirname;
const creatures = require('./creatures');
const template = fs.readFileSync(path.join(root, 'src/viewer.html'), 'utf8');
const three = fs.readFileSync(path.join(root, '../.build/three.min.js'), 'utf8');
const threeLicense = fs.readFileSync(path.join(root, '../.build/THREE-LICENSE.txt'), 'utf8');
const out = path.join(root, 'dist');
fs.mkdirSync(out, { recursive: true });

for (const c of creatures) {
  const html = template
    .replace('/*__THREE__*/', () => `${three}\n/*\n${threeLicense}\n*/`)
    .replace('__CREATURE__', () => JSON.stringify(c))
    .replaceAll('__NAME__', c.name)
    .replaceAll('__NUMBER__', c.number)
    .replaceAll('__ACCENT__', c.accent)
    .replaceAll('__KIND__', c.kind)
    .replaceAll('__DESCRIPTION__', c.description)
    .replaceAll('__VFXNAME__', c.vfxName);
  fs.writeFileSync(path.join(out, `${c.number}_${c.name}.html`), html);
  console.log(`${c.number}_${c.name}.html — ${c.parts.length} parts, ${c.bones.length} bones`);
}
