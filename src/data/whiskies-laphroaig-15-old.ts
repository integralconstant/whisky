import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig15OldWhiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.speysidewhiskyauctions.co.uk/lot-500658/laphroaig-15-years-old/" },
  [["laphroaig-15-old-43", "라프로익 15년 구형 43% 700ml", "Laphroaig 15 Year Old Old Bottling 43% 700ml", 43, 15,
    ["피트", "스모키", "바다·소금", "시트러스", "생강", "후추", "우디"],
    "200주년 기념 문구가 없는 구형 라벨의 15년 공식 병입. 실물 사진에서 43%·70cl를 확인했으며 정확한 병입 연도는 특정하지 않았습니다. 향미는 Words of Whisky의 구형 43% 제품 시음 기록을 요약했습니다. 시음한 병은 리뷰상 2006년판이며 사진의 병과 배치 차이가 있을 수 있습니다.",
    "소금기 있는 피트에 말린 해조류와 잦아드는 모닥불, 가벼운 레몬·감귤류와 커스터드·생강 향이 겹칩니다.",
    "묵직한 질감에 피트·고무·감초와 나무껍질, 약간 쌉쌀한 오렌지·흑후추·소금이 이어집니다.",
    "타르와 연기가 매우 길고 강하게 남으며 약간 드라이하고 쌉쌀하게 마무리됩니다."]],
).map((item) => ({ ...item, abvNote: "구형 15년 43%·700ml입니다. 병입 연도 미확인으로 2015년200주년판 및2026재출시판과 구분합니다." }));
