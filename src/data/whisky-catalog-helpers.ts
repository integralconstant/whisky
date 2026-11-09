import type { Whisky } from "./types";
import { caskStrengthSources } from "./bottlings.ts";

type WhiskyGroup = Pick<
  Whisky,
  "brand" | "category" | "country" | "region" | "source"
>;
type WhiskyRow = [
  id: string,
  name: string,
  englishName: string,
  abv: number,
  age: number | null,
  tags: string[],
  description: string,
  nose: string,
  palate: string,
  finish: string,
  source?: string,
];

// Group shared producer information while retaining individual expression notes.
export function createWhiskyGroup(
  group: WhiskyGroup,
  rows: WhiskyRow[],
): Whisky[] {
  return rows.map(
    ([
      id,
      name,
      englishName,
      abv,
      age,
      tags,
      description,
      nose,
      palate,
      finish,
      source,
    ]) => ({
      ...group,
      id,
      ...(caskStrengthSources[id] ? { caskStrength: true } : {}),
      name,
      englishName,
      abv,
      age,
      tags,
      description,
      notes: { nose, palate, finish },
      source: source ?? group.source,
      image: "",
      color: tags.includes("피트")
        ? "#e8ede5"
        : tags.includes("셰리")
          ? "#f1e7e6"
          : tags.includes("시트러스")
            ? "#f3efdf"
            : tags.includes("꿀")
              ? "#f3ece2"
              : "#edece4",
    }),
  );
}
