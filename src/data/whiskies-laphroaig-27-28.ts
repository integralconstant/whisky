import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig2728Whiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.thewhiskyexchange.com/p/40970/laphroaig-27-year-old-bot2017" },
  [
    ["laphroaig-27-2017", "라프로익 27년 2017 릴리즈", "Laphroaig 27 Year Old 2017 Release", 41.7, 27,
      ["피트", "스모키", "담배", "가죽", "열대과일", "바닐라", "꿀", "바다·소금"],
      "2017년 3월 병입한 장기 숙성 한정판. 혹스헤드 숙성 후 퍼스트 필 버번 배럴과 리필 쿼터 캐스크로 옮겨 숙성했으며 라벨에 CS로 명시돼 있습니다. 향미는 WhiskyNotes의 41.7% 제품 직접 시음 기록을 요약했습니다.",
      "절제된 연기에 담뱃잎·가죽·요오드·멘톨이 겹치며 라임·넥타린·바나나와 커스터드가 드러납니다.",
      "부드럽고 오일리한 질감에 망고·복숭아·살구와 아몬드·향신료, 바닐라·꿀이 이어집니다. 은은한 요오드와 소금기, 희미한 연기와 에스프레소가 남습니다.",
      "중간 이상 길이의 드라이한 여운에 담배와 재·달콤한 감귤류·약간의 후추가 이어집니다."],
    ["laphroaig-28-2018", "라프로익 28년 2018 릴리즈", "Laphroaig 28 Year Old 2018 Release", 44.4, 28,
      ["피트", "스모키", "셰리", "토피", "허브", "열대과일", "정향", "배", "후추"],
      "2018년 장기 숙성 한정판. 쿼터 캐스크·버번 배럴·올로로소 셰리 버트에서 숙성한 원액을 모아 마지막 1년을 셰리 캐스크에서 함께 숙성했습니다. 라벨에 CS로 명시돼 있으며 향미는 Adventures in Whiskey의 44.4% 제품 직접 시음 기록을 요약했습니다.",
      "토피·말린 허브·열대과일에 아니스와 정향이 겹치는 향.",
      "신선한 과즙과 졸인 배에 구운 시더우드·통후추·소금물·구운 버섯이 어우러집니다.",
      "달콤한 피트와 구운 열대과일·향신료가 길게 남습니다.",
      "https://www.finedrams.com/laphroaig-28-year-old-whisky-bottled-2018.html"],
  ],
).map((item) => ({ ...item, caskStrength: true, abvNote: item.age === 27 ? "2017년 3월 병입 27년 41.7%·700ml CS입니다. 다른 연도의27년 및 시장별 용량은 별도 확인이 필요합니다." : "2018 릴리즈 28년 44.4%·700ml CS입니다. 실물 라벨의 도수를 확인했으며 판매처 본문44% 오기는 따르지 않습니다." }));
