import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig10At43Whiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://dailyshot.co/m/item/12972" },
  [["laphroaig-10-43-700", "라프로익 10년 43% 700ml", "Laphroaig 10 Year Old 43% 700ml", 43, 10,
    ["피트", "스모키", "스파이시", "시트러스", "바닐라", "배", "후추"],
    "라프로익 10년의 43%·700ml 제품입니다. 실물 병과 상자의 도수·용량을 대조했으며, 기존 40%·700ml 및 43%·750ml 제품과 구분됩니다. 데일리샷은 포장 디자인 변경 전후 내용물이 동일하다고 안내합니다. 향미는 해당 상품의 안내를 요약했습니다.",
    "강한 연기 향에 향신료와 감초, 짭짤함과 달콤함이 어우러집니다.",
    "레몬·바닐라·배의 풍미에 해조류와 향신료, 후추가 겹칩니다.",
    "묵직한 피트 풍미가 여운을 남깁니다."]],
).map((item) => ({ ...item, abvNote: "43%·700ml 정규 도수 제품입니다. 750ml 제품 및 캐스크 스트렝스 배치와 구분하며, 포장 변경만으로 별도 제품을 만들지 않습니다." }));
