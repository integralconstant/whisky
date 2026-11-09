import type { Whisky } from "./types.ts";

// Historical Cask Strength releases retain their own strength and producer notes.
export const highlandParkCsWhiskies: Whisky[] = [
  {
    id: "highland-park-cask-strength-release-1",
    name: "하이랜드 파크 캐스크 스트렝스 릴리즈 1",
    englishName: "Highland Park Cask Strength Release No.1",
    brand: "Highland Park",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "오크니 제도",
    abv: 63.3,
    age: null,
    caskStrength: true,
    abvNote:
      "릴리즈 1의 병입 도수는 63.3%입니다. 릴리즈마다 도수와 캐스크 구성이 다릅니다.",
    tags: [
      "피트",
      "스모키",
      "바닐라",
      "꽃",
      "꿀",
      "토피",
      "육두구",
      "시트러스",
    ],
    description:
      "셰리 시즈닝한 미국산 오크 원액을 중심으로 구성한 첫 캐스크 스트렝스 릴리즈. 제비꽃과 바닐라의 향, 토피와 헤더 꿀의 단맛에 피트 연기를 겹쳤습니다.",
    notes: {
      nose: "제비꽃과 바닐라 꼬투리, 달콤하고 향긋한 피트 연기",
      palate: "토피와 헤더 꿀, 갓 간 육두구와 잘 익은 시트러스 과일",
      finish: "따뜻한 크렘 브륄레와 향신료가 길게 이어지는 여운",
    },
    image: "",
    color: "#e6dccf",
    // Producer tasting notes reproduced in Wine.com's Distiller Notes section.
    source:
      "https://www.wine.com/product/highland-park-cask-strength-no-1-single-malt-scotch-whisky/770132",
  },
  {
    id: "highland-park-cask-strength-release-2",
    name: "하이랜드 파크 캐스크 스트렝스 릴리즈 2",
    englishName: "Highland Park Cask Strength Release No.2",
    brand: "Highland Park",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "오크니 제도",
    abv: 63.9,
    age: null,
    caskStrength: true,
    abvNote:
      "릴리즈 2의 병입 도수는 63.9%입니다. 릴리즈마다 도수와 캐스크 구성이 다릅니다.",
    tags: ["피트", "스모키", "꽃", "배", "코코넛", "견과류", "꿀", "후추"],
    description:
      "유럽산·미국산 오크 셰리 캐스크에 일부 버번 캐스크를 더한 두 번째 릴리즈. 장미와 배, 코코넛의 향에서 아몬드 케이크와 꿀의 단맛, 후추와 피트로 이어집니다.",
    // Official notes reproduced at https://whiskyinternationalonline.com/products/highland-park-cask-strength-release-no-2-63-9
    notes: {
      nose: "여름 장미와 잘 익은 배, 신선한 코코넛과 향긋한 피트 연기",
      palate:
        "졸인 배와 아몬드 케이크, 꿀과 짭짤한 감초의 달콤하고 매콤한 조화",
      finish:
        "구운 오크와 과수원 과일, 흑후추와 달콤한 아니스가 길게 남는 여운",
    },
    image: "",
    color: "#e6dccf",
    source:
      "https://www.mynewsdesk.com/se/edrington_sweden/pressreleases/highland-park-lanserar-cask-strength-release-no-punkt-2-en-whisky-skapad-foer-att-uppmuntra-utforskandet-av-smaker-3143675",
  },
  {
    id: "highland-park-cask-strength-release-3",
    name: "하이랜드 파크 캐스크 스트렝스 릴리즈 3",
    englishName: "Highland Park Cask Strength Release No.3",
    brand: "Highland Park",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "오크니 제도",
    abv: 64.1,
    age: null,
    caskStrength: true,
    abvNote:
      "릴리즈 3의 병입 도수는 64.1%입니다. 릴리즈마다 도수와 캐스크 구성이 다릅니다.",
    tags: [
      "피트",
      "스모키",
      "시트러스",
      "꿀",
      "열대과일",
      "바닐라",
      "꽃",
      "크리미",
    ],
    description:
      "오크니 피트 몰트 비중을 높이고 퍼스트 필 셰리 캐스크와 리필 캐스크를 조합한 릴리즈 3. 피트 연기에 꿀을 바른 레몬, 망고와 바닐라 크림의 풍미가 겹칩니다.",
    notes: {
      nose: "타오르는 피트와 살짝 그을린 오크, 꿀을 바른 레몬과 으깬 아니스",
      palate: "잘 익은 망고와 헤더 꿀, 휘핑한 바닐라 크림과 은은한 제비꽃",
      finish:
        "핑크 자몽 껍질과 갓 구운 스펀지케이크, 헤더를 머금은 피트 연기의 긴 여운",
    },
    image: "",
    color: "#e6dccf",
    source: "https://www.highlandparkwhisky.com/en/cask-strength-release-no-3",
  },
  {
    id: "highland-park-cask-strength-release-4",
    name: "하이랜드 파크 캐스크 스트렝스 릴리즈 4",
    englishName: "Highland Park Cask Strength Release No.4",
    brand: "Highland Park",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "오크니 제도",
    abv: 64.3,
    age: null,
    caskStrength: true,
    abvNote:
      "릴리즈 4의 병입 도수는 64.3%입니다. 릴리즈마다 도수와 캐스크 구성이 다릅니다.",
    tags: ["피트", "스모키", "코코넛", "시트러스", "꽃", "오크", "스파이시"],
    description:
      "셰리 시즈닝한 오크와 버번·리필 캐스크에 포트 캐스크를 처음 더한 네 번째 릴리즈. 구운 코코넛과 레몬, 장미수와 핑크 자몽이 피트 연기와 어우러집니다.",
    notes: {
      nose: "구운 코코넛과 으깬 레몬, 삼나무와 터키시 딜라이트, 향긋한 피트 연기",
      palate: "핑크 자몽과 장미수, 구운 오크와 헤더를 머금은 피트의 흙내음",
      finish:
        "이국적인 향신료와 감초, 꽃을 닮은 피트 연기가 길게 이어지는 여운",
    },
    image: "",
    color: "#e6dccf",
    // Highland Park's May 2023 launch announcement reproduced by BevNET.
    source:
      "https://www.bevnet.com/spirits/2023/highland-park-release-new-cask-strength-no-4-scotch-whisky",
  },
  {
    id: "highland-park-cask-strength-release-5",
    name: "하이랜드 파크 캐스크 스트렝스 릴리즈 5",
    englishName: "Highland Park Cask Strength Release No.5",
    brand: "Highland Park",
    category: "싱글 몰트",
    country: "스코틀랜드",
    region: "오크니 제도",
    abv: 64.7,
    age: null,
    caskStrength: true,
    abvNote:
      "릴리즈 5의 병입 도수는 64.7%입니다. 릴리즈마다 도수와 캐스크 구성이 다릅니다.",
    tags: ["셰리", "피트", "스모키", "건과일", "정향", "오크", "스파이시"],
    description:
      "퍼스트 필 유럽산 오크 셰리 캐스크에 PX 셰리 캐스크를 더하고 미국산 오크·버번·리필 캐스크로 균형을 잡은 릴리즈 5. 건자두와 감초의 진한 단맛을 정향과 피트 연기가 받칩니다.",
    notes: {
      nose: "매콤한 정향과 모닥불 연기",
      palate: "건자두와 감초의 짙은 단맛, 오크니 헤더 피트의 은은한 연기",
      finish: "진한 건과일과 훈연한 오크, 풍부한 향신료가 남는 여운",
    },
    image: "",
    color: "#e6dccf",
    source: "https://www.highlandparkwhisky.com/en/cask-strength-release-no-5",
  },
];
