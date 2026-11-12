import assert from "node:assert/strict";
import { readFile, stat, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { whiskyImages } from "../src/data/whisky-images.ts";

const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const save = (file, data) => writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
const previous = await read(".cache/catalog-before-laphroaig-ian-us.json");
const ids = [
  "laphroaig-ian-hunter-book-3-750",
  "laphroaig-ian-hunter-book-4-750",
  "laphroaig-ian-hunter-book-5-750",
];
const images = [
  "https://www.oaksliquors.com/product_images/img_2678_1.jpg",
  "https://www.oaksliquors.com/product_images/img_3239_1.jpg",
  "https://www.oaksliquors.com/product_images/img_3281_1.jpg",
];
const properties = [
  [33, 49.9, true],
  [34, 46.2, false],
  [34, 45.5, false],
];
const recordFile = "scripts/catalog-candidates/laphroaig-ian-us-integration.json";
const norm = (value) =>
  value.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

for (const item of previous)
  assert.deepEqual(whiskies.find((candidate) => candidate.id === item.id), item);

const items = ids.map((id) => {
  const item = whiskies.find((candidate) => candidate.id === id);
  assert.ok(item, `Missing ${id}`);
  return item;
});

for (const [index, item] of items.entries()) {
  const [age, abv, caskStrength] = properties[index];
  assert.ok(
    !previous.some(
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
    existingEntriesPreserved: previous.length,
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
      integrationRecord: "laphroaig-ian-us-integration.json",
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
    const book = index + 3;
    photos[item.id] = {
      imageUrl: images[index],
      sourceUrl: item.source,
      productName: item.englishName,
      note: `Actual bottle reviewed: Ian Hunter Book ${book}, ${item.age} years, ${item.abv}%, 750mL visible. ${book === 3 ? "Cask Strength is separately corroborated for this release." : "No cask-strength classification inferred from ABV."}`,
    };
  }
  await save(photosFile, photos);
  await save(recordFile, {
    checkedAt: new Date().toISOString(),
    status: "registered-pending-verification",
    ids,
    previousCount: previous.length,
    sources: items.map((item) => item.source),
    expressionSources: [
      "https://www.laphroaig.com/en-gb/whiskies/ian-hunter-book-3-source-protector",
      "https://dailyshot.co/m/item/14784",
      "https://www.laphroaig.com/en-gb/whiskies/ian-hunter-book-5-enduring-spirit-34-yo-single-malt-scotch-whisky",
    ],
    caskStrengthSource: "https://www.htfw.com/laphroaig-the-ian-hunter-story-book-3-source-protector-single-malt-scotch-33-year-old-whisky",
    photoReview: items.map((item, index) => photos[item.id].note),
    notesProvenance: "The existing 700ml expression guidance is retained verbatim only as shared-release guidance. Each new record explicitly identifies its separately photographed 750ml market size; no distinct liquid, batch, or bottle-specific tasting claim is made.",
    duplicateCheck: `IDs and normalized names checked against ${previous.length} entries. Existing Ian Hunter Books 3–5 are 700ml records; these are separately evidenced 750ml bottles with the displayed age and ABV.`,
  });
}

console.log({
  preserved: previous.length,
  total: whiskies.length,
  verified: process.argv.includes("--verify"),
});
