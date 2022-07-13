import { defaultInitialStore } from '.';
import dispatchAction, { ACTIONS, ActionPayloadType } from './reducer';
import { Survey, SurveyDetail } from 'services/surveyInterfaces';

import { build } from '@support/factory';

describe('Dispatch action', () => {
  describe('given ADD_SURVEY_RESPONSE as an action type', () => {
    describe('given survey response does not exist in the store', () => {
      it('adds survey response to the store', () => {
        const questionId = 'QUESTION1';
        const answers = [{ id: 'ANSWER1', answer: 'My Answer' }];

        const action = {
          type: ACTIONS.ADD_SURVEY_RESPONSE,
          value: { questionId, answers },
        } as ActionPayloadType;

        const updatedStore = dispatchAction(defaultInitialStore, action);

        expect(updatedStore.surveyResponses).toContainEqual({
          questionId,
          answers,
        });
      });
    });

    describe('given survey response exists in the store', () => {
      it('replaces existing survey response with the given one', () => {
        const questionId1 = 'QUESTION1';
        const questionId2 = 'QUESTION2';
        const answerId1 = 'ANSWER1';
        const answerId2 = 'ANSWER2';

        const initialStore = {
          ...defaultInitialStore,
          surveyResponses: [
            {
              questionId: questionId1,
              answers: [{ id: answerId1, answer: 'My First Answer' }],
            },
            {
              questionId: questionId2,
              answers: [{ id: answerId2, answer: 'My Second Answer' }],
            },
          ],
        };

        const action = {
          type: ACTIONS.ADD_SURVEY_RESPONSE,
          value: {
            questionId: questionId2,
            answers: [{ id: answerId2, answer: 'My Updated Second Answer' }],
          },
        } as ActionPayloadType;

        const updatedStore = dispatchAction(initialStore, action);

        expect(updatedStore.surveyResponses).toContainEqual({
          questionId: questionId1,
          answers: [{ id: answerId1, answer: 'My First Answer' }],
        });
        expect(updatedStore.surveyResponses).toContainEqual({
          questionId: questionId2,
          answers: [{ id: answerId2, answer: 'My Updated Second Answer' }],
        });
      });
    });
  });

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
