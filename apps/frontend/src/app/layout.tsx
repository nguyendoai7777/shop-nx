import { Metadata } from 'next';
import { ReactNode } from 'react';
import { AuthContextProvider, Navbar } from '@components';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { MuiThemeConfig } from '@server/utils';
import './global.css';
import 'overlayscrollbars/overlayscrollbars.css';
import { BodyScrollbarInitializer } from './scrollbar-initializer';
import { ToastProvider } from '../components/toast/toast-provider';

export const metadata: Metadata = {
  title: 'XD - d',
  description: '123123 ',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-dark text-white px-4" data-overlayscrollbars-initialize>
        <BodyScrollbarInitializer />
        <AppRouterCacheProvider options={{ key: 'css', enableCssLayer: true }}>
          <ThemeProvider theme={MuiThemeConfig}>
            <AuthContextProvider>
              <Navbar />
              {children}
            </AuthContextProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
