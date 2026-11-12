import assert from 'node:assert/strict';
import {readFile,writeFile,stat} from 'node:fs/promises';
import {whiskies} from '../src/data/whiskies.ts';
import {whiskyImages} from '../src/data/whisky-images.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const previous=await read('.cache/catalog-before-laphroaig-sherry-750.json');
for(const item of previous)assert.deepEqual(whiskies.find(x=>x.id===item.id),item);
const id='laphroaig-10-sherry-750',item=whiskies.find(x=>x.id===id),recordFile='scripts/catalog-candidates/laphroaig-sherry-750-integration.json';
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
assert.ok(!previous.some(x=>x.id===id||norm(x.name)===norm(item.name)||norm(x.englishName)===norm(item.englishName)));
assert.equal(item.age,10);assert.equal(item.abv,48);assert.ok(!item.caskStrength);
if(process.argv.includes('--verify')){
  assert.ok((await stat('public'+whiskyImages[id].path)).size>500);
  assert.equal(item.dailyshotProduct.url,'https://dailyshot.co/m/item/6477');
  assert.ok(item.dailyshotPrice?.average>0);assert.equal(item.dailyshotPrice.volumeMl,750);
  const record=await read(recordFile);Object.assign(record,{status:'integrated-verified',existingEntriesPreserved:previous.length,currentCount:whiskies.length,photo:whiskyImages[id].path,dailyshot:item.dailyshotProduct,price:item.dailyshotPrice});await save(recordFile,record);
  const f='scripts/catalog-candidates/laphroaig-inventory.json',inv=await read(f),e=inv.entries.find(x=>x.runtimeId===id),data={name:item.englishName,status:'integrated',runtimeId:id,integrationRecord:'laphroaig-sherry-750-integration.json'};if(e)Object.assign(e,data);else inv.entries.push(data);
  const l=whiskies.filter(x=>x.brand==='Laphroaig');Object.assign(inv.runtimeSnapshot,{checkedAt:new Date().toISOString(),rawCount:l.length,expressions:l.map(x=>x.englishName)});await save(f,inv);
}else{
  const f='scripts/whisky-photo-sources-laphroaig-verified.json',photos=await read(f);photos[id]={imageUrl:'https://d1e2y5wc27crnp.cloudfront.net/media/core/product/thumbnail/0b6ab111-12be-478f-bd87-09a1b421ef0f.webp',sourceUrl:item.source,productName:item.englishName,note:'Actual bottle and cylindrical tube reviewed:10years,Sherry Oak Finish,750ml,48%. Exact Dailyshot6477 Information agrees. No bottling year assigned.'};await save(f,photos);
  const mf='scripts/dailyshot-mappings.json',m=await read(mf);m[id]={topProductId:6477,volumeMl:750,productName:'라프로익 10년 셰리 오크 피니시(구형) 750ml',englishName:'Laphroaig 10yo Sherry Oak Finish 750ml',abv:48,method:'manual-verified-expression',sourceUrl:item.source,verifiedAt:new Date().toISOString().slice(0,10),note:'Exact10year,SherryOakFinish,48%,750ml matched to actual bottle/tube and Dailyshot Information.700ml excluded.'};await save(mf,m);
  await save(recordFile,{checkedAt:new Date().toISOString(),status:'registered-pending-verification',ids:[id],previousCount:previous.length,sources:[item.source,'https://www.laphroaig.com/whiskies/10-year-old-sherry-oak-finish'],photoReview:photos[id].note,notesProvenance:'Exact Dailyshot product guidance paraphrased.',duplicateCheck:'IDs and normalized names checked against561 entries. Existing laphroaig-10-sherry has700ml sourcephoto23979, retained.750ml is a separate verified volume, not an additional packaging-only entry.'});
}
console.log({preserved:previous.length,total:whiskies.length,verified:process.argv.includes('--verify')});
