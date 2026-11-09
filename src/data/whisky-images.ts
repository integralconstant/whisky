import images from "./whisky-images.json" with { type: "json" };

export interface WhiskyPhoto {
  path: string;
  imageUrl: string;
  sourceUrl: string;
  productName: string;
  note: string;
  checkedAt: string;
}

export const whiskyImages = images as Record<string, WhiskyPhoto>;
