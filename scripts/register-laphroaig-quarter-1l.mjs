import assert from 'node:assert/strict';
import {readFile,writeFile,stat} from 'node:fs/promises';
import {whiskies} from '../src/data/whiskies.ts';
import {whiskyImages} from '../src/data/whisky-images.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const previous=await read('.cache/catalog-before-laphroaig-quarter-1l.json');
for(const item of previous)assert.deepEqual(whiskies.find(x=>x.id===item.id),item);
const id='laphroaig-quarter-cask-1l',item=whiskies.find(x=>x.id===id),recordFile='scripts/catalog-candidates/laphroaig-quarter-1l-integration.json';
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
assert.ok(!previous.some(x=>x.id===id||norm(x.name)===norm(item.name)||norm(x.englishName)===norm(item.englishName)));
assert.equal(item.age,null);assert.equal(item.abv,48);assert.ok(!item.caskStrength);
if(process.argv.includes('--verify')){
  assert.ok((await stat('public'+whiskyImages[id].path)).size>500);
  assert.equal(item.dailyshotPrice,undefined);
  const record=await read(recordFile);Object.assign(record,{status:'integrated-verified',existingEntriesPreserved:previous.length,currentCount:whiskies.length,photo:whiskyImages[id].path,dailyshot:'no-exact-match'});await save(recordFile,record);
  const f='scripts/catalog-candidates/laphroaig-inventory.json',inv=await read(f),e=inv.entries.find(x=>x.runtimeId===id),data={name:item.englishName,status:'integrated',runtimeId:id,integrationRecord:'laphroaig-quarter-1l-integration.json'};if(e)Object.assign(e,data);else inv.entries.push(data);
  const l=whiskies.filter(x=>x.brand==='Laphroaig');Object.assign(inv.runtimeSnapshot,{checkedAt:new Date().toISOString(),rawCount:l.length,expressions:l.map(x=>x.englishName)});await save(f,inv);
}else{
  const f='scripts/whisky-photo-sources-laphroaig-verified.json',photos=await read(f);photos[id]={imageUrl:'https://images.finedrams.com/image/33130-mediumlarge-1508077957/laphroaig-quarter-cask-1-liter-.jpg',sourceUrl:item.source,productName:item.englishName,note:'Actual bottle and tube reviewed:QuarterCask,1Litre,48% visible on both. No age or bottling year assigned.'};await save(f,photos);
  await save(recordFile,{checkedAt:new Date().toISOString(),status:'registered-pending-verification',ids:[id],previousCount:previous.length,sources:[item.source,'https://www.laphroaig.com/whiskies/laphroaig-quarter-cask-single-malt-scotch-whisky','https://dailyshot.co/m/item/23144'],photoReview:photos[id].note,notesProvenance:'Producer expression-level tasting guidance paraphrased, explicitly distinguished from batch-specific review.',duplicateCheck:'IDs and normalized names checked against563 entries. Existing QuarterCask photograph23144 is700ml;1L is separate verified volume.',researchFollowup:'FourOak4814/31573/4980 all1000ml40%; do not add duplicate for title/packaging variations. Quarter750ml remains a candidate requiring own reviewed photograph.'});
}
console.log({preserved:previous.length,total:whiskies.length,verified:process.argv.includes('--verify')});
