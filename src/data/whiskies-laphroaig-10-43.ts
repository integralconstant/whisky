import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig10UsWhiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://dailyshot.co/m/item/17652" },
  [["laphroaig-10-43-750", "라프로익 10년 43% 750ml", "Laphroaig 10 Year Old 43% 750ml", 43, 10,
    ["피트", "스모키", "시트러스", "바닐라", "스파이시", "몰트", "후추", "오크"],
    "라프로익 10년의 43%·750ml 제품입니다. 버번 오크 숙성에서 오는 단맛과 피트·해조류의 개성이 어우러집니다. 기존 40%·700ml 제품과 도수·용량이 다르며, 실물 병과 상자의 43%·750ml 표기를 대조했습니다. 향미는 데일리샷의 해당 상품 안내를 요약했습니다.",
    "강한 피트와 연기에 해조류 향과 달콤함이 겹칩니다.",
    "레몬과 바닐라, 향신료에 바다 내음이 어우러집니다.",
    "몰트와 후추·카다멈·오크 풍미가 길게 남습니다."]],
).map((item) => ({ ...item, abvNote: "43%·750ml 정규 도수 제품입니다. 40%·700ml 및 10년 캐스크 스트렝스 배치 제품과 구분됩니다." }));
