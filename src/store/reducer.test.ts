import { defaultInitialStore } from '.';
import dispatchAction, { ACTIONS, ActionPayloadType } from './reducer';
import { Survey, SurveyDetail } from 'services/surveyInterfaces';

import { build } from '@support/factory';

describe('Dispatch action', () => {
  describe('given CLEAR_STORE as an action type', () => {
    it('sets store to the initial store', () => {
      const survey = build('survey') as Survey;
      const action = {
        type: ACTIONS.CLEAR_STORE,
      } as ActionPayloadType;

      const updatedStore = dispatchAction(
        {
          ...defaultInitialStore,
          surveys: {
            data: [survey],
            batchInfo: {
              batch: 2,
              totalBatches: 2,
              batchSize: 10,
              totalRecords: 20,
            },
          },
        },
        action
      );

      expect(updatedStore).toMatchObject(defaultInitialStore);
    });
  });

  describe('given SET_CURRENT_SURVEY as an action type', () => {
    it('returns updated store with given survey detail', () => {
      const surveyDetail = build('surveyDetail') as SurveyDetail;

      const action = {
        type: ACTIONS.SET_CURRENT_SURVEY,
        value: surveyDetail,
      } as ActionPayloadType;

      const updatedStore = dispatchAction(defaultInitialStore, action);

      expect(updatedStore.currentSurvey).toMatchObject(surveyDetail);
    });
  });

  describe('given SET_SURVEYS as an action type', () => {
    it('returns updated store with given surveys', () => {
      const survey = build('survey') as Survey;
      const action = {
        type: ACTIONS.SET_SURVEYS,
        value: {
          data: [survey],
          batchInfo: {
            batch: 2,
            totalBatches: 2,
            batchSize: 10,
            totalRecords: 20,
          },
        },
      } as ActionPayloadType;

      const updatedStore = dispatchAction(defaultInitialStore, action);

      expect(updatedStore.surveys).toMatchObject({
        data: [survey],
        batchInfo: {
          batch: 2,
          totalBatches: 2,
          batchSize: 10,
          totalRecords: 20,
        },
      });
    });
  });

  describe('given SET_USER_PROFILE as an action type', () => {
    it('returns updated store with the given user profile', () => {
      const userResponse = build('user');
      const action = {
        type: ACTIONS.SET_USER_PROFILE,
        value: userResponse,
      } as ActionPayloadType;

      const updatedStore = dispatchAction(defaultInitialStore, action);

      expect(updatedStore.userProfile).toMatchObject(userResponse);
    });
  });

  describe('given invalid action type', () => {
    it('throws an error', () => {
      const action = { type: 'UNKNOWN_ACTION', value: null };

      try {
        dispatchAction(defaultInitialStore, action);
      } catch (error: any) {
        expect(error.message).toMatch('invalid action type');
      }
    });
  });
});
