import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaigBrodirWhiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.finedrams.com/laphroaig-brodir-whisky.html" },
  [
    ["laphroaig-brodir-batch-001", "라프로익 브로디어 배치 001", "Laphroaig Brodir Batch 001", 48, null,
      ["피트", "스모키", "베리", "꿀", "오크", "시트러스"],
      "버번 캐스크 숙성 후 루비 포트 유러피언 오크에서 피니시한 여행 소매용 NAS 제품입니다. 병 라벨의 배치 001을 확인했습니다. 현행 포트 우드의 일반 항목과 구분하는 배치 제품이며, 향미는 Whisky Gospel의 배치 001 직접 시음 기록을 요약했습니다.",
      "부드러운 피트 연기에 라즈베리·블루베리 잼의 달콤함이 어우러집니다. 시간이 지나며 요오드와 약품 향, 꿀·소금이 나타납니다.",
      "기름진 질감에 재와 그을음, 붉은 베리 잼이 겹칩니다. 오크 향신료와 꿀, 약간의 소금이 연기를 감쌉니다.",
      "피트 연기와 베리 잼의 단맛, 오크 향신료·감귤·꿀이 길게 이어집니다.",
      "https://www.finedrams.com/laphroaig-brodir-whisky.html"],
    ["laphroaig-brodir-batch-002", "라프로익 브로디어 배치 002", "Laphroaig Brodir Batch 002", 48, null,
      ["피트", "스모키", "베리", "스파이시"],
      "버번 캐스크 숙성 후 루비 포트 캐스크에서 피니시한 여행 소매용 NAS 제품입니다. 병과 상자의 배치 002·48%·700ml를 대조했습니다. 향미는 Whisky Gospel의 배치 002 직접 시음 기록을 요약했으며 배치 001의 향미를 재사용하지 않았습니다.",
      "딸기의 단맛과 연기가 먼저 느껴지고, 달콤한 피트와 약한 약품 향에 여러 베리 향이 더해집니다.",
      "강하고 건조한 피트 연기가 입안을 채우며 먼지 같은 질감과 라즈베리, 향신료 풍미가 나타납니다.",
      "중간 길이의 여운에 건조한 느낌과 짙은 연기, 부드러운 붉은 베리가 남습니다.",
      "https://www.finedrams.com/laphroaig-brodir-batch-2.html"],
  ],
).map((item) => ({ ...item, abvNote: "48%·700ml NAS 배치 제품입니다. 캐스크 스트렝스로 추정하지 않습니다." }));
