import { writeFile } from 'node:fs/promises';

const pages = {
  'wild-turkey-rare-breed': 'https://www.wildturkeybourbon.com/en-us/products/rare-breed/',
  'wild-turkey-rare-breed-rye': 'https://www.wildturkeybourbon.com/en-us/products/rare-breed-rye/',
  'elijah-craig-barrel-proof': 'https://elijahcraig.com/barrel-proof',
  'larceny-barrel-proof': 'https://larcenybourbon.com/barrel-proof/',
  'makers-mark-cask-strength': 'https://www.makersmark.com/en-us/bourbons/makers-mark-cask-strength',
  'bulleit-barrel-strength': 'https://www.bulleit.com/whiskeys/bulleit-barrel-strength',
  'jack-daniels-single-barrel-barrel-proof': 'https://pressroom.jackdaniels.com/jack-daniels-single-barrel-announces-premier-barrel-strength-whiskey-with-launch-of-barrel-proof/',
  'jack-daniels-single-barrel-barrel-proof-rye': 'https://pressroom.jackdaniels.com/jack-daniels-welcomes-single-barrel-barrel-proof-rye-whiskey-as-permanent-extension-of-its-single-barrel-collection/'
};
const results = await Promise.all(Object.entries(pages).map(async ([id, sourceUrl]) => {
  const response = await fetch(sourceUrl);
  const html = await response.text();
  const images = [...new Set([...html.matchAll(/(?:src|data-src|content|data-lazy-src)=["']([^"']+\.(?:jpg|jpeg|png|webp)(?:\?[^"']*)?)["']/gi)].map(match => new URL(match[1].replaceAll('&amp;', '&'), sourceUrl).href))];
  return { id, sourceUrl, status: response.status, images };
}));
await writeFile('scripts/photos-cs-america-scan.json', JSON.stringify(results, null, 2) + '\n');
for (const row of results) console.log(JSON.stringify(row));
