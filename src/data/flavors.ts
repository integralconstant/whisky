import type { Whisky } from "./types.ts";

export interface WhiskyFlavorGroup {
  id: string;
  label: string;
  tags: string[];
}

export const whiskyFlavorGroups: WhiskyFlavorGroup[] = [
  {
    id: "sweetness",
    label: "달콤한 향",
    tags: [
      "바닐라",
      "꿀",
      "캐러멜",
      "토피",
      "초콜릿",
      "흑설탕",
      "메이플",
      "커피",
    ],
  },
  {
    id: "fruit",
    label: "과일",
    tags: [
      "과일",
      "시트러스",
      "사과",
      "배",
      "건과일",
      "열대과일",
      "베리",
      "핵과일",
      "포도",
      "코코넛",
    ],
  },
  {
    id: "grain",
    label: "곡물과 견과",
    tags: ["견과류", "몰트", "빵·비스킷"],
  },
  {
    id: "oak-smoke",
    label: "나무와 스모크",
    tags: [
      "셰리",
      "우디",
      "오크",
      "스모키",
      "피트",
      "가죽",
      "담배",
      "바다·소금",
    ],
  },
  {
    id: "spice-floral",
    label: "향신료와 꽃",
    tags: [
      "스파이시",
      "계피",
      "후추",
      "정향",
      "생강",
      "육두구",
      "꽃",
      "허브",
      "민트",
    ],
  },
  {
    id: "texture",
    label: "질감과 여운",
    tags: ["부드러운", "크리미", "드라이", "오일리"],
  },
];

export function getAllWhiskyFlavorTags(): string[] {
  return whiskyFlavorGroups.flatMap((group) => group.tags);
}

// 기존 한국어 테이스팅 노트에 명시된 표현을 검색용 태그로 묶는 편집 규칙입니다.
// 원산지, 숙성 연수, 제품명, 캐스크 설명만으로 새로운 향미를 추측하지 않습니다.
// 예: 셰리 태그만으로 건과일을, 버번이라는 이름만으로 바닐라를 추가하지 않습니다.
const flavorTerms: Record<string, string> = {
  바닐라: "바닐라|vanilla",
  꿀: "꿀|꽃꿀|honey",
  캐러멜: "캐러멜|카라멜|캐러멜라이즈드|caramel",
  토피: "토피|버터스카치|퍼지|toffee|butterscotch|fudge",
  초콜릿: "초콜릿|초콜렛|코코아|카카오|chocolate|cocoa|cacao",
  흑설탕: "흑설탕|갈색\\s*설탕|당밀|brown\\s+sugar|molasses",
  메이플: "메이플|단풍\\s*시럽|maple",
  커피: "커피|에스프레소|모카|카페\\s*크림|coffee|espresso|mocha",
  과일: "과일|과수원\\s*과일|fruity|fruit",
  시트러스:
    "시트러스|감귤|귤|오렌지|레몬|라임|자몽|유자|만다린|citrus|orange|lemon|lime|grapefruit",
  사과: "풋사과|청사과|사과|apple",
  배: "배|서양배|pear",
  건과일:
    "건과일|말린\\s*과일|건포도|대추야자|말린\\s*(?:무화과|살구|자두|대추|체리)|dried\\s+fruit|raisins?",
  열대과일:
    "열대\\s*과일|망고|파인애플|바나나|패션\\s*프루트|패션\\s*후르츠|구아바|파파야|리치|tropical\\s+fruit|mango|pineapple|banana",
  베리: "베리|딸기|산딸기|라즈베리|블루베리|블랙베리|크랜베리|블랙커런트|블랙\\s*커런트|레드커런트|레드\\s*커런트|berries|berry|strawberry|raspberry|blackberry|blueberry|cranberry|blackcurrant",
  핵과일:
    "핵과일|복숭아|천도복숭아|살구|자두|체리|stone\\s+fruit|peach|apricot|plum|cherry",
  포도: "포도|청포도|백포도|적포도|머스캣|grapes?|muscat",
  코코넛: "코코넛|coconut",
  견과류:
    "견과류|견과|아몬드|헤이즐넛|헤이즐너트|호두|피칸|땅콩|잣|밤|nuts?|almond|hazelnut|walnut|pecan",
  몰트: "몰트|맥아|보리|곡물|시리얼|malt|barley|cereal",
  "빵·비스킷":
    "빵|비스킷|쿠키|브리오슈|토스트|페이스트리|계피빵|생강빵|bread|biscuit|cookie|brioche|pastry",
  셰리: "셰리|쉐리|sherry",
  우디: "우디|나무|오크|참나무|삼나무|샌들우드|백단향|미즈나라|woody|wood|oak|cedar|sandalwood",
  오크: "오크|참나무|미즈나라|oak",
  스모키:
    "스모키(?:한|하고|하며)?|스모크|연기|훈연|모닥불|장작불|smoky|smokey|smoke|smoked",
  피트: "피트|피티(?:한|하고|하며)?|이탄|peat|peaty|peated",
  가죽: "가죽|leather",
  담배: "담배|시가|tobacco|cigar",
  "바다·소금":
    "바다|바닷바람|바닷물|해풍|소금|짠맛|짭짤(?:한|하고|하며|함)?|해조류|해초|sea\\s+salt|seaweed|brine|salty|maritime",
  스파이시: "스파이시(?:한|하고|하며)?|향신료|spicy|spice|spices",
  계피: "계피|시나몬|시나먼|cinnamon",
  후추: "후추|백후추|흑후추|pepper",
  정향: "정향|클로브|cloves?",
  생강: "생강|진저|ginger",
  육두구: "육두구|넛맥|nutmeg",
  꽃: "꽃|꽃향(?:기)?|사과꽃|오렌지꽃|장미|라벤더|제비꽃|제라늄|인동덩굴|자스민|쟈스민|재스민|floral|flowers?|blossom|rose|lavender|violet",
  허브: "허브|바질|로즈메리|타임|세이지|풀|풀잎|허브티|herbal|herbs?|basil|rosemary|thyme|sage|grass",
  민트: "민트|페퍼민트|스피어민트|박하|mint|peppermint|spearmint",
  부드러운:
    "부드러운|부드럽(?:게|고|거나|지만)?|부드러(?:움|우며|우면서)?|매끄러운|매끄럽(?:게|고)?|실키(?:한)?|벨벳|smooth|silky|velvet",
  크리미: "크리미(?:한|하고|하며|함)?|크림|커스터드|creamy|cream|custard",
  드라이: "드라이(?:한|하고|하며|함)?|건조(?:한|하고|하며|함)?|dry",
  오일리:
    "오일리(?:한|하고|하며|함)?|기름진|기름진\\s*질감|오일\\s*같은|오일감|oily",
};

// 한글에는 \b를 사용할 수 없어 조사와 명시적인 합성어 끝을 허용합니다.
// '배럴'의 배, '사과나무 연기'의 사과, '비피트'의 피트는 향미로 잡지 않습니다.
const wordEnd =
  "(?=$|[^\\p{L}\\p{N}]|(?:와|과|의|이|가|을|를|은|는|도|에|로|처럼)(?=$|[^\\p{L}\\p{N}])|(?:잼|시럽|파이|캔디|과자|껍질|향(?:기)?|맛)(?=$|[^\\p{L}\\p{N}]|[와과의이가을를은는도에로]))";

const flavorRules = getAllWhiskyFlavorTags().map((tag) => ({
  tag,
  pattern: new RegExp(
    `(?<![\\p{L}\\p{N}])(?:${flavorTerms[tag]})${wordEnd}`,
    "giu",
  ),
}));

function hasPositiveMention(note: string, pattern: RegExp): boolean {
  for (const match of note.matchAll(pattern)) {
    const before = note.slice(0, match.index);
    const after = note.slice(match.index + match[0].length);

    // '비 피트', 'non-peated', 'without smoke' 같은 부정 표현을 제외합니다.
    if (/(?:^|[\s,;(])(?:비|무|논)\s*$/u.test(before)) continue;
    if (
      /\b(?:non|un)[-\s]*$|\b(?:no|not|without)\s+(?:\w+\s+){0,2}$/iu.test(
        before,
      )
    )
      continue;

    // 가까이 뒤따르는 부정만 확인하여 다음 절의 다른 향미까지 지우지 않습니다.
    // 규칙 기반 편집이므로 모호한 문장은 자동 추론 대상에 추가하지 않습니다.
    if (
      /^(?:의)?\s*(?:(?:향(?:기)?|풍미|맛|느낌|노트|기운)\s*)?(?:이|가|은|는|을|를|도|조차)?\s*(?:(?:전혀|거의)\s*)?(?:없|아니|아닌|배제|제외|제거|하지\s*않|느껴지지\s*않|나지\s*않|찾을\s*수\s*없)/u.test(
        after,
      )
    )
      continue;
    if (
      /^\s*(?:-?free\b|(?:is|are)\s+(?:absent|not\s+present)\b)/iu.test(after)
    )
      continue;

    return true;
  }
  return false;
}

export function enrichWhiskyFlavors(item: Whisky): Whisky {
  const tags = new Set(item.tags);
  const notes = [item.notes.nose, item.notes.palate, item.notes.finish];

  for (const { tag, pattern } of flavorRules) {
    if (
      !tags.has(tag) &&
      notes.some((note) => hasPositiveMention(note, pattern))
    ) {
      tags.add(tag);
    }
  }

  return { ...item, tags: [...tags] };
}
