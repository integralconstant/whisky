import assert from "node:assert/strict";
import { readFile, writeFile, stat } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { whiskyImages } from "../src/data/whisky-images.ts";
const read=async(file)=>JSON.parse(await readFile(file,"utf8"));
const save=(file,data)=>writeFile(file,JSON.stringify(data,null,2)+"\n");
const previous=await read(".cache/catalog-before-laphroaig-ian-hunter.json");
const current=new Map(whiskies.map((item)=>[item.id,item]));
for(const item of previous)assert.deepEqual(current.get(item.id),item,`Existing item changed: ${item.id}`);
const results=[];
for(const [index,abv]of [46.7,48.2,49.9,46.2,45.5].entries()){
 const book=index+1,id=`laphroaig-ian-hunter-book-${book}`,item=current.get(id);
 assert.equal(item.age,[30,30,33,34,34][index]);assert.equal(item.abv,abv);
 assert.equal(whiskies.filter((entry)=>entry.id===id).length,1);
 assert.ok(item.dailyshotProduct);assert.ok((await stat(`public${whiskyImages[id].path}`)).size>500);
 if(item.dailyshotPrice){assert.equal(item.dailyshotPrice.volumeMl,700);assert.ok(item.dailyshotPrice.sampleCount>0);assert.equal(item.dailyshotProduct.scope,"exact-product");}
 if(book===1)assert.equal(item.dailyshotPrice,undefined);
 if(book===3){assert.equal(item.age,33);assert.ok(item.dailyshotProduct.note.includes("오기"));}
 results.push({id,photo:whiskyImages[id].path,price:item.dailyshotPrice??null});
}
assert.equal(new Set(results.map((item)=>item.photo)).size,5);
const recordPath="scripts/catalog-candidates/laphroaig-ian-hunter-integration.json";
const record=await read(recordPath);Object.assign(record,{status:"integrated-verified",currentCount:whiskies.length,existingEntriesPreserved:previous.length,results});
await save(recordPath,record);
const inventoryPath="scripts/catalog-candidates/laphroaig-inventory.json";
const inventory=await read(inventoryPath);
for(const entry of inventory.entries){const match=entry.name.match(/^Ian Hunter Book ([1-5]) /);if(match)Object.assign(entry,{status:"integrated",runtimeId:`laphroaig-ian-hunter-book-${match[1]}`,integrationRecord:"laphroaig-ian-hunter-integration.json"});}
inventory.runtimeSnapshot.checkedAt=new Date().toISOString();inventory.lastCatalogAudit="2026-11-11";
inventory.runtimeSnapshot.rawCount=whiskies.filter((item)=>item.brand==="Laphroaig").length;
inventory.runtimeSnapshot.expressions=whiskies.filter((item)=>item.brand==="Laphroaig").map((item)=>item.englishName);
await save(inventoryPath,inventory);
const nextPath="scripts/catalog-candidates/laphroaig-ian-hunter-next.json";
const next=await read(nextPath);next.status="five700mlbooks-integrated-marketvariants-and-CSclassifications-remain";
for(const entry of next.entries)Object.assign(entry,{status:"integrated-verified",runtimeId:`laphroaig-ian-hunter-book-${entry.book}`,integrationRecord:"laphroaig-ian-hunter-integration.json"});
await save(nextPath,next);
console.log(JSON.stringify({preserved:previous.length,total:whiskies.length,results:results.map(({id,price})=>({id,average:price?.average??null,samples:price?.sampleCount??0}))}));
