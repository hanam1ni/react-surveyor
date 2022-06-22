import { useContext, useEffect } from 'react';
import { render, waitFor } from '@testing-library/react';

import { Survey } from 'services/surveyInterfaces';
import { ACTIONS, StoreContext, StoreProvider } from 'store';

import { build } from '@support/factory';

describe('StoreProvider', () => {
  it('provides store to the given children', () => {
    const Component = () => {
      const { store } = useContext(StoreContext);

      return (
        <div>
          {store.surveys?.data.length === 0
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
          dispatchAction({
            type: ACTIONS.SET_SURVEYS,
            value: {
              data: [survey],
              pageInfo: { currentPage: 1, totalPages: 2 },
            },
          });
        }, [dispatchAction]);

        return <div>{store.surveys.data[0]?.title}</div>;
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
