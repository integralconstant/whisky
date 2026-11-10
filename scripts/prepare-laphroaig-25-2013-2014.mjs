import { writeFile, access } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
const snapshot=".cache/catalog-before-laphroaig-25-2013-2014.json";
try { await access(snapshot); } catch(error) { if(error.code!=="ENOENT")throw error; await writeFile(snapshot,JSON.stringify(whiskies,null,2)); }
for(const [key,url] of Object.entries({
  "2013.jpg":"https://img.thewhiskyexchange.com/900/lrgob.25yov2.jpg",
  "2014.jpg":"https://media.whisky.auction/600/215814_0.jpg?id=468284",
})) {
 const response=await fetch(url,{signal:AbortSignal.timeout(30000)});
 if(!response.ok)throw Error(`${key} HTTP${response.status}`);
 await writeFile(`.cache/laphroaig-25-${key}`,Buffer.from(await response.arrayBuffer()));
 console.log(key);
}
