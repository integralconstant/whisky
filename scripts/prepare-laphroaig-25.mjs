import { writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
await writeFile(".cache/catalog-before-laphroaig-25.json", JSON.stringify(whiskies, null, 2));
const photos = {
  "2020": "https://www.laphroaig.com/sites/default/files/styles/original/public/2023-12/3122527_2020_Edition_25_years_1.jpg.webp?itok=9a-pDXbT",
  "2021": "https://www.laphroaig.com/sites/default/files/styles/original/public/2022-06/Laphroaig_2021_Edition_25_year_Desktop_2.jpg.webp?itok=Hd4Z6XQ-",
  "2022": "https://www.laphroaig.com/sites/default/files/styles/original/public/2023-12/3122571_2022_Edition_25_years_1.jpg.webp?itok=k2Tu5PkY",
  "2023": "https://www.laphroaig.com/sites/default/files/styles/original/public/2026-03/whisky-25yo-bottle-studio-cutout-laphroaig.png.webp?itok=tfgxE9a1",
};
for (const [year, url] of Object.entries(photos)) {
  const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  await writeFile(`.cache/laphroaig-25-${year}-review.webp`, Buffer.from(await response.arrayBuffer()));
  console.log(year);
}
await writeFile("scripts/catalog-candidates/laphroaig-25-photos.json", JSON.stringify(photos, null, 2) + "\n");
console.log(`Snapshot ${whiskies.length}`);
