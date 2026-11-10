import { writeFile } from "node:fs/promises";
const url = "https://api.dailyshot.co/item-sellers/?item_id=283631&page=1&page_size=100&service_type=1&ordering=price&include_sold_out=0&group_same_price=0";
const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
if (!response.ok) throw Error(response.status);
const data = await response.json();
await writeFile(".cache/laphroaig-25-offers.json", JSON.stringify(data, null, 2));
console.log(JSON.stringify({count:data.count,next:data.next,offers:data.results.map(({item,seller})=>({item:item.id,name:item.name,tag:item.name_tag,price:item.price,status:item.status,seller:seller.name,active:seller.is_active}))},null,2));
