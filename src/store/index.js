import rootReducer from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // or another storage engine of your choice
import api from "configs/apiConfig"
const middlewares = [];

// Configure redux-persist options
const persistConfig = {
  key: 'root', // key for the localStorage object
  storage, // the storage engine to use (e.g., localStorage or sessionStorage)
};

// Wrap your rootReducer with the persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer());

const store = configureStore({
  reducer: persistedReducer, // use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: process.env.NODE_ENV === 'development',
});

store.asyncReducers = {};

// Create a persistor object
const persistor = persistStore(store);

export const injectReducer = (key, reducer) => {
  if (store.asyncReducers[key]) {
    return false;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(rootReducer(store.asyncReducers));
  return store;
};

export { persistor }; // Export the persistor to use it in your application
export default store;
