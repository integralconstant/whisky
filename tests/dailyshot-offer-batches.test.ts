import { test } from "node:test";
import assert from "node:assert/strict";
import {
  offerBatchMatches,
  declaredReleaseYears,
  approvedReleaseMatches,
} from "../scripts/dailyshot-matching.mjs";

test("numbered releases reject other seller batches, including zero-padded and mixed labels", () => {
  const item = { id: "glenallachie-10-cask-strength-batch-12" };
  for (const offer of [
    { name: "글렌알라키 10년 CS 배치 12" },
    { name: "GlenAllachie Batch No. 012", name_tag: "700ml" },
    { name: "글렌알라키 10년 CS", name_tag: "12번 배치" },
    { name: "글렌알라키 10년 CS", name_tag: "랜덤 커버" },
    { name: "글렌알라키 10년 CS" },
  ])
    assert.equal(offerBatchMatches(item, offer), true, JSON.stringify(offer));
  for (const offer of [
    { name: "글렌알라키 배치 13" },
    { name: "글렌알라키 배치 12", name_tag: "배치 13" },
    { name: "글렌알라키 배치 12", name_tag: "최신배치CS11" },
    { name: "글렌알라키 Batch #11" },
    { name: "글렌알라키 배치 12/13" },
    { name: "글렌알라키", name_tag: "11번 배치" },
    { name: "글렌알라키 배치 랜덤 발송" },
    { name: "글렌알라키", name_tag: "랜덤 배치" },
  ])
    assert.equal(offerBatchMatches(item, offer), false, JSON.stringify(offer));
  assert.equal(
    offerBatchMatches(
      { id: "tamdhu-batch-strength-006" },
      { name: "Tamdhu Batch Strength 008" },
    ),
    false,
  );
  assert.equal(
    offerBatchMatches(
      { id: "tamdhu-batch-strength-006" },
      { name: "탐두 배치 6" },
    ),
    true,
  );
});

test("Octomore releases retain both the series number and expression suffix", () => {
  const item = { id: "octomore-17-3" };
  for (const offer of [
    { name: "옥토모어 17.3", name_tag: "61.3% 700ml" },
    { name: "Octomore 17.3" },
    { name: "옥토모어", name_tag: "17.3 배치" },
  ])
    assert.equal(offerBatchMatches(item, offer), true);
  for (const offer of [
    { name: "옥토모어 16.3" },
    { name: "Octomore 17.1" },
    { name: "옥토모어 17.3", name_tag: "16.3" },
    { name: "옥토모어", name_tag: "17.3 / 16.3" },
  ])
    assert.equal(offerBatchMatches(item, offer), false);
});

test("numbered releases use the same protection as numbered batches", () => {
  const item = { id: "highland-park-cask-strength-release-4" };
  assert.equal(
    offerBatchMatches(item, {
      name: "Highland Park Cask Strength Release No. 4",
    }),
    true,
  );
  assert.equal(
    offerBatchMatches(item, { name: "하이랜드 파크 CS", name_tag: "릴리스 3" }),
    false,
  );
  assert.equal(
    offerBatchMatches(item, { name: "Highland Park Release 3" }),
    false,
  );
  assert.equal(
    offerBatchMatches(item, { name: "하이랜드 파크 릴리즈 2" }),
    false,
  );
  for (const name_tag of [
    "릴리즈 랜덤",
    "랜덤 릴리즈",
    "릴리스 랜덤",
    "Release random",
  ])
    assert.equal(
      offerBatchMatches(item, {
        name: "하이랜드 파크 CS 릴리즈 No.4",
        name_tag,
      }),
      false,
      name_tag,
    );
});

test("coded releases reject conflicting seller tags even when the parent name agrees", () => {
  const stagg = { id: "stagg-24c" };
  assert.equal(
    offerBatchMatches(stagg, { name: "스태그 24C", name_tag: "25A" }),
    false,
  );
  assert.equal(offerBatchMatches(stagg, { name: "Stagg 25B" }), false);
  assert.equal(offerBatchMatches(stagg, { name: "스태그 24c" }), true);
  assert.equal(
    offerBatchMatches(stagg, { name: "스태그", name_tag: "Batch random" }),
    false,
  );
  const elijah = { id: "elijah-craig-barrel-proof-c925" };
  assert.equal(offerBatchMatches(elijah, { name: "Elijah Craig C925" }), true);
  assert.equal(
    offerBatchMatches(elijah, { name: "Elijah Craig C925 / A125" }),
    false,
  );
  assert.equal(
    offerBatchMatches(elijah, {
      name: "일라이저 크레이그",
      name_tag: "B525 배치",
    }),
    false,
  );
});

test("annual releases distinguish release years from gift and promotion years", () => {
  const item = {
    id: "bunnahabhain-12-cask-strength-2025",
    name: "부나하벤 12년 캐스크 스트렝스 2025",
    englishName: "Bunnahabhain 12 Year Old Cask Strength 2025 Edition",
  };
  for (const offer of [
    { name: "부나하벤 12년 CS 2025" },
    { name: "부나하벤 12년 캐스크 스트렝스 2025" },
    { name: "부나하벤", name_tag: "2025 에디션" },
    { name: "[2026 추석 선물] 부나하벤 12년 CS 2025" },
    { name: "부나하벤 12년 CS", name_tag: "2026년 설 선물" },
    { name: "부나하벤 12년 CS 2026 설 선물" },
    { name: "부나하벤 12년 CS", name_tag: "2026-10-03 입고" },
  ])
    assert.equal(offerBatchMatches(item, offer), true, JSON.stringify(offer));
  for (const offer of [
    { name: "부나하벤 12년 CS 2023" },
    { name: "부나하벤 12년 CS2023" },
    { name: "부나하벤 12년 캐스크 스트렝스 2023" },
    { name: "부나하벤", name_tag: "2023 에디션" },
    { name: "부나하벤", name_tag: "Release: 2023" },
    { name: "부나하벤", name_tag: "2023" },
    { name: "부나하벤", name_tag: "2023 에디션 선물" },
    { name: "부나하벤", name_tag: "에디션 랜덤" },
    { name: "[2023/60.1도] 부나하벤 12년 CS" },
  ])
    assert.equal(offerBatchMatches(item, offer), false, JSON.stringify(offer));
});

test("annual shared listings require the verified description year on every update", () => {
  const mapping = { releaseYear: 2022 };
  const years = declaredReleaseYears([
    {
      description:
        "<p>2022년 릴리즈되었습니다. 전 세계 6,100병 한정입니다.</p>",
    },
    { description: "2008년부터 생산. 2026년 행사 안내." },
  ]);
  assert.deepEqual(years, [2022]);
  assert.equal(approvedReleaseMatches(mapping, years), true);
  for (const missingOrChanged of [undefined, [], [2023], [2022, 2023]])
    assert.equal(approvedReleaseMatches(mapping, missingOrChanged), false);
  assert.equal(approvedReleaseMatches({}, undefined), true);
  const item = { id: "irishman-cask-strength-2022" };
  assert.equal(
    offerBatchMatches(item, { name: "[2019/54도] 디 아이리시맨 CS" }),
    false,
  );
  assert.equal(
    offerBatchMatches(item, {
      name: "디 아이리시맨 CS",
      name_tag: "2019/54도",
    }),
    false,
  );
  assert.equal(
    offerBatchMatches(item, {
      name: "디 아이리시맨 CS",
      name_tag: "2022/54.9%",
    }),
    true,
  );
});

test("unspecified expressions accept variable batches; unknown seller labels defer to verified parent mapping", () => {
  for (const id of [
    "aberlour-abunadh",
    "old-forester-single-barrel-barrel-strength",
    "four-roses-small-batch",
  ])
    assert.equal(
      offerBatchMatches({ id }, { name: "Batch 13", name_tag: "배치 랜덤" }),
      true,
    );
  assert.equal(offerBatchMatches({ id: "stagg-24c" }, {}), true);
  assert.equal(
    offerBatchMatches(
      { id: "tamdhu-batch-strength-006" },
      { name: "탐두 700ml 56.8%" },
    ),
    true,
  );
});
