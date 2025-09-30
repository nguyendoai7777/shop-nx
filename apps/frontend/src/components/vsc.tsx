'use client';
import { useEffect } from 'react';
import { useAuth } from './auth-context/auth-context';

export function VSC() {
  const { user, loading } = useAuth();
  useEffect(() => {
  }, []);
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div>Static</div>
      <div>test rerender with user {user?.name}</div>
    </div>
  );
}
