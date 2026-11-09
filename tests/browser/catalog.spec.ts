import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { whiskies } from "../../src/data/whiskies";
import { filterCatalog, getWhiskyPrice } from "../../src/lib/catalog";
import type { Filters } from "../../src/lib/catalog";
import { collapseScotchBatches } from "../../src/lib/batches";

const listWhiskies = collapseScotchBatches(whiskies);

const defaultFilters: Filters = {
  query: "",
  category: "",
  countries: [],
  tags: [],
  savedOnly: false,
  saved: [],
  sort: "featured",
};

async function visibleWhiskyIds(page: Page): Promise<string[]> {
  const entries = await page.locator(".product-card").evaluateAll((cards) =>
    cards.map((card) => ({
      id: card.getAttribute("data-product-id"),
    })),
  );
  return entries.map((entry) => {
    const whisky = whiskies.find((item) => item.id === entry.id);
    expect(
      whisky,
      `Rendered whisky must exist in source: ${entry.id}`,
    ).toBeDefined();
    return whisky!.id;
  });
}

async function expectCurrentPage(page: Page, number: number) {
  await expect(
    page
      .getByRole("navigation", { name: "목록 페이지" })
      .getByRole("button", { name: `${number}페이지`, exact: true }),
  ).toHaveAttribute("aria-current", "page");
}

test("catalog loads, photos render, and Korean / English search works", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "위스키 아카이브" }),
  ).toBeVisible();
  await expect(page.locator(".product-card")).toHaveCount(10);
  await expect
    .poll(() =>
      page
        .locator(".hero-photo img")
        .evaluate((image) => (image as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });
  await page
    .getByRole("searchbox", { name: "위스키 검색" })
    .fill("GLENFIDDICH 12");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await expect(page.locator(".product-title")).toHaveText("글렌피딕 12년");
  await page.getByRole("searchbox").fill("라가불린 16년");
  await expect(page.locator(".product-title")).toHaveText("라가불린 16년");
  expect(errors).toEqual([]);
});

test("Canadian and Taiwanese additions appear in country filters, search and details", async ({
  page,
}) => {
  await page.goto("/");
  const filters = page.getByRole("complementary", { name: "검색 필터" });
  const search = page.getByRole("searchbox", { name: "위스키 검색" });
  await expect(
    filters.getByRole("button", { name: /전체 위스키/ }),
  ).toContainText(String(listWhiskies.length));
  await expect(filters.getByRole("button", { name: /캐나디안/ })).toBeVisible();

  for (const id of ["crown-royal-deluxe", "kavalan-classic"]) {
    const item = whiskies.find((entry) => entry.id === id)!;
    const countryCount = listWhiskies.filter(
      (entry) => entry.country === item.country,
    ).length;
    const country = filters.getByRole("checkbox", {
      name: `${item.country} ${countryCount}`,
      exact: true,
    });
    await country.check();
    await search.fill(item.englishName);
    await expect(page.locator(".product-card")).toHaveCount(1);
    await page.getByRole("button", { name: item.name, exact: true }).click();
    const dialog = page.getByRole("dialog");
    await expect(
      dialog.getByRole("heading", { name: item.name, exact: true }),
    ).toBeVisible();
    await expect(
      dialog.getByRole("link", { name: "제품 출처 보기" }),
    ).toHaveAttribute("href", item.source);
    await page.keyboard.press("Escape");
    await search.clear();
    await country.uncheck();
  }
});

test("combined tags, filter removal and empty-state reset", async ({
  page,
}) => {
  await page.goto("/");
  const filters = page.getByRole("complementary", { name: "검색 필터" });
  await filters.getByRole("button", { name: "#피트", exact: true }).click();
  await filters.getByRole("button", { name: "#스모키", exact: true }).click();
  const cards = page.locator(".product-card");
  expect(await cards.count()).toBeGreaterThan(0);
  for (const id of await visibleWhiskyIds(page)) {
    const item = whiskies.find((entry) => entry.id === id)!;
    expect(item.tags).toContain("피트");
    expect(item.tags).toContain("스모키");
  }
  await page.getByRole("searchbox").fill("없는제품123");
  await expect(page.getByText("아직 일치하는 한 잔이 없어요")).toBeVisible();
  await page.getByRole("button", { name: "필터 초기화", exact: true }).click();
  await expect(cards).toHaveCount(10);
  await expect(page.getByRole("searchbox")).toHaveValue("");
});

test("collection persists after reload and can be removed", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "글렌피딕 12년 저장", exact: true })
    .click();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "글렌피딕 12년 저장 취소" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: /내 컬렉션 1/ }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.getByRole("button", { name: "글렌피딕 12년 저장 취소" }).click();
  await expect(page.getByText("나만의 컬렉션을 시작해 보세요")).toBeVisible();
  await page
    .getByRole("button", { name: "전체 둘러보기", exact: true })
    .click();
  await expect(page.locator(".product-card")).toHaveCount(10);
});

test("cocktail ingredient search, scaled recipe and keyboard modal close", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "주 메뉴" })
    .getByRole("button", { name: /칵테일/ })
    .click();
  await expect(
    page.getByRole("heading", { name: "칵테일 레시피", exact: false }),
  ).toBeVisible();
  await page.getByRole("searchbox").fill("캄파리");
  await expect(page.locator(".product-card")).toHaveCount(2);
  await page.getByRole("searchbox").fill("Old Fashioned");
  await page.getByRole("button", { name: "올드 패션드", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "한 잔 늘리기" }).click();
  await expect(dialog.locator(".ingredients")).toContainText("90 ml");
  await expect(dialog.locator(".ingredients")).toContainText("4–6 대시");
  await dialog
    .getByRole("button", { name: "내 컬렉션에 저장", exact: true })
    .click();
  await expect(
    dialog.getByRole("button", { name: "내 컬렉션에 저장됨" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "올드 패션드", exact: true }),
  ).toBeFocused();
});

test("page sizes and pagination reveal every whisky exactly once", async ({
  page,
}) => {
  test.setTimeout(60_000);
  await page.goto("/");
  const total = listWhiskies.length;
  const totalPages = Math.ceil(total / 50);
  expect(total).toBeGreaterThan(400);
  const cards = page.locator(".product-card");
  const sizes = page.getByRole("group", { name: "페이지당 표시 개수" });
  const navigation = page.getByRole("navigation", { name: "목록 페이지" });
  const previous = navigation.getByRole("button", {
    name: "이전 페이지",
    exact: true,
  });
  const next = navigation.getByRole("button", {
    name: "다음 페이지",
    exact: true,
  });
  await expect(
    sizes.getByRole("button", { name: "10개", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(previous).toBeDisabled();

  for (const size of [10, 25, 50]) {
    await sizes.getByRole("button", { name: `${size}개`, exact: true }).click();
    await expect(cards).toHaveCount(size);
    await expectCurrentPage(page, 1);
    await expect(page.locator(".page-range")).toHaveText(
      `1–${size} / ${total}개`,
    );
    for (const option of [10, 25, 50]) {
      await expect(
        sizes.getByRole("button", { name: `${option}개`, exact: true }),
      ).toHaveAttribute("aria-pressed", String(option === size));
    }
  }

  const expectedIds = filterCatalog(whiskies, defaultFilters, {
    groupBatches: true,
  }).map(({ id }) => id);
  const seen: string[] = [];
  for (let number = 1; number <= totalPages; number++) {
    await expectCurrentPage(page, number);
    await expect(cards).toHaveCount(Math.min(50, total - (number - 1) * 50));
    const ids = await visibleWhiskyIds(page);
    expect(ids).toEqual(expectedIds.slice((number - 1) * 50, number * 50));
    expect(ids.every((id) => !seen.includes(id))).toBe(true);
    seen.push(...ids);
    if (number < totalPages) {
      await expect(next).toBeEnabled();
      await next.click();
    }
  }
  expect(seen).toEqual(expectedIds);
  expect(new Set(seen).size).toBe(total);
  await expect(page.locator(".page-range")).toHaveText(
    `${(totalPages - 1) * 50 + 1}–${total} / ${total}개`,
  );
  await expect(next).toBeDisabled();
  await expect(previous).toBeEnabled();
  await previous.click();
  await expectCurrentPage(page, totalPages - 1);
  await navigation
    .getByRole("button", { name: "1페이지", exact: true })
    .click();
  await expectCurrentPage(page, 1);
  await expect(previous).toBeDisabled();
  await sizes.getByRole("button", { name: "10개", exact: true }).click();
  await expect(cards).toHaveCount(10);
});

test("search, country filters and page size changes reset to page one", async ({
  page,
}) => {
  await page.goto("/");
  const cards = page.locator(".product-card");
  const navigation = page.getByRole("navigation", { name: "목록 페이지" });
  const next = navigation.getByRole("button", {
    name: "다음 페이지",
    exact: true,
  });
  const search = page.getByRole("searchbox", { name: "위스키 검색" });
  await next.click();
  await expectCurrentPage(page, 2);
  await search.fill("Glenfiddich");
  await expectCurrentPage(page, 1);
  expect(await visibleWhiskyIds(page)).toEqual(
    filterCatalog(
      whiskies,
      { ...defaultFilters, query: "Glenfiddich" },
      { groupBatches: true },
    )
      .slice(0, 10)
      .map(({ id }) => id),
  );
  await search.clear();
  await next.click();
  await expectCurrentPage(page, 2);

  const countryCounts = new Map<string, number>();
  for (const item of listWhiskies)
    countryCounts.set(item.country, (countryCounts.get(item.country) ?? 0) + 1);
  const selectedCountry = [...countryCounts].find(
    ([, count]) => count > 10 && count % 10 !== 0,
  );
  expect(
    selectedCountry,
    "A country filter should exercise a partial final page",
  ).toBeDefined();
  const [country, count] = selectedCountry!;
  const checkbox = page
    .getByRole("complementary", { name: "검색 필터" })
    .getByRole("checkbox", { name: `${country} ${count}`, exact: true });
  await checkbox.check();
  await expectCurrentPage(page, 1);
  const lastPage = Math.ceil(count / 10);
  await navigation
    .getByRole("button", { name: `${lastPage}페이지`, exact: true })
    .click();
  await expectCurrentPage(page, lastPage);
  await expect(cards).toHaveCount(count % 10);
  await expect(page.locator(".page-range")).toHaveText(
    `${(lastPage - 1) * 10 + 1}–${count} / ${count}개`,
  );
  await expect(next).toBeDisabled();
  expect(await visibleWhiskyIds(page)).toEqual(
    filterCatalog(
      whiskies,
      { ...defaultFilters, countries: [country] },
      { groupBatches: true },
    )
      .slice((lastPage - 1) * 10)
      .map(({ id }) => id),
  );
  await checkbox.uncheck();
  await expectCurrentPage(page, 1);
  await next.click();
  await expectCurrentPage(page, 2);
  await page
    .getByRole("group", { name: "페이지당 표시 개수" })
    .getByRole("button", { name: "25개", exact: true })
    .click();
  await expectCurrentPage(page, 1);
  await expect(cards).toHaveCount(25);
});

test("expanded flavor groups filter all pepper-tagged whiskies and reset cleanly", async ({
  page,
}) => {
  await page.goto("/");
  const filters = page.getByRole("complementary", { name: "검색 필터" });
  const pepper = filters.getByRole("button", { name: "#후추", exact: true });
  await expect(pepper).toBeVisible();
  await expect(pepper).toBeEnabled();
  await page
    .getByRole("navigation", { name: "목록 페이지" })
    .getByRole("button", { name: "다음 페이지", exact: true })
    .click();
  await expectCurrentPage(page, 2);
  await pepper.click();
  await expect(pepper).toHaveAttribute("aria-pressed", "true");
  await expectCurrentPage(page, 1);
  const expected = filterCatalog(
    whiskies,
    {
      ...defaultFilters,
      tags: ["후추"],
    },
    { groupBatches: true },
  );
  expect(expected.length).toBeGreaterThan(0);
  await page
    .getByRole("group", { name: "페이지당 표시 개수" })
    .getByRole("button", { name: "50개", exact: true })
    .click();
  const ids: string[] = [];
  for (let number = 1; number <= Math.ceil(expected.length / 50); number++) {
    await expectCurrentPage(page, number);
    await expect(page.locator(".product-card")).toHaveCount(
      Math.min(50, expected.length - (number - 1) * 50),
    );
    ids.push(...(await visibleWhiskyIds(page)));
    if (number < Math.ceil(expected.length / 50)) {
      await page
        .getByRole("navigation", { name: "목록 페이지" })
        .getByRole("button", { name: "다음 페이지", exact: true })
        .click();
    }
  }
  expect(ids).toEqual(expected.map(({ id }) => id));
  expect(
    ids.every((id) =>
      whiskies.find((item) => item.id === id)!.tags.includes("후추"),
    ),
  ).toBe(true);
  await pepper.click();
  await expect(pepper).toHaveAttribute("aria-pressed", "false");
  await page
    .getByRole("group", { name: "페이지당 표시 개수" })
    .getByRole("button", { name: "10개", exact: true })
    .click();
  await expectCurrentPage(page, 1);
  await expect(page.locator(".product-card")).toHaveCount(10);
});

test("price sorts use the saved averages and place missing prices last on every page", async ({
  page,
}) => {
  test.setTimeout(90_000);
  const knownPrices = listWhiskies
    .map(getWhiskyPrice)
    .filter((value): value is number => value !== null);
  expect(
    knownPrices.length,
    "The catalogue must include a real price snapshot",
  ).toBeGreaterThan(0);
  const missingCount = listWhiskies.length - knownPrices.length;
  await page.goto("/");
  await page
    .getByRole("group", { name: "페이지당 표시 개수" })
    .getByRole("button", { name: "50개", exact: true })
    .click();
  for (const sort of ["price-asc", "price-desc"] as const) {
    await page.getByRole("combobox", { name: "정렬 방식" }).selectOption(sort);
    await expectCurrentPage(page, 1);
    const actual: (number | null)[] = [];
    for (
      let number = 1;
      number <= Math.ceil(listWhiskies.length / 50);
      number++
    ) {
      await expectCurrentPage(page, number);
      const values = page.locator(".product-card .whisky-price .price-value");
      await expect(values).toHaveCount(
        Math.min(50, listWhiskies.length - (number - 1) * 50),
      );
      const prices = await values.evaluateAll((elements) =>
        elements.map((element) => {
          const value = element.getAttribute("data-price");
          return value === "" ? null : Number(value ?? NaN);
        }),
      );
      expect(
        prices.every(
          (price) => price === null || (Number.isFinite(price) && price > 0),
        ),
      ).toBe(true);
      actual.push(...prices);
      if (number < Math.ceil(listWhiskies.length / 50)) {
        await page
          .getByRole("navigation", { name: "목록 페이지" })
          .getByRole("button", { name: "다음 페이지", exact: true })
          .click();
      }
    }
    const expectedPrices = [...knownPrices].sort((a, b) =>
      sort === "price-asc" ? a - b : b - a,
    );
    expect(actual).toEqual([
      ...expectedPrices,
      ...Array<null>(missingCount).fill(null),
    ]);
  }
});

test("whisky details show the average, offer evidence and Dailyshot source", async ({
  page,
}) => {
  const item = whiskies.find((entry) => getWhiskyPrice(entry) !== null);
  expect(
    item,
    "At least one whisky must have source-backed price details",
  ).toBeDefined();
  const price = item!.dailyshotPrice!;
  await page.goto("/");
  await page
    .getByRole("searchbox", { name: "위스키 검색" })
    .fill(item!.englishName);
  await page.getByRole("button", { name: item!.name, exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator(".whisky-price .price-value")).toHaveAttribute(
    "data-price",
    String(price.average),
  );
  await expect(dialog.locator(".price-caption")).toContainText(
    `${price.volumeMl.toLocaleString("ko-KR")} ml`,
  );
  await expect(
    dialog.getByRole("link", { name: "데일리샷에서 확인" }),
  ).toHaveAttribute("href", price.sourceUrl);
  const offers = dialog.locator("details.price-offers");
  await offers.locator("summary").click();
  await expect(offers).toHaveAttribute("open", "");
  await expect(offers.getByRole("link")).toHaveCount(price.offers.length);
  const renderedOffers = await offers.locator("li").evaluateAll((rows) =>
    rows.map((row) => ({
      url: row.querySelector("a")?.getAttribute("href"),
      seller: row.querySelector("a")?.textContent?.trim(),
      price: row.querySelector("strong")?.textContent?.trim(),
    })),
  );
  expect(renderedOffers).toEqual(
    price.offers.map((offer) => ({
      url: offer.url,
      seller: offer.seller,
      price: `${offer.price.toLocaleString("ko-KR")}원`,
    })),
  );
});

test("details show official sources and preserve modal keyboard focus", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "글렌피딕 12년", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByText("한 잔에 담긴 이야기")).toBeVisible();
  await expect(
    dialog.getByRole("link", { name: "제품 출처 보기" }),
  ).toHaveAttribute("href", /glenfiddich\.com/);
  await page.keyboard.press("Shift+Tab");
  await expect(
    dialog.getByRole("link", { name: "제품 출처 보기" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("button", { name: "상세 보기 닫기" }),
  ).toBeFocused();
  await dialog.getByRole("button", { name: "올드 패션드 레시피" }).click();
  await expect(
    dialog.getByRole("heading", { name: "올드 패션드", exact: true }),
  ).toBeVisible();
  await expect(
    dialog.getByRole("button", { name: "상세 보기 닫기" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "글렌피딕 12년", exact: true }),
  ).toBeFocused();
});

test.describe("mobile layout", () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  test("filters, recipe and catalog fit a narrow viewport", async ({
    page,
  }) => {
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
    await page.getByRole("button", { name: "필터", exact: true }).click();
    const filters = page.getByRole("complementary", { name: "검색 필터" });
    await expect(filters).toBeVisible();
    await filters.getByRole("button", { name: "#피트", exact: true }).click();
    await filters.getByRole("button", { name: /결과 .*개 보기/ }).click();
    await expect(filters).not.toBeVisible();
    await page.locator(".product-title").first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    expect(
      await page
        .getByRole("dialog")
        .evaluate((element) => element.scrollWidth <= element.clientWidth),
    ).toBe(true);
    await page.getByRole("button", { name: "상세 보기 닫기" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });
});
