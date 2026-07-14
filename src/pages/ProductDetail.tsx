import {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product } from '../types';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL;

  const getProduct = async () => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`);

      if (!res.ok) {
        throw new Error('Kunde inte hämta produkten');
      }

      const data = await res.json();
      setProduct(data);
    } catch (err) {
      setError('Produkten kunde inte hittas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (loading) return <p>Laddar...</p>
  if (error) return <p>{error}</p>
  if (!product) return <p>Produkten hittades inte</p>
  
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Pris: {product.price} kr</p>
      <p>Lagersaldo: {product.stock} st</p>
      <p>Kategori: {product.category}</p>

      <Link to="/">Tillbaka till produkter</Link>
    </div>
  )
}

export default ProductDetail;