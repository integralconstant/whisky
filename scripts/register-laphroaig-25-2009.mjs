import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { laphroaig25Year2009Whiskies as candidates } from "../src/data/whiskies-laphroaig-25-2009.ts";
const read=async(file)=>JSON.parse(await readFile(file,"utf8"));
const save=(file,data)=>writeFile(file,JSON.stringify(data,null,2)+"\n");
const previous=await read(".cache/catalog-before-laphroaig-25-2009.json");
const normalize=(value)=>value.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]/gu,"");
const names=new Set(previous.flatMap((item)=>[normalize(item.name),normalize(item.englishName)]));
const photos=await read("scripts/whisky-photo-sources-laphroaig-verified.json");
for(const item of candidates){
 assert.ok(!previous.some((old)=>old.id===item.id),`Duplicate ID ${item.id}`);
 assert.ok(!names.has(normalize(item.name))&&!names.has(normalize(item.englishName)),`Duplicate name ${item.id}`);
 photos[item.id]={imageUrl:"https://www.oldandrarewhisky.co.uk/cdn/shop/products/laphroaig-25-year-old-cask-strength-2009-edition-islay-single-malt-70cl-51-abv-161677_701x700.jpg?v=1637158267",sourceUrl:"https://www.oldandrarewhisky.co.uk/products/laphroaig-25-year-old-cask-strength-2009-edition-islay-single-malt-70cl-51-abv",productName:item.englishName,note:"실물 병 라벨의 Cask Strength2009Edition·25년·51%·70cl를 확인하고 판매 페이지와 대조했습니다."};
}
await save("scripts/whisky-photo-sources-laphroaig-verified.json",photos);
await save("scripts/catalog-candidates/laphroaig-25-2009-integration.json",{
 checkedOn:"2026-11-11",status:"registered-pending-verification",previousCount:previous.length,entries:candidates,
 duplicateCheck:"ID and normalized Korean/English names checked against all519existing entries; distinct from40%regular25and allotherannualCSreleases.",
 photoReview:"Real bottle explicitly2009Edition,25years,51%,70cl. Retailer page agrees. Actual photograph inspected before integration.",
 notesProvenance:"AllThingsWhisky2011-01-12 firsthand comparison explicitlyidentifies2009CS51%; onlythatproduct's nose/palate/finish paraphrased.40%productnotes not reused.",
 dailyshot:"Targeted discovery required; shared listing prices not inherited.",
});
console.log(JSON.stringify({preserved:previous.length,added:candidates.map((item)=>item.id)}));
