import type { Whisky } from "./types.ts";

// Sources checked 2026-10-03. Russell's notes are from the producer's 2025
// release announcement; the generic current US page now describes 2026.
export const moreCsAmericaWhiskies: Whisky[] = [
  {
    id: "russells-reserve-13-barrel-proof-2025",
    name: "러셀 리저브 13년 배럴 프루프 2025",
    englishName: "Russell's Reserve 13 Year Old Barrel Proof Spring 2025",
    brand: "Russell's Reserve",
    category: "버번",
    country: "미국",
    region: "켄터키",
    abv: 61.9,
    age: 13,
    caskStrength: true,
    abvNote:
      "2025년 봄 릴리스의 123.8프루프(61.9%) 기준입니다. 이전 114.8프루프 제품 및 2026 릴리스와 도수가 다릅니다.",
    tags: ["바닐라", "캐러멜", "핵과일", "스파이시", "오크", "후추"],
    description:
      "에디 러셀이 선별한 13년 이상 숙성 원액을 냉각 여과 없이 병입한 2025년 봄 한정 버번. 기존 13년 제품에서 이어지는 짙은 과일과 흑설탕에 콜라와 당밀의 단맛을 더했으며, 릴리스별 도수와 생산 시즌을 라벨에 표시합니다.",
    notes: {
      nose: "바닐라·캐러멜·흑설탕에 체리, 정향과 육두구",
      palate:
        "콜라와 당밀, 짙은 과일에서 과일 파이와 버터크림으로 이어지는 단맛",
      finish: "숙성 오크와 그을린 나무, 오크 향신료와 검은 후추가 길게 남음",
    },
    image: "",
    color: "#ecddc4",
    source:
      "https://www.prnewswire.com/news-releases/russells-reserve-announces-the-highly-anticipated-return-of-its-13-year-old-limited-release-bourbon-302482376.html",
  },
  {
    id: "old-forester-single-barrel-barrel-strength",
    name: "올드 포레스터 싱글 배럴 배럴 스트렝스",
    englishName: "Old Forester Single Barrel Barrel Strength",
    brand: "Old Forester",
    category: "버번",
    country: "미국",
    region: "켄터키",
    abv: 62,
    abvRange: [62, 68],
    age: null,
    caskStrength: true,
    abvNote:
      "62–68%는 데일리샷 공용 상품의 표기 범위입니다. 배럴마다 실제 도수가 달라 병 라벨을 확인해야 하며, 도수 정렬에는 범위의 하한을 사용합니다.",
    tags: ["핵과일", "사과", "오크", "견과류", "캐러멜", "후추"],
    description:
      "하나의 배럴을 원래 도수로 병입하는 올드 포레스터의 싱글 배럴 버번. 생산자 웹사이트에서는 Barrel Proof로 소개하며, 100프루프 싱글 배럴과 구분됩니다. 아래 향미는 데일리샷 판매 페이지의 참고 노트이며 실제 맛과 도수는 선택한 배럴마다 달라집니다.",
    // The official product page does not publish universal tasting notes.
    // Retailer reference notes and ABV range: https://dailyshot.co/m/item/15352
    notes: {
      nose: "체리 시럽과 사과, 오크의 향",
      palate: "피칸과 짙은 오크에 블랙 체리·가죽을 연상시키는 풍미",
      finish: "캐러멜과 후추에 쌉쌀함이 더해지는 여운; 배럴별 차이 있음",
    },
    image: "",
    color: "#dce4ed",
    source:
      "https://www.oldforester.com/products/old-forester-single-barrel-barrel-proof/",
  },
  {
    id: "stellum-bourbon",
    name: "스텔럼 버번",
    englishName: "Stellum Bourbon",
    brand: "Stellum",
    category: "버번",
    country: "미국",
    region: "인디애나·켄터키·테네시",
    abv: 57.49,
    age: null,
    caskStrength: true,
    tags: ["스파이시", "견과류", "사과", "바닐라", "후추", "꿀"],
    description:
      "호밀 비중이 높은 두 가지 레시피와 옥수수 중심 레시피의 인디애나 버번을 바탕으로 켄터키·테네시의 오래 숙성한 원액을 단계적으로 더한 캐스크 스트렝스 버번. 달콤한 입맛 뒤에 후추와 과일의 산뜻함이 이어집니다.",
    notes: {
      nose: "정향과 올스파이스, 마카다미아와 가벼운 담뱃잎, 청사과·천도복숭아",
      palate:
        "바닐라와 마시멜로의 단맛에서 후추·계피 사과, 블랙베리·살구로 전개",
      finish: "설탕에 절인 생강과 검은 후추가 잦아들며 꿀의 단맛이 남음",
    },
    image: "",
    color: "#dbe9ed",
    source: "https://www.stellum.com/bourbon",
  },
];
