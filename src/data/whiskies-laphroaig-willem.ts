import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaigWillemWhiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.laphroaig.com/whiskies/willem-dafoe-limited-edition" },
  [["laphroaig-willem-dafoe-14", "라프로익 윌렘 대포 14년 한정판", "Laphroaig Willem Dafoe 14 Year Old Limited Edition", 53.7, 14,
    ["피트", "스모키", "바다·소금", "스파이시", "셰리"],
    "윌렘 대포와 시니어 블렌더 사라 다울링이 함께 선택한 14년 싱글 몰트. 올로로소 셰리 캐스크에서 마무리했습니다. 생산자는 상세 시음 노트 대신 짧은 향미 안내를 제공하며, 아래 내용은 그 안내를 요약했습니다.",
    "공식 안내는 깊고 뚜렷한 피트 연기를 강조하며, 별도의 상세 노즈는 공개하지 않습니다.",
    "바다 소금과 향신료, 부드러운 단맛이 어우러지는 풍미.",
    "길고 스모키하며 군침 도는 여운."]],
).map((item) => ({ ...item, abvNote: "공식 실물 라벨의 53.7%·700ml와 생산자의 14년 숙성 설명을 확인했습니다. CS 여부는 추가 확인 중입니다." }));
