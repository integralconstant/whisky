import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {laphroaigArchiveWhiskies as candidates} from '../src/data/whiskies-laphroaig-archive.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const previous=await read('.cache/catalog-before-laphroaig-archive.json');
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
const names=new Set(previous.flatMap(x=>[norm(x.name),norm(x.englishName)]));
const file='scripts/whisky-photo-sources-laphroaig-verified.json',photos=await read(file);
const urls={36:'https://www.laphroaig.com/sites/default/files/styles/original/public/2023-11/Laphroaig_TheArchive36YO_BottleFront_4666819.png.webp?itok=OBE7J70j',38:'https://www.laphroaig.com/sites/default/files/styles/original/public/2025-06/PNG%20Archive.png.webp?itok=kSQTsl9m'};
for(const item of candidates){assert.ok(!previous.some(x=>x.id===item.id));assert.ok(!names.has(norm(item.name))&&!names.has(norm(item.englishName)));names.add(norm(item.name));names.add(norm(item.englishName));photos[item.id]={imageUrl:urls[item.age],sourceUrl:item.source,productName:item.englishName,note:`공식 실물 사진 ${item.age}년 표기 확인. 도수·700ml는 개별 TWE 상품 사양과 교차 확인. 36년 CS는 생산자 명시, 38년 CS는 미확인.`};}
await save(file,photos);
await save('scripts/catalog-candidates/laphroaig-archive-integration.json',{checkedAt:new Date().toISOString(),status:'registered-pending-verification',previousCount:previous.length,ids:candidates.map(x=>x.id),sources:[...candidates.map(x=>x.source),'https://www.thewhiskyexchange.com/p/79582/laphroaig-36-year-old-the-archive-collection','https://www.thewhiskyexchange.com/p/84654/laphroaig-38-year-old-the-archive-collection'],photoReview:'Official bottle images inspected: ages36 and38. ABV and70cl crosschecked with individual retailer specifications; not visible on front image.',duplicateCheck:'IDs and normalized Korean/English names checked against534 entries and within cohort.',remaining:'38yo CS classification and US750ml listing require further producer/label evidence. No bottling year inferred from age/vintage; no Wall collection merge.'});
console.log({previous:previous.length,added:candidates.map(x=>x.id)});
