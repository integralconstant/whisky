import { readFile, writeFile } from "node:fs/promises";
const html = await readFile(".cache/laphroaig-25-dailyshot-2018-sellers.html", "utf8");
const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
if (!match) throw Error("No public Next data");
const data = JSON.parse(match[1]);
await writeFile(".cache/laphroaig-25-dailyshot-2018-sellers.json", JSON.stringify(data, null, 2));
console.log(JSON.stringify(data.props.pageProps, null, 2).slice(0, 18000));
