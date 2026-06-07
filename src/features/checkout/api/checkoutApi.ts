import supabase from "../../../lib/supabaseClient";
import type { CartItem } from "../../cart/store/cartStore";

const SHOP_ID = "3c9a5243-6ec2-4b19-82f1-d63b7830a608";

export async function reduceStockAfterCheckout(cartItems: CartItem[]) {
  for (const item of cartItems) {
    const newStockQuantity = item.product.stock_quantity - item.quantity;

    if (newStockQuantity < 0) {
      throw new Error(`Not enough stock for product ${item.product.name}`);
    }

    const { error } = await supabase
      .from("products")
      .update({ stock_quantity: newStockQuantity })
      .eq("id", item.product.id)
      .eq("shop_id", SHOP_ID);

    if (error) {
      throw new Error(
        `Error updating stock for product ${item.product.name}: ${error.message}`,
      );
    }
  }
}
