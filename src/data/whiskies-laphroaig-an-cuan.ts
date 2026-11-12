import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaigAnCuanWhiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.finedrams.com/laphroaig-an-cuan-mor-whisky.html" },
  [["laphroaig-an-cuan-mor", "라프로익 안 쿠안 모어", "Laphroaig An Cuan Mor", 48, null,
    ["피트", "스모키", "건과일", "꿀", "바닐라", "가죽", "견과류", "생강", "후추", "오크"],
    "이름이 '큰 바다'를 뜻하는 여행 소매용 제품. 퍼스트 필 버번 아메리칸 오크 배럴 숙성 후 유러피언 오크에서 추가 숙성했습니다. 실물 라벨의 48%·700ml를 확인했으며 숙성 연수는 표시되지 않습니다. 향미는 WhiskyNotes의 해당 제품 직접 시음 기록을 요약했으며 배치 차이가 있을 수 있습니다.",
    "무화과·꿀·은은한 바닐라의 둥근 단맛에 깊은 그을음과 말린 해조류·가죽, 달콤한 아몬드와 약간의 후추가 겹칩니다.",
    "요오드·연고·붕대 같은 약품 풍미에 모닥불·탄 설탕·희미한 성냥이 이어집니다. 흙내와 생강·후추, 꿀을 입힌 견과류·감초가 어우러집니다.",
    "달콤한 피트와 그을음, 한층 선명한 오크가 길게 남습니다."]],
).map((item) => ({ ...item, abvNote: "안쿠안모어48%·700ml NAS입니다. 캐스크의 나이와 원액의 숙성 연수를 혼동하지 않으며 CS로 추정하지 않습니다." }));
