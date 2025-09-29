'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../auth-context/auth-context';
import AuthDialog from '../auth/auth';
export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  /*useEffect(() => {
    if (!loading && !user) {
      setShowLogin(true);
    }
  }, [loading]);*/

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
          <button
            onClick={() => setShowLogin(true)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Login
          </button>
        )}
      </div>

      {showLogin && <AuthDialog onClose={() => setShowLogin(false)} />}
    </nav>
  );
}
