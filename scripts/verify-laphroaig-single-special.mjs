import assert from 'node:assert/strict';
import {readFile,writeFile,stat} from 'node:fs/promises';
import {whiskies} from '../src/data/whiskies.ts';
import {whiskyImages} from '../src/data/whisky-images.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const before=await read('.cache/catalog-before-laphroaig-single-special.json');
for(const item of before)assert.deepEqual(whiskies.find(x=>x.id===item.id),item);
const results=[];
for(const [id,age,abv,cs]of [['laphroaig-francis-mallmann-17',17,54.9,false],['laphroaig-islay-ember-2014',null,59.6,true]]){
 const item=whiskies.find(x=>x.id===id);
 assert.equal(item.abv,abv);assert.equal(item.age,age);assert.equal(Boolean(item.caskStrength),cs);assert.equal(item.dailyshotPrice,undefined);
 assert.equal(whiskies.filter(x=>x.id===item.id).length,1);assert.ok((await stat('public'+whiskyImages[item.id].path)).size>500);
 results.push({id:item.id,photo:whiskyImages[item.id].path,dailyshot:'no-exact-match'});
}
assert.notEqual(results[0].photo,results[1].photo);
const f='scripts/catalog-candidates/laphroaig-single-special-integration.json',r=await read(f);
Object.assign(r,{status:'integrated-verified',existingEntriesPreserved:before.length,currentCount:whiskies.length,results});await save(f,r);
const invFile='scripts/catalog-candidates/laphroaig-inventory.json',inv=await read(invFile);
for(const [name,id]of [['Francis Mallmann 17 Year Old White Madeira Cask','laphroaig-francis-mallmann-17'],['Islay Ember Single Cask','laphroaig-islay-ember-2014']]){const e=inv.entries.find(x=>x.name===name);assert.ok(e);Object.assign(e,{status:'integrated',runtimeId:id,integrationRecord:'laphroaig-single-special-integration.json'});}
const l=whiskies.filter(x=>x.brand==='Laphroaig');Object.assign(inv.runtimeSnapshot,{checkedAt:new Date().toISOString(),rawCount:l.length,expressions:l.map(x=>x.englishName)});await save(invFile,inv);
console.log({preserved:before.length,total:whiskies.length,results});
