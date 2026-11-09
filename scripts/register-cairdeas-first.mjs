import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { laphroaigCairdeasFirstWhiskies as candidates } from "../src/data/whiskies-laphroaig-cairdeas-first.ts";
const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const save = (file, data) => writeFile(file, JSON.stringify(data, null, 2) + "\n");
const normalize = (value) => value.toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]/gu, "");
const photos = await read("scripts/whisky-photo-sources-laphroaig-verified.json");
const sources = {
  "2008": ["31890_source_1788939670.jpg", "https://www.masterofmalt.com/whiskies/laphroaig-cairdeas-whisky/"],
  "2009": ["16732_source_1788939663.jpg", "https://www.masterofmalt.com/whiskies/laphroaig/laphroaig-cairdeas-12-year-old-2009-edition-whisky/"],
  "2010": ["16760_source_1788939662.jpg", "https://www.masterofmalt.com/whiskies/laphroaig/laphroaig-cairdeas-masters-edition-2010-edition-whisky/"],
  "2011": ["50830_source_1788939659.jpg", "https://www.masterofmalt.com/whiskies/laphroaig/laphroaig-cairdeas-ileach-edition-whisky/"],
};
const names = new Set(whiskies.flatMap((item) => [normalize(item.name), normalize(item.englishName)]));
const fresh = candidates.filter((item) => !whiskies.some((old) => old.id === item.id));
for (const item of fresh) {
  assert.ok(!names.has(normalize(item.name)) && !names.has(normalize(item.englishName)), `Duplicate ${item.id}`);
  names.add(normalize(item.name)); names.add(normalize(item.englishName));
  const year = item.id.match(/20\d{2}/)[0];
  const [filename, sourceUrl] = sources[year];
  photos[item.id] = { imageUrl: `https://cdn11.bigcommerce.com/s-e8lbekfe7c/images/stencil/1920w/attribute_rule_images/${filename}?compression=lossy`, sourceUrl, productName: item.englishName };
  photos[item.id].note = `실물 라벨의 해당 카디어스 표현명·${item.abv}%·700ml를 확인하고 ${year} 릴리즈를 상품 정보와 대조했습니다.${year === "2009" ? " 12년·캐스크 스트렝스 표기도 직접 확인했습니다." : year === "2010" ? " 11~19년 원액 조합 설명을 유지하고 단일 연산은 정하지 않았습니다." : ""}`;
}
await save("scripts/whisky-photo-sources-laphroaig-verified.json", photos);
await save("scripts/catalog-candidates/laphroaig-cairdeas-first-integration.json", {
  checkedOn: "2026-11-09", status: "registered-pending-verification", previousCount: whiskies.length,
  duplicateCheck: "IDs and normalized Korean/English names checked against existing catalog and within cohort.",
  sources, entries: candidates,
  notesProvenance: "2008–2010: Ruben at WhiskyNotes firsthand notes;2011:My Annoying Opinions own-bottle notes, with water conditions retained.",
  caskStrengthEvidence: "2008 and2011 retailer product descriptions explicitly CS;2009 front label explicitly CS.2010 not classified from high ABV alone.",
  cautions: "2009 label12yo verified.2010 label11–19year components recorded without inferred scalar age.2011 no age copied from reviewer headlines. All photos700ml.",
});
console.log(JSON.stringify({ previousCount: whiskies.length, added: fresh.map((item) => item.id) }));
