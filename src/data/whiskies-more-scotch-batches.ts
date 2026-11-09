import type { Whisky } from "./types.ts";

// Individual releases: keep their ABV, tasting notes, photograph and prices separate.
export const moreScotchBatchWhiskies: Whisky[] = [
  {
    id: "glenallachie-10-cask-strength-batch-7",
    name: "글렌알라키 10년 캐스크 스트렝스 배치 7",
    englishName: "The GlenAllachie 10 Year Old Cask Strength Batch 7",
    brand: "The GlenAllachie",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "스페이사이드",
    abv: 56.8,
    age: 10,
    caskStrength: true,
    abvNote: "10년 CS 배치 7의 병입 도수는 56.8%입니다.",
    tags: ["셰리", "꿀", "건과일", "초콜릿", "커피", "계피"],
    description:
      "PX·올로로소 셰리 펀천에 리오하 와인과 버진 오크 캐스크를 조합한 일곱 번째 배치. 헤더 꿀과 모카의 향, 다크 초콜릿과 무화과의 진한 단맛을 담았습니다.",
    notes: {
      nose: "헤더 꿀과 건과일, 계피·육두구 뒤로 오렌지 껍질과 모카·당밀",
      palate: "다크 초콜릿과 무화과, 헤더 꿀과 건포도의 풍부한 단맛",
      finish: "계피와 자두, 오렌지 제스트가 이어지는 여운",
    },
    image: "",
    color: "#ecdfd3",
    source:
      "https://theglenallachie.com/news/next-batch-of-revered-glenallachie-10-year-old-announced/",
  },
  {
    id: "glenallachie-10-cask-strength-batch-8",
    name: "글렌알라키 10년 캐스크 스트렝스 배치 8",
    englishName: "The GlenAllachie 10 Year Old Cask Strength Batch 8",
    brand: "The GlenAllachie",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "스페이사이드",
    abv: 57.2,
    age: 10,
    caskStrength: true,
    abvNote:
      "배치 8의 병입 도수는 57.2%입니다. 다른 배치와 도수·향미가 다릅니다.",
    tags: ["셰리", "초콜릿", "꿀", "건과일", "견과류", "스파이시"],
    description:
      "10년 숙성 원액을 캐스크 스트렝스로 담은 여덟 번째 배치. 모카와 호두, 건포도의 향에 꿀과 다크 초콜릿이 어우러지고 생강·육두구의 향신료가 이어집니다.",
    notes: {
      nose: "모카와 육두구, 호두 오일에 헤더 꿀·건포도·말린 붉은 베리",
      palate: "계피와 당밀, 벌집 꿀과 생강, 다크 초콜릿",
      finish: "육두구와 펜넬의 향신료 여운",
    },
    image: "",
    color: "#ecdfd3",
    source:
      "https://theglenallachie.com/news/glenallachie-rolls-out-third-batch-of-21-year-old/",
  },
  {
    id: "glenallachie-10-cask-strength-batch-9",
    name: "글렌알라키 10년 캐스크 스트렝스 배치 9",
    englishName: "The GlenAllachie 10 Year Old Cask Strength Batch 9",
    brand: "The GlenAllachie",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "스페이사이드",
    abv: 58.1,
    age: 10,
    caskStrength: true,
    abvNote:
      "배치 9의 병입 도수는 58.1%입니다. 다른 배치와 도수·향미가 다릅니다.",
    tags: ["셰리", "초콜릿", "꿀", "과일", "견과류", "스파이시"],
    description:
      "PX·올로로소 셰리와 리오하 와인, 미국산 버진 오크 캐스크를 조합한 배치 9. 붉은 베리와 헤이즐넛의 향에서 다크 초콜릿과 모카, 자두·토피의 단맛으로 이어집니다.",
    // Producer notes transcribed by retailer: https://www.jpha.co.uk/products/glenallachie-10-year-old-cask-strength-batch-9
    notes: {
      nose: "잘 익은 붉은 베리와 헤이즐넛, 헤더 꿀에 과수원 과일과 계피·생강 과자",
      palate: "다크 초콜릿과 벌집 꿀, 캐러멜화한 설탕, 당밀·모카·생강",
      finish: "자두와 토피의 달콤한 여운",
    },
    image: "",
    color: "#ecdfd3",
    source:
      "https://theglenallachie.com/wp-content/uploads/2024/01/VC-Menu-26.9.pdf",
  },
  {
    id: "glenallachie-10-cask-strength-batch-10",
    name: "글렌알라키 10년 캐스크 스트렝스 배치 10",
    englishName: "The GlenAllachie 10 Year Old Cask Strength Batch 10",
    brand: "The GlenAllachie",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "스페이사이드",
    abv: 58.6,
    age: 10,
    caskStrength: true,
    abvNote: "배치 10의 공식 출시 발표와 제품 라벨 기준 도수는 58.6%입니다.",
    tags: ["셰리", "초콜릿", "꿀", "시트러스", "건과일", "스파이시"],
    description:
      "PX·올로로소 셰리와 레드 와인, 미국산 버진 오크 캐스크에서 숙성한 배치 10. 무화과와 모카, 오렌지 껍질의 향에 코코아·꿀과 체리의 풍미를 더했습니다.",
    notes: {
      nose: "벌집 꿀과 오렌지 제스트, 당밀·무화과 시럽·모카, 조린 과일과 계피",
      palate:
        "코코아와 헤더 꿀, 제빵 향신료, 말린 붉은 베리와 초콜릿 체리 케이크",
      finish: "마라스키노 체리와 아니스의 여운",
    },
    image: "",
    color: "#ecdfd3",
    source:
      "https://theglenallachie.com/news/glenallachie-issues-fourth-batch-of-21-year-old/",
  },
  {
    id: "glenallachie-10-cask-strength-batch-11",
    name: "글렌알라키 10년 캐스크 스트렝스 배치 11",
    englishName: "The GlenAllachie 10 Year Old Cask Strength Batch 11",
    brand: "The GlenAllachie",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "스페이사이드",
    abv: 59.4,
    age: 10,
    caskStrength: true,
    abvNote:
      "배치 11의 병입 도수는 59.4%입니다. 다른 배치와 도수·향미가 다릅니다.",
    tags: ["셰리", "초콜릿", "꿀", "과일", "견과류", "스파이시"],
    description:
      "PX·올로로소 셰리, 레드 와인과 버진 오크를 조합한 배치 11. 모카와 계피 팬케이크의 향, 다크 초콜릿과 잘 익은 자두의 풍미를 59.4%의 원액 도수로 담았습니다.",
    notes: {
      nose: "모카와 헤더 꿀, 계피 팬케이크, 캐러멜화한 흑설탕과 배·생강 과자",
      palate: "다크 초콜릿과 구운 벌집 꿀, 당밀과 잘 익은 자두",
      finish: "헤이즐넛과 생강, 붉은 베리로 이어지는 여운",
    },
    image: "",
    color: "#ecdfd3",
    source:
      "https://cdn.asp.events/CLIENT_Montgome_B1B4C8FA_E3BA_05DA_18BFD74DA8885CDB/sites/IFE-2025/media/libraries/exhibitors-brochures/96417-the-glenallachie-core-collection-info-sheets.pdf",
  },
  {
    id: "tamdhu-batch-strength-007",
    name: "탐두 배치 스트렝스 007",
    englishName: "Tamdhu Batch Strength No. 007",
    brand: "Tamdhu",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "스페이사이드",
    abv: 57.5,
    age: null,
    // Batch Strength does not by itself establish bottling without dilution.
    abvNote:
      "배치 007의 도수는 57.5%입니다. 배치 스트렝스 시리즈는 출시 배치마다 도수가 다릅니다.",
    tags: ["셰리", "바닐라", "견과류", "과일", "시트러스", "스파이시"],
    description:
      "올로로소 셰리 캐스크에서 숙성하고 냉각 여과 없이 병입한 일곱 번째 배치. 바닐라 스펀지케이크와 프랄린의 향, 라즈베리 디저트와 살구·레몬의 풍미가 특징입니다.",
    notes: {
      nose: "은은한 바닐라 스펀지케이크, 계피와 구운 프랄린",
      palate:
        "라즈베리 파블로바의 풍미; 물을 더하면 캐러멜 살구와 오크 향신료·레몬",
      finish: "따뜻한 오크 향신료와 구운 무화과, 셰리와 클레멘타인",
    },
    image: "",
    color: "#e9decc",
    source:
      "https://www.whisky-online.com/products/tamdhu-batch-strength-batch-007",
  },
  {
    id: "tamdhu-batch-strength-008",
    name: "탐두 배치 스트렝스 008",
    englishName: "Tamdhu Batch Strength No. 008",
    brand: "Tamdhu",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "스페이사이드",
    abv: 55.8,
    age: null,
    abvNote:
      "배치 008의 도수는 55.8%입니다. 배치 스트렝스 시리즈는 출시 배치마다 도수가 다릅니다.",
    tags: ["셰리", "바닐라", "견과류", "꿀", "과일", "시트러스"],
    description:
      "퍼스트 필 비중이 높은 올로로소 셰리 캐스크를 골라 만든 여덟 번째 배치. 스페인 오크의 견과류 향과 바닐라·벌집 꿀, 산뜻한 베리와 달콤한 레몬 껍질의 풍미를 담았습니다.",
    notes: {
      nose: "스페인 오크의 짙은 견과류 향, 크리미한 바닐라와 녹인 벌집 꿀",
      palate: "여름 과수원의 과일, 새콤한 베리와 설탕에 절인 레몬 껍질",
      finish: "셰리 오크와 무화과가 남기는 길고 부드러운 여운",
    },
    image: "",
    color: "#e9decc",
    source: "https://www.tamdhu.com/batch-strength-008-tasting",
  },
];
