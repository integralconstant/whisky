import { writeFile, access } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
const snapshot=".cache/catalog-before-laphroaig-25-2011.json";
try{await access(snapshot);}catch(error){if(error.code!=="ENOENT")throw error;await writeFile(snapshot,JSON.stringify(whiskies,null,2));}
const response=await fetch("https://img.thewhiskyexchange.com/900/lrgob.25yov1.jpg",{signal:AbortSignal.timeout(30000)});
if(!response.ok)throw Error(response.status);
await writeFile(".cache/laphroaig-25-2011.jpg",Buffer.from(await response.arrayBuffer()));
console.log(`Snapshot ${whiskies.length}; downloaded2011 candidate`);
