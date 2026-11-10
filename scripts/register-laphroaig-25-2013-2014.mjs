import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { laphroaig25EarlierWhiskies as candidates } from "../src/data/whiskies-laphroaig-25-2013-2014.ts";
const read=async(file)=>JSON.parse(await readFile(file,"utf8"));
const save=(file,data)=>writeFile(file,JSON.stringify(data,null,2)+"\n");
const previous=await read(".cache/catalog-before-laphroaig-25-2013-2014.json");
const normalize=(value)=>value.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]/gu,"");
const names=new Set(previous.flatMap((item)=>[normalize(item.name),normalize(item.englishName)]));
const photos=await read("scripts/whisky-photo-sources-laphroaig-verified.json");
const sources={
  2013:{imageUrl:"https://img.thewhiskyexchange.com/900/lrgob.25yov2.jpg",sourceUrl:"https://www.thewhiskyexchange.com/p/23110/laphroaig-25-year-old-cask-strength-bot2013"},
  2014:{imageUrl:"https://media.whisky.auction/600/215814_0.jpg?id=468284",sourceUrl:"https://whisky.auction/auctions/lot/217274/laphroaig-25-year-old"},
};
for(const item of candidates){
 assert.ok(!previous.some((old)=>old.id===item.id),`Duplicate ID ${item.id}`);
 assert.ok(!names.has(normalize(item.name))&&!names.has(normalize(item.englishName)),`Duplicate name ${item.id}`);
 names.add(normalize(item.name));names.add(normalize(item.englishName));
 const year=item.id.slice(-4);
 photos[item.id]={...sources[year],productName:item.englishName,note:`실물 라벨의 ${year}년·25년·45.1%·70cl 표기를 확인했습니다.${year==="2014"?" 경매 사진 상자에는 서명 전시 문구가 있으나 위스키 자체는 2014 에디션으로 등록합니다.":""}`};
}
await save("scripts/whisky-photo-sources-laphroaig-verified.json",photos);
await save("scripts/catalog-candidates/laphroaig-25-2013-2014-integration.json",{
 checkedOn:"2026-11-10",status:"registered-pending-verification",previousCount:previous.length,entries:candidates,
 duplicateCheck:"IDs and normalized Korean/English names checked against all 516 existing entries; both45.1% annual editions remain separate by explicit label year.",
 photoReview:"2013: bottle and box explicitly2013CS25yo45.1%70cl.2014: bottle explicitly2014CS25yo45.1%70cl; auction box has signed specimen display wording, not registered as another whisky.",
 notesProvenance:"WhiskNick2013 and WhiskyNotes2014 firsthand tasting notes paraphrased in Korean; no scores copied.",
 dailyshot:"Targeted annual discovery required; shared9106 and another year's price must not supply these entries.",
});
console.log(JSON.stringify({preserved:previous.length,added:candidates.map((item)=>item.id)}));
