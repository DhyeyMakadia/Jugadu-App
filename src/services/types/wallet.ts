import { DEFAULT_RESPONSE_TYPE } from './auth';

export type AddBalanceRequest = {
  user_id: number;
  amount: number;
};

export type UserAddBalanceRequest = {
  amount: number;
};

export type TransactionsObject = {
  amount: string;
  debit_credit: 0 | 1;
  time: string;
  date: string;
};

export type TransactionsResponse = DEFAULT_RESPONSE_TYPE & {
  data: Array<TransactionsObject>;
};

export type GetBalanceObject = {
  id: number;
  user_id: number;
  running_balance: string;
};

export type GetBalanceResponse = DEFAULT_RESPONSE_TYPE & {
  data: Array<GetBalanceObject>;
};

export type GetUpiObject = {
  // id: number;
  upi_id: string;
  merchant_name: string;
  // deleted_at: string;
};

export type GetUpiResponse = DEFAULT_RESPONSE_TYPE & {
  data: GetUpiObject;
};

export type UpdateUpiRequest = {
  upi_id: string;
  merchant_name: string;
};
