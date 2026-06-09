import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../features/products/hooks/useProducts";

export function HomePage() {
  const { data: products, isLoading } = useProducts();

  const featuredProducts = useMemo(() => {
    if (!products) {
      return [];
    }

    return [...products].sort(() => Math.random() - 0.5).slice(0, 3);
  }, [products]);

  return (
    <main className="home-page">
      <section className="home-card">
        <div>
          <p className="home-label">Welcome to FakeGames!</p>

          <h1>Games, accessories and more in one place!</h1>

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

      <section>
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/products">View all products</Link>
        </div>

        {isLoading && <p>Loading featured products...</p>}

        <div className="home-featured-products">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
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
