'use client';

import { useEffect, useState } from 'react';
import { fetchUserDetail } from '../server-actions';
import { UserInfoByJWT } from '@shop/dto';

export const UserProfile: FCC = () => {
  const [user, setUsers] = useState<UserInfoByJWT>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleLoadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUserDetail(); // gọi server action
      console.log(`@@ data SA`, data);
      setUsers(data.data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void handleLoadUsers();
  }, []);
  return (
    <>
      <h1>{user?.name}</h1>
      <div>Email: {user?.email}</div>
    </>
  );
};
