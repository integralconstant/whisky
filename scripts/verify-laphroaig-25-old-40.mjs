import assert from "node:assert/strict";
import { readFile, writeFile, stat } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { whiskyImages } from "../src/data/whisky-images.ts";
const read=async(file)=>JSON.parse(await readFile(file,"utf8"));
const save=(file,data)=>writeFile(file,JSON.stringify(data,null,2)+"\n");
const previous=await read(".cache/catalog-before-laphroaig-25-old-40.json");
const current=new Map(whiskies.map((item)=>[item.id,item]));
for(const item of previous)assert.deepEqual(current.get(item.id),item,`Existing item changed: ${item.id}`);
const results=[];
for(const [id,abv]of [["laphroaig-25-old-40",40],["laphroaig-25-bessie-williamson-story",43]]){
 const item=current.get(id);assert.equal(item.age,25);assert.equal(item.abv,abv);assert.ok(!item.caskStrength);
 assert.equal(whiskies.filter((entry)=>entry.id===id).length,1);
 assert.ok((await stat(`public${whiskyImages[id].path}`)).size>500);
 if(abv===40)assert.equal(item.dailyshotPrice,undefined);
 else {assert.ok(item.dailyshotPrice?.sampleCount>0);assert.equal(item.dailyshotPrice.volumeMl,700);assert.equal(item.dailyshotProduct.scope,"exact-product");}
 results.push({id,photo:whiskyImages[id].path,price:item.dailyshotPrice??null});
}
const recordPath="scripts/catalog-candidates/laphroaig-25-old-40-integration.json";
const record=await read(recordPath);
Object.assign(record,{status:"integrated-verified",currentCount:whiskies.length,existingEntriesPreserved:previous.length,results});
await save(recordPath,record);
const inventoryPath="scripts/catalog-candidates/laphroaig-inventory.json";
const inventory=await read(inventoryPath);
for(const result of results){
 const item=current.get(result.id);
 let entry=inventory.entries.find((entry)=>entry.runtimeId===result.id||entry.name===(item.abv===40?"25 Year Old 40% old bottling":"25 Year Old The Bessie Williamson Story"));
 if(!entry){entry={name:item.abv===40?"25 Year Old 40% old bottling":"25 Year Old The Bessie Williamson Story"};inventory.entries.push(entry);}
 Object.assign(entry,{status:"integrated",runtimeId:result.id,integrationRecord:"laphroaig-25-old-40-integration.json"});
}
inventory.runtimeSnapshot.checkedAt=new Date().toISOString();inventory.lastCatalogAudit="2026-11-11";
inventory.runtimeSnapshot.rawCount=whiskies.filter((item)=>item.brand==="Laphroaig").length;
inventory.runtimeSnapshot.expressions=whiskies.filter((item)=>item.brand==="Laphroaig").map((item)=>item.englishName);
await save(inventoryPath,inventory);
const nextPath="scripts/catalog-candidates/laphroaig-25-regular-next.json";
const next=await read(nextPath);next.status="40-percent-and-bessie43-integrated-other43-identities-unresolved";
Object.assign(next.entries[0],{status:"integrated-verified",runtimeId:results[0].id,integrationRecord:"laphroaig-25-old-40-integration.json"});
Object.assign(next.entries[1],{status:"bessie43-integrated-generic43-unresolved",runtimeId:results[1].id,note:"Bessie43%verifiedandregistered.Notproofallhistorical43%referencesareBessie;older43%retailerPDFcandidateawaitslabelinspection."});
await save(nextPath,next);
console.log(JSON.stringify({preserved:previous.length,total:whiskies.length,results:results.map(({id,price})=>({id,average:price?.average??null,samples:price?.sampleCount??0}))}));
