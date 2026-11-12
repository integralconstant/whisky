import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaigQuarter750Whiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.oaksliquors.com/p/laphroaig-quarter-cask" },
  [["laphroaig-quarter-cask-750", "라프로익 쿼터 캐스크 750ml", "Laphroaig Quarter Cask 750ml", 48, null,
    ["피트", "스모키", "코코넛", "열대과일", "스파이시"],
    "오크 배럴에서 숙성한 뒤 작은 쿼터 캐스크에서 추가 숙성한 48%·750ml 제품입니다. 실물 병의 QUARTER CASK·750ml·48% 표기를 확인했습니다. 기존 700ml·1L 제품과 용량이 다르며 숙성 연수는 표시되지 않습니다. 향미는 해당 제품 판매처의 안내를 요약했습니다.",
    "코코넛과 바나나 향이 피트 연기와 어우러집니다.",
    "풍성하고 복합적인 질감에 달콤한 연기 풍미가 나타납니다.",
    "연기와 향신료가 긴 여운을 남깁니다."]],
).map((item) => ({ ...item, abvNote: "48%·750ml NAS입니다. 사진의 구형 라벨만으로 병입 연도를 특정하지 않으며 캐스크 스트렝스로 분류하지 않습니다." }));
