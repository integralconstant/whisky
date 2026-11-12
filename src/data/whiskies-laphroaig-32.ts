import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig32Whiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://whisky.auction/auctions/lot/137061/laphroaig-32-year-old-limited-edition" },
  [["laphroaig-32-2015", "라프로익 32년 2015 200주년 한정판", "Laphroaig 32 Year Old 2015 200th Anniversary 46.6% 700ml", 46.6, 32,
    ["피트", "스모키", "셰리", "베리", "바닐라", "흑설탕", "가죽", "바다·소금"],
    "증류소 창립 200주년을 기념해 2015년 5월 병입한 32년 한정판. 올로로소 셰리 캐스크에서 숙성했으며 실물 라벨에 캐스크 스트렝스로 명시돼 있습니다. 향미는 출시 당시 Whisky Gospel의 46.6% 제품 직접 시음 기록을 요약했습니다.",
    "천천히 열리는 부드럽고 깊은 피트에 짙은 과일의 단맛과 바닐라, 은은한 셰리·베리·흑설탕이 겹칩니다.",
    "향보다 강한 피트와 재, 입천장에 달라붙는 듯한 질감에 셰리의 단맛·새콤달콤한 베리·소금·약간의 가죽이 이어집니다.",
    "길지 않은 여운에 부드러운 피트와 새콤달콤한 붉은 베리가 남습니다."]],
).map((item) => ({ ...item, caskStrength: true, abvNote: "2015년 5월 병입 46.6%·700ml CS입니다. 미국용으로 확인되는 46.7%·750ml와 구분합니다." }));
