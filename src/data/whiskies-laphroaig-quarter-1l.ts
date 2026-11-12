import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaigQuarter1lWhiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.finedrams.com/laphroaig-quarter-cask-1-liter-.html" },
  [["laphroaig-quarter-cask-1l", "라프로익 쿼터 캐스크 1L", "Laphroaig Quarter Cask 1L", 48, null,
    ["피트", "스모키", "바닐라", "코코넛", "열대과일", "스파이시"],
    "버번 배럴 숙성 뒤 작은 아메리칸 오크 쿼터 캐스크에서 추가 숙성한 제품의 48%·1L 규격입니다. 병과 원통 포장의 1 Litre·48% 표기를 확인했습니다. 숙성 연수가 표시되지 않는 NAS이며, 향미는 생산자가 안내하는 쿼터 캐스크의 공통 특성입니다. 기존 700ml와 용량이 다릅니다.",
    "그을리는 피트 향에 코코넛과 바나나가 어우러집니다.",
    "깊고 복합적인 연기 풍미 사이로 부드러운 단맛이 드러납니다.",
    "연기와 향신료가 오래 이어지며 점차 드라이해집니다."]],
).map((item) => ({ ...item, abvNote: "48%·1L NAS 제품입니다. 작은 캐스크 숙성이나 48% 도수만으로 캐스크 스트렝스로 분류하지 않습니다." }));
