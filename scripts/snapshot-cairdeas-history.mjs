import { writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
await writeFile(".cache/catalog-before-cairdeas-history.json", JSON.stringify(whiskies, null, 2));
console.log(JSON.stringify({count:whiskies.length,existing:whiskies.filter(w=>/cairdeas/i.test(w.id)).map(w=>w.id)}));
