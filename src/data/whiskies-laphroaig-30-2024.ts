import type { Whisky } from "./types.ts";
import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig30Year2024Whiskies: Whisky[] = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.laphroaig.com/whiskies/30-year-old-cask" },
  [
    ["laphroaig-30-2024", "라프로익 30년 2024 릴리즈", "Laphroaig 30 Year Old 2024 Release", 45.8, 30,
      ["피트", "스모키", "시트러스", "바닐라", "토피", "허브", "후추"],
      "아메리칸 오크 배럴과 유러피언 셰리 혹스헤드·버트에서 숙성한 연례 소량 생산 시리즈의 첫 제품. 2024 릴리즈이며 생산자가 명시한 45.8% 고정 도수입니다. 향미는 공식 노트를 요약했습니다.",
      "오렌지와 레몬 껍질의 상큼함, 바닐라 커스터드와 당밀 토피의 달콤한 과일 향.",
      "베르가모트·달콤한 페이스트리·신선한 타임과 백후추의 섬세한 풍미.",
      "서서히 타오르는 피트 연기와 그을음 묻은 모닥불 같은 여운."],
    ["laphroaig-30-fol-anniversary-2024", "라프로익 30년 FoL 30주년 기념판 2024", "Laphroaig 30 Year Old Friends of Laphroaig Anniversary Edition 2024", 45.9, 30,
      ["피트", "스모키", "허브", "시트러스", "견과류", "바닐라", "코코넛"],
      "Friends of Laphroaig 출범 30주년을 기념한 1994 증류·2024 병입 제품. 리필 아메리칸 오크 버번 혹스헤드에서 숙성해 45.9% 캐스크 스트렝스로 병입했습니다. 향미는 공식 노트를 요약했습니다.",
      "허브와 풀, 레몬 셔벗 같은 나무 연기에 캐슈넛·잘 익은 허니듀 멜론이 겹칩니다. 물을 더하면 크리미한 바닐라·레몬그라스·감귤 향이 드러납니다.",
      "풀과 허브를 닮은 연기, 멘톨의 청량감에 레몬꽃·바닐라 크림·코코넛이 이어집니다.",
      "랍상소우총 찻잎과 감귤 향, 달콤한 과일과 피트가 강렬하고 길게 남습니다.",
      "https://www.laphroaig.com/whiskies/30-year-old-anniversary-fol-limited-edition"],
  ],
).map((item) => ({ ...item, ...(item.abv === 45.9 ? { caskStrength: true } : {}), abvNote: item.abv === 45.9 ? "1994/2024 FoL 30주년 기념판 45.9%·700ml CS입니다. 연례판 45.8%와 구분합니다." : "2024 릴리즈 45.8%·700ml입니다. 생산자가 고정 도수로 명시한 제품으로 FoL 기념판 CS와 구분합니다." }));
