import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile, rename } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  approvedAbvMatches,
  catalogVolumeMatches,
  approvedReleaseMatches,
  declaredReleaseYears,
  offerBatchMatches,
  sellerReleaseMatches,
} from "./dailyshot-matching.mjs";

// Public, unauthenticated requests only. No cookies, tokens, location, or account data.
const root = fileURLToPath(new URL("../", import.meta.url));
const cacheDirectory = path.join(root, ".cache/dailyshot");
const args = new Set(process.argv.slice(2));
const discoverOnly = args.has("--discover-only");
const refresh = args.has("--refresh");
const wrapperSource =
  'import type { DailyshotPrice } from "./types";\nimport priceData from "./dailyshot-prices.json" with { type: "json" };\n\nexport const dailyshotPrices = priceData as Record<string, DailyshotPrice>;\n';
// The app's catalog imports these generated files. Permit a first run without a snapshot.
for (const [filename, initialContent] of [
  ["src/data/dailyshot-prices.json", "{}\n"],
  ["src/data/dailyshot-products.json", "{}\n"],
  ["src/data/dailyshot-prices.ts", wrapperSource],
]) {
  try {
    await readFile(path.join(root, filename), "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    await writeFile(path.join(root, filename), initialContent, "utf8");
  }
}
const { whiskies } = await import(
  new URL("../src/data/whiskies.ts", import.meta.url)
);
const onlyIds = process.argv
  .find((arg) => arg.startsWith("--ids="))
  ?.slice(6)
  .split(",");
if (onlyIds?.some((id) => !whiskies.some((item) => item.id === id)))
  throw new Error("--ids contains an unknown catalog ID");
const selectedIds =
  onlyIds ||
  (args.has("--cs")
    ? whiskies.filter((item) => item.caskStrength).map((item) => item.id)
    : null);
const catalog = selectedIds
  ? whiskies.filter((item) => selectedIds.includes(item.id))
  : whiskies;
const mappingsPath = path.join(root, "scripts/dailyshot-mappings.json");
let approvedMappings = {};
try {
  approvedMappings = JSON.parse(await readFile(mappingsPath, "utf8"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
await mkdir(cacheDirectory, { recursive: true });

function productSummary(item) {
  return Object.fromEntries(
    [
      "id",
      "top_product_id",
      "name",
      "top_product_name",
      "name_tag",
      "en_name",
      "price",
      "status",
      "seller_id",
      "service_type",
      "category",
    ].map((key) => [key, item[key]]),
  );
}

async function publicData(url, parse) {
  const cacheFile = path.join(
    cacheDirectory,
    `${createHash("sha256").update(url).digest("hex")}.json`,
  );
  if (!refresh) {
    try {
      const cached = JSON.parse(await readFile(cacheFile, "utf8"));
      // A run can resume, but old observations are never passed off as today's prices.
      if (Date.now() - Date.parse(cached.checkedAt) < 12 * 60 * 60 * 1000)
        return cached;
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(25000),
      headers: { Accept: "application/json,text/html" },
    });
    if ([401, 403].includes(response.status))
      throw new Error(`Public access unavailable: ${response.status} ${url}`);
    if (response.status === 429 || response.status >= 500) {
      if (attempt === 2) throw new Error(`HTTP ${response.status}: ${url}`);
      await new Promise((resolve) => setTimeout(resolve, 1500 * (attempt + 1)));
      continue;
    }
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
    const result = {
      url,
      checkedAt: new Date().toISOString(),
      data: await parse(response),
    };
    await writeFile(cacheFile, JSON.stringify(result), "utf8");
    await new Promise((resolve) => setTimeout(resolve, 100));
    return result;
  }
}

async function search(query) {
  const url = new URL("https://api.dailyshot.co/items/search/");
  url.searchParams.set("q", query);
  url.searchParams.set("page", "1");
  url.searchParams.set("page_size", "100");
  return publicData(url.href, async (response) => {
    const data = await response.json();
    return {
      count: data.count,
      next: data.next,
      results: data.results.map(productSummary),
    };
  });
}

async function details(topProductId) {
  return publicData(
    `https://dailyshot.co/m/item/${topProductId}`,
    async (response) => {
      const html = await response.text();
      const match = html.match(
        /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/,
      );
      if (!match)
        throw new Error(`Missing public product data: ${topProductId}`);
      const data = JSON.parse(
        match[1],
      ).props.pageProps.dehydratedState.queries.find(
        (query) => query.queryKey[1] === "getItemDetailsByTopProducts",
      )?.state.data;
      if (!data) throw new Error(`Missing product details: ${topProductId}`);
      return {
        ...productSummary(data),
        information: data.information,
        declaredReleaseYears: declaredReleaseYears(data.comments),
        seller: data.seller
          ? { id: data.seller.id, name: data.seller.name }
          : null,
      };
    },
  );
}

// Keep expression words; remove only unit/age syntax, punctuation and generic spirit descriptors.
function normalizedEnglish(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\d+(?:\.\d+)?\s*%/g, "")
    .replace(/\b\d+(?:\.\d+)?\s*(?:ml|cl|litres?|liters?|l)\b/g, "")
    .replace(/\b(?:years?\s*old|years?|yo|aged)\b/g, "")
    .replace(/(\d+)yo\b/g, "$1")
    .replace(
      /\b(?:the|whisky|whiskey|scotch|single\s*malt|kentucky\s*straight|straight)\b/g,
      "",
    )
    .replace(/[^a-z0-9]/g, "");
}
function normalizedKorean(value) {
  return value
    .toLowerCase()
    .replace(/\[[^\]]*\]/g, "")
    .replace(/\d+(?:\.\d+)?\s*%/g, "")
    .replace(/\((?:구형|신형|리뉴얼|케이스[^)]*)\)/g, "")
    .replace(/\d+(?:\.\d+)?\s*(?:ml|cl|리터|l)\b/gi, "")
    .replace(/싱글\s*몰트\s*위스키|위스키/g, "")
    .replace(/[^a-z0-9가-힣]/g, "");
}
const bundlePattern =
  /세트|전용잔|온더락잔|디캔터|잔포함|잔\s*포함|글라스|샘플|바이알|미니어처|미니어쳐|\d+\s*병|\d+\s*종|\d+\s*개입|\+|&|\b(?:set|bundle|miniature|glass|pack)\b/i;
function isBundle(name) {
  // Producer names such as Jack Daniel's and J.P. Wiser's are unaffected.
  return bundlePattern.test(name);
}
function informationValue(detail, label) {
  return (
    detail.information?.find((field) => field.label === label)?.value ?? ""
  );
}
function parseAbv(detail) {
  const match = informationValue(detail, "도수").match(
    /^\s*(\d+(?:\.\d+)?)\s*%\s*$/,
  );
  return match ? Number(match[1]) : null;
}
function parseVolume(detail) {
  const text = informationValue(detail, "용량");
  const match = text.trim().match(/^(\d+(?:\.\d+)?)\s*(ml|cl|l)$/i);
  return match
    ? Number(match[1]) * { ml: 1, cl: 10, l: 1000 }[match[2].toLowerCase()]
    : null;
}
function exactMatch(item, detail, candidateName) {
  const abv = parseAbv(detail);
  if (abv === null || !Number.isFinite(abv) || Math.abs(abv - item.abv) > 0.01)
    return false;
  if (isBundle(candidateName)) return false;
  const volume = parseVolume(detail);
  if (!volume || volume < 500 || volume > 1000) return false;
  if (!catalogVolumeMatches(item, volume)) return false;
  return (
    normalizedEnglish(detail.en_name || "") ===
      normalizedEnglish(item.englishName) ||
    normalizedKorean(candidateName) === normalizedKorean(item.name)
  );
}

async function findMapping(item) {
  const approved = approvedMappings[item.id];
  if (approved) {
    const detail = await details(approved.topProductId);
    if (
      parseVolume(detail.data) !== approved.volumeMl ||
      !catalogVolumeMatches(item, approved.volumeMl) ||
      !approvedReleaseMatches(approved, detail.data.declaredReleaseYears) ||
      !approvedAbvMatches(
        item,
        approved,
        informationValue(detail.data, "도수"),
      ) ||
      normalizedEnglish(detail.data.en_name || "") !==
        normalizedEnglish(approved.englishName || "")
    ) {
      throw new Error(
        `Approved product's expression/volume/ABV/release changed: ${item.id}`,
      );
    }
    return { mapping: approved, detail };
  }
  const candidates = new Map();
  const englishQuery = item.englishName
    .replace(
      /\b(?:the|years?\s*old|whisky|whiskey|scotch|single\s*malt|kentucky\s*straight)\b/gi,
      "",
    )
    .replace(/\s+/g, " ")
    .trim();
  for (const query of [item.name, englishQuery]) {
    const response = await search(query);
    for (const candidate of response.data.results) {
      const name = candidate.top_product_name || candidate.name;
      if (candidate.category && candidate.category !== "위스키") continue;
      if (isBundle(name)) continue;
      if (!candidates.has(candidate.top_product_id))
        candidates.set(candidate.top_product_id, {
          ...candidate,
          canonicalName: name,
        });
    }
    if (
      [...candidates.values()].some(
        (candidate) =>
          normalizedKorean(candidate.canonicalName) ===
          normalizedKorean(item.name),
      )
    )
      break;
  }
  const matches = [];
  const inspected = [];
  const ranked = [...candidates.values()].sort((a, b) => {
    const score = (candidate) => {
      const target = normalizedKorean(item.name);
      const name = normalizedKorean(candidate.canonicalName);
      let prefix = 0;
      while (
        prefix < target.length &&
        prefix < name.length &&
        target[prefix] === name[prefix]
      )
        prefix++;
      return (
        (target === name ? 100 : 0) +
        prefix * 3 +
        (/700\s*ml/i.test(candidate.canonicalName) ? 2 : 0) -
        (/구형/.test(candidate.canonicalName) ? 1 : 0)
      );
    };
    return score(b) - score(a);
  });
  // Product-specific queries normally return a handful; do not traverse broad/unrelated searches.
  for (const candidate of ranked.slice(0, 6)) {
    let detail;
    try {
      detail = await details(candidate.top_product_id);
    } catch (error) {
      inspected.push({
        topProductId: candidate.top_product_id,
        name: candidate.canonicalName,
        error: error.message,
      });
      continue;
    }
    inspected.push({
      topProductId: candidate.top_product_id,
      name: candidate.canonicalName,
      englishName: detail.data.en_name,
      volume: informationValue(detail.data, "용량"),
      abv: informationValue(detail.data, "도수"),
    });
    if (exactMatch(item, detail.data, candidate.canonicalName)) {
      matches.push({
        mapping: {
          topProductId: candidate.top_product_id,
          volumeMl: parseVolume(detail.data),
          productName: candidate.canonicalName,
          englishName: detail.data.en_name,
          abv: parseAbv(detail.data),
          method: "exact-name-and-abv",
        },
        detail,
      });
    }
  }
  matches.sort((a, b) => {
    const rank = (match) =>
      (match.mapping.volumeMl === 700
        ? 100
        : match.mapping.volumeMl === 750
          ? 90
          : match.mapping.volumeMl === 1000
            ? 60
            : 50) - (/구형/.test(match.mapping.productName) ? 5 : 0);
    return rank(b) - rank(a);
  });
  return matches[0] || { mapping: null, inspected };
}

async function getOffers(catalogItem, mapping, detail) {
  const seen = new Map();
  const pages = [];
  let page = 1;
  let expectedCount = null;
  let rawCount = 0;
  do {
    const url = new URL("https://api.dailyshot.co/item-sellers/");
    for (const [key, value] of Object.entries({
      item_id: detail.id,
      page,
      page_size: 100,
      service_type: 1,
      ordering: "price",
      include_sold_out: 0,
      group_same_price: 0,
    }))
      url.searchParams.set(key, String(value));
    const response = await publicData(url.href, async (res) => {
      const data = await res.json();
      return {
        count: data.count,
        next: data.next,
        results: data.results.map(({ item, seller }) => ({
          item: productSummary(item),
          seller: {
            id: seller.id,
            name: seller.name,
            is_active: seller.is_active,
          },
        })),
      };
    });
    if (expectedCount === null) expectedCount = response.data.count;
    if (response.data.count !== expectedCount)
      throw new Error(
        "Seller list changed during pagination; retry this product",
      );
    pages.push({
      url: response.url,
      checkedAt: response.checkedAt,
      count: response.data.results.length,
    });
    rawCount += response.data.results.length;
    for (const { item, seller } of response.data.results) {
      const offerLabel = `${item.name} ${item.name_tag || ""}`;
      if (
        item.top_product_id !== mapping.topProductId ||
        item.service_type !== 1 ||
        item.status !== 0 ||
        !seller.is_active ||
        !(item.price > 0) ||
        isBundle(offerLabel) ||
        !offerBatchMatches(catalogItem, item)
        || !sellerReleaseMatches(catalogItem, mapping, item)
      )
        continue;
      const namedVolumes = [
        ...offerLabel.matchAll(/(\d+(?:\.\d+)?)\s*(ml|cl|l)\b/gi),
      ].map(
        (match) =>
          Number(match[1]) * { ml: 1, cl: 10, l: 1000 }[match[2].toLowerCase()],
      );
      if (namedVolumes.some((volume) => volume !== mapping.volumeMl)) continue;
      seen.set(`${seller.id}:${item.id}`, {
        price: item.price,
        url: `https://dailyshot.co/m/item/${mapping.topProductId}?item=${item.id}&seller=${seller.id}`,
        seller: seller.name,
      });
    }
    const next = response.data.next;
    if (next !== null && (!Number.isInteger(next) || next <= page))
      throw new Error("Unexpected seller pagination");
    page = next;
  } while (page !== null);
  if (rawCount !== expectedCount)
    throw new Error(
      `Incomplete seller pagination: ${rawCount}/${expectedCount}`,
    );
  const offers = [...seen.values()];
  if (!offers.length) return { price: null, pages, rawCount };
  const values = offers.map((offer) => offer.price);
  return {
    price: {
      average: Math.round(
        values.reduce((sum, value) => sum + value, 0) / values.length,
      ),
      currency: "KRW",
      volumeMl: mapping.volumeMl,
      sampleCount: offers.length,
      min: Math.min(...values),
      max: Math.max(...values),
      checkedAt: pages.map((entry) => entry.checkedAt).sort()[0],
      sourceUrl: `https://dailyshot.co/m/items/${detail.id}/sellers`,
      offers,
      ...(mapping.priceNote || mapping.variableBatch?.note
        ? { note: mapping.priceNote || mapping.variableBatch.note }
        : {}),
    },
    pages,
    rawCount,
  };
}

async function readJsonOrEmpty(filename) {
  try {
    return JSON.parse(await readFile(filename, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw error;
  }
}
const discoveries = selectedIds
  ? await readJsonOrEmpty(path.join(root, "scripts/dailyshot-discovery.json"))
  : {};
const prices = selectedIds
  ? await readJsonOrEmpty(path.join(root, "src/data/dailyshot-prices.json"))
  : {};
const products = selectedIds
  ? await readJsonOrEmpty(path.join(root, "src/data/dailyshot-products.json"))
  : {};
const priorCoverage = selectedIds
  ? await readJsonOrEmpty(path.join(root, "scripts/dailyshot-coverage.json"))
  : {};
const coverage = priorCoverage.entries || {};
const entries = [...catalog];
let finished = 0;
const sortKeys = (object) =>
  Object.fromEntries(
    Object.entries(object).sort(([a], [b]) => a.localeCompare(b)),
  );
let checkpointQueue = Promise.resolve();
async function writeAtomically(filename, value) {
  await writeFile(filename + ".tmp", value, "utf8");
  await rename(filename + ".tmp", filename);
}
function checkpoint() {
  const currentDiscoveries =
    JSON.stringify(sortKeys(discoveries), null, 2) + "\n";
  const currentPrices = JSON.stringify(sortKeys(prices), null, 2) + "\n";
  const currentProducts = JSON.stringify(sortKeys(products), null, 2) + "\n";
  const currentCoverage =
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        catalogCount: whiskies.length,
        processedCount: Object.keys(coverage).length,
        matchedCount: Object.keys(discoveries).length,
        pricedCount: Object.keys(prices).length,
        scope:
          "Dailyshot in-stock domestic store listings (service_type=1), before coupons, same product and volume",
        entries: sortKeys(coverage),
      },
      null,
      2,
    ) + "\n";
  checkpointQueue = checkpointQueue.then(async () => {
    await writeAtomically(
      path.join(root, "scripts/dailyshot-discovery.json"),
      currentDiscoveries,
    );
    await writeAtomically(
      path.join(root, "scripts/dailyshot-coverage.json"),
      currentCoverage,
    );
    if (!discoverOnly) {
      await writeAtomically(
        path.join(root, "src/data/dailyshot-prices.json"),
        currentPrices,
      );
      await writeAtomically(
        path.join(root, "src/data/dailyshot-products.json"),
        currentProducts,
      );
      await writeAtomically(
        path.join(root, "src/data/dailyshot-prices.ts"),
        wrapperSource,
      );
    }
  });
  return checkpointQueue;
}
async function worker() {
  while (entries.length) {
    const item = entries.shift();
    // A failed refresh must not silently retain an old price under today's coverage report.
    if (!discoverOnly) delete prices[item.id];
    delete discoveries[item.id];
    if (!discoverOnly)
      products[item.id] = {
        url: `https://dailyshot.co/m/search/result?q=${encodeURIComponent(item.name)}`,
        productName: item.name,
        checkedAt: new Date().toISOString(),
        scope: "search",
        note: "동일 제품·배치의 판매 정보를 확인하지 못했습니다. 데일리샷 검색 결과에서 현재 입고 여부를 확인하세요.",
      };
    try {
      const match = await findMapping(item);
      if (!match.mapping)
        coverage[item.id] = {
          status: "no-exact-match",
          name: item.name,
          inspected: match.inspected,
        };
      else {
        if (!discoverOnly)
          products[item.id] = {
            url: `https://dailyshot.co/m/item/${match.mapping.topProductId}`,
            productName: match.mapping.productName,
            checkedAt: match.detail.checkedAt,
            scope: match.mapping.referenceOnly
              ? "other-batches"
              : match.mapping.variableBatch
                ? "variable-batches"
                : "exact-product",
            note:
              match.mapping.referenceOnly?.note ||
              match.mapping.variableBatch?.note ||
              match.mapping.priceNote ||
              "동일 제품·도수·용량을 확인한 데일리샷 상품입니다.",
          };
        discoveries[item.id] = match.mapping;
        if (discoverOnly)
          coverage[item.id] = { status: "matched", name: item.name };
        else if (match.mapping.referenceOnly)
          coverage[item.id] = {
            status: "reference-only",
            name: item.name,
            topProductId: match.mapping.topProductId,
            reason: match.mapping.referenceOnly.note,
          };
        else {
          const result = await getOffers(
            item,
            match.mapping,
            match.detail.data,
          );
          if (result.price) prices[item.id] = result.price;
          coverage[item.id] = {
            status: result.price ? "priced" : "no-available-store-offers",
            name: item.name,
            topProductId: match.mapping.topProductId,
            volumeMl: match.mapping.volumeMl,
            rawOfferCount: result.rawCount,
            acceptedOfferCount: result.price?.sampleCount || 0,
            pages: result.pages,
          };
          if (!result.price && products[item.id])
            products[item.id].note +=
              " 조회 시 구매 가능한 국내 스토어 판매가가 없어 금액을 표시하지 않습니다.";
        }
      }
    } catch (error) {
      coverage[item.id] = {
        status: "fetch-error",
        name: item.name,
        reason: error.message,
      };
    }
    finished++;
    console.log(
      `${finished}/${catalog.length} ${item.id}: ${coverage[item.id].status}`,
    );
    // Checkpoint on every product so a cancelled run can be safely resumed from cache.
    await writeFile(
      path.join(cacheDirectory, "discovery-progress.json"),
      JSON.stringify({ discoveries, coverage }, null, 2),
    );
    await checkpoint();
  }
}
await Promise.all([worker(), worker()]);
await checkpoint();
console.log(
  JSON.stringify({
    catalog: catalog.length,
    matched: Object.keys(discoveries).length,
    priced: Object.keys(prices).length,
    statuses: Object.values(coverage).reduce(
      (counts, entry) => ({
        ...counts,
        [entry.status]: (counts[entry.status] || 0) + 1,
      }),
      {},
    ),
  }),
);
