import type { Whisky } from "./types.ts";

// Additional releases are separate records so every batch keeps its own facts and links.
export const scotchBatchWhiskies: Whisky[] = [
  {
    id: "glenallachie-10-cask-strength-batch-12",
    name: "글렌알라키 10년 캐스크 스트렝스 배치 12",
    englishName: "The GlenAllachie 10 Year Old Cask Strength Batch 12",
    brand: "The GlenAllachie",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "스페이사이드",
    abv: 59.7,
    age: 10,
    caskStrength: true,
    // Tasting reference: https://whiskyinternationalonline.com/products/glenallachie-10-year-old-cask-strength-batch-12-59-7
    abvNote:
      "배치 12의 병입 도수 59.7%입니다. 다른 배치의 도수와 향미는 다를 수 있습니다.",
    tags: ["셰리", "초콜릿", "꿀", "건과일", "견과류", "스파이시"],
    description:
      "PX·올로로소 셰리와 레드 와인, 버진 오크 캐스크를 조합한 10년 숙성 배치 12. 모카와 무화과 시럽, 헤이즐넛의 향에 체리와 토피의 달콤함이 더해집니다.",
    notes: {
      nose: "모카와 무화과 시럽, 구운 헤이즐넛, 벌집 꿀과 말린 붉은 베리",
      palate: "제빵 향신료와 브랜디에 절인 체리, 토피 소스와 초콜릿 케이크",
      finish: "당밀과 자두가 남기는 짙은 과일 여운",
    },
    image: "",
    color: "#f0e3d7",
    source:
      "https://theglenallachie.com/wp-content/uploads/2025/08/Bar-Menu-August-2025.pdf",
  },
  {
    id: "laphroaig-10-cask-strength-batch-16",
    name: "라프로익 10년 캐스크 스트렝스 배치 16",
    englishName: "Laphroaig 10 Year Old Cask Strength Batch 16",
    brand: "Laphroaig",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "아일라",
    abv: 58.5,
    age: 10,
    caskStrength: true,
    abvNote:
      "배치 16의 공식 병입 도수는 58.5%입니다. 배치마다 도수와 향미가 다릅니다.",
    tags: ["피트", "스모키", "바다·소금", "사과", "바닐라", "후추"],
    description:
      "그을린 버번 캐스크에서 10년 숙성한 원액을 희석하지 않고 병입한 배치 16. 조린 사과와 바닐라의 단맛에 바닷소금, 후추와 묵직한 피트 연기가 겹쳐집니다.",
    notes: {
      nose: "조린 사과와 캐러멜을 입힌 페이스트리, 곡물과 가죽, 바닐라",
      palate: "달콤한 향신료와 바닐라, 바닷소금과 바삭한 돼지 껍질, 갓 간 후추",
      finish:
        "오일리한 질감에 그을린 오크와 훈제 고등어, 소금과 은은한 향신료가 길게 남음",
    },
    image: "",
    color: "#e8ede3",
    source:
      "https://www.laphroaig.com/whiskies/10-year-old-cask-strength-batch-16",
  },
  {
    id: "bunnahabhain-12-cask-strength-2023",
    name: "부나하벤 12년 캐스크 스트렝스 2023",
    englishName: "Bunnahabhain 12 Year Old Cask Strength 2023 Edition",
    brand: "Bunnahabhain",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "아일라",
    abv: 60.1,
    age: 12,
    caskStrength: true,
    // Additional producer tasting reference: https://bunnahabhain.com/zh-us/blogs/news/top-5-gifts-for-whisky-connoisseurs-this-festive-season
    abvNote:
      "2023 에디션의 병입 도수 60.1%입니다. 출시 연도에 따라 도수와 향미가 달라집니다.",
    tags: ["셰리", "건과일", "견과류", "바다·소금", "바닐라", "과일"],
    description:
      "셰리 캐스크에서 숙성한 12년 CS의 세 번째 연간 에디션. 60.1% 원액 도수에 말린 과일과 견과류, 바닷소금의 풍미를 담았으며 핵과일과 무화과의 과일향이 두드러집니다.",
    notes: {
      nose: "말린 과일과 견과류, 셰리의 깊은 과일향",
      palate: "핵과일과 무화과의 진한 풍미, 바닷소금의 짭짤함",
      finish: "풍부하고 따뜻한 여운과 신선한 바닐라의 부드러운 단맛",
    },
    image: "",
    color: "#ebe3da",
    source:
      "https://bunnahabhain.com/blogs/blog/bunnahabhain-cask-strength-guide",
  },
];
