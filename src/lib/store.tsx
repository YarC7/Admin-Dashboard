import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalSlice from "./themeSlice";
import userSlice from "./userSlice";
import authSlice from "./authSlice";
import { api } from "./apiSlice";
import storage from 'redux-persist/lib/storage'; 
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['global', 'user', 'auth'], // specify slices to persist
}
const rootReducer = {
  global: globalSlice,
  user: userSlice,
  auth: authSlice,
  [api.reducerPath]: api.reducer,
};
const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});


// Persistor
export const persistor = persistStore(store);
// export default store;
export default store;

