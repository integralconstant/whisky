import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { laphroaigCairdeasEarlyWhiskies as candidates } from "../src/data/whiskies-laphroaig-cairdeas-early.ts";
const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const save = (file, value) => writeFile(file, JSON.stringify(value, null, 2) + "\n");
const normalize = (value) => value.toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]/gu, "");
const photos = await read("scripts/whisky-photo-sources-laphroaig-verified.json");
const sources = {
  "2014": ["https://cdn11.bigcommerce.com/s-e8lbekfe7c/images/stencil/1920w/attribute_rule_images/29117_source_1788939668.jpg?compression=lossy", candidates[0].source, 700],
  "2016": ["https://cdn11.bigcommerce.com/s-e8lbekfe7c/images/stencil/1920w/attribute_rule_images/21157_source_1784699445.jpg?compression=lossy", "https://www.masterofmalt.com/whiskies/laphroaig/laphroaig-cairdeas-madeira-cask-2016-edition-whisky/", 700],
  "2017": ["https://img.thewhiskyexchange.com/900/lrgob.non18.jpg", "https://www.thewhiskyexchange.com/p/38985/laphroaig-cairdeas-cask-strength-quarter-cask", 700],
  "2018": ["https://cdn.klwines.com/images/skus/1371733x.jpg", "https://www.klwines.com/products/details/1371733", 750],
};
const names = new Set(whiskies.flatMap((item) => [normalize(item.name), normalize(item.englishName)]));
const fresh = candidates.filter((item) => !whiskies.some((old) => old.id === item.id));
for (const item of fresh) {
  assert.ok(!names.has(normalize(item.name)) && !names.has(normalize(item.englishName)), `Duplicate ${item.id}`);
  names.add(normalize(item.name)); names.add(normalize(item.englishName));
  const year = item.id.match(/20\d{2}/)[0];
  const [imageUrl, sourceUrl, volume] = sources[year];
  photos[item.id] = { imageUrl, sourceUrl, productName: item.englishName, note: `판매처 실물 병 사진에서 해당 카디어스 표현명·${item.abv}%·${volume}ml를 대조했습니다. ${year} 연도는 개별 상품 페이지와 확인했습니다.` };
}
await save("scripts/whisky-photo-sources-laphroaig-verified.json", photos);
await save("scripts/catalog-candidates/laphroaig-cairdeas-early-integration.json", {
  checkedOn: "2026-11-09", status: "registered-pending-verification", previousCount: whiskies.length,
  duplicateCheck: "Catalog IDs and normalized Korean/English names checked; regular Quarter Cask48% remains separate.",
  sources, entries: candidates,
  notesProvenance: { "2014": "Master of Malt retailer notes", "2016": "Ruben, WhiskyNotes, firsthand tasting", "2017": "Thomas Ohrbom, Whisky Saga, firsthand tasting", "2018": "Master of Malt retailer notes" },
  cautions: "No age inferred from maturation descriptions.2017 CS from label and retailer facts; others not classified CS from ABV alone.2018 photograph750ml disclosed. Notes are explicitly attributed in descriptions.",
});
console.log(JSON.stringify({ previousCount: whiskies.length, added: fresh.map((item) => item.id) }));
