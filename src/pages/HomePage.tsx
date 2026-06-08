import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <main className="home-page">
      <section className="home-card">
        <p className="home-label">Welcome to FakeGames!</p>

        <h1>Games, accesories and more in one place!</h1>

        <p className="home-description">
          Explore our wide selection of games, accessories, and more. We have
          something for every gamer.
        </p>

        <Link className="primary-link" to="/products">
          Browse Products
        </Link>
      </section>
    </main>
  );
}
