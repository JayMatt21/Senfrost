import React, { useState, useEffect } from 'react';
import { products, getPrice } from '../../data/products';

const ManageProducts = () => {
  const [selectedCapacities, setSelectedCapacities] = useState({});
  const [selectedPrices, setSelectedPrices] = useState({});

  const changeCapacity = (id, direction) => {
    const product = products.find((p) => p.id === id);
    const index = product.capacities.indexOf(selectedCapacities[id] || product.capacities[0]);
    let newIndex = direction === "next" ? index + 1 : index - 1;
    if (newIndex < 0) newIndex = product.capacities.length - 1;
    if (newIndex >= product.capacities.length) newIndex = 0;

    const selectedSize = product.capacities[newIndex];
    const price = getPrice(product, selectedSize);

    setSelectedCapacities((prev) => ({ ...prev, [id]: selectedSize }));
    setSelectedPrices((prev) => ({ ...prev, [id]: price }));
  };

  useEffect(() => {
    products.forEach((p) => {
      const defaultCap = p.capacities[0];
      const price = getPrice(p, defaultCap);

      setSelectedCapacities((prev) => ({ ...prev, [p.id]: defaultCap }));
      setSelectedPrices((prev) => ({ ...prev, [p.id]: price }));
    });
  }, []);

  return (
    <div className="manage-products">
      <h2>🛍️ Manage Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} width="100" />
            <h4>{product.brand} {product.name}</h4>
            <p>{product.code}</p>
            <div>
              <button onClick={() => changeCapacity(product.id, "prev")}>{"<"}</button>
              <span>{selectedCapacities[product.id]}</span>
              <button onClick={() => changeCapacity(product.id, "next")}>{">"}</button>
            </div>
            <p>₱{selectedPrices[product.id]?.toLocaleString()}</p>
            <button>Edit</button>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageProducts;
