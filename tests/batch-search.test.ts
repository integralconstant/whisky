import { test } from "node:test";
import assert from "node:assert/strict";
import { whiskies } from "../src/data/whiskies.ts";
import { filterCatalog } from "../src/lib/catalog.ts";
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
const ids = (query: string) =>
  filterCatalog(whiskies, { ...filters, query }, { groupBatches: true }).map(
    (item) => item.id,
  );

test("explicit early batch searches open the requested batch instead of its numeric prefix", () => {
  for (const batch of [1, 2, 3]) {
    for (const query of [
      `글렌알라키 10 CS 배치 ${batch}`,
      `글렌알라키10 배치0${batch}`,
      `GlenAllachie 10 Year Old CS Batch #${batch}`,
      `The GlenAllachie 10 Year Old Cask Strength Batch No.00${batch}`,
    ])
      assert.deepEqual(
        ids(query),
        [`glenallachie-10-cask-strength-batch-${batch}`],
        query,
      );
  }
  assert.deepEqual(ids("글렌알라키 10 CS 배치 99"), []);
  assert.deepEqual(ids("글렌알라키 21 CS 배치 1"), [
    "glenallachie-21-cask-strength-batch-1",
  ]);
});

test("release aliases and leading zeros match the same numbered release", () => {
  for (const query of [
    "하이랜드 파크 CS 릴리즈 1",
    "하이랜드 파크 CS 릴리스 01",
    "Highland Park CS Release No.1",
    "하이랜드 파크 CS 배치 번호 001",
  ])
    assert.deepEqual(
      ids(query),
      ["highland-park-cask-strength-release-1"],
      query,
    );
  assert.deepEqual(ids("Tamdhu Batch Strength No.006"), [
    "tamdhu-batch-strength-006",
  ]);
});

test("ordinary age, Octomore series and coded release searches remain available", () => {
  assert.ok(
    ids("글렌알라키 10").includes("glenallachie-10-cask-strength-batch-13"),
  );
  assert.ok(ids("옥토모어 16").includes("octomore-16-3"));
  assert.deepEqual(ids("옥토모어 16.3"), ["octomore-16-3"]);
  assert.deepEqual(ids("Elijah Craig Barrel Proof C925"), [
    "elijah-craig-barrel-proof-c925",
  ]);
});
