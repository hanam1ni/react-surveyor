import { render, RenderResult } from '@testing-library/react';
import React from 'react';

import Container from 'components/Container';
import { defaultInitialStore, StoreProvider } from 'store';

type RenderPageInterface = (
  page: React.ReactElement,
  option?: { initialStore?: object }
) => RenderResult;

export const renderPage: RenderPageInterface = (page, { initialStore } = {}) =>
  render(
    <StoreProvider initialStore={{ ...defaultInitialStore, ...initialStore }}>
      <Container>{page}</Container>
    </StoreProvider>
  );
