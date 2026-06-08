import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../cart/store/cartStore";
import { reduceStockAfterCheckout } from "../api/checkoutApi";
import {
  createFakeOrderNumber,
  validateCheckoutForm,
  type CheckoutForm,
} from "../utils/checkoutUtils";

export function CheckoutPage() {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const [form, setForm] = useState<CheckoutForm>({
    fullName: "",
    email: "",
    address: "",
    paymentMethod: "fake-card",
  });

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setError("");

    if (items.length === 0) {
      setError("Your cart is empty");
      return;
    }

    const validationError = validateCheckoutForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await reduceStockAfterCheckout(items);

      const orderNumber = createFakeOrderNumber();

      clearCart();

      navigate(`/order-success?order=${orderNumber}`);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong during checkout");
      }
    }
  }

  return (
    <main>
      <section className="form-card">
        <h1>Checkout</h1>

        <p className="muted">
          This is a fake checkout. No real payment will be taken.
        </p>

        {error && <p className="error-message">{error}</p>}

        <form className="form-layout" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              type="text"
              value={form.fullName}
              onChange={(event) =>
                setForm({ ...form, fullName: event.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              value={form.address}
              onChange={(event) =>
                setForm({ ...form, address: event.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="paymentMethod">Fake payment method</label>
            <select
              id="paymentMethod"
              value={form.paymentMethod}
              onChange={(event) =>
                setForm({ ...form, paymentMethod: event.target.value })
              }
            >
              <option value="fake-card">Fake card</option>
              <option value="cash-on-delivery">Cash on delivery</option>
              <option value="gift-card">Gift card</option>
            </select>
          </div>

          <p className="product-price">Total: {totalPrice} ISK</p>

          <button type="submit">Place fake order</button>
        </form>
      </section>
    </main>
  );
}
