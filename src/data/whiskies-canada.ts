import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

// ABV and named ages follow the linked producer's expression. NAS releases
// are kept separate from explicitly age-stated successors where both exist.
export const canadaWhiskies = [
  ...createWhiskyGroup({ brand: "Crown Royal", category: "캐나디안", country: "캐나다", region: "매니토바", source: "https://www.crownroyal.com/canadian-whisky/crown-royal-deluxe" }, [
    ["crown-royal-deluxe", "크라운 로얄 디럭스", "Crown Royal Fine De Luxe", 40, null, ["과일", "바닐라", "부드러운"], "여러 원액의 조화로 바닐라와 크리미한 질감을 표현한 크라운 로얄의 기본 블렌드.", "바닐라와 부드러운 과일", "크리미한 오크와 바닐라", "길게 이어지는 부드러운 단맛"],
    ["crown-royal-black", "크라운 로얄 블랙", "Crown Royal Black", 45, null, ["과일", "우디", "부드러운"], "그을린 오크 배럴의 진한 풍미를 45% 도수에 담은 캐나다 블렌드.", "풍부한 오크와 메이플", "벨벳 같은 질감과 말린 무화과", "버번을 연상시키는 짙은 오크", "https://www.crownroyal.com/canadian-whisky/crown-royal-black"],
    ["crown-royal-northern-harvest-rye", "크라운 로얄 노던 하베스트 라이", "Crown Royal Northern Harvest Rye", 45, null, ["스파이시", "바닐라", "부드러운"], "캐나다 호밀의 향신료와 크라운 로얄 특유의 부드러움을 조합한 블렌드.", "베이킹 스파이스와 곡물", "버터스카치, 바닐라, 부드러운 후추", "크리미하고 매끄러운 여운", "https://www.crownroyal.com/en-ca/canadian-whisky/crown-royal-rye"],
    ["crown-royal-xo", "크라운 로얄 XO", "Crown Royal XO", 40, null, ["과일", "바닐라", "스파이시"], "크라운 로얄 블렌드를 코냑 캐스크에서 마무리해 말린 과일의 풍미를 더한 제품.", "은은한 바닐라, 캐러멜, 오크", "말린 과일과 바닐라, 향신료", "부드러운 바닐라와 가벼운 향신료", "https://www.crownroyal.com/canadian-whisky/crown-royal-xo"],
    ["crown-royal-reserve", "크라운 로얄 리저브", "Crown Royal Reserve", 40, null, ["과일", "바닐라", "우디"], "숙성 원액을 선별해 만든 연수 미표기 리저브. 별도의 12년 표기 제품과 구분됩니다.", "사과와 꽃", "부드러운 오크, 바닐라, 베이킹 스파이스", "풍부하고 오래 남는 여운", "https://www.crownroyal.com/canadian-whisky/crown-royal-reserve"],
    ["crown-royal-reserve-12", "크라운 로얄 리저브 12년", "Crown Royal Reserve Aged 12 Years", 40, 12, ["과일", "스파이시", "우디"], "최소 12년 숙성 원액을 선별한 연수 표기 리저브 블렌드.", "붉은 과일, 과수원 과일, 바닐라", "화이트 초콜릿, 호밀 향신료, 토스트 오크", "계피와 사과의 따뜻한 여운", "https://www.crownroyal.com/canadian-whisky/crown-royal-reserve-12yo"],
  ]),
  ...createWhiskyGroup({ brand: "J.P. Wiser's", category: "캐나디안", country: "캐나다", region: "온타리오", source: "https://www.jpwisers.com/en-us/product/jp-wisers-deluxe-canadian-whisky/" }, [
    ["jp-wisers-deluxe", "J.P. 와이저스 디럭스", "J.P. Wiser's Deluxe", 40, null, ["과일", "우디", "부드러운"], "윈저에서 블렌딩하고 병입하는 J.P. 와이저스의 대표 캐나다 위스키.", "말린 과일과 캐러멜", "오크, 구운 곡물, 토피", "따뜻하고 부드럽게 이어지는 여운"],
    ["jp-wisers-10", "J.P. 와이저스 10년", "J.P. Wiser's 10 Year Old", 40, 10, ["과일", "바닐라", "스파이시"], "새 오크·버번 배럴·캐나다 위스키 배럴에서 숙성한 옥수수와 호밀 원액의 10년 블렌드.", "캐러멜, 벌집 토피, 풋사과", "구운 호밀, 바닐라, 토피", "배 사탕, 말린 과일, 올스파이스", "https://shop.jpwisers.com/products/jp-wisers-10-year-old-canadian-whisky"],
    ["jp-wisers-15", "J.P. 와이저스 15년", "J.P. Wiser's 15 Year Old", 40, 15, ["바닐라", "우디", "스파이시"], "15년의 숙성을 통해 토피와 오크 향신료의 조화를 강조한 캐나다 위스키.", "토피와 캐러멜", "숙성 오크와 달콤한 향신료", "따뜻하게 지속되는 여운", "https://www.jpwisers.com/en-us/product/jp-wisers-15-year-old-canadian-whisky/"],
    ["jp-wisers-18", "J.P. 와이저스 18년", "J.P. Wiser's 18 Year Old", 40, 18, ["과일", "우디", "부드러운"], "18년 숙성의 깊은 나무와 구운 사과 풍미를 담은 캐나다 위스키.", "숙성 오크, 꽃, 솔향", "구운 사과와 향신료, 풍부한 캐러멜", "깊고 오래 이어지는 매끄러운 여운", "https://shop.jpwisers.com/products/jp-wisers-18-year-old-canadian-whisky"],
  ]),
  ...createWhiskyGroup({ brand: "Forty Creek", category: "캐나디안", country: "캐나다", region: "온타리오", source: "https://fortycreekwhisky.com/product/barrel-select/" }, [
    ["forty-creek-barrel-select", "포티 크릭 배럴 셀렉트", "Forty Creek Barrel Select", 40, null, ["꿀", "바닐라", "시트러스"], "호밀·보리·옥수수 위스키를 각각 숙성한 뒤 조합하는 포티 크릭의 대표 블렌드.", "꿀, 바닐라, 오렌지 껍질, 살구", "코코아와 호밀 향신료, 토스트", "부드럽고 길게 이어지는 나무"],
    ["forty-creek-copper-bold", "포티 크릭 코퍼 볼드", "Forty Creek Copper Bold (Copper Pot)", 43, null, ["과일", "스파이시", "우디"], "기존 코퍼 팟의 새 이름으로, 추가 오크 숙성과 43% 도수가 특징인 블렌드.", "토피, 견과류, 향신료", "말린 핵과류와 마멀레이드", "길게 사라지는 따뜻한 향신료", "https://fortycreekwhisky.com/product/copper-bold/"],
  ]),
  ...createWhiskyGroup({ brand: "Canadian Club", category: "캐나디안", country: "캐나다", region: "온타리오", source: "https://www.suntory.co.jp/whisky/canadianclub/products/" }, [
    ["canadian-club-original", "캐나디안 클럽 오리지널", "Canadian Club Original", 40, null, ["바닐라", "우디", "부드러운"], "가벼운 오크와 바닐라가 조화를 이루는 캐나디안 클럽의 기본 블렌드.", "캐러멜, 바닐라, 향신료", "부드러운 오크와 은은한 바닐라", "깔끔하고 드라이한 나무"],
    ["canadian-club-black-label", "캐나디안 클럽 블랙 라벨", "Canadian Club Black Label", 40, null, ["과일", "바닐라", "우디"], "오크와 과일 향을 강조한 일본 시장의 블랙 라벨. 현행 공식 자료에는 숙성연수가 명시되지 않습니다.", "짙은 오크, 캐러멜, 오렌지", "균형 잡힌 바닐라와 토피", "따뜻하고 긴 여운"],
    ["canadian-club-classic-12", "캐나디안 클럽 클래식 12년", "Canadian Club Classic 12 Year Old", 40, 12, ["바닐라", "우디", "부드러운"], "캐나다의 계절 변화를 거치며 12년 이상 오크에서 숙성한 클래식 블렌드.", "둥글고 부드러운 숙성 향", "풍부한 오크와 바닐라, 은은한 단맛", "따뜻하고 길게 이어지는 드라이한 여운", "https://products.suntory.co.jp/d/080686817086/"],
    ["canadian-club-20", "캐나디안 클럽 20년", "Canadian Club 20 Year Old", 40, 20, ["과일", "바닐라", "스파이시"], "20년 숙성으로 과일과 견과류의 풍미를 키운 캐나디안 클럽.", "과일 사탕, 건포도, 자두, 사과꽃", "견과류, 향신료, 바닐라", "사과와 육두구, 풍부한 오크"],
  ]),
  ...createWhiskyGroup({ brand: "Lot No. 40", category: "라이", country: "캐나다", region: "온타리오", source: "https://shop.jpwisers.com/products/lot-no-40-100-pot-still-rye-whisky" }, [
    ["lot-no-40-pot-still-rye", "롯 넘버 40 팟 스틸 라이", "Lot No. 40 100% Pot Still Rye", 43, null, ["과일", "스파이시", "바닐라"], "100% 호밀을 구리 팟 스틸로 증류하고 새 화이트 오크에서 숙성한 캐나다 라이.", "호밀 사워도우, 배, 꿀, 바닐라", "흰 후추, 구운 호두, 토피, 검은 과일", "따뜻하게 이어지는 호밀 향신료"],
    ["lot-no-40-dark-oak", "롯 넘버 40 다크 오크", "Lot No. 40 Dark Oak", 48, null, ["꿀", "스파이시", "우디"], "새 오크 숙성 후 강하게 그을린 두 번째 배럴에서 마무리한 100% 호밀 위스키.", "배, 사과, 호밀빵, 바닐라", "후추, 정향, 호두, 그을린 나무", "따뜻한 꿀의 여운", "https://shop.jpwisers.com/products/lot-no-40-dark-oak-canadian-whisky"],
  ]),
  ...createWhiskyGroup({ brand: "Forty Creek", category: "캐나디안", country: "캐나다", region: "온타리오", source: "https://fortycreekwhisky.com/product/double-barrel-reserve/" }, [
    ["forty-creek-double-barrel", "포티 크릭 더블 배럴", "Forty Creek Double Barrel Reserve", 40, null, ["바닐라", "스파이시", "부드러운"], "각각 숙성한 곡물 위스키를 블렌딩한 후 켄터키 버번 배럴에서 추가 숙성한 제품.", "바닐라, 토스트 향신료, 피칸", "진한 캐러멜과 바닐라", "아주 긴 부드러운 여운과 후추"],
    ["forty-creek-confederation-oak", "포티 크릭 컨페더레이션 오크", "Forty Creek Confederation Oak Reserve", 40, null, ["과일", "바닐라", "우디"], "세 곡물 원액을 조합한 뒤 캐나다산 오크 배럴에서 마무리한 블렌드.", "메이플, 건포도, 무화과, 프랄린", "버터크림, 바닐라, 오크, 호두", "점차 잦아드는 향신료와 흰 후추", "https://fortycreekwhisky.com/product/confederation-oak-reserve/"],
    ["forty-creek-niagara-triple-reserve", "포티 크릭 나이아가라 트리플 리저브", "Forty Creek Niagara Triple Reserve", 51, null, ["과일", "바닐라", "우디"], "연례 한정 시리즈의 19번째 제품으로 나이아가라 카베르네 캐스크 피니시를 거친 51% 병입.", "엘더베리와 바닐라, 오크", "단맛과 향신료에 겹치는 과일과 타닌", "오래 남는 드라이한 오크", "https://fortycreekwhisky.com/product/niagara-triple-reserve/"],
  ]),
  ...createWhiskyGroup({ brand: "Pike Creek", category: "캐나디안", country: "캐나다", region: "온타리오", source: "https://shop.jpwisers.com/products/pike-creek-double-barreled-canadian-whisky" }, [
    ["pike-creek-double-barreled", "파이크 크릭 더블 배럴드", "Pike Creek Double Barreled", 42, null, ["과일", "꿀", "바닐라"], "온도를 인위적으로 조절하지 않는 창고에서 숙성하고 럼 배럴로 마무리한 캐나다 위스키.", "황금 건포도, 흑설탕, 말린 오렌지 껍질", "벌집 토피, 당밀, 바닐라, 호밀 향신료", "온화하고 따뜻한 여운"],
  ]),
  ...createWhiskyGroup({ brand: "J.P. Wiser's", category: "캐나디안", country: "캐나다", region: "온타리오", source: "https://shop.jpwisers.com/products/jp-wisers-special-blend-whisky" }, [
    ["jp-wisers-special-blend", "J.P. 와이저스 스페셜 블렌드", "J.P. Wiser's Special Blend", 40, null, ["바닐라", "우디", "부드러운"], "윈저에서 만드는 가볍고 부드러운 스타일의 캐나다 블렌드.", "신선한 나무와 향신료, 바닐라", "은은한 단맛과 온화한 오크", "짧고 깔끔한 여운"],
  ]),
  ...createWhiskyGroup({ brand: "Crown Royal", category: "캐나디안", country: "캐나다", region: "매니토바", source: "https://www.crownroyal.com/canadian-whisky/crown-royal-18yo" }, [
    ["crown-royal-18", "크라운 로얄 18년", "Crown Royal Aged 18 Years", 40, 18, ["과일", "바닐라", "부드러운"], "매니토바 김리에서 최소 18년 숙성한 원액을 선별해 만든 블렌드.", "바닐라와 핵과류", "가벼운 오크와 캐러멜 향신료", "누가가 남는 풍부한 여운"],
  ]),
  ...createWhiskyGroup({ brand: "Crown Royal", category: "싱글 몰트", country: "캐나다", region: "매니토바", source: "https://www.crownroyal.com/canadian-whisky/single-malt" }, [
    ["crown-royal-single-malt", "크라운 로얄 싱글 몰트", "Crown Royal Single Malt", 45, null, ["과일", "바닐라", "스파이시"], "몰트 보리 100%로 만든 크라운 로얄의 캐나다 싱글 몰트.", "크리미한 바닐라, 바나나, 사과", "바닐라와 바나나, 견과류", "따뜻하게 남는 계피 향신료"],
  ]),
];
