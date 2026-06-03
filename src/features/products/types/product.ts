export type Product = {
  id: string;
  shop_id: string;
  name: string;
  slug: string;
  description: string | null;
  price_cents: number;
  currency: string;
  stock_quantity: number;
};
