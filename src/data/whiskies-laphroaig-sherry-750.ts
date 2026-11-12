import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaigSherry750Whiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://dailyshot.co/m/item/6477" },
  [["laphroaig-10-sherry-750", "라프로익 10년 셰리 오크 피니시 750ml", "Laphroaig 10 Year Old Sherry Oak Finish 750ml", 48, 10,
    ["피트", "스모키", "셰리", "꿀", "정향", "가죽", "토피", "초콜릿", "우디"],
    "버번과 올로로소 셰리 오크 숙성의 풍미를 결합한 라프로익 10년의 48%·750ml 제품입니다. 원통 포장의 실물 사진과 데일리샷의 도수·용량을 대조했습니다. 기존 700ml와 용량이 다르며, 향미는 해당 데일리샷 상품의 안내를 요약했습니다.",
    "정향과 가죽, 피트 연기에 훈제 베이컨과 마누카 꿀의 향이 겹칩니다.",
    "토피와 메이플 시럽의 단맛에 다크 초콜릿과 솔잎 풍미가 더해집니다.",
    "달콤한 피트 연기와 삼나무 풍미가 길게 남습니다."]],
).map((item) => ({ ...item, abvNote: "48%·750ml 제품입니다. 데일리샷의 구형 표기는 포장 식별에 사용하며 병입 연도는 특정하지 않습니다. 캐스크 스트렝스로 분류하지 않습니다." }));
