import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { LoginType } from "../types";
import './Login.css';

//Inloggningsida som autentiserar mot API och sparar token via context
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {login} = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  //Validerar fälten, loggar in och skickar användaren till admin vid lyckad inloggning
  const handleSubmit = async () => {
    if (!username || !password) {
      setError('Fyll i både användarnamn och lösenord');
      return;
    }

    setError('');

    try {
      const res = await fetch(`${API_URL}/login`, {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password})
      });

      if(!res.ok) {
        throw new Error('Fel användarnamn eller lösenord');
      }

      //Sparar token och användarnamn via context, navigerar sedan till admin
      const data: LoginType = await res.json();
      login(data.token, data.username);
      navigate('/admin');
    } catch (err) {
      setError('Inloggning misslyckades. Försök igen')
      console.error(err)
    }
  }

  return(
    <div className="login-form">
      <h2>Logga in</h2>

      {error && <p className="error">{error}</p>}

      <div className="form-group">
        <label>Användarnamn:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
      </div>

      <div className="form-group">
        <label>Lösenord:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>

      <button onClick={handleSubmit}>Logga in</button>
    </div>
  )
}

export default Login;