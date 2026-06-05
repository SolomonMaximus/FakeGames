import { create } from "zustand";
import { calculateCartItemCount, calculateCartTotal } from "../utils/cartUtils";
import type { Product } from "../../products/types/product";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (product) => {
    const items = get().items;
    const existingItem = items.find((item) => item.product.id === product.id);

    if (existingItem) {
      set({
        items: items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      });

      return;
    }

    set({
      items: [...items, { product, quantity: 1 }],
    });
  },

  removeFromCart: (productId) => {
    set({
      items: get().items.filter((item) => item.product.id !== productId),
    });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }

    set({
      items: get().items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    });
  },

  clearCart: () => {
    set({ items: [] });
  },

  getTotalPrice: () => {
    return calculateCartTotal(get().items);
  },

  getTotalItems: () => {
    return calculateCartItemCount(get().items);
  },
}));
