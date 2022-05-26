import { render } from '@testing-library/react';
import React from 'react';

import Container from 'components/Container';
import { StoreProvider } from 'store';

export const renderPage = (page: React.ReactElement) =>
  render(
    <StoreProvider>
      <Container>{page}</Container>
    </StoreProvider>
  );
