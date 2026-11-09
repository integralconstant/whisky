import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { laphroaig25Whiskies as candidates } from "../src/data/whiskies-laphroaig-25.ts";
const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const save = (file, data) => writeFile(file, JSON.stringify(data, null, 2) + "\n");
const normalize = (value) => value.toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]/gu, "");
const photos = await read("scripts/whisky-photo-sources-laphroaig-verified.json");
const urls = await read("scripts/catalog-candidates/laphroaig-25-photos.json");
const names = new Set(whiskies.flatMap((item)=>[normalize(item.name),normalize(item.englishName)]));
const fresh = candidates.filter((item)=>!whiskies.some((old)=>old.id===item.id));
for (const item of fresh) {
  assert.ok(!names.has(normalize(item.name)) && !names.has(normalize(item.englishName)), `Duplicate ${item.id}`);
  names.add(normalize(item.name));names.add(normalize(item.englishName));
  const year=item.id.slice(-4);
  photos[item.id]={imageUrl:urls[year],sourceUrl:item.source,productName:item.englishName,note:`생산자 공식 사진의 25년·${item.abv}%·${year==="2023"?700:750}ml·CS 표기를 직접 확인하고 ${year} 릴리즈를 해당 생산자 페이지와 대조했습니다.`};
}
await save("scripts/whisky-photo-sources-laphroaig-verified.json",photos);
const mappings=await read("scripts/dailyshot-mappings.json");
assert.ok(!Object.entries(mappings).some(([id,row])=>id!=="laphroaig-25-cask-strength-2023"&&row.topProductId===23528),"Duplicate exact Dailyshot product");
const mapping={topProductId:23528,volumeMl:700,productName:"라프로익 25년 CS 2023 에디션",englishName:"Laphroaig 25yo CS 2023 Edition",abv:47.3,method:"manual-verified-expression",sourceUrl:"https://dailyshot.co/m/item/23528",verifiedAt:"2026-11-09",note:"2023 에디션·47.3%·700ml를 생산자 및 데일리샷 개별 상품과 대조했습니다. 연도·도수 범위 공용 상품9106은 제외합니다."};
mappings["laphroaig-25-cask-strength-2023"]=mapping;
await save("scripts/dailyshot-mappings.json",mappings);
await save("scripts/dailyshot-mappings-laphroaig-25.json",{"laphroaig-25-cask-strength-2023":mapping});
await save("scripts/catalog-candidates/laphroaig-25-integration.json",{
  checkedOn:"2026-11-09",status:"registered-pending-verification",previousCount:whiskies.length,
  duplicateCheck:"IDs and normalized Korean/English names checked against catalog; exact Dailyshot top-product23528 not already assigned.",entries:candidates,
  notesProvenance:"Exact annual producer pages paraphrased in Korean.2020–2022 publish the same notes;2023 distinct notes kept.",
  photoReview:"2020:49.8%750ml,2021:51.9%750ml,2022:53.4%750ml,2023:47.3%700ml. All25yearCS labels inspected.2020 small ABV rechecked at original resolution.",
  cautions:"2020–2022 producer body mentions Oloroso but official front labels say bourbon casks; no specific cask recipe asserted in catalog descriptions.2023 exact page and label agree bourbon. Search metadata titles about10yo ignored in favor of exact body and labels. Shared Dailyshot9106 is45–54%700ml and not proof of any annual release; no annual price copied from it.",
});
console.log(JSON.stringify({previousCount:whiskies.length,added:fresh.map((item)=>item.id)}));
