import { Link } from "react-router-dom";
import type { Product } from "../features/products/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article>
      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <p>
        {product.price_cents} {product.currency}
      </p>

      <p>Stock: {product.stock_quantity}</p>

      <Link to={`/products/${product.id}`}>View product</Link>
    </article>
  );
}
