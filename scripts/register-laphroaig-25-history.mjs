import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { laphroaig25HistoryWhiskies as candidates } from "../src/data/whiskies-laphroaig-25-history.ts";
const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const save = (file, value) => writeFile(file, JSON.stringify(value, null, 2) + "\n");
const normalize = (value) => value.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
const ids = new Set(candidates.map((item) => item.id));
const existing = whiskies.filter((item) => !ids.has(item.id));
const snapshot = ".cache/catalog-before-laphroaig-25-history.json";
try { await readFile(snapshot); } catch (error) { if (error.code !== "ENOENT") throw error; await save(snapshot, existing); }
const names = new Set(existing.flatMap((item) => [normalize(item.name), normalize(item.englishName)]));
const photos = await read("scripts/whisky-photo-sources-laphroaig-verified.json");
for (const item of candidates) {
  assert.ok(!names.has(normalize(item.name)) && !names.has(normalize(item.englishName)), `Duplicate ${item.id}`);
  names.add(normalize(item.name)); names.add(normalize(item.englishName));
  photos[item.id] = {
    imageUrl: "https://img.thewhiskyexchange.com/900/lrgob.25yov6.jpg",
    sourceUrl: "https://www.thewhiskyexchange.com/p/41248/laphroaig-25-year-old-cask-strength-bot2017",
    productName: item.englishName,
    note: "실물의 25년·48.9%·70cl 표기를 육안 확인. 판매 페이지의 2017년 표기를 해당 연도 시음 기사와 대조했습니다.",
  };
}
await save("scripts/whisky-photo-sources-laphroaig-verified.json", photos);
await save("scripts/catalog-candidates/laphroaig-25-history-integration.json", {
  checkedOn: "2026-11-10", status: "registered-pending-verification", previousCount: existing.length,
  duplicateCheck: "IDs and normalized Korean/English names checked against current catalog.",
  entries: candidates, photoReview: "2017: real bottle 25 years / 48.9% / 70cl inspected; source product explicitly Bot.2017.",
  sources: [photos[candidates[0].id].sourceUrl, candidates[0].source],
  dailyshot: { status: "no-exact-annual-price-verified", note: "No 2017 exact product identified. Shared product 9106 and 2018 seller 283631 are not prices for 2017." },
});
console.log(JSON.stringify({ preserved: existing.length, candidates: [...ids] }));
