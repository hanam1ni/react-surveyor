import type { AppProps } from 'next/app';
import Head from 'next/head';

import Container from 'components/Container';
import { StoreProvider } from 'store';

import '@styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>React Surveyor</title>
      </Head>
      <Container>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </Container>
    </>
  );
}

export default MyApp;
