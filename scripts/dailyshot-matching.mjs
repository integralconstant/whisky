// Variable strengths are accepted only for individually reviewed, batch-unspecified CS expressions.
// A fixed release must never inherit another release's or a shared listing's price.
export function approvedAbvMatches(item, mapping, actualLabel) {
  if (mapping.sellerRelease) {
    const release = mapping.sellerRelease;
    return item.caskStrength === true && item.id.endsWith(`-${release.year}`) &&
      Number.isInteger(release.year) && Math.abs(item.abv - release.abv) < 0.01 &&
      actualLabel === release.parentAbvLabel && Boolean(release.note);
  }
  if (mapping.referenceOnly)
    return (
      Boolean(mapping.referenceOnly.note) && actualLabel === mapping.abvLabel
    );
  if (mapping.variableBatch) {
    if (
      !item.caskStrength ||
      /(?:(?:batch(?:-strength)?|release)-\d+|-\d{4}|-[abc]\d{3})$/i.test(
        item.id,
      )
    )
      return false;
    return (
      actualLabel === mapping.variableBatch.abvLabel &&
      Boolean(mapping.variableBatch.note)
    );
  }
  const match = actualLabel.match(/^\s*(\d+(?:\.\d+)?)\s*%\s*$/);
  return Boolean(match) && Math.abs(Number(match[1]) - item.abv) < 0.01;
}

// A shared annual product can only contribute sellers that explicitly identify
// both the release year and strength. Unlabelled sellers never inherit the year.
export function sellerReleaseMatches(item, mapping, offer) {
  if (!mapping.sellerRelease) return true;
  const release = mapping.sellerRelease;
  const label = `${offer.name || ""} ${offer.name_tag || ""}`;
  if (/랜덤|random|무작위|임의/i.test(label)) return false;
  const years = [...label.matchAll(/(?<!\d)(20\d{2})(?!\d)/g)].map((match) => Number(match[1]));
  const strengths = [...label.matchAll(/(?<![\d.])(\d{2}(?:\.\d+)?)\s*(?:도|%)/g)].map((match) => Number(match[1]));
  return item.id.endsWith(`-${release.year}`) && years.length > 0 &&
    years.every((year) => year === release.year) && strengths.length > 0 &&
    strengths.every((abv) => Math.abs(abv - item.abv) < 0.01) &&
    offerBatchMatches(item, offer);
}

// Some annual editions omit their year from the product title. Retain only
// explicit release statements from the product description, never review text.
export function declaredReleaseYears(comments = []) {
  const years = new Set();
  for (const comment of comments) {
    const description = String(comment.description || "").replace(
      /<[^>]*>/g,
      " ",
    );
    for (const match of description.matchAll(
      /\b(20\d{2})\s*(?:년\s*)?(?:릴리즈|릴리스|에디션|release\b|edition\b)/gi,
    ))
      years.add(Number(match[1]));
  }
  return [...years];
}

export function approvedReleaseMatches(mapping, years) {
  if (mapping.releaseYear === undefined) return true;
  return (
    Number.isInteger(mapping.releaseYear) &&
    Array.isArray(years) &&
    years.length === 1 &&
    years[0] === mapping.releaseYear
  );
}

function fixedRelease(id) {
  const octomore = id.match(/^octomore-(\d+)-(\d+)$/i);
  if (octomore)
    return {
      kind: "series",
      value: `${Number(octomore[1])}.${Number(octomore[2])}`,
    };
  const batch = id.match(/-(?:batch(?:-strength)?|release)-(\d{1,3})$/i);
  if (batch) return { kind: "number", value: Number(batch[1]) };
  const code = id.match(/-([abc]\d{3}|\d{2}[abc])$/i);
  if (code) return { kind: "code", value: code[1].toUpperCase() };
  const year = id.match(/-(20\d{2})$/);
  if (year) return { kind: "year", value: Number(year[1]) };
  return null;
}

const releaseWord = "(?:batch|release|edition|배치|릴리스|릴리즈|에디션)";
const randomRelease = new RegExp(
  `${releaseWord}\\s*(?:번호\\s*)?[:(\\-]?\\s*(?:랜덤|random|무작위|임의)|(?:랜덤|random|무작위|임의)\\s*(?:발송\\s*)?${releaseWord}`,
  "i",
);
const normalized = (text) => text.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

function releaseYears(label, catalogItem) {
  const years = [];
  const context =
    "(?:batch|release|edition|vintage|배치|릴리스|릴리즈|에디션|빈티지|병입)";
  for (const pattern of [
    new RegExp(`${context}\\s*[:#(\\-]?\\s*(20\\d{2})(?!\\d)`, "gi"),
    new RegExp(`(20\\d{2})(?:년)?\\s*${context}`, "gi"),
  ]) {
    for (const match of label.matchAll(pattern)) years.push(Number(match[1]));
  }
  // Seller labels such as "[2019/54도]" identify a release and its ABV.
  for (const match of label.matchAll(
    /(?<!\d)(20\d{2})(?:년)?\s*[/,·]\s*\d{2}(?:\.\d+)?\s*(?:도|%)/g,
  ))
    years.push(Number(match[1]));
  const stems = [catalogItem.name, catalogItem.englishName]
    .filter(Boolean)
    .map((name) => normalized(name.split(/20\d{2}/)[0]));
  for (const match of label.matchAll(/(?<!\d)(20\d{2})(?!\d)(?:년)?/g)) {
    const before = label.slice(0, match.index).trim();
    const after = label.slice(match.index + match[0].length).trim();
    // A promotion year is not the whisky's release year.
    if (
      /^(?:설날?|추석|크리스마스|연말|명절|선물|행사|프로모션|할인|특가|세일|holiday|christmas|gift|sale|promotion|event)/i.test(
        after,
      )
    )
      continue;
    if (
      (!before && !after) ||
      /(?:\bcs|캐스크\s*스트렝스|cask\s*strength|배럴\s*프루프|barrel\s*proof)\s*[(\[]?$/i.test(
        before,
      ) ||
      stems.some((stem) => stem && normalized(before).endsWith(stem))
    )
      years.push(Number(match[1]));
  }
  return years;
}

// This rejects explicit conflicts inside a shared top-product listing. A seller
// with no release label still relies on the separately verified parent mapping.
export function offerBatchMatches(catalogItem, offer) {
  const expected = fixedRelease(catalogItem.id);
  if (!expected) return true;
  const labels = [offer.name, offer.name_tag].filter(
    (label) => typeof label === "string" && label.length > 0,
  );
  for (const label of labels) {
    if (randomRelease.test(label)) return false;
    let values = [];
    if (expected.kind === "number") {
      for (const match of label.matchAll(
        /(?:\b(?:batch(?:\s+strength)?|release)|(?:배치|릴리스|릴리즈)(?:\s*(?:넘버|번호))?)\s*(?:(?:no\.?|cs)\s*)?[:#-]?\s*(\d{1,3}(?:\s*[/,&·]\s*\d{1,3})*)(?![\d.])/gi,
      ))
        values.push(...match[1].split(/[/,&·]/).map(Number));
      for (const match of label.matchAll(/\b(\d{1,3})\s*(?:번\s*)?배치/gi))
        values.push(Number(match[1]));
    } else if (expected.kind === "code") {
      values = [...label.matchAll(/\b([abc]\d{3}|\d{2}[abc])\b/gi)].map(
        (match) => match[1].toUpperCase(),
      );
    } else if (expected.kind === "series") {
      values = [...label.matchAll(/(?<![\d.])(\d{1,2}\.\d)(?![\d.%])/g)].map(
        (match) => match[1],
      );
    } else values = releaseYears(label, catalogItem);
    if (values.some((value) => value !== expected.value)) return false;
  }
  return true;
}
