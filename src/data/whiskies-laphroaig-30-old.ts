import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig30OldWhiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.whiskyfun.com/2023/Feis-Ile-Special-today-Laphroaig.html" },
  [["laphroaig-30-old-43", "라프로익 30년 구형 43% 750ml", "Laphroaig 30 Year Old Old Bottling 43% 750ml", 43, 30,
    ["피트", "스모키", "열대과일", "시트러스", "건과일", "담배", "셰리"],
    "구형 라벨의 30년 공식 병입 제품. 실물 사진의 43%·75cl를 확인했으며 병입 연도는 특정하지 않았습니다. 향미는 Whiskyfun의 43%·75cl 시음 기록을 요약한 것으로 구형 배치에 따라 차이가 있을 수 있습니다.",
    "열대과일과 부드러운 약품 향, 섬세한 피트 연기에 훈연 차와 자몽 껍질이 어우러집니다.",
    "셰리의 진한 과일 풍미에 건포도와 무화과, 왁스 같은 질감과 짭짤한 흙내·담배가 겹칩니다.",
    "따뜻하고 긴 여운에 마른 피트 연기와 후추, 요오드와 열대과일 차가 남습니다."]],
).map((item) => ({ ...item, abvNote: "구형 43%·750ml입니다. 2016년 53.5% CS와 2024년 30년 제품들과 구분하며 병입 연도는 미확인입니다." }));
