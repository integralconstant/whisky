import { test } from "node:test";
import assert from "node:assert/strict";
import { whiskies } from "../src/data/whiskies.ts";
import { cocktails } from "../src/data/cocktails.ts";
import { csScotchWhiskies } from "../src/data/whiskies-cs-scotch.ts";
import { csAmericaWhiskies } from "../src/data/whiskies-cs-america.ts";
import { csWorldWhiskies } from "../src/data/whiskies-cs-world.ts";
import {
  CASK_STRENGTH_TAG,
  filterCatalog,
  formatWhiskyAbv,
  getCatalogTags,
} from "../src/lib/catalog.ts";
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
const ids = (entries: { id: string }[]) => entries.map(({ id }) => id).sort();

test("CS additions retain separate identities from regular-strength expressions", () => {
  const added = [...csScotchWhiskies, ...csAmericaWhiskies, ...csWorldWhiskies];
  assert.ok(added.length >= 20);
  assert.ok(added.every((item) => item.caskStrength === true));
  for (const id of ["redbreast-12", "laphroaig-10", "makers-mark"])
    assert.ok(
      whiskies.some((item) => item.id === id && !item.caskStrength),
      id,
    );
  const expected = ids(whiskies.filter((item) => item.caskStrength));
  for (const query of [
    "CS",
    "cs",
    "Cask Strength",
    "cask-strength",
    "캐스크 스트렝스",
    "캐스크스트랭스",
    "Barrel Proof",
    "barrel-strength",
    "배럴 프루프",
  ])
    assert.deepEqual(
      ids(filterCatalog(whiskies, { ...filters, query })),
      expected,
      query,
    );
});

test("CS searches and tags combine with product names, flavor, country and collection", () => {
  for (const query of ["라프로익 CS", "CS 라프로익", "라프로익 (CS)"])
    assert.deepEqual(
      ids(
        filterCatalog(whiskies, { ...filters, query }, { groupBatches: true }),
      ),
      [
        "laphroaig-10-cask-strength-batch-17",
        "laphroaig-25-cask-strength-2008",
        "laphroaig-25-cask-strength-2009",
        "laphroaig-25-cask-strength-2011",
        "laphroaig-25-cask-strength-2013",
        "laphroaig-25-cask-strength-2014",
        "laphroaig-25-cask-strength-2015",
        "laphroaig-25-cask-strength-2016",
        "laphroaig-25-cask-strength-2017",
        "laphroaig-25-cask-strength-2018",
        "laphroaig-25-cask-strength-2019",
        "laphroaig-25-cask-strength-2020",
        "laphroaig-25-cask-strength-2021",
        "laphroaig-25-cask-strength-2022",
        "laphroaig-25-cask-strength-2023",
        "laphroaig-25-cask-strength-us-2008",
        "laphroaig-27-2017",
        "laphroaig-27-2017-us",
        "laphroaig-28-2018",
        "laphroaig-28-2018-us",
        "laphroaig-30-2016",
        "laphroaig-30-fol-anniversary-2024",
        "laphroaig-32-2015",
        "laphroaig-32-2015-us",
        "laphroaig-archive-36",
        "laphroaig-cairdeas-2008",
        "laphroaig-cairdeas-2009-12",
        "laphroaig-cairdeas-2011-ileach",
        "laphroaig-cairdeas-2017-quarter-cask",
        "laphroaig-cairdeas-2019-triple-wood",
        "laphroaig-cairdeas-2021-px",
        "laphroaig-cairdeas-2025-lore-cask-strength",
        "laphroaig-cairdeas-2026-french-oak",
        "laphroaig-elements-l2-0",
        "laphroaig-elements-l3-0",
        "laphroaig-ian-hunter-book-1",
        "laphroaig-ian-hunter-book-3",
        "laphroaig-ian-hunter-book-3-750",
        "laphroaig-islay-ember-2014",
        "laphroaig-je-2015-10-refill",
      ],
    );
  const expected = whiskies.filter(
    (item) =>
      item.caskStrength &&
      item.country === "스코틀랜드" &&
      item.tags.includes("피트"),
  );
  assert.ok(expected.length > 0);
  const tagged = {
    ...filters,
    tags: [CASK_STRENGTH_TAG, "피트"],
    countries: ["스코틀랜드"],
  };
  assert.deepEqual(ids(filterCatalog(whiskies, tagged)), ids(expected));
  assert.deepEqual(
    ids(
      filterCatalog(whiskies, {
        ...tagged,
        savedOnly: true,
        saved: [expected[0].id],
      }),
    ),
    [expected[0].id],
  );
  assert.equal(
    filterCatalog(cocktails, { ...filters, tags: [CASK_STRENGTH_TAG] }).length,
    0,
  );
  assert.deepEqual(getCatalogTags(cocktails[0]), cocktails[0].tags);
});

test("high proof alone never implies cask strength", () => {
  for (const id of [
    "weller-full-proof",
    "kilchoman-batch-strength",
    "octomore-16-1",
  ]) {
    const item = whiskies.find((entry) => entry.id === id)!;
    assert.ok(item.abv > 50);
    assert.ok(!getCatalogTags(item).includes(CASK_STRENGTH_TAG));
  }
  for (const id of [
    "arran-quarter-cask-bothy",
    "arran-sherry-bodega",
    "teeling-blackpitts-cask-strength",
    "glen-scotia-victoriana",
  ])
    assert.ok(
      getCatalogTags(whiskies.find((entry) => entry.id === id)!).includes(
        CASK_STRENGTH_TAG,
      ),
    );
});

test("full CS product names and aliases in the middle remain searchable", () => {
  for (const item of whiskies.filter((entry) => entry.caskStrength)) {
    for (const query of [item.name, item.englishName]) {
      assert.ok(
        filterCatalog(whiskies, { ...filters, query }).some(
          (result) => result.id === item.id,
        ),
        `${query} must find ${item.id}`,
      );
    }
  }
  for (const [query, id] of [
    ["Elijah Craig CS C925", "elijah-craig-barrel-proof-c925"],
    [
      "Jack Daniel's Single Barrel CS Rye",
      "jack-daniels-single-barrel-barrel-proof-rye",
    ],
  ]) {
    assert.deepEqual(ids(filterCatalog(whiskies, { ...filters, query })), [id]);
  }
});

test("variable ABV is shown as a range and sorted by its documented minimum", () => {
  const ranged = whiskies.filter((item) => item.abvRange);
  assert.ok(ranged.length >= 3);
  for (const item of ranged) {
    const [min, max] = item.abvRange!;
    assert.ok(min > 0 && min < max && max < 100);
    assert.equal(item.abv, min);
    assert.ok(item.abvNote?.includes("하한"));
    assert.equal(formatWhiskyAbv(item), `${min}–${max}%`);
  }
  const regular = whiskies.find((item) => item.id === "glenfiddich-12")!;
  assert.equal(formatWhiskyAbv(regular), "40%");
  const sorted = filterCatalog(whiskies, {
    ...filters,
    query: "CS",
    sort: "abv",
  });
  assert.ok(
    sorted.every(
      (item, index) => index === 0 || sorted[index - 1].abv >= item.abv,
    ),
  );
});
