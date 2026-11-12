import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaigSelect750Whiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://dailyshot.co/m/item/11421" },
  [["laphroaig-select-750", "라프로익 셀렉트 750ml", "Laphroaig Select 750ml", 40, null,
    ["꿀", "핵과일", "과일", "오크", "바닐라", "스모키", "피트"],
    "여러 캐스크의 원액을 조합한 라프로익 셀렉트의 40%·750ml 제품입니다. SELECT 표기의 실물 병·원통 포장과 데일리샷 사양을 대조했습니다. 숙성 연수는 표시되지 않으며, 기존 700ml 오크 셀렉트와 용량이 다릅니다. 향미는 해당 데일리샷 상품의 안내를 요약했습니다.",
    "꿀과 복숭아를 연상시키는 과일 향에 오크가 더해집니다.",
    "꿀과 바닐라의 단맛에 연기 풍미가 겹칩니다.",
    "달콤한 피트와 연기 풍미가 여운을 남깁니다."]],
).map((item) => ({ ...item, abvNote: "40%·750ml NAS 제품입니다. 700ml 제품과 구분하며 캐스크 스트렝스로 분류하지 않습니다." }));
