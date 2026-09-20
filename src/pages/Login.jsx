import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(username, password);
    if (result.success) {
      if (result.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate(`/customers/${result.id}`);
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold text-center text-slate-800">Login</h2>

        {error && <p className="text-xs text-red-500 bg-red-50 p-2 rounded">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-full border p-2 rounded text-sm"
            placeholder="Username (admin or customer)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full border p-2 rounded text-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium transition">
            Sign In
          </button>
        </form>

        <div className="text-[11px] text-slate-500 border-t pt-3 space-y-1">
          <p><strong>Admin:</strong> admin / admin123 (views dashboard)</p>
          <p><strong>Customer:</strong> emilys / emilyspass (views own details)</p>
        </div>
      </div>
    </div>
  );
}