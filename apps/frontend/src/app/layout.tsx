import './global.css';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import { AuthContextProvider } from '@components';
import { Navbar } from '@components';

export const metadata: Metadata = {
  title: 'XD - d',
  description: '123123 ',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <Navbar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
