import { useState } from "react";
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
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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

      <div>
        <label htmlFor="search"></label>
        <input
          type="text"
          id="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="category">Filter by category</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts?.length === 0 && <p>No products found.</p>}

      <section>
        {filteredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
