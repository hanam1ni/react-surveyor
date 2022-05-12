import { render } from '@testing-library/react';
import React from 'react';

import Container from 'components/Container';

export const renderPage = (page: React.ReactElement) =>
  render(<Container>{page}</Container>);
