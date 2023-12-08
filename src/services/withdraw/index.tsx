import { AxiosResponse } from 'axios';
import httpClient from '../httpClient';
import {
  DEFAULT_RESPONSE_TYPE,
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse
} from '../types/auth';
import { RashiResponse } from '../types/rashi';
import { WithDrawResponse } from '../types/withdraw';

const controller = 'withdrawrequest/request';

class WithdrawService {
  GetAllWithdrawRequest = async (): Promise<AxiosResponse<WithDrawResponse>> =>
    httpClient.get(`${controller}/list`);

  AcceptWithdrawRequest = async (payload: {
    withdraw_request_id: number;
  }): Promise<AxiosResponse<DEFAULT_RESPONSE_TYPE>> =>
    httpClient.post(`${controller}/accept`, payload);

  RejectWithdrawRequest = async (payload: {
    withdraw_request_id: number;
  }): Promise<AxiosResponse<DEFAULT_RESPONSE_TYPE>> =>
    httpClient.post(`${controller}/reject`, payload);
}

export default new WithdrawService();
