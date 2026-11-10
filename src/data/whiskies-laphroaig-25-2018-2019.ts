import type { Whisky } from "./types.ts";
import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig25OlderWhiskies: Whisky[] = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.whiskynotes.be/2019/laphroaig/laphroaig-25-years-2018/" },
  [
    ["laphroaig-25-cask-strength-2018", "라프로익 25년 캐스크 스트렝스 2018", "Laphroaig 25 Year Old Cask Strength 2018 Edition", 52, 25,
      ["피트", "스모키", "과일", "시트러스", "후추", "커피", "꿀"],
      "25년 숙성 후 52% 캐스크 스트렝스로 병입한 2018년 에디션. 아래 향미는 WhiskyNotes의 해당 연도 시음 기록을 요약했습니다.",
      "미네랄과 재의 향에 자몽·라임·구운 파인애플이 겹치며 버터와 바닷바람이 느껴집니다.",
      "민트 같은 연기와 약품 향, 레몬·자몽·소금물·으깬 후추, 그을린 오크가 이어집니다.",
      "그을린 풀과 식은 연기, 볶은 커피와 꿀을 머금은 과일이 길게 남습니다."],
    ["laphroaig-25-cask-strength-2019", "라프로익 25년 캐스크 스트렝스 2019", "Laphroaig 25 Year Old Cask Strength 2019 Edition", 51.4, 25,
      ["피트", "스모키", "시트러스", "과일", "바닐라", "스파이시"],
      "25년 숙성 후 51.4% 캐스크 스트렝스로 병입한 2019년 에디션. 아래 향미는 Whisky Saga의 해당 연도 시음 기록을 요약했습니다.",
      "피트와 나무 연기 사이로 감귤류·과수원 과일·바닐라와 구운 빵 껍질이 느껴집니다.",
      "묵직한 질감에 피트 연기가 먼저 드러나고 바닐라·생강·계피가 이어집니다.",
      "피트와 그을음·재가 이어지며 과일과 설탕의 단맛이 길게 남습니다.",
      "https://www.whiskysaga.com/blog/laphroaig-25-yo-cask-strength-edition-2019"],
  ],
).map((item) => ({ ...item, caskStrength: true, abvNote: `${item.id.slice(-4)}년 ${item.abv}%·700ml 에디션입니다. 연도별 도수가 다른 25년 CS와 구분합니다.` }));
