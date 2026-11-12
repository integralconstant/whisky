import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaigArchiveWhiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.laphroaig.com/whiskies/the-archive-collection" },
  [
    ["laphroaig-archive-36", "라프로익 아카이브 컬렉션 36년", "Laphroaig The Archive Collection 36 Year Old", 40.2, 36,
      ["피트", "열대과일", "꿀", "바닐라", "토피", "바다·소금"],
      "아카이브 컬렉션의 첫 제품으로 전 세계 400병 한정. 버번 아메리칸 오크 숙성 후 세컨드 필 올로로소 혹스헤드에서 마무리했으며 생산자가 캐스크 스트렝스로 명시했습니다. 향미는 공식 노트를 요약했습니다.",
      "꿀과 백도·망고에 진한 토피·바닐라·시더우드가 겹치며 윈터그린과 그을린 세이지·감초 뿌리가 은은합니다.",
      "오렌지와 열대과일의 달콤하고 상큼한 풍미. 입안을 감싸던 질감이 점차 드라이해집니다.",
      "따뜻하고 긴 여운에 피트와 입술에 남는 소금기가 드러납니다."],
    ["laphroaig-archive-38", "라프로익 아카이브 컬렉션 38년", "Laphroaig The Archive Collection 38 Year Old", 41.3, 38,
      ["피트", "스모키", "시트러스", "건과일", "캐러멜", "생강"],
      "1985년 증류한 아카이브 컬렉션의 두 번째 제품. 버번 아메리칸 오크에서 숙성한 뒤 올로로소 셰리로 시즈닝한 세컨드 필 유러피언 오크 버트에서 추가 숙성했습니다. 향미는 공식 노트를 요약했습니다.",
      "오렌지 제스트가 돋보이는 과일과 향신료의 조화.",
      "말린 살구와 건포도에서 진한 솔티드 캐러멜로 이어지며 설탕 입힌 생강의 알싸함이 남습니다.",
      "라프로익 특유의 연기가 돌아오며 군침 도는 감각과 오래 남는 달콤함이 균형을 이룹니다.",
      "https://www.laphroaig.com/whiskies/the-archive-collection-2"],
  ],
).map((item) => ({ ...item, ...(item.age === 36 ? { caskStrength: true } : {}), abvNote: item.age === 36 ? "아카이브 컬렉션 36년 40.2%·700ml CS입니다. 월 컬렉션 36년과 구분합니다." : "아카이브 컬렉션 38년 41.3%·700ml입니다. CS 여부는 확인 중이며 병입 연도는 특정하지 않습니다." }));
