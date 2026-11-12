import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaigQaCaskWhiskies = createWhiskyGroup(
  {
    brand: "Laphroaig",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "아일라",
    source: "https://www.thewhiskyexchange.com/p/24133/laphroaig-qa-cask-litre",
  },
  [[
    "laphroaig-qa-cask-1l",
    "라프로익 QA 캐스크 1L",
    "Laphroaig QA Cask 1L",
    40,
    null,
    ["피트", "바다·소금", "바닐라", "사과", "캐러멜", "후추", "우디"],
    "여행 소매 전용으로 선보인 무연산 라프로익. 버번 배럴 숙성 뒤 강하게 토스팅한 아메리칸 화이트 오크 캐스크에서 추가 숙성한 QA(Quercus alba) 캐스크입니다.",
    "슈가 아이싱의 단맛에 요오드·바닷내음, 고무·가죽과 자갈 같은 미네랄 뉘앙스.",
    "설탕에 절인 생강, 검은 고무·가벼운 석탄 연기, 사과와 솔티드 캐러멜.",
    "플로럴 시럽에서 부드러운 나무 향으로 이어지는 여운.",
    "https://www.thewhiskyexchange.com/p/24133/laphroaig-qa-cask-litre",
  ]],
).map((item) => ({
  ...item,
  abvNote: "실물 병 사진과 제품 페이지에서 QA Cask·1L·40%를 확인했습니다. 무연산 제품이며 캐스크 스트렝스로 추정하지 않습니다.",
}));
