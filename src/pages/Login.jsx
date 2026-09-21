import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [role, setRole] = useState('user');
  const [loginid, setLoginid] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(loginid, password,role);
    if (result.success) {
      if (role === 'admin') {
        navigate('/dashboard');
      } else {
        console.log(result);
        navigate(`/customerdashboard/${result.id}`);
      }
    } else {
      setError(result.message);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 text-amber-50">
      <div className='flex flex-col justify-center items-center gap-8 bg-slate-800 p-12 rounded-xl '>
        <div className='flex flex-col justify-center items-center'>
          <div className='text-3xl font-bold'>Welcome back!</div>
          <div className='text-xl text-slate-300'>Login to your account</div>
        </div>
        <div className='flex gap-2 justify-center items-center'>
          <button
            onClick={() => setRole('user')}
            className={`px-6 py-3 rounded-lg font-semibold cursor-pointer ${role === 'user'
            ? 'bg-slate-600 text-slate-100'
            : 'bg-slate-700 text-slate-300'
            }`}
        >
          Customer
        </button>

        <button
          onClick={() => setRole('admin')}
          className={`px-6 py-3 rounded-lg font-semibold cursor-pointer ${role === 'admin'
            ? 'bg-slate-600 text-slate-100'
            : 'bg-slate-700 text-slate-300'
            }`}
        >
          Admin
        </button>
        </div>

        {/* login form */}
        <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-4'>
          <label htmlFor='loginid'>Login Id</label>
          <input
            type='number'
            placeholder='Enter your login id'
            value={loginid}
            onChange={(e) => setLoginid(e.target.value)}
            className='px-6 py-3 rounded-lg font-semibold cursor-pointer border border-slate-500'
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='px-6 py-3 rounded-lg font-semibold cursor-pointer border border-slate-500'
          />
          <div>
            {error && <div className='text-red-500'>{error}</div>}
          </div>
          <button
            type='submit'
            className='px-6 py-3 rounded-lg font-semibold cursor-pointer border border-slate-500'
          >
            {loading ? 'Please wait' : `Login as ${role}`}
          </button>
        </form>



      </div>
    </div>
  );
}