import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {laphroaigWallWhiskies as candidates} from '../src/data/whiskies-laphroaig-wall.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const previous=await read('.cache/catalog-before-laphroaig-wall.json');
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
const names=new Set(previous.flatMap(x=>[norm(x.name),norm(x.englishName)]));
const file='scripts/whisky-photo-sources-laphroaig-verified.json',photos=await read(file),urls=await read('.cache/laphroaig-wall-urls.json');
for(const item of candidates){assert.ok(!previous.some(x=>x.id===item.id));assert.ok(!names.has(norm(item.name))&&!names.has(norm(item.englishName)));names.add(norm(item.name));names.add(norm(item.englishName));photos[item.id]={imageUrl:urls[item.age===36?'peat':'rope'],sourceUrl:item.source,productName:item.englishName,note:`공식 실물 라벨 ${item.age}년·${item.abv}%·700ml와 에디션명 확인. 각200병이며 병별 수작업 도안 차이는 별도 위스키로 등록하지 않음.`};}
await save(file,photos);
await save('scripts/catalog-candidates/laphroaig-wall-integration.json',{checkedAt:new Date().toISOString(),status:'registered-pending-verification',previousCount:previous.length,ids:candidates.map(x=>x.id),sources:candidates.map(x=>x.source),photoReview:'Official front labels inspected: Peat36/42.5%/700ml and Rope39/42.4%/700ml. Different from Archive36/40.2%.',notesProvenance:'Each producer page paraphrased separately; no inferred bottling years or cask-strength classification.',duplicateCheck:'IDs and normalized Korean/English names checked against536 entries and within cohort.',remaining:'CS classification for both requires additional producer or label evidence. Ace Beverage explicitly describes Peat as natural cask strength; corroboration pending.'});
console.log({previous:previous.length,added:candidates.map(x=>x.id)});
