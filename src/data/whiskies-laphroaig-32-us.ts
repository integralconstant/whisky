import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig32UsWhiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://whisky.auction/auctions/lot/177341/laphroaig-32-year-old-limited-edition" },
  [["laphroaig-32-2015-us", "라프로익 32년 2015 미국용 46.7% 750ml", "Laphroaig 32 Year Old 2015 US Bottling 46.7% 750ml", 46.7, 32,
    ["피트", "스모키", "셰리", "열대과일", "건과일", "배", "꿀", "견과류", "시트러스"],
    "200주년 기념 32년 한정판의 미국용 사양. 올로로소 셰리 캐스크에서 숙성해 2015년 5월 병입했으며 실물 라벨의 46.7%·750ml·CS를 확인했습니다. 향미는 Cigar Aficionado의 2015년 46.7%·750ml 직접 시음 기록을 요약했습니다.",
    "가벼운 피트에 망고·건포도·배와 섬세한 과일, 꿀과 쿠키 반죽·향신료가 겹칩니다. 연기는 멀리 있는 모닥불처럼 은은합니다.",
    "감초·대추야자·아몬드·포도에 프랄린과 레몬·만다린의 섬세한 단맛이 이어지며 피트와 진한 감칠맛이 드러납니다.",
    "연기에 이어 감귤류·견과류·향신료가 반복해 드러나는 여운."]],
).map((item) => ({ ...item, caskStrength: true, abvNote: "2015년 5월 미국용 46.7%·750ml CS입니다. 기존 46.6%·700ml와 도수·용량·사진을 구분합니다." }));
