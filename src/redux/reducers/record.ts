import { Payment } from '@src/types/collection/usersCollection';
import { RecordReducerAction, RecordReducerState } from '@src/types/states/record';

const defaultState = {
  receipient: null,
  payments: null,
} as RecordReducerState;

const recordReducer = (prevState = defaultState, action: RecordReducerAction) => {
  switch (action.type) {
    case 'SET_RECORDS':
      return {
        ...prevState,
        records: action.records ?? null,
      };
    case 'SET_RECEIPIENT':
      const { avatar, email, name, username, payments } = action.receipient;

      return {
        ...prevState,
        receipient: {
          avatar: avatar,
          email: email,
          name: name,
          username: username,
          payments: payments,
        },
      };
    default:
      return prevState;
  }
};

export default recordReducer;
