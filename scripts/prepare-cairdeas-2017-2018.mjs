import { writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
await writeFile(".cache/catalog-before-cairdeas-2017-2018.json", JSON.stringify(whiskies, null, 2));
for (const [year, url] of [
  [2017, "https://img.thewhiskyexchange.com/900/lrgob.non18.jpg"],
  [2018, "https://cdn.klwines.com/images/skus/1371733x.jpg"],
]) {
  const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${year}`);
  await writeFile(`.cache/cairdeas-${year}-retailer.jpg`, Buffer.from(await response.arrayBuffer()));
  console.log(year);
}
console.log(`Snapshot: ${whiskies.length}`);
