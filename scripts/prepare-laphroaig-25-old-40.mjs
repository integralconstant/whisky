import { access, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
const snapshot=".cache/catalog-before-laphroaig-25-old-40.json";
try{await access(snapshot);}catch(error){if(error.code!=="ENOENT")throw error;await writeFile(snapshot,JSON.stringify(whiskies,null,2));}
for(const [key,url]of Object.entries({front:"https://www.passionforwhisky.com/138686-large_default/laphroaig-25-years-old-bottling.jpg",back:"https://www.passionforwhisky.com/138687-large_default/laphroaig-25-years-old-bottling.jpg"})){
 const response=await fetch(url,{signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error(`${key} ${response.status}`);
 await writeFile(`.cache/laphroaig-25-old-40-${key}.jpg`,Buffer.from(await response.arrayBuffer()));console.log(key);
}
