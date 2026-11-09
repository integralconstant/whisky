import { scotchBatchGroups } from "../data/scotch-batch-groups.ts";
import type { Cocktail, Whisky } from "../data/types.ts";

const groupsByBatch = new Map(
  scotchBatchGroups.flatMap((group) =>
    group.batches.map((batch) => [batch.id, group] as const),
  ),
);

export function getScotchBatchGroup(item: Whisky | Cocktail) {
  return "country" in item && item.country === "스코틀랜드"
    ? groupsByBatch.get(item.id)
    : undefined;
}

export function getScotchBatches(item: Whisky | Cocktail, catalog: Whisky[]) {
  const group = getScotchBatchGroup(item);
  return (
    group?.batches.flatMap((batch) => {
      const whisky = catalog.find(
        (candidate) =>
          candidate.id === batch.id && candidate.country === "스코틀랜드",
      );
      return whisky ? [{ item: whisky, label: batch.label }] : [];
    }) ?? []
  );
}

// Filter individual batches first. A search for an older batch or a saved batch
// must open that matching batch, even when the default representative is newer.
export function collapseScotchBatches<T extends Whisky | Cocktail>(
  items: T[],
): T[] {
  const representatives = new Map<string, T>();
  for (const item of items) {
    const group = getScotchBatchGroup(item);
    const key = group?.id ?? item.id;
    if (!representatives.has(key) || item.id === group?.representativeId)
      representatives.set(key, item);
  }
  return [...representatives.values()];
}
