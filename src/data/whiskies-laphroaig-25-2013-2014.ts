import type { Whisky } from "./types.ts";
import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig25EarlierWhiskies: Whisky[] = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://whisknick.wordpress.com/2015/08/17/laphroaig-25-yo-2013-cask-strength-edition/" },
  [
    ["laphroaig-25-cask-strength-2013", "라프로익 25년 캐스크 스트렝스 2013", "Laphroaig 25 Year Old Cask Strength 2013 Edition", 45.1, 25,
      ["피트", "스모키", "허브", "과일", "꿀", "초콜릿"],
      "25년 숙성 후 45.1% 캐스크 스트렝스로 병입한 2013년 에디션. 병과 패키지의 연도 표기를 확인했습니다. 아래 향미는 WhiskNick의 해당 연도 시음 기록을 요약했습니다.",
      "딜과 차로 훈연한 송어, 베이컨·바나나 잼에 우디한 피트와 바다 소금, 쿠민·후추·찻잎이 겹칩니다.",
      "레몬 프리저브와 가벼운 꿀, 살구·붉은 사과·다크 초콜릿에 젖은 피트와 향신료가 이어집니다.",
      "가벼운 꿀의 단맛 아래 절제된 피트가 남는 여운."],
    ["laphroaig-25-cask-strength-2014", "라프로익 25년 캐스크 스트렝스 2014", "Laphroaig 25 Year Old Cask Strength 2014 Edition", 45.1, 25,
      ["피트", "스모키", "과일", "시트러스", "꿀", "견과류", "담배"],
      "25년 숙성 후 45.1% 캐스크 스트렝스로 병입한 2014년 에디션. 같은 도수의 2013년 제품과는 라벨의 연도로 구분합니다. 아래 향미는 WhiskyNotes의 해당 연도 시음 기록을 요약했습니다.",
      "은은한 피트와 숯재에 녹인 버터·바닐라·리치 시럽, 요오드와 미네랄 향이 겹칩니다.",
      "피트와 달콤한 레몬·꿀, 호두·소금물·굴·따뜻한 연기가 부드럽게 이어지고 사과·아몬드·감초가 느껴집니다.",
      "연기와 계피·담배·잎사귀 향이 길게 남습니다.",
      "https://www.whiskynotes.be/2017/laphroaig/laphroaig-25-years-2014/"],
  ],
).map((item) => ({ ...item, caskStrength: true, abvNote: `${item.id.slice(-4)}년 45.1%·700ml 에디션입니다. 같은 도수의 다른 연도 제품과 구분합니다.` }));
