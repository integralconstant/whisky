import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { laphroaig25Year2011Whiskies as candidates } from "../src/data/whiskies-laphroaig-25-2011.ts";
const read=async(file)=>JSON.parse(await readFile(file,"utf8"));
const save=(file,data)=>writeFile(file,JSON.stringify(data,null,2)+"\n");
const previous=await read(".cache/catalog-before-laphroaig-25-2011.json");
const normalize=(value)=>value.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]/gu,"");
const names=new Set(previous.flatMap((item)=>[normalize(item.name),normalize(item.englishName)]));
const photos=await read("scripts/whisky-photo-sources-laphroaig-verified.json");
for(const item of candidates){
 assert.ok(!previous.some((old)=>old.id===item.id),`Duplicate ID ${item.id}`);
 assert.ok(!names.has(normalize(item.name))&&!names.has(normalize(item.englishName)),`Duplicate name ${item.id}`);
 photos[item.id]={imageUrl:"https://img.thewhiskyexchange.com/900/lrgob.25yov1.jpg",sourceUrl:"https://www.thewhiskyexchange.com/p/9519/laphroaig-25-year-old-cask-strength-bot2011",productName:item.englishName,note:"병과 검은 상자의 2011 Edition 표기,25년·48.6%·70cl를 확인했습니다. 2016년48.6%와 구분합니다."};
}
await save("scripts/whisky-photo-sources-laphroaig-verified.json",photos);
await save("scripts/catalog-candidates/laphroaig-25-2011-integration.json",{
 checkedOn:"2026-11-10",status:"registered-pending-verification",previousCount:previous.length,entries:candidates,
 duplicateCheck:"ID and normalized Korean/English names checked against all518existing entries. Explicit2011label distinguishes2016of sameABV.",
 photoReview:"Real bottle and black box explicitly2011Edition,25years,48.6%,70cl.",
 notesProvenance:"Toronto Whisky Society2011 firsthand notes paraphrased in Korean. No claim of natural colour or sherry finish: colouring and cask wording differ across sources.",
 deferred2012:"Sothebys2012title shows white wooden boxes and48.6%bottles without visible annual label. Photo differs from explicit2011black-box bottling. Do not claim duplicate or distinct release without further label evidence.",
 dailyshot:"Targeted discovery; no shared listing price copied.",
});
console.log(JSON.stringify({preserved:previous.length,added:candidates.map((item)=>item.id)}));
