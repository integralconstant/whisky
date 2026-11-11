import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { laphroaig30Year2024Whiskies as candidates } from "../src/data/whiskies-laphroaig-30-2024.ts";
const read=async(file)=>JSON.parse(await readFile(file,"utf8"));
const save=(file,data)=>writeFile(file,JSON.stringify(data,null,2)+"\n");
const previous=await read(".cache/catalog-before-laphroaig-30-2024.json");
const normalize=(value)=>value.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]/gu,"");
const names=new Set(previous.flatMap((item)=>[normalize(item.name),normalize(item.englishName)]));
const photos=await read("scripts/whisky-photo-sources-laphroaig-verified.json");
const urls=await read("scripts/catalog-candidates/laphroaig-30-2024-photos.json");
for(const item of candidates){
 assert.ok(!previous.some((old)=>old.id===item.id),`DuplicateID ${item.id}`);
 assert.ok(!names.has(normalize(item.name))&&!names.has(normalize(item.englishName)),`DuplicateName ${item.id}`);
 names.add(normalize(item.name));names.add(normalize(item.englishName));
 photos[item.id]={imageUrl:urls[item.abv===45.8?"annual":"anniversary"],sourceUrl:item.source,productName:item.englishName,note:`공식 실물 사진의30년·${item.abv}%·700ml와 개별 제품 설명을 대조했습니다.${item.abv===45.8?" 라벨의2024Release와2024년공식소개영상,개별판매처70cl/45.8%를 추가 대조했습니다.":" FoL30주년1994/2024기념판이며45.8%고정도수제품과구분합니다."}`};
}
await save("scripts/whisky-photo-sources-laphroaig-verified.json",photos);
await save("scripts/catalog-candidates/laphroaig-30-2024-integration.json",{
 checkedOn:"2026-11-11",status:"registered-pending-verification",previousCount:previous.length,entries:candidates,
 duplicateCheck:"IDsandnormalizedKorean/Englishnamescheckedagainst529existingentries;distinctfromIanHunter30yoandfromeachother.",
 photoReview:"Officialannualfrontlabel30years2024Release45.8%;70clconfirmedexactTWE82018.Officialanniversaryfrontlabel30years45.9%700ml;producerconfirms1994/2024.",
 annualYearEvidence:["https://www.youtube.com/watch?v=KwUduWqPhJw","https://www.thewhiskyexchange.com/p/82018/laphroaig-30-year-old-2024-release"],
 strengthEvidence:"Producerexplicitlyfixedstrength45.8%;anniversaryexplicitlycaskstrength45.9%.Do notmergeorapplyCSbasedonhighABV.",
 notesProvenance:"EachproducerproductpageparaphrasedseparatelyinKorean.",
 dailyshot:"Targeteddiscoveryrequired;noother30yoorIanHunterpricecopied.",
});
console.log(JSON.stringify({preserved:previous.length,added:candidates.map((item)=>item.id)}));
