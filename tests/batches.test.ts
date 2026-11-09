import { test } from "node:test";
import assert from "node:assert/strict";
import { whiskies } from "../src/data/whiskies.ts";
import { cocktails } from "../src/data/cocktails.ts";
import { scotchBatchGroups } from "../src/data/scotch-batch-groups.ts";
import {
  collapseScotchBatches,
  getScotchBatchGroup,
  getScotchBatches,
} from "../src/lib/batches.ts";
import { filterCatalog, getWhiskyPrice } from "../src/lib/catalog.ts";
import type { Filters } from "../src/lib/catalog.ts";

const filters: Filters = {
  query: "",
  category: "",
  countries: [],
  tags: [],
  savedOnly: false,
  saved: [],
  sort: "featured",
};
const list = (overrides: Partial<Filters> = {}) =>
  filterCatalog(whiskies, { ...filters, ...overrides }, { groupBatches: true });

test("Scotch families contain real distinct batches of one expression", () => {
  const assigned = new Set<string>();
  for (const group of scotchBatchGroups) {
    assert.ok(group.batches.length > 1);
    assert.ok(group.batches.some(({ id }) => id === group.representativeId));
    const reference = whiskies.find(({ id }) => id === group.representativeId)!;
    for (const batch of group.batches) {
      assert.ok(!assigned.has(batch.id), `Repeated batch: ${batch.id}`);
      assigned.add(batch.id);
      const item = whiskies.find(({ id }) => id === batch.id);
      assert.ok(item, `Missing batch: ${batch.id}`);
      assert.equal(item.country, "스코틀랜드");
      assert.equal(item.brand, reference.brand);
      assert.equal(item.age, reference.age);
      assert.equal(item.category, reference.category);
    }
    assert.equal(
      getScotchBatches(reference, whiskies).length,
      group.batches.length,
    );
  }
});

test("one representative per family appears without merging other products or mutating data", () => {
  const originalIds = whiskies.map(({ id }) => id);
  const cards = list();
  for (const group of scotchBatchGroups) {
    assert.deepEqual(
      cards
        .filter((item) => getScotchBatchGroup(item)?.id === group.id)
        .map(({ id }) => id),
      [group.representativeId],
    );
  }
  for (const id of [
    "laphroaig-10",
    "octomore-16-1",
    "octomore-16-2",
    "elijah-craig-barrel-proof-c925",
    "larceny-barrel-proof-c925",
  ])
    assert.ok(cards.some((item) => item.id === id));
  assert.deepEqual(collapseScotchBatches(cocktails), cocktails);
  assert.deepEqual(
    whiskies.map(({ id }) => id),
    originalIds,
  );
});

test("batch number searches and saved collections retain the matching older batch", () => {
  for (const group of scotchBatchGroups) {
    for (const batch of getScotchBatches(
      whiskies.find(({ id }) => id === group.representativeId)!,
      whiskies,
    )) {
      assert.deepEqual(
        list({ query: batch.item.englishName }).map(({ id }) => id),
        [batch.item.id],
      );
      assert.deepEqual(
        list({ savedOnly: true, saved: [batch.item.id] }).map(({ id }) => id),
        [batch.item.id],
      );
    }
    assert.equal(
      list({ query: group.englishName }).filter(
        (item) => getScotchBatchGroup(item)?.id === group.id,
      ).length,
      1,
    );
    assert.equal(
      list({ savedOnly: true, saved: group.batches.map(({ id }) => id) })
        .length,
      1,
    );
  }
});

test("flavor filters and sorting use the batch whose information is displayed", () => {
  const tagged = list({ tags: ["피트", "스모키"], countries: ["스코틀랜드"] });
  assert.ok(tagged.length > 0);
  assert.ok(
    tagged.every(
      (item) =>
        item.tags.includes("피트") &&
        item.tags.includes("스모키") &&
        item.country === "스코틀랜드",
    ),
  );
  const byAbv = list({ sort: "abv" });
  assert.ok(
    byAbv.every((item, index) => !index || byAbv[index - 1].abv >= item.abv),
  );
  for (const sort of ["price-asc", "price-desc"] as const) {
    const values = list({ sort }).map(getWhiskyPrice);
    const missing = values.indexOf(null);
    if (missing >= 0)
      assert.ok(values.slice(missing).every((value) => value === null));
    const prices = values.filter((value): value is number => value !== null);
    assert.ok(
      prices.every(
        (value, index) =>
          !index ||
          (sort === "price-asc"
            ? prices[index - 1] <= value
            : prices[index - 1] >= value),
      ),
    );
  }
});
