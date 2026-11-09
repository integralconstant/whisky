import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { test, expect } from "@playwright/test";
import { whiskies } from "../../src/data/whiskies";
import { whiskyImages } from "../../src/data/whisky-images";
import { scotchBatchGroups } from "../../src/data/scotch-batch-groups";
import { collapseScotchBatches } from "../../src/lib/batches";

const originalPhotos: Record<string, string> = {
  "glenfiddich-12": "/images/glenfiddich-12.jpg",
  "balvenie-12-doublewood": "/images/balvenie-12.jpg",
  "macallan-12-sherry": "/images/macallan-12.jpg",
  "glenmorangie-original-12": "/images/glenmorangie-12.jpg",
  "lagavulin-16": "/images/lagavulin-16.jpg",
  "ardbeg-10": "/images/ardbeg-10.jpg",
};
const photoPaths = {
  ...Object.fromEntries(
    Object.entries(whiskyImages).map(([id, photo]) => [id, photo.path]),
  ),
  ...originalPhotos,
};

test("all saved whisky photographs decode in the browser", async ({ page }) => {
  test.setTimeout(90000);
  await page.goto("/");
  const failures = await page.evaluate(async (photos) => {
    const queue = Object.entries(photos);
    const failures: string[] = [];
    await Promise.all(
      Array.from({ length: 8 }, async () => {
        for (let entry = queue.pop(); entry; entry = queue.pop()) {
          const [id, src] = entry;
          const image = new Image();
          image.src = src;
          try {
            await image.decode();
            if (!image.naturalWidth || !image.naturalHeight) failures.push(id);
          } catch {
            failures.push(id);
          } finally {
            image.removeAttribute("src");
          }
        }
      }),
    );
    return failures;
  }, photoPaths);
  expect(failures, "Missing or undecodable whisky photographs").toEqual([]);
});

test("original and newly saved photographs appear in cards and details", async ({
  page,
}) => {
  test.setTimeout(60000);
  await page.goto("/");
  const representatives = new Set(Object.keys(originalPhotos));
  const seenFormats = new Set<string>();
  for (const [id, photo] of Object.entries(whiskyImages)) {
    const format = photo.path.split(".").pop()!;
    if (!seenFormats.has(format)) {
      representatives.add(id);
      seenFormats.add(format);
    }
  }
  for (const id of representatives) {
    const item = whiskies.find((entry) => entry.id === id)!;
    await page
      .getByRole("searchbox", { name: "위스키 검색" })
      .fill(item.englishName);
    const card = page.locator(`.product-card[data-product-id="${item.id}"]`);
    const cardImage = card.locator("img.bottle-photo");
    await expect(cardImage).toHaveAttribute("src", photoPaths[id]);
    await expect(cardImage).toHaveAttribute("alt", item.name);
    await expect
      .poll(() =>
        cardImage.evaluate((image) => (image as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
    await card.locator(".product-title").click();
    const detailImage = page.getByRole("dialog").locator("img.bottle-photo");
    await expect(detailImage).toHaveAttribute("src", photoPaths[id]);
    await expect
      .poll(() =>
        detailImage.evaluate(
          (image) => (image as HTMLImageElement).naturalWidth,
        ),
      )
      .toBeGreaterThan(0);
    await page.keyboard.press("Escape");
  }
});

test("a failed photograph uses an illustration and other products still show photographs", async ({
  page,
}) => {
  const [failedId, failedPhoto] = Object.entries(whiskyImages)[0];
  const failedItem = whiskies.find((item) => item.id === failedId)!;
  await page.route(`**${failedPhoto.path}`, (route) => route.abort());
  await page.goto("/");
  await page.getByRole("searchbox").fill(failedItem.englishName);
  const failedCard = page.locator(
    `.product-card[data-product-id="${failedItem.id}"]`,
  );
  await expect(failedCard.locator(".bottle-illustration")).toBeVisible();
  await expect(failedCard.locator("img.bottle-photo")).toHaveCount(0);
  await failedCard.locator(".product-title").click();
  await expect(
    page.getByRole("dialog").locator(".bottle-illustration"),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("searchbox").fill("Glenfiddich 12");
  const image = page.locator(".product-card img.bottle-photo");
  await expect(image).toHaveAttribute("src", originalPhotos["glenfiddich-12"]);
  await expect
    .poll(() =>
      image.evaluate((element) => (element as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
});

test("every saved photograph renders from embedded data in the standalone catalog", async ({
  page,
}) => {
  test.setTimeout(120000);
  await page.route(/^https?:\/\//, (route) => route.abort());
  await page.goto(pathToFileURL(resolve("preview.html")).href);
  await expect(
    page.getByRole("heading", { name: "위스키 아카이브" }),
  ).toBeVisible();
  await page
    .getByRole("group", { name: "페이지당 표시 개수" })
    .getByRole("button", { name: "50개", exact: true })
    .click();
  const seen = new Set<string>();
  const listWhiskies = collapseScotchBatches(whiskies);
  const pageCount = Math.ceil(listWhiskies.length / 50);
  for (let number = 1; number <= pageCount; number++) {
    const cards = page.locator(".product-card");
    await expect(cards).toHaveCount(
      Math.min(50, listWhiskies.length - (number - 1) * 50),
    );
    const entries = await cards.evaluateAll(async (elements) => {
      const results: {
        id: string | null;
        embedded: boolean;
        decoded: boolean;
      }[] = [];
      const queue = [...elements];
      await Promise.all(
        Array.from({ length: 8 }, async () => {
          for (let card = queue.pop(); card; card = queue.pop()) {
            const image =
              card.querySelector<HTMLImageElement>("img.bottle-photo");
            let decoded = false;
            if (image) {
              image.loading = "eager";
              try {
                await image.decode();
                decoded = image.naturalWidth > 0 && image.naturalHeight > 0;
              } catch {
                /* Report the product name with the failed decode below. */
              }
            }
            results.push({
              id: card.getAttribute("data-product-id"),
              embedded:
                image?.getAttribute("src")?.startsWith("data:image/") ?? false,
              decoded,
            });
          }
        }),
      );
      return results;
    });
    for (const entry of entries) {
      const item = whiskies.find((whisky) => whisky.id === entry.id);
      expect(item, `Unknown rendered product: ${entry.id}`).toBeDefined();
      expect(seen.has(item!.id), `Repeated product: ${item!.id}`).toBe(false);
      seen.add(item!.id);
      if (photoPaths[item!.id]) {
        expect(entry.embedded, `Photo is not embedded: ${item!.id}`).toBe(true);
        expect(
          entry.decoded,
          `Embedded photo failed to decode: ${item!.id}`,
        ).toBe(true);
      }
    }
    if (number < pageCount) {
      const navigation = page.getByRole("navigation", { name: "목록 페이지" });
      await navigation
        .getByRole("button", { name: "다음 페이지", exact: true })
        .click();
      await expect(
        navigation.getByRole("button", {
          name: `${number + 1}페이지`,
          exact: true,
        }),
      ).toHaveAttribute("aria-current", "page");
    }
  }
  expect(seen.size).toBe(listWhiskies.length);

  // Grouped cards show one photograph; select each other batch to verify that
  // its distinct asset was embedded in the standalone build as well.
  for (const group of scotchBatchGroups) {
    const remaining = group.batches.filter((batch) => !seen.has(batch.id));
    if (!remaining.length) continue;
    await page
      .getByRole("searchbox", { name: "위스키 검색" })
      .fill(group.englishName);
    const card = page.locator(
      `.product-card[data-product-id="${group.representativeId}"]`,
    );
    await card.locator(".product-title").click();
    const dialog = page.getByRole("dialog");
    for (const batch of remaining) {
      const item = whiskies.find((entry) => entry.id === batch.id)!;
      await dialog
        .getByRole("combobox", { name: "배치 선택" })
        .selectOption(batch.id);
      await expect(
        dialog.getByRole("heading", { name: item.name, exact: true }),
      ).toBeVisible();
      const image = dialog.locator("img.bottle-photo");
      await expect(image).toHaveAttribute("src", /^data:image\//);
      expect(
        await image.evaluate(async (element) => {
          const photo = element as HTMLImageElement;
          photo.loading = "eager";
          await photo.decode();
          return photo.naturalWidth > 0 && photo.naturalHeight > 0;
        }),
        `Embedded batch photo failed to decode: ${batch.id}`,
      ).toBe(true);
      seen.add(batch.id);
    }
    await page.keyboard.press("Escape");
  }
  expect([...seen].sort()).toEqual(whiskies.map((item) => item.id).sort());
});
