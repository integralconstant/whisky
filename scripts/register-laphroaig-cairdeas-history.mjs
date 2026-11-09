import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { laphroaigCairdeasHistoryWhiskies as candidates } from "../src/data/whiskies-laphroaig-cairdeas-history.ts";
const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const save = (file, value) => writeFile(file, JSON.stringify(value, null, 2) + "\n");
const normalize = (value) => value.toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]/gu, "");
const names = new Set(whiskies.flatMap((item) => [normalize(item.name), normalize(item.englishName)]));
const urls = await read("scripts/catalog-candidates/laphroaig-cairdeas-history-photos.json");
const photos = await read("scripts/whisky-photo-sources-laphroaig-verified.json");
for (const item of candidates) {
  if (whiskies.some((old) => old.id === item.id)) continue;
  assert.ok(!names.has(normalize(item.name)) && !names.has(normalize(item.englishName)), `Duplicate ${item.id}`);
  const year = item.id.match(/20\d{2}/)[0];
  photos[item.id] = { imageUrl: urls[year], sourceUrl: item.source, productName: item.englishName, note: `생산자 공식 병 사진의 카디어스 표현명·${item.abv}%·${year === "2022" ? "750" : "700"}ml를 직접 확인했습니다. ${year} 릴리즈는 개별 생산자 페이지와 대조했습니다.` };
}
await save("scripts/whisky-photo-sources-laphroaig-verified.json", photos);
await save("scripts/catalog-candidates/laphroaig-cairdeas-history-integration.json", {
  checkedOn: "2026-11-09", status: "registered-awaiting-verification", previousCount: whiskies.length,
  duplicateCheck: "IDs and normalized Korean/English names checked. Distinct from ordinary Triple Wood48%, PX48% and Port Wood48%.",
  notesProvenance: "Producer individual expression pages, summarized in Korean. 2021 uses German producer page because English endpoint was inaccessible.",
  photoReview: "Official labels visually inspected.2019:59.5%70cl,2020:52%700ml,2021:58.9%700ml,2022:52.2%75cl,2023:52.3%700ml. 2022 market volume is disclosed.",
  entries: candidates,
});
console.log(candidates.map((item) => item.id).join(","));
