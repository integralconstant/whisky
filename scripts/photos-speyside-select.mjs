import fs from 'node:fs';
const scan=JSON.parse(fs.readFileSync('scripts/photos-speyside-scan.json','utf8'));
const path='scripts/whisky-photo-sources-speyside.json';
const output=fs.existsSync(path)?JSON.parse(fs.readFileSync(path,'utf8')):{};
const selectors={
 'glenfiddich-18':/glenfiddich-18-year-old.full.png/,
 'speyburn-bourbon-cask':/Bourbon_700ml_Bottle-Render-No-Shadow_product/,
 'speyburn-rum-cask':/Rum_700ml_Bottle-_-Carton-Render-No-Shadow_product/,
 'speyburn-15':/15YO_700ml_Bottle___Carton_Render_NoShadow_product/,
 'speyburn-18':/18YO_700ml_Bottle___Carton_Render_NoShadow_product/,
 'benriach-21':/AW-21-Benriach/,
 'benriach-25':/AW-25-Benriach/,
 'benriach-30':/AW-30-Benriach/,
 'benriach-smoke-season':/SMOKE-SEASON-Bottle_Canister/,
 'mortlach-12':/mortlach-12yo-70cl-gb-malts-front/,
 'mortlach-20':/Mortlach_20YO_750ml_Front/,
 'macallan-18-sherry':/sherryoak18yo_bottle/,
 'macallan-12-triple-cask':/triplecask12yo_bottle/,
 'macallan-harmony-intense-arabica':/hc_ia_bottle/,
};
for(const [id,re] of Object.entries(selectors)){
 const row=scan[id]; const tag=row.images.find(i=>re.test(i));
 const src=tag.match(/\bsrc="([^"]+)"/)[1].replaceAll('&amp;','&');
 output[id]={imageUrl:new URL(src,row.source).href,sourceUrl:row.source,productName:row.name,note:'공식 제품 페이지의 해당 제품 정면 이미지'};
}
fs.writeFileSync(path,JSON.stringify(output,null,2)+'\n');
console.log(`Saved ${Object.keys(output).length} exact product images`);
