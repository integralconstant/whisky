import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { laphroaig25Year2008Whiskies as candidates } from "../src/data/whiskies-laphroaig-25-2008.ts";
const read=async(file)=>JSON.parse(await readFile(file,"utf8"));
const save=(file,data)=>writeFile(file,JSON.stringify(data,null,2)+"\n");
const previous=await read(".cache/catalog-before-laphroaig-25-2008.json");
const normalize=(value)=>value.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]/gu,"");
const names=new Set(previous.flatMap((item)=>[normalize(item.name),normalize(item.englishName)]));
const photos=await read("scripts/whisky-photo-sources-laphroaig-verified.json");
const sources={
 "laphroaig-25-cask-strength-2008":{imageUrl:"https://www.thewhiskyshop.com.sg/cdn/shop/products/LAPHROAIG_25_Years_-_CASK_STRENGTH_Bot._2008_-2.jpg?v=1752629286",sourceUrl:"https://www.thewhiskyshop.com.sg/products/laphroaig-25-years-cask-strength-bot-2008",note:"실물 뒷라벨의2008Edition·25년·50.9%·70cl를 확인했습니다. 대표 정면 사진은2011년48.6%오사진이므로 제외하고 올바른 뒷면 사진을 사용합니다. 판매 페이지의2014년 향미도 사용하지 않습니다."},
 "laphroaig-25-cask-strength-us-2008":{imageUrl:"https://sothebys-md.brightspotcdn.com/dims4/default/be6c94c/2147483647/strip/true/crop/2000x2000%2B0%2B0/resize/1024x1024%21/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2F74%2Fb9%2Ffa77fec64778900cb57a2dffec0d%2Fl25709-l058027-01.jpg",sourceUrl:"https://www.sothebys.com/en/buy/auction/2025/finest-whisky-l25709/laphroaig-25-year-old-cask-strength-2008-edition-2",note:"병과 상자의2008Edition·25년·51.2%·750ml표기를 직접 확인하고 경매 본문의 미국 수입판 설명과 대조했습니다."},
};
for(const item of candidates){
 assert.ok(!previous.some((old)=>old.id===item.id),`Duplicate ID ${item.id}`);
 assert.ok(!names.has(normalize(item.name))&&!names.has(normalize(item.englishName)),`Duplicate name ${item.id}`);
 names.add(normalize(item.name));names.add(normalize(item.englishName));
 photos[item.id]={...sources[item.id],productName:item.englishName};
}
await save("scripts/whisky-photo-sources-laphroaig-verified.json",photos);
await save("scripts/catalog-candidates/laphroaig-25-2008-integration.json",{
 checkedOn:"2026-11-11",status:"registered-pending-verification",previousCount:previous.length,entries:candidates,
 duplicateCheck:"IDs and normalized Korean/English names checked against520existing entries. Distinct50.9%700mland51.2%750mlmarketbottlings retain separate IDs/notes/photos.",
 photoReview:"50.9%rearlabel explicitly2008edition25years50.9%70cl;51.2%frontlabel and box explicitly2008edition25years51.2%750ml.",
 rejectedEvidence:"Singapore retailer's mainphoto actually2011edition48.6%; its tasting text explicitly2014. Both excluded. Only matching2008rearphoto retained.",
 notesProvenance:"50.9%TOModera2018-02-20;51.2%WhiskeryTurnip2026-06-10. Exactstrength firsthandnotes paraphrased separately in Korean.",
 dailyshot:"Targeted discovery required; neitherprice norphoto inherited fromotherannualstrengths.",
});
console.log(JSON.stringify({preserved:previous.length,added:candidates.map((item)=>item.id)}));
