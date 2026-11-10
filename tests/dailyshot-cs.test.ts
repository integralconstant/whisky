import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { whiskies } from "../src/data/whiskies.ts";
import { dailyshotProducts } from "../src/data/dailyshot-products.ts";
import { approvedAbvMatches } from "../scripts/dailyshot-matching.mjs";

test("all CS entries have traceable Dailyshot links and mismatched batches never show a price", () => {
  const entries = whiskies.filter((item) => item.caskStrength);
  assert.ok(entries.length > 0);
  assert.ok(
    entries.some(
      (item) =>
        item.dailyshotPrice &&
        item.dailyshotProduct?.scope === "variable-batches",
    ),
  );
  for (const item of entries) {
    const product = dailyshotProducts[item.id];
    assert.ok(product, `Missing CS link: ${item.id}`);
    assert.deepEqual(item.dailyshotProduct, product);
    const url = new URL(product.url);
    assert.equal(url.protocol, "https:");
    assert.equal(url.hostname, "dailyshot.co");
    assert.ok(Number.isFinite(Date.parse(product.checkedAt)));
    assert.ok(product.productName && product.note);
    if (product.scope === "other-batches" || product.scope === "search")
      assert.equal(
        item.dailyshotPrice,
        undefined,
        `Unverified price: ${item.id}`,
      );
    if (item.dailyshotPrice && product.scope === "variable-batches")
      assert.equal(item.dailyshotPrice.note, product.note);
  }
});

test("CS approved mappings accept only reviewed ABV labels and keep fixed batches strict", async () => {
  const mappings = JSON.parse(
    await readFile(
      new URL("../scripts/dailyshot-mappings.json", import.meta.url),
      "utf8",
    ),
  );
  for (const item of whiskies.filter((entry) => entry.caskStrength)) {
    const mapping = mappings[item.id];
    if (!mapping) continue;
    if (mapping.sellerRelease) {
      assert.equal(approvedAbvMatches(item, mapping, mapping.sellerRelease.parentAbvLabel), true);
      assert.equal(approvedAbvMatches(item, mapping, "40~60%"), false);
    } else if (mapping.referenceOnly) {
      assert.equal(approvedAbvMatches(item, mapping, mapping.abvLabel), true);
      assert.equal(item.dailyshotPrice, undefined);
    } else if (mapping.variableBatch) {
      assert.equal(
        approvedAbvMatches(item, mapping, mapping.variableBatch.abvLabel),
        true,
      );
      assert.equal(approvedAbvMatches(item, mapping, "40%"), false);
      assert.equal(
        approvedAbvMatches(
          { ...item, caskStrength: false },
          mapping,
          mapping.variableBatch.abvLabel,
        ),
        false,
      );
    } else {
      assert.equal(approvedAbvMatches(item, mapping, `${item.abv}%`), true);
      assert.equal(
        approvedAbvMatches(item, mapping, `${item.abv + 0.1}%`),
        false,
      );
      assert.equal(approvedAbvMatches(item, mapping, "50~65%"), false);
    }
  }
  for (const id of [
    "glenallachie-10-cask-strength-batch-12",
    "tamdhu-batch-strength-006",
    "springbank-12-cask-strength-2026",
    "elijah-craig-barrel-proof-c925",
  ]) {
    const item = whiskies.find((entry) => entry.id === id)!;
    assert.equal(
      approvedAbvMatches(
        item,
        { variableBatch: { abvLabel: "50~65%", note: "Shared listing" } },
        "50~65%",
      ),
      false,
      id,
    );
  }
});
