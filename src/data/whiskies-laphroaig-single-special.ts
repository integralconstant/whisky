import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaigSingleSpecialWhiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.laphroaig.com/whiskies/francis-mallmann-17-year-old-white-madeira-cask" },
  [
    ["laphroaig-francis-mallmann-17", "라프로익 프란시스 말만 17년 화이트 마데이라", "Laphroaig Francis Mallmann 17 Year Old White Madeira Cask", 54.9, 17,
      ["피트", "스모키", "꿀", "열대과일", "견과류", "가죽", "후추", "바다·소금"],
      "셰프 프란시스 말만이 직접 고른 화이트 마데이라 캐스크에서 마무리한 17년 한정판. 전 세계 276병으로, 패키지에 그의 아일라 방문 스케치를 담았습니다. 향미는 공식 노트를 요약했습니다.",
      "달콤한 꿀과 망고에서 아몬드 조각·데메라라 설탕으로 이어지며 진한 가죽 향이 겹칩니다.",
      "후추와 향신료의 알싸함 뒤로 오렌지 제스트·열대과일·솔티드 캐러멜이 펼쳐지며 피트 연기와 바다 소금이 어우러집니다.",
      "길고 드라이한 여운이 입안을 따뜻하게 감싸며 피트와 소금기가 남습니다."],
    ["laphroaig-islay-ember-2014", "라프로익 아일라 엠버 2014 싱글 캐스크", "Laphroaig Islay Ember 2014 Single Cask 802279", 59.6, null,
      ["피트", "스모키", "셰리", "견과류", "메이플", "계피", "정향", "캐러멜", "바다·소금"],
      "2014년 4월부터 아몬틸라도 셰리 캐스크에서 전 기간 숙성한 Friends of Laphroaig 한정 싱글 캐스크. 실물 라벨의 캐스크 번호 802279와 312병 한정을 확인했습니다. 생산자는 물을 첨가하지 않았다고 명시하며, 정확한 숙성 연수는 특정하지 않습니다. 향미는 공식 노트를 요약했습니다.",
      "풍부하고 달콤한 호두·메이플 시럽·팬케이크에 섬세한 계피와 정향이 겹칩니다.",
      "첫맛의 달콤함과 배경의 소금기에 벨벳 같은 연기가 스며들며 솔티드 캐러멜과 아몬드가 어우러집니다.",
      "입안을 감싸는 감칠맛과 향신료가 매우 길게 남습니다.",
      "https://www.laphroaig.com/whiskies/islay-ember-single-cask"],
  ],
).map((item) => ({ ...item, ...(item.id === "laphroaig-islay-ember-2014" ? { caskStrength: true } : {}), abvNote: item.age === 17 ? "프란시스 말만 17년 54.9%·700ml입니다. CS 여부는 추가 확인 중입니다." : "아일라 엠버 캐스크802279, 59.6%·700ml입니다. 생산자가 가수하지 않았다고 명시했으며 정확한 숙성 연수는 미확인입니다." }));
