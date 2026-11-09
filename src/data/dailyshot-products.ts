import type { DailyshotProduct } from "./types.ts";
import productData from "./dailyshot-products.json" with { type: "json" };

export const dailyshotProducts = productData as Record<
  string,
  DailyshotProduct
>;
