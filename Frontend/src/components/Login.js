import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    try { await login(email, pw); }
    catch { alert('Credenciais inválidas'); }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Password" />
      <button type="submit">Entrar</button>
    </form>
  );
}
