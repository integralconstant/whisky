import type { Whisky } from "./types.ts";
import { laphroaigIanHunterWhiskies } from "./whiskies-laphroaig-ian-hunter.ts";

// These verified market sizes share the expression guidance, not a claimed tasting
// of the photographed bottle. Keep the existing 700ml entries unchanged.
const sources: Record<number, string> = {
  3: "https://www.oaksliquors.com/p/laphroaig-the-ian-hunter-story-book-3-source-protector-33-year-old",
  4: "https://www.oaksliquors.com/p/laphroaig-the-ian-hunter-story-book-4-malt-master-34-year-old-single-malt-scotch-whisky",
  5: "https://www.oaksliquors.com/p/laphroaig-34-years-old-ian-hunter-book-5-enduring-spirit",
};

export const laphroaigIanUsWhiskies: Whisky[] = [3, 4, 5].map((book) => {
  const item = laphroaigIanHunterWhiskies.find((entry) => entry.id === `laphroaig-ian-hunter-book-${book}`)!;
  return {
    ...item,
    id: `${item.id}-750`,
    name: `${item.name} 750ml`,
    englishName: `${item.englishName} 750ml`,
    tags: [...item.tags],
    notes: { ...item.notes },
    description: `${item.description} 실물 병에서 북 ${book}·${item.age}년·${item.abv}%·750ml를 확인한 시장별 용량입니다. 향미는 해당 권의 공통 안내이며 사진 속 병의 개별 시음 기록은 아닙니다.`,
    source: sources[book],
    abvNote: `북 ${book}의 ${item.abv}%·750ml 제품입니다. 기존 700ml와 구분합니다.${book === 3 ? " 북 3의 CS 분류는 해당 릴리즈의 명시된 제품 정보에 따릅니다." : " 캐스크 스트렝스 여부는 도수만으로 추정하지 않습니다."}`,
  };
});
