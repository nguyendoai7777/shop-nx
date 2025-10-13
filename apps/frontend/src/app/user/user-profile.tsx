'use client';

import { useEffect } from 'react';
import { ResponseBase } from '@shop/type';
import { httpResource } from '@core/http';
import { HttpClient } from '@client/utils';

export const UserProfile = () => {
  const handleLoadUsers = async () => {
    httpResource<ResponseBase<any>>(HttpClient.get(`/user/current`)).subscribe({
      error(err) {
        console.log(`@@ {} user error`, err);
      },
      next(data) {
        console.log(`@@ {} user data`, data);
      },
      origin(response) {
        console.log(`@@ {} origin`, response);
      },
    });

    httpResource<ResponseBase<any>>(HttpClient.get(`/user/current`)).subscribe(
      (data) => {
        console.log(`@@ _,_,_ user data`, data);
      },
      (err) => {
        console.log(`@@ _,_,_ user error`, err);
      },
      (response) => {
        console.log(`@@ _,_,_ origin`, response);
      }
    );
  };

  useEffect(() => {
    void handleLoadUsers();
  }, []);
  return (
    <>
      <h1> ?? </h1>
      <div>Email</div>
    </>
  );
};
