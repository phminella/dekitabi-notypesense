import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import itineraryReducer from "./itinerarySlice";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";
const isServer = typeof window === "undefined";
const getStore = () => {
  if (isServer || !navigator.cookieEnabled) {
    return configureStore({
      reducer: {
        app: appReducer,
        itinerary: itineraryReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
          // {
          //   ignoredPaths: ["itinerary", "payload", "user"],
          // },
        }),
    });
  } else {
    return configureStore({
      reducer: {
        app: appReducer,
        itinerary: itineraryReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
          // {
          //   ignoredPaths: ["itinerary", "payload", "user"],
          // },
        }).concat(createStateSyncMiddleware({})),
    });
  }
};
const store = getStore();
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
