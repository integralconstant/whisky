export type FlavorTag = string;

export type DailyshotProduct = {
  url: string;
  productName: string;
  checkedAt: string;
  note: string;
  scope: "exact-product" | "variable-batches" | "other-batches" | "search";
};

export type DailyshotPrice = {
  average: number;
  currency: "KRW";
  volumeMl: number;
  sampleCount: number;
  min: number;
  max: number;
  checkedAt: string;
  sourceUrl: string;
  offers: Array<{ price: number; url: string; seller: string }>;
  note?: string;
};

export interface Whisky {
  id: string;
  name: string;
  englishName: string;
  brand: string;
  category:
    | "싱글 몰트"
    | "블렌디드"
    | "버번"
    | "라이"
    | "아이리시"
    | "재패니즈"
    | "테네시"
    | "캐나디안"
    | "싱글 그레인"
    | "싱글 팟 스틸"
    | "기타 위스키";
  country: string;
  region: string;
  abv: number;
  // For variable bottlings, abv is the range minimum used for sorting.
  abvRange?: [number, number];
  caskStrength?: boolean;
  abvNote?: string;
  age: number | null;
  tags: FlavorTag[];
  description: string;
  notes: { nose: string; palate: string; finish: string };
  image: string;
  color: string;
  source: string;
  featured?: boolean;
  dailyshotPrice?: DailyshotPrice;
  dailyshotProduct?: DailyshotProduct;
}

export interface Cocktail {
  id: string;
  name: string;
  englishName: string;
  category: string;
  base: string;
  tags: string[];
  description: string;
  ingredients: { name: string; amount: string }[];
  steps: string[];
  glass: string;
  difficulty: "쉬움" | "보통";
  time: number;
  image: string;
  color: string;
  source: string;
  featured?: boolean;
}
