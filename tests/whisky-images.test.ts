import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { extname } from "node:path";
import { whiskies } from "../src/data/whiskies.ts";
import { whiskyImages } from "../src/data/whisky-images.ts";

const imageDirectory = new URL("../public/images/", import.meta.url);

test("every whisky in the catalog has a real product photograph", () => {
  const originalIds = new Set([
    "glenfiddich-12",
    "balvenie-12-doublewood",
    "macallan-12-sherry",
    "glenmorangie-original-12",
    "lagavulin-16",
    "ardbeg-10",
  ]);
  const missing = whiskies.filter(
    ({ id }) => !originalIds.has(id) && !whiskyImages[id],
  );
  assert.deepEqual(
    missing.map(({ id }) => id),
    [],
  );
});

test("photographs refer to catalog entries with traceable source metadata", () => {
  const ids = new Set(whiskies.map((item) => item.id));
  const paths = new Set<string>();
  assert.ok(Object.keys(whiskyImages).length > 0);
  for (const [id, photo] of Object.entries(whiskyImages)) {
    assert.ok(ids.has(id), `Unknown whisky in photo manifest: ${id}`);
    assert.match(
      photo.path,
      /^\/images\/whisky-[a-z0-9-]+\.(?:jpg|jpeg|png|webp|avif|gif)$/,
      `Unsafe image path: ${id}`,
    );
    assert.equal(
      photo.path.slice("/images/whisky-".length, -extname(photo.path).length),
      id,
      `Photo filename must identify its whisky: ${id}`,
    );
    assert.ok(!paths.has(photo.path), `Photo path is reused: ${photo.path}`);
    paths.add(photo.path);
    for (const key of ["imageUrl", "sourceUrl"] as const) {
      const url = new URL(photo[key]);
      assert.equal(url.protocol, "https:", `${id}: ${key}`);
      assert.equal(url.username + url.password, "", `${id}: ${key}`);
      assert.ok(url.hostname.includes("."), `${id}: ${key}`);
    }
    assert.ok(photo.productName.trim(), `Missing source product name: ${id}`);
    assert.ok(photo.note.trim(), `Missing matching note: ${id}`);
    assert.ok(
      Number.isFinite(Date.parse(photo.checkedAt)),
      `Invalid date: ${id}`,
    );
  }
});

test("every manifest photo exists locally and contains the advertised image format", async () => {
  const files = new Set(await readdir(imageDirectory));
  for (const [id, photo] of Object.entries(whiskyImages)) {
    const filename = photo.path.slice("/images/".length);
    assert.ok(files.has(filename), `Missing photo file: ${id}`);
    const bytes = await readFile(new URL(filename, imageDirectory));
    assert.ok(bytes.length > 100, `Empty or truncated photo: ${id}`);
    const extension = extname(filename);
    let recognized = false;
    if (extension === ".jpg" || extension === ".jpeg") {
      recognized = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    } else if (extension === ".png") {
      recognized = bytes
        .subarray(0, 8)
        .equals(Buffer.from("89504e470d0a1a0a", "hex"));
    } else if (extension === ".webp") {
      recognized =
        bytes.toString("ascii", 0, 4) === "RIFF" &&
        bytes.toString("ascii", 8, 12) === "WEBP";
    } else if (extension === ".gif") {
      recognized = /^GIF8[79]a$/.test(bytes.toString("ascii", 0, 6));
    } else if (extension === ".avif") {
      recognized =
        bytes.toString("ascii", 4, 8) === "ftyp" &&
        /avif|avis/.test(bytes.toString("ascii", 8, 32));
    }
    assert.ok(
      recognized,
      `File does not contain ${extension} image data: ${id}`,
    );
  }
});
