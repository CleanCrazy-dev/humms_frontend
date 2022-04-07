import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { load, save } from "redux-localstorage-simple";
import application from "./application/reducer";
import multicall from "./multicall/reducer";
import swap from "./swap/reducer";
import transactions from "./transactions/reducer";
import user from "./user/reducer";

const PERSISTED_KEYS: string[] = ["transactions", "user"];

const store = configureStore({
  reducer: {
    application,
    multicall,
    swap,
    transactions,
    user,
  },
  middleware: (getDefaultMiddleware) => {
    return [
      ...getDefaultMiddleware({ thunk: true }),
      save({ states: PERSISTED_KEYS }),
    ];
  },
  preloadedState: load({ states: PERSISTED_KEYS }),
});

setupListeners(store.dispatch);

export default store;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
