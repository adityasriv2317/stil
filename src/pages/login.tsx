'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch, RootState} from '@/store/store';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';

interface User {
  id: number;
  email: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogin = async () => {
    dispatch(loginStart());
    try {
      // Simulate API request
      await new Promise((res) => setTimeout(res, 1000));
      const user: User = { id: 1, email }; // Mock user data
      dispatch(loginSuccess(user));
    } catch (err) {
      dispatch(loginFailure('Invalid credentials'));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {isAuthenticated && <p className="mt-4 text-green-600">You are logged in!</p>}
    </div>
  );
}
