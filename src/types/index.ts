import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type Dispatch = ThunkDispatch<RootReducerState, null, AnyAction>;

export interface UserLoginData {
  email: string,
  password:string,
}

export const formInitalValues = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentacão',
};

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

export interface CurrencyData {
  [key: string]: Currency;
}

export interface ExpensesData {
  id: number,
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates: CurrencyData
}

export type ExpenseType = {
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
  id:number
};

export interface WalletData {
  currencies: CurrencyData[];
  expenses: ExpensesData[];
  editMode: boolean
  expenseToEdit: ExpenseType
}

export interface RootReducerState {
  user: UserLoginData
  wallet: WalletData
}
