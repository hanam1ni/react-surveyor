import { useContext, useEffect } from 'react';
import { render, waitFor } from '@testing-library/react';

import { Survey } from 'services/survey';
import { StoreContext, StoreProvider } from 'store';

import { build } from '@support/factory';

describe('StoreProvider', () => {
  it('provides store to the given children', () => {
    const Component = () => {
      const { store } = useContext(StoreContext);

      return (
        <div>
          {store.surveys?.length === 0
            ? 'Empty Survey List'
            : 'Failed to access store'}
        </div>
      );
    };

    const { getByText } = render(
      <StoreProvider>
        <Component />
      </StoreProvider>
    );

    expect(getByText('Empty Survey List')).toBeInTheDocument();
  });

  describe('when action dispatched from the children', () => {
    it('updates store with the given payload', async () => {
      const survey = build('survey') as Survey;

      const Component = () => {
        const { store, dispatchAction } = useContext(StoreContext);

        useEffect(() => {
          dispatchAction({ type: 'setSurveys', value: [survey] });
        }, [dispatchAction]);

        return <div>{store.surveys[0]?.title}</div>;
      };

      const { getByText } = render(
        <StoreProvider>
          <Component />
        </StoreProvider>
      );

      await waitFor(() => expect(getByText(survey.title)).toBeInTheDocument());
    });
  });
});
