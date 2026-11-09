import fs from "node:fs";
const rows = JSON.parse(fs.readFileSync("scripts/photos-world-candidates.json", "utf8"));
for (const id of process.argv.slice(2)) {
 const row = rows[id];
 console.log(id);
 for (const tag of row?.images || []) {
  const src = tag.match(/\bsrc=["']([^"']*)/)?.[1];
  const alt = tag.match(/\balt=["']([^"']*)/)?.[1];
  if(src && !/logo|icon|sprite|award|medal/i.test(src)) console.log(JSON.stringify({src,alt}));
 }
}
