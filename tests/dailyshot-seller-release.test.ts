import { test } from "node:test";
import assert from "node:assert/strict";
import { approvedAbvMatches, sellerReleaseMatches } from "../scripts/dailyshot-matching.mjs";

const item = { id: "laphroaig-25-cask-strength-2018", name: "라프로익 25년 캐스크 스트렝스 2018", englishName: "Laphroaig 25 Year Old Cask Strength 2018 Edition", abv: 52, caskStrength: true };
const mapping = { sellerRelease: { year: 2018, abv: 52, parentAbvLabel: "45~54%", note: "공용 상품 중 연도·도수를 명시한 판매처만 반영" } };
test("shared annual products require a reviewed parent label and matching fixed release", () => {
  assert.equal(approvedAbvMatches(item, mapping, "45~54%"), true);
  assert.equal(approvedAbvMatches(item, mapping, "40~60%"), false);
  assert.equal(approvedAbvMatches({ ...item, abv: 51.4 }, mapping, "45~54%"), false);
  assert.equal(approvedAbvMatches({ ...item, id: "laphroaig-25-cask-strength-2019" }, mapping, "45~54%"), false);
  assert.equal(approvedAbvMatches({ ...item, caskStrength: false }, mapping, "45~54%"), false);
});
test("shared annual sellers must explicitly agree on both year and ABV", () => {
  const offer = (tag: string) => ({ name: `[${tag}] 라프로익 25년 CS`, name_tag: tag });
  assert.equal(sellerReleaseMatches(item, mapping, offer("52도 2018 릴리즈")), true);
  assert.equal(sellerReleaseMatches(item, mapping, offer("2018 릴리즈 52%")), true);
  for (const tag of ["", "2018 릴리즈", "52도", "2019 릴리즈 52%", "2018 릴리즈 51.4%", "2018 릴리즈 52% 2019 릴리즈", "2018 릴리즈 52% 53.4%", "2018 릴리즈 52% 랜덤 발송"])
    assert.equal(sellerReleaseMatches(item, mapping, offer(tag)), false, tag);
  assert.equal(sellerReleaseMatches(item, {}, offer("")), true);
});
