import assert from "node:assert/strict";
import { readFile, writeFile, stat } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { whiskyImages } from "../src/data/whisky-images.ts";
const read=async(file)=>JSON.parse(await readFile(file,"utf8"));
const save=(file,data)=>writeFile(file,JSON.stringify(data,null,2)+"\n");
const previous=await read(".cache/catalog-before-laphroaig-30-2024.json");
const current=new Map(whiskies.map((item)=>[item.id,item]));
for(const item of previous)assert.deepEqual(current.get(item.id),item,`Existing item changed: ${item.id}`);
const results=[];
for(const [id,abv,cs]of [["laphroaig-30-2024",45.8,false],["laphroaig-30-fol-anniversary-2024",45.9,true]]){
 const item=current.get(id);assert.equal(item.age,30);assert.equal(item.abv,abv);assert.equal(Boolean(item.caskStrength),cs);
 assert.equal(whiskies.filter((entry)=>entry.id===id).length,1);assert.ok(item.dailyshotProduct);assert.equal(item.dailyshotPrice,undefined);
 assert.ok((await stat(`public${whiskyImages[id].path}`)).size>500);results.push({id,photo:whiskyImages[id].path,price:null});
}
assert.notEqual(results[0].photo,results[1].photo);
const recordPath="scripts/catalog-candidates/laphroaig-30-2024-integration.json";
const record=await read(recordPath);Object.assign(record,{status:"integrated-verified",currentCount:whiskies.length,existingEntriesPreserved:previous.length,results});await save(recordPath,record);
const inventoryPath="scripts/catalog-candidates/laphroaig-inventory.json";
const inventory=await read(inventoryPath);
for(const entry of inventory.entries){
 const id=entry.name==="30 Year Old annual small-batch first release"?results[0].id:entry.name==="30 Year Old Friends of Laphroaig Anniversary Edition 2024"?results[1].id:null;
 if(id)Object.assign(entry,{status:"integrated",runtimeId:id,integrationRecord:"laphroaig-30-2024-integration.json"});
}
inventory.runtimeSnapshot.checkedAt=new Date().toISOString();inventory.lastCatalogAudit="2026-11-11";
inventory.runtimeSnapshot.rawCount=whiskies.filter((item)=>item.brand==="Laphroaig").length;
inventory.runtimeSnapshot.expressions=whiskies.filter((item)=>item.brand==="Laphroaig").map((item)=>item.englishName);await save(inventoryPath,inventory);
console.log(JSON.stringify({preserved:previous.length,total:whiskies.length,results}));
