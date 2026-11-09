import { readFile, writeFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
const read = async (file) => JSON.parse(await readFile(file, "utf8"));
const save = (file, value) => writeFile(file, JSON.stringify(value, null, 2) + "\n");
const evidence = await read("scripts/catalog-candidates/laphroaig-core-relaunch-ready.json");
const entry = evidence.entries.find((item) => item.id === "laphroaig-18-2024-relaunch");
if (whiskies.some((item) => item.id === entry.id)) { console.log("Already registered"); process.exit(0); }
const normalize = (value) => value.toLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]/gu, "");
assertUnique();
function assertUnique() {
  if (whiskies.some((item) => normalize(item.name) === normalize(entry.record.name) || normalize(item.englishName) === normalize(entry.record.englishName))) throw new Error("Duplicate expression");
}
const record = { ...entry.record, brand: "Laphroaig", image: "", color: "#e8ede3", abvNote: "48%·700ml의 2024 리런치입니다. 구형 18년과 구분하며 정확한 현행 데일리샷 상품이 확인되기 전에는 가격을 표시하지 않습니다." };
await writeFile("src/data/whiskies-laphroaig-18.ts", 'import type { Whisky } from "./types.ts";\n\nexport const laphroaig18Whiskies: Whisky[] = ' + JSON.stringify([record], null, 2) + ';\n');
const photos = await read("scripts/whisky-photo-sources-laphroaig-verified.json");
photos[entry.id] = { imageUrl: entry.photoCandidates[0].url, sourceUrl: record.source, productName: record.englishName, note: "공식 2024 리런치 정면 병 사진의 18년·48%·700ml 라벨을 확인했습니다. 구형과 구분합니다." };
await save("scripts/whisky-photo-sources-laphroaig-verified.json", photos);
await save("scripts/catalog-candidates/laphroaig-18-integration.json", { checkedOn: "2026-11-09", status: "registered-awaiting-photo-validation", reason: "Updated user scope permits registration without Dailyshot listing or price", duplicateCheck: "ID and normalized Korean/English names checked", entry });
console.log(entry.id);
