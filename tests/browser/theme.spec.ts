import { test, expect, type Page } from "@playwright/test";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

async function photoBrightness(page: Page) {
  const photo = page.locator(".product-card .bottle-photo").first();
  await photo.scrollIntoViewIfNeeded();
  await expect.poll(() => photo.evaluate((node) => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  const png = await photo.screenshot();
  return page.evaluate(async (base64) => {
    const bitmap = await createImageBitmap(await (await fetch(`data:image/png;base64,${base64}`)).blob());
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width; canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(bitmap, 0, 0);
    // Measure the central bottle area, rather than just the light margins.
    const { data } = ctx.getImageData(Math.floor(bitmap.width * .35), Math.floor(bitmap.height * .2), Math.floor(bitmap.width * .3), Math.floor(bitmap.height * .65));
    let sum = 0;
    for (let i = 0; i < data.length; i += 4) sum += .2126 * data[i] + .7152 * data[i+1] + .0722 * data[i+2];
    bitmap.close();
    return sum / (data.length / 4);
  }, png.toString("base64"));
}

for (const [name, width, height] of [["desktop", 1440, 1100], ["mobile", 390, 844]] as const) {
  test(`${name}: live theme changes preserve bottle brightness and readable details`, async ({ page }) => {
    test.setTimeout(90000);
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
    await page.goto("/");
    const search = page.getByRole("searchbox", { name: "위스키 검색" });
    for (const query of ["Glenfiddich 12", "Laphroaig 25 Year Old Cask Strength 2023 Edition"]) {
      await page.emulateMedia({ colorScheme: "light" });
      await search.fill(query);
      await expect(page.locator(".product-card")).toHaveCount(1);
      const light = await photoBrightness(page);
      await page.emulateMedia({ colorScheme: "dark" });
      await expect(page.locator("html")).toHaveCSS("background-color", "rgb(22, 29, 25)");
      const dark = await photoBrightness(page);
      expect(dark / light, "Dark mode must not blacken bottle pixels").toBeGreaterThan(.9);
      const photo = page.locator(".product-card .bottle-photo");
      await expect(photo).toHaveCSS("mix-blend-mode", "normal");
      await expect(page.locator(".product-visual")).toHaveCSS("color-scheme", "light only");
      const contrast = await page.evaluate(() => {
        const linear = (channel: number) => { const s = channel / 255; return s <= .04045 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4; };
        const luma = (color: string) => { const rgb = color.match(/[\d.]+/g)!.slice(0,3).map(Number).map(linear); return .2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2]; };
        const text = luma(getComputedStyle(document.querySelector(".product-title")!).color);
        const background = luma(getComputedStyle(document.documentElement).backgroundColor);
        return (Math.max(text, background) + .05) / (Math.min(text, background) + .05);
      });
      expect(contrast, "Product titles must retain readable contrast").toBeGreaterThanOrEqual(4.5);
      await page.locator(".product-title").click();
      const dialog = page.getByRole("dialog");
      await expect(dialog.locator(".bottle-photo")).toBeVisible();
      await expect(dialog.locator(".bottle-photo")).toHaveCSS("mix-blend-mode", "normal");
      await expect(dialog).toHaveCSS("background-color", "rgb(22, 29, 25)");
      const fits = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
      expect(fits).toBe(true);
      await dialog.screenshot({ path: `.cache/theme-${name}-detail-dark.png` });
      await page.keyboard.press("Escape");
    }
    await page.screenshot({ path: `.cache/theme-${name}-dark.png` });
    await page.emulateMedia({ colorScheme: "light" });
    await expect(page.locator("html")).toHaveCSS("background-color", "rgb(248, 247, 243)");
  });
}

test("browser auto-darkening keeps the protected photograph bright", async ({ page, context }) => {
  test.setTimeout(90000);
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("searchbox").fill("Glenfiddich 12");
  const normal = await photoBrightness(page);
  const cdp = await context.newCDPSession(page);
  await cdp.send("Emulation.setAutoDarkModeOverride", { enabled: true });
  const forced = await photoBrightness(page);
  expect(forced / normal, "Browser forced dark must not multiply the photo into its background").toBeGreaterThan(.95);
  await page.screenshot({ path: ".cache/theme-browser-forced-dark.png" });
  await cdp.send("Emulation.setAutoDarkModeOverride", { enabled: false });
});

test("standalone HTML follows dark preference with no network", async ({ page }) => {
  test.setTimeout(90000);
  await page.route(/^https?:\/\//, route => route.abort());
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto(pathToFileURL(resolve("index.html")).href);
  await expect(page).toHaveURL(pathToFileURL(resolve("preview.html")).href);
  await expect(page.locator("html")).toHaveCSS("background-color", "rgb(22, 29, 25)");
  await page.getByRole("searchbox").fill("Glenfiddich 12");
  expect(await photoBrightness(page)).toBeGreaterThan(40);
  await expect(page.locator(".bottle-photo").first()).toHaveAttribute("src", /^data:image\//);
  await page.screenshot({ path: ".cache/theme-standalone-dark.png" });
});
