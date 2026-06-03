import { supabase } from "../../../lib/supabase";
import type { Product } from "../types/product";

const SHOP_ID = "3c9a5243-6ec2-4b19-82f1-d63b7830a608";

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("shop_id", SHOP_ID)
    .order("name");

  if (error) {
    throw new Error(error.message);
  }

  return data as Product[];
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("shop_id", SHOP_ID)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Product;
}
