import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaig21FolWhiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://whisky.auction/auctions/lot/221177/laphroaig-21-year-old" },
  [["laphroaig-21-fol-2015", "라프로익 21년 FoL 21주년 2015 350ml", "Laphroaig 21 Year Old Friends of Laphroaig 21st Anniversary 2015 350ml", 48.4, 21,
    ["피트", "스모키", "열대과일", "바닐라", "민트", "계피", "생강", "바다·소금"],
    "Friends of Laphroaig 출범 21주년을 기념해 2015년 출시한 350ml 한정판. 퍼스트 필 버번 캐스크에서 숙성했습니다. 실물 라벨의 48.4%와 기념 문구를 확인했으며 향미는 WhiskyNotes의 같은 도수·용량 제품 직접 시음 기록을 요약했습니다.",
    "부드러운 피트와 은은한 약품 향에 파인애플·멜론·망고, 민트·계피·바닐라가 겹칩니다. 아마인유와 약간의 가죽·해조류 향도 느껴집니다.",
    "성숙하고 매끄러운 과일 풍미에 망고·살구·신선한 감귤류가 이어집니다. 향보다 피트 연기와 오크 향신료가 강하며 감초·요오드·타르·생강이 드러납니다.",
    "중간 이상 길이의 여운에 꿀을 닮은 단맛과 재, 약간의 바다 소금과 말린 해조류가 남습니다."]],
).map((item) => ({ ...item, abvNote: "2015년FoL21주년 48.4%·350ml입니다. 사진의 라벨을 기준으로48.5%라고 소개한 일부 리뷰와 구분하며 CS 여부는 추가 확인 중입니다." }));
