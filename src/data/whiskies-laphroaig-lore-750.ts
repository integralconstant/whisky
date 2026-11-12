import { createWhiskyGroup } from "./whisky-catalog-helpers.ts";

export const laphroaigLore750Whiskies = createWhiskyGroup(
  { brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", source: "https://www.oaksliquors.com/p/laphroaig-lore" },
  [["laphroaig-lore-750", "라프로익 로어 750ml", "Laphroaig Lore 750ml", 48, null,
    ["피트", "스모키", "초콜릿", "스파이시", "셰리"],
    "여러 연령과 캐스크의 원액을 결합한 라프로익 로어의 48%·750ml 제품입니다. 실물 병의 LORE·750ml·48%를 대조했으며 기존 700ml와 용량이 다릅니다. 향미는 생산자의 로어 공통 안내를 요약했습니다. 구성 원액의 연령 범위를 제품 숙성 연수로 지정하지 않는 NAS입니다.",
    "짙은 피트 연기와 해안의 미네랄에 재와 초콜릿의 향이 더해집니다.",
    "생기 있는 질감에 쌉쌀한 초콜릿과 재, 칠리 같은 알싸함이 나타납니다.",
    "짧고 드라이한 마무리 뒤에 달콤한 뒷맛이 오래 남습니다."]],
).map((item) => ({ ...item, abvNote: "48%·750ml NAS 제품입니다. 카디어스 로어 캐스크 스트렝스와 구분하며 사진만으로 병입 연도를 특정하지 않습니다." }));
