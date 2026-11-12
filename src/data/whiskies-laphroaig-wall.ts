import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaigWallWhiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.laphroaig.com/whiskies/the-wall-collection" },
  [
    ["laphroaig-wall-36-peat", "라프로익 월 컬렉션 36년 피트 에디션", "Laphroaig The Wall Collection 36 Year Old Peat Edition", 42.5, 36,
      ["피트", "열대과일", "베리", "건과일", "가죽", "계피", "꿀", "바닐라"],
      "월 컬렉션의 첫 제품으로 전 세계 200병 한정. 피트가 강한 원액을 담았던 캐스크에서 마무리해 스모키함을 더했습니다. 로라 칼린이 창고 1번의 벽과 같은 페인트로 병마다 직접 그림을 그렸습니다. 향미는 공식 노트를 요약했습니다.",
      "패션프루트·딸기·촉촉한 건포도에 부드러운 가죽과 달콤한 계피 향이 어우러집니다.",
      "오렌지 껍질과 파인애플의 상큼함에 꿀·바닐라·커스터드 타르트가 겹치며 마지팬이 은은합니다.",
      "달콤하고 매끄러운 여운에 특유의 피트가 길게 남습니다."],
    ["laphroaig-wall-39-rope", "라프로익 월 컬렉션 39년 로프 에디션", "Laphroaig The Wall Collection 39 Year Old Rope Edition", 42.4, 39,
      ["피트", "스모키", "셰리", "토피", "베리", "가죽", "시트러스", "견과류", "오크"],
      "월 컬렉션의 두 번째 제품으로 전 세계 200병 한정. 올로로소 셰리로 시즈닝한 유러피언 오크 혹스헤드에서 숙성한 뒤 PX 셰리 유러피언 오크 버트에서 마무리했습니다. 셰리 캐스크를 운반하던 배의 밧줄을 로라 칼린의 수작업 그림에 담았습니다. 향미는 공식 노트를 요약했습니다.",
      "토피와 크랜베리·짙은 체리에 윤기 나는 가죽·달콤한 당밀·만다린 오렌지가 겹치는 풍부하고 스파이시한 향.",
      "부드러운 연기에 당밀 토피·설탕 입힌 오렌지 껍질·헤이즐넛의 풍미가 이어집니다.",
      "훈연 오렌지 토피와 오크·혼합 향신료가 길고 매끄럽게 남습니다.",
      "https://www.laphroaig.com/whiskies/the-wall-collection-rope"],
  ],
).map((item) => ({ ...item, abvNote: `월 컬렉션 ${item.age}년 ${item.age === 36 ? "피트 에디션 42.5" : "로프 에디션 42.4"}%·700ml입니다. CS 여부는 확인 중입니다.` }));
