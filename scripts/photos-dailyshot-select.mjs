import fs from "node:fs/promises";
const mappings = {
 "aberlour-16":3491,
 "glenrothes-12-soleo":3520,
 "glenrothes-18-soleo":4378,
 "glenrothes-25-soleo":38091,
 "springbank-21":6325,
 "longrow-18":8194,
 "ballantines-7-american-barrel":8576,
 "russells-single-barrel-bourbon":15504,
 "jack-daniels-single-barrel-rye":4845,
 "glenlivet-groundbreaker-chapter-one":32902,
};
const filename="scripts/whisky-photo-sources-additional.json";
const output=JSON.parse(await fs.readFile(filename,"utf8"));
for(const [id,productId] of Object.entries(mappings)) {
 try {
 const sourceUrl=`https://dailyshot.co/m/item/${productId}`;
 const response=await fetch(sourceUrl,{signal:AbortSignal.timeout(20000)});
 if(!response.ok) throw new Error(`HTTP ${response.status}`);
 const html=await response.text();
 const match=html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
 const product=JSON.parse(match[1]).props.pageProps.dehydratedState.queries.find(q=>q.queryKey[1]==="getItemDetailsByTopProducts")?.state.data;
 if(!product?.thumbnail_image) throw new Error("No photograph");
 output[id]={imageUrl:product.thumbnail_image,sourceUrl,productName:product.en_name,note:"연산과 제품을 개별 대조한 상품 대표 사진. 패키지는 출시 시장·시기에 따라 다를 수 있습니다."};
 console.log(id,product.en_name,product.information.find(x=>x.label==="도수")?.value);
 } catch(error) {console.log(id,error.message);}
}
await fs.writeFile(filename,JSON.stringify(output,null,2)+"\n");
