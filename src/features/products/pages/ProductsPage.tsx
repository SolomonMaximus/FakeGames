import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "../../../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/product";

function getProductCategory(product: Product) {
  const name = product.name.toLowerCase();

  if (
    name.includes("baldur") ||
    name.includes("hollow") ||
    name.includes("red dead") ||
    name.includes("stardew") ||
    name.includes("elden") ||
    name.includes("cyberpunk")
  ) {
    return "Games";
  }

  if (name.includes("controller")) {
    return "Controllers";
  }

  if (name.includes("headset") || name.includes("keyboard")) {
    return "Accessories";
  }

  if (name.includes("gift card")) {
    return "Gift Cards";
  }

  return "Other";
}

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromUrl ?? "all",
  );

  const { data: products, isLoading, isError, error } = useProducts();

  const categories = Array.from(
    new Set(products?.map((product) => getProductCategory(product)) || []),
  );

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const productCategory = getProductCategory(product);

    const matchesCategory =
      selectedCategory === "all" || productCategory === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <main>
        <h1>Products</h1>
        <p>Loading products...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main>
        <h1>Products</h1>
        <p>Something went wrong: {error.message}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Products</h1>

      <div className="product-controls">
        <div>
          <label htmlFor="search">Search products</label>
          <input
            id="search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="category">Filter by category</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="all">All categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredProducts?.length === 0 && <p>No products found.</p>}

      <section className="product-grid">
        {filteredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
