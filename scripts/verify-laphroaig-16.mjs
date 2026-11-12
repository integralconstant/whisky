import assert from 'node:assert/strict';
import {readFile,writeFile,stat} from 'node:fs/promises';
import {whiskies} from '../src/data/whiskies.ts';
import {whiskyImages} from '../src/data/whisky-images.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const before=await read('.cache/catalog-before-laphroaig-16.json');
for(const item of before)assert.deepEqual(whiskies.find(x=>x.id===item.id),item);
const results=[];
for(const [id,abv]of [['laphroaig-16-2015-anniversary',43],['laphroaig-16-48',48]]){
 const item=whiskies.find(x=>x.id===id);assert.equal(item.abv,abv);assert.equal(item.age,16);assert.ok(!item.caskStrength);assert.equal(item.dailyshotPrice,undefined);
 assert.equal(whiskies.filter(x=>x.id===item.id).length,1);assert.ok((await stat('public'+whiskyImages[item.id].path)).size>500);results.push({id,photo:whiskyImages[id].path,dailyshot:'no-exact-match'});
}
assert.notEqual(results[0].photo,results[1].photo);
const f='scripts/catalog-candidates/laphroaig-16-integration.json',r=await read(f);Object.assign(r,{status:'integrated-verified',existingEntriesPreserved:before.length,currentCount:whiskies.length,results});await save(f,r);
const invFile='scripts/catalog-candidates/laphroaig-inventory.json',inv=await read(invFile);
for(const result of results){const e=inv.entries.find(x=>x.runtimeId===result.id),data={name:whiskies.find(x=>x.id===result.id).englishName,status:'integrated',runtimeId:result.id,integrationRecord:'laphroaig-16-integration.json'};if(e)Object.assign(e,data);else inv.entries.push(data);}
const l=whiskies.filter(x=>x.brand==='Laphroaig');Object.assign(inv.runtimeSnapshot,{checkedAt:new Date().toISOString(),rawCount:l.length,expressions:l.map(x=>x.englishName)});await save(invFile,inv);console.log({preserved:before.length,total:whiskies.length,results});
