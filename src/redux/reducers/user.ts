import { UserReducerAction, UserReducerState } from '@src/types/states/user';

const defaultState = {
  email: null,
  uid: null,
  name: null,
  username: null,
  avatar: null,
  payments: null,
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
        avatar: action.avatar,
        payments: action.payments,
      };
    case 'SET_AVATAR':
      return {
        ...prevState,
        avatar: action.avatar,
      };
    case 'SET_PAYMENTS':
      return {
        ...prevState,
        payments: action.payments,
      };
    case 'REMOVE_USER':
      return defaultState;
    default:
      return prevState;
  }
};

export default userReducer;
