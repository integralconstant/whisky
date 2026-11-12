import assert from 'node:assert/strict';
import {readFile,writeFile,stat} from 'node:fs/promises';
import {whiskies} from '../src/data/whiskies.ts';
import {whiskyImages} from '../src/data/whisky-images.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const previous=await read('.cache/catalog-before-laphroaig-18-old.json');
for(const item of previous)assert.deepEqual(whiskies.find(x=>x.id===item.id),item);
const id='laphroaig-18-old-48',item=whiskies.find(x=>x.id===id);
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
assert.ok(!previous.some(x=>x.id===id||norm(x.name)===norm(item.name)||norm(x.englishName)===norm(item.englishName)));
assert.equal(item.age,18);assert.equal(item.abv,48);assert.ok(!item.caskStrength);
const recordFile='scripts/catalog-candidates/laphroaig-18-old-integration.json';
if(process.argv.includes('--verify')){
  assert.ok((await stat('public'+whiskyImages[id].path)).size>500);
  assert.equal(item.dailyshotPrice,undefined);
  const record=await read(recordFile);Object.assign(record,{status:'integrated-verified',existingEntriesPreserved:previous.length,currentCount:whiskies.length,photo:whiskyImages[id].path,dailyshot:'no-exact-match'});await save(recordFile,record);
  const f='scripts/catalog-candidates/laphroaig-inventory.json',inv=await read(f),e=inv.entries.find(x=>x.runtimeId===id),data={name:item.englishName,status:'integrated',runtimeId:id,integrationRecord:'laphroaig-18-old-integration.json'};if(e)Object.assign(e,data);else inv.entries.push(data);
  const l=whiskies.filter(x=>x.brand==='Laphroaig');Object.assign(inv.runtimeSnapshot,{checkedAt:new Date().toISOString(),rawCount:l.length,expressions:l.map(x=>x.englishName)});await save(f,inv);
}else{
  const f='scripts/whisky-photo-sources-laphroaig-verified.json',photos=await read(f);photos[id]={imageUrl:'https://images.finedrams.com/image/16589-mediumlarge-1/laphroaig-18-year-old-whisky.jpg',sourceUrl:item.source,productName:item.englishName,note:'Actual white tube/green lower label bottle reviewed:18 years,70cl,48%. Original discontinued range, not2024 relaunch; bottling year unspecified.'};await save(f,photos);
  await save(recordFile,{checkedAt:new Date().toISOString(),status:'registered-pending-verification',ids:[id],previousCount:previous.length,sources:[item.source,'https://thewhiskyphiles.com/2014/10/07/laphroaig-18-years-old-48-beamsuntory/','https://allthingswhisky.com/2015/04/30/laphroaig-18-2014-review/'],photoReview:photos[id].note,notesProvenance:'Whiskyphiles own April2014 distillery tasting paraphrased; not its separately quoted producer notes. Generic old release, no2014 bottling claim.',duplicateCheck:'IDs and normalized Korean/English names checked against557 entries. Existing18-year2024 relaunch kept intact.',researchFollowup:{brodir003:'No explicit003 label verified. MasterQuill2019 firsthand L8239 review reports numbering ended after002. Do not invent batch003 from informal third/final batch language.',source:'https://masterquill.com/2019/12/02/laphroaig-brodir-48-ob-for-travel-retail-l8239-2018/'}});
}
console.log({preserved:previous.length,total:whiskies.length,verified:process.argv.includes('--verify')});
