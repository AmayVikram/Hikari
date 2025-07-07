import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userReducer } from '../features/userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Only persist the 'user' slice
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // To avoid warnings with redux-persist
    }),
});

export const persistor = persistStore(store);
