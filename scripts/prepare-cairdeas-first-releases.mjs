import { writeFile } from "node:fs/promises";
for (const [year, filename] of [
  [2008, "31890_source_1788939670.jpg"],
  [2009, "16732_source_1788939663.jpg"],
  [2010, "16760_source_1788939662.jpg"],
  [2011, "50830_source_1788939659.jpg"],
]) {
  const url = `https://cdn11.bigcommerce.com/s-e8lbekfe7c/images/stencil/1920w/attribute_rule_images/${filename}?compression=lossy`;
  const response = await fetch(url, { signal: AbortSignal.timeout(25000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  await writeFile(`.cache/cairdeas-${year}-retailer.jpg`, Buffer.from(await response.arrayBuffer()));
  console.log(year);
}
