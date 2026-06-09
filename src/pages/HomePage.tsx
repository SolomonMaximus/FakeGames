import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <main className="home-page">
      <section className="home-card">
        <div>
          <p className="home-label">Welcome to FakeGames!</p>

          <h1>Games, accesories and more in one place!</h1>

          <p className="home-description">
            Explore our wide selection of games, accessories, and more. We have
            something for every gamer.
          </p>

          <div className="home-buttons">
            <Link className="primary-link" to="/products">
              Browse Products
            </Link>

            <Link className="secondary-link" to="register">
              Create account
            </Link>
          </div>
        </div>

        <div className="home-preview-card">
          <p className="home-preview-label">Featured</p>
          <h2>FakeGames Store</h2>
          <p>Games, controllers, keyboards, headsets and gift cards.</p>
        </div>
      </section>

      <section className="home-features">
        <article className="home-feature">
          <h2>Shop products</h2>
          <p>Search and filter games, accessories, and gift cards.</p>
        </article>

        <article className="home-feature">
          <h2>Use the cart</h2>
          <p>Add products, change quantities, and remove items.</p>
        </article>

        <article className="home-feature">
          <h2>Fake checkout</h2>
          <p>Place a fake order</p>
        </article>
      </section>

      <section className="home-categories">
        <h2>Popular categories</h2>

        <div className="category-list">
          <Link to="/products?category=Games">Games</Link>
          <Link to="/products?category=Accessories">Accessories</Link>
          <Link to="/products?category=Controllers">Controllers</Link>
          <Link to="/products?category=Gift Cards">Gift cards</Link>
        </div>
      </section>
    </main>
  );
}
