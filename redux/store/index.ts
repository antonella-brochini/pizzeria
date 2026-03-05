import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware, { Task } from "redux-saga";
import rootSaga from "@/redux/sagas/rootSaga";

import itemsSlice from "@/redux/slices/itemsSlice";
import appSlice from "@/redux/slices/appSlice";
import cartSlice from "@/redux/slices/cartSlice";
import authSlice, { onAuthSuccess, signOutSuccess } from "@/redux/slices/authSlice";
import profileSlice from "@/redux/slices/profileSlice";
import reviewsSlice, { addReview } from "@/redux/slices/reviewsSlice";
import ordersSlice, { setOrders } from "@/redux/slices/ordersSlice";
import customizeSlice from "@/redux/slices/customizeSlice";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

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
import storage from "redux-persist/lib/storage";

export interface SagaStore {
  sagaTask?: Task;
}

const rootReducer = combineReducers({
  app: appSlice,
  items: itemsSlice,
  cart: cartSlice,
  auth: authSlice,
  profile: profileSlice,
  reviews: reviewsSlice,
  orders: ordersSlice,
  customized: customizeSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["items", "cart"], // ajustá si querés persistir más
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          // tus actions específicas que no son serializables
          setOrders.type,
          onAuthSuccess.type,
          signOutSuccess.type,
          addReview.type,
        ],
      },
    }).concat(sagaMiddleware),
});

// correr saga una sola vez
;(store as any as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

// persistor normal (sin hack)
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks tipados (opcionales)
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;