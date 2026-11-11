import { access, readFile, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
const snapshot=".cache/catalog-before-laphroaig-25-2008.json";
try{await access(snapshot);}catch(error){if(error.code!=="ENOENT")throw error;await writeFile(snapshot,JSON.stringify(whiskies,null,2));}
const urls={
 "us.jpg":"https://www.oaksliquors.com/product_images/img_47_1_a1.jpg",
 "sg.html":"https://www.thewhiskyshop.com.sg/products/laphroaig-25-years-cask-strength-bot-2008",
};
for(const [name,url]of Object.entries(urls)){
 const response=await fetch(url,{signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error(`${name} ${response.status}`);
 await writeFile(`.cache/laphroaig-25-2008-${name}`,Buffer.from(await response.arrayBuffer()));console.log(name);
}
const html=await readFile(".cache/laphroaig-25-2008-sg.html","utf8");
console.log(JSON.stringify([...new Set([...html.matchAll(/(?:https?:)?\/\/[^\s"<>]+(?:jpg|png|webp)[^\s"<>]*/g)].map((match)=>match[0]))].filter((url)=>/laph|25|2008/i.test(url)).slice(0,15),null,2));
