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

export type MyProfileObject = {
  id: number;
  name: string;
  mobile_number: string;
  email: string;
  referral_code: string;
};

export type MyProfileResponse = DEFAULT_RESPONSE_TYPE & {
  data: Array<MyProfileObject>;
};

export type ReferralListObject = {
  id: number;
  name: string;
  mobile_number: string;
  email: string;
  referral_code: string;
  referral_points: string;
  status: number;
};

export type ReferralListResponse = DEFAULT_RESPONSE_TYPE & {
  data: Array<ReferralListObject>;
};