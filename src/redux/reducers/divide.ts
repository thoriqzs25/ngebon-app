import { DivideReducerAction, DivideReducerState } from '@src/types/states/divide';

const defaultState = {
  title: null,
  items: null,
} as DivideReducerState;

const divideReducer = (prevState = defaultState, action: DivideReducerAction) => {
  switch (action.type) {
    case 'SET_DIVIDE_ITEMS':
      return {
        ...prevState,
        title: action.title ?? null,
        items: action.items ?? null,
      };
    default:
      return prevState;
  }
};

export default divideReducer;
