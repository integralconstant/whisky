import { readFile, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";

const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const save = (file, value) => writeFile(file, JSON.stringify(value, null, 2) + "\n");
const entries = [
  {
    id: "laphroaig-elements-l1-0", name: "라프로익 엘리먼츠 L1.0", englishName: "Laphroaig Elements L1.0", abv: 58.6,
    tags: ["피트", "스모키", "바다·소금", "베리", "열대과일", "후추", "정향", "스파이시"],
    description: "서로 다른 크기의 매시 튠과 맑기 다른 맥즙, 55시간 발효를 실험한 엘리먼츠 첫 번째 제품. 버번 캐스크 숙성으로 피트와 훈연에 열대과일과 향신료 풍미를 더합니다.",
    notes: { nose: "짭짤한 훈제 베이컨과 모닥불의 나무 잔불에 딸기 잼과 그을린 파인애플", palate: "후추의 알싸함과 열대과일에 정향과 감초가 이어지는 맛", finish: "따뜻한 연기와 입안을 말끔하게 조이는 긴 피트 여운" },
    source: "https://www.laphroaig.com/whiskies/laphroaig-elements",
    imageUrl: "https://www.laphroaig.com/sites/default/files/styles/original/public/2023-10/Laphroaig_Elements1_PDP_BottleFront.png.webp?itok=U_WyejrX",
    topProductId: 23377,
  },
  {
    id: "laphroaig-elements-l2-0", name: "라프로익 엘리먼츠 L2.0", englishName: "Laphroaig Elements L2.0", abv: 59.6, caskStrength: true,
    tags: ["피트", "스모키", "사과", "바닐라", "시트러스", "꿀", "바다·소금", "크리미"],
    description: "최대 115시간까지 늘린 발효로 과일과 피트의 균형을 탐구한 엘리먼츠 두 번째 제품. 냉각 여과 없이 병입하며 조린 사과와 바닐라, 꿀과 부드러운 연기가 겹칩니다.",
    notes: { nose: "은은한 해안 향과 피트에 조린 사과, 바닐라 커스터드와 산뜻한 오렌지 껍질", palate: "청사과와 흐르는 꿀, 크림소다의 달콤함에 소금기와 모닥불·훈제 해산물의 부드러운 피트", finish: "달콤함 위로 따뜻한 연기가 점차 짙어지는 여운" },
    source: "https://www.laphroaig.com/whiskies/laphroaig-elements-2-0",
    imageUrl: "https://www.laphroaig.com/sites/default/files/styles/original/public/2024-04/Laphroaig_Elements2_BottleFront.png.webp?itok=_HoSgXrs",
    topProductId: 22757,
  },
];
const mappings = await read("scripts/dailyshot-mappings.json");
const photos = await read("scripts/whisky-photo-sources-laphroaig-verified.json");
const cohortMappings = await read("scripts/dailyshot-mappings-laphroaig-verified.json");
const normalize = (value) => value.toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]/gu, "");
const ids = new Set(whiskies.map((item) => item.id));
const names = new Set(whiskies.flatMap((item) => [normalize(item.name), normalize(item.englishName)]));
const productIds = new Set(Object.values(mappings).map((item) => item.topProductId));
const fresh = entries.filter((entry) => !ids.has(entry.id));
if (!fresh.length) { console.log("Elements already registered"); process.exit(0); }
for (const entry of fresh) {
  if (names.has(normalize(entry.name)) || names.has(normalize(entry.englishName)) || productIds.has(entry.topProductId)) throw new Error(`Duplicate ${entry.id}`);
  const mapping = {
    topProductId: entry.topProductId, volumeMl: 700, productName: entry.name, englishName: entry.englishName, abv: entry.abv,
    method: "manual-verified-expression", sourceUrl: `https://dailyshot.co/m/item/${entry.topProductId}`, verifiedAt: "2026-11-09",
    note: `엘리먼츠 ${entry.id.endsWith("l1-0") ? "L1.0" : "L2.0"}의 개별 상품명·${entry.abv}%·700ml를 생산자와 데일리샷에서 대조했습니다. 다른 엘리먼츠 릴리즈 및 세트는 제외합니다.`,
  };
  mappings[entry.id] = mapping; cohortMappings[entry.id] = mapping;
  photos[entry.id] = { imageUrl: entry.imageUrl, sourceUrl: entry.source, productName: entry.englishName, note: `생산자의 해당 엘리먼츠 정면 실물 병 사진. 릴리즈 번호·${entry.abv}%·700ml 라벨을 직접 확인합니다.` };
}
await writeFile("src/data/whiskies-laphroaig-elements.ts", 'import type { Whisky } from "./types.ts";\n\nexport const laphroaigElementsWhiskies: Whisky[] = ' + JSON.stringify(fresh.map(({ topProductId, imageUrl, ...entry }) => ({ ...entry, brand: "Laphroaig", category: "싱글 몰트", country: "스코틀랜드", region: "아일라", age: null, image: "", color: "#e8ede3" })), null, 2) + ';\n');
await save("scripts/dailyshot-mappings.json", mappings);
await save("scripts/dailyshot-mappings-laphroaig-verified.json", cohortMappings);
await save("scripts/whisky-photo-sources-laphroaig-verified.json", photos);
await save("scripts/catalog-candidates/laphroaig-elements-nov9.json", { checkedOn: "2026-11-09", status: "registered-awaiting-validation", duplicateCheck: "IDs, normalized names and Dailyshot product IDs checked against catalog", notesProvenance: "Producer tasting-note sections paraphrased in Korean", caskStrength: "L2.0 producer front photograph explicitly states CASK STRENGTH. L1.0 unclassified pending explicit confirmation; high ABV alone is insufficient.", entries: fresh });
console.log(JSON.stringify({ added: fresh.map((entry) => entry.id) }));
