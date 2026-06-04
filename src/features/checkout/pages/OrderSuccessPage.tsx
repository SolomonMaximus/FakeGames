import { Link, useSearchParams } from "react-router-dom";

export function OrderSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <main>
      <h1>Order confirmed</h1>

      <p>Your fake order has been completed.</p>

      {orderNumber && <p>Order number: {orderNumber}</p>}

      <Link to="/products">Continue shopping</Link>
    </main>
  );
}
