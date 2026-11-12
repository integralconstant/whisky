import type { Whisky } from "./types.ts";
import { laphroaigIanHunterWhiskies } from "./whiskies-laphroaig-ian-hunter.ts";

// These US-size bottles are independently photographed. They reuse only the
// shared expression guidance from the existing 700ml records.
const sources: Record<number, string> = {
  1: "https://www.klwines.com/products/details/1454377",
  2: "https://www.liquormarts.ca/product/laphroaig-ian-hunter-book-2-30-yo-islay-single-malt-scotch-whisky/750-ml",
};

export const laphroaigIan12UsWhiskies: Whisky[] = [1, 2].map((book) => {
  const item = laphroaigIanHunterWhiskies.find(
    (entry) => entry.id === `laphroaig-ian-hunter-book-${book}`,
  )!;
  return {
    ...item,
    id: `${item.id}-750`,
    name: `${item.name} 750ml`,
    englishName: `${item.englishName} 750ml`,
    tags: [...item.tags],
    notes: { ...item.notes },
    description: `${item.description} 실물 병에서 북 ${book}·${item.age}년·${item.abv}%·750ml를 확인한 시장별 용량입니다. 향미는 해당 권의 공통 안내이며 사진 속 병의 개별 시음 기록은 아닙니다.`,
    source: sources[book],
    abvNote: `북 ${book}의 ${item.abv}%·750ml 제품입니다. 기존 700ml와 구분합니다.${book === 1 ? " 북 1의 CS 분류는 해당 릴리즈의 명시된 제품 정보에 따릅니다." : " 캐스크 스트렝스 여부는 도수만으로 추정하지 않습니다."}`,
  };
});
