import { DEFAULT_RESPONSE_TYPE } from './auth';

export type GetAllUserRashiObject = {
  id: number;
  image: string;
  name: string;
  status: number;
  order: number;
  bid_amount: number;
};

export type GetAllUserRashiResponse = DEFAULT_RESPONSE_TYPE & {
  data: Array<GetAllUserRashiObject>;
};

export type PlaceBidRequest = {
  zodiac_id: number;
  bid_amount: number;
};

export type BidsListObject = {
  id: number;
  image: string;
  name: string;
  status: number;
  order: number;
  bid_amount: number;
  is_win: number;
};

export type BidsListResponse = DEFAULT_RESPONSE_TYPE & {
  data: Array<BidsListObject>;
};

export type ChangeWinnerRequest = {
  zodiac_id: number;
};

export type BidsWinnerListObject = {
  ZodiacName: string;
  image: string;
  time: string;
  date: string;
};

export type BidsWinnerListResponse = DEFAULT_RESPONSE_TYPE & {
  data: Array<BidsWinnerListObject>;
};

export type MyBidsObject = {
  ZodiacName: string;
  image: string;
  time: string;
  date: string;
  is_win: number;
  amount: string;
};

export type MyBidsResponse = DEFAULT_RESPONSE_TYPE & {
  data: Array<MyBidsObject>;
};
