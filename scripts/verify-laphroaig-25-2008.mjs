import assert from "node:assert/strict";
import { readFile, writeFile, stat } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { whiskyImages } from "../src/data/whisky-images.ts";
const read=async(file)=>JSON.parse(await readFile(file,"utf8"));
const save=(file,data)=>writeFile(file,JSON.stringify(data,null,2)+"\n");
const previous=await read(".cache/catalog-before-laphroaig-25-2008.json");
const current=new Map(whiskies.map((item)=>[item.id,item]));
for(const item of previous)assert.deepEqual(current.get(item.id),item,`Existing item changed: ${item.id}`);
const results=[];
for(const [id,abv,volumeMl]of [["laphroaig-25-cask-strength-2008",50.9,700],["laphroaig-25-cask-strength-us-2008",51.2,750]]){
 const item=current.get(id);assert.equal(item.age,25);assert.equal(item.abv,abv);assert.equal(item.caskStrength,true);
 assert.equal(item.dailyshotPrice,undefined);assert.ok(item.dailyshotProduct);
 assert.equal(whiskies.filter((entry)=>entry.id===id).length,1);
 assert.ok((await stat(`public${whiskyImages[id].path}`)).size>500);
 assert.ok(item.abvNote.includes(`${volumeMl}ml`));
 results.push({id,abv,volumeMl,photo:whiskyImages[id].path,price:null});
}
assert.notEqual(results[0].photo,results[1].photo);
assert.notDeepEqual(current.get(results[0].id).notes,current.get(results[1].id).notes);
const recordPath="scripts/catalog-candidates/laphroaig-25-2008-integration.json";
const record=await read(recordPath);
Object.assign(record,{status:"integrated-verified",currentCount:whiskies.length,existingEntriesPreserved:previous.length,results});
await save(recordPath,record);
const inventoryPath="scripts/catalog-candidates/laphroaig-inventory.json";
const inventory=await read(inventoryPath);
for(const result of results){
 const item=current.get(result.id);
 let entry=inventory.entries.find((entry)=>entry.runtimeId===result.id||entry.name===`25 Year Old Cask Strength 2008 ${result.abv}%`);
 if(!entry){entry={name:`25 Year Old Cask Strength 2008 ${result.abv}%`};inventory.entries.push(entry);}
 Object.assign(entry,{status:"integrated",runtimeId:result.id,source:item.source,integrationRecord:"laphroaig-25-2008-integration.json"});
}
inventory.runtimeSnapshot.checkedAt=new Date().toISOString();inventory.lastCatalogAudit="2026-11-11";
inventory.runtimeSnapshot.rawCount=whiskies.filter((item)=>item.brand==="Laphroaig").length;
inventory.runtimeSnapshot.expressions=whiskies.filter((item)=>item.brand==="Laphroaig").map((item)=>item.englishName);
await save(inventoryPath,inventory);
const nextPath="scripts/catalog-candidates/laphroaig-25-2008-next.json";
const next=await read(nextPath);next.status="listed-two-strengths-integrated-other-families-remain";
for(const entry of next.entries)Object.assign(entry,{status:"integrated-verified",integrationRecord:"laphroaig-25-2008-integration.json"});
await save(nextPath,next);
const earlierPath="scripts/catalog-candidates/laphroaig-25-pre2011-next.json";
const earlier=await read(earlierPath);earlier.status="2008-two-strengths-and2009-integrated-2010-unresolved";
Object.assign(earlier.entries.find((entry)=>entry.year===2008),{status:"integrated-two-strengths",integrationRecord:"laphroaig-25-2008-integration.json"});
await save(earlierPath,earlier);
console.log(JSON.stringify({preserved:previous.length,total:whiskies.length,results}));
