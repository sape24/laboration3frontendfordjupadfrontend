import { useState, useEffect } from 'react';
import type { Product, ProductInput } from '../types';
import './ProductForm.css';

interface ProductFormProps {
  onSubmit: (product: ProductInput) => Promise<void>;
  editingProduct: Product | null;
  onCancel: () => void;
}

function ProductForm({ onSubmit, editingProduct, onCancel }: ProductFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setDescription(editingProduct.description);
      setPrice(String(editingProduct.price));
      setStock(String(editingProduct.stock));
      setCategory(editingProduct.category);
    } else {    
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setCategory('');
    }
  }, [editingProduct]);

  const handleSubmit = async () => {
    if (name.trim().length < 2) {
      setError('Produktnamn måste vara minst 2 tecken');
      return;
    }

    setError('');
    await onSubmit({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      category,
    });

    if (!editingProduct) {
        setName('');
        setDescription('');
        setPrice('');
        setStock('');
        setCategory('');
    }
  };

  return (
    <div className='product-form'>
      <h3>{editingProduct ? 'Redigera produkt' : 'Lägg till produkt'}</h3>

        {error && <p className='error'>{error}</p>}

        <div className='form-group'>
            <label>Namn</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className='form-group'>
            <label>Beskrivning</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className='form-group'>
            <label>Pris</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div className='form-group'>
            <label>Lagersaldo</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
        </div>

        <div className='form-group'>
            <label>Kategori</label>
            <input value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>

        <div className='form-buttons'>
            <button onClick={handleSubmit}>
                {editingProduct ? 'Uppdatera' : 'Skapa'}
            </button>
            {editingProduct && <button onClick={onCancel} className='cancel-button'>Avbryt</button>}
        </div>
    </div>
  );
}

export default ProductForm;