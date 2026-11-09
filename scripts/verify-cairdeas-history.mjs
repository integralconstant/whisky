import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { whiskyImages } from "../src/data/whisky-images.ts";
import { laphroaigCairdeasHistoryWhiskies } from "../src/data/whiskies-laphroaig-cairdeas-history.ts";
const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const save = (file, data) => writeFile(file, JSON.stringify(data, null, 2) + "\n");
const previous = await read(".cache/catalog-before-cairdeas-history.json");
const current = new Map(whiskies.map((item) => [item.id, item]));
for (const item of previous) assert.deepEqual(current.get(item.id), item, `Existing item changed: ${item.id}`);
const record = await read("scripts/catalog-candidates/laphroaig-cairdeas-history-integration.json");
record.status = "integrated-verified";
record.existingEntriesPreserved = previous.length;
record.currentCount = whiskies.length;
record.results = [];
for (const entry of laphroaigCairdeasHistoryWhiskies) {
  const item = current.get(entry.id);
  assert.ok(item && whiskyImages[item.id]);
  assert.ok(item.dailyshotProduct);
  if (item.dailyshotPrice) assert.equal(item.dailyshotProduct.scope, "exact-product");
  record.results.push({ id: item.id, photo: whiskyImages[item.id].path, dailyshot: item.dailyshotProduct, price: item.dailyshotPrice ?? null });
}
await save("scripts/catalog-candidates/laphroaig-cairdeas-history-integration.json", record);
const inventory = await read("scripts/catalog-candidates/laphroaig-inventory.json");
for (const entry of inventory.entries) {
  const match = laphroaigCairdeasHistoryWhiskies.find((item) => entry.releaseYear && item.id.includes(String(entry.releaseYear)) && entry.family === "cairdeas");
  if (match) Object.assign(entry, { status: "integrated", runtimeId: match.id, integrationRecord: "laphroaig-cairdeas-history-integration.json" });
}
inventory.runtimeSnapshot.checkedAt = new Date().toISOString();
inventory.runtimeSnapshot.rawCount = whiskies.filter((item) => item.brand === "Laphroaig").length;
inventory.runtimeSnapshot.expressions = whiskies.filter((item) => item.brand === "Laphroaig").map((item) => item.englishName);
await save("scripts/catalog-candidates/laphroaig-inventory.json", inventory);
const next = await read("scripts/catalog-candidates/laphroaig-cairdeas-next-nov9.json");
for (const entry of next.entries) {
  const match = laphroaigCairdeasHistoryWhiskies.find((item) => item.id.includes(entry.name.match(/20\d{2}/)?.[0] ?? "never"));
  if (match) Object.assign(entry, { status: "integrated", runtimeId: match.id });
}
next.status = "listed-candidates-integrated-earlier-releases-remain";
next.remainingScopes[0] = "Cairdeas2008–2018 individual releases;2019–2026 now integrated";
await save("scripts/catalog-candidates/laphroaig-cairdeas-next-nov9.json", next);
console.log(JSON.stringify({ preserved: previous.length, total: whiskies.length, additions: record.results.map((item) => ({id:item.id, scope:item.dailyshot.scope, price:item.price?.average ?? null})) }));
