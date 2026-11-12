import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {laphroaigStrongWhiskies as candidates} from '../src/data/whiskies-laphroaig-strong.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const previous=await read('.cache/catalog-before-laphroaig-strong.json');
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
const names=new Set(previous.flatMap(x=>[norm(x.name),norm(x.englishName)]));
const file='scripts/whisky-photo-sources-laphroaig-verified.json',photos=await read(file),urls=await read('.cache/laphroaig-strong-urls.json');
for(const item of candidates){assert.ok(!previous.some(x=>x.id===item.id));assert.ok(!names.has(norm(item.name))&&!names.has(norm(item.englishName)));names.add(norm(item.name));names.add(norm(item.englishName));photos[item.id]={imageUrl:urls[item.age===33?1:2],sourceUrl:item.source,productName:item.englishName,note:item.age===33?'공식 사진 DonaldJohnston 일러스트 병 확인. 33년·43.8%·700ml는 공식설명 및 SAQ15443509 사양 교차확인.':'공식 실물 사진 35년·DugaldJohnston·43.8% 확인. 700ml는 개별70cl판매처 자료와 대조.'};}
await save(file,photos);
await save('scripts/catalog-candidates/laphroaig-strong-integration.json',{checkedAt:new Date().toISOString(),status:'registered-pending-verification',previousCount:previous.length,ids:candidates.map(x=>x.id),sources:[...candidates.map(x=>x.source),'https://www.saq.com/en/15443509','https://www.masterofmalt.com/whiskies/laphroaig/laphroaig-35-year-old-strong-characters-chapter-2-dugald-johnston-whisky/'],photoReview:Object.fromEntries(candidates.map(x=>[x.id,photos[x.id].note])),notesProvenance:'Each producer tasting section paraphrased separately. Chapter1 explicitly fixed strength; chapter2 CS unresolved. No imported gift print treated as separate whisky.',duplicateCheck:'IDs and normalized Korean/English names checked against541 entries and within cohort.',remaining:'Chapter2 CS classification requires producer or label corroboration. No other33yo or35yo price copied.'});
console.log({previous:previous.length,added:candidates.map(x=>x.id)});
