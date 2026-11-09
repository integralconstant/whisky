import assert from "node:assert/strict";
import { readFile,writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { whiskyImages } from "../src/data/whisky-images.ts";
import { laphroaig25Whiskies } from "../src/data/whiskies-laphroaig-25.ts";
const read=async(file)=>JSON.parse(await readFile(file,"utf8"));
const save=(file,data)=>writeFile(file,JSON.stringify(data,null,2)+"\n");
const previous=await read(".cache/catalog-before-laphroaig-25.json");
const current=new Map(whiskies.map((item)=>[item.id,item]));
for(const item of previous)assert.deepEqual(current.get(item.id),item,`Existing item changed: ${item.id}`);
const record=await read("scripts/catalog-candidates/laphroaig-25-integration.json");
record.status="integrated-verified";record.currentCount=whiskies.length;record.existingEntriesPreserved=previous.length;record.results=[];
for(const entry of laphroaig25Whiskies){
  const item=current.get(entry.id);
  assert.ok(item&&whiskyImages[item.id]&&item.dailyshotProduct);
  assert.equal(item.age,25);assert.equal(item.caskStrength,true);
  if(item.id.endsWith("2023")){assert.ok(item.dailyshotPrice?.sampleCount>0);assert.equal(item.dailyshotProduct.scope,"exact-product");assert.equal(item.dailyshotPrice.volumeMl,700);}
  else assert.equal(item.dailyshotPrice,undefined);
  record.results.push({id:item.id,photo:whiskyImages[item.id].path,dailyshot:item.dailyshotProduct,price:item.dailyshotPrice??null});
}
await save("scripts/catalog-candidates/laphroaig-25-integration.json",record);
const inventory=await read("scripts/catalog-candidates/laphroaig-inventory.json");
for(const entry of inventory.entries){
  const match=laphroaig25Whiskies.find((item)=>entry.name===`25 Year Old Cask Strength ${item.id.slice(-4)}`);
  if(match)Object.assign(entry,{status:"integrated",runtimeId:match.id,integrationRecord:"laphroaig-25-integration.json"});
}
inventory.runtimeSnapshot.checkedAt=new Date().toISOString();inventory.lastCatalogAudit="2026-11-09";
inventory.runtimeSnapshot.rawCount=whiskies.filter((item)=>item.brand==="Laphroaig").length;
inventory.runtimeSnapshot.expressions=whiskies.filter((item)=>item.brand==="Laphroaig").map((item)=>item.englishName);
await save("scripts/catalog-candidates/laphroaig-inventory.json",inventory);
const next=await read("scripts/catalog-candidates/laphroaig-25-next.json");next.status="listed-2020-2023-releases-integrated-older-and-newer-releases-remain";
for(const entry of next.entries){entry.status="integrated";entry.integrationRecord="laphroaig-25-integration.json";}
await save("scripts/catalog-candidates/laphroaig-25-next.json",next);
console.log(JSON.stringify({preserved:previous.length,total:whiskies.length,results:record.results.map((item)=>({id:item.id,average:item.price?.average??null,sampleCount:item.price?.sampleCount??0,volumeMl:item.price?.volumeMl??null}))}));
