import fs from 'node:fs';
import {whiskies} from '../src/data/whiskies.ts';
const coverage=JSON.parse(fs.readFileSync('scripts/dailyshot-coverage.json','utf8'));
const targets=whiskies.filter(w=>w.country!=='스코틀랜드'&&!coverage.entries[w.id]?.topProductId);
const saved={};
for (let i=0;i<targets.length;i+=8) {
  await Promise.all(targets.slice(i,i+8).map(async w=>{
    try {
      const response=await fetch(w.source,{signal:AbortSignal.timeout(20000)});
      const html=await response.text();
      const images=[...html.matchAll(/<(?:img|meta)\b[^>]*>/gi)].map(m=>m[0]).filter(s=>/src=|image["']/.test(s));
      const linkedImages=[...html.matchAll(/https?:[^\s"'<>]+\.(?:png|jpg|jpeg|webp)(?:\?[^\s"'<>]*)?/gi)].map(m=>m[0]);
      saved[w.id]={name:w.englishName,source:w.source,status:response.status,title:html.match(/<title[^>]*>([^<]*)/i)?.[1],images,linkedImages:[...new Set(linkedImages)]};
    } catch(e){ saved[w.id]={name:w.englishName,source:w.source,error:e.message}; }
  }));
  fs.writeFileSync('scripts/photos-world-candidates.json',JSON.stringify(saved,null,2));
  console.log(`${Math.min(i+8,targets.length)}/${targets.length}`);
}
