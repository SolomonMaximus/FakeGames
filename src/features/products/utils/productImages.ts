import type { Product } from "../types/product";

export function getProductImage(product: Product) {
  const name = product.name.toLowerCase();

  if (name.includes("baldur")) {
    return "/product-images/baldurs-gate-3.jpg";
  }

  if (name.includes("hollow")) {
    return "/product-images/hollow-knight.jpg";
  }

  if (name.includes("red dead")) {
    return "/product-images/red-dead-redemption-2.jpg";
  }

  if (name.includes("stardew")) {
    return "/product-images/stardew-valley.jpg";
  }

  if (name.includes("elden")) {
    return "/product-images/elden-ring.jpg";
  }

  if (name.includes("cyberpunk")) {
    return "/product-images/cyberpunk-2077.jpg";
  }

  if (name.includes("controller")) {
    return "/product-images/xbox-controller.jpg";
  }

  if (name.includes("headset")) {
    return "/product-images/gaming-headset.jpg";
  }

  if (name.includes("keyboard")) {
    return "/product-images/rgb-keyboard.jpg";
  }

  if (name.includes("gift card")) {
    return "/product-images/gift-card.jpg";
  }

  return "/product-images/placeholder.jpg";
}
