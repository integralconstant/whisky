import { writeFile } from "node:fs/promises";
for (const [year, url] of [
  [2014, "https://cdn11.bigcommerce.com/s-e8lbekfe7c/images/stencil/1920w/attribute_rule_images/29117_source_1788939668.jpg?compression=lossy"],
  [2016, "https://cdn11.bigcommerce.com/s-e8lbekfe7c/images/stencil/1920w/attribute_rule_images/21157_source_1784699445.jpg?compression=lossy"],
]) {
  const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  await writeFile(`.cache/cairdeas-${year}-retailer.jpg`, Buffer.from(await response.arrayBuffer()));
  console.log(year);
}
