import { writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
await writeFile(".cache/catalog-before-cairdeas-2012-2015.json", JSON.stringify(whiskies, null, 2));
for (const [year, url] of [
  [2015, "https://media.whisky.auction/600/210219_0.jpg?id=455730"],
  [2012, "https://cdn11.bigcommerce.com/s-e8lbekfe7c/images/stencil/1920w/attribute_rule_images/34604_source_1788939656.jpg?compression=lossy"],
  [2013, "https://cdn11.bigcommerce.com/s-e8lbekfe7c/images/stencil/1920w/attribute_rule_images/31938_source_1788939671.jpg?compression=lossy"],
]) {
  const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  await writeFile(`.cache/cairdeas-${year}-retailer.jpg`, Buffer.from(await response.arrayBuffer()));
  console.log(year);
}
console.log(`Snapshot ${whiskies.length}`);
