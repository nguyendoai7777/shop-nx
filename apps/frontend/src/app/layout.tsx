import { Metadata } from 'next';
import { ReactNode } from 'react';
import { AuthContextProvider, Navbar } from '@components';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { MuiThemeConfig } from '@utils';
import './global.css';

export const metadata: Metadata = {
  title: 'XD - d',
  description: '123123 ',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-dark text-white">
        <AppRouterCacheProvider options={{ key: 'css', enableCssLayer: true }}>
          <ThemeProvider theme={MuiThemeConfig}>
            <AuthContextProvider>
              <Navbar />
              <div className="min-h-screen bg-gradient-to-br   flex items-center justify-center">
                <div className="w-96 h-64 rounded-xl  text-white">
                  <h1 className="text-2xl font-bold">Liquid Glass</h1>
                  <p className="mt-2">Hiệu ứng giống kính mờ của Apple</p>
                </div>
              </div>
              {children}
            </AuthContextProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
