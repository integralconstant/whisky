import type { Whisky } from "./types.ts";
import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig25Year2009Whiskies: Whisky[] = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://allthingswhisky.com/2011/01/12/tale-of-two-25-year-old-laphroaigs/" },
  [["laphroaig-25-cask-strength-2009", "라프로익 25년 캐스크 스트렝스 2009", "Laphroaig 25 Year Old Cask Strength 2009 Edition", 51, 25,
    ["피트", "스모키", "과일", "열대과일", "캐러멜", "크리미"],
    "25년 숙성 후 51% 캐스크 스트렝스로 병입한 2009년 에디션. 병 라벨의 연도·도수·용량을 확인했습니다. 아래 향미는 All Things Whisky의 2009년 제품 비교 시음 기록을 요약했습니다.",
    "생기 있는 연기와 약품 같은 향에 가벼운 풍선껌·배의 향이 겹칩니다.",
    "부드럽고 달콤한 열대과일에 크리미한 캐러멜이 이어집니다.",
    "중간에 다소 거친 느낌을 거쳐 따뜻하게 마무리되는 긴 여운."]],
).map((item) => ({ ...item, caskStrength: true, abvNote: "2009년 51%·700ml 에디션입니다. 40% 일반 25년 및 다른 연도·도수의 CS 제품과 구분합니다." }));
