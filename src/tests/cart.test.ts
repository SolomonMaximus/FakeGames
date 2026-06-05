import { describe, expect, it } from "vitest";
import {
  calculateCartItemCount,
  calculateCartTotal,
} from "../features/cart/utils/cartUtils";
import type { CartItem } from "../features/cart/store/cartStore";

const cartItems: CartItem[] = [
  {
    product: {
      id: "1",
      shop_id: "shop-1",
      name: "Elden Ring",
      slug: "elden-ring",
      description: "Fantasy RPG",
      price_cents: 8990,
      currency: "ISK",
      stock_quantity: 10,
    },
    quantity: 2,
  },
  {
    product: {
      id: "2",
      shop_id: "shop-1",
      name: "Gaming Headset",
      slug: "gaming-headset",
      description: "Gaming headset",
      price_cents: 14990,
      currency: "ISK",
      stock_quantity: 5,
    },
    quantity: 1,
  },
];

describe("cart utils", () => {
  it("calculates the total cart price", () => {
    const total = calculateCartTotal(cartItems);

    expect(total).toBe(32970);
  });

  it("calculates the total number of items", () => {
    const itemCount = calculateCartItemCount(cartItems);

    expect(itemCount).toBe(3);
  });

  it("returns zero for an empty cart", () => {
    expect(calculateCartTotal([])).toBe(0);
    expect(calculateCartItemCount([])).toBe(0);
  });
});
