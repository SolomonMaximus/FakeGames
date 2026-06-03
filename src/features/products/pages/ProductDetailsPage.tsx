import { Link, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";

export function ProductDetailsPage() {
  const { id } = useParams();
  const { data: product, isLoading, isError, error } = useProduct(id);

  if (isLoading) {
    return (
      <main>
        <p>Loading product...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main>
        <p>Something went wrong: {error.message}</p>
        <Link to="/products">Back to products</Link>
      </main>
    );
  }

  if (!product) {
    return (
      <main>
        <p>Product not found.</p>
        <Link to="/products">Back to products</Link>
      </main>
    );
  }

  return (
    <main>
      <Link to="/products">Back to products</Link>

      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <p>
        Price: {product.price_cents} {product.currency}
      </p>

      <p>Stock: {product.stock_quantity}</p>

      <button>Add to cart</button>
    </main>
  );
}
