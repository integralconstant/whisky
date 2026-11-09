import { test, expect } from "@playwright/test";
import { whiskies } from "../../src/data/whiskies";
import { getWhiskyPrice } from "../../src/lib/catalog";
import {
  collapseScotchBatches,
  getScotchBatchGroup,
} from "../../src/lib/batches";

const displayName = (item: (typeof whiskies)[number]) =>
  getScotchBatchGroup(item)?.name ?? item.name;

test("CS prices distinguish verified offers from shared or unavailable batch prices", async ({
  page,
}) => {
  const examples = [
    whiskies.find(
      (item) =>
        item.caskStrength &&
        item.dailyshotPrice &&
        item.dailyshotProduct?.scope === "exact-product",
    ),
    whiskies.find(
      (item) =>
        item.caskStrength &&
        item.dailyshotPrice &&
        item.dailyshotProduct?.scope === "variable-batches",
    ),
    whiskies.find(
      (item) =>
        item.caskStrength && item.dailyshotProduct?.scope === "other-batches",
    ),
  ];
  expect(
    examples.every(Boolean),
    "CS price snapshots and batch-specific reference links must be present",
  ).toBe(true);
  await page.goto("/");
  for (const item of examples) {
    if (!item) continue;
    await page.getByRole("searchbox").fill(item.englishName);
    const card = page.locator(`.product-card[data-product-id="${item.id}"]`);
    await expect(card.locator(".price-value")).toHaveAttribute(
      "data-price",
      String(getWhiskyPrice(item) ?? ""),
    );
    await card.locator(".product-title").click();
    const dialog = page.getByRole("dialog");
    await expect(dialog.locator(".dailyshot-link")).toHaveAttribute(
      "href",
      item.dailyshotPrice?.sourceUrl ?? item.dailyshotProduct!.url,
    );
    await expect(dialog.locator(".price-batch-note")).toHaveText(
      item.dailyshotPrice?.note || item.dailyshotProduct!.note,
    );
    if (item.dailyshotProduct!.scope === "other-batches") {
      expect(item.dailyshotPrice).toBeUndefined();
      await expect(dialog.locator(".price-value")).toHaveText("가격 정보 없음");
      await expect(dialog.locator(".dailyshot-link")).toContainText(
        "다른 배치",
      );
    } else {
      await dialog.locator("details.price-offers summary").click();
      await expect(dialog.locator("details.price-offers li")).toHaveCount(
        item.dailyshotPrice!.sampleCount,
      );
    }
    await page.keyboard.press("Escape");
  }
});

test("CS aliases and the bottling tag find the same products and combine with flavor tags", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("group", { name: "페이지당 표시 개수" })
    .getByRole("button", { name: "50개", exact: true })
    .click();
  const search = page.getByRole("searchbox", { name: "위스키 검색" });
  const titles = page.locator(".product-title");
  const expected = collapseScotchBatches(
    whiskies.filter((item) => item.caskStrength),
  );
  expect(expected.length).toBeGreaterThan(24);

  for (const alias of ["CS", "cask strength", "barrel proof"]) {
    await search.fill(alias);
    await expect(titles).toHaveCount(expected.length);
    expect((await titles.allTextContents()).sort()).toEqual(
      expected.map(displayName).sort(),
    );
    await expect(
      page.locator(".product-tags").getByRole("button", {
        name: "#캐스크 스트렝스",
        exact: true,
      }),
    ).toHaveCount(expected.length);
  }

  await search.fill("라프로익 (CS)");
  await expect(titles).toHaveText(["라프로익 10년 캐스크 스트렝스"]);
  await search.clear();
  const filters = page.getByRole("complementary", { name: "검색 필터" });
  const bottlingTag = filters.getByRole("button", {
    name: "#캐스크 스트렝스",
    exact: true,
  });
  await bottlingTag.click();
  await expect(bottlingTag).toHaveAttribute("aria-pressed", "true");
  await expect(titles).toHaveCount(expected.length);
  await filters.getByRole("button", { name: "#피트", exact: true }).click();
  const peated = collapseScotchBatches(
    whiskies.filter((item) => item.caskStrength && item.tags.includes("피트")),
  );
  await expect(titles).toHaveCount(peated.length);
  expect((await titles.allTextContents()).sort()).toEqual(
    peated.map(displayName).sort(),
  );
});

test("CS cards and details distinguish an ABV range from a named batch", async ({
  page,
}) => {
  await page.goto("/");
  const search = page.getByRole("searchbox", { name: "위스키 검색" });
  const examples = [
    {
      id: "makers-mark-cask-strength",
      display: "53.5–57%",
      caption: "배치별 상이",
    },
    {
      id: "elijah-craig-barrel-proof-c925",
      display: "64.5%",
      caption: "표기 배치 기준",
    },
  ];

  for (const example of examples) {
    const item = whiskies.find((entry) => entry.id === example.id)!;
    await search.fill(item.englishName);
    const card = page.locator(".product-card");
    await expect(card).toHaveCount(1);
    await expect(card.locator(".product-meta strong")).toHaveText(
      example.display,
    );
    await expect(card.locator(".abv-batch")).toHaveText(example.caption);
    await expect(card.locator(".abv-batch")).toHaveAttribute(
      "title",
      item.abvNote!,
    );
    await card.getByRole("button", { name: item.name, exact: true }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog.locator(".detail-facts strong").first()).toHaveText(
      example.display,
    );
    await expect(dialog.locator(".abv-note")).toHaveText(item.abvNote!);
    await expect(dialog.locator(".detail-tags")).toContainText(
      "#캐스크 스트렝스",
    );
    await expect(
      dialog.getByRole("link", { name: "제품 출처 보기" }),
    ).toHaveAttribute("href", item.source);
    await page.keyboard.press("Escape");
  }
});

test.describe("CS on mobile", () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  test("the bottling filter and long ABV range fit cards and details", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "필터", exact: true }).click();
    const filters = page.getByRole("complementary", { name: "검색 필터" });
    await filters
      .getByRole("button", { name: "#캐스크 스트렝스", exact: true })
      .click();
    await filters.getByRole("button", { name: /결과 .*개 보기/ }).click();
    await expect(filters).not.toBeVisible();

    const item = whiskies.find(
      (entry) => entry.id === "jack-daniels-single-barrel-barrel-proof-rye",
    )!;
    await page
      .getByRole("searchbox", { name: "위스키 검색" })
      .fill(item.englishName);
    const card = page.locator(".product-card");
    await expect(card).toHaveCount(1);
    await expect(card.locator(".product-meta strong")).toHaveText("62.5–72.5%");
    await expect(card.locator(".abv-batch")).toHaveText("배치별 상이");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    expect(
      await card.evaluate(
        (element) => element.scrollWidth <= element.clientWidth,
      ),
    ).toBe(true);
    await card.getByRole("button", { name: item.name, exact: true }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog.locator(".abv-note")).toBeVisible();
    await expect(dialog.locator(".detail-facts strong").first()).toHaveText(
      "62.5–72.5%",
    );
    expect(
      await dialog.evaluate(
        (element) => element.scrollWidth <= element.clientWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: "test-results/cask-strength-mobile.png",
      fullPage: true,
    });
  });
});
