import type { Whisky } from "./types.ts";

// Batch-specific specifications and tasting notes are checked against the linked producer pages.
export const csScotchWhiskies: Whisky[] = [
  {
    id: "glenfarclas-105",
    name: "글렌파클라스 105 캐스크 스트렝스",
    englishName: "Glenfarclas 105 Cask Strength",
    brand: "Glenfarclas",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "스페이사이드",
    abv: 60,
    age: null,
    caskStrength: true,
    abvNote:
      "숙성 연수 미표기 105 제품의 도수입니다. 105는 영국식 프루프 표기에서 유래합니다.",
    tags: ["셰리", "사과", "배", "토피", "스파이시"],
    description:
      "60%로 병입한 글렌파클라스의 대표 캐스크 스트렝스. 사과와 배, 진한 토피의 단맛에 셰리 과일과 오크 향신료가 풍부하게 이어집니다.",
    notes: {
      nose: "오크, 사과와 배, 진한 토피의 단향",
      palate: "드라이한 시작에서 풍부한 향신료와 오크, 셰리 과일로 전개",
      finish: "부드럽고 따뜻하며 은은한 연기와 긴 여운",
    },
    image: "",
    color: "#eee3d8",
    source: "https://glenfarclas.com/whisky/105-cask-strength/",
  },
  {
    id: "aberlour-abunadh",
    name: "아벨라워 아부나흐 캐스크 스트렝스",
    englishName: "Aberlour A'bunadh Cask Strength",
    brand: "Aberlour",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "스페이사이드",
    abv: 60.9,
    age: null,
    caskStrength: true,
    // Official market reference: https://pernod-ricard-croatia.com/proizvodi/%C5%A1kotski-viski-blended/aberlour
    abvNote:
      "60.9%는 페르노리카 크로아티아 공식 제품 안내의 예시 도수입니다. 실제 도수와 라벨은 배치마다 다릅니다.",
    tags: ["셰리", "초콜릿", "시트러스", "스파이시", "견과류"],
    description:
      "창업자 제임스 플레밍에게 바치는 아벨라워의 CS 표현. 진한 셰리 풍미와 검은 체리, 다크 초콜릿을 담으며 배치마다 다른 원액 도수로 병입합니다.",
    notes: {
      nose: "향신료, 프랄린과 향신료를 곁들인 오렌지",
      palate: "검은 체리와 생강, 진한 다크 초콜릿",
      finish: "오크가 살짝 남는 길고 균형 잡힌 여운",
    },
    image: "",
    color: "#efe1d9",
    source: "https://www.aberlour.com/en/our-whisky/abunadh-scotch-whisky/",
  },
  {
    id: "aberlour-abunadh-alba",
    name: "아벨라워 아부나흐 알바 캐스크 스트렝스",
    englishName: "Aberlour A'bunadh Alba Cask Strength",
    brand: "Aberlour",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "스페이사이드",
    abv: 62.7,
    age: null,
    caskStrength: true,
    // Official market reference: https://pernod-ricard-croatia.com/proizvodi/%C5%A1kotski-viski-blended/aberlour
    abvNote:
      "62.7%는 페르노리카 크로아티아 공식 제품 안내의 예시 도수입니다. 실제 도수와 라벨은 배치마다 다릅니다.",
    tags: ["사과", "배", "바닐라", "꿀", "견과류", "크리미"],
    description:
      "아메리칸 오크에서 숙성한 아부나흐 알바. 사과와 바닐라의 밝은 단맛, 크리미한 질감에 구운 아몬드가 어우러지며 원액 도수로 병입합니다.",
    notes: {
      nose: "달콤한 사과와 배, 꿀과 바닐라",
      palate: "시트러스와 구운 사과, 가벼운 아몬드",
      finish: "부드럽고 달콤하며 구운 아몬드가 남는 여운",
    },
    image: "",
    color: "#f1eadc",
    source:
      "https://www.aberlour.com/en/our-whisky/abunadh-alba-scotch-whisky/",
  },
  {
    id: "tamdhu-batch-strength-006",
    name: "탐두 배치 스트렝스 006",
    englishName: "Tamdhu Batch Strength No. 006",
    brand: "Tamdhu",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "스페이사이드",
    abv: 56.8,
    age: null,
    caskStrength: true,
    abvNote:
      "2021년 발표된 배치 006의 도수입니다. 다른 배치는 도수가 다릅니다.",
    tags: ["셰리", "견과류", "바닐라", "베리", "계피", "시트러스"],
    description:
      "올로로소 셰리 캐스크에서 전 기간 숙성한 탐두의 여섯 번째 배치 스트렝스. 높은 퍼스트필 캐스크 비중이 풍부한 베리와 견과류, 긴 셰리 풍미를 만듭니다.",
    notes: {
      nose: "상쾌한 오크 향신료, 볶은 견과류와 바닐라",
      palate: "여름 베리 푸딩과 커스터드 크림, 오렌지와 레몬",
      finish: "계피가 펼쳐지며 감귤 껍질과 잘 익은 무화과가 길게 남음",
    },
    image: "",
    color: "#eae4d9",
    source:
      "https://www.tamdhu.com/news/tamdhu-announces-sixth-edition-of-its-award-winning-batch-strength-series",
  },
  {
    id: "glenallachie-10-cask-strength-batch-13",
    name: "글렌알라키 10년 캐스크 스트렝스 배치 13",
    englishName: "The GlenAllachie 10 Year Old Cask Strength Batch 13",
    brand: "The GlenAllachie",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "스페이사이드",
    abv: 59.8,
    age: 10,
    caskStrength: true,
    abvNote: "배치 13의 공식 병입 도수입니다. 다른 배치는 도수가 다릅니다.",
    tags: ["셰리", "초콜릿", "꿀", "건과일", "스파이시"],
    description:
      "페드로 히메네스와 올로로소 셰리, 레드 와인, 버진 오크 캐스크를 조합한 10년 숙성 CS 배치. 진한 코코아와 꿀, 향신료에 붉은 과일의 풍미가 겹쳐집니다.",
    notes: {
      nose: "모카, 설탕 입힌 생강과 계피, 마누카 꿀",
      palate: "코코아, 소금 캐러멜과 꿀, 블러드 오렌지",
      finish: "달콤한 블랙베리와 무화과 시럽",
    },
    image: "",
    color: "#f1e6db",
    source:
      "https://theglenallachie.com/whisky/glenallachie-10-year-old-batch-13/",
  },
  {
    id: "laphroaig-10-cask-strength-batch-17",
    name: "라프로익 10년 캐스크 스트렝스 배치 17",
    englishName: "Laphroaig 10 Year Old Cask Strength Batch 17",
    brand: "Laphroaig",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "아일라",
    abv: 58.3,
    age: 10,
    caskStrength: true,
    abvNote:
      "배치 17의 도수 58.3%를 표시합니다. 배치마다 병입 도수가 다릅니다.",
    tags: ["피트", "스모키", "바다·소금", "사과", "바닐라"],
    description:
      "10년 숙성 원액에 물을 더하지 않고 병입한 배치 17. 달콤한 과일과 바닐라 뒤로 라프로익 특유의 해초, 바닷소금과 피트 연기가 선명하게 이어집니다.",
    notes: {
      nose: "설탕 입힌 사과, 크렘 브륄레와 달콤한 훈연",
      palate: "졸인 사과와 바닐라 크림, 배 시럽과 짭짤한 피트",
      finish: "긴 후추와 가죽의 여운, 풀 내음의 연기와 타르 같은 피트",
    },
    image: "",
    color: "#e8ede3",
    source:
      "https://www.laphroaig.com/en-gb/whiskies/10-year-old-cask-strength-batch-17",
  },
  {
    id: "bunnahabhain-12-cask-strength-2025",
    name: "부나하벤 12년 캐스크 스트렝스 2025",
    englishName: "Bunnahabhain 12 Year Old Cask Strength 2025 Edition",
    brand: "Bunnahabhain",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "아일라",
    abv: 56.4,
    age: 12,
    caskStrength: true,
    abvNote: "2025 에디션의 도수입니다. 출시 연도에 따라 도수가 달라집니다.",
    tags: ["셰리", "건과일", "견과류", "바다·소금", "몰트"],
    description:
      "퍼스트필·세컨드필·리필 올로로소 캐스크를 조합한 비피트 CS. 섬세한 셰리 풍미와 견과류, 말린 과일에 부나하벤의 해안 풍미가 어우러집니다.",
    notes: {
      nose: "황금 건포도와 살구, 볶은 견과류와 옅은 꽃향",
      palate: "달콤한 몰트, 부드러운 오크와 건과일, 헤이즐넛",
      finish: "오크 향신료와 담배, 가벼운 바닷소금과 코코아",
    },
    image: "",
    color: "#ebe6de",
    source:
      "https://bunnahabhain.com/products/12-year-old-cask-strength-2025-edition",
  },
  {
    id: "springbank-12-cask-strength-2026",
    name: "스프링뱅크 12년 캐스크 스트렝스 2026",
    englishName: "Springbank 12 Year Old Cask Strength 2026",
    brand: "Springbank",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "캠벨타운",
    abv: 56.6,
    age: 12,
    caskStrength: true,
    abvNote:
      "공식 2026 릴리스 기준 56.6%, 버번 캐스크 100%입니다. 다른 릴리스는 도수와 캐스크 구성이 다릅니다.",
    tags: ["시트러스", "스모키", "바다·소금", "초콜릿", "과일"],
    description:
      "버번 캐스크에서 숙성한 2026년 CS 릴리스. 미네랄과 짭짤한 연기 위로 자몽과 오렌지의 풍미, 부드러운 단맛이 이어지는 12년 몰트입니다.",
    notes: {
      nose: "흙과 미네랄, 말린 바나나, 그래놀라와 레몬 껍질",
      palate: "자몽 시럽, 오렌지 속껍질과 포멜로, 마시멜로",
      finish: "코코아 가루와 설탕 입힌 체리, 짭짤한 프레첼과 연기",
    },
    image: "",
    color: "#eae8dc",
    source: "https://www.springbank.scot/whisky/springbank-range/",
  },
];
