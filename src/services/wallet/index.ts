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
import { UsersResponse } from '../types/users';
import { AddBalanceRequest, GetBalanceResponse, TransactionsResponse } from '../types/wallet';

const controller = 'walletbalance';

class UserService {
  AddBalance = async (
    payload: AddBalanceRequest
  ): Promise<AxiosResponse<DEFAULT_RESPONSE_TYPE>> =>
    httpClient.post(`${controller}/amount/request`, payload);

  GetTransactions = async (
  ): Promise<AxiosResponse<TransactionsResponse>> =>
    httpClient.get(`${controller}/user/transaction`);

  GetBalance = async (
  ): Promise<AxiosResponse<GetBalanceResponse>> =>
    httpClient.get(`${controller}/total/bid/user`);
}

export default new UserService();
