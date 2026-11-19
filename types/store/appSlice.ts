import type { User } from "../user";

export interface Currency {
  currency: string;
  code: string;
  symbol: string;
  rate: number;
}

export interface Language {
  language: string;
  code: string;
}

export interface Cart {
  currency: Currency;
  items: any[]; // you can replace `unknown` with your actual item type
}
export interface AppState {
  mapLanguage: string;
  currency: Currency;
  language: Language;
  user: User | null;
  shopUser: null;
  showLogin: boolean;
  cart: Cart;
  showCart: boolean;
  showChat: boolean;
  userToken: null;
}
export interface RootState {
  app: AppState;
}
