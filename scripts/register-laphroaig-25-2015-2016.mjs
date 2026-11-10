import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { laphroaig25EarlyWhiskies as candidates } from "../src/data/whiskies-laphroaig-25-2015-2016.ts";
const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const save = (file, data) => writeFile(file, JSON.stringify(data, null, 2) + "\n");
const previous = await read(".cache/catalog-before-laphroaig-25-2015-2016.json");
const normalize = (value) => value.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
const names = new Set(previous.flatMap((item) => [normalize(item.name), normalize(item.englishName)]));
const photos = await read("scripts/whisky-photo-sources-laphroaig-verified.json");
const products = { 2015: [73300, "v11"], 2016: [36037, "v5"] };
for (const item of candidates) {
  assert.ok(!previous.some((old) => old.id === item.id), `Duplicate ID ${item.id}`);
  assert.ok(!names.has(normalize(item.name)) && !names.has(normalize(item.englishName)), `Duplicate name ${item.id}`);
  names.add(normalize(item.name)); names.add(normalize(item.englishName));
  const year = item.id.slice(-4); const [productId, code] = products[year];
  photos[item.id] = { imageUrl: `https://img.thewhiskyexchange.com/900/lrgob.25yo${code}.jpg`, sourceUrl: `https://www.thewhiskyexchange.com/p/${productId}/laphroaig-25-year-old-cask-strength-bot${year}`, productName: item.englishName, note: `${year}년 판매 페이지와 실물 25년·${item.abv}%·70cl 표기를 대조했습니다. 2015년은 병과 검은 패키지의 연도 표기도 직접 확인했습니다.` };
}
await save("scripts/whisky-photo-sources-laphroaig-verified.json", photos);
await save("scripts/catalog-candidates/laphroaig-25-2015-2016-integration.json", {
  checkedOn: "2026-11-10", status: "registered-pending-verification", previousCount: previous.length, entries: candidates,
  duplicateCheck: "IDs and normalized Korean/English names checked against all 514 existing entries.",
  photoReview: "2015 black anniversary package and bottle explicitly 2015 Cask Strength Edition, 25 years, 46.8%, 70cl. 2016 white package, 25 years, 48.6%, 70cl; annual identity confirmed by exact retailer product.",
  notesProvenance: "2015 TOModera firsthand review; 2016 The Whisky Exchange product tasting notes. Paraphrased in Korean; no scores copied.",
  caskCaution: "2016 label confirms Oloroso sherry and American oak, but retailer copy about first fill conflicts with second fill evidence elsewhere; no fill number asserted.",
  dailyshot: "Require exact annual identity; no price inherited from shared product9106. New products undergo targeted discovery.",
});
console.log(JSON.stringify({preserved:previous.length,added:candidates.map((item)=>item.id)}));
