import type { Whisky } from "./types.ts";

export const laphroaigTravelWhiskies: Whisky[] = [
  {
    id: "laphroaig-12-global-travel-exclusive",
    name: "라프로익 12년 글로벌 트래블 익스클루시브",
    englishName: "Laphroaig 12 Year Old Global Travel Exclusive",
    brand: "Laphroaig",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "아일라",
    abv: 46,
    age: 12,
    caskStrength: false,
    abvNote: "46%·700ml의 면세 전용 12년 제품입니다.",
    tags: [
      "피트",
      "스모키",
      "바다·소금",
      "사과",
      "꿀",
      "바닐라",
      "빵·비스킷",
      "견과류",
      "시트러스",
      "베리",
      "핵과일",
      "허브",
    ],
    description:
      "아메리칸 오크 버번 캐스크에서 12년 숙성한 면세 전용 싱글 몰트. 냉각 여과와 색소 첨가 없이 46%로 병입하며, 바다 향과 피트 연기에 과일과 바닐라가 겹칩니다.",
    notes: {
      nose: "바닷소금과 해초, 조린 청사과와 헤더 꿀에 바닐라·페이스트리·헤이즐넛, 말린 오렌지 껍질과 피트의 잔불",
      palate:
        "약품을 연상시키는 향과 소금기 있는 해초, 모닥불에 블랙커런트·핵과일·타임·감초",
      finish:
        "달콤하고 강렬한 감칠맛에 요오드와 기름진 고등어를 떠올리게 하는 여운",
    },
    image: "",
    color: "#e8ede3",
    source: "https://www.laphroaig.com/global-travel-retail/12-year-old",
  },
  {
    id: "laphroaig-px-cask",
    name: "라프로익 PX 캐스크",
    englishName: "Laphroaig PX Cask",
    brand: "Laphroaig",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "아일라",
    abv: 48,
    age: null,
    caskStrength: false,
    abvNote: "48% 제품이며 연결된 데일리샷 가격은 1L 기준입니다.",
    tags: ["피트", "스모키", "셰리", "건과일", "우디"],
    description:
      "버번 배럴과 쿼터 캐스크를 거쳐 페드로 히메네즈 셰리 버트에서 마무리한 아일라 싱글 몰트. 라프로익의 피트 연기에 건포도와 감초의 단향, 진한 셰리와 오크 풍미가 겹쳐집니다.",
    notes: {
      nose: "술타나와 건포도, 감초의 달콤한 향과 연기",
      palate: "피트 연기와 겹겹의 오크, 달콤하고 묵직한 셰리",
      finish: "짙은 피트 연기와 셰리 오크가 길게 남는 드라이한 여운",
    },
    image: "",
    color: "#e8ede3",
    source: "https://www.laphroaig.com/global-travel-retail/px-cask",
  },
];
