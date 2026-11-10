import type { Whisky } from "./types.ts";
import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig25HistoryWhiskies: Whisky[] = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://wordsofwhisky.com/laphroaig-25-years-old-cask-strength-2017/" },
  [["laphroaig-25-cask-strength-2017", "라프로익 25년 캐스크 스트렝스 2017", "Laphroaig 25 Year Old Cask Strength 2017 Edition", 48.9, 25,
    ["피트", "스모키", "과일", "시트러스", "후추"],
    "25년 숙성 후 48.9% 캐스크 스트렝스로 병입한 2017년 에디션. 버번과 세컨드 필 올로로소 셰리 캐스크 원액을 결합했습니다. 아래 향미는 Words of Whisky의 해당 연도 시음 기록을 요약했습니다.",
    "바닷바람과 피트 향 사이로 감초, 잘 익은 바나나와 오렌지, 배가 느껴집니다.",
    "망고와 설탕의 단맛에 잿빛 피트와 타르, 레몬 껍질과 감초 뿌리의 풍미가 이어집니다.",
    "소금과 후추, 재와 그린 올리브가 남는 중간 길이의 여운."]],
).map((item) => ({ ...item, caskStrength: true, abvNote: "2017년 48.9%·700ml 에디션입니다. 다른 연도의 25년 CS와 구분하며 공용 상품의 가격은 적용하지 않습니다." }));
