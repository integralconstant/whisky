import { readFile, writeFile } from "node:fs/promises";
const html=await readFile(".cache/laphroaig-25-2012-sothebys.html","utf8");
const images=[...new Set([...html.matchAll(/https[^\s"<>\\]+(?:jpg|jpeg|png|webp)[^\s"<>\\]*/g)].map((match)=>match[0]))];
console.log(JSON.stringify(images.slice(0,20),null,2));
if(process.argv.includes("--download")) {
 for(const letter of ["a","b","c"]) {
  const url=images.find((value)=>value.includes("resize/2048x")&&value.includes(`548${letter}.jpg`));
  if(!url)throw Error("Missing lot photograph");
  const response=await fetch(url,{signal:AbortSignal.timeout(30000)});
  if(!response.ok)throw Error(response.status);
  await writeFile(`.cache/laphroaig-25-2012-sothebys-${letter}.jpg`,Buffer.from(await response.arrayBuffer()));
 }
}
for(const term of ["2012","2011","48.6"]){const i=html.indexOf(term);console.log(term,html.slice(Math.max(0,i-150),i+300));}
