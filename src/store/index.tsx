import { createContext, ReactNode, useReducer } from 'react';

import { Survey } from 'services/survey';

interface StoreContextType {
  store: {
    surveys: Survey[];
  };
  dispatchAction: any;
}

const initialStore = {
  surveys: [],
};

const reducer = (store: any, action: { type: string; value: any }) => {
  switch (action.type) {
    case 'setSurveys':
      return { ...store, surveys: action.value };
    default:
      throw new Error('invalid action type');
  }
};

export const StoreContext = createContext<StoreContextType>(
  {} as StoreContextType
);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [store, dispatchAction] = useReducer(reducer, initialStore);

  return (
    <StoreContext.Provider value={{ store, dispatchAction }}>
      {children}
    </StoreContext.Provider>
  );
};
