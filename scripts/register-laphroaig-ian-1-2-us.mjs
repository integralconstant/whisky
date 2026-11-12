import assert from "node:assert/strict";
import { readFile, stat, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { whiskyImages } from "../src/data/whisky-images.ts";

const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const save = (file, data) => writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
const baseline = await read(".cache/catalog-before-laphroaig-ian-us.json");
const ids = ["laphroaig-ian-hunter-book-1-750", "laphroaig-ian-hunter-book-2-750"];
const images = [
  "https://cdn.klwines.com/images/skus/1454377x.jpg",
  "https://www.liquormarts.ca/sites/mbll-lm/files/import/images/34803_245a94f231de597f8a932d1719f6d5da.png",
];
const properties = [
  [30, 46.7, true],
  [30, 48.2, false],
];
const recordFile = "scripts/catalog-candidates/laphroaig-ian-1-2-us-integration.json";
const norm = (value) =>
  value.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

for (const item of baseline)
  assert.deepEqual(whiskies.find((candidate) => candidate.id === item.id), item);
for (const [id, age, abv] of [
  ["laphroaig-ian-hunter-book-3-750", 33, 49.9],
  ["laphroaig-ian-hunter-book-4-750", 34, 46.2],
  ["laphroaig-ian-hunter-book-5-750", 34, 45.5],
]) {
  const item = whiskies.find((candidate) => candidate.id === id);
  assert.ok(item, `Previously integrated ${id} is missing`);
  assert.equal(item.age, age);
  assert.equal(item.abv, abv);
}

const items = ids.map((id) => {
  const item = whiskies.find((candidate) => candidate.id === id);
  assert.ok(item, `Missing ${id}`);
  return item;
});
for (const [index, item] of items.entries()) {
  const [age, abv, caskStrength] = properties[index];
  assert.ok(
    !baseline.some(
      (candidate) =>
        candidate.id === item.id ||
        norm(candidate.name) === norm(item.name) ||
        norm(candidate.englishName) === norm(item.englishName),
    ),
  );
  assert.equal(item.age, age);
  assert.equal(item.abv, abv);
  assert.equal(Boolean(item.caskStrength), caskStrength);
  assert.match(`${item.name} ${item.englishName}`, /750ml/i);
}

if (process.argv.includes("--verify")) {
  for (const item of items) {
    assert.ok((await stat(`public${whiskyImages[item.id].path}`)).size > 500);
    assert.equal(item.dailyshotPrice, undefined);
  }
  const record = await read(recordFile);
  Object.assign(record, {
    status: "integrated-verified",
    existingEntriesPreserved: baseline.length + 3,
    currentCount: whiskies.length,
    photos: ids.map((id) => whiskyImages[id].path),
    dailyshot: "no-exact-match",
  });
  await save(recordFile, record);

  const inventoryFile = "scripts/catalog-candidates/laphroaig-inventory.json";
  const inventory = await read(inventoryFile);
  for (const item of items) {
    const entry = inventory.entries.find((candidate) => candidate.runtimeId === item.id);
    const data = {
      name: item.englishName,
      status: "integrated",
      runtimeId: item.id,
      integrationRecord: "laphroaig-ian-1-2-us-integration.json",
    };
    if (entry) Object.assign(entry, data);
    else inventory.entries.push(data);
  }
  const laphroaig = whiskies.filter((item) => item.brand === "Laphroaig");
  Object.assign(inventory.runtimeSnapshot, {
    checkedAt: new Date().toISOString(),
    rawCount: laphroaig.length,
    expressions: laphroaig.map((item) => item.englishName),
  });
  await save(inventoryFile, inventory);
} else {
  const photosFile = "scripts/whisky-photo-sources-laphroaig-verified.json";
  const photos = await read(photosFile);
  for (const [index, item] of items.entries()) {
    const book = index + 1;
    photos[item.id] = {
      imageUrl: images[index],
      sourceUrl: item.source,
      productName: item.englishName,
      note: `Actual bottle reviewed: Ian Hunter Book ${book}, ${item.age} years, ${item.abv}%, 750mL visible. ${book === 1 ? "Cask Strength is separately corroborated for this release." : "No cask-strength classification inferred from ABV."}`,
    };
  }
  await save(photosFile, photos);
  await save(recordFile, {
    checkedAt: new Date().toISOString(),
    status: "registered-pending-verification",
    ids,
    previousCount: baseline.length + 3,
    sources: items.map((item) => item.source),
    expressionSources: [
      "https://www.klwines.com/products/details/1454377",
      "https://www.liquormarts.ca/product/laphroaig-ian-hunter-book-2-30-yo-islay-single-malt-scotch-whisky/750-ml",
    ],
    caskStrengthSource: "https://www.danmurphys.com.au/product/DM_199735/laphroaig-ian-hunter-book-1-30-year-old-islay-single-malt",
    photoReview: items.map((item) => photos[item.id].note),
    notesProvenance: "The existing 700ml expression guidance is retained verbatim only as shared-release guidance. Each new record explicitly identifies its separately photographed 750ml market size; no distinct liquid, batch, or bottle-specific tasting claim is made.",
    duplicateCheck: `IDs and normalized names checked against ${baseline.length + 3} existing entries. Existing Ian Hunter Books 1–2 are 700ml records; these are separately evidenced 750ml bottles with the displayed age and ABV.`,
  });
}

console.log({
  preserved: baseline.length + 3,
  total: whiskies.length,
  verified: process.argv.includes("--verify"),
});
