import { access, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
const snapshot=".cache/catalog-before-laphroaig-30-2024.json";
try{await access(snapshot);}catch(error){if(error.code!=="ENOENT")throw error;await writeFile(snapshot,JSON.stringify(whiskies,null,2));}
const photos={annual:"https://www.laphroaig.com/sites/default/files/styles/original/public/2024-09/30YO%20PNG.png.webp?itok=oDr2Lhgp",anniversary:"https://www.laphroaig.com/sites/default/files/styles/original/public/2024-10/FoL-30th-Bottle.jpg.webp?itok=Sdp4rvsN"};
for(const [key,url]of Object.entries(photos)){
 const response=await fetch(url,{signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error(`${key} ${response.status}`);
 await writeFile(`.cache/laphroaig-30-2024-${key}.webp`,Buffer.from(await response.arrayBuffer()));console.log(key);
}
await writeFile("scripts/catalog-candidates/laphroaig-30-2024-photos.json",JSON.stringify(photos,null,2)+"\n");
