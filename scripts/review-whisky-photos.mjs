import { readFile, mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { fileURLToPath } from "node:url";

// Local contact sheets for checking labels and spotting mistaken source images.
const root = new URL("../", import.meta.url);
const manifest = JSON.parse(
  await readFile(new URL("src/data/whisky-images.json", root), "utf8"),
);
const selectedIds = process.argv
  .find((argument) => argument.startsWith("--ids="))
  ?.slice(6)
  .split(",");
const photos = Object.entries(manifest).filter(([id, photo]) =>
  selectedIds
    ? selectedIds.includes(id)
    : !photo.sourceUrl.includes("dailyshot.co"),
);
const types = {
  jpg: "jpeg",
  jpeg: "jpeg",
  png: "png",
  webp: "webp",
  avif: "avif",
  gif: "gif",
};
const browser = await chromium.launch({
  channel: process.platform === "win32" ? "msedge" : "chromium",
});
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 1320 },
  });
  await mkdir(new URL(".cache/photo-review/", root), { recursive: true });
  for (let start = 0; start < photos.length; start += 30) {
    const entries = await Promise.all(
      photos.slice(start, start + 30).map(async ([id, photo]) => {
        const bytes = await readFile(new URL(`public${photo.path}`, root));
        const type = types[photo.path.split(".").pop()];
        return {
          id,
          src: `data:image/${type};base64,${bytes.toString("base64")}`,
        };
      }),
    );
    await page.setContent(
      "<html><style>body{margin:0;background:#eee;display:grid;grid-template-columns:repeat(6,200px);font:12px sans-serif}figure{background:white;margin:2px;padding:8px;text-align:center;height:242px}img{width:176px;height:210px;object-fit:contain}figcaption{overflow-wrap:anywhere}</style><body></body></html>",
    );
    await page.evaluate(async (entries) => {
      await Promise.all(
        entries.map(async ({ id, src }) => {
          const figure = document.createElement("figure");
          const image = new Image();
          image.src = src;
          const caption = document.createElement("figcaption");
          caption.textContent = id;
          figure.append(image, caption);
          document.body.append(figure);
          await image.decode();
        }),
      );
    }, entries);
    const output = fileURLToPath(
      new URL(`.cache/photo-review/sheet-${start / 30 + 1}.png`, root),
    );
    await page.screenshot({ path: output, fullPage: true });
    console.log(output);
  }
} finally {
  await browser.close();
}
