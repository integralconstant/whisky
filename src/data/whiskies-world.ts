import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

// Producer-linked expressions. NAS remains null; country describes the brand's
// production base. International blends disclose imported spirit in the text.
export const worldWhiskies = [
  ...createWhiskyGroup({ brand: "Jameson", category: "블렌디드", country: "아일랜드", region: "코크 · 미들턴", source: "https://www.pernod-ricard.com/en/brands/jameson" }, [
    ["jameson-black-barrel", "제임슨 블랙 배럴", "Jameson Black Barrel", 40, null, ["바닐라", "스파이시", "우디"], "더블 차링 배럴의 영향을 강조한 팟 스틸·그레인 블렌드입니다.", "버터스카치와 퍼지", "견과류, 바닐라와 향신료", "구운 나무와 토피"],
    ["jameson-stout-edition", "제임슨 스타우트 에디션", "Jameson Stout Edition", 40, null, ["바닐라", "부드러운", "우디"], "아이리시 스타우트 맥주를 담았던 배럴로 마무리한 제임슨입니다.", "곡물과 사과", "코코아와 커피의 고소함", "토피와 부드러운 오크"],
    ["jameson-triple-triple-chestnut", "제임슨 트리플 트리플 체스트넛", "Jameson Triple Triple Chestnut Cask", 40, null, ["바닐라", "과일", "우디"], "버번·셰리·밤나무 캐스크를 사용한 트리플 트리플의 체스트넛 버전입니다.", "헤이즐넛과 배", "바닐라 퍼지와 구운 아몬드", "밤나무와 잔잔한 향신료", "https://www.jamesonwhiskey.com/en-us/our-whiskey/jameson-triple-triple/"],
  ]),
  ...createWhiskyGroup({ brand: "Redbreast", category: "싱글 팟 스틸", country: "아일랜드", region: "코크 · 미들턴", source: "https://www.redbreastwhiskey.com/en-us/whiskey-collections/" }, [
    ["redbreast-15", "레드브레스트 15년", "Redbreast 15 Year Old", 46, 15, ["과일", "스파이시", "우디"], "퍼스트 필과 리필 캐스크의 균형을 살린 15년 팟 스틸입니다.", "베리와 아로마 오일", "잘 익은 과일과 구운 나무", "길고 은은한 향신료", "https://www.redbreastwhiskey.com/en-us/whiskey-collections/redbreast-15-year-old/"],
    ["redbreast-18", "레드브레스트 18년", "Redbreast 18 Year Old", 46, 18, ["셰리", "과일", "스파이시"], "버번·올로로소·크림 셰리·루비 포트 캐스크를 결합한 18년 제품입니다.", "블랙커런트와 헤이즐넛", "건포도, 생강과 오렌지 껍질", "과일과 오크가 길게 지속", "https://www.redbreastwhiskey.com/en-us/whiskey-collections/redbreast-18-year-old/"],
    ["redbreast-21", "레드브레스트 21년", "Redbreast 21 Year Old", 46, 21, ["셰리", "과일", "바닐라", "우디"], "버번 배럴과 퍼스트 필 올로로소에서 숙성한 풍부한 21년 팟 스틸입니다.", "열대 과일과 말린 과일", "바닐라, 견과류와 부드러운 과육", "오크와 보리의 긴 여운", "https://www.redbreastwhiskey.com/en-us/whiskey-collections/redbreast-21-year-old-whiskey/"],
    ["redbreast-lustau", "레드브레스트 루스타우", "Redbreast Lustau Edition", 46, null, ["셰리", "과일", "스파이시"], "루스타우의 올로로소 셰리 버트에서 추가 숙성한 이베리안 시리즈입니다.", "자두, 대추야자와 무화과", "셰리의 달콤함과 팟 스틸 향신료", "스페니시 오크와 건과일", "https://www.redbreastwhiskey.com/en-us/whiskey-collections/redbreast-lustau-whiskey/"],
    ["redbreast-px", "레드브레스트 PX 에디션", "Redbreast PX Edition", 46, null, ["셰리", "과일", "스파이시"], "페드로 히메네스 셰리 혹스헤드 피니시로 진한 단맛을 더합니다.", "구운 견과류와 달콤한 셰리", "시럽 같은 과일과 향신료", "풍부하고 달콤한 여운", "https://www.redbreastwhiskey.com/en-us/whiskey-collections/redbreast-px-edition/"],
    ["redbreast-missouri-oak", "레드브레스트 미주리 오크", "Redbreast Missouri Oak Edition", 50.5, null, ["바닐라", "과일", "스파이시", "우디"], "미주리산 버진 오크에서 10개월 마무리한 아메리칸 오크 시리즈입니다.", "토피 사과와 체리", "바닐라 크림, 육두구와 베리", "견과류와 오크의 긴 마무리", "https://www.redbreastwhiskey.com/en-us/whiskey-collections/redbreast-missouri-oak-edition/"],
  ]),
  ...createWhiskyGroup({ brand: "Spot Whiskeys", category: "싱글 팟 스틸", country: "아일랜드", region: "코크 · 미들턴", source: "https://www.pernod-ricard.com/en/brands/green-spot" }, [
    ["green-spot", "그린 스팟", "Green Spot", 40, null, ["과일", "꿀", "부드러운"], "미첼 가문의 전통을 잇는 연산 미표기 싱글 팟 스틸입니다.", "신선한 과일과 몰트", "꿀, 보리와 가벼운 향신료", "과일의 부드러운 단맛"],
    ["yellow-spot-12", "옐로 스팟 12년", "Yellow Spot 12 Year Old", 46, 12, ["셰리", "과일", "꿀", "스파이시"], "버번·셰리·말라가 와인 캐스크에서 숙성한 12년 싱글 팟 스틸입니다.", "건초, 꿀과 향신료", "사과, 초콜릿과 달콤한 오크", "붉은 포도와 보리", "https://midletondistillerycollection.com/spot-whiskeys/yellow-spot-product/"],
  ]),
  ...createWhiskyGroup({ brand: "Teeling", category: "블렌디드", country: "아일랜드", region: "더블린", source: "https://www.teelingwhiskey.com/teeling-whiskeys/small-batch-whiskey/" }, [
    ["teeling-small-batch", "틸링 스몰 배치", "Teeling Small Batch", 46, null, ["과일", "바닐라", "스파이시"], "버번 숙성 몰트와 그레인을 결합하고 중미 럼 캐스크로 마무리합니다.", "꽃, 바닐라와 럼 건포도", "말린 살구와 크리미한 단맛", "오크와 따뜻한 향신료"],
  ]),
  ...createWhiskyGroup({ brand: "Teeling", category: "싱글 그레인", country: "아일랜드", region: "더블린", source: "https://www.teelingwhiskey.com/teeling-whiskeys/single-grain-whiskey/" }, [
    ["teeling-single-grain", "틸링 싱글 그레인", "Teeling Single Grain", 46, null, ["과일", "스파이시", "부드러운"], "옥수수 중심 원액을 미국 레드 와인 캐스크에서 숙성한 그레인 위스키입니다.", "붉은 포도와 베리", "부드러운 베리와 향신료", "와인 탄닌의 짧고 드라이한 여운"],
  ]),
  ...createWhiskyGroup({ brand: "Teeling", category: "싱글 팟 스틸", country: "아일랜드", region: "더블린", source: "https://www.teelingwhiskey.com/us/en/teeling-whiskeys/single-pot-still-whiskey/" }, [
    ["teeling-single-pot-still", "틸링 싱글 팟 스틸", "Teeling Single Pot Still", 46, null, ["과일", "시트러스", "스파이시"], "발아 보리와 비발아 보리를 동량 사용하고 세 종류의 오크통에서 숙성합니다.", "자몽, 리치와 계피", "복숭아, 크림과 올스파이스", "흑설탕과 드라이한 향신료"],
  ]),
  ...createWhiskyGroup({ brand: "Teeling", category: "싱글 몰트", country: "아일랜드", region: "더블린", source: "https://www.teelingwhiskey.com/vintage-reserve-collection/" }, [
    ["teeling-single-malt", "틸링 싱글 몰트", "Teeling Single Malt", 46, null, ["과일", "바닐라", "스파이시"], "여러 캐스크의 개성을 결합해 과일 중심의 풍미를 표현한 싱글 몰트입니다.", "익은 과일과 몰트", "달콤한 과일과 바닐라", "부드러운 오크와 향신료"],
    ["teeling-blackpitts", "틸링 블랙피츠", "Teeling Blackpitts Peated Single Malt", 46, null, ["피트", "스모키", "과일", "꿀"], "세 번 증류한 피트 몰트를 버번·소테른 캐스크에서 숙성합니다.", "바비큐 연기와 오렌지 껍질", "꿀, 구운 파인애플과 배", "짭짤한 캐러멜과 연기", "https://www.teelingwhiskey.com/teeling-whiskeys/teeling-blackpitts-peated-single-malt/"],
    ["teeling-blackpitts-cask-strength", "틸링 블랙피츠 캐스크 스트렝스", "Teeling Blackpitts Cask Strength", 56.5, null, ["피트", "스모키", "과일"], "버번 캐스크에서 숙성한 블랙피츠의 56.5% 한정 병입입니다.", "흙내음, 과수원 과일과 메이플", "그을린 사과, 배와 피트", "짭짤한 스모크", "https://www.teelingwhiskey.com/limited-edition-bottlings/"],
    ["teeling-rising-reserve-21-1", "틸링 라이징 리저브 21년 No.1", "Teeling Rising Reserve 21 Year Old No.1", 46, 21, ["과일", "시트러스", "우디"], "버번 숙성 후 카르카벨로스 화이트 포트 캐스크에서 마무리한 한정판입니다.", "풋사과와 꿀을 곁들인 감귤", "졸인 과일, 캐러멜과 계피", "구운 카카오와 오크"],
    ["teeling-30", "틸링 30년", "Teeling 30 Year Old Single Malt", 46, 30, ["과일", "시트러스", "우디"], "버번과 소테른 와인 캐스크의 풍미가 어우러진 30년 싱글 몰트입니다.", "과수원 과일과 구운 견과류", "복숭아, 살구와 감귤", "과일, 오크와 은은한 훈연"],
  ]),
  ...createWhiskyGroup({ brand: "Writers' Tears", category: "블렌디드", country: "아일랜드", region: "아일랜드", source: "https://www.walshwhiskey.com/whiskey/double-oak/" }, [
    ["writers-tears-double-oak", "라이터스 티어스 더블 오크", "Writers' Tears Double Oak", 46, null, ["과일", "바닐라", "시트러스"], "싱글 몰트·팟 스틸을 버번 및 프렌치 오크 코냑 캐스크와 결합합니다.", "바닐라, 자두와 졸인 배", "감귤 껍질과 초콜릿", "은은한 향신료가 남는 여운"],
  ]),
  ...createWhiskyGroup({ brand: "The Irishman", category: "블렌디드", country: "아일랜드", region: "아일랜드", source: "https://www.walshwhiskey.com/whiskey/founders-reserve/" }, [
    ["irishman-harvest", "아이리시맨 더 하베스트", "The Irishman The Harvest", 40, null, ["과일", "스파이시", "우디"], "기존 파운더스 리저브의 후속 이름으로, 몰트 70%와 팟 스틸 30%를 결합합니다.", "복숭아와 후추", "다크 초콜릿과 팟 스틸 향신료", "오크와 버터스카치"],
  ]),
  ...createWhiskyGroup({ brand: "The Irishman", category: "싱글 몰트", country: "아일랜드", region: "아일랜드", source: "https://www.walshwhiskey.com/whiskey/single-malt/" }, [
    ["irishman-single-malt", "아이리시맨 싱글 몰트", "The Irishman Single Malt", 40, null, ["꿀", "과일", "셰리"], "아이리시 보리로 세 번 증류하고 버번·올로로소 캐스크에서 숙성합니다.", "꿀을 두른 몰트", "설탕에 절인 과일과 무화과", "건포도와 오크 향신료"],
  ]),
  ...createWhiskyGroup({ brand: "Bushmills", category: "블렌디드", country: "북아일랜드", region: "앤트림", source: "https://bushmills.com/products/black-bush" }, [
    ["bushmills-black-bush", "부시밀 블랙 부시", "Bushmills Black Bush", 40, null, ["셰리", "과일", "부드러운"], "몰트 비중을 높이고 올로로소·버번 캐스크로 풍미를 살린 블렌드입니다.", "달콤한 셰리와 건과일", "매끄러운 질감과 견과류", "짙은 과일의 단맛"],
  ]),
  ...createWhiskyGroup({ brand: "Bushmills", category: "싱글 몰트", country: "북아일랜드", region: "앤트림", source: "https://bushmills.com/collections/core-single-malt-range" }, [
    ["bushmills-10", "부시밀 10년", "Bushmills 10 Year Old", 40, 10, ["꿀", "바닐라", "과일"], "버번과 셰리 캐스크에서 숙성한 세 번 증류의 싱글 몰트입니다.", "꿀과 밀크 초콜릿", "바닐라, 모카와 말린 살구", "산뜻한 과일과 오크", "https://bushmills.com/products/10-year"],
    ["bushmills-12", "부시밀 12년", "Bushmills 12 Year Old", 40, 12, ["과일", "셰리", "부드러운"], "버번·셰리 숙성에 마르살라 와인 피니시를 더한 12년입니다.", "꽃과 배, 파인애플", "다크 초콜릿과 헤이즐넛", "건과일과 따뜻한 견과류", "https://bushmills.com/products/12-year"],
    ["bushmills-16", "부시밀 16년", "Bushmills 16 Year Old", 40, 16, ["과일", "바닐라", "셰리"], "버번·올로로소 숙성 원액을 포트 파이프에서 마무리합니다.", "말린 감귤과 토피", "무화과, 바닐라와 구운 견과류", "마멀레이드와 밀크 초콜릿", "https://bushmills.com/products/16-year"],
    ["bushmills-21", "부시밀 21년", "Bushmills 21 Year Old", 40, 21, ["과일", "바닐라", "우디"], "19년 이상 버번·셰리 숙성 후 마데이라 캐스크에서 2년 더 숙성합니다.", "캐러멜과 감귤", "말린 살구, 무화과와 토피", "건포도와 바닐라의 긴 여운", "https://bushmills.com/products/21-year"],
    ["bushmills-25", "부시밀 25년", "Bushmills 25 Year Old", 46, 25, ["과일", "꿀", "우디"], "버번·셰리 초기 숙성 후 루비 포트 캐스크에서 장기 숙성한 25년입니다.", "짙은 과일과 꿀", "졸인 체리, 자두와 초콜릿", "달콤한 향신료와 오래된 오크", "https://bushmills.com/products/25-year"],
    ["bushmills-30", "부시밀 30년", "Bushmills 30 Year Old", 46, 30, ["셰리", "과일", "바닐라"], "14년 초기 숙성에 16년 PX 셰리 숙성을 더한 장기 숙성 몰트입니다.", "건포도, 자두와 베이킹 향신료", "대추야자, 프랄린과 감귤", "풍부한 과일과 바닐라", "https://bushmills.com/products/30-year"],
    ["bushmills-46-river-bush", "부시밀 46년 시크릿 오브 더 리버 부시", "Bushmills 46 Year Old Secrets of the River Bush", 46.3, 46, ["과일", "스파이시", "우디"], "리버 부시를 기념한 46년 숙성의 한정 싱글 몰트입니다.", "검은 과일, 살구와 캐러멜", "계피, 체리와 구운 자두", "과일 향신료와 부드러운 오크", "https://bushmills.com/products/46-year"],
  ]),
  ...createWhiskyGroup({ brand: "Yoichi", category: "싱글 몰트", country: "일본", region: "홋카이도 · 요이치", source: "https://nikka.com/en/brands/yoichi_miyagikyo/products/" }, [
    ["yoichi-single-malt", "요이치 싱글 몰트", "Yoichi Single Malt", 45, null, ["피트", "스모키", "우디"], "석탄 직화 증류로 빚은 힘 있는 홋카이도 싱글 몰트입니다.", "과일과 부드러운 오크", "피트와 고소한 구운 몰트", "오크 단맛과 은은한 연기"],
    ["yoichi-10", "요이치 10년", "Yoichi Single Malt 10 Year Old", 45, 10, ["피트", "스모키", "과일"], "10년 숙성으로 과일 향과 피트의 깊이를 더한 요이치입니다.", "익은 바나나와 몰트", "배와 피트 스모크", "짙은 몰트와 긴 훈연"],
  ]),
  ...createWhiskyGroup({ brand: "Miyagikyo", category: "싱글 몰트", country: "일본", region: "미야기 · 센다이", source: "https://nikka.com/en/brands/yoichi_miyagikyo/products/" }, [
    ["miyagikyo-single-malt", "미야기쿄 싱글 몰트", "Miyagikyo Single Malt", 45, null, ["과일", "바닐라", "부드러운"], "증기 간접 가열 증류로 과일 향과 매끄러운 질감을 살린 몰트입니다.", "사과, 배와 바닐라", "말린 과일과 부드러운 몰트", "잔잔한 오크"],
    ["miyagikyo-10", "미야기쿄 10년", "Miyagikyo Single Malt 10 Year Old", 45, 10, ["과일", "시트러스", "바닐라"], "10년 숙성이 더한 과일의 풍부함과 쌉쌀한 여운이 특징입니다.", "사과, 감귤과 바닐라", "과일과 보리의 단맛", "은은하게 쌉쌀한 오크"],
  ]),
  ...createWhiskyGroup({ brand: "Nikka", category: "싱글 그레인", country: "일본", region: "미야기 · 센다이", source: "https://www.nikka.com/en/brands/coffey-grain-malt/" }, [
    ["nikka-coffey-grain", "닛카 카페 그레인", "Nikka Coffey Grain", 45, null, ["꿀", "바닐라", "부드러운"], "옥수수 중심 원료를 카페식 연속 증류기로 증류한 일본 그레인 위스키입니다.", "곡물의 달콤함", "꿀과 크리미한 질감", "부드럽고 산뜻한 단맛"],
    ["nikka-coffey-malt", "닛카 카페 몰트", "Nikka Coffey Malt", 45, null, ["바닐라", "우디", "부드러운"], "맥아 100%를 연속 증류해 그레인으로 분류합니다. 일부 구형 원액에 수입 증류액을 재증류한 원액이 포함되어 일본 위스키 표시 기준을 충족하지 않습니다.", "고소한 맥아", "풍부한 몰트와 매끄러운 질감", "부드러운 오크 단맛"],
  ]),
  ...createWhiskyGroup({ brand: "Nikka", category: "블렌디드", country: "일본", region: "일본 · 해외 원액 포함", source: "https://www.nikka.com/en/brands/fromthebarrel/" }, [
    ["nikka-from-the-barrel", "닛카 프롬 더 배럴", "Nikka From The Barrel", 51.4, null, ["바닐라", "시트러스", "우디"], "해외 원액을 포함한 몰트·그레인 블렌드를 재숙성해 51.4%로 병입합니다. 일본산 원액만으로 만든 제품은 아닙니다.", "오크, 바닐라와 오렌지 껍질", "두꺼운 단맛과 초콜릿", "쌉쌀한 나무의 긴 여운"],
    ["nikka-session", "닛카 세션", "Nikka Session", 43, null, ["과일", "스모키", "부드러운"], "요이치·미야기쿄와 스코틀랜드 몰트를 결합한 월드 블렌디드 몰트입니다.", "화사한 과일과 몰트", "매끄러운 보리의 단맛", "가벼운 피트와 오크", "https://nikka.com/distilleries/yoichi/guide/restaurant/pdf/drink_menu.pdf"],
  ]),
  ...createWhiskyGroup({ brand: "Yamazaki", category: "싱글 몰트", country: "일본", region: "오사카 · 야마자키", source: "https://www.suntory.co.jp/whisky/yamazaki/product/" }, [
    ["yamazaki-distillers-reserve", "야마자키 디스틸러스 리저브", "Yamazaki Distiller's Reserve", 43, null, ["과일", "바닐라", "우디"], "와인·미즈나라 캐스크 원액의 화사한 향이 어우러진 연산 미표기 야마자키입니다.", "딸기, 체리와 미즈나라", "라즈베리, 백도와 코코넛", "바닐라와 가벼운 계피", "https://house.suntory.com/yamazaki-whisky/yamazaki-distillers-reserve"],
    ["yamazaki-18", "야마자키 18년", "Yamazaki 18 Year Old", 43, 18, ["과일", "셰리", "우디"], "스페니시 오크와 장기 숙성 미즈나라의 깊이를 품은 18년 몰트입니다.", "건포도, 살구와 밀크 커피", "블랙베리, 딸기잼과 다크 초콜릿", "길고 부드러운 향신료", "https://house.suntory.com/yamazaki-whisky/yamazaki-18-years-old"],
    ["yamazaki-25", "야마자키 25년", "Yamazaki 25 Year Old", 43, 25, ["과일", "스모키", "우디"], "세 종류의 오크 숙성 원액을 결합한 25년 제품으로 향목과 잘 익은 과일이 특징입니다.", "향나무, 감과 매실", "백단향, 감의 단맛과 생강", "미즈나라 향과 깊은 나무 단맛", "https://house.suntory.com/yamazaki-whisky/yamazaki-25-years-old"],
  ]),
  ...createWhiskyGroup({ brand: "Hakushu", category: "싱글 몰트", country: "일본", region: "야마나시 · 하쿠슈", source: "https://house.suntory.com/hakushu-whisky" }, [
    ["hakushu-distillers-reserve", "하쿠슈 디스틸러스 리저브", "Hakushu Distiller's Reserve", 43, null, ["시트러스", "스모키", "과일"], "산림 증류소의 허브와 가벼운 훈연을 표현한 연산 미표기 몰트입니다.", "페퍼민트, 멜론과 오이", "유자, 자몽과 레몬 타임", "은은하고 산뜻한 스모크", "https://house.suntory.com/hakushu-whisky/hakushu-distillers-reserve"],
    ["hakushu-18", "하쿠슈 18년", "Hakushu 18 Year Old", 43, 18, ["과일", "스모키", "부드러운"], "18년 숙성으로 허브 향에 익은 과일과 깊은 여운을 더한 하쿠슈입니다.", "익은 배, 말린 민트와 연기", "망고, 모과와 재스민", "쌉쌀함을 동반한 긴 훈연", "https://house.suntory.com/hakushu-whisky/hakushu-18-years-old"],
    ["hakushu-25", "하쿠슈 25년", "Hakushu 25 Year Old", 43, 25, ["과일", "스모키", "우디"], "장기 숙성 원액에서 허브·과일·나무의 층이 드러나는 25년 몰트입니다.", "자두, 시가 보관함과 캐러멜", "크렘 브륄레, 세이지와 구운 파인애플", "편백나무를 닮은 긴 훈연", "https://house.suntory.com/hakushu-whisky/hakushu-25-years-old"],
  ]),
  ...createWhiskyGroup({ brand: "Hibiki", category: "블렌디드", country: "일본", region: "일본", source: "https://www.suntory.co.jp/whisky/hibiki/" }, [
    ["hibiki-21", "히비키 21년", "Hibiki 21 Year Old", 43, 21, ["과일", "바닐라", "스파이시"], "21년 이상 숙성한 몰트와 그레인을 선별해 결합한 히비키입니다.", "건포도, 살구와 딸기잼", "비스킷, 토피와 새콤달콤한 향신료", "익은 과일의 긴 여운", "https://www.suntory.co.jp/whisky/hibiki/portfolio/21years/"],
    ["hibiki-30", "히비키 30년", "Hibiki 30 Year Old", 43, 30, ["과일", "우디", "부드러운"], "장기 숙성 몰트와 그레인이 풍부한 과일·향목 풍미를 만드는 30년 블렌드입니다.", "달콤한 숙성향과 꽃", "매끄러운 질감과 깊은 오크", "익은 과일과 길게 남는 향목", "https://www.suntory.co.jp/whisky/hibiki/portfolio/30years/"],
  ]),
  ...createWhiskyGroup({ brand: "Suntory", category: "싱글 그레인", country: "일본", region: "아이치 · 치타", source: "https://house.suntory.com/chita-whisky" }, [
    ["suntory-chita", "산토리 치타", "Suntory Chita Single Grain", 43, null, ["꿀", "바닐라", "부드러운"], "치타 증류소의 가볍고 달콤한 성격을 담은 싱글 그레인 위스키입니다.", "부드러운 곡물과 꿀", "바닐라와 가벼운 단맛", "산뜻하고 매끄러운 여운"],
  ]),
  ...createWhiskyGroup({ brand: "Suntory", category: "블렌디드", country: "일본", region: "일본", source: "https://www.suntory.co.jp/whisky/kakubin/product/kaku.html" }, [
    ["suntory-kakubin", "산토리 가쿠빈", "Suntory Kakubin", 40, null, ["바닐라", "우디", "부드러운"], "야마자키·하쿠슈의 버번 캐스크 원액을 활용한 하이볼용 대표 블렌드입니다.", "달콤한 오크와 곡물", "도톰한 질감과 부드러운 단맛", "깔끔하고 드라이한 마무리"],
  ]),
  ...createWhiskyGroup({ brand: "Suntory", category: "블렌디드", country: "일본", region: "일본 · 해외 원액 포함", source: "https://house.suntory.com/ao-whisky" }, [
    ["suntory-ao", "산토리 아오", "Suntory World Whisky Ao", 43, null, ["과일", "스모키", "부드러운"], "일본·스코틀랜드·아일랜드·미국·캐나다 원액을 결합한 월드 블렌디드 위스키입니다.", "달콤한 과일과 오크", "매끄러운 단맛과 은은한 연기", "겹겹이 남는 스모크와 과일"],
  ]),
  ...createWhiskyGroup({ brand: "Penderyn", category: "싱글 몰트", country: "웨일스", region: "펜더린", source: "https://www.penderyn.wales/" }, [
    ["penderyn-madeira", "펜더린 마데이라", "Penderyn Madeira", 46, null, ["과일", "바닐라", "부드러운"], "버번 배럴 숙성 뒤 마데이라 와인 캐스크로 완성한 펜더린의 대표 제품입니다.", "크림 토피와 건포도", "산뜻한 과일과 균형 잡힌 단맛", "열대 과일과 바닐라", "https://www.penderyn.wales/product/penderyn-madeira/"],
    ["penderyn-sherrywood", "펜더린 셰리우드", "Penderyn Sherrywood", 46, null, ["셰리", "과일", "우디"], "버번과 올로로소 캐스크로 짙은 과일 풍미를 더한 웨일스 몰트입니다.", "검은 과일, 풋사과와 헤이즐넛", "풍부한 단맛에서 드라이한 질감으로", "토피와 건포도", "https://www.penderyn.wales/product/penderyn-sherrywood/"],
    ["penderyn-portwood", "펜더린 포트우드", "Penderyn Portwood", 46, null, ["과일", "꿀", "스파이시"], "포트 캐스크 피니시가 크랜베리와 초콜릿 풍미를 더하는 제품입니다.", "건과일, 다크 초콜릿과 크랜베리", "꿀과 향신료의 크리미한 질감", "부드러운 오크와 꿀", "https://www.penderyn.wales/product/penderyn-portwood/"],
    ["penderyn-peated", "펜더린 피티드", "Penderyn Peated", 46, null, ["피트", "스모키", "바닐라", "시트러스"], "피트 위스키 캐스크의 영향을 살린 섬세한 스모키 몰트입니다.", "달콤한 연기, 풋사과와 감귤", "부드럽게 펼쳐지는 피트와 바닐라", "연기와 바닐라의 중간 길이 여운", "https://www.penderyn.wales/product/penderyn-peated/"],
    ["penderyn-rich-oak", "펜더린 리치 오크", "Penderyn Rich Oak", 46, null, ["과일", "바닐라", "우디"], "버번 배럴과 재활성화한 오크 캐스크에서 풍부한 질감을 얻습니다.", "초콜릿 퍼지, 망고와 구아바", "크리미한 바닐라, 계피와 견과 토피", "느리게 사라지는 바닐라", "https://www.penderyn.wales/product/penderyn-rich-oak/"],
    ["penderyn-myth", "펜더린 미스", "Penderyn Myth", 40, null, ["과일", "시트러스", "부드러운"], "버번·재활성화 오크 캐스크를 사용한 드래곤 레인지의 가벼운 몰트입니다.", "사과, 배 사탕과 감귤", "산뜻한 과일과 가벼운 쌉쌀함", "가볍고 생기 있는 과일", "https://www.penderyn.wales/product/penderyn-myth/"],
    ["penderyn-legend", "펜더린 레전드", "Penderyn Legend", 40, null, ["과일", "바닐라", "부드러운"], "마데이라 피니시의 과일 풍미를 40%로 표현한 드래곤 레인지입니다.", "사과, 감귤과 크림 퍼지", "매끄러운 건과일의 단맛", "마데이라 케이크와 건포도", "https://www.penderyn.wales/product/penderyn-legend/"],
    ["penderyn-celt", "펜더린 켈트", "Penderyn Celt", 40, null, ["피트", "스모키", "시트러스"], "피트 위스키를 담았던 쿼터 캐스크에서 마무리한 드래곤 레인지입니다.", "피트 연기와 마멀레이드 토스트", "달콤함 뒤에 나타나는 약품 같은 훈연", "약간의 쌉쌀함과 긴 산뜻함", "https://www.penderyn.wales/product/penderyn-celt/"],
  ]),
  ...createWhiskyGroup({ brand: "Starward", category: "싱글 몰트", country: "호주", region: "빅토리아 · 멜버른", source: "https://starward.com.au/" }, [
    ["starward-nova", "스타워드 노바", "Starward Nova", 41, null, ["과일", "바닐라", "우디"], "호주 레드 와인 배럴에서 전 기간 숙성한 과일 중심 싱글 몰트입니다.", "붉은 베리와 다크 초콜릿", "라즈베리 푸딩, 바닐라와 캐러멜", "붉은 과일과 부드러운 오크", "https://starward.com.au/products/nova"],
    ["starward-solera", "스타워드 솔레라", "Starward Solera", 43, null, ["셰리", "과일", "바닐라"], "호주식 셰리인 아페라 배럴로 숙성한 스타워드의 첫 위스키입니다.", "잘 익은 과일, 건포도와 토피", "크렘 브륄레, 바나나와 무화과", "건포도와 은은한 오크", "https://starward.com.au/products/solera"],
  ]),
  ...createWhiskyGroup({ brand: "Starward", category: "블렌디드", country: "호주", region: "빅토리아 · 멜버른", source: "https://starward.com.au/products/two-fold" }, [
    ["starward-two-fold", "스타워드 투 폴드", "Starward Two-Fold", 40, null, ["과일", "바닐라", "부드러운"], "밀 위스키와 싱글 몰트를 결합하고 호주 레드 와인 배럴에서 숙성합니다.", "열대 과일, 베리와 시리얼", "붉은 과일과 바닐라, 구운 곡물", "섬세하고 부드러운 여운"],
  ]),
  ...createWhiskyGroup({ brand: "Amrut", category: "싱글 몰트", country: "인도", region: "카르나타카 · 벵갈루루", source: "https://amrutdistilleries.com/amrut-single-malts-varients/" }, [
    ["amrut-indian-single-malt", "암룻 인디안 싱글 몰트", "Amrut Indian Single Malt", 46, null, ["꿀", "스파이시", "우디"], "인도산 보리와 벵갈루루의 기후로 빚은 암룻의 기본 싱글 몰트입니다.", "감초, 구운 벌집과 토피", "풍부한 보리와 오크의 단맛", "크림 토피와 길게 남는 오크", "https://amrutdistilleries.com/amrut-indian-single-malt-whisky-46-duplicate/"],
    ["amrut-fusion", "암룻 퓨전", "Amrut Fusion", 50, null, ["피트", "스모키", "과일", "우디"], "인도산 보리와 스코틀랜드산 피트 보리를 인도에서 증류·숙성한 몰트입니다.", "보리 설탕과 은은한 연기", "따뜻한 피트, 과일과 초콜릿 퍼지", "오크와 길게 남는 향신료", "https://amrutdistilleries.com/amrut-asm-fusion-50/"],
    ["amrut-peated", "암룻 피티드", "Amrut Peated", 46, null, ["피트", "스모키", "스파이시", "바닐라"], "피트 몰트의 건조한 연기와 인도 숙성의 진한 단맛을 결합합니다.", "마른 피트와 감귤", "당밀과 점점 강해지는 스모크", "버터스카치와 바닐라", "https://amrutdistilleries.com/amrut-peated/"],
    ["amrut-kadhambam", "암룻 카담밤", "Amrut Kadhambam", 50, null, ["과일", "꿀", "스파이시"], "올로로소·브랜디·럼 캐스크를 활용해 다양한 숙성 풍미를 겹칩니다.", "꽃, 꿀과 열대 과일", "설탕에 절인 과일과 옅은 피트", "따뜻하고 드라이한 긴 여운", "https://amrutdistilleries.com/amrut-kadhambamsingle-maltwhisky-50-duplicate/"],
    ["amrut-naarangi", "암룻 나랑기", "Amrut Naarangi", 50, null, ["시트러스", "셰리", "스파이시"], "오렌지로 시즈닝한 캐스크의 감귤 풍미를 담은 한정 싱글 몰트입니다.", "오렌지 껍질, 셰리와 민트", "오렌지 케이크, 초콜릿과 생강", "오일리한 계피의 긴 여운", "https://amrutdistilleries.com/amrut-naarangi-single-malt-whisky-50-duplicate/"],
    ["amrut-intermediate-sherry", "암룻 인터미디에이트 셰리", "Amrut Intermediate Sherry", 57.1, null, ["셰리", "과일", "스파이시"], "중간에 올로로소 숙성을 거친 뒤 버번 캐스크로 돌아가 완성하는 57.1% 버전입니다.", "과일 케이크와 오크", "건포도, 감초와 오렌지 꿀", "캐러멜과 긴 향신료", "https://amrutdistilleries.com/amrut-indian-single-malt-whisky-intermediate-sherry-57-1-duplicate/"],
    ["amrut-portonova", "암룻 포르토노바", "Amrut Portonova", 62.1, null, ["과일", "우디", "스파이시"], "포트 파이프 숙성을 버번 숙성 사이에 배치한 62.1% 병입입니다.", "과일 푸딩과 구운 사과 파이", "잼 같은 과일과 캐러멜", "코코아, 흑설탕과 진한 오크", "https://amrutdistilleries.com/amrut-indian-single-malt-whisky-portonova-62-1-duplicate/"],
    ["amrut-spectrum-004", "암룻 스펙트럼 004", "Amrut Spectrum 004", 50, null, ["셰리", "과일", "우디"], "네 가지 종류의 오크 판재로 조립한 캐스크에서 추가 숙성한 한정판입니다.", "건포도, 무화과와 티라미수", "자두, 초콜릿과 구운 견과류", "캐러멜 아몬드와 살구", "https://amrutdistilleries.com/amrut-spectrum-004-single-malt-whisky-50-duplicate-2/"],
    ["amrut-triparva", "암룻 트리파르바", "Amrut Triparva", 50, null, ["과일", "바닐라", "꿀"], "세 번 증류해 풍부한 과일과 커스터드 풍미를 표현한 한정 몰트입니다.", "솔티드 캐러멜과 코코넛 커스터드", "복숭아, 멜론과 오렌지", "꿀과 바나나, 옅은 향신료", "https://amrutdistilleries.com/amrut-triparva-triple-distilled-indian-single-malt-whisky-50-duplicate/"],
    ["amrut-bagheera", "암룻 바기라", "Amrut Bagheera Sherry Cask Finish", 46, null, ["셰리", "과일", "스모키"], "셰리 캐스크 피니시와 섬세한 피트가 겹치는 인도 싱글 몰트입니다.", "솔티드 캐러멜, 건과일과 초콜릿", "꽃과 과일, 오일리한 백단향", "달콤하고 드라이한 피트", "https://amrutdistilleries.com/amrut-indian-single-malt-whisky-bagheera-sherry-cask-finish-46-3-pack-duplicate/"],
    ["amrut-rajigala", "암룻 라지갈라", "Amrut Rajigala", 40, null, ["과일", "꿀", "시트러스"], "독수리의 왕을 뜻하는 이름을 붙인 40% 싱글 몰트입니다.", "감귤, 멜론과 복숭아", "꿀, 과일과 가벼운 후추", "과일과 잔잔한 향신료", "https://amrutdistilleries.com/amrut-rajigala-indian-single-malt-whisky-40-duplicate/"],
  ]),
  ...createWhiskyGroup({ brand: "Single Malts of India", category: "싱글 몰트", country: "인도", region: "인도 · 소싱 원액", source: "https://amrutdistilleries.com/amrut-single-malts-varients/" }, [
    ["single-malts-india-marudham", "싱글 몰츠 오브 인디아 마루담", "Single Malts of India Marudham", 46, null, ["과일", "바닐라", "우디"], "암룻이 선보이는 인도 다른 증류소의 소싱 몰트로, 농경지를 주제로 합니다.", "바나나와 파인애플", "열대 과일, 초콜릿과 바닐라", "파인애플과 오크의 긴 여운", "https://amrutdistilleries.com/single-malts-of-india-marudham/"],
    ["single-malts-india-kurinji", "싱글 몰츠 오브 인디아 쿠린지", "Single Malts of India Kurinji", 46, null, ["과일", "꿀", "부드러운"], "인도의 구릉지에서 소싱한 싱글 몰트로, 쿠린지 꽃에서 이름을 얻었습니다.", "꽃과 부드러운 과일", "화사한 몰트와 은은한 단맛", "섬세한 꽃향의 여운", "https://amrutdistilleries.com/amrut-kurinji-single-malts-of-india/"],
  ]),
];
