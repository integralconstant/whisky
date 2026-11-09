import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { whiskyImages } from "../src/data/whisky-images.ts";
import { laphroaigCairdeasEarlyWhiskies } from "../src/data/whiskies-laphroaig-cairdeas-early.ts";
const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const save = (file, data) => writeFile(file, JSON.stringify(data, null, 2) + "\n");
const previous = await read(".cache/catalog-before-cairdeas-2017-2018.json");
const current = new Map(whiskies.map((item) => [item.id, item]));
for (const item of previous) assert.deepEqual(current.get(item.id), item, `Existing item changed: ${item.id}`);
const record = await read("scripts/catalog-candidates/laphroaig-cairdeas-early-integration.json");
record.status = "integrated-verified";
record.currentCount = whiskies.length;
record.existingEntriesPreserved = previous.length;
record.results = [];
for (const entry of laphroaigCairdeasEarlyWhiskies) {
  const item = current.get(entry.id);
  assert.ok(item && whiskyImages[item.id]);
  assert.ok(item.dailyshotProduct);
  if (item.dailyshotPrice) assert.equal(item.dailyshotProduct.scope, "exact-product");
  record.results.push({ id: item.id, photo: whiskyImages[item.id].path, dailyshot: item.dailyshotProduct, price: item.dailyshotPrice ?? null });
}
await save("scripts/catalog-candidates/laphroaig-cairdeas-early-integration.json", record);
const inventory = await read("scripts/catalog-candidates/laphroaig-inventory.json");
for (const item of laphroaigCairdeasEarlyWhiskies) {
  const year = Number(item.id.match(/20\d{2}/)[0]);
  let entry = inventory.entries.find((row) => row.releaseYear === year && row.family === "cairdeas");
  if (!entry) { entry = {name:item.englishName, family:"cairdeas",releaseYear:year}; inventory.entries.push(entry); }
  Object.assign(entry, { status: "integrated", runtimeId: item.id, abv: item.abv, sources: [item.source], integrationRecord: "laphroaig-cairdeas-early-integration.json" });
}
inventory.runtimeSnapshot.checkedAt = new Date().toISOString();
inventory.runtimeSnapshot.rawCount = whiskies.filter((item) => item.brand === "Laphroaig").length;
inventory.runtimeSnapshot.expressions = whiskies.filter((item) => item.brand === "Laphroaig").map((item) => item.englishName);
await save("scripts/catalog-candidates/laphroaig-inventory.json", inventory);
const research = await read("scripts/catalog-candidates/laphroaig-cairdeas-2017-2018-research.json");
research.status = "integrated";
for (const entry of research.entries) { entry.status="integrated"; entry.integrationRecord="laphroaig-cairdeas-early-integration.json"; }
await save("scripts/catalog-candidates/laphroaig-cairdeas-2017-2018-research.json", research);
console.log(JSON.stringify({ preserved: previous.length, current: whiskies.length, additions: record.results.map((item) => item.id) }));
