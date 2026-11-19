import { createSlice } from "@reduxjs/toolkit";
import { withReduxStateSync } from "redux-state-sync";
import { AppState } from "../types/store/appSlice";
export const appSlice = createSlice({
  name: "app",
  initialState: {
    mapLanguage: "",
    currency: { currency: "Japanese Yen", code: "JPY", symbol: "¥", rate: 1 },
    language: {
      language: "English",
      code: "en",
    },
    user: null,
    shopUser: null,
    showLogin: false,
    cart: {
      currency: { currency: "Japanese Yen", code: "JPY", symbol: "¥", rate: 1 },
      items: [],
    },
    showCart: false,
    showChat: false,
    userToken: null,
  } as AppState,
  reducers: {
    setCurrency: (state: any | object[], action: { payload: any | null }) => {
      state.currency = action.payload;
    },
    setLanguage: (state: any | object[], action: { payload: any | null }) => {
      state.language = action.payload;
    },
    setMapLanguage: (
      state: any | object[],
      action: { payload: any | null }
    ) => {
      state.mapLanguage = action.payload;
    },
    setUser: (state: any | object[], action: { payload: any | null }) => {
      state.user = action.payload;
    },
    setShopUser: (state: any | object[], action: { payload: any | null }) => {
      state.shopUser = action.payload;
    },
    setShowLogin: (state: any | object[], action: { payload: any | null }) => {
      state.showLogin = action.payload;
    },
    setCart: (state: any | object[], action: { payload: any | null }) => {
      state.cart = action.payload;
    },
    setShowCart: (state: any | object[], action: { payload: any | null }) => {
      state.showCart = action.payload;
    },
    setShowChat: (state: any | object[], action: { payload: any | null }) => {
      state.showChat = action.payload;
    },
  },
});

export const {
  setMapLanguage,
  setCurrency,
  setLanguage,
  setUser,
  setShopUser,
  setShowLogin,
  setCart,
  setShowCart,
  setShowChat,
} = appSlice.actions;
export default appSlice.reducer;
