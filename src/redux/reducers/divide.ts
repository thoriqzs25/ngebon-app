import { DivideReducerAction, DivideReducerState } from '@src/types/states/divide';

const defaultState = {
  title: null,
  items: null,
  assignedFriends: null,
  tax: null,
  service: null,
  totalAmountOfDivide: null,
} as DivideReducerState;

const divideReducer = (prevState = defaultState, action: DivideReducerAction) => {
  switch (action.type) {
    case 'SET_DIVIDE_ITEMS':
      return {
        ...prevState,
        title: action.title ?? null,
        items: action.items ?? null,
      };
    case 'SET_ASSIGNED_FRIENDS':
      return {
        ...prevState,
        assignedFriends: action.friends,
      };
    case 'RESET_ASSIGNED_FRIENDS':
      return {
        ...prevState,
        assignedFriends: null,
      };
    case 'SET_TAX_AND_SERVICE':
      return {
        ...prevState,
        tax: action.tax,
        service: action.service,
        totalAmountOfDivide: action.totalAmountOfDivide,
      };

    default:
      return prevState;
  }
};

export default divideReducer;
