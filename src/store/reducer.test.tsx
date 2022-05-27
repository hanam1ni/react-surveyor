import dispatchAction, { ACTIONS, ActionPayloadType } from './reducer';
import { Survey } from 'services/survey';

import { build } from '@support/factory';

const initialStore = {
  surveys: [],
};

describe('Dispatch action', () => {
  describe('given `setSurveys` as an action type', () => {
    it('returns updated store with given surveys', () => {
      const survey = build('survey') as Survey;
      const action = {
        type: ACTIONS.SET_SURVEYS,
        value: [survey],
      } as ActionPayloadType;

      const updatedStore = dispatchAction(initialStore, action);

      expect(updatedStore.surveys[0]).toMatchObject(survey);
    });
  });

  describe('given invalid action type', () => {
    it('throws an error', () => {
      const action = { type: 'UNKNOWN_ACTION', value: null };

      try {
        dispatchAction(initialStore, action);
      } catch (error: any) {
        expect(error.message).toMatch('invalid action type');
      }
    });
  });
});