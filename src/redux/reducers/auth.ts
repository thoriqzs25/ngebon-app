import { AuthReducerAction, AuthReducerState } from '@cTypes/states/auth';

const defaultState = {
  email: null,
  uid: null,
  loggedIn: null,
} as AuthReducerState;

const authReducer = (prevState = defaultState, action: AuthReducerAction) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...prevState,
        email: action.email,
        uid: action.uid,
        loggedIn: true,
      };
    case 'USER_LOGOUT':
      return {
        ...defaultState,
      };
    default:
      return prevState;
  }
};

export default authReducer;
