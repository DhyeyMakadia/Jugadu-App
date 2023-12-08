import { DEFAULT_RESPONSE_TYPE } from './auth';

export type WithDrawObject = {
  id: number;
  user_id: number;
  request_amount: string;
  accept_decline: null | 0 | 1;
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
