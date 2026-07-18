import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Admin from './pages/Admin';
import './App.css'
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

//Sätter upp routing och delar authtillståndet via authprovider
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Alla sidor delar samma layout med navmenyn */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="login" element={<Login />} />
            {/* Admin skyddas av protectedroute */}
            <Route path="admin" element={<ProtectedRoute><Admin /></ProtectedRoute>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
