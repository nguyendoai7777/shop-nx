import { Metadata } from 'next';
import { ReactNode } from 'react';
import { AuthContextProvider, Navbar } from '@components';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { MuiThemeConfig } from '@server/utils';
import 'overlayscrollbars/overlayscrollbars.css';
import { BodyScrollbarInitializer } from './scrollbar-initializer';
import { ToastProvider } from '../components/toast/toast-provider';
import './global.css';

export const metadata: Metadata = {
  title: 'XD - d',
  description: '123123 ',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-dark text-white px-4" data-overlayscrollbars-initialize>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={MuiThemeConfig}>
            <AuthContextProvider>
              <BodyScrollbarInitializer />
              <ToastProvider />
              <Navbar />
              {children}
            </AuthContextProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
