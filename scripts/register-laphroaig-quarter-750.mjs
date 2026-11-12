import assert from 'node:assert/strict';
import {readFile,writeFile,stat} from 'node:fs/promises';
import {whiskies} from '../src/data/whiskies.ts';
import {whiskyImages} from '../src/data/whisky-images.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const previous=await read('.cache/catalog-before-laphroaig-quarter-750.json');
for(const item of previous)assert.deepEqual(whiskies.find(x=>x.id===item.id),item);
const id='laphroaig-quarter-cask-750',item=whiskies.find(x=>x.id===id),recordFile='scripts/catalog-candidates/laphroaig-quarter-750-integration.json';
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
assert.ok(!previous.some(x=>x.id===id||norm(x.name)===norm(item.name)||norm(x.englishName)===norm(item.englishName)));
assert.equal(item.age,null);assert.equal(item.abv,48);assert.ok(!item.caskStrength);
if(process.argv.includes('--verify')){
  assert.ok((await stat('public'+whiskyImages[id].path)).size>500);
  assert.equal(item.dailyshotPrice,undefined);
  const record=await read(recordFile);Object.assign(record,{status:'integrated-verified',existingEntriesPreserved:previous.length,currentCount:whiskies.length,photo:whiskyImages[id].path,dailyshot:'no-exact-match'});await save(recordFile,record);
  const f='scripts/catalog-candidates/laphroaig-inventory.json',inv=await read(f),e=inv.entries.find(x=>x.runtimeId===id),data={name:item.englishName,status:'integrated',runtimeId:id,integrationRecord:'laphroaig-quarter-750-integration.json'};if(e)Object.assign(e,data);else inv.entries.push(data);
  const l=whiskies.filter(x=>x.brand==='Laphroaig');Object.assign(inv.runtimeSnapshot,{checkedAt:new Date().toISOString(),rawCount:l.length,expressions:l.map(x=>x.englishName)});await save(f,inv);
}else{
  const f='scripts/whisky-photo-sources-laphroaig-verified.json',photos=await read(f);photos[id]={imageUrl:'https://www.oaksliquors.com/product_images/img_48_1_a1.jpg',sourceUrl:item.source,productName:item.englishName,note:'Actual old-label bottle reviewed:QUARTER CASK,750ml,48% visible. No exact bottling year assigned. BSW750ml listing image rejected because its label actually reads700ml.'};await save(f,photos);
  await save(recordFile,{checkedAt:new Date().toISOString(),status:'registered-pending-verification',ids:[id],previousCount:previous.length,sources:[item.source,'https://www.bswliquor.com/products/laphroaig-quarter-cask-1'],photoReview:photos[id].note,notesProvenance:'Exact OaksLiquors750ml product tasting guidance paraphrased. No batch-specific claims.',duplicateCheck:'IDs and normalized names checked against564 entries. Existing700ml and1L QuarterCask retained.750ml is distinct volume; no additional entry for packaging changes.',rejectedPhoto:{source:'https://www.bswliquor.com/cdn/shop/files/Laphroaig_Quarter_Casks.png?v=1776375880&width=1080',reason:'Listing says750ml but pictured current bottle/carton explicitly700ml. Not used.'}});
}
console.log({preserved:previous.length,total:whiskies.length,verified:process.argv.includes('--verify')});
