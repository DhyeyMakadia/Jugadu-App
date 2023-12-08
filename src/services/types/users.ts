import { DEFAULT_RESPONSE_TYPE } from './auth';

export type UsersObject = {
  id: number;
  name: string;
  email: string;
  mobile_number: string;
  status: number;
  referral_code: string | null;
  referral_points: string;
  running_balance: number;
};

export type UsersResponse = DEFAULT_RESPONSE_TYPE & {
  data: Array<UsersObject>;
};
