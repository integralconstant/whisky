import assert from "node:assert/strict";
import { readFile, stat, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { whiskyImages } from "../src/data/whisky-images.ts";

const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const save = (file, data) => writeFile(file, `${JSON.stringify(data, null, 2)}\n`);
const baseline = await read(".cache/catalog-before-laphroaig-ian-us.json");
const id = "laphroaig-10-40-1l";
const recordFile = "scripts/catalog-candidates/laphroaig-10-1l-integration.json";
const imageUrl = "https://changiairport.scene7.com/is/image/changiairport/mp00689840-1-laphroaig-1746671430455?%242x%24=";
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
  "laphroaig-qa-cask-1l",
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
assert.equal(item.age, 10);
assert.equal(item.abv, 40);
assert.equal(Boolean(item.caskStrength), false);
assert.match(`${item.name} ${item.englishName}`, /1l/i);

if (process.argv.includes("--verify")) {
  assert.ok((await stat(`public${whiskyImages[id].path}`)).size > 500);
  assert.equal(item.dailyshotPrice, undefined);
  const record = await read(recordFile);
  Object.assign(record, {
    status: "integrated-verified",
    existingEntriesPreserved: baseline.length + 6,
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
    integrationRecord: "laphroaig-10-1l-integration.json",
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
    note: "Actual bottle and carton reviewed: Laphroaig 10 Year Old 1L. The exact Changi product page confirms 1000ml and 40%; it is not the 700ml 40% or 750ml 43% market bottle.",
  };
  await save(photosFile, photos);
  await save(recordFile, {
    checkedAt: new Date().toISOString(),
    status: "registered-pending-verification",
    ids: [id],
    previousCount: baseline.length + 6,
    source: item.source,
    productFactsSource: "https://www.heinemann.com.au/en/global/laphroaig/laphroaig-10y-40vol-1l/p/000000000000012710/",
    photoSource: "https://www.ishopchangi.com/en/product/laphroaig-10yo-1000ml-40--mp00689838",
    photoReview: photos[id].note,
    notesProvenance: "The core expression guidance is deliberately concise and shared only at the factual expression level. The Heinemann and Changi product pages corroborate the separately photographed 1L 40% bottle.",
    duplicateCheck: `ID and normalized names checked against ${baseline.length + 6} existing entries. The pre-existing Laphroaig 10 records are 700ml 40%, 700ml 43%, and 750ml 43%; this record names and verifies the separate 1L 40% bottle.`,
  });
}

console.log({
  preserved: baseline.length + 6,
  total: whiskies.length,
  verified: process.argv.includes("--verify"),
});
