import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { laphroaigCairdeasOriginWhiskies as candidates } from "../src/data/whiskies-laphroaig-cairdeas-origin.ts";
const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const save = (file, data) => writeFile(file, JSON.stringify(data, null, 2) + "\n");
const normalize = (value) => value.toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]/gu, "");
const photos = await read("scripts/whisky-photo-sources-laphroaig-verified.json");
const sources = {
  "2012": ["https://cdn11.bigcommerce.com/s-e8lbekfe7c/images/stencil/1920w/attribute_rule_images/34604_source_1788939656.jpg?compression=lossy", "https://www.masterofmalt.com/whiskies/laphroaig/laphroaig-cairdeas-origin-2012-edition-whisky/"],
  "2013": ["https://cdn11.bigcommerce.com/s-e8lbekfe7c/images/stencil/1920w/attribute_rule_images/31938_source_1788939671.jpg?compression=lossy", "https://www.masterofmalt.com/whiskies/laphroaig/laphroaig-cairdeas-port-wood-edition-2013-whisky/"],
  "2015": ["https://media.whisky.auction/600/210219_0.jpg?id=455730", "https://whisky.auction/auctions/lot/211449/laphroaig-cairdeas"],
};
const names = new Set(whiskies.flatMap((item) => [normalize(item.name), normalize(item.englishName)]));
const fresh = candidates.filter((item) => !whiskies.some((old) => old.id === item.id));
for (const item of fresh) {
  assert.ok(!names.has(normalize(item.name)) && !names.has(normalize(item.englishName)), `Duplicate ${item.id}`);
  names.add(normalize(item.name)); names.add(normalize(item.englishName));
  const year = item.id.match(/20\d{2}/)[0];
  const [imageUrl, sourceUrl] = sources[year];
  photos[item.id] = { imageUrl, sourceUrl, productName: item.englishName, note: `실물 병·튜브의 ${year === "2012" ? "Origin" : year === "2013" ? "Port Wood Edition" : "200th Anniversary Edition"} 표기를 직접 확인했습니다. ${year} 릴리즈·${item.abv}%·700ml는 개별 상품 정보와 대조했습니다. 연산 표기가 없어 NAS로 기록합니다.` };
}
await save("scripts/whisky-photo-sources-laphroaig-verified.json", photos);
await save("scripts/catalog-candidates/laphroaig-cairdeas-origin-integration.json", {
  checkedOn: "2026-11-09", status: "registered-pending-verification", previousCount: whiskies.length,
  duplicateCheck: "Catalog IDs and normalized Korean/English names checked.2013 differs from48%travelPortWood and52%2020PortWine;2015 differs from15yo anniversary.",
  sources, entries: candidates,
  notesProvenance: { "2012": "Barry Bradford, The Whiskyphiles, firsthand tasting", "2013": "Scotchology firsthand tasting table", "2015": "Scotchology firsthand tasting table" },
  cautions: "No numeric age copied from secondary maturation descriptions. No CS inferred from proof alone. Photos show exact expressions;2013 small ABV text corroborated by retailer specification. No auction prices used as Dailyshot prices.",
});
console.log(JSON.stringify({ previousCount: whiskies.length, added: fresh.map((item) => item.id) }));
