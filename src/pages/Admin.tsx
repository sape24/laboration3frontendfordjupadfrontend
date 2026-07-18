import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ProductForm from '../components/ProductForm';
import type { Product, ProductInput } from '../types';
import './Admin.css';

function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [error, setError] = useState('');

  const { token } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL;

  const getProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) throw new Error('Kunde inte hämta produkter');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError('Kunde inte hämta produkter');
      console.error(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSubmit = async (productData: ProductInput) => {
    try {
      if (editingProduct) {
        const res = await fetch(`${API_URL}/products/${editingProduct._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productData),
        });

        if (!res.ok) throw new Error('Kunde inte uppdatera produkt');

        const updated = await res.json();
        setProducts(products.map((p) => (p._id === updated._id ? updated : p)));
        setEditingProduct(null);
      } else {
        const res = await fetch(`${API_URL}/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productData),
        });

        if (!res.ok) throw new Error('Kunde inte skapa produkt');

        const newProduct = await res.json();
        setProducts([newProduct, ...products]);
      }
      setError('');
    } catch (err) {
      setError('Något gick fel när produkten skulle sparas');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Kunde inte ta bort produkt');

      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      setError('Kunde inte ta bort produkt');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Administration</h2>

      {error && <p className='error'>{error}</p>}

      <ProductForm
        onSubmit={handleSubmit}
        editingProduct={editingProduct}
        onCancel={() => setEditingProduct(null)}
      />

      <h3>Produkter</h3>
      <ul className='admin-list'>
        {products.map((product) => (
          <li key={product._id} className='admin-item'>
            <span className='admin-item-info'>
              {product.name} – {product.price} kr ({product.stock} st)
            </span>
            <div className='admin-item-buttons'>
              <button onClick={() => setEditingProduct(product)} className='edit-button'>Redigera</button>
              <button onClick={() => handleDelete(product._id)} className='delete-button'>Ta bort</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;