import { createContext, Dispatch, ReactNode, useReducer } from 'react';

import reducer, { ACTIONS, ActionPayloadType } from './reducer';
import { Survey, SurveyDetail } from 'services/surveyInterfaces';
import { UserProfile } from 'services/user';
import { BatchInfo } from 'utils/pagination';

export interface StoreType {
  currentSurvey: SurveyDetail | null;
  surveys: {
    data: Survey[];
    batchInfo: BatchInfo;
  };

  userProfile: UserProfile | null;
}

interface StoreContextType {
  store: StoreType;
  dispatchAction: Dispatch<ActionPayloadType>;
}

interface StoreProviderProps {
  children: ReactNode;
  initialStore?: StoreType;
}

export const defaultInitialStore = {
  currentSurvey: null,
  surveys: {
    data: [],
    batchInfo: { batch: 1, totalBatches: 1, batchSize: 5, totalRecords: 0 },
  },
  userProfile: null,
};

export const StoreContext = createContext<StoreContextType>(
  {} as StoreContextType
);

export const StoreProvider = ({
  children,
  initialStore,
}: StoreProviderProps) => {
  const [store, dispatchAction] = useReducer(
    reducer,
    initialStore || defaultInitialStore
  );

  return (
    <StoreContext.Provider value={{ store, dispatchAction }}>
      {children}
    </StoreContext.Provider>
  );
};

export { ACTIONS };
