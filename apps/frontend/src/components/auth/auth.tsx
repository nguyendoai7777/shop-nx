'use client';

import { FormEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../auth-context/auth-context';

export default function AuthDialog({ onClose }: { onClose: () => void }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const ok = await login(username, password);
    if (ok) {
      onClose?.();
    } else {
      setError('Login failed');
    }
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow w-96">
        <h2 className="text-lg font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            className="border px-2 py-1 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border px-2 py-1 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2"
          >
            Login
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-500"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
