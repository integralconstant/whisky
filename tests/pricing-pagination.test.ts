import { test } from "node:test";
import assert from "node:assert/strict";
import type { Cocktail, DailyshotPrice, Whisky } from "../src/data/types.ts";
import {
  PAGE_SIZES,
  filterCatalog,
  getPaginationPages,
  getWhiskyPrice,
  paginateCatalog,
} from "../src/lib/catalog.ts";
import type { Filters, PageSize } from "../src/lib/catalog.ts";

const defaults: Filters = {
  query: "",
  category: "",
  countries: [],
  tags: [],
  savedOnly: false,
  saved: [],
  sort: "featured",
};

function whisky(id: string, average?: number): Whisky {
  const price: DailyshotPrice | undefined =
    average === undefined
      ? undefined
      : {
          average,
          currency: "KRW",
          volumeMl: 700,
          sampleCount: 1,
          min: average,
          max: average,
          checkedAt: "2026-09-12",
          sourceUrl: "https://dailyshot.co/",
          offers: [
            { price: average, url: "https://dailyshot.co/", seller: "Fixture" },
          ],
        };
  return {
    id,
    name: id,
    englishName: id,
    brand: "Fixture",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "하이랜드",
    abv: 40,
    age: 12,
    tags: ["과일"],
    description: "Test catalogue entry",
    notes: { nose: "Fruit", palate: "Malt", finish: "Oak" },
    image: "",
    color: "#b57839",
    source: "https://example.com/",
    dailyshotPrice: price,
  };
}

const cocktail: Cocktail = {
  id: "cocktail",
  name: "Cocktail",
  englishName: "Cocktail",
  category: "Classic",
  base: "Whisky",
  tags: [],
  description: "A test recipe",
  ingredients: [{ name: "Whisky", amount: "45 ml" }],
  steps: ["Stir"],
  glass: "Rocks",
  difficulty: "쉬움",
  time: 3,
  image: "",
  color: "#b57839",
  source: "https://example.com/",
};

test("price accessor returns only finite positive whisky averages", () => {
  assert.equal(getWhiskyPrice(whisky("priced", 73500)), 73500);
  for (const average of [undefined, 0, -1, NaN, Infinity, -Infinity]) {
    assert.equal(getWhiskyPrice(whisky("unpriced", average)), null);
  }
  assert.equal(getWhiskyPrice(cocktail), null);
});

test("both price sorts put invalid prices last and preserve tie order", () => {
  const catalog = [
    whisky("missing"),
    whisky("high", 95000),
    whisky("zero", 0),
    whisky("low-first", 45000),
    whisky("nan", NaN),
    whisky("low-second", 45000),
    whisky("negative", -1),
    whisky("infinite", Infinity),
  ];
  const original = structuredClone(catalog);
  Object.freeze(catalog);
  const unknownIds = ["missing", "zero", "nan", "negative", "infinite"];
  assert.deepEqual(
    filterCatalog(catalog, { ...defaults, sort: "price-asc" }).map(
      ({ id }) => id,
    ),
    ["low-first", "low-second", "high", ...unknownIds],
  );
  assert.deepEqual(
    filterCatalog(catalog, { ...defaults, sort: "price-desc" }).map(
      ({ id }) => id,
    ),
    ["high", "low-first", "low-second", ...unknownIds],
  );
  assert.deepEqual(catalog, original);
  assert.deepEqual(
    filterCatalog([cocktail, whisky("priced", 20000)], {
      ...defaults,
      sort: "price-desc",
    }).map(({ id }) => id),
    ["priced", "cocktail"],
  );
});

test("price sorting still applies all catalogue filters", () => {
  const catalog = [
    whisky("selected-high", 95000),
    whisky("other", 20000),
    whisky("selected-low", 45000),
  ];
  assert.deepEqual(
    filterCatalog(catalog, {
      ...defaults,
      query: "selected",
      category: "싱글 몰트",
      countries: ["스코틀랜드"],
      tags: ["과일"],
      savedOnly: true,
      saved: ["selected-high", "selected-low"],
      sort: "price-asc",
    }).map(({ id }) => id),
    ["selected-low", "selected-high"],
  );
});

test("all page sizes paginate 400 entries without gaps, duplicates, or mutation", () => {
  assert.deepEqual(PAGE_SIZES, [10, 25, 50]);
  const records = Array.from({ length: 400 }, (_, index) => ({
    id: index + 1,
  }));
  const original = structuredClone(records);
  Object.freeze(records);
  for (const pageSize of PAGE_SIZES) {
    const seen: typeof records = [];
    const totalPages = 400 / pageSize;
    for (let page = 1; page <= totalPages; page++) {
      const result = paginateCatalog(records, page, pageSize);
      assert.equal(result.page, page);
      assert.equal(result.pageSize, pageSize);
      assert.equal(result.totalPages, totalPages);
      assert.equal(result.totalItems, 400);
      assert.equal(result.start, (page - 1) * pageSize + 1);
      assert.equal(result.end, page * pageSize);
      assert.equal(result.items.length, pageSize);
      seen.push(...result.items);
    }
    assert.deepEqual(seen, original);
  }
  assert.deepEqual(records, original);
});

test("partial final page reports inclusive item positions and an independent slice", () => {
  const records = Array.from({ length: 403 }, (_, index) => index + 1);
  for (const pageSize of PAGE_SIZES) {
    const result = paginateCatalog(records, 999, pageSize);
    assert.deepEqual(result.items, [401, 402, 403]);
    assert.equal(result.start, 401);
    assert.equal(result.end, 403);
    assert.equal(result.page, Math.ceil(403 / pageSize));
    result.items.pop();
    assert.equal(records.length, 403);
  }
});

test("pages are normalized and clamped; runtime-invalid sizes default to 10", () => {
  const records = Array.from({ length: 35 }, (_, index) => index);
  for (const page of [-Infinity, -5, 0, NaN]) {
    assert.equal(paginateCatalog(records, page, 10).page, 1);
  }
  for (const page of [5, 999, Infinity]) {
    assert.equal(paginateCatalog(records, page, 10).page, 4);
  }
  assert.equal(paginateCatalog(records, 2.9, 10).page, 2);
  for (const invalidSize of [0, -10, 15, NaN, Infinity, undefined, "25"]) {
    const result = paginateCatalog(records, 2, invalidSize as PageSize);
    assert.equal(result.pageSize, 10);
    assert.equal(result.totalPages, 4);
    assert.deepEqual(result.items, records.slice(10, 20));
  }
});

test("empty results expose page one with no item range", () => {
  for (const pageSize of PAGE_SIZES) {
    assert.deepEqual(paginateCatalog([], 99, pageSize), {
      items: [],
      page: 1,
      pageSize,
      totalPages: 1,
      totalItems: 0,
      start: 0,
      end: 0,
    });
  }
});

test("pagination buttons include boundaries, neighbors and unambiguous gaps", () => {
  assert.deepEqual(getPaginationPages(1, 1), [1]);
  assert.deepEqual(getPaginationPages(2, 4), [1, 2, 3, 4]);
  assert.deepEqual(getPaginationPages(1, 40), [1, 2, "ellipsis", 40]);
  assert.deepEqual(getPaginationPages(20, 40), [
    1,
    "ellipsis",
    19,
    20,
    21,
    "ellipsis",
    40,
  ]);
  assert.deepEqual(getPaginationPages(40, 40), [1, "ellipsis", 39, 40]);
  assert.deepEqual(getPaginationPages(4, 8), [1, 2, 3, 4, 5, "ellipsis", 8]);
  assert.deepEqual(getPaginationPages(-3, 40), getPaginationPages(1, 40));
  assert.deepEqual(getPaginationPages(99, 40), getPaginationPages(40, 40));
  for (const totalPages of [0, -1, NaN, Infinity]) {
    assert.deepEqual(getPaginationPages(10, totalPages), [1]);
  }
  for (let totalPages = 1; totalPages <= 40; totalPages++) {
    for (let page = 1; page <= totalPages; page++) {
      const buttons = getPaginationPages(page, totalPages);
      const numbers = buttons.filter(
        (button): button is number => typeof button === "number",
      );
      assert.equal(numbers.length, new Set(numbers).size);
      assert.equal(numbers[0], 1);
      assert.equal(numbers.at(-1), totalPages);
      assert.ok(numbers.includes(page));
      assert.ok(
        numbers.every(
          (value, index) => index === 0 || value > numbers[index - 1],
        ),
      );
      assert.ok(
        buttons.every(
          (value, index) =>
            value !== "ellipsis" ||
            (index > 0 &&
              index < buttons.length - 1 &&
              typeof buttons[index - 1] === "number" &&
              typeof buttons[index + 1] === "number"),
        ),
      );
    }
  }
});
