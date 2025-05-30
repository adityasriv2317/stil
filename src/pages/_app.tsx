import type { AppProps } from 'next/app';
import { StoreProvider } from '@/store/StoreProvider';
import '@/app/globals.css'; // Import global styles if needed

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}