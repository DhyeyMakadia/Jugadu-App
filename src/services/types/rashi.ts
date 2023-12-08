import { DEFAULT_RESPONSE_TYPE } from './auth';

export type RashiObject = {
  id: number;
  name: string;
  status: number;
  order: number;
  image: string;
};

export type RashiResponse = DEFAULT_RESPONSE_TYPE & {
  data: Array<RashiObject>;
};

export type AddRashiRequest = {
  [k: string]: any
}
// export type AddRashiRequest = {
//   name: string;
//   order: number;
//   image: any;
//   status: boolean;
// };

export type AddRashiResponseObject = {
  id: number;
  name: string;
  status: string;
  order: string;
  image: string;
};

export type AddRashiResponse = DEFAULT_RESPONSE_TYPE & {
  data: Array<AddRashiResponseObject>;
};
