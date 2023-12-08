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
import { AddBalanceRequest } from '../types/wallet';

const controller = 'walletbalance';

class UserService {
  AddBalance = async (
    payload: AddBalanceRequest
  ): Promise<AxiosResponse<DEFAULT_RESPONSE_TYPE>> =>
    httpClient.post(`${controller}/amount/request`, payload);
}

export default new UserService();
