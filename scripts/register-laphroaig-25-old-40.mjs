import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { laphroaig25Old40Whiskies as candidates } from "../src/data/whiskies-laphroaig-25-old-40.ts";
const read=async(file)=>JSON.parse(await readFile(file,"utf8"));
const save=(file,data)=>writeFile(file,JSON.stringify(data,null,2)+"\n");
const previous=await read(".cache/catalog-before-laphroaig-25-old-40.json");
const normalize=(value)=>value.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]/gu,"");
const names=new Set(previous.flatMap((item)=>[normalize(item.name),normalize(item.englishName)]));
const photos=await read("scripts/whisky-photo-sources-laphroaig-verified.json");
for(const item of candidates){
 assert.ok(!previous.some((old)=>old.id===item.id),`Duplicate ID ${item.id}`);
 assert.ok(!names.has(normalize(item.name))&&!names.has(normalize(item.englishName)),`Duplicate name ${item.id}`);
 photos[item.id]={imageUrl:"https://www.passionforwhisky.com/138686-large_default/laphroaig-25-years-old-bottling.jpg",sourceUrl:"https://www.passionforwhisky.com/en/whisky/scotch-whisky/single-malt-whisky/islay/laphroaig-whisky-distillery/30619-laphroaig-25-years-old-bottling.html",productName:item.englishName,note:"실물 앞·뒷라벨의25년·40%·70cl를 확인했습니다. 판매처는2007/L7로 설명하나 사진에서 연도 코드를 독립 확인하지 못해 일반 구형40%로 기록합니다."};
 if(item.abv===43)photos[item.id]={imageUrl:"https://d1e2y5wc27crnp.cloudfront.net/media/core/product/thumbnail/0cb50b83-ee43-4fac-9c79-0bf99947b881.webp",sourceUrl:"https://dailyshot.co/m/item/14361",productName:item.englishName,note:"실물 병과 책 형태 패키지의25년·TheBessieWilliamsonStory표기를 확인하고 데일리샷의43%·700ml개별상품과 대조했습니다."};
 names.add(normalize(item.name));names.add(normalize(item.englishName));
}
await save("scripts/whisky-photo-sources-laphroaig-verified.json",photos);
const mappings=await read("scripts/dailyshot-mappings.json");
mappings["laphroaig-25-bessie-williamson-story"]={topProductId:14361,volumeMl:700,productName:"라프로익 25년 더 베시 윌리엄슨 스토리",englishName:"Laphroaig 25yo The Bessie Williamson Story",abv:43,method:"manual-verified-expression",sourceUrl:"https://dailyshot.co/m/item/14361",verifiedAt:"2026-11-11",note:"베시 윌리엄슨 스토리·43%·700ml를 실물사진 및 개별 상품 정보와 대조했습니다. 다른25년CS와 구분합니다."};
await save("scripts/dailyshot-mappings.json",mappings);
await save("scripts/catalog-candidates/laphroaig-25-old-40-integration.json",{
 checkedOn:"2026-11-11",status:"registered-pending-verification",previousCount:previous.length,entries:candidates,
 duplicateCheck:"ID and normalized Korean/English names checked against522existing entries.40%regularbottlingnotCSannualrelease.",
 photoReview:"Bothfrontandbacklabelandboxshow25years40%70cl.Retailersays2007andL7butnocodeindependentlyvisible;yearnotassertedinproductname.",
 notesProvenance:"40%:AllThingsWhisky2011-01-12explicit40%comparisonnotes.43%Bessie:exactDailyshot14361notes;officialSuntoryarticleconfirmsidentityandbookpackaging.ParaphrasedseparatelyinKorean.",
 dailyshot:"Targeteddiscovery;noCSor43%priceinherited.",
});
console.log(JSON.stringify({preserved:previous.length,added:candidates.map((item)=>item.id)}));
