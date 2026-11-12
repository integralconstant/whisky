import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {laphroaig16Whiskies as candidates} from '../src/data/whiskies-laphroaig-16.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const previous=await read('.cache/catalog-before-laphroaig-16.json');
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
const names=new Set(previous.flatMap(x=>[norm(x.name),norm(x.englishName)]));
const file='scripts/whisky-photo-sources-laphroaig-verified.json',photos=await read(file);
for(const item of candidates){assert.ok(!previous.some(x=>x.id===item.id));assert.ok(!names.has(norm(item.name))&&!names.has(norm(item.englishName)));names.add(norm(item.name));names.add(norm(item.englishName));photos[item.id]={imageUrl:item.abv===43?'https://www.whiskynotes.be/upload/Laphroaig-16-Year-Old_B5AE/laphroaig-16-years.jpg':'https://img.thewhiskyexchange.com/900/lrgob.16yov1.jpg',sourceUrl:item.source,productName:item.englishName,note:item.abv===43?'2015직접리뷰 제품사진16년·200주년 확인.43%35cl는해당리뷰 및WhiskyShopA17133교차확인.':'실물 라벨16년·48%·700ml 확인. 병입 연도 미확인;2019출시계열과 특정배치를 구분.'};}
await save(file,photos);
await save('scripts/catalog-candidates/laphroaig-16-integration.json',{checkedAt:new Date().toISOString(),status:'registered-pending-verification',previousCount:previous.length,ids:candidates.map(x=>x.id),sources:[...candidates.map(x=>x.source),'https://whiskygospel.com/2019/12/01/laphroaig-16-year-old-2019/','https://www.whiskyshop.com/auctions/a17133-laphroaig-16-year-old-travel-retail'],photoReview:Object.fromEntries(candidates.map(x=>[x.id,photos[x.id].note])),notesProvenance:'Separate firsthand2015/2019 reviews for43%/48%;2019review batch difference disclosed for generic48% entry.',duplicateCheck:'IDs and normalized Korean/English names checked against552 entries and within cohort.',remaining:'2015photo is small; seek higher-resolution exact photo. US750ml market variant and exact dated batches require separate evidence.'});
console.log({previous:previous.length,added:candidates.map(x=>x.id)});
