import assert from "node:assert/strict";
import { readFile, stat, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { whiskyImages } from "../src/data/whisky-images.ts";

const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const save = (file, data) => writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
const baseline = await read(".cache/catalog-before-laphroaig-ian-us.json");
const id = "laphroaig-qa-cask-1l";
const recordFile = "scripts/catalog-candidates/laphroaig-qa-cask-integration.json";
const imageUrl = "https://img.thewhiskyexchange.com/330/lrgob.non7.jpg?v=202407241";
const norm = (value) =>
  value.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

for (const item of baseline)
  assert.deepEqual(whiskies.find((candidate) => candidate.id === item.id), item);
for (const protectedId of [
  "laphroaig-ian-hunter-book-1-750",
  "laphroaig-ian-hunter-book-2-750",
  "laphroaig-ian-hunter-book-3-750",
  "laphroaig-ian-hunter-book-4-750",
  "laphroaig-ian-hunter-book-5-750",
])
  assert.ok(whiskies.some((item) => item.id === protectedId));

const item = whiskies.find((candidate) => candidate.id === id);
assert.ok(item, `Missing ${id}`);
assert.ok(
  !baseline.some(
    (candidate) =>
      candidate.id === item.id ||
      norm(candidate.name) === norm(item.name) ||
      norm(candidate.englishName) === norm(item.englishName),
  ),
);
assert.equal(item.age, null);
assert.equal(item.abv, 40);
assert.equal(Boolean(item.caskStrength), false);
assert.match(`${item.name} ${item.englishName}`, /1l/i);

if (process.argv.includes("--verify")) {
  assert.ok((await stat(`public${whiskyImages[id].path}`)).size > 500);
  assert.equal(item.dailyshotPrice, undefined);
  const record = await read(recordFile);
  Object.assign(record, {
    status: "integrated-verified",
    existingEntriesPreserved: baseline.length + 5,
    currentCount: whiskies.length,
    photos: [whiskyImages[id].path],
    dailyshot: "no-exact-match",
  });
  await save(recordFile, record);

  const inventoryFile = "scripts/catalog-candidates/laphroaig-inventory.json";
  const inventory = await read(inventoryFile);
  const entry = inventory.entries.find((candidate) => candidate.runtimeId === id);
  const data = {
    name: item.englishName,
    status: "integrated",
    runtimeId: id,
    integrationRecord: "laphroaig-qa-cask-integration.json",
  };
  if (entry) Object.assign(entry, data);
  else inventory.entries.push(data);
  const laphroaig = whiskies.filter((candidate) => candidate.brand === "Laphroaig");
  Object.assign(inventory.runtimeSnapshot, {
    checkedAt: new Date().toISOString(),
    rawCount: laphroaig.length,
    expressions: laphroaig.map((candidate) => candidate.englishName),
  });
  await save(inventoryFile, inventory);
} else {
  const photosFile = "scripts/whisky-photo-sources-laphroaig-verified.json";
  const photos = await read(photosFile);
  photos[id] = {
    imageUrl,
    sourceUrl: item.source,
    productName: item.englishName,
    note: "Actual bottle and tube reviewed: QA Cask, 1 litre and 40% product identity confirmed by The Whisky Exchange. Age and cask-strength are not inferred.",
  };
  await save(photosFile, photos);
  await save(recordFile, {
    checkedAt: new Date().toISOString(),
    status: "registered-pending-verification",
    ids: [id],
    previousCount: baseline.length + 5,
    source: item.source,
    factsSource: "https://www.thewhiskyexchange.com/p/24133/laphroaig-qa-cask-litre",
    supportingSource: "https://www.paneco.com.sg/products/laphroaig-qa-cask-single-malt-1l-w-gift-box",
    photoReview: photos[id].note,
    notesProvenance: "The Whisky Exchange's named tasting notes are paraphrased. Description and product facts are from the same product page, with volume and ABV corroborated by Paneco.",
    duplicateCheck: `ID and normalized names checked against ${baseline.length + 5} existing entries. QA Cask is a separately named, 1L travel-retail expression; it is not Four Oak, Quarter Cask, PX Cask, or Oak Select.`,
  });
}

console.log({
  preserved: baseline.length + 5,
  total: whiskies.length,
  verified: process.argv.includes("--verify"),
});
