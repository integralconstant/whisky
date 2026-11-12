import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig30Year2016Whiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.thewhiskyexchange.com/p/48305/laphroaig-30-year-old-bot2016" },
  [["laphroaig-30-2016", "라프로익 30년 2016 릴리즈", "Laphroaig 30 Year Old 2016 Release", 53.5, 30,
    ["피트", "스모키", "바닐라", "시트러스", "토피", "생강", "오크"],
    "1985년 10월 증류·2016년 5월 병입한 30년 한정판. 버번 캐스크에서 숙성해 53.5% 캐스크 스트렝스로 병입했습니다. 실물 라벨의 연월·70cl·도수를 확인했으며, 향미는 출시 당시 Adventures in Whiskey의 시음 기록을 요약했습니다.",
    "바닐라 디저트에 나무 향신료와 잘 익은 망고, 흙내와 짭짤한 피트·오렌지가 겹칩니다.",
    "진한 토피와 생강·오렌지·바닐라 뒤로 해조류와 담배, 은은한 피트 연기와 오크 향신료가 이어집니다.",
    "오렌지 사탕과 허브, 오래된 오크가 따뜻하고 길게 남습니다."]],
).map((item) => ({ ...item, caskStrength: true, abvNote: "2016년 5월 병입 53.5%·700ml CS입니다. 2024년판 및 이안 헌터 30년과 구분합니다." }));
