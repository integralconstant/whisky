import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { test, expect } from "@playwright/test";
import { whiskies } from "../../src/data/whiskies";
import { filterCatalog, getWhiskyPrice } from "../../src/lib/catalog";
import {
  collapseScotchBatches,
  getScotchBatchGroup,
} from "../../src/lib/batches";

const listWhiskies = collapseScotchBatches(whiskies);
const displayName = (item: (typeof whiskies)[number]) =>
  getScotchBatchGroup(item)?.name ?? item.name;

test.beforeEach(async ({ page }) => {
  await page.route(/^https?:\/\//, (route) => route.abort());
});

test("opening index.html directly loads the offline catalog and recipes", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto(pathToFileURL(resolve("index.html")).href);
  await expect(page).toHaveURL(pathToFileURL(resolve("preview.html")).href);
  await expect(
    page.getByRole("heading", { name: "위스키 아카이브" }),
  ).toBeVisible();
  await expect(page.locator(".product-card")).toHaveCount(10);
  const images = page.locator(".hero-photo img, .product-card img");
  await expect(images).toHaveCount(11);
  // Scroll as a user would: photographs below the fold are loaded lazily.
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate((element) => (element as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
  }

  await page
    .getByRole("searchbox", { name: "위스키 검색" })
    .fill("라가불린 16년");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await expect(page.locator(".product-title")).toHaveText("라가불린 16년");

  await page.getByRole("searchbox").fill("Elijah Craig CS C925");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await expect(page.locator(".product-title")).toHaveText(
    "일라이저 크레이그 배럴 프루프 C925",
  );
  await expect(page.locator(".product-meta strong")).toHaveText("64.5%");
  await expect(page.locator(".product-tags")).toContainText("#캐스크 스트렝스");
  await expect(page.locator(".product-card img.bottle-photo")).toHaveAttribute(
    "src",
    /^data:image\//,
  );

  await page
    .getByRole("navigation", { name: "주 메뉴" })
    .getByRole("button", { name: /칵테일/ })
    .click();
  await expect(
    page.getByRole("heading", { name: "칵테일 레시피", exact: false }),
  ).toBeVisible();
  await page.getByRole("searchbox").fill("Old Fashioned");
  await page.getByRole("button", { name: "올드 패션드", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: "올드 패션드", exact: true }),
  ).toBeVisible();
  await expect(dialog.locator(".ingredients")).toContainText("45 ml");
  expect(errors).toEqual([]);
});

test("preview.html works as a standalone file without HTTP requests", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto(pathToFileURL(resolve("preview.html")).href);
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

  await expect(
    page
      .getByRole("complementary", { name: "검색 필터" })
      .getByRole("button", { name: /전체 위스키/ }),
  ).toContainText(String(listWhiskies.length));
  for (const id of ["crown-royal-deluxe", "kavalan-classic"]) {
    const item = whiskies.find((entry) => entry.id === id)!;
    await page.getByRole("searchbox").fill(item.englishName);
    await expect(page.locator(".product-card")).toHaveCount(1);
    await expect(page.locator(".product-title")).toHaveText(item.name);
  }

  await page.getByRole("searchbox").clear();
  const sizes = page.getByRole("group", { name: "페이지당 표시 개수" });
  const navigation = page.getByRole("navigation", { name: "목록 페이지" });
  for (const size of [10, 25, 50]) {
    await sizes.getByRole("button", { name: `${size}개`, exact: true }).click();
    await expect(
      sizes.getByRole("button", { name: `${size}개`, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".product-card")).toHaveCount(size);
  }
  await expect(
    navigation.getByRole("button", { name: "이전 페이지", exact: true }),
  ).toBeDisabled();
  const firstPage = await page.locator(".product-title").allTextContents();
  await navigation
    .getByRole("button", { name: "다음 페이지", exact: true })
    .click();
  await expect(
    navigation.getByRole("button", { name: "2페이지", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  const secondPage = await page.locator(".product-title").allTextContents();
  expect(secondPage).toHaveLength(50);
  expect(secondPage.every((name) => !firstPage.includes(name))).toBe(true);
  const lastPage = Math.ceil(listWhiskies.length / 50);
  await navigation
    .getByRole("button", { name: `${lastPage}페이지`, exact: true })
    .click();
  await expect(
    navigation.getByRole("button", { name: "다음 페이지", exact: true }),
  ).toBeDisabled();
  await expect(page.locator(".product-card")).toHaveCount(
    listWhiskies.length % 50 || 50,
  );

  const priced = whiskies.filter((item) => getWhiskyPrice(item) !== null);
  expect(
    priced.length,
    "The standalone build must include the price snapshot",
  ).toBeGreaterThan(0);
  await page
    .getByRole("combobox", { name: "정렬 방식" })
    .selectOption("price-asc");
  await expect(
    navigation.getByRole("button", { name: "1페이지", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  const expected = filterCatalog(
    whiskies,
    {
      query: "",
      category: "",
      countries: [],
      tags: [],
      savedOnly: false,
      saved: [],
      sort: "price-asc",
    },
    { groupBatches: true },
  ).slice(0, 50);
  expect(await page.locator(".product-title").allTextContents()).toEqual(
    expected.map(displayName),
  );
  const values = await page
    .locator(".product-card .whisky-price .price-value")
    .evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("data-price")),
    );
  expect(values).toEqual(
    expected.map((item) => String(getWhiskyPrice(item) ?? "")),
  );

  const selected = expected[0];
  await page
    .getByRole("button", { name: displayName(selected), exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator(".whisky-price .price-value")).toHaveAttribute(
    "data-price",
    String(selected.dailyshotPrice!.average),
  );
  await expect(
    dialog.getByRole("link", { name: "데일리샷에서 확인" }),
  ).toHaveAttribute("href", selected.dailyshotPrice!.sourceUrl);
  await dialog.locator("details.price-offers summary").click();
  await expect(
    dialog.locator("details.price-offers").getByRole("link"),
  ).toHaveCount(selected.dailyshotPrice!.offers.length);
  await page.keyboard.press("Escape");
  await sizes.getByRole("button", { name: "10개", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(10);
  expect(errors).toEqual([]);
});
