import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { useCartStore } from "../features/cart/store/cartStore";
import { supabase } from "../lib/supabase";

export function Navbar() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <header>
      <nav>
        <Link to="/">FakeGames</Link> <Link to="/products">Products</Link>{" "}
        <Link to="/cart">Cart ({totalItems})</Link>{" "}
        {user ? (
          <>
            <span>{user.email}</span>{" "}
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
