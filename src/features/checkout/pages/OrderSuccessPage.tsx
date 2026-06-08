import { Link, useSearchParams } from "react-router-dom";

export function OrderSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <main>
      <section className="form-card">
        <h1>Order confirmed</h1>

        <p className="success-message">Your fake order has been completed.</p>

        {orderNumber && <p>Order number: {orderNumber}</p>}

        <Link className="primary-link" to="/products">
          Continue shopping
        </Link>
      </section>
    </main>
  );
}
