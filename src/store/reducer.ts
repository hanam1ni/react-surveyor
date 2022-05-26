import { Survey } from 'services/survey';
import { StoreType } from 'store';

export type ActionType = {
  type: 'setSurveys';
  value: Survey[];
};

export default (store: StoreType, action: ActionType) => {
  switch (action.type) {
    case 'setSurveys':
      return { ...store, surveys: action.value };
    default:
      throw new Error('invalid action type');
  }
};
