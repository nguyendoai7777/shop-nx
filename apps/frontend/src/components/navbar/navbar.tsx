'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../auth-context/auth-context';
import AuthDialog from '../auth/auth';
export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleAuthMode = (register: boolean) => {
    setShowLogin(true);
    setIsRegisterMode(register);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100">
      <div className="font-bold">DonateApp</div>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <span>Hello, {user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => handleAuthMode(false)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Login
            </button>
            <button
              onClick={() => handleAuthMode(true)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Register
            </button>
          </>
        )}
      </div>

      {showLogin && <AuthDialog isRegister={isRegisterMode} onClose={() => setShowLogin(false)} />}
    </nav>
  );
}
