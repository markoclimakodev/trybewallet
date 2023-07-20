import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type Dispatch = ThunkDispatch<RootReducerState, null, AnyAction>;

export interface UserLoginData {
  email: string,
  password:string,
}

export interface Currency {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

export interface ExpensesData {
  id?: number,
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates?: CurrencyData
}

export interface CurrencyData {
  [key: string]: Currency;
}

export interface WalletData {
  currencies: CurrencyData[];
  expenses: ExpensesData[]
}

export interface RootReducerState {
  user: UserLoginData
  wallet: WalletData
}
