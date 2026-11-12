import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig2728UsWhiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.oaksliquors.com/p/laphroaig-27-year-old-double-matured-2017-limited-edition" },
  [
    ["laphroaig-27-2017-us", "라프로익 27년 2017 릴리즈 750ml", "Laphroaig 27 Year Old 2017 Release 750ml", 41.7, 27,
      ["피트", "스모키", "열대과일", "견과류", "바닐라", "시트러스", "가죽", "담배"],
      "2017년 3월 병입한 27년 한정판의 41.7%·750ml 제품입니다. 리필 호그스헤드 숙성 뒤 퍼스트 필 버번 배럴과 리필 쿼터 캐스크에서 추가 숙성했습니다. 실물 라벨에서 연산·도수·용량·병입월·CS를 확인했습니다. 향미는 The Whiskey Wash가 소개한 출시 당시 공식 안내를 요약했습니다.",
      "잘 익은 열대과일 디저트에 구운 마카다미아와 바닐라 크림을 더한 듯한 향.",
      "피트 연기를 라임과 넥타린이 감싸고, 바다 소금과 부드러운 칠리 풍미로 이어집니다.",
      "오래된 가죽과 풋담뱃잎의 풍미가 남습니다."],
    ["laphroaig-28-2018-us", "라프로익 28년 2018 릴리즈 750ml", "Laphroaig 28 Year Old 2018 Release 750ml", 44.4, 28,
      ["피트", "셰리", "캐러멜", "바닐라", "후추", "오크", "건과일", "열대과일"],
      "2018년 28년 한정판의 44.4%·750ml 제품입니다. 쿼터 캐스크·버번 배럴·올로로소 셰리 버트 숙성 원액을 모아 마지막 12개월을 셰리 버트에서 함께 숙성했습니다. 실물 라벨의 28년·44.4%·750ml·CS를 대조했습니다. 향미는 Distiller의 Jake Emen 직접 시음 기록을 요약했습니다.",
      "소금 캐러멜에 해조류·요오드·바닐라 커스터드와 진한 호밀빵 향이 겹칩니다.",
      "조개껍데기와 요오드의 해안 풍미가 두드러지고, 후추·구두약·떫은 오크 뒤로 대추야자·건포도·열대과일과 크림이 드러납니다.",
      "따뜻하고 부드럽게 감싸는 여운이 길게 이어집니다.",
      "https://www.oaksliquors.com/p/laphroaig-limited-edition-28-year-old-single-malt-scotch-whisky"],
  ],
).map((item) => ({ ...item, caskStrength: true, abvNote: `${item.age}년·${item.abv}%·750ml CS 제품입니다. 기존 700ml와 용량을 구분하며 다른 용량의 가격을 연결하지 않습니다.` }));
