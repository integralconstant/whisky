import fs from 'node:fs';
import { speysideWhiskies } from '../src/data/whiskies-speyside.ts';
const coverage = JSON.parse(fs.readFileSync('scripts/dailyshot-coverage.json', 'utf8')).entries;
const missing = speysideWhiskies.filter(w => !coverage[w.id]?.topProductId);
const result = {};
for (let offset = 0; offset < missing.length; offset += 5) {
  await Promise.all(missing.slice(offset, offset + 5).map(async w => {
    try {
      const r = await fetch(w.source, { signal: AbortSignal.timeout(30000), headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await r.text();
      const images = [...html.matchAll(/<img\b[^>]*>/gi)].map(m => m[0]);
      const meta = [...html.matchAll(/<meta\b[^>]*(?:og:image|twitter:image)[^>]*>/gi)].map(m => m[0]);
      result[w.id] = { name: w.englishName, source: w.source, status: r.status, meta, images };
    } catch (err) { result[w.id] = { name: w.englishName, source: w.source, error: String(err) }; }
  }));
  fs.writeFileSync('scripts/photos-speyside-scan.json', JSON.stringify(result, null, 2));
  console.log(`Scanned ${Math.min(offset + 5, missing.length)} / ${missing.length}`);
}
