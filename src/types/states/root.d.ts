import { AuthReducerState } from './auth';
// import { ErrorReducerState } from './error';
import { UserReducerState } from './user';

export interface RootState {
  auth: AuthReducerState;
  // error: ErrorReducerState;
  user: UserReducerState;
}
