import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  const getProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);

      if (!res.ok) {
        throw new Error('Kunde inte hämta produkter');
      }

      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError('Något gick fel vid hämtning av produkter');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) return <p>Laddar...</p>
  if (error) return <p>{error}</p>
  
  return (
    <div>
      <h2>Produkter</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <Link to={`/products/${product._id}`}>{product.name}</Link>
            {' - '}
            {product.price} kr ({product.stock} i lager)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;