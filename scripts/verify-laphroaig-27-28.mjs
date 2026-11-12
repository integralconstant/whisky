import assert from 'node:assert/strict';
import {readFile,writeFile,stat} from 'node:fs/promises';
import {whiskies} from '../src/data/whiskies.ts';
import {whiskyImages} from '../src/data/whisky-images.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const before=await read('.cache/catalog-before-laphroaig-27-28.json');
for(const item of before)assert.deepEqual(whiskies.find(x=>x.id===item.id),item);
const results=[];
for(const [id,age,abv]of [['laphroaig-27-2017',27,41.7],['laphroaig-28-2018',28,44.4]]){
 const item=whiskies.find(x=>x.id===id);
 assert.equal(item.abv,abv);assert.equal(item.age,age);assert.equal(item.caskStrength,true);assert.equal(item.dailyshotPrice,undefined);
 assert.equal(whiskies.filter(x=>x.id===item.id).length,1);assert.ok((await stat('public'+whiskyImages[item.id].path)).size>500);
 results.push({id:item.id,photo:whiskyImages[item.id].path,dailyshot:'no-exact-match'});
}
assert.notEqual(results[0].photo,results[1].photo);
const f='scripts/catalog-candidates/laphroaig-27-28-integration.json',r=await read(f);
Object.assign(r,{status:'integrated-verified',existingEntriesPreserved:before.length,currentCount:whiskies.length,results});await save(f,r);
const invFile='scripts/catalog-candidates/laphroaig-inventory.json',inv=await read(invFile);
for(const [age,year]of [[27,2017],[28,2018]]){const id=`laphroaig-${age}-${year}`,e=inv.entries.find(x=>x.runtimeId===id),data={name:`${age} Year Old ${year} Release 700ml`,status:'integrated',runtimeId:id,integrationRecord:'laphroaig-27-28-integration.json'};if(e)Object.assign(e,data);else inv.entries.push(data);}
const l=whiskies.filter(x=>x.brand==='Laphroaig');Object.assign(inv.runtimeSnapshot,{checkedAt:new Date().toISOString(),rawCount:l.length,expressions:l.map(x=>x.englishName)});await save(invFile,inv);
console.log({preserved:before.length,total:whiskies.length,results});
