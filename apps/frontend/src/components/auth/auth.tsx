'use client';

import styles from './auth.module.css';
import { useEffect } from 'react';

const data = fetch('http://localhost:3000/api').then((c) => c.json());

const Auth: FCC = ({children}) => {
  useEffect(() => {
    data.then((v) => {
      console.log(`@@ data from api `, v);
    });
  }, []);

  return (
    <div className={styles['container']}>
      <h1>Welcome to Auth!</h1>
      {children}
    </div>
  );
};

export default Auth;
