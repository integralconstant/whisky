import type { Whisky } from "./types.ts";
import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig25EarlyWhiskies: Whisky[] = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://tomoderawhisky.wordpress.com/2022/05/19/laphroaig-25-2015/" },
  [
    ["laphroaig-25-cask-strength-2015", "라프로익 25년 캐스크 스트렝스 2015", "Laphroaig 25 Year Old Cask Strength 2015 Edition", 46.8, 25,
      ["피트", "스모키", "허브", "시트러스", "바다·소금", "오일리"],
      "25년 숙성 후 46.8% 캐스크 스트렝스로 병입한 2015년 에디션. 검은 기념 패키지와 병 라벨에 연도가 표시됩니다. 아래 향미는 TOModera의 해당 연도 시음 기록을 요약했습니다.",
      "요오드와 병원 같은 약품 향에 레몬그라스·바닷바람·흑설탕·고무가 겹칩니다.",
      "고무와 소금에 절인 돼지고기, 소기름·민들레·버터를 연상시키는 기름지고 짭짤한 풍미.",
      "홍합 같은 바다 향과 그을린 레몬·라임 껍질, 라일락과 마른 풀이 남습니다."],
    ["laphroaig-25-cask-strength-2016", "라프로익 25년 캐스크 스트렝스 2016", "Laphroaig 25 Year Old Cask Strength 2016 Edition", 48.6, 25,
      ["피트", "스모키", "과일", "시트러스", "바다·소금"],
      "25년 숙성 후 48.6% 캐스크 스트렝스로 병입한 2016년 에디션. 올로로소 셰리와 아메리칸 오크 캐스크 숙성 표기를 실물 라벨에서 확인했습니다. 아래 향미는 The Whisky Exchange의 해당 제품 시음 기록을 요약했습니다.",
      "부드러운 과일 향에 은은한 소금기와 절제된 피트 연기가 느껴집니다.",
      "자몽과 패션프루트의 과즙 같은 풍미 사이로 가느다란 피트 연기가 어우러집니다.",
      "연기와 과일이 겹치는 섬세하고 부드러운 여운.",
      "https://www.thewhiskyexchange.com/p/36037/laphroaig-25-year-old-cask-strength-bot2016"],
  ],
).map((item) => ({ ...item, caskStrength: true, abvNote: `${item.id.slice(-4)}년 ${item.abv}%·700ml 에디션입니다. 다른 연도 및 도수의 25년 CS와 구분합니다.` }));
