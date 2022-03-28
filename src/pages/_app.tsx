import type { AppProps } from 'next/app';
import Head from 'next/head';

import Container from 'components/Container';

import '@styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>React Surveyor</title>
      </Head>
      <Container>
        <Component {...pageProps} />
      </Container>
    </div>
  );
}

export default MyApp;
