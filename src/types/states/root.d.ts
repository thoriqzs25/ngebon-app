import { AuthReducerState } from './auth';
import { DivideReducerState } from './divide';
// import { ErrorReducerState } from './error';
import { UserReducerState } from './user';

export interface RootState {
  auth: AuthReducerState;
  // error: ErrorReducerState;
  user: UserReducerState;
  divide: DivideReducerState;
}
