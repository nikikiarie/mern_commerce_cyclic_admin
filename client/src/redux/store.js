
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice'
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import  productSlice  from './productSlice';


const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({user:userSlice,products:productSlice})
const persistedReducer = persistReducer(persistConfig, rootReducer);


export  const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);