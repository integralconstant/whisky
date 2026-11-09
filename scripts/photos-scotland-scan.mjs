import fs from 'node:fs/promises';
import { scotlandWhiskies } from '../src/data/whiskies-scotland.ts';
const coverage = JSON.parse(await fs.readFile(new URL('./dailyshot-coverage.json', import.meta.url), 'utf8')).entries;
const targets = scotlandWhiskies.filter(w => !coverage[w.id]?.topProductId);
const records = {};
for (let i = 0; i < targets.length; i += 5) {
  await Promise.all(targets.slice(i, i + 5).map(async w => {
    try {
      const res = await fetch(w.source, { signal: AbortSignal.timeout(20000) });
      const html = await res.text();
      const relevant = [...html.matchAll(/<meta\b[^>]*>|<img\b[^>]*>|https?:[^\s"'<>]+\.(?:png|jpe?g|webp)(?:\?[^\s"'<>]*)?/gi)].map(m => m[0]).filter(t => !t.startsWith('<meta') || /image|og:title/i.test(t));
      records[w.id] = { name: w.englishName, sourceUrl: w.source, status: res.status, tags: relevant };
      console.log(w.id, res.status, relevant.length);
    } catch (error) { records[w.id] = { error: error.message }; }
  }));
  await fs.writeFile(new URL('./photos-scotland-scan.json', import.meta.url), JSON.stringify(records, null, 2));
}
