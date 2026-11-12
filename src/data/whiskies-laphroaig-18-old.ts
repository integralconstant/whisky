import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig18OldWhiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.finedrams.com/laphroaig-18-year-old-whisky.html" },
  [["laphroaig-18-old-48", "라프로익 18년 구형", "Laphroaig 18 Year Old Original Release", 48, 18,
    ["피트", "스모키", "꿀", "바닐라", "사과", "배", "핵과일", "견과류", "생강"],
    "2009년 15년 제품의 후속으로 선보였던 구형 18년입니다. 버번 캐스크에서 숙성했으며, 흰색 원통 포장의 실물 병에서 18년·48%·700ml를 확인했습니다. 2024년 리런치와 구분됩니다. 향미는 The Whiskyphiles의 2014년 증류소 방문 시 직접 시음 기록을 요약했으며, 사진 속 병의 병입 연도는 특정하지 않았습니다.",
    "달콤한 꿀과 땅콩 풍미에 피트, 사과·배 사탕·살구가 어우러지고 은은한 백단향이 느껴집니다.",
    "달콤한 나무 풍미에 헤이즐넛·진저브레드·바닐라 푸딩이 겹칩니다. 사과·배의 부드러운 과일 맛과 해조류, 깨끗한 요오드가 이어집니다.",
    "꿀을 머금은 바닐라의 단맛과 그을린 백단향이 길게 남습니다."]],
).map((item) => ({ ...item, abvNote: "구형 18년 48%·700ml입니다. 2024 리런치와 별도 제품으로 구분하며 특정 병입 연도나 캐스크 스트렝스를 추정하지 않습니다." }));
