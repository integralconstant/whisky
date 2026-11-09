import type { DailyshotPrice } from "./types";
import priceData from "./dailyshot-prices.json" with { type: "json" };

export const dailyshotPrices = priceData as Record<string, DailyshotPrice>;
