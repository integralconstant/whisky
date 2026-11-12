import assert from 'node:assert/strict';
import {readFile,writeFile,stat} from 'node:fs/promises';
import {whiskies} from '../src/data/whiskies.ts';
import {whiskyImages} from '../src/data/whisky-images.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const previous=await read('.cache/catalog-before-laphroaig-je.json');
for(const item of previous)assert.deepEqual(whiskies.find(x=>x.id===item.id),item);
const id='laphroaig-je-2015-10-refill',item=whiskies.find(x=>x.id===id),recordFile='scripts/catalog-candidates/laphroaig-je-integration.json';
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
assert.ok(!previous.some(x=>x.id===id||norm(x.name)===norm(item.name)||norm(x.englishName)===norm(item.englishName)));
assert.equal(item.age,10);assert.equal(item.abv,52.3);assert.equal(item.caskStrength,true);
if(process.argv.includes('--verify')){
  assert.ok((await stat('public'+whiskyImages[id].path)).size>500);
  assert.equal(item.dailyshotProduct.url,'https://dailyshot.co/m/item/37491');
  const record=await read(recordFile);Object.assign(record,{status:'integrated-verified',existingEntriesPreserved:previous.length,currentCount:whiskies.length,photo:whiskyImages[id].path,dailyshot:item.dailyshotProduct,price:item.dailyshotPrice||null});await save(recordFile,record);
  const f='scripts/catalog-candidates/laphroaig-inventory.json',inv=await read(f),e=inv.entries.find(x=>x.runtimeId===id),data={name:item.englishName,status:'integrated',runtimeId:id,integrationRecord:'laphroaig-je-integration.json'};if(e)Object.assign(e,data);else inv.entries.push(data);
  const l=whiskies.filter(x=>x.brand==='Laphroaig');Object.assign(inv.runtimeSnapshot,{checkedAt:new Date().toISOString(),rawCount:l.length,expressions:l.map(x=>x.englishName)});await save(f,inv);
}else{
  const f='scripts/whisky-photo-sources-laphroaig-verified.json',photos=await read(f);photos[id]={imageUrl:'https://d1e2y5wc27crnp.cloudfront.net/media/core/product/thumbnail/ec451cd9-db37-477a-a977-a015749e8c8a.webp',sourceUrl:item.source,productName:item.englishName,note:'Actual James Eadie bottle reviewed:10years,FROM LAPHROAIG DISTILLERY,52.3%,70cl visible. Vintage2015/refill identity confirmed by Dailyshot37491 and WhiskyBarrel exact release.'};await save(f,photos);
  const mf='scripts/dailyshot-mappings.json',m=await read(mf);m[id]={...m[id],topProductId:37491,volumeMl:700,productName:'제임스 에디 2015 라프로익 10년 리필 배럴',englishName:'James Eadie 2015 Laphroaig 10yo Refill Barrels',abv:52.3,method:'manual-verified-expression',sourceUrl:item.source,verifiedAt:new Date().toISOString().slice(0,10),note:'Exact bottler,vintage2015,age10,refill barrels,52.3%,700ml matched to bottle photograph and retailer release.'};await save(mf,m);
  await save(recordFile,{checkedAt:new Date().toISOString(),status:'registered-pending-verification',ids:[id],previousCount:previous.length,sources:[item.source,'https://www.thewhiskybarrel.com/products/laphroaig-10-year-old-2015-distilleries-of-great-britain-ireland-commemorative','https://www.whizita.de/en/laphroaig-2015-james-eadie-52-3/wsm06133'],photoReview:photos[id].note,notesProvenance:'Exact Dailyshot product tasting guidance paraphrased, not represented as firsthand review.',caskStrengthEvidence:'Whizita exact product details explicitly state Cask strength:Yes. No single-cask claim;3refillbarrels.',duplicateCheck:'ID and normalized Korean/English names compared against558 entries; no JamesEadie expression already present.'});
}
console.log({preserved:previous.length,total:whiskies.length,verified:process.argv.includes('--verify')});
