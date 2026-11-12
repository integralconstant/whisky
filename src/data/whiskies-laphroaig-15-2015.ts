import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig15Year2015Whiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://whisky.auction/auctions/lot/220999/laphroaig-15-year-old" },
  [["laphroaig-15-2015-anniversary", "라프로익 15년 2015 200주년 기념판", "Laphroaig 15 Year Old 2015 200th Anniversary", 43, 15,
    ["피트", "스모키", "바닐라", "열대과일", "사과", "후추", "견과류", "초콜릿"],
    "1815년 창립 200주년을 기념해 2015년에 출시한 15년 한정판. 실물 라벨의 기념 문구·43%·700ml를 확인했습니다. 향미는 Words of Whisky의 2015년 기념판 직접 시음 기록을 요약했으며 구형 15년 및 2026년 재출시판과 구분했습니다.",
    "은은한 피트와 부드러운 바닐라·설탕의 단맛에 잘 익은 바나나·바나나 사탕·풋사과, 약간의 고무 향이 겹칩니다.",
    "스모키한 피트에 후추와 탄닌, 약품 같은 풍미가 드러납니다. 향에서 느낀 단맛은 줄고 질감은 가벼운 편입니다.",
    "길지만 강하지 않은 여운에 피트·견과류와 마지막의 은은한 초콜릿이 남습니다."]],
).map((item) => ({ ...item, abvNote: "2015년 200주년 기념판 43%·700ml입니다. 2026년 재출시판 및 기념 문구가 없는 구형15년과 구분합니다." }));
