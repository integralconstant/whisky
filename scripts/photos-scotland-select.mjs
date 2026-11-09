import fs from 'node:fs/promises';
const scan = JSON.parse(await fs.readFile(new URL('./photos-scotland-scan.json', import.meta.url), 'utf8'));
const output = {};
const add = (id, imageUrl, note = 'Official product page; matching named expression.') => { output[id] = { imageUrl: imageUrl.replaceAll('&amp;', '&').replace(/^http:/, 'https:'), sourceUrl: scan[id].sourceUrl, productName: scan[id].name, note }; };
for (const id of ['glenmorangie-triple-cask', 'auchentoshan-12', 'octomore-16-1', 'octomore-16-2', 'octomore-16-3', 'octomore-17-3']) {
  const tag = scan[id].tags.find(t => t.includes('property="og:image"'));
  add(id, tag.match(/content="([^"]+)"/)[1]);
}
add('caol-ila-12', 'https://images.ctfassets.net/glsfy1cpffmh/5c5Ki3rYfqgWdrd6WV92j6/1f48c602e557718dd4c91cdd2505a645/caol-ila-12-year-old-single-malt-scotch-whisky-70cl-transparent.png?fm=webp&w=700&q=85');
add('glen-scotia-victoriana', 'https://us.glenscotia.com/cdn/shop/files/VictoriannaBottle_ad6d7760-6047-4189-8841-6fea0ee0df40_600x.png?v=1736860566');
add('loch-lomond-inchmoan-12', 'https://www.lochlomondwhiskies.com/cdn/shop/products/12-Year-Old-Inchmoan.png?v=1692263890&width=700');
add('bowmore-12-sherry-oak', 'https://www.bowmore.com/sites/default/files/styles/original/public/2024-08/bowmore-sherryoak-12yo.png.webp?itok=lzBSQItS');
add('bowmore-15-sherry-oak', 'https://www.bowmore.com/sites/default/files/styles/original/public/2024-08/bowmore-sherryoak-15yo.png.webp?itok=JOIcmLL3');
add('bowmore-18-sherry-oak', 'https://www.bowmore.com/sites/default/files/styles/original/public/2024-08/bowmore-sherryoak-18yo.png.webp?itok=s8WRaLjk');
add('bowmore-21-sherry-oak', 'https://www.bowmore.com/sites/default/files/2026-03/Bowmore%20with%20Medal.png', 'Official 21-year Sherry Oak product packshot with award medal.');
add('kilchoman-rockside-11', 'https://www.kilchomandistillery.com/wp-content/uploads/2026/06/Rocksie_Bottle-1-1024x610.jpg', 'Official Rockside 11 launch article; exact bottle photographed in setting.');
add('kilchoman-loch-gorm-2026', 'https://www.kilchomandistillery.com/wp-content/uploads/2026/04/WebsiteContent_LG26-03-1024x648.jpg', 'Official 2026 release launch article; exact bottle photograph.');
await fs.writeFile(new URL('./whisky-photo-sources-scotland.json', import.meta.url), JSON.stringify(output, null, 2) + '\n');
console.log(Object.keys(output).length);
