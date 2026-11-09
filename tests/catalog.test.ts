import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { cocktails } from "../src/data/cocktails.ts";
import {
  filterCatalog,
  normalize,
  readSaved,
  scaleAmount,
} from "../src/lib/catalog.ts";
import type { Filters } from "../src/lib/catalog.ts";
import type { Whisky } from "../src/data/types.ts";

const defaults: Filters = {
  query: "",
  category: "",
  countries: [],
  tags: [],
  savedOnly: false,
  saved: [],
  sort: "featured",
};

test("search matches Korean, English, distillery, and spacing variants", () => {
  for (const query of ["글렌피딕12", "GLENFIDDICH 12", "glenfiddich-12"]) {
    assert.equal(
      filterCatalog(whiskies, { ...defaults, query })[0]?.id,
      "glenfiddich-12",
    );
  }
  assert.ok(
    filterCatalog(whiskies, { ...defaults, query: "아일라" }).length > 0,
  );
  assert.equal(normalize("Maker’s MARK"), normalize("maker's mark"));
});

test("cocktails are searchable by ingredients", () => {
  const result = filterCatalog(cocktails, { ...defaults, query: "캄파리" });
  assert.ok(result.some((item) => item.id === "negroni"));
  assert.ok(result.some((item) => item.id === "boulevardier"));
  assert.ok(
    result.every((item) =>
      item.ingredients.some((ingredient) => ingredient.name.includes("캄파리")),
    ),
  );
});

test("all selected flavor tags must match", () => {
  const result = filterCatalog(whiskies, {
    ...defaults,
    tags: ["피트", "스모키"],
  });
  assert.ok(result.length > 0);
  assert.ok(
    result.every(
      (item) => item.tags.includes("피트") && item.tags.includes("스모키"),
    ),
  );
  assert.equal(
    filterCatalog(whiskies, { ...defaults, tags: ["존재하지않는태그"] }).length,
    0,
  );
});

test("category and country filters combine with tags", () => {
  const result = filterCatalog(whiskies, {
    ...defaults,
    category: "싱글 몰트",
    countries: ["스코틀랜드"],
    tags: ["과일"],
  });
  assert.ok(result.length > 0);
  assert.ok(
    result.every(
      (item) =>
        item.category === "싱글 몰트" &&
        item.country === "스코틀랜드" &&
        item.tags.includes("과일"),
    ),
  );
  const gin = filterCatalog(cocktails, { ...defaults, category: "진" });
  assert.equal(gin.length, 2);
  assert.ok(gin.every((item) => item.base === "진"));
});

test("multiple countries are OR, saved items intersect other filters", () => {
  const selected = filterCatalog(whiskies, {
    ...defaults,
    countries: ["미국", "일본"],
  });
  assert.ok(selected.length > 0);
  assert.ok(selected.every((item) => ["미국", "일본"].includes(item.country)));
  const saved = ["glenfiddich-12", "old-fashioned"];
  assert.deepEqual(
    filterCatalog(whiskies, { ...defaults, savedOnly: true, saved }).map(
      (item) => item.id,
    ),
    ["glenfiddich-12"],
  );
  assert.deepEqual(
    filterCatalog(cocktails, { ...defaults, savedOnly: true, saved }).map(
      (item) => item.id,
    ),
    ["old-fashioned"],
  );
  assert.equal(
    filterCatalog(whiskies, { ...defaults, savedOnly: true, saved: [] }).length,
    0,
  );
});

test("sorts by ABV or recipe time without mutating the source catalog", () => {
  const ids = whiskies.map((item) => item.id);
  const strongest = filterCatalog(whiskies, { ...defaults, sort: "abv" });
  assert.ok(
    strongest.every(
      (item, index) => index === 0 || strongest[index - 1].abv >= item.abv,
    ),
  );
  const quickest = filterCatalog(cocktails, { ...defaults, sort: "time" });
  assert.ok(
    quickest.every(
      (item, index) => index === 0 || quickest[index - 1].time <= item.time,
    ),
  );
  assert.deepEqual(
    whiskies.map((item) => item.id),
    ids,
  );
  assert.deepEqual(
    filterCatalog(whiskies, defaults)
      .slice(0, 6)
      .map((item) => item.id),
    ids.slice(0, 6),
  );
  assert.deepEqual(filterCatalog([], defaults), []);
});

test("corrupted or invalid bookmark storage never breaks startup", () => {
  for (const input of [null, "{bad", "null", "{}", "42", "true"])
    assert.deepEqual(readSaved(input), []);
  assert.deepEqual(readSaved('["a","a",null,42,"b"]'), ["a", "b"]);
});

test("recipe scaling covers decimal measures, ranges, garnish and alternatives", () => {
  assert.equal(scaleAmount("45 ml", 2), "90 ml");
  assert.equal(scaleAmount("7.5 ml", 3), "22.5 ml");
  assert.equal(scaleAmount("2–3 대시", 2), "4–6 대시");
  assert.equal(scaleAmount("4줄기 + 장식용 1줄기", 2), "8줄기 + 장식용 2줄기");
  assert.equal(scaleAmount("1샷 (약 30 ml)", 2), "2샷 (약 60 ml)");
  assert.equal(scaleAmount("반 조각", 2), "1조각");
  assert.equal(scaleAmount("잔을 채울 만큼", 2), "잔을 채울 만큼");
});

test("every prepared regional whisky group is included in the public catalog", async () => {
  const dataDirectory = new URL("../src/data/", import.meta.url);
  const groupFiles = (await readdir(dataDirectory)).filter((name) =>
    /^whiskies-.+\.ts$/.test(name),
  );
  const catalogById = new Map(whiskies.map((item) => [item.id, item]));
  assert.ok(groupFiles.length > 0);

  for (const filename of groupFiles) {
    const module: Record<string, unknown> = await import(
      new URL(filename, dataDirectory).href
    );
    const groups = Object.values(module).filter((value): value is Whisky[] =>
      Array.isArray(value),
    );
    assert.ok(groups.length > 0, `${filename} must export a whisky group`);
    for (const item of groups.flat()) {
      const actual = catalogById.get(item.id);
      assert.ok(
        actual,
        `${filename}: ${item.id} is missing from the public catalog`,
      );
      assert.deepEqual(
        {
          ...actual,
          tags: item.tags,
          dailyshotPrice: undefined,
          dailyshotProduct: undefined,
        },
        { ...item, dailyshotPrice: undefined, dailyshotProduct: undefined },
        `${filename}: ${item.id} is missing or differs from the public catalog`,
      );
      assert.ok(
        item.tags.every((tag) => actual.tags.includes(tag)),
        `${item.id}: original flavor tags were lost`,
      );
    }
  }
});

test("Canadian and Taiwanese whiskies can be found and filtered by country", () => {
  for (const [country, id, query] of [
    ["캐나다", "crown-royal-deluxe", "Crown Royal Fine De Luxe"],
    ["대만", "kavalan-classic", "카발란 클래식"],
  ]) {
    const matches = filterCatalog(whiskies, {
      ...defaults,
      query,
      countries: [country],
    });
    assert.deepEqual(
      matches.map((item) => item.id),
      [id],
    );
    assert.equal(
      filterCatalog(whiskies, {
        ...defaults,
        query,
        countries: ["스코틀랜드"],
      }).length,
      0,
    );
  }
});

test("original Irish and Japanese whiskies remain discoverable by production type", () => {
  for (const [id, query, country, category] of [
    ["jameson-original", "Jameson Irish Whiskey", "아일랜드", "블렌디드"],
    ["redbreast-12", "Redbreast 12 Year Old", "아일랜드", "싱글 팟 스틸"],
    ["yamazaki-12", "Yamazaki 12 Years Old", "일본", "싱글 몰트"],
    ["hakushu-12", "Hakushu 12 Years Old", "일본", "싱글 몰트"],
    ["hibiki-harmony", "Hibiki Japanese Harmony", "일본", "블렌디드"],
    ["suntory-toki", "Suntory Whisky Toki", "일본", "블렌디드"],
  ]) {
    const matches = filterCatalog(whiskies, {
      ...defaults,
      query,
      countries: [country],
      category,
    });
    assert.ok(
      matches.some((item) => item.id === id),
      `${query} must be searchable with its country and production type`,
    );
    assert.ok(
      matches.every(
        (item) => item.country === country && item.category === category,
      ),
    );
  }
});

test("catalog entries have unique IDs, official sources and complete details", () => {
  const allItems = [...whiskies, ...cocktails];
  assert.equal(new Set(allItems.map((item) => item.id)).size, allItems.length);
  for (const item of allItems) {
    assert.ok(
      item.name && item.englishName && item.tags.length && item.description,
    );
    assert.equal(new URL(item.source).protocol, "https:");
  }
  for (const item of whiskies) {
    assert.ok(item.abv > 0 && item.abv < 100);
    assert.ok(item.notes.nose && item.notes.palate && item.notes.finish);
  }
  for (const item of cocktails)
    assert.ok(item.ingredients.length > 1 && item.steps.length > 1);
});
