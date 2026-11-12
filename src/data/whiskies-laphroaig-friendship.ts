import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaigFriendshipWhiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.laphroaig.com/whiskies/friendship-cask-1-single-cask-islay-whisky" },
  [
    ["laphroaig-friendship-cask-1", "라프로익 프렌드십 캐스크 #1 12년", "Laphroaig Friendship Cask 1 12 Year Old Cask 803978", 58.2, 12,
      ["피트", "스모키", "셰리", "초콜릿", "베리", "우디"],
      "Friends of Laphroaig 전용 프렌드십 시리즈의 첫 싱글 캐스크. 캐스크 803978의 퍼스트 필 셰리 혹스헤드에서 전 기간 12년 숙성했으며 312병 한정입니다. 향미는 공식 노트를 요약했습니다.",
      "감칠맛 있는 훈연 햄과 초콜릿을 입힌 체리에 풍부한 나무 향이 겹칩니다.",
      "진하고 스모키하며 복합적인 풍미. 캐스크의 나무 풍미와 훈연 햄, 과즙 풍부한 체리가 이어집니다.",
      "힘 있고 톡톡 튀는 감각과 함께 연기가 혀를 자극하며 오래 남습니다."],
    ["laphroaig-friendship-cask-2", "라프로익 프렌드십 캐스크 #2 18년", "Laphroaig Friendship Cask 2 18 Year Old Cask 5", 50.8, 18,
      ["피트", "스모키", "열대과일", "바닐라"],
      "Friends of Laphroaig 전용 시리즈의 두 번째 싱글 캐스크. 2008년 1월 증류한 원액을 캐스크 5의 퍼스트 필 버번 배럴에서 18년 숙성했습니다. 실물 라벨에 192병 한정으로 표기돼 있습니다. 향미는 공식 노트를 요약했습니다.",
      "열대과일 같은 달콤함에서 연기와 바닐라로 이어집니다.",
      "시럽 같은 달콤함에 캐러멜화한 파인애플과 신선한 망고, 연기가 겹치며 힘 있는 풍미를 이룹니다.",
      "점성 있게 입안을 감싸다가 마지막에 연기가 강하게 치고 올라옵니다.",
      "https://www.laphroaig.com/friendship-cask-2-single-cask"],
  ],
).map((item) => ({ ...item, abvNote: item.age === 12 ? "프렌드십#1 캐스크803978, 58.2%·700ml입니다. CS 여부는 추가 확인 중이며 정확한 증류 연월은 기재하지 않습니다." : "프렌드십#2 캐스크5, 50.8%·700ml입니다. 생산자가 18년 숙성을 명시했으며 CS 여부는 추가 확인 중입니다." }));
