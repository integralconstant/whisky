import { test } from "node:test";
import assert from "node:assert/strict";
import type { Whisky } from "../src/data/types.ts";
import { whiskies } from "../src/data/whiskies.ts";
import {
  enrichWhiskyFlavors,
  getAllWhiskyFlavorTags,
  whiskyFlavorGroups,
} from "../src/data/flavors.ts";

function sample(notes: Partial<Whisky["notes"]>, tags: string[] = []): Whisky {
  return {
    ...whiskies[0],
    tags,
    notes: { nose: "", palate: "", finish: "", ...notes },
  };
}

test("explicit tasting notes gain detailed sweetness, fruit, and texture tags", () => {
  const enriched = enrichWhiskyFlavors(
    sample({
      nose: "풋사과와 배, 캐러멜과 토피, 말린 과일",
      palate: "다크 초콜릿, 아몬드와 크리미한 몰트",
      finish: "오크와 계피, 드라이한 마무리",
    }),
  );

  for (const tag of [
    "사과",
    "배",
    "캐러멜",
    "토피",
    "건과일",
    "초콜릿",
    "견과류",
    "크리미",
    "몰트",
    "오크",
    "계피",
    "드라이",
  ]) {
    assert.ok(enriched.tags.includes(tag), `missing ${tag}`);
  }
  assert.ok(!enriched.tags.includes("스모키"));
  assert.ok(!enriched.tags.includes("피트"));
});

test("fruit, floral, maritime, and spice synonyms are discoverable", () => {
  const enriched = enrichWhiskyFlavors(
    sample({
      nose: "망고, 파인애플, 크랜베리와 자몽, 사과꽃과 장미",
      palate: "구운 아몬드, 후추, 정향, 생강과 육두구, 박하와 바질",
      finish: "바닷바람, 짭짤한 소금과 가죽, 담배와 훈연",
    }),
  );

  for (const tag of [
    "열대과일",
    "베리",
    "시트러스",
    "꽃",
    "견과류",
    "후추",
    "정향",
    "생강",
    "육두구",
    "민트",
    "허브",
    "바다·소금",
    "가죽",
    "담배",
    "스모키",
  ]) {
    assert.ok(enriched.tags.includes(tag), `missing ${tag}`);
  }
  assert.ok(!enriched.tags.includes("사과"), "apple blossom is a floral note");
});

test("original tags retain their order and input objects remain unchanged", () => {
  const item = sample({ nose: "토피, 토피와 바닐라" }, [
    "셰리",
    "바닐라",
    "셰리",
  ]);
  const snapshot = structuredClone(item);
  const enriched = enrichWhiskyFlavors(item);

  assert.deepEqual(enriched.tags, ["셰리", "바닐라", "토피"]);
  assert.deepEqual(item, snapshot);
  assert.deepEqual({ ...enriched, tags: item.tags }, item);
  assert.notEqual(enriched, item);
  assert.notEqual(enriched.tags, item.tags);
  assert.deepEqual(enrichWhiskyFlavors(enriched), enriched);
});

test("product descriptions, original broad tags, and missing notes add no inferred flavors", () => {
  const item = sample({ nose: "균형이 좋고 긴 여운을 남깁니다." }, [
    "셰리",
    "과일",
  ]);
  item.description = "피트와 스모키, 바닐라와 꿀, 건포도와 초콜릿";
  item.name = "바닐라 버번 셰리 피트";
  assert.deepEqual(enrichWhiskyFlavors(item).tags, ["셰리", "과일"]);
  assert.deepEqual(enrichWhiskyFlavors(sample({})).tags, []);
});

test("short words and negated smoke or peat do not create false flavor claims", () => {
  for (const nose of [
    "비피트 원액, 배럴에서 숙성한 풍미",
    "비 피트, 무 피트",
    "피트가 없고 연기 없는 스타일",
    "훈연 향이 전혀 없는 풍미",
    "피트 향이 느껴지지 않는 풍미",
    "unpeated, non-peated, without smoke, no peat",
    "smoke-free, peat is absent",
  ]) {
    const tags = enrichWhiskyFlavors(sample({ nose })).tags;
    assert.ok(!tags.includes("피트"), `unexpected peat: ${nose}`);
    assert.ok(!tags.includes("스모키"), `unexpected smoke: ${nose}`);
    assert.ok(!tags.includes("배"), `unexpected pear: ${nose}`);
  }
  const applewood = enrichWhiskyFlavors(sample({ nose: "사과나무 연기" })).tags;
  assert.ok(applewood.includes("스모키"));
  assert.ok(!applewood.includes("사과"));
});

test("a separate positive mention is retained after an earlier negative mention", () => {
  const enriched = enrichWhiskyFlavors(
    sample({
      nose: "피트가 없는 향",
      palate: "은은한 피트와 스모크",
    }),
  );
  assert.ok(enriched.tags.includes("피트"));
  assert.ok(enriched.tags.includes("스모키"));
});

test("every catalog flavor is included in a unique filter group", () => {
  const allowedTags = getAllWhiskyFlavorTags();
  const allowed = new Set(allowedTags);
  assert.equal(allowed.size, allowedTags.length);
  assert.equal(
    new Set(whiskyFlavorGroups.map((group) => group.id)).size,
    whiskyFlavorGroups.length,
  );
  assert.equal(whiskyFlavorGroups.length, 6);
  assert.ok(allowed.size >= 35);

  for (const item of whiskies) {
    const enriched = enrichWhiskyFlavors(item);
    for (const tag of enriched.tags) {
      assert.ok(allowed.has(tag), `${item.id}: unlisted tag ${tag}`);
    }
    assert.deepEqual(enriched.tags.slice(0, new Set(item.tags).size), [
      ...new Set(item.tags),
    ]);
    assert.equal(enriched.age, item.age);
    assert.equal(enriched.source, item.source);
    assert.deepEqual(enriched.notes, item.notes);
  }
});
