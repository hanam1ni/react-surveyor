import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Container from 'components/Container';
import { StoreProvider } from 'store';

import '@styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>React Surveyor</title>
      </Head>
      <Container>
        <StoreProvider>
          <Component {...pageProps} key={router.asPath} />
        </StoreProvider>
      </Container>
    </>
  );
}

export default MyApp;
