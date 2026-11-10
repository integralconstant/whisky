import { writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
await writeFile(".cache/catalog-before-laphroaig-25-2018-2019.json", JSON.stringify(whiskies, null, 2));
const urls = {
  "2018": "https://img.thewhiskyexchange.com/900/lrgob.25yov7.jpg",
  "2019": "https://www.thewhiskybarrel.com/cdn/shop/files/laphroaig-25-year-old-2019-release.jpg?width=1000",
  "dailyshot-2018-sellers": "https://dailyshot.co/m/items/283631/sellers",
};
for (const [key, url] of Object.entries(urls)) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${key}: ${response.status}`);
  await writeFile(`.cache/laphroaig-25-${key}.${key.startsWith("dailyshot") ? "html" : "jpg"}`, Buffer.from(await response.arrayBuffer()));
  console.log(key);
}
