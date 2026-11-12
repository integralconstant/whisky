import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaigJeWhiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://dailyshot.co/m/item/37491" },
  [["laphroaig-je-2015-10-refill", "제임스 에디 라프로익 2015 10년 리필 배럴", "James Eadie Laphroaig 2015 10 Year Old Refill Barrels", 52.3, 10,
    ["피트", "스모키", "시트러스", "바닐라", "꿀"],
    "제임스 에디가 병입한 라프로익 2015 빈티지 10년입니다. 리필 배럴 3개에서 숙성한 원액으로 2026년에 총 998병을 출시했습니다. 실물 라벨의 증류소·병입자·10년·52.3%·700ml를 대조했습니다. 향미는 해당 데일리샷 상품의 안내를 요약했습니다.",
    "감귤류 향에 피트와 바다 내음이 어우러집니다.",
    "바닐라와 꿀의 달콤함에 연기 풍미가 겹칩니다.",
    "훈연 풍미와 약간의 산미가 긴 여운을 남깁니다."]],
).map((item) => ({ ...item, caskStrength: true, abvNote: "2015 빈티지·2026 병입, 10년·52.3%·700ml입니다. Whizita의 해당 제품 사양에서 캐스크 스트렝스를 명시합니다." }));
