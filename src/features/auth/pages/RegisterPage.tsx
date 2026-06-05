import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../lib/supabase";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Account created.You are now logged in.");
    setEmail("");
    setPassword("");
  }

  return (
    <main>
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit">Create account</button>
      </form>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      {!message && (
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      )}
    </main>
  );
}
