import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

export function ProductsPage() {
  const { data: products, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return (
      <main>
        <h1>Products</h1>
        <p>Loading products...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main>
        <h1>Products</h1>
        <p>Something went wrong: {error.message}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Products</h1>

      {products?.length === 0 && <p>No products found.</p>}

      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>
              {product.price_cents} {product.currency}
            </p>
            <p>Stock: {product.stock_quantity}</p>
            <Link to={`/products/${product.id}`}>View product</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
