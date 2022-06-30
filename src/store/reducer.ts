import { SurveyResponse } from 'services/surveyInterfaces';
import { UserProfile } from 'services/user';
import { defaultInitialStore, StoreType } from 'store';

export enum ACTIONS {
  CLEAR_STORE,
  SET_CURRENT_SURVEY,
  SET_SURVEY_RESPONSE,
  SET_SURVEYS,
  SET_USER_PROFILE,
}

export type ActionPayloadType =
  | { type: ACTIONS.CLEAR_STORE }
  | {
      type: ACTIONS.SET_CURRENT_SURVEY;
      value: StoreType['currentSurvey'];
    }
  | {
      type: ACTIONS.SET_SURVEY_RESPONSE;
      value: SurveyResponse;
    }
  | {
      type: ACTIONS.SET_SURVEYS;
      value: StoreType['surveys'];
    }
  | {
      type: ACTIONS.SET_USER_PROFILE;
      value: UserProfile;
    };

export default (store: StoreType, action: ActionPayloadType) => {
  switch (action.type) {
    case ACTIONS.CLEAR_STORE:
      return defaultInitialStore;
    case ACTIONS.SET_CURRENT_SURVEY:
      return { ...store, currentSurvey: action.value };
    case ACTIONS.SET_SURVEY_RESPONSE:
      return {
        ...store,
        surveyResponses: store.surveyResponses
          .filter((response) => response.questionId != action.value.questionId)
          .concat(action.value),
      };
    case ACTIONS.SET_SURVEYS:
      return { ...store, surveys: action.value };
    case ACTIONS.SET_USER_PROFILE:
      return { ...store, userProfile: action.value };
    default:
      throw new Error('invalid action type');
  }
};
