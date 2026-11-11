import { writeFile } from "node:fs/promises";
for(const id of [17597,6021,14784,23793]){
 const response=await fetch(`https://dailyshot.co/m/item/${id}`,{signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error(response.status);
 const html=await response.text();const match=html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);if(!match)throw Error("Missingdata");
 const data=JSON.parse(match[1]).props.pageProps.dehydratedState.queries.find((query)=>query.queryKey[1]==="getItemDetailsByTopProducts")?.state.data;
 if(!data)throw Error("Missingdetail");await writeFile(`.cache/ian-hunter-dailyshot-${id}.json`,JSON.stringify(data,null,2));
 console.log(JSON.stringify({id,name:data.name,en_name:data.en_name,information:data.information,thumbnail:data.thumbnail_image}));
 if(id===14784){const photo=await fetch(data.thumbnail_image);if(!photo.ok)throw Error(photo.status);await writeFile(".cache/laphroaig-ian-hunter-4-dailyshot.webp",Buffer.from(await photo.arrayBuffer()));}
}
