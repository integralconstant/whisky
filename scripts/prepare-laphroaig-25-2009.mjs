import { access, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
const snapshot=".cache/catalog-before-laphroaig-25-2009.json";
try{await access(snapshot);}catch(error){if(error.code!=="ENOENT")throw error;await writeFile(snapshot,JSON.stringify(whiskies,null,2));}
const url="https://www.oldandrarewhisky.co.uk/cdn/shop/products/laphroaig-25-year-old-cask-strength-2009-edition-islay-single-malt-70cl-51-abv-161677_701x700.jpg?v=1637158267";
const response=await fetch(url,{signal:AbortSignal.timeout(30000)});
if(!response.ok)throw Error(response.status);
await writeFile(".cache/laphroaig-25-2009.jpg",Buffer.from(await response.arrayBuffer()));
console.log(`Snapshot${whiskies.length};downloaded2009`);
