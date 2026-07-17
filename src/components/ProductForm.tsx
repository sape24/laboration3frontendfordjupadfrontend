import { useState, useEffect } from 'react';
import type { Product, ProductInput } from '../types';

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
    <div>
      <h3>{editingProduct ? 'Redigera produkt' : 'Lägg till produkt'}</h3>

      {error && <p>{error}</p>}

      <div>
        <input placeholder="Namn" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <input placeholder="Beskrivning" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <input placeholder="Pris" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <input placeholder="Lagersaldo" type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
      </div>
      <div>
        <input placeholder="Kategori" value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>

      <button onClick={handleSubmit}>
        {editingProduct ? 'Uppdatera' : 'Skapa'}
      </button>

      {editingProduct && <button onClick={onCancel}>Avbryt</button>}
    </div>
  );
}

export default ProductForm;