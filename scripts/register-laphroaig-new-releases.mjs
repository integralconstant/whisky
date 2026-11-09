import { readFile, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { laphroaigNewReleaseWhiskies } from "../src/data/whiskies-laphroaig-new-releases.ts";
const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const save = (file, data) => writeFile(file, JSON.stringify(data, null, 2) + "\n");
const normalize = (value) => value.toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]/gu, "");
const names = new Set(whiskies.flatMap((item) => [normalize(item.name), normalize(item.englishName)]));
const urls = await read("scripts/catalog-candidates/laphroaig-new-release-photos.json");
const photos = await read("scripts/whisky-photo-sources-laphroaig-verified.json");
for (const item of laphroaigNewReleaseWhiskies) {
  if (whiskies.some((old) => old.id === item.id)) continue;
  if (names.has(normalize(item.name)) || names.has(normalize(item.englishName))) throw new Error(`Duplicate ${item.id}`);
  const key = item.id.includes("2024") ? "cairdeas-2024" : item.id.includes("2025") ? "cairdeas-2025" : item.id.includes("2026") ? "cairdeas-2026" : "elements-l3-0";
  photos[item.id] = { imageUrl: urls[key], sourceUrl: item.source, productName: item.englishName, note: `공식 정면 병의 제품명·${item.age ? `${item.age}년·` : ""}${item.abv}%·700ml 라벨을 직접 대조했습니다. 연도는 해당 생산자 제품 페이지와 확인했습니다.` };
}
await save("scripts/whisky-photo-sources-laphroaig-verified.json", photos);
await save("scripts/catalog-candidates/laphroaig-new-releases-nov9.json", {
  checkedOn: "2026-11-09", status: "registered-pending-price-and-photo-validation", duplicateCheck: "IDs and normalized Korean/English names checked against existing catalog",
  evidence: "Producer expression pages, official range specifications and visually inspected official 700ml bottle labels. 2024 is fixed strength, not classified as CS; 2025 and 2026 explicitly CS; Elements L3.0 bottle states CS.",
  cautions: "2026 separate finish unpublished; Elements L3.0 uses general producer flavour notes without inventing a distinct nose. French oak is full maturation per exact 2026 product page, despite shorthand finished on history page.",
  entries: laphroaigNewReleaseWhiskies,
});
console.log(laphroaigNewReleaseWhiskies.map((item) => item.id).join(","));
