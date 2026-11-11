import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { laphroaigIanHunterWhiskies as candidates } from "../src/data/whiskies-laphroaig-ian-hunter.ts";
const read=async(file)=>JSON.parse(await readFile(file,"utf8"));
const save=(file,data)=>writeFile(file,JSON.stringify(data,null,2)+"\n");
const previous=await read(".cache/catalog-before-laphroaig-ian-hunter.json");
const normalize=(value)=>value.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]/gu,"");
const names=new Set(previous.flatMap((item)=>[normalize(item.name),normalize(item.englishName)]));
const photos=await read("scripts/whisky-photo-sources-laphroaig-verified.json");
const urls=await read("scripts/catalog-candidates/laphroaig-ian-hunter-photos.json");
urls[1]="https://www.laphroaig.com/sites/default/files/styles/original/public/2026-02/30-Ian-Hunte.jpg.webp?itok=gpZBXF-R";
urls[4]="https://d1e2y5wc27crnp.cloudfront.net/media/core/product/thumbnail/7c7fd188-619c-4bc6-9838-317eddf1c032.webp";
const mappings=await read("scripts/dailyshot-mappings.json");
const productIds={2:17597,3:6021,4:14784,5:23793};
const freshMappings={};
for(const item of candidates){
 assert.ok(!previous.some((old)=>old.id===item.id),`DuplicateID ${item.id}`);
 assert.ok(!names.has(normalize(item.name))&&!names.has(normalize(item.englishName)),`DuplicateName ${item.id}`);
 names.add(normalize(item.name));names.add(normalize(item.englishName));
 const book=Number(item.id.slice(-1));const topProductId=productIds[book];
 photos[item.id]={imageUrl:urls[book],sourceUrl:book===4?"https://dailyshot.co/m/item/14784":"https://www.laphroaig.com/en-gb/whisky-stories/the-ian-hunter-story",productName:item.englishName,note:`실물 북${book}·${item.age}년·${item.abv}%·700ml표기를 확인했습니다. 권별 생산자 자료와 대조했습니다.`};
 if(topProductId){
  const detail=await read(`.cache/ian-hunter-dailyshot-${topProductId}.json`);
  assert.equal(detail.information.find((row)=>row.label==="도수").value,`${item.abv}%`);
  assert.equal(detail.information.find((row)=>row.label==="용량").value,"700ml");
  const row={topProductId,volumeMl:700,productName:detail.name.replace(/\[[^\]]*\]/g,""),englishName:detail.en_name,abv:item.abv,method:"manual-verified-expression",sourceUrl:`https://dailyshot.co/m/item/${topProductId}`,verifiedAt:"2026-11-11",note:`북${book}·${item.age}년·${item.abv}%·700ml를 실물 및 개별 상품과 대조했습니다.${book===3?" 데일리샷 영문명34yo는 오기이며 공식 및 실물은33년입니다.":""}`};
  if(book===3)row.priceNote=row.note;
  mappings[item.id]=row;freshMappings[item.id]=row;
 }
}
await save("scripts/whisky-photo-sources-laphroaig-verified.json",photos);
await save("scripts/dailyshot-mappings.json",mappings);
await save("scripts/dailyshot-mappings-laphroaig-ian-hunter.json",freshMappings);
await save("scripts/catalog-candidates/laphroaig-ian-hunter-photos.json",urls);
await save("scripts/catalog-candidates/laphroaig-ian-hunter-integration.json",{
 checkedOn:"2026-11-11",status:"registered-pending-verification",previousCount:previous.length,entries:candidates,
 duplicateCheck:"IDsandnormalizedKorean/Englishnamescheckedagainst524existingentries. Eachbookdistinct;noUIgroupingchange.",
 photoReview:"1:30yo46.7%700ml;2:30yo48.2%70cl;3:33yo49.9%700ml;4:34yo46.2%70clDailyshot;5:34yo45.5%700ml. Allphotographsvisuallyinspected.",
 cautions:"Book3DailyshotEnglish34yotypocorrectedto33yearsinappbyproducerandlabel. Book4officiallifestylephotohastinyambiguous46.4-lookinglabel;notusedfor46.2%.Do notinferadditionalvariantwithoutstrongerlabelproof. Book2retailerexbourbontextignored;producerconfirmsfullOloroso. Market750mlversionsremainforseparateverification.",
 caskStrengthEvidence:{1:"WhiskyBrotherexplicitlycaskstrength46.7%",3:"FigeeimporterPDFexplicitlycaskstrength33yo1987"},
 caskStrengthPending:[2,4,5],
 notesProvenance:"1:WhiskyBrother;2:officialSuntorypress;3and5:exactproducerproductpages;4:Dailyshot14784. SeparateKoreanparaphrases,noinferredfillnumbers.",
});
console.log(JSON.stringify({preserved:previous.length,added:candidates.map((item)=>item.id)}));
