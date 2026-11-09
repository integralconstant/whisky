import type { Whisky } from "./types.ts";
import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaigCairdeasOriginWhiskies: Whisky[] = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.laphroaig.com/en-gb/whisky-stories/cairdeas-expressions" },
  [
    ["laphroaig-cairdeas-2012-origin", "라프로익 카디어스 2012 오리진", "Laphroaig Cairdeas 2012 Origin", 51.2, null,
      ["피트", "스모키", "견과류", "몰트", "시트러스", "꿀", "과일", "바닐라", "크리미"],
      "프렌즈 오브 라프로익 18주년을 기념한 2012 오리진. 첫 카디어스에 사용한 숙성 원액과 쿼터 캐스크 숙성 원액을 결합한 51.2% 제품입니다. 향미는 The Whiskyphiles의 배리 브래드퍼드가 직접 시음한 기록을 요약했습니다.",
      "흙내음의 피트와 땅콩, 새 페인트·몰트에 시트러스와 청포도, 스펀지케이크·마지팬·꿀",
      "헤더 꿀과 메이플 시럽, 입안을 채우는 과일의 단맛에 흙내음의 땅콩·숯·연기, 바닐라 커스터드",
      "부드럽고 따뜻하며 마지팬 풍미가 두드러지는 여운",
      "https://thewhiskyphiles.com/2014/01/02/laphroaig-cairdeas-2012-origin/"],
    ["laphroaig-cairdeas-2013-port-wood", "라프로익 카디어스 2013 포트 우드", "Laphroaig Cairdeas 2013 Port Wood Edition", 51.3, null,
      ["피트", "스모키", "과일", "빵·비스킷", "바다·소금", "우디"],
      "버번 캐스크 숙성 후 포트 캐스크로 마무리한 2013 카디어스 포트 우드. 51.3% 제품으로 면세 포트 우드 48% 및 카디어스 2020 포트 앤 와인과 구분합니다. 향미는 Scotchology의 해당 제품 시음 기록을 요약했습니다.",
      "연기와 과일, 구운 빵의 향",
      "연기와 소금물, 나무와 토니 포트를 떠올리게 하는 맛",
      "짭짤하고 따뜻하며 피트의 흔적이 남는 여운",
      "https://www.scotchology.com/islay/laphroaig-cairdeas-port-wood-edition"],
    ["laphroaig-cairdeas-2015-200th-anniversary", "라프로익 카디어스 2015 200주년 에디션", "Laphroaig Cairdeas 2015 200th Anniversary Edition", 51.5, null,
      ["피트", "스모키", "바닐라", "바다·소금", "시트러스", "캐러멜", "스파이시"],
      "증류소 설립 200주년을 기념해 2015년에 병입한 카디어스. 51.5%의 NAS 제품으로 15년 200주년 기념판과는 별개입니다. 향미는 Scotchology의 해당 제품 시음 기록을 요약했습니다.",
      "연기와 바닐라, 소금물에 오렌지 껍질과 오이",
      "연기와 그을린 설탕, 향신료와 피트·이끼",
      "바닐라와 훈제 소시지, 피트가 남는 여운",
      "https://www.scotchology.com/islay/laphroaig-cairdeas-200th-anniversary-edition"],
  ],
);
