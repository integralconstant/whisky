import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {laphroaigSingleSpecialWhiskies as candidates} from '../src/data/whiskies-laphroaig-single-special.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const previous=await read('.cache/catalog-before-laphroaig-single-special.json');
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
const names=new Set(previous.flatMap(x=>[norm(x.name),norm(x.englishName)]));
const file='scripts/whisky-photo-sources-laphroaig-verified.json',photos=await read(file),urls=await read('.cache/laphroaig-single-special-urls.json');
urls.mallmann='https://www.laphroaig.com/sites/default/files/styles/original/public/2023-12/francis-mallman-17-yo-in-front-of-wall%20%281%29.jpg.webp?itok=g94MeTdo';
for(const item of candidates){assert.ok(!previous.some(x=>x.id===item.id));assert.ok(!names.has(norm(item.name))&&!names.has(norm(item.englishName)));names.add(norm(item.name));names.add(norm(item.englishName));photos[item.id]={imageUrl:urls[item.age===17?'mallmann':'ember'],sourceUrl:item.source,productName:item.englishName,note:item.age===17?'공식 실물 사진 17년·700ml·54.9%와 제품명 확인; WhiskyShop경매A80809 및 BBR54.9% 교차확인.':'공식 라벨 IslayEmber2014·802279·312병·700ml·59.6% 확인. 생산자 FAQ는 no water 명시; 나이 추정하지 않음.'};}
await save(file,photos);
await save('scripts/catalog-candidates/laphroaig-single-special-integration.json',{checkedAt:new Date().toISOString(),status:'registered-pending-verification',previousCount:previous.length,ids:candidates.map(x=>x.id),sources:[...candidates.map(x=>x.source),'https://www.whiskyshop.com/auctions/a80809-laphroaig-17-year-old-francis-mallman'],photoReview:Object.fromEntries(candidates.map(x=>[x.id,photos[x.id].note])),notesProvenance:'Each producer page paraphrased separately. Islay Ember no water statement explicitly supports CS; exact age remains null.',duplicateCheck:'IDs and normalized Korean/English names checked against538 entries and within cohort.',remaining:'Mallmann CS classification needs producer or label corroboration; no CS inferred from54.9% alone.'});
console.log({previous:previous.length,added:candidates.map(x=>x.id)});
