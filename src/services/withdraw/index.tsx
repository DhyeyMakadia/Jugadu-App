import { AxiosResponse } from 'axios';
import httpClient from '../httpClient';
import {
  DEFAULT_RESPONSE_TYPE} from '../types/auth';
import {
  UserAddWithdrawRequestRequest,
  UserWithdrawResponse,
  WithDrawResponse
} from '../types/withdraw';

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

  CreateWithdrawRequest = async (
    payload: UserAddWithdrawRequestRequest
  ): Promise<AxiosResponse<DEFAULT_RESPONSE_TYPE>> =>
    httpClient.post(`${controller}/create`, payload);

  GetUserWithdrawList = async (): Promise<
    AxiosResponse<UserWithdrawResponse>
  > => httpClient.get(`withdrawrequest/userRequestLists`);
}

export default new WithdrawService();
