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

const controller = 'user';

class UserService {
  GetAllUsers = async (): Promise<AxiosResponse<UsersResponse>> =>
    httpClient.get(`${controller}/readAll`);

  UpdateUserStatus = async (
    id: number,
    payload: { status: number }
  ): Promise<AxiosResponse<DEFAULT_RESPONSE_TYPE>> =>
    httpClient.put(`${controller}/update/${id}`, payload);
}

export default new UserService();
