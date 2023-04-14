import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import authReducer from '../reducers/auth';
import userReducer from '../reducers/user';
import divideReducer from '../reducers/divide';
import recordReducer from '../reducers/record';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['auth'],
};

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['email', 'uid'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  user: userReducer,
  divide: divideReducer,
  record: recordReducer,
  // etc: etcReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const createStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: __DEV__,
  });

  const persistor = persistStore(store);

  return { store, persistor };
};

const { store, persistor } = createStore();

export type AppDispatch = typeof store.dispatch;

export { store, persistor };
