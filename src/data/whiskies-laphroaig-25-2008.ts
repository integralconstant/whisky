import type { Whisky } from "./types.ts";
import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig25Year2008Whiskies: Whisky[] = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://tomoderawhisky.wordpress.com/2018/02/20/laphroaig-25-2008/" },
  [
    ["laphroaig-25-cask-strength-2008", "라프로익 25년 캐스크 스트렝스 2008 50.9%", "Laphroaig 25 Year Old Cask Strength 2008 Edition 50.9%", 50.9, 25,
      ["피트", "과일", "베리", "시트러스", "견과류", "캐러멜", "크리미"],
      "25년 숙성한 2008년 에디션의 50.9%·700ml 제품. 실물 뒷라벨로 연도·도수·용량을 확인했습니다. 아래 향미는 TOModera의 해당 도수 제품 시음 기록을 요약했습니다.",
      "무화과·라즈베리·신선한 오렌지 주스·만다린과 구운 잣의 풍부한 과일 향.",
      "만다린 라씨·캐러멜 치즈케이크·오레오 아이스크림·라즈베리 시럽을 연상시키는 크리미한 풍미에 소나무 향이 겹칩니다.",
      "복숭아 음료·소금물·민트·아니스 쿠키·바닷바람·멜론이 남는 중간 길이의 여운."],
    ["laphroaig-25-cask-strength-us-2008", "라프로익 25년 캐스크 스트렝스 2008 미국판 51.2%", "Laphroaig 25 Year Old Cask Strength 2008 US Edition 51.2%", 51.2, 25,
      ["피트", "스모키", "바다·소금", "허브", "우디", "후추", "건과일"],
      "25년 숙성한 2008년 에디션의 미국판 51.2%·750ml 제품. 병과 상자의 연도·도수·용량을 확인했으며 50.9%·700ml와 별도로 기록합니다. 아래 향미는 Whiskery Turnip의 51.2% 제품 시음 기록을 요약했습니다.",
      "불꽃놀이 뒤의 화약 향과 짠 바닷바람·구운 조개에 머스코바도 설탕과 뜨거운 기름의 향이 겹칩니다.",
      "풀과 허브를 닮은 연기·향·백단향에 숯·조개·훈연 해산물의 짭짤한 풍미와 말린 과일이 이어집니다.",
      "부드러운 후추·바다 소금물·튀긴 반죽·그을린 석쇠가 길게 남습니다.",
      "https://whiskeryturnip.com/2026/06/10/laphroaig-25-year-2008-edition/"],
  ],
).map((item) => ({ ...item, caskStrength: true, abvNote: item.id.includes("-us-") ? "2008년 미국판 51.2%·750ml입니다. 50.9%·700ml와 구분합니다." : "2008년 50.9%·700ml입니다. 미국판 51.2%·750ml와 구분합니다." }));
