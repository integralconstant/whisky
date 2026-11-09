import { readFile, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";

const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const save = (file, value) => writeFile(file, JSON.stringify(value, null, 2) + "\n");
const travel = await read("scripts/catalog-candidates/laphroaig-travel-versions.json");
const core = await read("scripts/catalog-candidates/laphroaig-core-relaunch-ready.json");
const entries = travel.entries.map((entry) => ({
  whisky: entry.whisky,
  mapping: entry.proposedDailyshotMapping,
  photo: entry.proposedPhotoSource,
}));
const fifteen = core.entries.find((entry) => entry.id === "laphroaig-15-2026-relaunch");
entries.push({
  whisky: { ...fifteen.record, brand: "Laphroaig", image: "", color: "#e8ede3", abvNote: "46%·700ml의 2026 리런치 제품입니다. 구형 43% 15년과 구분합니다." },
  mapping: {
    topProductId: 37532, volumeMl: 700, productName: fifteen.dailyshot.name,
    englishName: fifteen.dailyshot.nameEn, abv: 46,
    method: "manual-verified-expression", sourceUrl: fifteen.dailyshot.url,
    note: "현행 46%·700ml 15년 리런치이며 구형 43% 제품을 제외합니다.",
  },
  photo: {
    imageUrl: fifteen.photoCandidates[0].url, sourceUrl: fifteen.record.source,
    productName: fifteen.record.englishName,
    note: "생산자 정면 실물 사진의 15년·46%·700ml 라벨을 확인했습니다. 구형 43% 병과 구분합니다.",
  },
});
const normalize = (value) => value.toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]/gu, "");
const mappings = await read("scripts/dailyshot-mappings.json");
const knownIds = new Set(whiskies.map((item) => item.id));
const names = new Set(whiskies.flatMap((item) => [normalize(item.name), normalize(item.englishName)]));
const products = new Set(Object.values(mappings).map((item) => item.topProductId));
const fresh = entries.filter(({ whisky }) => !knownIds.has(whisky.id));
for (const { whisky, mapping, photo } of fresh) {
  if (!mapping || !photo) throw new Error(`Incomplete evidence: ${whisky.id}`);
  if (names.has(normalize(whisky.name)) || names.has(normalize(whisky.englishName)) || products.has(mapping.topProductId))
    throw new Error(`Duplicate expression or Dailyshot product: ${whisky.id}`);
  names.add(normalize(whisky.name)); names.add(normalize(whisky.englishName)); products.add(mapping.topProductId);
  mapping.verifiedAt = "2026-11-09";
  mappings[whisky.id] = mapping;
}
if (!fresh.length) { console.log("All verified entries are already registered."); process.exit(0); }
await save(".cache/catalog-before-laphroaig-nov9.json", whiskies);
await writeFile("src/data/whiskies-laphroaig-verified.ts", 'import type { Whisky } from "./types.ts";\n\nexport const laphroaigVerifiedWhiskies: Whisky[] = ' + JSON.stringify(fresh.map((entry) => entry.whisky), null, 2) + ';\n');
await save("scripts/whisky-photo-sources-laphroaig-verified.json", Object.fromEntries(fresh.map(({ whisky, photo }) => [whisky.id, photo])));
await save("scripts/dailyshot-mappings-laphroaig-verified.json", Object.fromEntries(fresh.map(({ whisky, mapping }) => [whisky.id, mapping])));
await save("scripts/dailyshot-mappings.json", mappings);
await save("scripts/catalog-candidates/laphroaig-nov9-integration.json", {
  checkedOn: "2026-11-09", status: "registered-pending-price-and-photo-validation",
  previousCount: whiskies.length, duplicateCheck: "IDs, normalized Korean/English names and Dailyshot top-product IDs checked against existing catalog; already registered entries skipped.",
  entries: fresh,
});
console.log(JSON.stringify({ previousCount: whiskies.length, added: fresh.map(({ whisky }) => whisky.id) }));
