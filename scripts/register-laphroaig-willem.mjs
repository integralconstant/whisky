import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {laphroaigWillemWhiskies as candidates} from '../src/data/whiskies-laphroaig-willem.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const previous=await read('.cache/catalog-before-laphroaig-willem.json');
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
const names=new Set(previous.flatMap(x=>[norm(x.name),norm(x.englishName)]));
const file='scripts/whisky-photo-sources-laphroaig-verified.json',photos=await read(file);
for(const item of candidates){assert.ok(!previous.some(x=>x.id===item.id));assert.ok(!names.has(norm(item.name))&&!names.has(norm(item.englishName)));photos[item.id]={imageUrl:'https://www.laphroaig.com/sites/default/files/styles/original/public/2026-04/05010019001740_M1N0_en-GB0331_s012.jpg.webp?itok=4_Nw2KKP',sourceUrl:item.source,productName:item.englishName,note:'공식 실물 라벨 WillemDafoeLimitedEdition·700ml·53.7% 확인. 14년과 올로로소 피니시는 공식 제품 설명 확인.'};}
await save(file,photos);
await save('scripts/catalog-candidates/laphroaig-willem-integration.json',{checkedAt:new Date().toISOString(),status:'registered-pending-verification',previousCount:previous.length,ids:candidates.map(x=>x.id),sources:candidates.map(x=>x.source),photoReview:photos[candidates[0].id].note,notesProvenance:'Producer deliberately supplies short guidance only: deep peat smoke, sea salt/spice/soft sweetness, long smoky mouthwatering finish. No detailed nose invented.',duplicateCheck:'IDs and normalized Korean/English names checked against540 entries.',remaining:'CS classification requires additional producer or label evidence. No price derived from producer euro price.'});
console.log({previous:previous.length,added:candidates.map(x=>x.id)});
