import type { CartItem } from "../store/cartStore";

export function calculateCartTotal(items: CartItem[]) {
  return items.reduce(
    (total, item) => total + item.product.price_cents * item.quantity,
    0,
  );
}

export function calculateCartItemCount(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}
