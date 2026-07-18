import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types";
import './Products.css';

//Publik sida som listar alla produkter
function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  //Hämtar alla produkter från API
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

  //Hämtar produkter en gång när sidan laddas
  useEffect(() => {
    getProducts();
  }, []);

  if (loading) return <p>Laddar...</p>
  if (error) return <p>{error}</p>
  
  return (
    <div>
      <h2>Produkter</h2>
      <ul className="product-list">
        {/* Varje produkt har en länk till sin detaljsida lågt lager för egen klass för att markeras i rött med css */}
        {products.map((product) => (
          <li key={product._id} className="product-card">
            <Link to={`/products/${product._id}`} className="product-name">{product.name}</Link>
            <span className="product-price">{product.price} kr</span>
            <span className={product.stock < 5 ? 'product-stock low' : 'product-stock'}>{product.stock} i lager</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;