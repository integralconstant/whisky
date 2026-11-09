import { writeFile } from "node:fs/promises";
const photos = {
  "cairdeas-2026": "https://www.laphroaig.com/sites/default/files/styles/original/public/2026-05/C%C3%A0irdeas%202026.png.webp?itok=eyxBTwhw",
  "cairdeas-2025": "https://www.laphroaig.com/sites/default/files/styles/original/public/2025-05/Cairdeas2025.png.webp?itok=68m1nkDh",
  "cairdeas-2024": "https://www.laphroaig.com/sites/default/files/styles/original/public/2024-11/Laphroaig-Friends-of-Laphroaig-Cairdeas-Cask-Favourites-2024-Bottle.jpg.webp?itok=GVoMoBdo",
  "elements-l3-0": "https://www.laphroaig.com/sites/default/files/styles/original/public/2025-05/Elements%203.0%20PNG.png.webp?itok=S1x0UrkU",
};
for (const [id, url] of Object.entries(photos)) {
  const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${id}`);
  await writeFile(`.cache/laphroaig-${id}-review.webp`, Buffer.from(await response.arrayBuffer()));
  console.log(id);
}
await writeFile("scripts/catalog-candidates/laphroaig-new-release-photos.json", JSON.stringify(photos, null, 2) + "\n");
