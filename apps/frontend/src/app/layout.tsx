import { Metadata } from 'next';
import { ReactNode } from 'react';
import { AuthContextProvider, Navbar } from '@components';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import './global.css';

export const metadata: Metadata = {
  title: 'XD - d',
  description: '123123 ',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ key: 'css', enableCssLayer: true }}>
          <AuthContextProvider>
            <Navbar />
            {children}
          </AuthContextProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
