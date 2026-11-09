import { writeFile } from "node:fs/promises";
const photos = {
  "2021": "https://www.laphroaig.com/sites/default/files/styles/original/public/2023-12/3122576_Cairdeas_Pedro_Ximenez_1.jpg.webp?itok=k-iVbo39",
  "2023": "https://www.laphroaig.com/sites/default/files/styles/original/public/2023-12/Cairdeas2023-Bottle-Front-Shot.jpg.webp?itok=9sBa-y4L",
  "2022": "https://www.laphroaig.com/sites/default/files/styles/original/public/2023-12/3122578_Cairdeas_Warehouse_1_1.jpg.webp?itok=756KCeiQ",
  "2020": "https://www.laphroaig.com/sites/default/files/styles/original/public/2023-12/3122577_Cairdeas_Port_Wine_1.jpg.webp?itok=au34YyLO",
  "2019": "https://www.laphroaig.com/sites/default/files/styles/original/public/2023-05/laphroaig-cairdeas-triple-wood-cask-strength-bottle.jpg.webp?itok=wxeyBmAK",
};
for (const [year, url] of Object.entries(photos)) {
  const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${year}`);
  await writeFile(`.cache/laphroaig-cairdeas-${year}-review.webp`, Buffer.from(await response.arrayBuffer()));
  console.log(year);
}
await writeFile("scripts/catalog-candidates/laphroaig-cairdeas-history-photos.json", JSON.stringify(photos, null, 2) + "\n");
