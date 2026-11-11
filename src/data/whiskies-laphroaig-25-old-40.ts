import type { Whisky } from "./types.ts";
import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig25Old40Whiskies: Whisky[] = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://allthingswhisky.com/2011/01/12/tale-of-two-25-year-old-laphroaigs/" },
  [["laphroaig-25-old-40", "라프로익 25년 구형 40%", "Laphroaig 25 Year Old Old Bottling 40%", 40, 25,
    ["스모키", "과일", "견과류", "사과", "배", "건과일"],
    "일부 올로로소 셰리 캐스크 숙성 원액을 사용한 구형 25년의 40%·700ml 제품. 연도별 캐스크 스트렝스 제품과 구분합니다. 아래 향미는 All Things Whisky의 40% 제품 비교 시음 기록을 요약했습니다.",
    "숙성된 연기와 와인 같은 향에 아몬드·부드러운 사과·배가 겹칩니다.",
    "달콤하게 익은 천도복숭아와 건포도의 풍미가 이어집니다.",
    "중간 길이보다 조금 더 이어지는 여운."],
    ["laphroaig-25-bessie-williamson-story", "라프로익 25년 더 베시 윌리엄슨 스토리", "Laphroaig 25yo The Bessie Williamson Story", 43, 25,
      ["스모키", "피트", "사과", "오크", "건과일", "계피", "초콜릿", "후추", "꿀", "바닐라"],
      "라프로익의 베시 윌리엄슨을 기념하는 25년 숙성 43% 제품. 그녀의 이야기를 담은 책 형태의 패키지로 소개된 여행 소매 전용 에디션입니다. 아래 향미는 데일리샷의 해당 제품 정보를 요약했습니다.",
      "사과와 스모키한 향, 오크가 느껴집니다.",
      "말린 과일·계피·피트·초콜릿의 풍미가 이어집니다.",
      "후추·꿀·바닐라의 여운.",
      "https://www.suntoryglobalspirits.com/news/laphroaigr-25-year-old-whisky-celebrates-life-bessie-williamson"]],
).map((item) => ({ ...item, abvNote: item.abv === 40 ? "실물 앞·뒷라벨을 확인한 40%·700ml 구형입니다. 판매처는 2007년 병입으로 설명하지만 제품명에 확정 연도는 넣지 않았습니다." : "43%·700ml의 베시 윌리엄슨 스토리입니다. 구형 40% 및 연도별 25년 CS와 구분합니다." }));
