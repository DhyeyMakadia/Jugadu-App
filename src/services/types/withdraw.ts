import { DEFAULT_RESPONSE_TYPE } from './auth';

export type WithDrawObject = {
  id: number;
  user_id: number;
  request_amount: string;
  accept_decline: null | 0 | 1;
  account_holder_name: null;
  account_number: null;
  ifsc_code: null;
  userDetails: {
    id: number;
    name: string;
    mobile_number: string;
    email: string;
    status: number;
  };
};

export type WithDrawResponse = DEFAULT_RESPONSE_TYPE & {
  data: Array<WithDrawObject>;
};

export type UserWithdrawList = {
  id: number;
  user_id: number;
  request_amount: string;
  accept_decline: number;
};

export type UserWithdrawResponse = DEFAULT_RESPONSE_TYPE & {
  data: Array<UserWithdrawList>;
};

export type UserAddWithdrawRequestRequest = {
  request_amount: number;
  account_holder_name: string;
  account_number: string;
  ifsc_code: string;
};
