import assert from 'node:assert/strict';
import {readFile,writeFile,stat} from 'node:fs/promises';
import {whiskies} from '../src/data/whiskies.ts';
import {whiskyImages} from '../src/data/whisky-images.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const previous=await read('.cache/catalog-before-laphroaig-27-28-us.json');
for(const item of previous)assert.deepEqual(whiskies.find(x=>x.id===item.id),item);
const ids=['laphroaig-27-2017-us','laphroaig-28-2018-us'],items=ids.map(id=>whiskies.find(x=>x.id===id)),recordFile='scripts/catalog-candidates/laphroaig-27-28-us-integration.json';
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
for(const [i,item] of items.entries()){
  assert.ok(!previous.some(x=>x.id===item.id||norm(x.name)===norm(item.name)||norm(x.englishName)===norm(item.englishName)));
  assert.equal(item.age,27+i);assert.equal(item.abv,[41.7,44.4][i]);assert.equal(item.caskStrength,true);
}
if(process.argv.includes('--verify')){
  for(const item of items){assert.ok((await stat('public'+whiskyImages[item.id].path)).size>500);assert.equal(item.dailyshotPrice,undefined);}
  const record=await read(recordFile);Object.assign(record,{status:'integrated-verified',existingEntriesPreserved:previous.length,currentCount:whiskies.length,photos:ids.map(id=>whiskyImages[id].path),dailyshot:'no-exact-match'});await save(recordFile,record);
  const f='scripts/catalog-candidates/laphroaig-inventory.json',inv=await read(f);
  for(const item of items){const e=inv.entries.find(x=>x.runtimeId===item.id),data={name:item.englishName,status:'integrated',runtimeId:item.id,integrationRecord:'laphroaig-27-28-us-integration.json'};if(e)Object.assign(e,data);else inv.entries.push(data);}
  const l=whiskies.filter(x=>x.brand==='Laphroaig');Object.assign(inv.runtimeSnapshot,{checkedAt:new Date().toISOString(),rawCount:l.length,expressions:l.map(x=>x.englishName)});await save(f,inv);
}else{
  const f='scripts/whisky-photo-sources-laphroaig-verified.json',photos=await read(f);
  for(const [i,item] of items.entries())photos[item.id]={imageUrl:`https://www.oaksliquors.com/product_images/img_${[1675,2364][i]}_1.jpg`,sourceUrl:item.source,productName:item.englishName,note:`Actual bottle reviewed:${item.age}years,${item.abv}%,750mL,CASK STRENGTH visible.${i===0?' MAR2017 bottling date visible.':'2018 release corroborated by K&L1420954 and Distiller release history.'}`};await save(f,photos);
  await save(recordFile,{checkedAt:new Date().toISOString(),status:'registered-pending-verification',ids,previousCount:previous.length,sources:items.map(x=>x.source),tastingSources:['https://thewhiskeywash.com/scotch-whiskey/laphroaig-adds-limited-edition-27-year-old-line/','https://distiller.com/spirits/laphroaig-28-year'],releaseSource28:'https://www.klwines.com/products/details/1420954',photoReview:ids.map(id=>photos[id].note),notesProvenance:'27:launch official guidance reproduced by WhiskeyWash, paraphrased.28:JakeEmen firsthand tasting in Distiller, paraphrased. Sources kept distinct; no copied700ml runtime notes.',duplicateCheck:'IDs and normalized names checked against566 entries. Existing27/28 have700ml photos;750ml variants are distinct volumes with own labels.'});
}
console.log({preserved:previous.length,total:whiskies.length,verified:process.argv.includes('--verify')});
