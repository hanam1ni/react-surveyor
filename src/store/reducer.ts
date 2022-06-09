import { Survey } from 'services/survey';
import { UserProfile } from 'services/user';
import { initialStore, StoreType } from 'store';

export enum ACTIONS {
  CLEAR_STORE,
  SET_SURVEYS,
  SET_USER_PROFILE,
}

export type ActionPayloadType =
  | { type: ACTIONS.CLEAR_STORE }
  | {
      type: ACTIONS.SET_SURVEYS;
      value: Survey[];
    }
  | {
      type: ACTIONS.SET_USER_PROFILE;
      value: UserProfile;
    };

export default (store: StoreType, action: ActionPayloadType) => {
  switch (action.type) {
    case ACTIONS.CLEAR_STORE:
      return initialStore;
    case ACTIONS.SET_SURVEYS:
      return { ...store, surveys: action.value };
    case ACTIONS.SET_USER_PROFILE:
      return { ...store, userProfile: action.value };
    default:
      throw new Error('invalid action type');
  }
};
