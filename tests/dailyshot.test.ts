import { test } from "node:test";
import assert from "node:assert/strict";
import { dailyshotPrices } from "../src/data/dailyshot-prices.ts";
import { whiskies } from "../src/data/whiskies.ts";

test("price snapshots retain auditable offers and correctly rounded averages", () => {
  const byId = new Map(whiskies.map((item) => [item.id, item]));
  assert.ok(
    Object.keys(dailyshotPrices).length > 0,
    "No verified prices collected",
  );
  for (const [id, price] of Object.entries(dailyshotPrices)) {
    assert.ok(byId.has(id), `Unknown whisky ID: ${id}`);
    assert.deepEqual(byId.get(id)?.dailyshotPrice, price);
    assert.equal(price.currency, "KRW");
    assert.ok(Number.isFinite(price.volumeMl) && price.volumeMl > 0);
    assert.ok(Number.isFinite(Date.parse(price.checkedAt)));
    assert.equal(price.sampleCount, price.offers.length, id);
    assert.ok(price.sampleCount > 0);
    assert.equal(
      new Set(price.offers.map((offer) => offer.url)).size,
      price.sampleCount,
      `${id}: duplicate offers`,
    );

    for (const offer of price.offers) {
      assert.ok(Number.isFinite(offer.price) && offer.price > 0);
      assert.ok(offer.seller.trim());
    }
    for (const link of [
      price.sourceUrl,
      ...price.offers.map((offer) => offer.url),
    ]) {
      const url = new URL(link);
      assert.equal(url.protocol, "https:");
      assert.ok(
        url.hostname === "dailyshot.co" ||
          url.hostname.endsWith(".dailyshot.co"),
      );
    }
    const amounts = price.offers.map((offer) => offer.price);
    assert.equal(
      price.average,
      Math.round(
        amounts.reduce((sum, value) => sum + value, 0) / amounts.length,
      ),
      id,
    );
    assert.equal(price.min, Math.min(...amounts), id);
    assert.equal(price.max, Math.max(...amounts), id);
  }
});
