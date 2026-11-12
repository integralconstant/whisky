import assert from 'node:assert/strict';
import {readFile,writeFile,stat} from 'node:fs/promises';
import {whiskies} from '../src/data/whiskies.ts';
import {whiskyImages} from '../src/data/whisky-images.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const previous=await read('.cache/catalog-before-laphroaig-10-43-700.json');
for(const item of previous)assert.deepEqual(whiskies.find(x=>x.id===item.id),item);
const id='laphroaig-10-43-700',item=whiskies.find(x=>x.id===id),recordFile='scripts/catalog-candidates/laphroaig-10-43-700-integration.json';
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
assert.ok(!previous.some(x=>x.id===id||norm(x.name)===norm(item.name)||norm(x.englishName)===norm(item.englishName)));
assert.equal(item.age,10);assert.equal(item.abv,43);assert.ok(!item.caskStrength);
if(process.argv.includes('--verify')){
  assert.ok((await stat('public'+whiskyImages[id].path)).size>500);
  assert.equal(item.dailyshotProduct.url,'https://dailyshot.co/m/item/12972');
  assert.ok(item.dailyshotPrice?.average>0);assert.equal(item.dailyshotPrice.volumeMl,700);
  assert.ok(!item.dailyshotPrice.offers.some(x=>x.url.includes('item=641447&')),'Explicit750ml seller must be excluded');
  const record=await read(recordFile);Object.assign(record,{status:'integrated-verified',existingEntriesPreserved:previous.length,currentCount:whiskies.length,photo:whiskyImages[id].path,dailyshot:item.dailyshotProduct,price:item.dailyshotPrice});await save(recordFile,record);
  const f='scripts/catalog-candidates/laphroaig-inventory.json',inv=await read(f),e=inv.entries.find(x=>x.runtimeId===id),data={name:item.englishName,status:'integrated',runtimeId:id,integrationRecord:'laphroaig-10-43-700-integration.json'};if(e)Object.assign(e,data);else inv.entries.push(data);
  const l=whiskies.filter(x=>x.brand==='Laphroaig');Object.assign(inv.runtimeSnapshot,{checkedAt:new Date().toISOString(),rawCount:l.length,expressions:l.map(x=>x.englishName)});await save(f,inv);
}else{
  const f='scripts/whisky-photo-sources-laphroaig-verified.json',photos=await read(f);photos[id]={imageUrl:'https://d1e2y5wc27crnp.cloudfront.net/media/core/product/thumbnail/4c6e8802-131f-4c4d-8807-5ef8cc30fb09.webp',sourceUrl:item.source,productName:item.englishName,note:'Actual bottle/carton reviewed:10years,700ml,43% visible. Different volume from750ml entry and different strength from40% entry.'};await save(f,photos);
  const mf='scripts/dailyshot-mappings.json',m=await read(mf);m[id]={topProductId:12972,volumeMl:700,productName:'라프로익 10년 43% 700ml',englishName:'Laphroaig 10yo 43% 700ml',abv:43,method:'manual-verified-expression',sourceUrl:item.source,verifiedAt:new Date().toISOString().slice(0,10),note:'Actual bottle/carton and Information agree43%700ml. Existing offer volume filter excludes sellers whose name_tag explicitly says750ml.',priceNote:'43%·700ml 제품의 국내 스토어 판매가입니다. 판매처가 750ml라고 별도 표시한 상품은 집계에서 제외합니다.'};await save(mf,m);
  await save(recordFile,{checkedAt:new Date().toISOString(),status:'registered-pending-verification',ids:[id],previousCount:previous.length,sources:[item.source],photoReview:photos[id].note,notesProvenance:'Exact Dailyshot product guidance paraphrased.',duplicateCheck:'IDs and normalized names checked against560 entries.40%700ml and43%750ml retained; no second entry for packaging changes.',sellerCaution:'Dailyshot12972?item=641447&seller=18631 explicitly says750ml despite parent700ml; existing named-volume mismatch filter must exclude it.'});
}
console.log({preserved:previous.length,total:whiskies.length,verified:process.argv.includes('--verify')});
