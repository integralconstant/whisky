import { readFile, writeFile } from "node:fs/promises";
const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const mappings = await read("scripts/dailyshot-mappings.json");
const rows = [
  ["laphroaig-cairdeas-2021-px", 10297, 750, "라프로익 카디어스 페드로 히메네즈 2021", "LAPHROAIG Cairdeas Pedro Ximenez", 58.9],
  ["laphroaig-cairdeas-2022-warehouse-1", 10298, 750, "라프로익 카디어스 웨어하우스 1 2022", "LAPHROAIG Cairdeas Warehouse 1", 52.2],
  ["laphroaig-cairdeas-2023-white-port-madeira", 22709, 700, "라프로익 카디어스 2023 화이트 포트 & 마데이라 캐스크", "Laphroaig Cairdeas 2023 White Port & Madeira Casks", 52.3],
];
const cohort = {};
for (const [id, topProductId, volumeMl, productName, englishName, abv] of rows) {
  if (Object.entries(mappings).some(([other, mapping]) => other !== id && mapping.topProductId === topProductId)) throw new Error(`Duplicate product ${topProductId}`);
  cohort[id] = {
    topProductId, volumeMl, productName, englishName, abv,
    method: "manual-verified-expression", sourceUrl: `https://dailyshot.co/m/item/${topProductId}`, verifiedAt: "2026-11-09",
    note: `연도·캐스크 표현·${abv}%·${volumeMl}ml를 데일리샷 개별 상품과 생산자 페이지에서 대조했습니다. 바이알·다른 연도는 제외합니다.`,
    ...(id.includes("2021") ? { priceNote: "카디어스 2021 PX 58.9%·750ml의 판매가입니다. 공식 사진은 700ml 시장용 병이며 가격 비교 용량은 750ml입니다. 일반 PX 캐스크 48%는 제외합니다." } : {}),
  };
  mappings[id] = cohort[id];
}
await writeFile("scripts/dailyshot-mappings.json", JSON.stringify(mappings, null, 2) + "\n");
await writeFile("scripts/dailyshot-mappings-cairdeas-history.json", JSON.stringify(cohort, null, 2) + "\n");
console.log(Object.keys(cohort).join(","));
