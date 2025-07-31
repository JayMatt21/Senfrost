import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AddProduct.css';

const AddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    brand: '',
    code: '',
    capacities: '',
    price: '',
    image: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('New Product:', form);

  };

  return (
    <div className="add-product">
      <Link to="/admin/products">← Back to Manage Products</Link>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
        <input name="brand" placeholder="Brand" value={form.brand} onChange={handleChange} required />
        <input name="code" placeholder="Product Code" value={form.code} onChange={handleChange} required />
        <input name="capacities" placeholder="Capacities (comma-separated)" value={form.capacities} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Base Price" value={form.price} onChange={handleChange} required />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required />
        <button type="submit">Save Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
