import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { laphroaig25OlderWhiskies as candidates } from "../src/data/whiskies-laphroaig-25-2018-2019.ts";
const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const save = (file, value) => writeFile(file, JSON.stringify(value, null, 2) + "\n");
const previous = await read(".cache/catalog-before-laphroaig-25-2018-2019.json");
const normalize = (value) => value.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
const names = new Set(previous.flatMap((item) => [normalize(item.name), normalize(item.englishName)]));
const photos = await read("scripts/whisky-photo-sources-laphroaig-verified.json");
const sources = {
  "2018": { imageUrl: "https://img.thewhiskyexchange.com/900/lrgob.25yov7.jpg", sourceUrl: "https://www.thewhiskyexchange.com/p/48771/laphroaig-25-year-old-cask-strength-bot2018" },
  "2019": { imageUrl: "https://www.thewhiskybarrel.com/cdn/shop/files/laphroaig-25-year-old-2019-release.jpg?width=1000", sourceUrl: "https://www.thewhiskybarrel.com/products/laphroaig-25-year-old-2019-release" },
};
for (const item of candidates) {
  assert.ok(!previous.some((old) => old.id === item.id), `Duplicate ID ${item.id}`);
  assert.ok(!names.has(normalize(item.name)) && !names.has(normalize(item.englishName)), `Duplicate name ${item.id}`);
  names.add(normalize(item.name)); names.add(normalize(item.englishName));
  const year = item.id.slice(-4);
  photos[item.id] = { ...sources[year], productName: item.englishName, note: `실물 25년·${item.abv}%·700ml 표기를 확인하고 판매 페이지의 ${year}년 에디션 표기를 대조했습니다.` };
}
await save("scripts/whisky-photo-sources-laphroaig-verified.json", photos);
const mappings = await read("scripts/dailyshot-mappings.json");
const note = "공용 25년 CS 상품 중 2018년·52도를 모두 명시한 국내 스토어 판매가만 반영합니다. 연도·도수 미표기 및 다른 연도 판매가는 제외합니다.";
mappings["laphroaig-25-cask-strength-2018"] = {
  topProductId: 9106, volumeMl: 700, productName: "라프로익 25년 CS — 2018년 52도 명시 판매처", englishName: "Laphroaig 25yo CS",
  abv: 52, method: "manual-verified-seller-release", verifiedAt: "2026-11-10", sourceUrl: "https://dailyshot.co/m/items/283631/sellers",
  sellerRelease: { year: 2018, abv: 52, parentAbvLabel: "45~54%", note }, priceNote: note,
};
await save("scripts/dailyshot-mappings.json", mappings);
await save("scripts/dailyshot-mappings-laphroaig-25-2018-2019.json", { "laphroaig-25-cask-strength-2018": mappings["laphroaig-25-cask-strength-2018"] });
await save("scripts/catalog-candidates/laphroaig-25-2018-2019-integration.json", {
  checkedOn: "2026-11-10", status: "registered-pending-verification", previousCount: previous.length,
  entries: candidates, duplicateCheck: "IDs and normalized Korean/English names checked against all 512 existing entries.",
  photoReview: "2018 real bottle 25 years / 52% / 70cl. 2019 real bottle 25 years / 51.4% / 700ml. Annual identities verified against source product pages.",
  notesProvenance: "Firsthand WhiskyNotes 2018 and Whisky Saga 2019 notes paraphrased in Korean, with no review scores copied.",
  caskCaution: "2018 and 2019 real labels say bourbon; some retailer/reviewer copy mentions sherry. Do not assert disputed cask recipes.",
  dailyshot: { "2018": "Public detail item283631 and active offer explicitly say 52 degrees 2018 release, 700ml. Exclude all anonymous and other-release sellers in shared topProduct9106.", "2019": "No exact annual price yet verified." },
});
console.log(JSON.stringify({ preserved: previous.length, added: candidates.map((item) => item.id) }));
