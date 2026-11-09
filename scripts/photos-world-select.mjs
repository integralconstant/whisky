import fs from "node:fs";
const rows = JSON.parse(fs.readFileSync("scripts/photos-world-candidates.json", "utf8"));
const selectors = {
  "four-roses-single-barrel": /Web_FR-Single-Barrel\.png/,
  "teeling-rising-reserve-21-1": /TW_RISING_S1_BOTTLE-320x399\.png$/,
  "bushmills-25": /bushmills-single-malt-whiskey-25Y_.*\.png/i,
  "bushmills-30": /bushmills-single-malt-whiskey-30y_.*\.png/i,
  "canadian-club-original": /\/img_canadianclub\.png$/,
  "canadian-club-black-label": /\/img_blacklabel\.png$/,
  "canadian-club-20": /\/img_20yearold\.png$/,
  "yoichi-10": /\/lineup_yoichi10\.png$/,
  "miyagikyo-10": /\/lineup_miyagikyo10\.png$/,
  "teeling-30": /FY24_Teeling_Lifestyle_30yr_VintageReserve_SingleProd_07_11\.jpg$/,
  "old-forester-86": /\/Old-Fo-86-Bottle\.png$/,
  "old-forester-100": /\/Old-Fo-100-Bottle\.png$/,
  "old-forester-1897": /1897-750ml-New-Label_TransparentBG-1-copy\.png$/,
  "old-forester-1910": /1910-750ml-New-Label_TransparentBG-1-1-copy-1\.png$/,
  "old-forester-1920": /1920-750ml-New-Label_TransparetnBG-1-copy\.png$/,
  "old-forester-rye": /\/Old-Fo-Rye-Bottle\.png$/,
  "old-forester-single-barrel-100": /100proof_TransparentBG-900-h\.png$/,
  "old-forester-1924": /1924_0861_HIRES-V2_1-2-768x512\.jpg$/,
  "suntory-toki": /2024-11\/toki-whisky-house-of-suntory\.png$/,
  "knob-creek-12": /2024-09\/12-year-old-kentucky-bottle-whiskey-knob-creek\.webp$/,
  "knob-creek-18": /2024-09\/18-year-old-kentucky-bottle-whiskey-knob-creek\.webp$/,
  "knob-creek-7-rye": /2024-07\/7-year-old-kentucky-rye-bottle-whiskey-knob-creek\.png$/,
  "weller-single-barrel": /WELLER_SINGLE_BARREL_BOTTLE\.png$/,
  "basil-hayden-malted-rye": /Basil%20Hayden_Malted%20Rye_Carousel\.png$/,
  "basil-hayden-toast": /Basil%20Hayden_Toast_Carousel\.png$/,
  "basil-hayden-dark-rye": /Basil%20Hayden_Dark%20Rye_Carousel\.png$/,
  "teeling-small-batch": /FY24_Teeling_Bottle_SmallBatch-320x399\.png$/,
  "teeling-single-grain": /FY24_Teeling_Bottle_SingleGrain-320x399\.png$/,
  "teeling-single-malt": /FY24_Teeling_Bottle_SingleMalt-320x399\.png$/,
  "teeling-single-pot-still": /FY24_Teeling_Bottle_PotStill-320x399\.png$/,
  "teeling-blackpitts": /FY21_TEELING_Peated_Single_Malt-320x399\.png$/,
  "teeling-blackpitts-cask-strength": /TW_Blackpitts-Cask-Strength-320x399\.png$/,
  "writers-tears-double-oak": /BottleBox_PortfolioProfile_528x1092px_WT_DoubleOak\.png$/,
  "bushmills-46-river-bush": /bushmills-46-year\.png/,
  "starward-two-fold": /two-fold-starward-whisky-121261\.png/,
  "penderyn-madeira": /Penderyn-Madeira-600x819\.jpg$/,
  "penderyn-portwood": /Slide5-600x800\.jpg$/,
  "penderyn-sherrywood": /Slide7-600x800\.jpg$/,
  "penderyn-peated": /peated-4-600x800\.jpg$/,
  "penderyn-rich-oak": /Slide6-600x800\.jpg$/,
  "penderyn-celt": /PenderynCelt23Store-600x819\.png$/,
  "penderyn-myth": /PenderynMyth23Store-600x819\.png$/,
  "penderyn-legend": /PenderynLegend23Store-600x819\.png$/,
  "amrut-peated": /AD_SM_PEATED_BPW_E1250-removebg-preview\.png$/,
  "amrut-bagheera": /AD_BAGHEERA_BPW_E1250_800x-depositphotos-bgremover-1-600x600\.png$/,
  "amrut-kadhambam": /ASM-KADHAMBAM-1\.png$/,
  "amrut-rajigala": /ASM-RAJIGALA-1-e1712055316175\.png$/,
  "amrut-spectrum-004": /DSC01517-600x450\.png$/,
  "single-malts-india-marudham": /Amrut-Marudham-with-box-600x908\.png$/,
  "single-malts-india-kurinji": /DSC01574-600x450\.png$/,
  "crown-royal-black": /\/CR_Black\.png$/,
  "crown-royal-northern-harvest-rye": /\/cr-rye\.png$/,
  "crown-royal-reserve": /\/bottle-cr-reserve\.png$/,
  "crown-royal-reserve-12": /\/crown-royol-12yo\.png$/,
  "crown-royal-xo": /\/xo-updated\.png$/,
  "crown-royal-18": /\/Crown_Royal_18yo\.png$/,
  "crown-royal-single-malt": /\/single-malt-updated\.jpg$/,
  "jp-wisers-10": /FY26_JPW_DTC_ProductShot_Updates_10YO_1200x1200\.png/,
  "jp-wisers-18": /FY26_JPW_DTC_ProductShot_Updates_18YO_1200x1200\.png/,
  "jp-wisers-special-blend": /JPW_Website_PDP_SpecialBlend_1200x1200\.jpg/,
  "pike-creek-double-barreled": /JPW_Website_PDP_PikeCreek_1200x1200\.png/,
  "lot-no-40-pot-still-rye": /JPW_Website_PDP_Lot40_1200x1200\.png/,
  "lot-no-40-dark-oak": /JPW_Website_PDP_Lot40_DarkOak_1200x1200\.png/,
  "forty-creek-copper-bold": /FC-COPPER-BOLD-WHISKY_1000x1000-on-600x600\.webp$/,
  "forty-creek-confederation-oak": /FC-CONFEDERATION-OAK-WHISKY_1000x1000-on-600x600\.webp$/,
  "forty-creek-niagara-triple-reserve": /FC-NIAGARA-TRIPLE-RESERVE-WHISKY_1000x1000-on-600x600\.webp$/,
  "canadian-club-classic-12": /\/YCC12J_R1_20181220\.jpg$/,
  "kavalan-lan": /\/LAN-mit-Karton\.png$/,
  "kavalan-15-2025": /Kavalan_15YO_1\.jpg\?w=400$/,
};
const output = {};
for (const [id, expression] of Object.entries(selectors)) {
  const row = rows[id];
  const candidates = [...row.linkedImages, ...row.images.map((tag) => tag.match(/\b(?:data-src|src)=["']([^"']+)/)?.[1]).filter(Boolean)];
  const rawUrl = candidates.find((url) => !url.includes("\\") && expression.test(url));
  const imageUrl = rawUrl && new URL(rawUrl.replaceAll("&amp;", "&"), row.source).href.replace(/^http:/, "https:");
  if (!imageUrl) { console.log("Not found", id); continue; }
  output[id] = { imageUrl, sourceUrl: row.source, productName: row.name, note: "공식 제품 페이지에서 해당 연산·제품의 병 사진을 선택했습니다." };
}
for (const [id, filename] of Object.entries({"woodford-reserve":"Bourbon-Bottle.png", "woodford-malt":"Malt-Bottle-1.png", "woodford-wheat":"Wheat-Bottle-1.png", "woodford-double-oaked":"1.png", "woodford-double-double-oaked":"F25-WRDDO_RENDER-1-619x1024.png"})) {
 const row = rows["woodford-reserve"];
 const imageUrl = row.linkedImages.find(url=>url.startsWith("https://") && url.endsWith("/"+filename));
 if(imageUrl) output[id] = {imageUrl, sourceUrl:row.source, productName:id.replaceAll("-"," "), note:"공식 제품군 이미지에서 버번·몰트·위트·더블 오크드 라벨을 구분했습니다."};
}
fs.writeFileSync("scripts/whisky-photo-sources-world.json", JSON.stringify(output, null, 2) + "\n");
console.log("Selected", Object.keys(output).length);
