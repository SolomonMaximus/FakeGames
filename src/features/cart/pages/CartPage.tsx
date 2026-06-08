import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  if (items.length === 0) {
    return (
      <main>
        <section className="card">
          <h1>Cart</h1>
          <p>Your cart is empty.</p>

          <Link className="primary-link" to="/products">
            Go to products
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      <h1>Cart</h1>

      <section className="cart-list">
        {items.map((item) => (
          <article className="cart-item" key={item.product.id}>
            <div>
              <h2>{item.product.name}</h2>

              <p className="muted">
                Price: {item.product.price_cents} {item.product.currency}
              </p>

              <p className="muted">
                Available stock: {item.product.stock_quantity}
              </p>
            </div>

            <div className="cart-actions">
              <label htmlFor={`quantity-${item.product.id}`}>Quantity</label>

              <input
                id={`quantity-${item.product.id}`}
                type="number"
                min="1"
                max={item.product.stock_quantity}
                value={item.quantity}
                onChange={(event) =>
                  updateQuantity(item.product.id, Number(event.target.value))
                }
              />

              <p className="product-price">
                Subtotal: {item.product.price_cents * item.quantity}{" "}
                {item.product.currency}
              </p>

              <button
                type="button"
                onClick={() => removeFromCart(item.product.id)}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="cart-summary">
        <h2>Total: {totalPrice} ISK</h2>

        <div className="button-row">
          <button type="button" onClick={clearCart}>
            Clear cart
          </button>

          <Link className="primary-link" to="/products">
            Continue shopping
          </Link>

          <Link className="primary-link" to="/checkout">
            Go to checkout
          </Link>
        </div>
      </section>
    </main>
  );
}
