import {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product } from '../types';
import './ProductDetail.css';

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
    <div className='product-detail'>
      <h2>{product.name}</h2>
      <p className='detail-description'>{product.description}</p>
      <p><strong>Pris:</strong> {product.price} kr</p>
      <p><strong>Lagersaldo:</strong> {product.stock} st</p>
      <p><strong>Kategori:</strong> {product.category}</p>

      <Link to="/" className='back-link'>Tillbaka till produkter</Link>
    </div>
  )
}

export default ProductDetail;