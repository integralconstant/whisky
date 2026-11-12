import assert from 'node:assert/strict';
import {readFile,writeFile,stat} from 'node:fs/promises';
import {whiskies} from '../src/data/whiskies.ts';
import {whiskyImages} from '../src/data/whisky-images.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const previous=await read('.cache/catalog-before-laphroaig-10-43.json');
for(const item of previous)assert.deepEqual(whiskies.find(x=>x.id===item.id),item);
const id='laphroaig-10-43-750',item=whiskies.find(x=>x.id===id),recordFile='scripts/catalog-candidates/laphroaig-10-43-integration.json';
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
assert.ok(!previous.some(x=>x.id===id||norm(x.name)===norm(item.name)||norm(x.englishName)===norm(item.englishName)));
assert.equal(item.age,10);assert.equal(item.abv,43);assert.ok(!item.caskStrength);
if(process.argv.includes('--verify')){
  assert.ok((await stat('public'+whiskyImages[id].path)).size>500);
  assert.equal(item.dailyshotProduct.url,'https://dailyshot.co/m/item/17652');
  assert.ok(item.dailyshotPrice?.average>0);assert.equal(item.dailyshotPrice.volumeMl,750);
  const record=await read(recordFile);Object.assign(record,{status:'integrated-verified',existingEntriesPreserved:previous.length,currentCount:whiskies.length,photo:whiskyImages[id].path,dailyshot:item.dailyshotProduct,price:item.dailyshotPrice});await save(recordFile,record);
  const f='scripts/catalog-candidates/laphroaig-inventory.json',inv=await read(f),e=inv.entries.find(x=>x.runtimeId===id),data={name:item.englishName,status:'integrated',runtimeId:id,integrationRecord:'laphroaig-10-43-integration.json'};if(e)Object.assign(e,data);else inv.entries.push(data);
  const l=whiskies.filter(x=>x.brand==='Laphroaig');Object.assign(inv.runtimeSnapshot,{checkedAt:new Date().toISOString(),rawCount:l.length,expressions:l.map(x=>x.englishName)});await save(f,inv);
}else{
  const f='scripts/whisky-photo-sources-laphroaig-verified.json',photos=await read(f);photos[id]={imageUrl:'https://d1e2y5wc27crnp.cloudfront.net/media/core/product/thumbnail/9eedaac0-7b8a-4ad4-99d1-2a8be6e1f8b5.webp',sourceUrl:item.source,productName:item.englishName,note:'Actual current bottle and carton reviewed:10years,750ml,43% visible. Not the40%700ml orCS expression.'};await save(f,photos);
  const mf='scripts/dailyshot-mappings.json',m=await read(mf);m[id]={topProductId:17652,volumeMl:750,productName:'라프로익 10년 43% 750ml',englishName:'Laphroaig 10yo 43% 750ml',abv:43,method:'manual-verified-expression',sourceUrl:item.source,verifiedAt:new Date().toISOString().slice(0,10),note:'Exact10year,43%,750ml matched to actual bottle/carton and Dailyshot Information. Old packaging7699 not separately registered or pooled.'};await save(mf,m);
  await save(recordFile,{checkedAt:new Date().toISOString(),status:'registered-pending-verification',ids:[id],previousCount:previous.length,sources:[item.source,'https://www.laphroaig.com/whiskies/10-year-old'],photoReview:photos[id].note,notesProvenance:'Exact Dailyshot product guidance paraphrased.',duplicateCheck:'IDs and normalized names checked against559 entries. Existing laphroaig-10 is40% with700ml photograph, preserved intact. Separate43%750ml market specification; packaging7699 not added as duplicate.'});
}
console.log({preserved:previous.length,total:whiskies.length,verified:process.argv.includes('--verify')});
