import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { whiskyImages } from "../src/data/whisky-images.ts";
const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const save = (file, value) => writeFile(file, JSON.stringify(value, null, 2) + "\n");
const before = await read(".cache/catalog-before-laphroaig-nov9.json");
const current = new Map(whiskies.map((item) => [item.id, item]));
for (const item of before) assert.deepEqual(current.get(item.id), item, `Existing entry changed: ${item.id}`);
const fresh = whiskies.filter((item) => !before.some((old) => old.id === item.id));
assert.ok(fresh.length >= 5);
for (const item of fresh) {
  if (["laphroaig-1815-legacy-edition", "laphroaig-port-wood", "laphroaig-15-2026-relaunch", "laphroaig-elements-l1-0", "laphroaig-elements-l2-0"].includes(item.id)) {
    assert.ok(item.dailyshotPrice?.sampleCount > 0, item.id);
    assert.equal(item.dailyshotProduct?.scope, "exact-product", item.id);
  } else if (item.dailyshotPrice) assert.equal(item.dailyshotProduct?.scope, "exact-product", item.id);
  assert.ok(whiskyImages[item.id], item.id);
}
const integration = await read("scripts/catalog-candidates/laphroaig-nov9-integration.json");
integration.status = "integrated-price-and-photo-verified";
integration.currentCount = whiskies.length;
integration.existingEntriesPreserved = before.length;
integration.priceAndPhotoResults = fresh.map((item) => ({ id: item.id, name: item.name, abv: item.abv, volumeMl: item.dailyshotPrice?.volumeMl ?? 700, average: item.dailyshotPrice?.average ?? null, sampleCount: item.dailyshotPrice?.sampleCount ?? 0, checkedAt: item.dailyshotPrice?.checkedAt ?? whiskyImages[item.id].checkedAt, sourceUrl: item.dailyshotPrice?.sourceUrl ?? item.source, photoPath: whiskyImages[item.id].path }));
await save("scripts/catalog-candidates/laphroaig-nov9-integration.json", integration);
const elements = await read("scripts/catalog-candidates/laphroaig-elements-nov9.json");
elements.status = "integrated-price-and-photo-verified";
elements.caskStrength = "L2.0 official front label explicitly states CASK STRENGTH. L1.0 has no CS flag pending explicit confirmation.";
elements.entries.find((entry) => entry.id.endsWith("l2-0")).caskStrength = true;
await save("scripts/catalog-candidates/laphroaig-elements-nov9.json", elements);
const inventory = await read("scripts/catalog-candidates/laphroaig-inventory.json");
const releaseIds = {
  "Cairdeas 2024 Cask Favourites": "laphroaig-cairdeas-2024-cask-favourites",
  "Cairdeas 2025 Lore Cask Strength": "laphroaig-cairdeas-2025-lore-cask-strength",
  "Cairdeas 2026 French Oak": "laphroaig-cairdeas-2026-french-oak",
};
for (const entry of inventory.entries) {
  const id = entry.name === "1815" ? "laphroaig-1815-legacy-edition" : entry.name === "Port Wood Casks" ? "laphroaig-port-wood" : entry.name === "15 Year Old current relaunch" ? "laphroaig-15-2026-relaunch" : entry.name === "18 Year Old current relaunch" ? "laphroaig-18-2024-relaunch" : null;
  if (id) Object.assign(entry, { status: "integrated", runtimeId: id, integrationRecord: "laphroaig-nov9-integration.json" });
  if (releaseIds[entry.name]) Object.assign(entry, { status: "integrated", runtimeId: releaseIds[entry.name], integrationRecord: "laphroaig-new-releases-nov9.json" });
}
inventory.runtimeSnapshot = { checkedAt: new Date().toISOString(), rawCount: whiskies.filter((item) => item.brand === "Laphroaig").length, expressions: whiskies.filter((item) => item.brand === "Laphroaig").map((item) => item.englishName), note: "Includes November 9 additions. Register all identifiable expressions with real photographs, including products absent from Dailyshot; show Dailyshot prices only when verified. Inventory remains in progress." };
await save("scripts/catalog-candidates/laphroaig-inventory.json", inventory);
for (const file of ["scripts/catalog-candidates/laphroaig-18-integration.json", "scripts/catalog-candidates/laphroaig-new-releases-nov9.json"]) {
  const record = await read(file);
  record.status = "integrated-photo-verified";
  record.priceStatus = "No exact Dailyshot match verified; no price fabricated. Search link supplied.";
  await save(file, record);
}
console.log(JSON.stringify({ preserved: before.length, current: whiskies.length, priced: whiskies.filter((item) => item.dailyshotPrice).length, additions: integration.priceAndPhotoResults }, null, 2));
