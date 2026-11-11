import { access, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
const snapshot=".cache/catalog-before-laphroaig-ian-hunter.json";
try{await access(snapshot);}catch(error){if(error.code!=="ENOENT")throw error;await writeFile(snapshot,JSON.stringify(whiskies,null,2));}
const urls={
 2:"https://www.laphroaig.com/sites/default/files/styles/original/public/2026-02/IH-Book-2-.jpg.webp?itok=gbS94ON7",
 3:"https://www.laphroaig.com/sites/default/files/styles/original/public/2026-03/Ian%20Hunter%20Book%203%20Front.png.webp?itok=15pNcO9_",
 4:"https://www.laphroaig.com/sites/default/files/styles/original/public/2026-02/Ian-Hunter-Book-4.jpg.webp?itok=FktTmvZC",
 5:"https://www.laphroaig.com/sites/default/files/styles/original/public/2023-12/Laphroaig_IanHunter5_Bottle_Front.jpg.webp?itok=81sMUIjm",
};
for(const [book,url]of Object.entries(urls)){
 const response=await fetch(url,{signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error(`${book} ${response.status}`);
 await writeFile(`.cache/laphroaig-ian-hunter-${book}.webp`,Buffer.from(await response.arrayBuffer()));console.log(book);
}
await writeFile("scripts/catalog-candidates/laphroaig-ian-hunter-photos.json",JSON.stringify(urls,null,2)+"\n");
