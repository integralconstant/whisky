import assert from 'node:assert/strict';
import {readFile,writeFile,stat} from 'node:fs/promises';
import {whiskies} from '../src/data/whiskies.ts';
import {whiskyImages} from '../src/data/whisky-images.ts';
const read=async f=>JSON.parse(await readFile(f,'utf8'));
const save=(f,d)=>writeFile(f,JSON.stringify(d,null,2)+'\n');
const before=await read('.cache/catalog-before-laphroaig-brodir.json');
for(const item of before)assert.deepEqual(whiskies.find(x=>x.id===item.id),item);
const ids=['laphroaig-brodir-batch-001','laphroaig-brodir-batch-002'];
for(const id of ids){const item=whiskies.find(x=>x.id===id);assert.equal(item.abv,48);assert.equal(item.age,null);assert.ok(!item.caskStrength);assert.equal(item.dailyshotPrice,undefined);assert.equal(whiskies.filter(x=>x.id===id).length,1);assert.ok((await stat('public'+whiskyImages[id].path)).size>500);}
const f='scripts/catalog-candidates/laphroaig-brodir-integration.json',r=await read(f);Object.assign(r,{status:'integrated-verified',existingEntriesPreserved:before.length,currentCount:whiskies.length,photos:ids.map(id=>whiskyImages[id].path),dailyshot:'no-exact-match'});await save(f,r);
const invFile='scripts/catalog-candidates/laphroaig-inventory.json',inv=await read(invFile);
for(const id of ids){const e=inv.entries.find(x=>x.runtimeId===id),data={name:whiskies.find(x=>x.id===id).englishName,status:'integrated',runtimeId:id,integrationRecord:'laphroaig-brodir-integration.json'};if(e)Object.assign(e,data);else inv.entries.push(data);}
const l=whiskies.filter(x=>x.brand==='Laphroaig');Object.assign(inv.runtimeSnapshot,{checkedAt:new Date().toISOString(),rawCount:l.length,expressions:l.map(x=>x.englishName)});await save(invFile,inv);console.log({preserved:before.length,total:whiskies.length});
