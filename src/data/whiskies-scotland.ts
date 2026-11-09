import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

// Distinct official expressions; ABV is for the bottling linked by each source.
export const scotlandWhiskies = [
  ...createWhiskyGroup({ brand: "Glenmorangie", category: "싱글 몰트", country: "스코틀랜드", region: "하이랜드", source: "https://www.glenmorangie.com/en-au/collections/core-expressions" }, [
    ["glenmorangie-lasanta-15", "글렌모렌지 라산타 15년", "Glenmorangie The Lasanta 15 Years Old", 43, 15, ["셰리", "과일", "스파이시"], "버번과 올로로소 셰리 캐스크에서 15년 숙성한 라산타. 건과일과 따뜻한 향신료가 부드럽게 겹쳐집니다.", "건포도와 꿀, 정향", "토피와 계피, 달콤한 건과일", "따뜻한 오크와 셰리의 단맛", "https://www.glenmorangie.com/products/glenmorangie-the-lasanta-15-years-old"],
    ["glenmorangie-quinta-ruban-14", "글렌모렌지 퀸타 루반 14년", "Glenmorangie The Quinta Ruban 14 Years Old", 46, 14, ["과일", "스파이시", "우디"], "포르투갈 포트 와인 캐스크를 거쳐 초콜릿과 민트의 인상을 더한 14년 숙성 몰트입니다.", "오렌지와 호두, 후추", "다크 초콜릿, 민트와 마시멜로", "코코아와 민트의 긴 여운", "https://www.glenmorangie.com/en-us/products/the-quinta-ruban"],
    ["glenmorangie-nectar-16", "글렌모렌지 넥타 16년", "Glenmorangie The Nectar 16 Years Old", 46, 16, ["꿀", "과일", "바닐라"], "버번 캐스크 숙성 후 여러 스위트 와인 캐스크에서 마무리해 제과점처럼 풍성한 단향을 담았습니다.", "브리오슈와 구운 살구, 아몬드", "바닐라 크림과 건포도 빵", "레몬 껍질과 벌집 꿀", "https://www.glenmorangie.com/en-de/products/the-nectar-16-years-old"],
    ["glenmorangie-infinita-18", "글렌모렌지 인피니타 18년", "Glenmorangie The Infinita 18 Years Old", 43, 18, ["꿀", "과일", "부드러운"], "18년 숙성으로 꽃향과 과일, 견과류의 풍미를 섬세하게 엮은 글렌모렌지의 장기 숙성 표현입니다.", "재스민과 꿀, 오렌지", "무화과와 캐러멜, 마멀레이드", "과일의 단맛과 잔잔한 오크", "https://www.glenmorangie.com/en-us/products/the-infinita-18-years-old"],
    ["glenmorangie-signet", "글렌모렌지 시그넷", "Glenmorangie Signet", 46, null, ["스파이시", "바닐라", "우디"], "진하게 볶은 초콜릿 몰트 원액을 활용해 에스프레소와 모카를 떠올리게 하는 깊은 풍미를 냅니다.", "에스프레소와 오렌지 껍질", "모카, 다크 초콜릿과 향신료", "코코아와 구운 견과류", "https://www.glenmorangie.com/en-us/products/signet"],
    ["glenmorangie-triple-cask", "글렌모렌지 트리플 캐스크 리저브", "Glenmorangie Triple Cask Reserve", 40, null, ["과일", "바닐라", "스파이시"], "버번, 새 오크와 라이 위스키 캐스크를 조합해 과일의 단맛에 은근한 향신료를 더합니다.", "배와 설탕에 절인 오렌지", "바닐라, 꽃꿀과 정향", "부드러운 과일과 오크 스파이스", "https://www.glenmorangie.com/en-us/products/glenmorangie-triple-cask-reserve"],
  ]),
  ...createWhiskyGroup({ brand: "Ardbeg", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.ardbeg.com/en-gb/collections/core-range" }, [
    ["ardbeg-wee-beastie-5", "아드벡 위 비스티 5년", "Ardbeg Wee Beastie 5 Years Old", 47.4, 5, ["피트", "스모키", "스파이시"], "5년 숙성의 생동감 있는 피트와 후추가 두드러집니다. 버번과 올로로소 셰리 캐스크가 강한 연기에 깊이를 더합니다.", "후추와 소나무, 짙은 연기", "타르와 초콜릿, 훈연 고기", "짭짤하고 강렬한 피트"],
    ["ardbeg-an-oa", "아드벡 안 오", "Ardbeg An Oa", 46.6, null, ["피트", "스모키", "부드러운"], "여러 캐스크 원액을 큰 오크 통에서 결합해 아드벡의 짙은 연기를 둥글게 다듬은 표현입니다.", "토피와 대추, 은은한 연기", "초콜릿과 오렌지, 부드러운 피트", "달콤한 향신료와 잔잔한 연기", "https://www.ardbeg.fr/products/ardbeg-an-oa"],
    ["ardbeg-uigeadail", "아드벡 우거다일", "Ardbeg Uigeadail", 54.2, null, ["피트", "스모키", "셰리", "과일"], "셰리 캐스크의 건과일과 아드벡 특유의 짙은 피트를 결합한 고도수 싱글 몰트입니다.", "건포도와 가죽, 숯불", "당밀과 초콜릿, 강한 피트", "훈연과 건과일의 긴 단맛"],
    ["ardbeg-corryvreckan", "아드벡 코리브레칸", "Ardbeg Corryvreckan", 57.1, null, ["피트", "스모키", "스파이시"], "아일라 인근 소용돌이의 이름을 딴 강렬한 몰트. 후추와 짙은 과일, 타르의 풍미가 힘 있게 펼쳐집니다.", "블랙베리와 타르, 오크", "흑후추와 커피, 깊은 연기", "향신료와 피트가 길게 지속"],
    ["ardbeg-25", "아드벡 25년", "Ardbeg 25 Years Old", 46, 25, ["피트", "스모키", "시트러스"], "25년의 숙성을 거치며 피트의 강인함에 크리미한 질감과 섬세한 과일 향을 더한 장기 숙성 몰트입니다.", "레몬 셔벗과 크림, 피트", "구운 사과와 회향, 연기", "부드러운 훈연과 오크"],
  ]),
  ...createWhiskyGroup({ brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.laphroaig.com/whisky-stories/intro-to-the-range" }, [
    ["laphroaig-quarter-cask", "라프로익 쿼터 캐스크", "Laphroaig Quarter Cask", 48, null, ["피트", "스모키", "바닐라"], "작은 쿼터 캐스크에서 추가 숙성해 강한 피트에 코코넛과 달콤한 오크의 풍미를 더했습니다.", "코코넛과 바나나, 피트 연기", "달콤한 바닐라와 깊은 훈연", "건조한 오크와 향신료", "https://www.laphroaig.com/whiskies/quarter-cask"],
    ["laphroaig-lore", "라프로익 로어", "Laphroaig Lore", 48, null, ["피트", "스모키", "셰리", "스파이시"], "여러 연령과 캐스크의 원액을 결합해 라프로익의 전통을 담았습니다. 공식 숙성 연수는 표시하지 않는 제품입니다.", "해안의 미네랄과 재, 초콜릿", "짙은 피트와 다크 초콜릿, 칠리", "드라이한 피트 뒤의 단맛", "https://www.laphroaig.com/whiskies/laphroaig-lore-single-malt-scotch-whisky"],
    ["laphroaig-oak-select", "라프로익 오크 셀렉트", "Laphroaig Oak Select", 40, null, ["피트", "스모키", "부드러운"], "다양한 셰리·버번 캐스크를 조합해 라프로익의 약품 같은 피트와 과일 풍미를 비교적 부드럽게 표현합니다.", "해조류와 붉은 과일, 피트", "라임과 마지팬, 은은한 오크", "꽃향을 동반한 잔잔한 연기", "https://www.laphroaig.com/whiskies/laphroaig-select-single-malt-scotch-whisky"],
    ["laphroaig-10-sherry", "라프로익 10년 셰리 오크", "Laphroaig 10 Year Old Sherry Oak Finish", 48, 10, ["피트", "스모키", "셰리", "꿀"], "10년 숙성 원액을 올로로소 셰리 오크로 마무리해 피트에 마누카 꿀과 다크 초콜릿의 풍미를 더합니다.", "마누카 꿀, 정향과 훈연 베이컨", "메이플 시럽과 초콜릿, 삼나무", "견과류와 짭짤한 피트", "https://www.laphroaig.com/whiskies/10-year-old-sherry-oak-finish"],
    ["laphroaig-four-oak", "라프로익 포 오크", "Laphroaig Four Oak", 40, null, ["피트", "스모키", "바닐라", "우디"], "네 가지 오크 캐스크를 활용한 여행 소매 전용 표현으로, 연기와 달콤한 나무 풍미의 균형을 보여줍니다.", "졸인 과일과 구운 바닐라", "해조류와 오크 잔불, 버터크림", "짭짤한 감초와 피트 연기", "https://www.laphroaig.com/global-travel-retail/four-oak"],
  ]),
  ...createWhiskyGroup({ brand: "Talisker", category: "싱글 몰트", country: "스코틀랜드", region: "스카이 섬", source: "https://www.malts.com/en-gb/products/talisker-18-year-old-single-malt-scotch-whisky-70cl" }, [
    ["talisker-18", "탈리스커 18년", "Talisker 18 Year Old", 45.8, 18, ["스모키", "과일", "스파이시"], "18년 숙성을 통해 달콤한 과일과 해안의 짭짤함, 탈리스커의 후추 풍미가 부드럽게 어우러집니다.", "자두와 말린 오렌지, 연기", "달콤한 과일과 토피, 후추", "따뜻한 향신료와 잔잔한 훈연"],
    ["talisker-storm", "탈리스커 스톰", "Talisker Storm", 45.8, null, ["피트", "스모키", "스파이시"], "해풍과 짙은 훈연, 후추의 인상을 강조한 탈리스커의 숙성 연수 미표기 표현입니다.", "붉은 베리와 달콤한 몰트", "소금기와 후추, 강한 연기", "건조한 오크와 짙은 피트", "https://www.malts.com/en-us/products/talisker-storm-single-malt-scotch-whisky-750ml"],
    ["talisker-skye", "탈리스커 스카이", "Talisker Skye", 45.8, null, ["스모키", "시트러스", "부드러운"], "스카이 섬의 개성을 산뜻한 감귤과 부드러운 질감으로 풀어낸 싱글 몰트입니다.", "오렌지와 망고, 바다 내음", "달콤한 토피와 부드러운 연기", "후추와 잔잔한 해풍", "https://www.malts.com/en-gb/products/talisker-skye-single-malt-scotch-whisky-70cl"],
    ["talisker-port-ruighe", "탈리스커 포트 리", "Talisker Port Ruighe", 45.8, null, ["스모키", "과일", "스파이시"], "포트 와인 캐스크의 진한 베리 풍미를 탈리스커의 해안성 훈연과 결합했습니다.", "자두와 달콤한 나무 연기", "후추와 크리미한 훈연, 검붉은 과일", "코코아와 건조한 연기", "https://www.malts.com/en-gb/products/talisker-port-ruighe-single-malt-scotch-whisky-70cl"],
    ["talisker-dark-storm", "탈리스커 다크 스톰", "Talisker Dark Storm", 45.8, null, ["스모키", "우디", "스파이시"], "강하게 그을린 캐스크의 풍미를 강조한 여행 소매 전용 탈리스커입니다.", "구운 오크와 해풍, 향신료", "검붉은 과일과 짙은 연기", "후추와 그을린 나무", "https://www.malts.com/en-us/products/talisker-dark-storm-single-malt-whisky-1l"],
  ]),
  ...createWhiskyGroup({ brand: "Lagavulin", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.malts.com/en-gb/products/lagavulin-8-year-old-single-malt-scotch-whisky-70cl" }, [
    ["lagavulin-8", "라가불린 8년", "Lagavulin 8 Year Old", 48, 8, ["피트", "스모키", "시트러스"], "증류소 200주년을 기념해 선보인 8년 숙성 몰트로, 밝은 감귤과 강한 훈연의 대비가 특징입니다.", "레몬과 밀크 초콜릿, 찻잎 연기", "민트와 구운 감자, 짙은 피트", "초콜릿과 깨끗한 훈연"],
  ]),
  ...createWhiskyGroup({ brand: "Oban", category: "싱글 몰트", country: "스코틀랜드", region: "하이랜드", source: "https://www.malts.com/en-gb/products/oban-little-bay-single-malt-scotch-whisky-70cl" }, [
    ["oban-little-bay", "오반 리틀 베이", "Oban Little Bay", 43, null, ["과일", "스파이시", "부드러운"], "작은 오크 캐스크에서 풍미를 다듬어 과일 빵과 감귤, 해안의 인상을 담은 오반입니다.", "아몬드 케이크와 과수원 과일", "과일 빵과 오렌지, 정향", "다크 초콜릿과 드라이한 오크"],
  ]),
  ...createWhiskyGroup({ brand: "Caol Ila", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.malts.com/en-gb/products/caol-ila-12-year-old-single-malt-scotch-whisky-70cl" }, [
    ["caol-ila-12", "쿠일라 12년", "Caol Ila 12 Year Old", 43, 12, ["피트", "스모키", "시트러스"], "감귤과 오일리한 질감에 아일라의 맑은 훈연을 더한 12년 숙성 싱글 몰트입니다.", "감귤과 아몬드 오일", "가벼운 단맛과 소금기, 은근한 연기", "달콤한 훈연과 산뜻한 산미"],
  ]),
  ...createWhiskyGroup({ brand: "Clynelish", category: "싱글 몰트", country: "스코틀랜드", region: "하이랜드", source: "https://www.malts.com/en-gb/products/clynelish-14-year-old-single-malt-scotch-whisky-70cl" }, [
    ["clynelish-14", "클라이넬리시 14년", "Clynelish 14 Year Old", 46, 14, ["과일", "꿀", "우디"], "밀랍을 떠올리게 하는 질감과 해안의 미네랄이 돋보이는 북부 하이랜드 몰트입니다.", "향초의 밀랍과 마른 꽃, 흑설탕", "크리미한 질감과 과일, 해안의 소금기", "드라이한 오크와 은은한 쌉싸름함"],
  ]),
  ...createWhiskyGroup({ brand: "Glenkinchie", category: "싱글 몰트", country: "스코틀랜드", region: "로우랜드", source: "https://www.malts.com/en-gb/products/glenkinchie-12-year-old-single-malt-scotch-whisky-70cl" }, [
    ["glenkinchie-12", "글렌킨치 12년", "Glenkinchie 12 Year Old", 43, 12, ["바닐라", "시트러스", "부드러운"], "꽃향과 가벼운 곡물 풍미로 로우랜드 스타일을 보여주는 에든버러 인근 증류소의 대표 몰트입니다.", "봄꽃과 바닐라, 구운 곡물", "레몬 치즈케이크와 달콤한 몰트", "허브와 깨끗한 오크"],
  ]),
  ...createWhiskyGroup({ brand: "Royal Lochnagar", category: "싱글 몰트", country: "스코틀랜드", region: "하이랜드", source: "https://www.malts.com/en-gb/products/royal-lochnagar-12-year-old-single-malt-scotch-whisky-70cl" }, [
    ["royal-lochnagar-12", "로열 로크나가 12년", "Royal Lochnagar 12 Year Old", 40, 12, ["과일", "우디", "부드러운"], "발모럴 인근의 작은 증류소에서 만드는 12년 숙성 몰트로, 과일과 나무 향의 단정한 균형이 특징입니다.", "오크와 가벼운 과일, 토피", "달콤한 곡물과 산뜻한 과일", "드라이한 나무와 은은한 향신료"],
  ]),
  ...createWhiskyGroup({ brand: "Dalwhinnie", category: "싱글 몰트", country: "스코틀랜드", region: "하이랜드", source: "https://www.malts.com/en-gb/products/dalwhinnie-15-year-old-single-malt-scotch-whisky-70cl" }, [
    ["dalwhinnie-15", "달위니 15년", "Dalwhinnie 15 Year Old", 43, 15, ["꿀", "바닐라", "부드러운"], "높은 고도의 하이랜드에서 숙성해 꽃꿀과 부드러운 몰트 풍미를 담은 달위니의 대표 제품입니다.", "헤더 꿀과 배, 가벼운 풀향", "바닐라와 달콤한 꿀, 몰트", "은은한 훈연과 따뜻한 향신료"],
  ]),
  ...createWhiskyGroup({ brand: "Bunnahabhain", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://bunnahabhain.com/collections/beginners-whisky" }, [
    ["bunnahabhain-12", "부나하벤 12년", "Bunnahabhain 12 Year Old", 46.3, 12, ["셰리", "과일", "부드러운"], "강한 피트 대신 셰리의 과일과 견과류, 부드러운 해안 풍미를 보여주는 아일라 몰트입니다.", "말린 과일과 견과류", "바닐라와 셰리, 은은한 소금기", "따뜻한 견과류와 달콤한 오크"],
    ["bunnahabhain-18", "부나하벤 18년", "Bunnahabhain 18 Year Old", 46.3, 18, ["셰리", "과일", "스파이시"], "올로로소 셰리 캐스크의 풍부한 단맛과 해안의 개성이 긴 숙성을 통해 깊어진 표현입니다.", "풍성한 건과일과 캐러멜", "셰리와 견과류, 따뜻한 향신료", "드라이한 과일과 오크"],
    ["bunnahabhain-stiuireadair", "부나하벤 스튜라더", "Bunnahabhain Stiùireadair", 46.3, null, ["셰리", "과일", "부드러운"], "바다의 조타수를 뜻하는 이름의 몰트. 셰리 캐스크의 크리미한 단맛과 해안의 소금기를 담았습니다.", "캐러멜과 말린 과일, 바닐라", "크림과 견과류, 부드러운 셰리", "과일의 단맛과 가벼운 소금기"],
    ["bunnahabhain-toiteach-a-dha", "부나하벤 토이치아 가", "Bunnahabhain Toiteach A Dhà", 46.3, null, ["피트", "스모키", "셰리"], "일반적인 부나하벤과 달리 피트를 강조한 표현으로, 올로로소 셰리의 풍미가 연기와 만납니다.", "피트 연기와 셰리, 오크", "후추와 해안의 소금기, 말린 과일", "따뜻한 피트와 향신료"],
  ]),
  ...createWhiskyGroup({ brand: "Deanston", category: "싱글 몰트", country: "스코틀랜드", region: "하이랜드", source: "https://deanstonmalt.com/collections/core-range" }, [
    ["deanston-12", "딘스톤 12년", "Deanston 12 Year Old", 46.3, 12, ["꿀", "바닐라", "부드러운"], "버번 캐스크에서 숙성해 몰트와 꿀의 부드러운 풍미를 살린 비피트 하이랜드 싱글 몰트입니다.", "꽃꿀과 달콤한 몰트", "크리미한 바닐라와 토피", "부드러운 꿀과 오크"],
    ["deanston-18", "딘스톤 18년", "Deanston 18 Year Old", 46.3, 18, ["꿀", "우디", "스파이시"], "18년의 버번 캐스크 숙성이 딘스톤의 밀랍 같은 질감에 깊은 오크와 향신료를 더합니다.", "말린 과일과 꿀, 바닐라", "버터 토피와 오크 스파이스", "따뜻한 생강과 달콤한 몰트"],
    ["deanston-virgin-oak", "딘스톤 버진 오크", "Deanston Virgin Oak", 46.3, null, ["바닐라", "시트러스", "스파이시"], "버번 캐스크 원액을 새 오크 캐스크에서 마무리해 산뜻한 시트러스와 풍부한 바닐라를 얻었습니다.", "레몬 껍질과 몰트, 바닐라", "꿀과 새 오크, 향신료", "달콤하고 산뜻한 오크"],
  ]),
  ...createWhiskyGroup({ brand: "Arran", category: "싱글 몰트", country: "스코틀랜드", region: "아란 섬", source: "https://www.arranwhisky.com/news/208-a-breath-of-fresh-arran" }, [
    ["arran-10", "아란 10년", "Arran 10 Year Old", 46, 10, ["시트러스", "바닐라", "과일"], "비피트 원액의 산뜻한 감귤과 풍부한 바닐라를 보여주는 로크란자 증류소의 대표 몰트입니다.", "감귤과 바닐라, 과수원 과일", "사과와 달콤한 몰트, 계피", "깨끗한 시트러스와 오크"],
    ["arran-barrel-reserve", "아란 배럴 리저브", "Arran Barrel Reserve", 43, null, ["과일", "바닐라", "부드러운"], "버번 배럴에서 숙성한 원액으로 만든 산뜻하고 가벼운 아란. 사과와 바닐라의 조합이 특징입니다.", "풋사과와 배, 바닐라", "감귤과 달콤한 오크", "부드러운 과일과 바닐라"],
    ["arran-quarter-cask-bothy", "아란 쿼터 캐스크 더 보시", "Arran Quarter Cask The Bothy", 56.2, null, ["바닐라", "과일", "스파이시"], "작은 쿼터 캐스크 숙성으로 오크의 단맛과 후추 풍미를 강조한 56.2% 병입 표현입니다.", "사과와 파인애플, 바닐라", "코코넛과 토피, 강한 후추", "달콤한 몰트와 오크 스파이스"],
    ["arran-sherry-bodega", "아란 셰리 캐스크 더 보데가", "Arran Sherry Cask The Bodega", 55.8, null, ["셰리", "과일", "스파이시"], "셰리 캐스크에서 숙성해 진한 건과일과 초콜릿을 담은 55.8% 병입 몰트입니다.", "건포도와 무화과, 초콜릿", "잘 익은 체리와 향신료", "다크 초콜릿과 긴 셰리 여운"],
    ["arran-18", "아란 18년", "Arran 18 Year Old", 46, 18, ["과일", "셰리", "스파이시"], "버번과 셰리 캐스크의 균형에 장기 숙성의 깊이를 더해 아란의 밝은 과일 풍미를 풍성하게 펼칩니다.", "캐러멜과 감귤, 구운 견과류", "달콤한 과일과 초콜릿, 향신료", "풍부한 과일과 따뜻한 오크", "https://www.arranwhisky.com/news/213-introducing-the-18-21-yearold"],
    ["arran-21", "아란 21년", "Arran 21 Year Old", 46, 21, ["셰리", "과일", "부드러운"], "21년 숙성한 로크란자 원액의 섬세한 과일과 깊은 캐스크 풍미를 표현한 장기 숙성 몰트입니다.", "오렌지와 말린 과일, 초콜릿", "헤이즐넛과 마멀레이드, 셰리", "달콤한 향신료와 긴 과일 여운", "https://www.arranwhisky.com/news/213-introducing-the-18-21-yearold"],
    ["arran-port-cask", "아란 포트 캐스크 피니시", "Arran Port Cask Finish", 50, null, ["과일", "스파이시", "바닐라"], "포트 와인 캐스크에서 추가 숙성해 아란의 과일 풍미에 붉은 베리와 풍성한 단맛을 더했습니다.", "붉은 베리와 바닐라", "체리와 초콜릿, 감귤", "과일의 단맛과 잔잔한 향신료", "https://www.arranwhisky.com/shop-whiskies/arran-single-malts/13-arran-single-malt-port-wine-cask-finish"],
  ]),
  ...createWhiskyGroup({ brand: "Springbank", category: "싱글 몰트", country: "스코틀랜드", region: "캠벨타운", source: "https://www.springbank.scot/whisky/springbank-range/" }, [
    ["springbank-5-100-proof", "스프링뱅크 5년 100 프루프", "Springbank 5 Year Old 100 Proof", 57.1, 5, ["과일", "스모키", "바닐라"], "버번 캐스크에서 숙성한 5년 원액을 100 프루프로 병입해 밝은 과일과 미네랄을 드러냅니다.", "풋사과와 풀꽃, 미네랄", "화이트 초콜릿과 가벼운 피트", "밝은 과일과 은은한 연기"],
    ["springbank-10", "스프링뱅크 10년", "Springbank 10 Year Old", 46, 10, ["스모키", "과일", "꿀"], "전통적인 2.5회 증류와 가벼운 피트로 만든 캠벨타운 몰트. 해안성과 과일, 곡물의 균형이 특징입니다.", "곡물과 구스베리, 망고", "바닐라와 포도, 벌집 꿀", "오일리한 몰트와 가벼운 훈연"],
    ["springbank-15", "스프링뱅크 15년", "Springbank 15 Year Old", 46, 15, ["셰리", "스모키", "과일"], "올로로소 셰리 캐스크의 깊은 풍미가 캠벨타운의 해안성 원액과 만나는 15년 숙성 표현입니다.", "건과일과 다크 초콜릿", "토피와 견과류, 오일리한 몰트", "짭짤한 연기와 셰리"],
    ["springbank-18", "스프링뱅크 18년", "Springbank 18 Year Old", 46, 18, ["과일", "스모키", "우디"], "장기 숙성이 과일과 오크에 복합성을 더한 스프링뱅크. 연도에 따라 캐스크 구성과 세부 풍미가 달라집니다.", "잘 익은 과일과 바닐라, 오크", "진한 과일과 오일리한 몰트", "부드러운 연기와 해안의 소금기"],
    ["springbank-21", "스프링뱅크 21년", "Springbank 21 Year Old", 46, 21, ["과일", "우디", "스모키"], "21년 숙성으로 과일과 나무, 은은한 훈연이 깊어진 몰트. 배치별 캐스크 구성은 달라질 수 있습니다.", "열대 과일과 오크, 토피", "잘 익은 과일과 가죽, 몰트", "미네랄과 긴 오크의 여운"],
  ]),
  ...createWhiskyGroup({ brand: "Longrow", category: "싱글 몰트", country: "스코틀랜드", region: "캠벨타운", source: "https://www.springbank.scot/whisky/" }, [
    ["longrow-peated", "롱로우 피티드", "Longrow Peated", 46, null, ["피트", "스모키", "바닐라"], "스프링뱅크 증류소의 강한 피트와 두 차례 증류를 사용하는 롱로우 스타일을 보여주는 몰트입니다.", "바닐라 크림과 강한 훈연", "구운 몰트와 오일리한 피트", "짙은 연기와 은은한 단맛"],
    ["longrow-18", "롱로우 18년", "Longrow 18 Year Old", 46, 18, ["피트", "스모키", "과일"], "강한 피트 원액을 18년 숙성해 달콤한 과일과 부드러워진 연기를 함께 즐길 수 있는 롱로우입니다.", "베리와 초콜릿, 숯불", "크리미한 과일과 오크, 피트", "짭짤한 해풍과 긴 훈연"],
  ]),
  ...createWhiskyGroup({ brand: "Hazelburn", category: "싱글 몰트", country: "스코틀랜드", region: "캠벨타운", source: "https://www.springbank.scot/whisky/" }, [
    ["hazelburn-10", "헤이즐번 10년", "Hazelburn 10 Year Old", 46, 10, ["과일", "바닐라", "부드러운"], "스프링뱅크 증류소에서 비피트 맥아를 세 차례 증류해 만든 가볍고 우아한 캠벨타운 몰트입니다.", "서양배와 바닐라, 꿀", "사과와 크림, 달콤한 몰트", "부드러운 과일과 깔끔한 오크"],
  ]),
  ...createWhiskyGroup({ brand: "Glen Scotia", category: "싱글 몰트", country: "스코틀랜드", region: "캠벨타운", source: "https://us.glenscotia.com/collections/single-malt-scotch-whisky" }, [
    ["glen-scotia-double-cask", "글렌 스코시아 더블 캐스크", "Glen Scotia Double Cask", 46, null, ["바닐라", "셰리", "스파이시"], "버번과 페드로 히메네스 셰리 캐스크의 풍미를 조합해 짭짤한 원액에 달콤한 깊이를 더했습니다.", "캐러멜과 바닐라, 과일", "토피와 셰리, 은은한 향신료", "달콤한 오크와 해안 풍미"],
    ["glen-scotia-15", "글렌 스코시아 15년", "Glen Scotia 15 Year Old", 46, 15, ["과일", "바닐라", "우디"], "아메리칸 오크 숙성으로 과일과 바닐라, 캠벨타운의 해안 특성을 균형 있게 표현합니다.", "시트러스와 바닐라, 오크", "살구와 캐러멜, 부드러운 향신료", "드라이한 나무와 소금기"],
    ["glen-scotia-18", "글렌 스코시아 18년", "Glen Scotia 18 Year Old", 46, 18, ["과일", "셰리", "우디"], "18년의 숙성이 깊은 과일과 달콤한 오크를 엮어낸 캠벨타운의 장기 숙성 싱글 몰트입니다.", "건과일과 바닐라, 꽃향", "살구와 건포도, 풍부한 오크", "부드러운 향신료와 잔잔한 소금기"],
    ["glen-scotia-25", "글렌 스코시아 25년", "Glen Scotia 25 Year Old", 48.8, 25, ["과일", "바닐라", "우디"], "25년 숙성한 원액의 복합적인 과일과 달콤한 오크를 48.8%로 병입한 표현입니다.", "오렌지 껍질과 바닐라, 바닷바람", "붉은 사과와 열대 과일, 오크", "긴 과일 여운과 가벼운 향신료"],
    ["glen-scotia-victoriana", "글렌 스코시아 빅토리아나", "Glen Scotia Victoriana", 54.2, null, ["과일", "스파이시", "우디"], "그을린 오크와 PX 셰리 캐스크를 활용한 풍부한 표현. 공식 미국 제품 페이지의 54.2% 병입 기준입니다.", "크렘 브륄레와 당밀, 체리", "갈색 설탕과 정향, 검붉은 과일", "단단한 오크와 은근한 연기", "https://us.glenscotia.com/products/victoriana-whisky"],
  ]),
  ...createWhiskyGroup({ brand: "Loch Lomond", category: "싱글 몰트", country: "스코틀랜드", region: "하이랜드", source: "https://www.lochlomondwhiskies.com/collections/12-year-old-single-malt-whisky" }, [
    ["loch-lomond-original", "로크 로몬드 오리지널", "Loch Lomond Original", 40, null, ["과일", "바닐라", "부드러운"], "로크 로몬드의 과일과 부드러운 몰트, 은은한 연기를 담은 숙성 연수 미표기 싱글 몰트입니다.", "사과와 배, 곡물", "바닐라와 달콤한 몰트", "가벼운 연기와 부드러운 오크"],
    ["loch-lomond-12", "로크 로몬드 12년", "Loch Lomond 12 Year Old", 46, 12, ["과일", "꿀", "스모키"], "서로 다른 형태의 증류기에서 얻은 원액을 조합해 과일과 꿀, 은은한 피트를 담았습니다.", "배와 복숭아, 달콤한 몰트", "과수원 과일과 바닐라, 꿀", "잔잔한 연기와 건조한 오크"],
    ["loch-lomond-inchmurrin-12", "로크 로몬드 인치머린 12년", "Loch Lomond Inchmurrin 12 Year Old", 46, 12, ["과일", "꿀", "부드러운"], "직선형 목의 증류기에서 얻은 비피트 원액으로 꽃향과 풍부한 과일의 개성을 강조했습니다.", "복숭아와 살구, 꽃향", "크리미한 배와 바닐라, 꿀", "오렌지와 부드러운 오크", "https://www.lochlomondwhiskies.com/products/inchmurrin-12-year-old-single-malt-whisky"],
    ["loch-lomond-inchmoan-12", "로크 로몬드 인치모안 12년", "Loch Lomond Inchmoan 12 Year Old", 46, 12, ["피트", "스모키", "스파이시"], "두 가지 형태의 증류기로 만든 피트 원액을 조합해 연기와 향신료에 깊이를 더한 12년 몰트입니다.", "피트 연기와 바닐라, 배", "달콤한 과일과 후추, 훈연", "스모키한 오크와 정향"],
  ]),
  ...createWhiskyGroup({ brand: "The Dalmore", category: "싱글 몰트", country: "스코틀랜드", region: "하이랜드", source: "https://www.thedalmore.com/en-us/our-collections/the-principal-collection/" }, [
    ["dalmore-12", "달모어 12년", "The Dalmore 12 Year Old", 40, 12, ["셰리", "과일", "바닐라"], "버번 캐스크 숙성 뒤 올로로소 셰리 캐스크로 풍미를 더한 달모어의 대표 싱글 몰트입니다.", "오렌지와 초콜릿, 향신료", "감귤과 바닐라, 셰리의 단맛", "커피와 다크 초콜릿", "https://www.thedalmore.com/en/our-collections/the-principal-collection/the-12/"],
    ["dalmore-15", "달모어 15년", "The Dalmore 15 Year Old", 40, 15, ["셰리", "과일", "스파이시"], "다양한 셰리 캐스크를 활용해 오렌지와 향신료가 풍성하게 겹쳐지는 15년 숙성 몰트입니다.", "마멀레이드와 계피, 육두구", "귤과 바닐라, 생강과 사과", "캐러멜 오렌지와 초콜릿", "https://www.thedalmore.com/zh-hans/our-collections/the-principal-collection/the-15/"],
    ["dalmore-18-2024", "달모어 18년 2024 에디션", "The Dalmore 18 Year Old 2024 Edition", 43, 18, ["셰리", "과일", "우디"], "2024년 출시된 18년 숙성 에디션. 버번과 셰리 캐스크의 풍부한 과일, 견과류 풍미가 깊게 이어집니다.", "오렌지와 바닐라, 다크 초콜릿", "건포도와 감귤, 진한 오크", "졸인 과일과 부드러운 코코아"],
    ["dalmore-cigar-malt", "달모어 시가 몰트 리저브", "The Dalmore Cigar Malt Reserve", 44, null, ["과일", "셰리", "스파이시"], "버번, 올로로소 셰리와 카베르네 소비뇽 와인 캐스크를 조합한 풍성하고 묵직한 달모어입니다.", "계피와 바닐라, 붉은 과일", "열대 과일과 바나나 토피", "오렌지와 다크 초콜릿, 향신료", "https://www.thedalmore.com/zh-hans/our-collections/the-principal-collection/cigar-malt-reserve/"],
    ["dalmore-port-wood", "달모어 포트 우드 리저브", "The Dalmore Port Wood Reserve", 46.5, null, ["과일", "바닐라", "우디"], "토니 포트 캐스크가 달모어 원액의 오렌지와 토피에 붉은 과일의 풍미를 더합니다.", "붉은 베리와 오렌지, 토피", "넥타린과 캐러멜, 구운 호두", "자두와 블러드 오렌지, 체리", "https://www.thedalmore.com/zh-hans/our-collections/the-principal-collection/port-wood-reserve/"],
    ["dalmore-king-alexander-iii", "달모어 킹 알렉산더 3세", "The Dalmore King Alexander III", 40, null, ["과일", "셰리", "스파이시"], "여섯 종류 캐스크의 풍미를 조합해 베리와 감귤, 초콜릿과 향신료의 층을 만든 달모어입니다.", "붉은 베리와 열대 과일", "바닐라와 캐러멜, 감귤", "계피와 육두구, 달콤한 오크"],
  ]),
  ...createWhiskyGroup({ brand: "The GlenDronach", category: "싱글 몰트", country: "스코틀랜드", region: "하이랜드", source: "https://www.glendronachdistillery.com/product/aged-15-years/" }, [
    ["glendronach-15", "글렌드로낙 15년", "The GlenDronach 15 Year Old", 46, 15, ["셰리", "과일", "스파이시"], "PX와 올로로소 셰리 캐스크에서 숙성해 체리와 무화과, 진한 초콜릿을 담은 하이랜드 몰트입니다.", "마라스키노 체리와 초콜릿 민트", "꿀을 입힌 살구와 무화과", "블랙 체리와 은은한 향신료"],
    ["glendronach-18", "글렌드로낙 18년", "The GlenDronach 18 Year Old", 46, 18, ["셰리", "과일", "우디"], "올로로소 셰리 캐스크의 짙은 과일과 견과류가 두드러지는 18년 숙성 글렌드로낙입니다.", "다크 초콜릿과 오렌지, 건포도", "호두와 무화과, 풍부한 셰리", "진한 과일과 긴 오크", "https://www.glendronachdistillery.com/product/aged-18-years/"],
    ["glendronach-21", "글렌드로낙 21년", "The GlenDronach 21 Year Old", 48, 21, ["셰리", "과일", "스파이시"], "올로로소와 PX 셰리 캐스크에서 21년 숙성해 과일 케이크와 초콜릿의 깊이를 살렸습니다.", "블랙베리와 자두, 셰리", "과일 케이크와 다크 초콜릿", "정향과 오크, 깊은 건과일", "https://www.glendronachdistillery.com/product/aged-21-years/"],
  ]),
  ...createWhiskyGroup({ brand: "Old Pulteney", category: "싱글 몰트", country: "스코틀랜드", region: "하이랜드", source: "https://oldpulteney.com/collections/our-whisky" }, [
    ["old-pulteney-12", "올드 풀트니 12년", "Old Pulteney 12 Year Old", 40, 12, ["시트러스", "꿀", "바닐라"], "북부 항구 위크의 해안성을 보여주는 버번 캐스크 숙성 몰트. 감귤과 꿀에 가벼운 소금기가 더해집니다.", "감귤 껍질과 바다 소금", "바닐라 크림과 꿀, 몰트", "산뜻한 과일과 짭짤한 여운"],
    ["old-pulteney-15", "올드 풀트니 15년", "Old Pulteney 15 Year Old", 46, 15, ["과일", "바닐라", "스파이시"], "버번과 스패니시 오크 캐스크에서 숙성해 감귤과 초콜릿, 해안의 소금기를 균형 있게 담았습니다.", "따뜻한 바닐라와 말린 감귤", "다크 초콜릿과 건과일, 향신료", "오크와 바다의 미네랄", "https://oldpulteney.com/products/15-years-old-single-malt-scotch-whisky/"],
    ["old-pulteney-18", "올드 풀트니 18년", "Old Pulteney 18 Year Old", 46, 18, ["과일", "셰리", "스파이시"], "버번 숙성에 올로로소 셰리 캐스크를 더해 건과일과 향신료의 깊이를 얻은 18년 몰트입니다.", "건포도와 진한 토피", "구운 향신료와 초콜릿, 과일", "풍부한 오크와 은은한 소금기", "https://oldpulteney.com/products/18-years-old-single-malt-scotch-whisky"],
    ["old-pulteney-huddart", "올드 풀트니 허다트", "Old Pulteney Huddart", 46, null, ["스모키", "꿀", "바닐라"], "피트 위스키를 담았던 캐스크로 마무리해 올드 풀트니의 해안 풍미에 부드러운 연기를 더했습니다.", "유목의 연기와 따뜻한 꿀", "바닐라와 토피, 가벼운 훈연", "해안의 소금기와 은은한 연기", "https://oldpulteney.com/blogs/news/new-expressions-set-sail-for-the-maritime-malt"],
  ]),
  ...createWhiskyGroup({ brand: "Highland Park", category: "싱글 몰트", country: "스코틀랜드", region: "오크니 섬", source: "https://www.highlandparkwhisky.com/en/collection" }, [
    ["highland-park-15", "하이랜드 파크 15년", "Highland Park 15 Year Old", 44, 15, ["꿀", "시트러스", "스모키"], "셰리 시즈닝 오크와 헤더 피트가 감귤, 꽃꿀, 바닐라의 대비를 이루는 오크니 몰트입니다.", "꿀을 입힌 파인애플과 바닐라", "구운 계피와 레몬 껍질", "헤더 피트와 달콤한 오크", "https://www.highlandparkwhisky.com/en-us/products/15-year-old-single-malt-whisky"],
    ["highland-park-18", "하이랜드 파크 18년", "Highland Park 18 Year Old", 43, 18, ["꿀", "스모키", "과일"], "긴 숙성을 통해 꽃꿀과 은은한 헤더 연기, 과일의 깊이가 함께 펼쳐지는 하이랜드 파크입니다.", "헤더 꿀과 체리, 오렌지", "진한 초콜릿과 향신료, 과일", "향긋한 피트와 긴 꿀의 여운"],
  ]),
  ...createWhiskyGroup({ brand: "Auchentoshan", category: "싱글 몰트", country: "스코틀랜드", region: "로우랜드", source: "https://www.auchentoshan.com/core-range" }, [
    ["auchentoshan-american-oak", "오켄토션 아메리칸 오크", "Auchentoshan American Oak", 40, null, ["바닐라", "시트러스", "부드러운"], "세 차례 증류한 부드러운 원액을 버번 아메리칸 오크에서 숙성해 바닐라와 코코넛을 담았습니다.", "바닐라와 코코넛, 감귤", "복숭아와 달콤한 오크", "자몽의 산뜻한 쌉싸름함", "https://www.auchentoshan.com/core-range/american-oak"],
    ["auchentoshan-12", "오켄토션 12년 더블 캐스크", "Auchentoshan 12 Year Old Double Cask", 40, 12, ["시트러스", "과일", "부드러운"], "버번과 올로로소 셰리 오크 숙성이 삼중 증류 원액에 과일과 페이스트리의 풍미를 더합니다.", "달콤한 페이스트리와 레몬", "오크와 귤, 라임", "선명한 생강과 감귤", "https://www.auchentoshan.com/core-range/12-year-old-double-cask"],
    ["auchentoshan-three-wood", "오켄토션 쓰리 우드", "Auchentoshan Three Wood", 43, null, ["셰리", "과일", "스파이시"], "버번, 올로로소 셰리와 PX 셰리 캐스크의 영향을 담아 검붉은 과일과 견과류 풍미가 짙습니다.", "블랙커런트와 자두", "헤이즐넛과 계피, 버터스카치", "달콤한 오크와 과일", "https://www.auchentoshan.com/core-range/three-wood"],
  ]),
  ...createWhiskyGroup({ brand: "Johnnie Walker", category: "블렌디드", country: "스코틀랜드", region: "스코틀랜드", source: "https://www.johnniewalker.com/en-gb/whisky-guide/how-whisky-is-made" }, [
    ["johnnie-walker-red", "조니워커 레드 라벨", "Johnnie Walker Red Label", 40, null, ["스파이시", "과일", "스모키"], "밝은 과일과 후추, 은근한 연기를 담은 조니워커의 대표 블렌드로 하이볼에도 잘 어울립니다.", "사과와 감귤, 가벼운 연기", "후추와 달콤한 과일", "부드러운 훈연과 향신료"],
    ["johnnie-walker-double-black", "조니워커 더블 블랙", "Johnnie Walker Double Black", 40, null, ["피트", "스모키", "우디"], "블랙 라벨의 풍미를 바탕으로 피트와 그을린 오크의 인상을 더욱 강조한 블렌디드 스카치입니다.", "달콤한 연기와 바닐라", "건포도와 크리미한 몰트, 숯불", "길게 남는 훈연과 오크", "https://www.johnniewalker.com/en/our-whisky/core-range/johnnie-walker-double-black"],
    ["johnnie-walker-gold-reserve", "조니워커 골드 라벨 리저브", "Johnnie Walker Gold Label Reserve", 40, null, ["꿀", "과일", "부드러운"], "크리미한 꿀과 부드러운 과일을 중심으로 싱글 몰트와 그레인 원액을 조합한 조니워커입니다.", "꽃꿀과 은은한 오크", "크림과 달콤한 과일, 바닐라", "가벼운 훈연과 매끄러운 꿀"],
    ["johnnie-walker-18", "조니워커 18년", "Johnnie Walker Aged 18 Years", 40, 18, ["과일", "바닐라", "스파이시"], "최소 18년 숙성한 원액을 결합해 과일과 바닐라, 따뜻한 향신료의 층을 만든 블렌드입니다.", "과일과 토피, 부드러운 오크", "달콤한 바닐라와 향신료", "크리미한 몰트와 은은한 연기", "https://www.johnniewalker.com/de-de/our-whisky/core-range/johnnie-walker-aged-18-years"],
  ]),
  ...createWhiskyGroup({ brand: "Chivas Regal", category: "블렌디드", country: "스코틀랜드", region: "스코틀랜드", source: "https://www.chivas.com/es-mx/informacion-del-producto/" }, [
    ["chivas-18", "시바스 리갈 18년", "Chivas Regal 18 Year Old", 40, 18, ["과일", "바닐라", "부드러운"], "18년 이상 숙성한 원액을 결합해 건과일과 다크 초콜릿의 복합적인 풍미를 담은 시바스입니다.", "말린 과일과 버터 토피", "다크 초콜릿과 꽃향, 달콤한 몰트", "따뜻한 향신료와 긴 단맛"],
    ["chivas-xv", "시바스 리갈 XV 15년", "Chivas Regal XV 15 Year Old", 40, 15, ["과일", "바닐라", "부드러운"], "15년 숙성 블렌드의 일부를 코냑 캐스크에서 마무리해 과수원 과일과 풍부한 단맛을 더했습니다.", "붉은 사과와 오렌지, 꿀", "서양배와 버터스카치, 캐러멜", "바닐라와 부드러운 과일"],
    ["chivas-25", "시바스 리갈 25년", "Chivas Regal 25 Year Old", 40, 25, ["과일", "꿀", "부드러운"], "25년 이상 숙성한 원액을 사용해 부드러운 질감과 깊은 과일 풍미를 보여주는 블렌디드 스카치입니다.", "오렌지와 복숭아, 마지팬", "밀크 초콜릿과 달콤한 과일", "풍부하고 부드러운 오크"],
    ["chivas-ultis-xx", "시바스 리갈 울티스 XX 20년", "Chivas Regal Ultis XX 20 Year Old", 40, 20, ["꿀", "과일", "우디"], "다섯 싱글 몰트와 그레인 원액을 조합한 20년 숙성 블렌드로, 꿀과 과일의 깊은 조화를 추구합니다.", "꿀과 복숭아, 계피", "붉은 사과와 바닐라, 오크", "달콤한 향신료와 긴 과일 여운"],
    ["chivas-extra-13-sherry", "시바스 리갈 엑스트라 13년 셰리", "Chivas Regal Extra 13 Oloroso Sherry Cask", 40, 13, ["셰리", "과일", "스파이시"], "블렌드 중 일부를 올로로소 셰리 캐스크에서 숙성해 진한 과일과 견과류의 개성을 더한 13년 제품입니다.", "달콤한 배와 캐러멜", "바닐라와 아몬드, 계피", "따뜻한 셰리와 향신료"],
    ["chivas-mizunara", "시바스 리갈 미즈나라", "Chivas Regal Mizunara", 40, null, ["과일", "우디", "스파이시"], "일부 원액을 일본산 미즈나라 오크 캐스크에서 마무리해 향긋한 나무와 과일의 풍미를 더했습니다.", "배와 오렌지, 꿀", "크리미한 바닐라와 샌들우드", "향긋한 오크와 은은한 향신료", "https://www.chivas.com/vi-vn/cau-chuyen/chivas-bao-nhieu-do/"],
  ]),
  ...createWhiskyGroup({ brand: "Ballantine's", category: "블렌디드", country: "스코틀랜드", region: "스코틀랜드", source: "https://www.ballantines.com/en/product-information/" }, [
    ["ballantines-finest", "발렌타인 파이니스트", "Ballantine's Finest", 40, null, ["꿀", "바닐라", "부드러운"], "가벼운 꽃향과 꿀, 사과의 단맛이 조화를 이루는 발렌타인의 기본 블렌디드 스카치입니다.", "헤더 꿀과 가벼운 향신료", "사과와 밀크 초콜릿, 바닐라", "신선하고 부드러운 단맛"],
    ["ballantines-12", "발렌타인 12년", "Ballantine's 12 Year Old", 40, 12, ["꿀", "바닐라", "우디"], "12년 이상 숙성한 원액의 크리미한 질감과 꿀, 바닐라 오크를 균형 있게 담았습니다.", "꿀과 꽃향, 은은한 오크", "바닐라와 크림, 달콤한 몰트", "부드러운 나무와 꿀"],
    ["ballantines-21", "발렌타인 21년", "Ballantine's 21 Year Old", 40, 21, ["꿀", "과일", "우디"], "장기 숙성 원액의 풍부한 오크와 과일을 보여주는 21년 숙성 블렌디드 스카치입니다.", "사과와 꽃꿀, 향긋한 오크", "달콤한 과일과 감초, 견과류", "길게 이어지는 부드러운 향신료"],
    ["ballantines-30", "발렌타인 30년", "Ballantine's 30 Year Old", 40, 30, ["꿀", "바닐라", "우디"], "30년 이상 숙성한 원액으로 꿀과 바닐라, 복합적인 오크의 긴 여운을 담은 블렌드입니다.", "꽃꿀과 바닐라, 부드러운 나무", "토피와 구운 견과류, 깊은 과일", "길고 우아한 오크의 단맛"],
    ["ballantines-7-american-barrel", "발렌타인 7년 아메리칸 배럴", "Ballantine's 7 American Barrel", 40, 7, ["바닐라", "과일", "부드러운"], "7년 숙성 스카치에 버번 배럴 피니시를 더해 바닐라와 토피의 단맛을 강조했습니다.", "바닐라와 사과, 토피", "크리미한 캐러멜과 오크", "부드러운 바닐라의 여운"],
  ]),
  ...createWhiskyGroup({ brand: "Dewar's", category: "블렌디드", country: "스코틀랜드", region: "스코틀랜드", source: "https://www.dewars.com/dewars-whiskies/" }, [
    ["dewars-white-label", "듀어스 화이트 라벨", "Dewar's White Label", 40, null, ["꿀", "과일", "부드러운"], "애버펠디를 중심으로 과일과 꽃꿀, 가벼운 훈연을 엮은 듀어스의 대표 블렌드입니다.", "꽃꿀과 배, 시트러스", "바닐라와 달콤한 몰트", "가벼운 연기와 꿀"],
    ["dewars-12", "듀어스 12년", "Dewar's 12 Year Old", 40, 12, ["꿀", "바닐라", "부드러운"], "12년 숙성 원액의 블렌딩 뒤 추가 숙성을 거쳐 부드러움과 풍부한 바닐라를 담았습니다.", "바닐라와 꽃꿀, 오크", "토피와 과수원 과일", "부드러운 꿀과 가벼운 향신료", "https://shop.dewars.com/collections/dewars"],
    ["dewars-15", "듀어스 15년", "Dewar's 15 Year Old", 40, 15, ["꿀", "과일", "바닐라"], "15년 숙성 원액을 결합해 잘 익은 과일과 크리미한 단맛을 강조한 듀어스입니다.", "꿀과 토피, 사과", "열대 과일과 바닐라 크림", "달콤한 몰트와 부드러운 오크", "https://shop.dewars.com/collections/dewars"],
    ["dewars-18", "듀어스 18년", "Dewar's 18 Year Old", 40, 18, ["꿀", "과일", "우디"], "18년 이상의 숙성과 추가 결합 과정을 통해 깊은 과일과 부드러운 오크를 보여주는 블렌드입니다.", "마지팬과 꿀, 과일", "크리미한 바닐라와 구운 견과류", "풍성한 과일과 드라이한 오크", "https://shop.dewars.com/collections/dewars"],
    ["dewars-double-double-21", "듀어스 더블 더블 21년", "Dewar's Double Double 21 Year Old", 46, 21, ["꿀", "과일", "바닐라"], "네 단계 숙성 방식으로 원액의 결합과 마무리를 세심하게 조절한 21년 블렌디드 스카치입니다.", "핵과류와 꿀, 바닐라", "화이트 초콜릿과 감귤, 계피", "부드럽고 길게 남는 단맛", "https://shop.dewars.com/collections/discover-your-dewars/products/dewars-double-double-21-year-old-whisky"],
  ]),
  ...createWhiskyGroup({ brand: "Bruichladdich", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.bruichladdich.com/products/bruichladdich-the-classic-laddie/1000" }, [
    ["bruichladdich-classic-laddie-10", "브룩라디 클래식 라디 10년", "Bruichladdich The Classic Laddie 10 Year Old", 50, 10, ["시트러스", "과일", "바닐라"], "10년 숙성 표기가 도입된 클래식 라디. 스코틀랜드산 보리로 만든 비피트 몰트가 꽃향과 감귤, 해안의 미네랄을 표현합니다.", "레몬 껍질과 복숭아, 꽃향", "달콤한 오렌지와 보리, 아몬드", "핵과류와 은은한 바다의 미네랄"],
  ]),
  ...createWhiskyGroup({ brand: "Port Charlotte", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.bruichladdich.com/products/port-charlotte-10" }, [
    ["port-charlotte-10", "포트 샬롯 10년", "Port Charlotte 10 Year Old", 50, 10, ["피트", "스모키", "바닐라", "시트러스"], "브룩라디 증류소의 강한 피트 몰트로 아일라에서 증류·숙성·병입합니다. 바비큐 연기와 해안 풍미에 밝은 과일이 어우러집니다.", "해안의 연기와 코코넛, 바닐라", "크리미한 몰트와 레몬 꿀", "달콤한 과일과 길게 퍼지는 피트"],
  ]),
  ...createWhiskyGroup({ brand: "Kilchoman", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.kilchomandistillery.com/our-whisky/" }, [
    ["kilchoman-machir-bay", "킬호만 마키어 베이", "Kilchoman Machir Bay", 46, null, ["피트", "스모키", "시트러스", "바닐라"], "버번 캐스크를 중심으로 셰리 캐스크를 조합해 아일라 피트와 밝은 과일, 바닐라를 균형 있게 담았습니다.", "레몬 껍질과 배, 바닐라", "열대 과일과 꿀, 따뜻한 연기", "시트러스와 후추, 해안의 피트", "https://www.kilchomandistillery.com/our-whisky/machir-bay/"],
    ["kilchoman-sanaig", "킬호만 사닉", "Kilchoman Sanaig", 46, null, ["피트", "스모키", "셰리", "과일"], "올로로소 셰리 캐스크의 비중을 높여 말린 과일과 향신료에 킬호만의 강한 피트 연기를 더했습니다.", "건포도와 배, 오렌지 껍질", "잘 익은 자두와 체리, 훈연", "캐러멜과 정향, 달콤한 피트", "https://www.kilchomandistillery.com/our-whisky/sanaig/"],
    ["kilchoman-rockside-11", "킬호만 록사이드 11년", "Kilchoman Rockside 11 Year Old", 46, 11, ["피트", "시트러스", "과일", "스파이시"], "록사이드 농장에서 기른 보리로 만든 11년 숙성 몰트. 버번과 셰리 캐스크에 가벼운 피트를 결합한 정규 제품입니다.", "은은한 연기와 산뜻한 감귤", "열대 과일과 달콤한 보리", "가벼운 피트와 향신료", "https://www.kilchomandistillery.com/distillery-news/rockside-11-years-old/"],
  ]),
  ...createWhiskyGroup({ brand: "Bowmore", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.bowmore.com/whiskies" }, [
    ["bowmore-9", "보모어 9년", "Bowmore 9 Year Old", 40, 9, ["셰리", "과일", "스모키"], "버번 캐스크와 올로로소 셰리 버트에서 숙성한 보모어. 부드러운 연기와 과일, 달콤한 오크를 담았습니다.", "사과와 건포도, 코코아", "계피를 더한 건포도와 소금기", "따뜻한 단맛과 은은한 연기", "https://www.bowmore.com/all-collectionsall-collections/permanent-collection/9-year-old"],
    ["bowmore-12", "보모어 12년", "Bowmore 12 Year Old", 40, 12, ["꿀", "시트러스", "스모키", "피트"], "레몬과 헤더 꿀, 부드러운 흙내음의 피트가 균형을 이루는 보모어의 대표 아일라 몰트입니다.", "레몬과 꽃꿀, 은은한 피트", "따뜻한 과일과 다크 초콜릿", "달콤하고 오래 남는 연기", "https://www.bowmore.com/en-gb/whiskies/12-year-old"],
    ["bowmore-15", "보모어 15년", "Bowmore 15 Year Old", 43, 15, ["과일", "바닐라", "스모키", "우디"], "15년 숙성의 과일과 구운 견과류를 보모어 특유의 잔잔한 연기로 감싼 정규 컬렉션입니다.", "바닐라와 구운 아몬드, 졸인 사과", "설탕에 절인 오렌지와 호두", "부드러운 장작 연기와 오크", "https://www.bowmore.com/en-gb/whiskies/15-year-old"],
  ]),
  ...createWhiskyGroup({ brand: "Monkey Shoulder", category: "블렌디드", country: "스코틀랜드", region: "스코틀랜드", source: "https://www.williamgrant.com/product-information/?ageVer=1" }, [
    ["monkey-shoulder-original", "몽키 숄더 오리지널", "Monkey Shoulder Original", 40, null, ["바닐라", "과일", "부드러운"], "스페이사이드 싱글 몰트들을 결합한 블렌디드 몰트. 풍부하고 부드러운 과일 풍미로 칵테일에도 활용됩니다.", "바닐라와 오렌지, 달콤한 몰트", "부드러운 과일과 크리미한 바닐라", "달콤한 몰트와 은은한 향신료"],
    ["monkey-shoulder-smokey", "몽키 숄더 스모키 몽키", "Monkey Shoulder Smokey Monkey", 40, null, ["스모키", "바닐라", "스파이시"], "몽키 숄더의 부드러운 몰트와 바닐라 풍미에 훈연의 인상을 더한 블렌디드 몰트 위스키입니다.", "달콤한 바닐라와 마른 연기", "크리미한 몰트와 구운 향신료", "부드럽게 이어지는 훈연"],
  ]),
  ...createWhiskyGroup({ brand: "Octomore", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.bruichladdich.com/collections/octomore" }, [
    ["octomore-16-1", "옥토모어 16.1", "Octomore 16.1", 59.3, 5, ["피트", "스모키", "꿀", "바닐라"], "퍼스트 필 버번 배럴에서 5년 숙성한 시리즈 16의 기준 표현. 강한 피트와 소금 캐러멜, 섬세한 과일을 담았습니다.", "꿀을 머금은 멜론과 살구", "소금 캐러멜과 초콜릿, 코코넛", "미네랄과 길게 남는 피트 연기", "https://www.bruichladdich.com/products/octomore-16-1"],
    ["octomore-16-2", "옥토모어 16.2", "Octomore 16.2", 58.1, 5, ["피트", "스모키", "셰리", "과일"], "올로로소와 보르도 캐스크 숙성에 마데이라·모스카텔 피니시를 더해 강한 피트와 건과일의 대비를 표현합니다.", "캐러멜과 구운 견과류", "말린 과일과 풍부한 와인 풍미", "달콤한 모닥불 연기", "https://www.bruichladdich.com/products/octomore-16-2"],
    ["octomore-16-3", "옥토모어 16.3", "Octomore 16.3", 61.6, 5, ["피트", "스모키", "꿀"], "아일라 옥토모어 농장의 처치 필드 보리를 사용한 표현. 보리의 개성과 흙내음, 소금기와 피트의 결합을 보여줍니다.", "꿀을 머금은 몰트와 구운 곡물", "짙은 보리와 흙내음, 피트", "은은한 꽃향과 해안의 연기", "https://www.bruichladdich.com/products/octomore-16-3"],
    ["octomore-17-3", "옥토모어 17.3", "Octomore 17.3", 60.9, 5, ["피트", "스모키", "우디"], "아이린스 필드에서 기른 보리로 만들고 버번과 여러 유러피언 오크 캐스크에서 5년 숙성한 시리즈 17의 아일라 보리 표현입니다.", "보리와 강한 피트의 인상", "몰트의 깊이와 오크, 해안 풍미", "길고 강인하게 이어지는 연기", "https://www.bruichladdich.com/products/octomore-17-3"],
  ]),
  ...createWhiskyGroup({ brand: "Bowmore", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.bowmore.com/whiskies" }, [
    ["bowmore-18", "보모어 18년", "Bowmore 18 Year Old", 43, 18, ["과일", "꿀", "스모키"], "정규 컬렉션의 18년 숙성 보모어. 크리미한 캐러멜과 과일에 섬세한 피트 연기가 겹쳐집니다.", "토피와 넥타린, 향긋한 피트", "오렌지와 벌집 꿀, 다크 초콜릿", "깊고 부드럽게 이어지는 향신료", "https://www.bowmore.com/whiskies/18-years-old"],
    ["bowmore-12-sherry-oak", "보모어 12년 셰리 오크 캐스크", "Bowmore 12 Year Old Sherry Oak Cask", 40, 12, ["셰리", "과일", "스모키", "바닐라"], "버번과 올로로소 셰리 캐스크 숙성 뒤 올로로소 피니시를 더한 셰리 오크 컬렉션. 정규 12년과 별도 표현입니다.", "바닐라 캐러멜과 붉은 베리", "배와 복숭아, 계피와 연기", "과일과 달콤한 셰리의 여운", "https://www.bowmore.com/whiskies/12-year-old-sherry-oak-cask"],
    ["bowmore-15-sherry-oak", "보모어 15년 셰리 오크 캐스크", "Bowmore 15 Year Old Sherry Oak Cask", 43, 15, ["셰리", "과일", "스모키", "스파이시"], "셰리 캐스크의 달콤함과 가벼운 향신료에 보모어의 해안 풍미가 어우러지는 15년 셰리 오크 표현입니다.", "코코아와 달콤한 건과일", "대추야자와 부드러운 향신료", "잔잔한 연기와 풍부한 단맛", "https://www.bowmore.com/en-gb/whiskies/15-year-old-sherry-oak-cask"],
    ["bowmore-18-sherry-oak", "보모어 18년 셰리 오크 캐스크", "Bowmore 18 Year Old Sherry Oak Cask", 43, 18, ["셰리", "과일", "스모키", "스파이시"], "버번과 올로로소 숙성 원액에 PX 셰리 피니시를 더해 과일과 코코아, 피트의 깊이를 강조했습니다.", "다크 초콜릿과 감귤, 피트", "오렌지 껍질과 건포도, 아니스", "풍부하고 깊게 남는 과일", "https://www.bowmore.com/whiskies/18-year-old-sherry-oak-cask"],
    ["bowmore-21-sherry-oak", "보모어 21년 셰리 오크 캐스크", "Bowmore 21 Year Old Sherry Oak Cask", 46.8, 21, ["셰리", "꿀", "우디"], "21년 숙성과 퍼스트 필 PX 셰리 피니시로 담뱃잎과 헤더, 밀랍과 당밀의 복합적인 풍미를 펼칩니다.", "담뱃잎과 헤더, 밀랍", "토피와 진한 당밀, 셰리", "깊은 오크와 달콤한 여운", "https://www.bowmore.com/whiskies/21-year-old-sherry-oak-cask"],
  ]),
  ...createWhiskyGroup({ brand: "Kilchoman", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.kilchomandistillery.com/our-whisky/" }, [
    ["kilchoman-batch-strength", "킬호만 배치 스트렝스", "Kilchoman Batch Strength", 57, null, ["피트", "스모키", "과일", "스파이시"], "다시 그을린 레드 와인, 올로로소와 버번 캐스크를 조합한 57% 표현. 짙은 피트와 과일, 소금 캐러멜이 풍부합니다.", "체리와 붉은 과일, 강한 피트", "토피와 바닐라, 향신료와 연기", "버터를 바른 빵과 꿀", "https://www.kilchomandistillery.com/our-whisky/batch-strength/"],
    ["kilchoman-loch-gorm-2026", "킬호만 로크 곰 10년 2026", "Kilchoman Loch Gorm 10 Year Old 2026", 46, 10, ["피트", "스모키", "셰리", "스파이시"], "올로로소 셰리 버트에서 최소 10년 숙성한 2026년 로크 곰. 짙은 건과일과 다크 초콜릿에 훈연과 감귤이 겹칩니다.", "셰리에 밴 과일과 육두구", "다크 초콜릿과 오렌지 껍질", "풍부한 향신료와 피트 연기", "https://www.kilchomandistillery.com/distillery-news/loch-gorm-2026/"],
  ]),
];
