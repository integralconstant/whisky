import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaigStrongWhiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.laphroaig.com/whiskies/strong-characters-chapter-one" },
  [
    ["laphroaig-strong-characters-1", "라프로익 스트롱 캐릭터스 챕터 1 33년", "Laphroaig Strong Characters Chapter 1 33 Year Old Donald Johnston", 43.8, 33,
      ["피트", "스모키", "셰리", "바닐라", "꿀", "바다·소금", "과일"],
      "공동 창립자 도널드 존스턴을 기리는 스트롱 캐릭터스 첫 제품. 버번 아메리칸 오크와 셰리로 시즈닝한 유러피언 오크 혹스헤드에서 33년 숙성했으며 생산자가 고정 도수 병입으로 명시했습니다. 빌 브래그의 삽화가 패키지에 담겼습니다. 향미는 공식 노트를 요약했습니다.",
      "크리미한 퍼지와 꿀에 약간의 바다 소금이 겹칩니다.",
      "졸인 과일과 매끄러운 바닐라 크렘 브륄레의 풍미로 시작합니다.",
      "특유의 연기에 염장육을 닮은 감칠맛 있는 향이 이어집니다."],
    ["laphroaig-strong-characters-2", "라프로익 스트롱 캐릭터스 챕터 2 35년", "Laphroaig Strong Characters Chapter 2 35 Year Old Dugald Johnston", 43.8, 35,
      ["피트", "스모키", "과일", "사과", "베리", "건과일", "스파이시", "후추", "빵·비스킷"],
      "도널드 존스턴의 아들 듀걸드 존스턴을 기리는 두 번째 제품. 버번을 담았던 아메리칸 화이트 오크 배럴에서만 35년 숙성했습니다. 전 세계 5,500병 한정으로 빌 브래그의 삽화를 패키지와 책자에 담았습니다. 향미는 공식 노트를 요약했습니다.",
      "달콤한 첫인상 뒤로 갓 구운 페이스트리와 사과·체리가 드러납니다.",
      "기분 좋은 연기와 향신료에 크리미한 질감이 어우러지며 배경에 은은한 건포도가 느껴집니다.",
      "아니스와 살짝 얼얼한 후추가 오래 남다가 본래의 피트 연기로 천천히 돌아갑니다.",
      "https://www.laphroaig.com/whiskies/strong-characters-chapter-two"],
  ],
).map((item) => ({ ...item, abvNote: item.age === 33 ? "챕터 1 도널드 존스턴 33년 43.8%·700ml입니다. 생산자가 고정 도수 병입으로 명시했습니다. 동봉 판화 차이는 별도 제품으로 구분하지 않습니다." : "챕터 2 듀걸드 존스턴 35년 43.8%·700ml입니다. 챕터 1과 구분하며 CS 여부는 추가 확인 중입니다." }));
