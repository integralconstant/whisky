import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig30Old700Whiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://whisky.auction/auctions/lot/136839/laphroaig-30-year-old" },
  [["laphroaig-30-old-43-700", "라프로익 30년 구형 43% 700ml", "Laphroaig 30 Year Old Old Bottling 43% 700ml", 43, 30,
    ["피트", "스모키", "셰리", "오크", "스파이시", "바다·소금"],
    "구형 30년 공식 병입의 700ml 용량 제품. 경매 실물 라벨의 70cl·43%를 확인했으며 기존 750ml와 용량을 구분했습니다. 병입 연도와 배치는 미확인입니다. 향미는 Nicks가 인용한 Whisky Magazine의 구형 30년 리뷰를 요약했으며 배치에 따라 차이가 있을 수 있습니다.",
    "진한 셰리와 해안의 짭짤함에 약품·오크, 타오르는 사과나무 장작 같은 향이 겹칩니다.",
    "달콤하고 매끄러운 질감에 셰리와 피트가 어우러지며 오크와 장뇌 같은 청량한 풍미가 이어집니다.",
    "드라이한 향신료와 옅은 연기가 남습니다."]],
).map((item) => ({ ...item, abvNote: "구형 43%·700ml 용량 제품입니다. 구형 750ml와 구분하며 병입 연도·배치 차이는 확인되지 않았습니다." }));
