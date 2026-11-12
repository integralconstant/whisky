import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig10OneLWhiskies = createWhiskyGroup(
  {
    brand: "Laphroaig",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "아일라",
    source: "https://www.heinemann.com.au/en/global/laphroaig/laphroaig-10y-40vol-1l/p/000000000000012710/",
  },
  [[
    "laphroaig-10-40-1l",
    "라프로익 10년 40% 1L",
    "Laphroaig 10 Year Old 40% 1L",
    40,
    10,
    ["피트", "스모키", "바다·소금"],
    "10년 숙성 라프로익의 1L·40% 여행 소매 규격입니다. 피트로 훈연한 맥아에서 비롯된 연기와 바다·소금의 인상을 중심으로 한 기본 표현입니다.",
    "피트 연기와 해조류, 약품을 연상시키는 향.",
    "짭짤함 사이로 드러나는 단맛과 여러 겹의 피트.",
    "달콤한 해조류와 스모크가 오래 남는 여운.",
    "https://www.heinemann.com.au/en/global/laphroaig/laphroaig-10y-40vol-1l/p/000000000000012710/",
  ]],
).map((item) => ({
  ...item,
  abvNote: "실물 병과 제품 페이지에서 10년·1L·40%를 확인했습니다. 700ml 기본판 및 750ml·43% 미국판과 구분합니다.",
}));
