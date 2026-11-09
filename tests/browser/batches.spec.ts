import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { test, expect } from "@playwright/test";
import { whiskies } from "../../src/data/whiskies";
import { scotchBatchGroups } from "../../src/data/scotch-batch-groups";
import { whiskyImages } from "../../src/data/whisky-images";
import { formatWhiskyAbv, getWhiskyPrice } from "../../src/lib/catalog";

for (const group of scotchBatchGroups) {
  test(`${group.englishName}: one card with each batch's facts, photo and price`, async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("searchbox").fill(group.englishName);
    const card = page.locator(".product-card");
    await expect(card).toHaveCount(1);
    await expect(card).toHaveAttribute(
      "data-product-id",
      group.representativeId,
    );
    await expect(card.locator(".product-title")).toHaveText(group.name);
    await expect(card.locator(".batch-card-label")).toContainText(
      `배치 ${group.batches.length}개`,
    );
    await card.locator(".product-title").click();
    const dialog = page.getByRole("dialog");
    const picker = dialog.getByRole("combobox", { name: "배치 선택" });
    for (const batch of group.batches) {
      const item = whiskies.find(({ id }) => id === batch.id)!;
      await picker.selectOption(item.id);
      await expect(picker).toHaveValue(item.id);
      await expect(
        dialog.getByRole("heading", { name: item.name, exact: true }),
      ).toBeVisible();
      await expect(dialog.locator(".detail-facts strong").first()).toHaveText(
        formatWhiskyAbv(item),
      );
      await expect(dialog.locator(".detail-description")).toHaveText(
        item.description,
      );
      for (const note of Object.values(item.notes))
        await expect(dialog.locator(".tasting-notes")).toContainText(note);
      const image = dialog.locator("img.bottle-photo");
      await expect(image).toHaveAttribute("src", whiskyImages[item.id].path);
      await expect(image).toHaveAttribute("alt", item.name);
      await expect
        .poll(() =>
          image.evaluate(
            (element) => (element as HTMLImageElement).naturalWidth,
          ),
        )
        .toBeGreaterThan(0);
      await expect(
        dialog.locator(".whisky-price .price-value"),
      ).toHaveAttribute("data-price", String(getWhiskyPrice(item) ?? ""));
      await expect(dialog.locator(".dailyshot-link")).toHaveAttribute(
        "href",
        item.dailyshotPrice?.sourceUrl ??
          item.dailyshotProduct?.url ??
          `https://dailyshot.co/m/search/result?q=${encodeURIComponent(item.name)}`,
      );
      await expect(
        dialog.getByRole("link", { name: "제품 출처 보기" }),
      ).toHaveAttribute("href", item.source);
      const priceNote =
        item.dailyshotPrice?.note || item.dailyshotProduct?.note;
      if (priceNote)
        await expect(dialog.locator(".price-batch-note")).toHaveText(priceNote);
    }
    await page.keyboard.press("Escape");
    const older = whiskies.find(({ id }) => id === group.batches.at(-1)!.id)!;
    await page.getByRole("searchbox").fill(older.englishName);
    await expect(card).toHaveCount(1);
    await expect(card).toHaveAttribute("data-product-id", older.id);
    await card.locator(".product-title").click();
    await expect(page.getByRole("combobox", { name: "배치 선택" })).toHaveValue(
      older.id,
    );
    await page.keyboard.press("Escape");
  });
}

test("batch bookmarks persist independently while the collection shows one product", async ({
  page,
}) => {
  const group = scotchBatchGroups[0];
  const olderId = group.batches.at(-1)!.id;
  await page.goto("/");
  await page.getByRole("searchbox").fill(group.englishName);
  await page.locator(".product-title").click();
  const picker = page.getByRole("combobox", { name: "배치 선택" });
  const save = page.locator(".detail-save");
  await picker.selectOption(olderId);
  await save.click();
  await expect(save).toContainText("내 컬렉션에 저장됨");
  await picker.selectOption(group.representativeId);
  await expect(save).toHaveText("내 컬렉션에 저장");
  await save.click();
  await page.keyboard.press("Escape");
  await page.reload();
  await page.locator(".collection-button").click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await expect(page.locator(".collection-button small")).toHaveText("1");
  await page.locator(".product-title").click();
  await picker.selectOption(olderId);
  await expect(save).toContainText("내 컬렉션에 저장됨");
  await save.click();
  await picker.selectOption(group.representativeId);
  await expect(save).toContainText("내 컬렉션에 저장됨");
  await page.keyboard.press("Escape");
  await expect(page.locator(".product-card")).toHaveCount(1);
  const saved = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("whisky-note-saved") || "[]"),
  );
  expect(saved).toEqual([group.representativeId]);
});

test.describe("batch selection on mobile without a server", () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  test("index.html opens the grouped catalog and switches embedded batch photos", async ({
    page,
  }) => {
    await page.route(/^https?:\/\//, (route) => route.abort());
    await page.goto(pathToFileURL(resolve("index.html")).href);
    const group = scotchBatchGroups[1];
    await page.getByRole("searchbox").fill(group.englishName);
    await expect(page.locator(".product-card")).toHaveCount(1);
    await page.locator(".product-title").click();
    const dialog = page.getByRole("dialog");
    const picker = dialog.getByRole("combobox", { name: "배치 선택" });
    const initialPhoto = await dialog
      .locator("img.bottle-photo")
      .getAttribute("src");
    const older = whiskies.find(({ id }) => id === group.batches.at(-1)!.id)!;
    await picker.selectOption(older.id);
    await expect(picker).toHaveValue(older.id);
    await expect(dialog.locator(".detail-facts strong").first()).toHaveText(
      formatWhiskyAbv(older),
    );
    await expect(dialog.locator("img.bottle-photo")).toHaveAttribute(
      "src",
      /^data:image\//,
    );
    expect(
      await dialog.locator("img.bottle-photo").getAttribute("src"),
    ).not.toEqual(initialPhoto);
    expect(
      await dialog.evaluate(
        (element) => element.scrollWidth <= element.clientWidth,
      ),
    ).toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await picker.scrollIntoViewIfNeeded();
    await page.screenshot({ path: "test-results/batch-selection-mobile.png" });
  });
});
