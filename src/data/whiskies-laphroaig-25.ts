import type { Whisky } from "./types.ts";
import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

const commonNotes = [
  "절제된 연기와 달콤한 바닐라, 나무 향신료·훈제 베이컨에 은근한 건과일",
  "크리미한 질감에 후추·요오드·피트 연기가 겹치고 청사과가 더해지는 맛",
  "연기가 물결처럼 이어지며 후추로 마무리되는 긴 여운",
] as const;

export const laphroaig25Whiskies: Whisky[] = [
  ...[2020, 2021, 2022].flatMap((year, index) => createWhiskyGroup(
    { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: year === 2022
      ? "https://www.laphroaig.com/whiskies/25-year-old-cask-strength-whisky-2022"
      : `https://www.laphroaig.com/en-gb/whiskies/25-yo-cask-strength-whisky-${year}-edition` },
    [[`laphroaig-25-cask-strength-${year}`, `라프로익 25년 캐스크 스트렝스 ${year}`, `Laphroaig 25 Year Old Cask Strength ${year} Edition`, [49.8, 51.9, 53.4][index], 25,
      ["스모키", "피트", "바닐라", "스파이시", "건과일", "크리미", "후추", "사과"],
      `25년 숙성 후 내추럴 캐스크 스트렝스로 병입한 ${year} 에디션. ${[49.8, 51.9, 53.4][index]}%의 개별 릴리즈로 기록하며 향미는 해당 연도의 생산자 공식 노트를 요약했습니다.`,
      ...commonNotes]],
  )),
  ...createWhiskyGroup(
    { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.laphroaig.com/whiskies/25-year-old-cask-strength-2023" },
    [["laphroaig-25-cask-strength-2023", "라프로익 25년 캐스크 스트렝스 2023", "Laphroaig 25 Year Old Cask Strength 2023 Edition", 47.3, 25,
      ["과일", "사과", "크리미", "빵·비스킷", "스모키", "계피", "열대과일", "핵과일", "후추", "시트러스"],
      "버번 캐스크에서 25년 숙성하고 냉각 여과 없이 47.3% 캐스크 스트렝스로 병입한 2023 에디션. 향미와 숙성 설명은 해당 연도의 생산자 공식 정보를 따릅니다.",
      "배 사탕과 청사과, 커스터드와 따뜻한 페이스트리에 훈제 햄·계피",
      "파인애플과 복숭아·망고의 풍성한 과일에 은근한 백후추와 바비큐한 오렌지 껍질",
      "부드럽고 길게 이어지며 숙성된 연기 풍미가 남는 여운"]],
  ),
].map((item) => ({
  ...item, caskStrength: true,
  abvNote: item.id.endsWith("2023")
    ? "2023년 47.3%·700ml 릴리즈입니다. 일반 25년 CS 공용 상품과 구분합니다."
    : `${item.id.slice(-4)}년 ${item.abv}% 릴리즈입니다. 공식 사진은 750ml 시장용 병이며 다른 연도의 공용 판매가를 적용하지 않습니다.`,
}));
