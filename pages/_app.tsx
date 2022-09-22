import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { FilterContextProvider } from "../context/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FilterContextProvider>
      <Component {...pageProps} />
    </FilterContextProvider>
  );
}

export default MyApp
