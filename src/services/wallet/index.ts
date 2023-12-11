import { AxiosResponse } from 'axios';
import httpClient from '../httpClient';
import {
  DEFAULT_RESPONSE_TYPE} from '../types/auth';
import { AddBalanceRequest, GetBalanceResponse, TransactionsResponse, UserAddBalanceRequest } from '../types/wallet';

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

  UserAddBalance = async (payload: UserAddBalanceRequest
  ): Promise<AxiosResponse<DEFAULT_RESPONSE_TYPE>> =>
    httpClient.post(`${controller}/addUserBalance`, payload);
}

export default new UserService();
