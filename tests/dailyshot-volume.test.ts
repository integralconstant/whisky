import { test } from "node:test";
import assert from "node:assert/strict";
import { catalogVolumeMatches } from "../scripts/dailyshot-matching.mjs";

test("explicit catalog bottle volumes cannot inherit another market size's price", () => {
  assert.equal(catalogVolumeMatches({ name: "라프로익 로어 750ml", englishName: "Laphroaig Lore 750ml" }, 700), false);
  assert.equal(catalogVolumeMatches({ name: "라프로익 로어 750ml", englishName: "Laphroaig Lore 750ml" }, 750), true);
  assert.equal(catalogVolumeMatches({ name: "쿼터 캐스크 1L", englishName: "Quarter Cask 100cl" }, 1000), true);
  assert.equal(catalogVolumeMatches({ name: "쿼터 캐스크 1L", englishName: "Quarter Cask 100cl" }, 700), false);
  assert.equal(catalogVolumeMatches({ name: "로어 750ml", englishName: "Lore 700ml" }, 750), false);
  assert.equal(catalogVolumeMatches({ name: "로어", englishName: "Lore" }, 700), true);
});
