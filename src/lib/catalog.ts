import type { Whisky, Cocktail } from "../data/types.ts";
import { collapseScotchBatches, getScotchBatchGroup } from "./batches.ts";

export type CatalogItem = Whisky | Cocktail;
export type SortOrder =
  "featured" | "name" | "abv" | "time" | "price-asc" | "price-desc";
export const PAGE_SIZES = [10, 25, 50] as const;
export type PageSize = (typeof PAGE_SIZES)[number];
export interface Filters {
  query: string;
  category: string;
  countries: string[];
  tags: string[];
  savedOnly: boolean;
  saved: string[];
  sort: SortOrder;
}

export function isWhisky(item: CatalogItem): item is Whisky {
  return "abv" in item;
}

export const CASK_STRENGTH_TAG = "캐스크 스트렝스";
const CASK_STRENGTH_ALIASES =
  /(^|[\s()[\],/#])(?:cs|cask[\s-]*strength|캐스크\s*스트[렝랭]스|barrel[\s-]*(?:proof|strength)|배럴\s*(?:프루프|스트렝스))(?=$|[\s()[\],/])/gi;
const NUMBERED_BATCH =
  /(?:\bbatch(?:[\s-]+strength)?|\brelease|배치|릴리스|릴리즈)\s*(?:(?:no\.?|넘버|번호)\s*)?[:#-]?\s*(\d{1,3})(?![\d.a-z-])/gi;

function numberedBatches(value: string): number[] {
  return [...value.matchAll(NUMBERED_BATCH)].map((match) => Number(match[1]));
}

export function formatWhiskyAbv(item: Whisky): string {
  return item.abvRange
    ? `${item.abvRange[0]}–${item.abvRange[1]}%`
    : `${item.abv}%`;
}

export function getCatalogTags(item: CatalogItem): string[] {
  return isWhisky(item) && item.caskStrength
    ? [CASK_STRENGTH_TAG, ...item.tags]
    : item.tags;
}

export function getWhiskyPrice(item: CatalogItem): number | null {
  const price = isWhisky(item) ? item.dailyshotPrice?.average : undefined;
  return typeof price === "number" && Number.isFinite(price) && price > 0
    ? price
    : null;
}

function clampPage(page: number, totalPages: number): number {
  if (!Number.isFinite(page)) return page === Infinity ? totalPages : 1;
  return Math.min(totalPages, Math.max(1, Math.floor(page)));
}

export function paginateCatalog<T>(
  items: T[],
  page: number,
  pageSize: PageSize,
): {
  items: T[];
  page: number;
  pageSize: PageSize;
  totalPages: number;
  totalItems: number;
  start: number;
  end: number;
} {
  const size = PAGE_SIZES.includes(pageSize) ? pageSize : PAGE_SIZES[0];
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / size));
  const currentPage = clampPage(page, totalPages);
  const offset = (currentPage - 1) * size;
  return {
    items: items.slice(offset, offset + size),
    page: currentPage,
    pageSize: size,
    totalPages,
    totalItems,
    start: totalItems ? offset + 1 : 0,
    end: Math.min(offset + size, totalItems),
  };
}

export function getPaginationPages(
  page: number,
  totalPages: number,
): (number | "ellipsis")[] {
  const count = Number.isFinite(totalPages)
    ? Math.max(1, Math.floor(totalPages))
    : 1;
  const currentPage = clampPage(page, count);
  const candidates = [1, currentPage - 1, currentPage, currentPage + 1, count];
  const pages = [...new Set(candidates)]
    .filter((value) => value >= 1 && value <= count)
    .sort((a, b) => a - b);
  const result: (number | "ellipsis")[] = [];
  let previous = 0;
  for (const value of pages) {
    const gap = value - previous;
    if (previous && gap === 2) result.push(previous + 1);
    else if (previous && gap > 2) result.push("ellipsis");
    result.push(value);
    previous = value;
  }
  return result;
}

export function normalize(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/[\s\-_'’.,]/g, "");
}

export function filterCatalog<T extends CatalogItem>(
  items: T[],
  filters: Filters,
  options: { groupBatches?: boolean } = {},
): T[] {
  let requiresCaskStrength = false;
  // Compare explicit batch numbers as numbers, so batch 1 cannot match 10–19.
  // Ordinary partial product/age searches retain their existing behavior.
  const requestedBatches = numberedBatches(filters.query);
  const nameQuery = filters.query.replace(NUMBERED_BATCH, " ");
  const textQuery = nameQuery.replace(CASK_STRENGTH_ALIASES, () => {
    requiresCaskStrength = true;
    return " ";
  });
  const query = normalize(
    (requiresCaskStrength
      ? textQuery.replace(/[()[\],/#]/g, " ")
      : textQuery
    ).trim(),
  );
  const matches = items.filter((item) => {
    const fields = [
      item.name,
      item.englishName,
      item.category,
      item.description,
      ...item.tags,
    ];
    if (isWhisky(item)) fields.push(item.brand, item.country, item.region);
    else
      fields.push(
        item.base,
        ...item.ingredients.map((ingredient) => ingredient.name),
      );
    const group = getScotchBatchGroup(item);
    if (group) fields.push(group.name, group.englishName);
    // Treat aliases alike in the query and product names, including aliases
    // in the middle of a name such as "Elijah Craig Barrel Proof C925".
    const searchableText = fields.join(" ");
    const searchable = requiresCaskStrength
      ? searchableText
          .replace(CASK_STRENGTH_ALIASES, " ")
          .replace(/[()[\],/#]/g, " ")
      : searchableText;
    return (
      (!requestedBatches.length ||
        (isWhisky(item) &&
          requestedBatches.every((number) =>
            numberedBatches(`${item.name} ${item.englishName}`).includes(
              number,
            ),
          ))) &&
      (!requiresCaskStrength ||
        (isWhisky(item) && item.caskStrength === true)) &&
      (!query || normalize(searchable).includes(query)) &&
      (!filters.category ||
        (isWhisky(item) ? item.category : item.base) === filters.category) &&
      (!filters.countries.length ||
        (isWhisky(item) && filters.countries.includes(item.country))) &&
      filters.tags.every((tag) => getCatalogTags(item).includes(tag)) &&
      (!filters.savedOnly || filters.saved.includes(item.id))
    );
  });
  return (options.groupBatches ? collapseScotchBatches(matches) : matches).sort(
    (a, b) => {
      if (filters.sort === "price-asc" || filters.sort === "price-desc") {
        const priceA = getWhiskyPrice(a);
        const priceB = getWhiskyPrice(b);
        if (priceA === null) return priceB === null ? 0 : 1;
        if (priceB === null) return -1;
        return filters.sort === "price-asc" ? priceA - priceB : priceB - priceA;
      }
      if (filters.sort === "name") return a.name.localeCompare(b.name, "ko");
      if (filters.sort === "abv" && isWhisky(a) && isWhisky(b))
        return b.abv - a.abv;
      if (filters.sort === "time" && !isWhisky(a) && !isWhisky(b))
        return a.time - b.time;
      return Number(!!b.featured) - Number(!!a.featured);
    },
  );
}

export function readSaved(value: string | null): string[] {
  try {
    const parsed: unknown = JSON.parse(value ?? "[]");
    return Array.isArray(parsed)
      ? [
          ...new Set(
            parsed.filter((id): id is string => typeof id === "string"),
          ),
        ]
      : [];
  } catch {
    return [];
  }
}

export function scaleAmount(amount: string, servings: number): string {
  const normalized = amount.replace(/반 조각/g, "0.5조각");
  return normalized.replace(/\d+(?:\.\d+)?/g, (quantity) =>
    String(Math.round(Number(quantity) * servings * 100) / 100),
  );
}
