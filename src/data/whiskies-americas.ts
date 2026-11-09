import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

// Producer specifications for the linked market. No numerical age is inferred
// from a bottled-in-bond designation or a producer's typical maturation period.
export const americasWhiskies = [
  ...createWhiskyGroup({ brand: "Jack Daniel's", category: "테네시", country: "미국", region: "테네시", source: "https://pressroom.jackdaniels.com/products/" }, [
    ["jack-daniels-old-no7", "잭 다니엘스 올드 넘버 7", "Jack Daniel's Old No. 7", 40, null, ["바닐라", "우디", "부드러운"], "단풍나무 숯으로 여과하는 린치버그의 대표 테네시 위스키.", "바닐라와 달콤한 오크", "캐러멜, 바닐라, 나무", "가벼운 단맛과 오크"],
    ["jack-daniels-gentleman", "잭 다니엘스 젠틀맨 잭", "Jack Daniel's Gentleman Jack", 40, null, ["바닐라", "부드러운"], "숙성 전후 두 차례 숯 여과를 거치는 부드러운 테네시 위스키.", "캐러멜과 바닐라", "둥근 캐러멜과 오크", "은은하고 매끄러운 단맛"],
    ["jack-daniels-single-barrel-select", "잭 다니엘스 싱글 배럴 셀렉트", "Jack Daniel's Single Barrel Select", 47, null, ["과일", "스파이시", "바닐라"], "개별 배럴의 개성을 담은 미국 시장 94프루프 싱글 배럴.", "달콤한 과일과 캐러멜", "캐러멜, 오크 향신료", "따뜻한 과일과 나무"],
    ["jack-daniels-sinatra-select", "잭 다니엘스 시나트라 셀렉트", "Jack Daniel's Sinatra Select", 45, null, ["우디", "바닐라", "스모키"], "안쪽에 홈을 낸 특별한 배럴로 오크의 풍미를 살린 시나트라 헌정 제품.", "짙은 오크와 바닐라", "풍부한 나무와 캐러멜", "은은한 연기와 바닐라"],
    ["jack-daniels-no27-gold", "잭 다니엘스 넘버 27 골드", "Jack Daniel's No. 27 Gold", 40, null, ["꿀", "바닐라", "부드러운"], "단풍나무 배럴 피니시와 두 번째 숯 여과를 거친 테네시 위스키.", "단풍 시럽과 토스트", "꿀, 바닐라, 부드러운 오크", "달콤하고 둥근 나무"],
    ["jack-daniels-bonded", "잭 다니엘스 본디드", "Jack Daniel's Bonded", 50, null, ["바닐라", "우디", "스파이시"], "한 증류 시즌의 원액을 병입 규격에 맞춰 완성한 100프루프 테네시 위스키.", "캐러멜과 짙은 오크", "바닐라와 베이킹 스파이스", "따뜻한 오크와 향신료", "https://www.jackdaniels.com/en-us/whiskey/bonded"],
  ]),
  ...createWhiskyGroup({ brand: "Jack Daniel's", category: "라이", country: "미국", region: "테네시", source: "https://pressroom.jackdaniels.com/products/" }, [
    ["jack-daniels-tennessee-rye", "잭 다니엘스 테네시 라이", "Jack Daniel's Tennessee Rye", 45, null, ["스파이시", "꿀", "우디"], "호밀 70%의 매시빌에 숯 여과를 적용한 테네시 라이.", "흑설탕과 꿀", "호밀 향신료와 캐러멜", "살짝 달콤한 후추"],
    ["jack-daniels-single-barrel-rye", "잭 다니엘스 싱글 배럴 라이", "Jack Daniel's Single Barrel Rye", 47, null, ["과일", "스파이시", "우디"], "70% 호밀 레시피에서 골라낸 개별 배럴의 94프루프 라이.", "익은 과일과 호밀", "과일, 향신료, 오크", "후추와 따뜻한 나무"],
    ["jack-daniels-bonded-rye", "잭 다니엘스 본디드 라이", "Jack Daniel's Bonded Rye", 50, null, ["과일", "스파이시", "바닐라"], "숯으로 여과한 호밀 중심 원액을 100프루프로 병입한 본디드 라이.", "말린 과일", "토피와 호밀", "길게 남는 호밀 향신료", "https://pressroom.jackdaniels.com/jack-daniels-introduces-new-bottled-in-bond-rye-whiskey-as-permanent-extension-of-its-bonded-series/"],
  ]),
  ...createWhiskyGroup({ brand: "Jack Daniel's", category: "블렌디드", country: "미국", region: "테네시", source: "https://legal.brown-forman.com/miscellaneous/us-product-info" }, [
    ["jack-daniels-triple-mash", "잭 다니엘스 트리플 매시", "Jack Daniel's Triple Mash", 50, null, ["꿀", "과일", "우디"], "본디드 라이·아메리칸 몰트·테네시 위스키를 조합한 블렌드.", "꿀과 달콤한 몰트", "몰트, 부드러운 과일, 오크", "둥글고 지속되는 나무"],
  ]),
  ...createWhiskyGroup({ brand: "Old Forester", category: "버번", country: "미국", region: "켄터키", source: "https://www.oldforester.com/whiskies/" }, [
    ["old-forester-86", "올드 포레스터 86", "Old Forester 86 Proof", 43, null, ["과일", "바닐라", "부드러운"], "86프루프로 병입하는 올드 포레스터의 기본 버번.", "바닐라와 달콤한 과일", "오렌지, 바닐라, 오크", "부드러운 곡물과 향신료"],
    ["old-forester-100", "올드 포레스터 100", "Old Forester 100 Proof", 50, null, ["스파이시", "바닐라", "우디"], "향신료와 묵직한 단맛을 살린 100프루프 버번.", "바닐라와 구운 오크", "달콤한 과일과 강한 향신료", "진한 오크와 따뜻한 곡물"],
    ["old-forester-1870", "올드 포레스터 1870 오리지널 배치", "Old Forester 1870 Original Batch", 45, null, ["과일", "시트러스", "스파이시"], "세 창고의 원액을 배합해 창립 당시의 배칭 방식을 기념한 버번.", "정향과 과수원 과일", "캐러멜과 감귤", "부드러운 과일과 향신료"],
    ["old-forester-1897", "올드 포레스터 1897 보틀드 인 본드", "Old Forester 1897 Bottled in Bond", 50, null, ["바닐라", "스파이시", "우디"], "1897년 보틀드 인 본드의 역사를 담은 100프루프 버번.", "캐러멜, 바닐라, 볶은 커피", "잘 익은 과일과 짙은 단맛", "따뜻한 바닐라와 오크"],
    ["old-forester-1910", "올드 포레스터 1910 올드 파인 위스키", "Old Forester 1910 Old Fine Whisky", 46.5, null, ["바닐라", "우디", "부드러운"], "새 배럴에서 추가 숙성해 짙은 단맛을 더한 위스키 로우 시리즈.", "버터스카치와 살구", "토피, 초콜릿, 구운 나무", "달콤한 오크와 향신료", "https://www.oldforester.com/products/old-forester-1910-old-fine-whisky/"],
    ["old-forester-1920", "올드 포레스터 1920 프로히비션 스타일", "Old Forester 1920 Prohibition Style", 57.5, null, ["과일", "스파이시", "우디"], "금주법 시대 스타일을 기념해 115프루프로 병입한 버번.", "체리와 캐러멜", "다크 초콜릿, 메이플, 향신료", "진한 오크와 따뜻한 단맛"],
    ["old-forester-1924", "올드 포레스터 1924 10년", "Old Forester 1924 10 Year Old", 50, 10, ["우디", "스파이시", "바닐라"], "별도의 매시빌을 사용해 10년 숙성한 위스키 로우 시리즈.", "퍼지, 코코아, 마지팬", "초콜릿 크래커와 계피", "향신료와 구운 크래커", "https://www.oldforester.com/old-forester-debuts-1924/"],
    ["old-forester-statesman", "올드 포레스터 스테이츠맨", "Old Forester Statesman", 47.5, null, ["스파이시", "바닐라", "우디"], "창고의 따뜻한 구역에서 선별한 원액을 95프루프로 병입한 버번.", "정향과 오크", "버터, 가죽, 계피", "유칼립투스와 향신료"],
    ["old-forester-single-barrel-100", "올드 포레스터 싱글 배럴 100", "Old Forester Single Barrel 100 Proof", 50, null, ["우디", "바닐라", "스파이시"], "하나의 배럴을 100프루프로 병입하며 배럴마다 풍미가 달라지는 제품.", "배럴에 따라 달라지는 오크 향", "바닐라와 배럴 향신료", "선택한 배럴에 따른 여운", "https://www.oldforester.com/products/old-forester-single-barrel-100-proof/"],
  ]),
  ...createWhiskyGroup({ brand: "Old Forester", category: "라이", country: "미국", region: "켄터키", source: "https://www.oldforester.com/whiskies/" }, [
    ["old-forester-rye", "올드 포레스터 라이", "Old Forester Rye Whisky", 50, null, ["스파이시", "시트러스", "바닐라"], "호밀에 몰트 비중을 더한 100프루프 켄터키 라이.", "허브와 검은 후추", "계피, 감귤, 바닐라", "후추와 호밀의 마른 여운"],
  ]),
  ...createWhiskyGroup({ brand: "Woodford Reserve", category: "버번", country: "미국", region: "켄터키", source: "https://shop.woodfordreserve.com/?trust=yes" }, [
    ["woodford-double-oaked", "우드포드 리저브 더블 오크드", "Woodford Reserve Double Oaked", 45.2, null, ["꿀", "바닐라", "우디"], "깊게 토스팅하고 가볍게 그을린 두 번째 배럴에서 마무리한 버번.", "꿀과 초콜릿, 구운 오크", "사과, 바닐라, 헤이즐넛", "크리미한 오크와 꿀"],
    ["woodford-double-double-oaked", "우드포드 리저브 더블 더블 오크드", "Woodford Reserve Double Double Oaked", 45.2, null, ["우디", "바닐라", "스파이시"], "더블 오크드의 두 번째 배럴 숙성을 연장한 한정 버번.", "진한 오크와 캐러멜", "풍부한 나무와 달콤한 향신료", "길게 남는 토스트 풍미", "https://shop.woodfordreserve.com/double-double-oaked-7aqy/"],
  ]),
  ...createWhiskyGroup({ brand: "Woodford Reserve", category: "라이", country: "미국", region: "켄터키", source: "https://www.woodfordreserve.com/whiskey/rye-whiskey/" }, [
    ["woodford-rye", "우드포드 리저브 라이", "Woodford Reserve Rye Whiskey", 45.2, null, ["스파이시", "과일", "우디"], "호밀 53%를 사용해 향신료와 과일의 균형을 강조한 라이.", "호밀, 후추, 삼나무", "정향과 사과, 꿀", "달콤하고 매콤한 나무"],
  ]),
  ...createWhiskyGroup({ brand: "Woodford Reserve", category: "기타 위스키", country: "미국", region: "켄터키", source: "https://shop.woodfordreserve.com/?trust=yes" }, [
    ["woodford-malt", "우드포드 리저브 몰트", "Woodford Reserve Malt Whiskey", 45.2, null, ["과일", "우디", "바닐라"], "몰트 보리 51%를 사용하는 켄터키 스트레이트 몰트 위스키.", "구운 견과류와 사과", "초콜릿, 캐러멜, 몰트", "마른 오크와 초콜릿"],
    ["woodford-wheat", "우드포드 리저브 위트", "Woodford Reserve Wheat Whiskey", 45.2, null, ["과일", "바닐라", "부드러운"], "밀을 주원료로 몰트·옥수수·호밀을 더한 네 가지 곡물의 위스키.", "과일과 꽃, 바닐라", "사과, 코코넛, 구운 곡물", "부드러운 과일과 나무"],
  ]),
  ...createWhiskyGroup({ brand: "Michter's", category: "버번", country: "미국", region: "켄터키", source: "https://michters.com/shop-whiskey/" }, [
    ["michters-us1-bourbon", "믹터스 US1 버번", "Michter's US1 Kentucky Straight Bourbon", 45.7, null, ["바닐라", "과일", "우디"], "작은 배치로 병입하는 믹터스의 켄터키 스트레이트 버번.", "풍부한 캐러멜", "바닐라와 핵과류", "오크와 은은한 연기"],
    ["michters-10-bourbon", "믹터스 10년 버번", "Michter's 10 Year Kentucky Straight Bourbon", 47.2, 10, ["우디", "바닐라", "스파이시"], "10년 숙성한 배럴을 개별 병입하는 한정 생산 버번.", "짙은 토피", "캐러멜, 메이플, 바닐라", "그을린 오크"],
    ["michters-us1-toasted-bourbon", "믹터스 US1 토스티드 배럴 피니시 버번", "Michter's US1 Toasted Barrel Finish Bourbon", 45.7, null, ["과일", "바닐라", "스모키"], "공기 건조한 목재의 토스팅 배럴에서 추가 숙성한 한정 버번.", "모닥불과 계피", "피칸과 과일 사탕", "구운 배, 바닐라, 마시멜로"],
  ]),
  ...createWhiskyGroup({ brand: "Michter's", category: "라이", country: "미국", region: "켄터키", source: "https://michters.com/shop-whiskey/" }, [
    ["michters-us1-rye", "믹터스 US1 라이", "Michter's US1 Kentucky Straight Rye", 42.4, null, ["스파이시", "시트러스", "우디"], "한 배럴씩 병입하는 84.8프루프 켄터키 스트레이트 라이.", "후추와 호밀", "시트러스와 버터스카치", "오크와 향신료"],
    ["michters-10-rye", "믹터스 10년 라이", "Michter's 10 Year Kentucky Straight Rye", 46.4, 10, ["바닐라", "스파이시", "시트러스"], "10년간 숙성한 원액을 개별 배럴로 선보이는 라이.", "바닐라와 토피", "구운 아몬드, 계피", "후추와 오렌지"],
  ]),
  ...createWhiskyGroup({ brand: "Michter's", category: "기타 위스키", country: "미국", region: "켄터키", source: "https://michters.com/shop-whiskey/" }, [
    ["michters-us1-american", "믹터스 US1 아메리칸 위스키", "Michter's US1 Unblended American Whiskey", 41.7, null, ["과일", "바닐라", "부드러운"], "버번을 담았던 오크 배럴에서 숙성하는 아메리칸 위스키.", "버터스카치", "바닐라, 캐러멜, 말린 과일", "잘 익은 과일"],
    ["michters-us1-sour-mash", "믹터스 US1 사워 매시", "Michter's US1 Sour Mash", 43, null, ["과일", "스파이시", "바닐라"], "독자적인 곡물 조합으로 버번이나 라이와 구분되는 사워 매시 위스키.", "구운 설탕과 향신료", "체리 사탕과 꿀 바닐라", "호밀을 연상시키는 매콤함", "https://michters.com/sour-mash/"],
    ["michters-us1-toasted-sour-mash", "믹터스 US1 토스티드 배럴 피니시 사워 매시", "Michter's US1 Toasted Barrel Finish Sour Mash", 43, null, ["꿀", "바닐라", "스모키"], "US1 사워 매시를 토스팅 배럴에서 추가 숙성한 한정 제품.", "토피와 버터 바닐라", "꿀, 밀크 초콜릿, 오렌지 껍질", "모닥불, 체리, 향신료", "https://michters.com/us1-toasted-barrel-finish-sour-mash/"],
  ]),
  ...createWhiskyGroup({ brand: "W.L. Weller", category: "버번", country: "미국", region: "켄터키", source: "https://www.buffalotracedistillery.com/our-brands/w-l-weller/w-l-weller-special-reserve/" }, [
    ["weller-special-reserve", "웰러 스페셜 리저브", "W.L. Weller Special Reserve", 45, null, ["꿀", "부드러운", "우디"], "호밀 대신 밀을 사용한 웰러의 90프루프 버번.", "달콤한 캐러멜", "꿀, 버터스카치, 부드러운 나무", "달콤한 인동덩굴 꽃향"],
    ["weller-antique-107", "웰러 앤티크 107", "W.L. Weller Antique 107", 53.5, null, ["과일", "바닐라", "스파이시"], "밀 버번의 둥근 질감에 107프루프의 강도를 더한 제품.", "꽃과 바닐라", "달콤한 과일과 풍부한 바닐라", "뚜렷한 계피", "https://www.buffalotracedistillery.com/our-brands/w-l-weller/w-l-weller-antique-107/"],
    ["weller-full-proof", "웰러 풀 프루프", "W.L. Weller Full Proof", 57, null, ["과일", "바닐라", "우디"], "배럴 입고 도수인 114프루프로 맞춰 냉각 여과 없이 병입한 밀 버번.", "바닐라, 검은 체리, 캐러멜", "캐러멜과 구운 오크", "크렘 브륄레와 초콜릿", "https://www.buffalotracedistillery.com/our-brands/w-l-weller/w-l-weller-full-proof/"],
    ["weller-cypb", "웰러 C.Y.P.B.", "W.L. Weller C.Y.P.B.", 47.5, null, ["시트러스", "바닐라", "부드러운"], "소비자 설문에서 선택한 스타일을 반영한 95프루프 밀 버번.", "시트러스와 오크", "균형 잡힌 둥근 질감", "은은하게 남는 바닐라", "https://www.buffalotracedistillery.com/our-brands/w-l-weller/w-l-weller-c-y-p-b/"],
    ["weller-single-barrel", "웰러 싱글 배럴", "W.L. Weller Single Barrel", 48.5, null, ["과일", "바닐라", "스파이시"], "밀 매시빌의 개별 배럴을 선별해 97프루프로 병입한 버번.", "체리와 민트, 바닐라", "캐러멜, 코코아, 베이킹 스파이스", "계피와 커피, 후추", "https://www.buffalotracedistillery.com/our-brands/w-l-weller/w-l-weller-single-barrel/"],
  ]),
  ...createWhiskyGroup({ brand: "E.H. Taylor, Jr.", category: "버번", country: "미국", region: "켄터키", source: "https://www.buffalotracedistillery.com/our-brands/e-h-taylor-jr/e-h-taylor-jr-small-batch/" }, [
    ["eh-taylor-small-batch", "E.H. 테일러 스몰 배치", "E.H. Taylor, Jr. Small Batch", 50, null, ["스파이시", "부드러운", "우디"], "테일러가 세운 창고에서 숙성한 배럴들을 조합하는 100프루프 버번.", "달콤한 옥수수와 버터스카치", "캐러멜 팝콘과 감초", "후추와 담뱃잎"],
    ["eh-taylor-single-barrel", "E.H. 테일러 싱글 배럴", "E.H. Taylor, Jr. Single Barrel", 50, null, ["과일", "스파이시", "우디"], "선별한 하나의 배럴을 100프루프로 병입하는 켄터키 버번.", "가볍게 구운 오크와 무화과", "버터스카치, 담뱃잎, 짙은 향신료", "달콤하고 온화한 나무", "https://www.buffalotracedistillery.com/our-brands/e-h-taylor-jr/e-h-taylor-jr-single-barrel/"],
  ]),
  ...createWhiskyGroup({ brand: "E.H. Taylor, Jr.", category: "라이", country: "미국", region: "켄터키", source: "https://www.buffalotracedistillery.com/our-brands/e-h-taylor-jr/e-h-taylor-jr-straight-rye/" }, [
    ["eh-taylor-straight-rye", "E.H. 테일러 스트레이트 라이", "E.H. Taylor, Jr. Straight Rye", 50, null, ["과일", "스파이시", "우디"], "말린 과일과 허브의 대비를 살린 100프루프 켄터키 라이.", "말린 과일, 후추, 딜", "향신료와 은은한 캐러멜", "마른 오크가 남는 여운"],
  ]),
  ...createWhiskyGroup({ brand: "Blanton's", category: "버번", country: "미국", region: "켄터키", source: "https://www.buffalotracedistillery.com/our-brands/blantons-single-barrel/blantons-original-single-barrel/" }, [
    ["blantons-original", "블랑톤 오리지널 싱글 배럴", "Blanton's Original Single Barrel", 46.5, null, ["바닐라", "꿀", "스파이시"], "배럴별 병입 정보와 말 모양 마개로 알려진 93프루프 싱글 배럴 버번.", "육두구와 향신료", "바닐라, 꿀, 캐러멜", "옥수수와 육두구"],
    ["blantons-gold", "블랑톤 골드 에디션", "Blanton's Gold Edition", 51.5, null, ["꿀", "스파이시", "우디"], "103프루프로 병입해 강도와 향신료를 강조한 블랑톤 싱글 배럴.", "호밀, 담뱃잎, 검은 과일", "캐러멜과 꿀, 향신료", "길게 이어지는 오크와 바닐라", "https://www.buffalotracedistillery.com/our-brands/blantons-single-barrel/blantons-gold-edition/"],
  ]),
  ...createWhiskyGroup({ brand: "Eagle Rare", category: "버번", country: "미국", region: "켄터키", source: "https://www.buffalotracedistillery.com/our-brands/eagle-rare/eagle-rare-10/" }, [
    ["eagle-rare-10", "이글 레어 10년", "Eagle Rare 10 Year Old", 45, 10, ["우디", "꿀", "시트러스"], "10년 숙성으로 코코아와 오크의 깊이를 갖춘 버번.", "토피, 오렌지 껍질, 가죽", "설탕을 입힌 아몬드와 코코아", "드라이하고 오래 남는 오크"],
  ]),
  ...createWhiskyGroup({ brand: "Russell's Reserve", category: "버번", country: "미국", region: "켄터키", source: "https://www.russellsreserve.com/our-products/10-year-old-bourbon/" }, [
    ["russells-reserve-10", "러셀 리저브 10년", "Russell's Reserve 10 Year Old Bourbon", 45, 10, ["바닐라", "스파이시", "우디"], "깊게 그을린 오크 배럴에서 10년 숙성한 러셀 가문의 버번.", "오렌지 껍질과 캐러멜", "바닐라, 토피, 향신료", "오크와 계피"],
    ["russells-single-barrel-bourbon", "러셀 리저브 싱글 배럴 버번", "Russell's Reserve Single Barrel Bourbon", 55, null, ["바닐라", "스파이시", "우디"], "냉각 여과 없이 110프루프로 병입하는 개별 배럴 버번.", "바닐라, 견과류, 흑설탕", "크리미한 토피와 감초", "달콤한 향신료와 몰트", "https://www.russellsreserve.com/our-products/single-barrel-bourbon/"],
  ]),
  ...createWhiskyGroup({ brand: "Russell's Reserve", category: "라이", country: "미국", region: "켄터키", source: "https://www.russellsreserve.com/our-products/6-year-old-rye/" }, [
    ["russells-reserve-6-rye", "러셀 리저브 6년 라이", "Russell's Reserve 6 Year Old Rye", 45, 6, ["스파이시", "바닐라", "우디"], "6년 숙성해 90프루프로 병입한 켄터키 라이.", "아몬드와 바닐라", "호밀 향신료와 토피", "후추와 말린 과일"],
    ["russells-single-barrel-rye", "러셀 리저브 싱글 배럴 라이", "Russell's Reserve Single Barrel Rye", 52, null, ["시트러스", "바닐라", "스파이시"], "냉각 여과 없이 104프루프로 병입한 개별 배럴 라이.", "레몬, 바닐라, 오렌지 껍질", "후추, 담뱃잎, 바닐라", "배 사탕과 통후추", "https://www.russellsreserve.com/our-products/single-barrel-rye/"],
  ]),
  ...createWhiskyGroup({ brand: "Knob Creek", category: "버번", country: "미국", region: "켄터키", source: "https://www.knobcreek.com/whiskies/9-year-old-bourbon-whiskey" }, [
    ["knob-creek-9", "놉 크릭 9년", "Knob Creek 9 Year Old Bourbon", 50, 9, ["우디", "바닐라", "스파이시"], "9년 숙성의 깊은 오크를 100프루프로 담은 스몰 배치 버번.", "구운 견과류와 곡물", "풍부한 바닐라와 캐러멜", "길고 따뜻한 오크"],
    ["knob-creek-12", "놉 크릭 12년", "Knob Creek 12 Year Old Bourbon", 50, 12, ["우디", "바닐라", "스파이시"], "12년 숙성을 거쳐 오크와 달콤한 풍미의 균형을 잡은 버번.", "바닐라와 캐러멜 오크", "견과류, 가죽, 달콤한 나무", "길고 풍부한 향신료", "https://www.knobcreek.com/whiskies/12-year-old-bourbon-whiskey"],
    ["knob-creek-18", "놉 크릭 18년", "Knob Creek 18 Year Old Bourbon", 50, 18, ["우디", "스파이시", "바닐라"], "기본 9년 제품의 두 배 기간 숙성한 한정 18년 버번.", "숙성 오크와 흑설탕", "캐러멜을 입힌 나무와 바닐라", "따뜻한 향신료와 짙은 오크", "https://www.knobcreek.com/whiskies/18-year-old-bourbon-whiskey"],
  ]),
  ...createWhiskyGroup({ brand: "Knob Creek", category: "라이", country: "미국", region: "켄터키", source: "https://www.knobcreek.com/whiskies/7-year-old-rye-whiskey" }, [
    ["knob-creek-7-rye", "놉 크릭 7년 라이", "Knob Creek 7 Year Old Rye", 50, 7, ["과일", "바닐라", "스파이시"], "깊게 그을린 배럴에서 7년 숙성해 달콤함과 호밀 향신료를 조화시킨 라이.", "캐러멜, 사과, 꽃", "후추와 바닐라", "따뜻한 오크 향신료"],
    ["knob-creek-10-rye", "놉 크릭 10년 라이", "Knob Creek 10 Year Old Rye", 50, 10, ["우디", "스파이시", "바닐라"], "10년의 숙성으로 오크와 캐러멜의 깊이를 더한 100프루프 라이.", "숙성 오크와 캐러멜", "그을린 나무와 호밀 향신료", "풍부한 오크와 달콤한 향신료", "https://www.knobcreek.com/"],
  ]),
  ...createWhiskyGroup({ brand: "Knob Creek", category: "블렌디드", country: "미국", region: "켄터키", source: "https://www.knobcreek.com/" }, [
    ["knob-creek-bourbon-x-rye", "놉 크릭 버번 X 라이", "Knob Creek Bourbon X Rye", 56.5, null, ["바닐라", "스파이시", "우디"], "9년 버번 30%와 7년 라이 70%를 조합한 113프루프 블렌드.", "바닐라와 캐러멜", "실키한 바닐라와 후추", "달콤한 나무와 호밀"],
  ]),
  ...createWhiskyGroup({ brand: "Maker's Mark", category: "버번", country: "미국", region: "켄터키", source: "https://www.makersmark.com/bourbons/makers-mark-46" }, [
    ["makers-mark-46", "메이커스 마크 46", "Maker's Mark 46", 47, null, ["바닐라", "스파이시", "우디"], "프렌치 오크 스테이브를 넣어 마무리한 밀 버번. 46은 숙성연수가 아닌 목재 프로파일 번호입니다.", "구운 프렌치 오크와 캐러멜", "진한 바닐라와 베이킹 스파이스", "길고 부드러운 오크"],
    ["makers-mark-101", "메이커스 마크 101", "Maker's Mark 101", 50.5, null, ["과일", "바닐라", "스파이시"], "기본 밀 버번 레시피를 101프루프로 선보이는 스페셜 프루프 제품.", "사과 버터와 향신료", "말린 무화과, 버터스카치, 바닐라", "화이트 초콜릿과 말린 과일", "https://www.makersmark.com/bourbons/makers-mark-101"],
  ]),
  ...createWhiskyGroup({ brand: "Four Roses", category: "버번", country: "미국", region: "켄터키", source: "https://www.fourrosesbourbon.com/bourbon" }, [
    ["four-roses-bourbon", "포 로지스 버번", "Four Roses Bourbon", 40, null, ["과일", "꿀", "부드러운"], "포 로지스의 여러 레시피를 조합한 80프루프 기본 버번.", "꽃과 과일", "배, 사과, 꿀", "산뜻하고 부드러운 과일"],
    ["four-roses-single-barrel", "포 로지스 싱글 배럴 OBSV", "Four Roses Single Barrel OBSV", 50, null, ["과일", "스파이시", "우디"], "OBSV 레시피의 개별 배럴을 100프루프로 병입한 싱글 배럴.", "과일과 향신료, 코코아", "잘 익은 자두와 체리", "길고 균형 잡힌 향신료"],
    ["four-roses-small-batch-select", "포 로지스 스몰 배치 셀렉트", "Four Roses Small Batch Select", 52, null, ["과일", "바닐라", "스파이시"], "여섯 레시피를 배합하고 냉각 여과 없이 104프루프로 병입한 버번.", "라즈베리, 정향, 육두구", "살구, 베리, 바닐라", "민트와 계피", "https://www.fourrosesbourbon.com/bourbon/small-batch-select"],
  ]),
  ...createWhiskyGroup({ brand: "Basil Hayden", category: "버번", country: "미국", region: "켄터키", source: "https://www.basilhaydenbourbon.com/whiskies/basil-hayden-toast-bourbon" }, [
    ["basil-hayden-toast", "베이즐 헤이든 토스트", "Basil Hayden Toast", 40, null, ["바닐라", "우디", "부드러운"], "호밀 대신 현미를 사용하고 토스팅 배럴에서 마무리한 버번.", "구운 오크, 말린 과일", "가벼운 바닐라와 토스트", "달콤한 캐러멜"],
  ]),
  ...createWhiskyGroup({ brand: "Basil Hayden", category: "라이", country: "미국", region: "켄터키", source: "https://www.basilhaydenbourbon.com/whiskies/basil-hayden-malted-rye-whiskey" }, [
    ["basil-hayden-malted-rye", "베이즐 헤이든 몰티드 라이", "Basil Hayden Malted Rye", 40, null, ["스파이시", "바닐라", "부드러운"], "몰팅한 호밀의 부드러운 곡물 풍미를 보여주는 라이 몰트 위스키.", "꽃과 딜, 캐러멜", "계피, 바닐라, 호밀 토스트", "초콜릿과 따뜻한 향신료"],
  ]),
  ...createWhiskyGroup({ brand: "Basil Hayden", category: "블렌디드", country: "미국", region: "켄터키 · 캐나다 원액 블렌드", source: "https://www.basilhaydenbourbon.com/whiskies/basil-hayden-dark-rye-whiskey" }, [
    ["basil-hayden-dark-rye", "베이즐 헤이든 다크 라이", "Basil Hayden Dark Rye", 40, null, ["과일", "스파이시", "우디"], "켄터키 라이와 캐나다 라이에 포트 와인을 소량 더한 블렌드.", "검은 베리, 당밀, 오크", "캐러멜과 말린 과일", "달콤한 과일과 호밀 향신료"],
  ]),
];
