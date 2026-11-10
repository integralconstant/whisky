import { writeFile, access } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
const snapshot = ".cache/catalog-before-laphroaig-25-2015-2016.json";
try { await access(snapshot); } catch { await writeFile(snapshot, JSON.stringify(whiskies, null, 2)); }
for (const [year, code] of [[2015, "v11"], [2016, "v5"]]) {
  const url = `https://img.thewhiskyexchange.com/900/lrgob.25yo${code}.jpg`;
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw Error(`${year} ${response.status}`);
  await writeFile(`.cache/laphroaig-25-${year}.jpg`, Buffer.from(await response.arrayBuffer()));
  console.log(year);
}
