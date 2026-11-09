import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { whiskyImages } from "../src/data/whisky-images.ts";
import { laphroaigCairdeasOriginWhiskies } from "../src/data/whiskies-laphroaig-cairdeas-origin.ts";
import { laphroaigCairdeasFirstWhiskies } from "../src/data/whiskies-laphroaig-cairdeas-first.ts";
const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const save = (file, data) => writeFile(file, JSON.stringify(data, null, 2) + "\n");
const previous = await read(".cache/catalog-before-cairdeas-2012-2015.json");
const current = new Map(whiskies.map((item) => [item.id, item]));
for (const item of previous) assert.deepEqual(current.get(item.id), item, `Existing item changed: ${item.id}`);
const candidates = [...laphroaigCairdeasOriginWhiskies, ...laphroaigCairdeasFirstWhiskies];
for (const [group, entries] of [["origin", laphroaigCairdeasOriginWhiskies], ["first", laphroaigCairdeasFirstWhiskies]]) {
  const file = `scripts/catalog-candidates/laphroaig-cairdeas-${group}-integration.json`;
  const record = await read(file);
  record.status = "integrated-verified";
  record.currentCount = whiskies.length;
  record.existingEntriesPreserved = previous.length;
  record.results = [];
  for (const entry of entries) {
    const item = current.get(entry.id);
    assert.ok(item && whiskyImages[item.id]);
    assert.ok(item.dailyshotProduct);
    if (item.dailyshotPrice) assert.equal(item.dailyshotProduct.scope, "exact-product");
    record.results.push({id:item.id, photo:whiskyImages[item.id].path, dailyshot:item.dailyshotProduct, price:item.dailyshotPrice ?? null});
  }
  await save(file, record);
}
const inventory = await read("scripts/catalog-candidates/laphroaig-inventory.json");
for (const entry of inventory.entries) {
  const id = {"Triple Wood":"laphroaig-triple-wood", "Elements 1.0":"laphroaig-elements-l1-0", "Elements 2.0":"laphroaig-elements-l2-0", "Elements 3.0":"laphroaig-elements-l3-0"}[entry.name];
  if (id && current.has(id)) Object.assign(entry,{status:"integrated",runtimeId:id});
}
for (const item of candidates) {
  const year = Number(item.id.match(/20\d{2}/)[0]);
  let entry = inventory.entries.find((row) => row.family === "cairdeas" && row.releaseYear === year);
  if (!entry) { entry={name:item.englishName,family:"cairdeas",releaseYear:year};inventory.entries.push(entry); }
  Object.assign(entry, {status:"integrated", runtimeId:item.id, abv:item.abv, sources:[item.source], integrationRecord: year < 2012 ? "laphroaig-cairdeas-first-integration.json" : "laphroaig-cairdeas-origin-integration.json"});
}
inventory.runtimeSnapshot.checkedAt = new Date().toISOString();
inventory.lastCatalogAudit = "2026-11-09";
inventory.runtimeSnapshot.rawCount = whiskies.filter((item) => item.brand === "Laphroaig").length;
inventory.runtimeSnapshot.expressions = whiskies.filter((item) => item.brand === "Laphroaig").map((item) => item.englishName);
await save("scripts/catalog-candidates/laphroaig-inventory.json", inventory);
const research = await read("scripts/catalog-candidates/laphroaig-cairdeas-next-early.json");
research.status="listed-candidates-integrated";
for (const entry of research.entries) entry.status="integrated";
research.remaining="Cairdeas historical variants outside the registered annual2008–2026 representatives; annual25-yearCS, rare ages, IanHunter, StrongCharacters, Archive, Wall, singlecasks and explicit independent bottlings. No claim of distillery completeness.";
await save("scripts/catalog-candidates/laphroaig-cairdeas-next-early.json", research);
for (const year of Array.from({length:19},(_,index)=>2008+index)) assert.ok(whiskies.some((item)=>item.id.includes(`cairdeas-${year}`)),`Missing annual representative ${year}`);
console.log(JSON.stringify({preserved:previous.length,total:whiskies.length,added:candidates.map((item)=>item.id),annualRepresentatives:"2008–2026"}));
