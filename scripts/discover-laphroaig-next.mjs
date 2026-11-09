import { writeFile } from "node:fs/promises";
const rows = new Map();
for (const q of ["라프로익 카디어스", "라프로익 18", "라프로익 엘리먼츠"]) {
  const url = new URL("https://api.dailyshot.co/items/search/");
  url.search = new URLSearchParams({ q, page: "1", page_size: "100" });
  const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  for (const item of data.results) rows.set(item.top_product_id, {
    topProductId: item.top_product_id, name: item.top_product_name || item.name,
    englishName: item.en_name, price: item.price,
  });
}
await writeFile("scripts/catalog-candidates/laphroaig-next-nov9.json", JSON.stringify({ checkedAt: new Date().toISOString(), status: "research-only", entries: [...rows.values()] }, null, 2) + "\n");
console.log(JSON.stringify([...rows.values()], null, 2));
