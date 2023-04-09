import { UserReducerAction, UserReducerState } from '@src/types/states/user';

const defaultState = {
  email: null,
  uid: null,
  name: null,
  username: null,
} as UserReducerState;

const userReducer = (prevState = defaultState, action: UserReducerAction) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...prevState,
        email: action.email,
        uid: action.uid,
        name: action.name,
        username: action.username,
      };
    case 'REMOVE_USER':
      return defaultState;
    default:
      return prevState;
  }
};

export default userReducer;
