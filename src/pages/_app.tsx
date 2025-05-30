import type { AppProps } from "next/app";
import { StoreProvider } from "@/store/StoreProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "@/app/globals.css";
import "@/styles/fonts.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <GoogleOAuthProvider clientId="<your_client_id>">
        <Component {...pageProps} />
      </GoogleOAuthProvider>
    </StoreProvider>
  );
}
