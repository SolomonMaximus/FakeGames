import { Link } from "react-router-dom";
import type { Product } from "../features/products/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link className="product-card" to={`/products/${product.id}`}>
      <article>
        <h2>{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="products-price">
          {product.price_cents} {product.currency}
        </p>
        <p className="product-stock">Stock: {product.stock_quantity}</p>
        <span className="product-link"></span>
      </article>
    </Link>
  );
}
