import { Link } from "react-router-dom";
import { useCartStore } from "../features/cart/store/cartStore";

export function Navbar() {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header>
      <nav>
        <Link to="/">FakeGames</Link> <Link to="/products">Products</Link>{" "}
        <Link to="/cart">Cart ({totalItems})</Link>{" "}
        <Link to="/login">Login</Link> <Link to="/register">Register</Link>
      </nav>
    </header>
  );
}
