import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useCartStore } from "../../cart/store/cartStore";

export function ProductDetailsPage() {
  const { id } = useParams();
  const { data: product, isLoading, isError, error } = useProduct(id);

  const items = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);

  const [cartMessage, setCartMessage] = useState("");

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

  const cartItem = items.find((item) => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock_quantity <= 0;
  const hasReachedStockLimit = quantityInCart >= product.stock_quantity;

  function handleAddToCart() {
    if (!product) {
      setCartMessage("Product not found.");
      return;
    }
    if (isOutOfStock) {
      return;
    }

    if (hasReachedStockLimit) {
      setCartMessage("You have reached the maximum quantity for this product.");
      return;
    }

    addToCart(product);
    setCartMessage("Product added to cart!");
  }

  return (
    <main>
      <Link className="back-link" to="/products">
        ← Back to products
      </Link>
      <section className="product-details-card">
        <div>
          <p className="product-details-label">Product details</p>

          <h1>{product.name}</h1>

          <p className="product-details-description">{product.description}</p>
        </div>

        <div className="product-details-info">
          <p className="product-details-price">
            {product.price_cents} {product.currency}
          </p>

          <p>Stock: {product.stock_quantity}</p>

          <p>In cart: {quantityInCart}</p>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock || hasReachedStockLimit}
          >
            Add to cart
          </button>

          {cartMessage && <p className="success-message">{cartMessage}</p>}
        </div>
      </section>
    </main>
  );
}
