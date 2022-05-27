import { Survey } from 'services/survey';
import { StoreType } from 'store';

export enum ACTIONS {
  SET_SURVEYS,
}

export type ActionPayloadType = {
  type: ACTIONS.SET_SURVEYS;
  value: Survey[];
};

export default (store: StoreType, action: ActionPayloadType) => {
  switch (action.type) {
    case ACTIONS.SET_SURVEYS:
      return { ...store, surveys: action.value };
    default:
      throw new Error('invalid action type');
  }
};
