import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {laphroaig2728Whiskies as candidates} from '../src/data/whiskies-laphroaig-27-28.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const previous=await read('.cache/catalog-before-laphroaig-27-28.json');
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
const names=new Set(previous.flatMap(x=>[norm(x.name),norm(x.englishName)]));
const file='scripts/whisky-photo-sources-laphroaig-verified.json',photos=await read(file),urls=await read('.cache/laphroaig-27-28-urls.json');
for(const item of candidates){assert.ok(!previous.some(x=>x.id===item.id));assert.ok(!names.has(norm(item.name))&&!names.has(norm(item.englishName)));names.add(norm(item.name));names.add(norm(item.englishName));photos[item.id]={imageUrl:urls[item.age],sourceUrl:item.source,productName:item.englishName,note:`실물 라벨${item.age}년·${item.abv}%·70cl·caskstrength 확인. ${item.age===27?'MAR2017 병입표기 확인.':'2018출시연도는 FineDrams 상품명 및2018직접리뷰 대조. 본문44%오기 대신44.4%라벨 채택.'}`};}
await save(file,photos);
await save('scripts/catalog-candidates/laphroaig-27-28-integration.json',{checkedAt:new Date().toISOString(),status:'registered-pending-verification',previousCount:previous.length,ids:candidates.map(x=>x.id),sources:[...candidates.map(x=>x.source),'https://www.whiskynotes.be/2018/laphroaig/laphroaig-27-years/','https://adventuresinwhiskey.com/2018/11/07/review-laphroaig-28-year-old/'],photoReview:Object.fromEntries(candidates.map(x=>[x.id,photos[x.id].note])),notesProvenance:'Separate firsthand reviews paraphrased for each product.27yo mockup colour explicitly rejected in favour of TWE photographed label.28yo label confirms44.4 andCS despite retailer copy44 typo.',duplicateCheck:'IDs and normalized Korean/English names checked against547 entries and within cohort.',remaining:'Market750ml variants and historic27yo bottlings still require own label and source evidence.'});
console.log({previous:previous.length,added:candidates.map(x=>x.id)});
