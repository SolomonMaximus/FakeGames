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
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products">Go to products</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Cart</h1>

      <ul>
        {items.map((item) => (
          <li key={item.product.id}>
            <h2>{item.product.name}</h2>

            <p>
              Price: {item.product.price_cents} {item.product.currency}
            </p>

            <label htmlFor={`quantity-${item.product.id}`}>Quantity</label>
            <input
              id={`quantity-${item.product.id}`}
              type="number"
              min="1"
              value={item.quantity}
              onChange={(event) =>
                updateQuantity(item.product.id, Number(event.target.value))
              }
            />

            <p>
              Subtotal: {item.product.price_cents * item.quantity}{" "}
              {item.product.currency}
            </p>

            <button onClick={() => removeFromCart(item.product.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <h2>Total: {totalPrice} ISK</h2>

      <button onClick={clearCart}>Clear cart</button>

      <div>
        <Link to="/products">Continue shopping</Link>{" "}
        <Link to="/checkout">Go to checkout</Link>
      </div>
    </main>
  );
}
