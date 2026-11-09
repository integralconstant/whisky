import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { whiskies } from "../src/data/whiskies.ts";

const root = fileURLToPath(new URL("../", import.meta.url));
const manifestPath = path.join(root, "src/data/whisky-images.json");
const imageDirectory = path.join(root, "public/images");
const cacheDirectory = path.join(root, ".cache/whisky-photos");
const mode = process.argv[2] || "all";
const existingPhotos = {
  "glenfiddich-12": "/images/glenfiddich-12.jpg",
  "balvenie-12-doublewood": "/images/balvenie-12.jpg",
  "macallan-12-sherry": "/images/macallan-12.jpg",
  "glenmorangie-original-12": "/images/glenmorangie-12.jpg",
  "lagavulin-16": "/images/lagavulin-16.jpg",
  "ardbeg-10": "/images/ardbeg-10.jpg",
};
async function json(filename, fallback = {}) {
  try {
    return JSON.parse(await readFile(filename, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
}
const manifest = await json(manifestPath);
const coverage = await json(path.join(root, "scripts/dailyshot-coverage.json"));
const discoveries = await json(
  path.join(root, "scripts/dailyshot-discovery.json"),
);
await mkdir(imageDirectory, { recursive: true });
await mkdir(cacheDirectory, { recursive: true });
const externalSources = {};
for (const group of [
  "scotland",
  "speyside",
  "world",
  "additional",
  "resume-scotch",
  "resume-irish",
  "resume-other",
  "cs-scotch",
  "cs-america",
  "cs-world",
  "scotch-batches",
  "more-scotch-batches",
  "more-cs-america",
  "glenallachie-21-batches",
  "glendronach-cs",
  "highland-park-cs",
  "glenallachie-early-batches",
  "macnairs",
  "laphroaig-cs-batches",
  "laphroaig-travel",
  "laphroaig-core",
  "laphroaig-verified",
]) {
  Object.assign(
    externalSources,
    await json(path.join(root, `scripts/whisky-photo-sources-${group}.json`)),
  );
}
const selectedIds = process.argv
  .find((argument) => argument.startsWith("--ids="))
  ?.slice(6)
  .split(",");
const refresh = process.argv.includes("--refresh");
if (refresh && !selectedIds?.length)
  throw new Error(
    "Use --ids=id1,id2 with --refresh to select photographs to replace",
  );
const items = whiskies.filter(
  (item) =>
    !existingPhotos[item.id] && (!selectedIds || selectedIds.includes(item.id)),
);
const failures = {};
let completed = 0;
let added = 0;
async function request(url) {
  if (new URL(url).protocol !== "https:")
    throw new Error("Only public HTTPS sources are supported");
  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(25000),
      headers: {
        Accept: "image/avif,image/webp,image/png,image/jpeg,text/html,*/*",
      },
    });
    if ([429, 500, 502, 503, 504].includes(response.status) && attempt < 2) {
      await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt + 1)));
      continue;
    }
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
    return response;
  }
}
async function dailyshotSource(item, topProductId) {
  const sourceUrl = `https://dailyshot.co/m/item/${topProductId}`;
  const cachePath = path.join(cacheDirectory, `${topProductId}.json`);
  let product = await json(cachePath, null);
  if (!product) {
    const html = await (await request(sourceUrl)).text();
    const match = html.match(
      /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/,
    );
    if (!match) throw new Error("No public product data");
    product = JSON.parse(match[1]).props.pageProps.dehydratedState.queries.find(
      (query) => query.queryKey[1] === "getItemDetailsByTopProducts",
    )?.state.data;
    if (!product?.thumbnail_image) throw new Error("No product photograph");
    product = {
      name: product.name,
      en_name: product.en_name,
      information: product.information,
      thumbnail_image: product.thumbnail_image,
    };
    await writeFile(cachePath, JSON.stringify(product), "utf8");
  }
  const strength = product.information?.find(
    (field) => field.label === "도수",
  )?.value;
  const abv = strength?.match(/^\s*(\d+(?:\.\d+)?)\s*%\s*$/)?.[1];
  if (!abv || Math.abs(Number(abv) - item.abv) > 0.01)
    throw new Error(`Product ABV no longer matches: ${strength}`);
  const identity = discoveries[item.id];
  const normalizeName = (value) =>
    value
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  if (
    identity?.englishName &&
    normalizeName(product.en_name) !== normalizeName(identity.englishName)
  ) {
    throw new Error(
      `Product name no longer matches verified mapping: ${product.en_name}`,
    );
  }
  return {
    imageUrl: product.thumbnail_image,
    sourceUrl,
    productName: product.en_name || product.name,
    note: "기존 제품명·연산·도수 대조 결과를 바탕으로 공개 상품의 대표 병 사진을 저장했습니다.",
  };
}
function extension(bytes, contentType) {
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return "jpg";
  if (
    bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  )
    return "png";
  if (
    bytes.toString("ascii", 0, 4) === "RIFF" &&
    bytes.toString("ascii", 8, 12) === "WEBP"
  )
    return "webp";
  if (/^GIF8/.test(bytes.toString("ascii", 0, 4))) return "gif";
  if (
    bytes.toString("ascii", 4, 8) === "ftyp" &&
    /avif|avis/.test(bytes.toString("ascii", 8, 40))
  )
    return "avif";
  throw new Error(`Not a supported raster photograph (${contentType})`);
}
async function processItem(item) {
  if (!/^[a-z0-9-]+$/.test(item.id)) throw new Error("Unsafe catalog ID");
  if (manifest[item.id] && !refresh) {
    try {
      if (
        (await stat(path.join(root, "public", manifest[item.id].path))).size >
        100
      )
        return;
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  let source;
  if (mode !== "dailyshot" && externalSources[item.id])
    source = externalSources[item.id];
  else if (mode !== "extra" && coverage.entries?.[item.id]?.topProductId)
    source = await dailyshotSource(
      item,
      coverage.entries[item.id].topProductId,
    );
  if (!source) return;
  if (!source.imageUrl || !source.sourceUrl || !source.productName)
    throw new Error("Incomplete source metadata");
  const imageUrl = new URL(source.imageUrl);
  if (
    imageUrl.hostname.includes("shopify.com") ||
    imageUrl.pathname.includes("/cdn/shop/")
  )
    imageUrl.searchParams.set("width", "600");
  const response = await request(imageUrl.href);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 500 || bytes.length > 12 * 1024 * 1024)
    throw new Error(`Unexpected image size: ${bytes.length}`);
  const ext = extension(bytes, response.headers.get("content-type"));
  const filename = `whisky-${item.id}.${ext}`;
  await writeFile(path.join(imageDirectory, filename), bytes);
  manifest[item.id] = {
    path: `/images/${filename}`,
    ...source,
    downloadedUrl: imageUrl.href,
    checkedAt: new Date().toISOString(),
  };
  added++;
}
let next = 0;
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (next < items.length) {
      const item = items[next++];
      try {
        await processItem(item);
      } catch (error) {
        failures[item.id] = error.message;
        console.log(`SKIP ${item.id}: ${error.message}`);
      }
      completed++;
      if (completed % 25 === 0)
        console.log(
          `Checked ${completed}/${items.length}; downloaded ${added}`,
        );
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }),
);
const sortedManifest = Object.fromEntries(
  Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
);
await writeFile(
  manifestPath,
  JSON.stringify(sortedManifest, null, 2) + "\n",
  "utf8",
);
const missing = whiskies
  .filter((item) => !existingPhotos[item.id] && !manifest[item.id])
  .map(({ id, name, englishName, source }) => ({
    id,
    name,
    englishName,
    source,
    ...(failures[id] ? { error: failures[id] } : {}),
  }));
await writeFile(
  path.join(root, "scripts/whisky-image-coverage.json"),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      total: whiskies.length,
      existingCount: Object.keys(existingPhotos).length,
      addedCount: Object.keys(manifest).length,
      photographedCount: whiskies.length - missing.length,
      missing,
      failures,
    },
    null,
    2,
  ) + "\n",
  "utf8",
);
console.log(
  JSON.stringify({
    downloaded: added,
    totalWithPhotographs: whiskies.length - missing.length,
    remaining: missing.length,
    failures: Object.keys(failures).length,
  }),
);
