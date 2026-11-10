import type { Whisky } from "./types.ts";
import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig25Year2011Whiskies: Whisky[] = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://torontowhiskysociety.ca/2017/02/24/froaigfriday-review-laphroaig-25-cask-strength-2011-edition/" },
  [["laphroaig-25-cask-strength-2011", "라프로익 25년 캐스크 스트렝스 2011", "Laphroaig 25 Year Old Cask Strength 2011 Edition", 48.6, 25,
    ["피트", "스모키", "바다·소금", "후추", "과일", "가죽", "오크"],
    "25년 숙성 후 48.6% 캐스크 스트렝스로 병입한 2011년 에디션. 병과 검은 상자에 표시된 연도를 확인했습니다. 아래 향미는 Toronto Whisky Society의 해당 연도 시음 기록을 요약했습니다.",
    "소금기와 가벼운 연기, 달콤한 피트·요오드에 훈연 고기·후추·오크가 느껴집니다.",
    "연기와 재, 달콤한 과일·바나나·소금물에 훈연 고기와 가죽 같은 오크 풍미가 겹칩니다.",
    "달콤하고 스모키한 여운이 길게 이어집니다."]],
).map((item) => ({ ...item, caskStrength: true, abvNote: "2011년 48.6%·700ml 에디션입니다. 같은 도수의 2016년 제품과는 병 라벨의 연도로 구분합니다." }));
