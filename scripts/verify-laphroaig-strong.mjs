import assert from 'node:assert/strict';
import {readFile,writeFile,stat} from 'node:fs/promises';
import {whiskies} from '../src/data/whiskies.ts';
import {whiskyImages} from '../src/data/whisky-images.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const before=await read('.cache/catalog-before-laphroaig-strong.json');
for(const item of before)assert.deepEqual(whiskies.find(x=>x.id===item.id),item);
const results=[];
for(const [chapter,age]of [[1,33],[2,35]]){
 const item=whiskies.find(x=>x.id===`laphroaig-strong-characters-${chapter}`);
 assert.equal(item.abv,43.8);assert.equal(item.age,age);assert.ok(!item.caskStrength);assert.equal(item.dailyshotPrice,undefined);
 assert.equal(whiskies.filter(x=>x.id===item.id).length,1);assert.ok((await stat('public'+whiskyImages[item.id].path)).size>500);
 results.push({id:item.id,photo:whiskyImages[item.id].path,dailyshot:'no-exact-match'});
}
assert.notEqual(results[0].photo,results[1].photo);
const f='scripts/catalog-candidates/laphroaig-strong-integration.json',r=await read(f);
Object.assign(r,{status:'integrated-verified',existingEntriesPreserved:before.length,currentCount:whiskies.length,results});await save(f,r);
const invFile='scripts/catalog-candidates/laphroaig-inventory.json',inv=await read(invFile);
for(const chapter of [1,2]){const e=inv.entries.find(x=>x.name===`Strong Characters Chapter ${chapter}`);assert.ok(e);Object.assign(e,{status:'integrated',runtimeId:`laphroaig-strong-characters-${chapter}`,integrationRecord:'laphroaig-strong-integration.json'});}
const l=whiskies.filter(x=>x.brand==='Laphroaig');Object.assign(inv.runtimeSnapshot,{checkedAt:new Date().toISOString(),rawCount:l.length,expressions:l.map(x=>x.englishName)});await save(invFile,inv);
console.log({preserved:before.length,total:whiskies.length,results});
