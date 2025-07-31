import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { products } from "../../data/Products";
import "./pricing.css";

export default function Pricing() {
  const [filters, setFilters] = useState({ sizes: [], types: [] });
  const [selectedCapacities, setSelectedCapacities] = useState({});
  const [selectedPrices, setSelectedPrices] = useState({});
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const toggleFilter = (key, value) => {
    setFilters((prev) => {
      const arr = prev[key];
      const newArr = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      return { ...prev, [key]: newArr };
    });
  };

  const updatePrice = (product, selectedSize) => {
    let price = 0;

    if (product.brand.includes("AUX")) {
      switch (selectedSize) {
        case "1.0HP":
          price = 22499;
          break;
        case "1.5HP":
          price = 24999;
          break;
        case "2.0HP":
          price = 31999;
          break;
        case "2.5HP":
          price = 40499;
          break;
        case "3.0HP":
          price = 45999;
          break;
        default:
          price = 0;
      }
    } else if (product.brand.includes("TCL")) {
      switch (selectedSize) {
        case "1.0HP":
          price = 21499;
          break;
        case "1.5HP":
          price = 22499;
          break;
        case "2.0HP":
          price = 28499;
          break;
        case "2.5HP":
          price = 32500;
          break;
        default:
          price = 0;
      }
    }

    setSelectedPrices((prev) => ({ ...prev, [product.id]: price }));
  };

  const changeCapacity = (id, direction) => {
    setSelectedCapacities((prev) => {
      const product = products.find((p) => p.id === id);
      const index =
        product.capacities.indexOf(prev[id] || product.capacities[0]);
      let newIndex = direction === "next" ? index + 1 : index - 1;
      if (newIndex < 0) newIndex = product.capacities.length - 1;
      if (newIndex >= product.capacities.length) newIndex = 0;

      const selectedSize = product.capacities[newIndex];
      updatePrice(product, selectedSize);

      return { ...prev, [id]: selectedSize };
    });
  };

  useEffect(() => {
    products.forEach((p) => {
      const defaultCap = p.capacities[0];
      updatePrice(p, defaultCap);
    });
  }, []);

  const filteredProducts = products.filter((p) => {
    const sizeMatch =
      filters.sizes.length === 0 ||
      filters.sizes.some((size) => p.capacities.includes(size));
    const typeMatch =
      filters.types.length === 0 || filters.types.includes(p.type);
    return sizeMatch && typeMatch;
  });

  const handleAddToCart = (product) => {
    const capacity = selectedCapacities[product.id] || product.capacities[0];
    const price = selectedPrices[product.id] || "";
    addToCart({ ...product, selectedCapacity: capacity, price: price });
    navigate("/checkout");
  };

  return (
    <section id="pricing" className="pricing-page">
      <aside className="filters">
        <h4>Size</h4>
        {["1.0HP", "1.5HP", "2.0HP", "2.5HP"].map((size) => (
          <label key={size}>
            <input
              type="checkbox"
              checked={filters.sizes.includes(size)}
              onChange={() => toggleFilter("sizes", size)}
            />{" "}
            {size}
          </label>
        ))}

        <h4>Products</h4>
        {[
          "Split Wall-mounted",
          "Portable Aircon",
          "Floor Standing",
          "Window Type",
          "Light Commercial",
        ].map((type) => (
          <label key={type}>
            <input
              type="checkbox"
              checked={filters.types.includes(type)}
              onChange={() => toggleFilter("types", type)}
            />{" "}
            {type}
          </label>
        ))}
      </aside>

      <section className="products-grid">
        {filteredProducts.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={p.image} alt={p.name} />
            <div className="capacity-selector">
              <button onClick={() => changeCapacity(p.id, "prev")}>{"<"}</button>
              <span>{selectedCapacities[p.id] || p.capacities[0]}</span>
              <button onClick={() => changeCapacity(p.id, "next")}>{">"}</button>
            </div>
            <h5>
              {p.brand} {p.name}
            </h5>
            <p>{p.code}</p>
            <p className="product-price">
              ₱{selectedPrices[p.id]?.toLocaleString() || "Select a capacity"}
            </p>
            <ul>
              {p.features.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
            <button className="learn-more-btn">Learn more</button>
            <button className="checkout-btn" onClick={() => handleAddToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </section>
    </section>
  );
}
